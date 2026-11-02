import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "利用規約",
  description:
    "デートベースの利用条件です。掲載情報の扱い、予約を受け付けないこと、アカウント、禁止事項、免責を記載しています。",
};

const articles = [
  {
    title: "第1条（適用）",
    body: "本規約は、WANTHIS が提供するアプリ「デートベース」（以下「本アプリ」）の利用条件です。本アプリを使うことで、本規約とプライバシーポリシーに同意したものとみなします。",
  },
  {
    title: "第2条（サービスの内容）",
    body: "本アプリは、デートスポットの検索、地図表示、お気に入り、デートプラン、口コミ、提携クーポンがある場合の利用記録を提供します。掲載情報は参考情報です。営業時間、料金、空席、入場条件は、各施設の最新案内を確認してください。",
  },
  {
    title: "第3条（予約と決済）",
    body: "本アプリでは席の予約を受け付けず、予約は確定しません。有料プランの決済も、現在は提供していません。画面上の会員表示が有料機能の購入を意味することはありません。",
  },
  {
    title: "第4条（アカウント）",
    body: "ユーザーは登録情報を正確に保ち、アカウントを自己の責任で管理します。第三者への貸与やなりすましは禁止します。ゲスト利用中の端末内データは、別のアカウントへ引き継がれない場合があります。",
  },
  {
    title: "第5条（禁止事項）",
    body: "法令または公序良俗に反する行為、虚偽の口コミ、評価の操作、本アプリの運営妨害、掲載情報の無断転載を禁止します。",
  },
  {
    title: "第6条（免責）",
    body: "店舗情報の誤り、営業時間の変更、通信障害、提携クーポンの条件変更により生じた損害について、WANTHIS は法令で認められる範囲を除き責任を負いません。",
  },
  {
    title: "第7条（退会）",
    body: "ユーザーはアプリ内から退会できます。アプリを開けない場合は、アカウント削除のページに記載した方法で申請できます。申請から30日以内に、アカウントとお気に入りなどの個人データを削除します。",
  },
] as const;

export default function TermsPage() {
  return (
    <main className="mx-auto w-full min-w-0 max-w-3xl px-5 py-14">
      <p className="break-keep text-sm tracking-[0.18em] text-rose">デートベース</p>
      <h1 className="break-keep mt-3 text-3xl leading-10 text-foreground">利用規約</h1>
      <p className="break-keep mt-4 text-sm leading-7 text-ink-soft">
        制定日 2026年11月2日。運営者は WANTHIS です。本規約はデートベースに適用します。
      </p>
      <div className="mt-10 flex flex-col gap-8">
        {articles.map((article) => (
          <section key={article.title} className="flex flex-col gap-3">
            <h2 className="break-keep text-xl leading-8">{article.title}</h2>
            <p className="break-keep text-base leading-8 text-ink-soft">{article.body}</p>
          </section>
        ))}
      </div>
      <p className="break-keep mt-12 text-base leading-8 text-ink-soft">
        個人情報の扱いは
        <Link href="/privacy" className="break-keep text-rose underline-offset-4 hover:underline">
          プライバシーポリシー
        </Link>
        に記載しています。問い合わせ先は support@wanthis-apps.com です。
      </p>
    </main>
  );
}
