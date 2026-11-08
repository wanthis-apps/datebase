-- ログイン中の本人だけが、自分の認証アカウントと個人データを削除する。
-- Supabase の SQL Editor で実行する。アプリの退会は public.delete_own_account を呼ぶ。
-- 何度実行しても同じ結果になる。

-- 退会の受付記録。本番に無いと関数の呼び出しが失敗するので、ここで用意する。
-- 列は supabase/schema.sql と src/types/database.ts に合わせている。
-- auth.users への外部キーは付けない（認証アカウントを消したあとも記録を残すため）。
create table if not exists public.account_deletions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  reason text not null,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.account_deletions enable row level security;

-- 関数が失敗したときに、アプリが退会理由だけを保存するためのポリシー。読み取りは許可しない。
drop policy if exists "account_deletions_insert_public" on public.account_deletions;
create policy "account_deletions_insert_public"
  on public.account_deletions
  for insert
  to anon, authenticated
  with check (user_id is null or auth.uid() = user_id);

create or replace function public.delete_own_account(deletion_reason text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  reason text := left(
    coalesce(nullif(btrim(deletion_reason), ''), 'unspecified'),
    500
  );
begin
  if uid is null then
    raise exception 'ログインが必要です';
  end if;

  insert into public.account_deletions (user_id, reason)
  values (uid, reason);

  if to_regclass('public.plan_spots') is not null
    and to_regclass('public.plans') is not null then
    execute
      'delete from public.plan_spots where plan_id in (select id from public.plans where user_id = $1)'
      using uid;
  end if;

  if to_regclass('public.favorites') is not null then
    execute 'delete from public.favorites where user_id = $1' using uid;
  end if;

  if to_regclass('public.reviews') is not null then
    execute 'delete from public.reviews where user_id = $1' using uid;
  end if;

  if to_regclass('public.plans') is not null then
    execute 'delete from public.plans where user_id = $1' using uid;
  end if;

  if to_regclass('public.notification_settings') is not null then
    execute 'delete from public.notification_settings where user_id = $1' using uid;
  end if;

  if to_regclass('public.feedback') is not null then
    execute 'delete from public.feedback where user_id = $1' using uid;
  end if;

  if to_regclass('public.user_coupons_history') is not null then
    execute 'delete from public.user_coupons_history where user_id = $1' using uid;
  end if;

  if to_regclass('public.users') is not null then
    execute 'delete from public.users where id = $1' using uid;
  end if;

  delete from auth.users where id = uid;
end;
$$;

revoke all on function public.delete_own_account(text) from public;
revoke all on function public.delete_own_account(text) from anon;
grant execute on function public.delete_own_account(text) to authenticated;
