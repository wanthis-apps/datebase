import { useMemo, useState } from 'react';

export type FaqCategory = 'app' | 'coupon' | 'account';

export type FaqItem = {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
};

export type FaqFilter = 'all' | FaqCategory;

export const FAQ_CATEGORY_LABELS: Record<FaqCategory, string> = {
  app: 'アプリの使い方',
  coupon: 'クーポンについて',
  account: 'アカウント・設定',
};

const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: 'faq-1',
    category: 'coupon',
    question: 'クーポンの使用方法を教えてください',
    answer:
      'クーポン一覧またはスポット詳細から「利用済みとして記録する」を選びます。記録はアカウントに残ります。店頭の割引が自動で適用されるわけではなく、条件は各クーポンの説明に従ってください。',
  },
  {
    id: 'faq-2',
    category: 'app',
    question: 'お気に入りは何件まで保存できますか？',
    answer:
      'お気に入りの件数に上限はありません。ホームや詳細のハートから追加・解除でき、お気に入りタブでいつでも見返せます。',
  },
  {
    id: 'faq-3',
    category: 'app',
    question: '現在地が取れなくてもスポットを探せますか？',
    answer:
      'はい。ヘッダーのエリア選択から渋谷・恵比寿・六本木などを選ぶと、その地点からの距離でスポットが並びます。',
  },
  {
    id: 'faq-4',
    category: 'app',
    question: 'デートプランはどのように作りますか？',
    answer:
      '「プラン」タブの「新しいプランを作る」から、タイトルとメモを入力し、お気に入りや検索一覧のスポットを順番に追加して保存します。',
  },
  {
    id: 'faq-5',
    category: 'coupon',
    question: 'クーポンの有効期限はどこで確認できますか？',
    answer:
      '各クーポンカードに期限が表示されます。プッシュ通知では知らせません。',
  },
  {
    id: 'faq-6',
    category: 'account',
    question: 'ゲストのままでも使えますか？',
    answer:
      'ゲストでも閲覧やお気に入り、プラン作成はできます。ログインするとレビュー投稿やデータの同期がより安定します。',
  },
  {
    id: 'faq-7',
    category: 'account',
    question: 'ダークモードはどこで切り替えますか？',
    answer:
      'マイページの設定から「ダークモード」スイッチで切り替えられます。「システム設定に合わせる」で端末の外観にも戻せます。',
  },
  {
    id: 'faq-8',
    category: 'app',
    question: '席の予約は確定しますか？',
    answer:
      'デートベースでは席の予約を受け付けていません。営業時間と空席は、各施設の案内を確認してください。',
  },
];

export type UseFaqResult = {
  items: FaqItem[];
  filter: FaqFilter;
  setFilter: (filter: FaqFilter) => void;
  openId: string | null;
  toggleItem: (id: string) => void;
};

export function useFaq(): UseFaqResult {
  const [filter, setFilter] = useState<FaqFilter>('all');
  const [openId, setOpenId] = useState<string | null>(null);

  const items = useMemo(() => {
    if (filter === 'all') {
      return [...FAQ_ITEMS];
    }

    return FAQ_ITEMS.filter((item) => item.category === filter);
  }, [filter]);

  const toggleItem = (id: string): void => {
    setOpenId((current) => (current === id ? null : id));
  };

  return {
    items,
    filter,
    setFilter,
    openId,
    toggleItem,
  };
}
