import type { ConfigContext, ExpoConfig } from 'expo/config';

const SITE_ORIGIN = 'https://datespot.wanthis-apps.com';

type ExpoPlugin = NonNullable<ExpoConfig['plugins']>[number];

export default ({ config }: ConfigContext): ExpoConfig => {
  const mapsApiKey = process.env.GOOGLE_MAPS_API_KEY ?? '';
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
