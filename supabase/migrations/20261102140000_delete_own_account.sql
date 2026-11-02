-- ログイン中の本人だけが、自分の認証アカウントと個人データを削除する。
-- Supabase の SQL Editor で実行する。アプリの退会は public.delete_own_account を呼ぶ。

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
