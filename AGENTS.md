# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.

## 現在の作業コンテキスト

*   **直近のネクストアクション**:
    1. **外部アカウント側の公開準備**:
        * GitHub リポジトリ `wanthis-apps/datespot-lp` を `datebase` に改名する。ローカルフォルダ `DateSpot-app` も、Cursor を閉じたあと `datebase` に改名する。
        * Supabase の SQL Editor で `supabase/migrations/20261102140000_delete_own_account.sql` を実行する。
        * Google Cloud で Maps の API キーを制限し、`GOOGLE_MAPS_API_KEY` を EAS の環境変数に登録する。キーは `app.json` から外した。
        * 公開サイトのカスタムドメインは、まだ `datespot.wanthis-apps.com`。Vercel で配信を確認し、必要なら `datebase.wanthis-apps.com` を追加する。
        * Play Console の本人確認後、アプリ名「デートベース」で枠を作り、`docs/store-metadata.md` に沿って提出する。スクリーンショットは本番画面の撮り直しが残っている。

*   **完了済み**:
    1. **WANTHISブランドロゴの本番データ化 [完了]**:
        * `npm run build:brand-logo`（`scripts/generate-brand-logo.js`）でインフィニティWと WANTHIS テキストの SVG/PNG、ファビコンを生成済み。
        * `assets/brand/wanthis-logo.svg`、`wanthis-logo.png`（2000x500）、`wanthis-symbol.svg`。
        * `site/public/logo.svg`、`favicon.png`（32x32）、`apple-touch-icon.png`（180x180）。
    2. **DateSpotストアアセットの最終化 [完了]**:
        * `icon-512.png` (512x512)、`feature-graphic.png` (1024x500) 生成完了。
        * `assets/store/screenshots/` にトリミング済み撮影画像4枚の配置完了。
    3. **審査用アカウントの準備・データセーフティ整理 [完了]**:
        * `docs/store-metadata.md` に「アプリへのアクセス情報」と「データセーフティ回答用シート」を追加済み。
        * 審査用アカウント `reviewer@wanthis-apps.com` を作成し、パスワードを同ファイルへ記載済み。
