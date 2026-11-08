# デートベース — 開発引き継ぎ

Claude Code はこのファイルを最初に読む。チャット履歴は残っていない前提で、ここだけで再開できる状態にしてある。

ユーザーへの説明、作業報告、コードコメントは日本語で書く。

## これは何か

カップル向けのデートスポット検索アプリ。運営ブランドは WANTHIS。第1弾アプリ。

できること:

- スポットの一覧・詳細・地図ピン
- エリア / カテゴリー / 関係性タグ / キーワードでの絞り込み
- お気に入り、デートプラン
- 提携クーポンがあるときの利用記録（`user_coupons_history`）
- 起動時の Supabase Auth。ゲスト閲覧はできる。お気に入りの保存にはログインが要る

やっていないこと:

- 席の予約
- 有料プランの決済。画面上のプレミアムは「未提供 / 現在は無料」（`src/features/subscription/constants.ts`）

## 名前

呼び方を混ぜない。

| 場所 | 値 |
| --- | --- |
| 表示名 | デートベース |
| npm パッケージ | `datebase-app`（アプリ）、`datebase-site`（公開サイト） |
| Expo slug / URL scheme | `datebase` |
| iOS bundle / Android package | `com.wanthis.datebase` |
| EAS projectId | `787781a1-0274-4da4-a8cd-db198d2c4c2f`（変えない） |
| 公開サイト | `https://datespot.wanthis-apps.com` |
| Git リモート | `https://github.com/wanthis-apps/datebase.git`（2026-11-08 に `datespot-lp` から改名） |
| ローカルフォルダ | `C:\Users\deskt\claude_work\デートベース` |

`datespot` が残っているのは、公開サイトのホスト名と Vercel のプロジェクト名だけ。アプリ名を DateSpot に戻さない。ログの `[DateSpot]` は古い接頭辞で、表示名ではない。

公開サイトのホストを `datebase.wanthis-apps.com` に変える作業は未了。DNS と Vercel が変わるまで、コード上の正規 URL は `src/constants/publicSite.ts` の `datespot.wanthis-apps.com` のままにする。

## 技術

- アプリ: Expo SDK 57（`expo ~57.0.22`）、React Native 0.86、React 19、TypeScript strict。コードを書く前に https://docs.expo.dev/versions/v57.0.0/ を見る
- データ: Supabase（Auth + Postgres）。クライアントは anon キーのみ。サービスロールキーはアプリに入れない
- 状態: Zustand。画面ロジックはフックへ置く
- 公開サイト: `site/` の Next.js 16。アプリとは別の `package.json`。`site/` の Next の書き方は `site/AGENTS.md` に従う
- Node.js 22 以降、npm
- パスエイリアス `@/*` は `src/*`

## 動かし方

アプリ（リポジトリ直下）:

```bash
npm install
copy .env.example .env
npx expo start --clear
npx tsc --noEmit
```

`.env` に置くもの:

- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- `GOOGLE_MAPS_API_KEY`（地図のネイティブ設定だけ。JS バンドルには埋め込まない。`app.config.ts` が読む）

環境変数を変えたあとは `npx expo start --clear`。`.env` はコミットしない。

公開サイト:

```bash
cd site
npm install
npm run dev
```

この作業環境では、実機とシミュレータを日常の確認手段にしない。ロジック変更は `npx tsc --noEmit` で見る。`react-native-maps` の見た目確認を必須にしない。ストア用スクリーンショットの撮り直しだけは、実機がいる別作業として残っている。

## コードの置き場所

```
App.tsx                 プロバイダと起動時のデータ購読
index.tsx               Expo のエントリ
src/features/spots      一覧・詳細・検索・お気に入り
src/features/map        地図。Web は SpotMap.web.tsx
src/features/coupons    クーポン
src/features/auth       セッション、マイページ
src/features/subscription  会員表示（決済なし）
src/navigation          タブ 6 つ + 詳細スタック
                        Home / Map / Coupons / Favorites / Plans / MyPage
src/screens             認証、法務、通知、FAQ、問い合わせなど
src/services            Supabase クライアントと環境変数
src/types/database.ts   アプリが読む Supabase の型。列の正はここ
src/types/models.ts     画面が使うドメイン型
hooks/                  ルート直下。通知、プラン、オンボーディングなど。まだ使っている
types/database.ts       古い型。一部画面がまだ import している。スキーマの正ではない
site/                   プライバシー / 利用規約 / アカウント削除 / サポート
supabase/               SQL。適用は Supabase の SQL Editor
docs/store-metadata.md  Play 掲載文、データセーフティ、撮影手順
assets/store/           Play 用画像
```

タブとスタックの入口は `src/navigation/RootNavigator.tsx` と `TabNavigator.tsx`。

## データベース

アプリが読むスポット列は `src/types/database.ts` の `spots`。主な列は `lat`, `lng`, `area`, `category`, `time_recommended`, `relationship_tags`, `is_partner_store`, `image_url`, `description`, `tags`。

SQL の役割:

| ファイル | 状態 | 扱い |
| --- | --- | --- |
| `supabase/seed.sql` | コミット済み | サンプルスポット。列はアプリの型に合わせてある。再実行は spots / coupons を消して入れ直す |
| `supabase/seed_closed_test_real_spots.sql` | コミット済み | クローズドテスト用の実在スポット。再実行は関連行を消して入れ直す。クーポンは空 |
| `supabase/migrations/20261102140000_delete_own_account.sql` | コミット済み | 本人の退会関数 `public.delete_own_account`。本番の SQL Editor では未実行の可能性がある |
| `supabase/schema.sql` | コミット済み | 初期スキーマのつもりだが、`spots` が `latitude` / `longitude` の古い形のまま。seed やアプリの型と一致しない。本番に流し直さない |
| `types/database.ts` | コミット済み | 上の古い形に対応する型。新規の正にしない |
| `supabase/seed_store_demo.sql` | 未コミット | ストア撮影用の架空店。本番提出用のデータではない |
| `supabase/migrations/001_security_policies.sql` | 未コミット | 存在するテーブルだけの RLS。reviews 等は対象外とコメントされている |
| `supabase/migrations/20261003171500_secure_client_rls.sql` | 未コミット | reviews 等にもポリシーを足す。001 と前提が違う。本番へ流す前に、今のテーブルと突き合わせる |

クーポン利用と会員行には、Supabase Auth の匿名ログインを有効にしておく。

## 公開の残り

コードで終わっていない。人が各サービスの画面で行う。

1. ~~GitHub リポジトリを `datebase` に改名する~~ 済み（2026-11-08）。Vercel のプロジェクト（`datespot-lp` / `datespot-site`）が新しいリポジトリ名で連携できているかは未確認。
2. Supabase SQL Editor で `supabase/migrations/20261102140000_delete_own_account.sql` を実行する。
3. Google Cloud で Maps の API キーを制限し、同じ値を EAS の環境変数 `GOOGLE_MAPS_API_KEY` に登録する。キーは `app.json` から外してある。
4. Vercel で `https://datespot.wanthis-apps.com` の配信を確認する。必要なら `datebase.wanthis-apps.com` を足す。足すまではコードの URL を変えない。
5. Play Console の本人確認後、アプリ名「デートベース」で枠を作り、`docs/store-metadata.md` に沿って提出する。
6. 審査用アカウント `reviewer@wanthis-apps.com` を Supabase Auth に作る。パスワードはリポジトリに書かない。パスワード管理と Play Console の審査メモにだけ置く。
7. 提出用スクリーンショットは、架空店の画面が `assets/store/screenshots/` にある。審査に出す前に、本番の実在スポットが見える画面へ撮り直す。手順は `docs/store-metadata.md` の撮影ガイド。

ストア掲載の説明文、データセーフティの回答、アセット寸法は `docs/store-metadata.md` が正。プライバシーは `/privacy`、利用規約は `/terms`、アカウント削除は `/account-deletion`、サポートは `/support`。問い合わせは `support@wanthis-apps.com`。

## ディスク上にあるが Git に入っていないもの

同じフォルダで開けば残っている。別のマシンで `git clone` しただけでは無い。

- `assets/store/icon-512.png`
- `assets/store/feature-graphic.png`
- `assets/store/screenshots/` と `assets/store/raw_screenshots/`（各 4 枚）
- `scripts/generate-store-assets.js`（`npm run build:store-assets`）
- `scripts/generate-feature-graphic.js`（`npm run build:feature-graphic`）
- `scripts/crop-screenshots.js`（`npm run crop:screenshots`）
- 上の未コミット SQL 3 ファイル

ブランドロゴの生成（`npm run build:brand-logo`、`scripts/generate-brand-logo.js`、`assets/brand/`、`site/public/logo.svg`）はコミット済み。

## 完了していること

- 表示名を「デートベース」に揃えた。公開できないダミーの決済動作は外した
- WANTHIS ロゴ（インフィニティ W）の SVG / PNG / ファビコン
- ストア用の説明文、データセーフティ回答、アイコンとフィーチャーグラフィックの寸法定義
- 公開サイトの法務ページとアカウント削除ページ
- クローズドテスト用の実在スポット投入 SQL

## 触るときの注意

- 新しいデータ型は `src/types/database.ts` に合わせる。ルートの `types/database.ts` を広げない
- ビジネスロジックは画面ファイルに足さず、既存のフック（`src/features/*/hooks` またはルートの `hooks/`）へ置く
- 関数コンポーネントと React Hooks
- 秘密情報、`.env`、審査用パスワードをコミットしない
- `schema.sql` を本番の作り直しに使わない
- 未コミットの RLS SQL は、内容を読まずに本番へ実行しない
