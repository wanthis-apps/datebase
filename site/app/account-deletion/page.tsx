import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "アカウントの削除",
  description:
    "DateSpot のアカウント削除手順です。アプリ内からの退会と、アプリを開けない場合のメール申請、削除するデータと残すデータを記載しています。",
};

const deletedItems = [
  "アカウント（メールアドレスとユーザーID）",
  "保存したお気に入りスポット",
  "作成したデートプラン",
  "口コミ、閲覧履歴、クーポン利用履歴",
  "その端末に残しているログイン状態とお気に入りの控え",
] as const;

const steps = [
  "DateSpot を開き、プロフィールを表示します。",
  "「アカウントを削除（退会）」を選びます。",
  "退会理由を選び、削除を確定します。",
] as const;

export default function AccountDeletionPage() {
  return (
    <main className="mx-auto w-full min-w-0 max-w-3xl px-5 py-14">
      <p className="break-keep text-sm tracking-[0.18em] text-rose">DateSpot</p>
      <h1 className="break-keep mt-3 text-3xl leading-10 text-foreground">アカウントの削除</h1>
      <p className="break-keep mt-4 text-sm leading-7 text-ink-soft">
        運営者は WANTHIS です。このページは DateSpot のアカウント削除手順です。ログインしていなくても閲覧できます。
      </p>

      <section className="mt-10 flex flex-col gap-4">
        <h2 className="break-keep text-xl leading-8">アプリから削除する</h2>
        <p className="break-keep text-base leading-8 text-ink-soft">
          アカウントを持っている人は、アプリ内から自分で削除できます。
        </p>
        <ol className="flex list-decimal flex-col gap-4 pl-5">
          {steps.map((step) => (
            <li key={step} className="break-keep rounded-2xl border border-line bg-surface p-5 text-sm leading-7 text-ink-soft">
              {step}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12 flex flex-col gap-4">
        <h2 className="break-keep text-xl leading-8">アプリを開けない場合</h2>
        <p className="break-keep text-base leading-8 text-ink-soft">
          件名を「アカウント削除申請」にし、本文に登録したメールアドレスを書いて、次の宛先へ送ってください。登録したメールアドレスから送ると確認が早くなります。申請から30日以内に、アカウントとお気に入りなどの個人データを削除します。
        </p>
        <a
          href="mailto:support@wanthis-apps.com?subject=%E3%82%A2%E3%82%AB%E3%82%A6%E3%83%B3%E3%83%88%E5%89%8A%E9%99%A4%E7%94%B3%E8%AB%8B"
          className="break-keep text-lg text-rose underline-offset-4 hover:underline"
        >
          support@wanthis-apps.com へ削除を申請する
        </a>
      </section>

      <section className="mt-12 flex flex-col gap-4">
        <h2 className="break-keep text-xl leading-8">削除するデータ</h2>
        <ul className="flex flex-col gap-4">
          {deletedItems.map((item) => (
            <li key={item} className="rounded-2xl border border-line bg-surface p-5">
              <p className="break-keep text-sm leading-7 text-ink-soft">{item}</p>
            </li>
          ))}
        </ul>
        <p className="break-keep text-base leading-8 text-ink-soft">
          位置情報はアカウントには保存しません。一部のデータだけを残してアカウントを続ける手続きはありません。削除はアカウント全体が対象です。
        </p>
      </section>

      <section className="mt-12 flex flex-col gap-4">
        <h2 className="break-keep text-xl leading-8">残すデータ</h2>
        <p className="break-keep text-base leading-8 text-ink-soft">
          スポットの掲載情報など、特定の利用者に紐づかない公開情報は残します。削除申請の受付記録（申請日時と退会理由）は、削除したことの確認のために残します。受付記録にメールアドレスは含めません。
        </p>
        <p className="break-keep text-base leading-8 text-ink-soft">
          データの取り扱い全体は
          <Link href="/privacy" className="break-keep text-rose underline-offset-4 hover:underline">
            プライバシーポリシー
          </Link>
          に記載しています。
        </p>
      </section>
    </main>
  );
}
