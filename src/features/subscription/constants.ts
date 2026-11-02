import type { UserRole } from '@/types';

export const ROLE_LABELS: Record<UserRole, string> = {
  free: '無料会員',
  premium: 'プレミアム会員',
};

export const PREMIUM_PLAN = {
  name: '有料プラン',
  priceLabel: '未提供',
  headline: '現在は無料',
  description:
    'デートベースは現在、無料で使えます。\n有料プランの決済はまだ開始していません。',
  benefits: [
    'スポットの検索と地図',
    'お気に入りとデートプラン',
    '提携クーポンがあるときの利用記録',
  ],
} as const;

export type PremiumPlan = typeof PREMIUM_PLAN;
