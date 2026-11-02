import { useEffect, useMemo, useState } from 'react';

export type LegalTab = 'terms' | 'privacy';

export type LegalBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'bullets'; items: string[] };

export type LegalDocument = {
  tab: LegalTab;
  title: string;
  effectiveDate: string;
  revisedDate: string;
  blocks: LegalBlock[];
};

export const LEGAL_TABS: ReadonlyArray<{ value: LegalTab; label: string }> = [
  { value: 'terms', label: '利用規約' },
  { value: 'privacy', label: 'プライバシーポリシー' },
];

export const LEGAL_DOCUMENTS: Record<LegalTab, LegalDocument> = {
  terms: {
    tab: 'terms',
    title: '利用規約',
    effectiveDate: '2026年11月2日',
    revisedDate: '2026年11月2日',
    blocks: [
      {
        type: 'paragraph',
        text: '本規約は、WANTHIS が提供する「デートベース」の利用条件です。全文は公開サイトの利用規約と同じ内容です。',
      },
      { type: 'heading', text: 'サービスの内容' },
      {
        type: 'paragraph',
        text: 'デートベースは、デートスポットの検索、地図、お気に入り、プラン、口コミ、提携クーポンがある場合の利用記録を提供します。掲載情報は参考情報であり、営業時間、料金、空席は各施設の案内を確認してください。',
      },
      { type: 'heading', text: '予約と決済' },
      {
        type: 'bullets',
        items: [
          'このアプリでは席の予約を受け付けません。予約は確定しません。',
          '有料プランの決済は現在提供していません。',
        ],
      },
      { type: 'heading', text: 'アカウントと禁止事項' },
      {
        type: 'bullets',
        items: [
          '登録情報は正確に保ち、アカウントは自己の責任で管理します。',
          '虚偽の口コミ、評価の操作、運営妨害、無断転載を禁止します。',
          '退会はアプリ内、または公開サイトのアカウント削除ページから申請できます。',
        ],
      },
    ],
  },
  privacy: {
    tab: 'privacy',
    title: 'プライバシーポリシー',
    effectiveDate: '2026年10月3日',
    revisedDate: '2026年11月2日',
    blocks: [
      {
        type: 'paragraph',
        text: '運営者は WANTHIS です。個人情報の販売、および広告のためのアプリ横断トラッキングは行いません。',
      },
      { type: 'heading', text: '取り扱う情報' },
      {
        type: 'bullets',
        items: [
          '使用中の位置情報。画面を閉じたあとの取得や常時追跡はしません。許可しなくても一覧と詳細は閲覧できます。',
          'アカウントのメールアドレス、お気に入り、プラン、口コミ、クーポン利用履歴、問い合わせ内容。',
          '端末内のログイン状態、表示設定、お気に入りの控え。広告識別子は取得しません。',
        ],
      },
      { type: 'heading', text: '委託' },
      {
        type: 'paragraph',
        text: '認証と保存は Supabase、地図の描画は Google の地図サービスに委託します。通信は HTTPS です。地図の表示に必要な範囲で、表示領域の情報が Google に送られます。',
      },
      { type: 'heading', text: '削除' },
      {
        type: 'paragraph',
        text: 'アプリ内の退会、または公開サイトのアカウント削除ページから申請できます。申請から30日以内に、アカウントとお気に入りなどの個人データを削除します。問い合わせ先は support@wanthis-apps.com です。',
      },
    ],
  },
};

export type UseLegalResult = {
  tab: LegalTab;
  setTab: (tab: LegalTab) => void;
  document: LegalDocument;
  tabs: typeof LEGAL_TABS;
};

export function useLegal(initialTab: LegalTab = 'terms'): UseLegalResult {
  const [tab, setTab] = useState<LegalTab>(initialTab);

  useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  const document = useMemo(() => LEGAL_DOCUMENTS[tab], [tab]);

  return {
    tab,
    setTab,
    document,
    tabs: LEGAL_TABS,
  };
}
