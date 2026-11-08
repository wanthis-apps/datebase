import type { ConfigContext, ExpoConfig } from 'expo/config';

const SITE_ORIGIN = 'https://datespot.wanthis-apps.com';

type ExpoPlugin = NonNullable<ExpoConfig['plugins']>[number];

export default ({ config }: ConfigContext): ExpoConfig => {
  const mapsApiKey = process.env.GOOGLE_MAPS_API_KEY ?? '';
  // EAS の本番ビルドでキーが無いと、地図が空のままストアに出てしまう。ビルドの段階で止める。
  if (
    process.env.EAS_BUILD === 'true' &&
    process.env.EAS_BUILD_PROFILE === 'production' &&
    mapsApiKey === ''
  ) {
    throw new Error(
      'GOOGLE_MAPS_API_KEY が未設定です。EAS の production 環境変数に登録してください。',
    );
  }
  const plugins: NonNullable<ExpoConfig['plugins']> = (config.plugins ?? []).map(
    (plugin): ExpoPlugin => {
      const name = Array.isArray(plugin) ? plugin[0] : plugin;
      if (name === 'react-native-maps') {
        const mapsPlugin: ExpoPlugin = [
          'react-native-maps',
          { androidGoogleMapsApiKey: mapsApiKey },
        ];
        return mapsPlugin;
      }
      return plugin;
    },
  );

  return {
    ...config,
    name: 'デートベース',
    slug: 'datebase',
    scheme: 'datebase',
    android: {
      ...config.android,
      config: {
        ...(config.android?.config ?? {}),
        googleMaps: {
          apiKey: mapsApiKey,
        },
      },
    },
    plugins,
    extra: {
      ...(config.extra ?? {}),
      privacyPolicyUrl: `${SITE_ORIGIN}/privacy`,
      termsOfServiceUrl: `${SITE_ORIGIN}/terms`,
    },
  };
};
