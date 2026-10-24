# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.

## 現在の作業コンテキスト

*   **直近のネクストアクション**:
    1. **Play Console 審査提出（承認待ち）**:
        * 本人確認の承認を待ち、「アプリを作成」のロック解除を確認する（待機中）。
        * 解除後、Play Console上で `DateSpot` アプリ枠を作成する。
        * ストア掲載情報（`docs/store-metadata.md`）、アセット画像、`.aab`（v3）をアップロードして審査へ提出する。
        * 「アプリへのアクセス」と「データセーフティ」は `docs/store-metadata.md` の記載に沿って記入する。

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
