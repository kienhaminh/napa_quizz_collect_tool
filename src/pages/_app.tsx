import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { RTL } from 'src/components/rtl';
import { SplashScreen } from 'src/components/splash-screen';
import { SettingsButton } from 'src/components/settings/settings-button';
import { SettingsDrawer } from 'src/components/settings/settings-drawer';
import { Toaster } from 'src/components/toaster';
import {
  SettingsConsumer,
  SettingsProvider,
} from 'src/contexts/settings-context';
import { AuthConsumer, AuthProvider } from 'src/contexts/auth/jwt-context';
import { gtmConfig } from 'src/config';
import { useAnalytics } from 'src/hooks/use-analytics';
import { useNProgress } from 'src/hooks/use-nprogress';
import { persistor, store } from 'src/store';
import { createTheme } from 'src/theme';
import { createEmotionCache } from 'src/utils/create-emotion-cache';
// Remove if react-quill is not used
import 'react-quill/dist/quill.snow.css';
// Remove if react-draft-wysiwyg is not used
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// Remove if simplebar is not used
import 'simplebar-react/dist/simplebar.min.css';
// Remove if mapbox is not used
import 'mapbox-gl/dist/mapbox-gl.css';
// Remove if locales are not used
import '../locales/i18n';

const clientSideEmotionCache = createEmotionCache();

const App = (props: AppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useAnalytics(gtmConfig);
  useNProgress();

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Devias Kit PRO</title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <ReduxProvider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <AuthProvider>
              <AuthConsumer>
                {(auth) => (
                  <SettingsProvider>
                    <SettingsConsumer>
                      {(settings) => {
                        // Prevent theme flicker when restoring custom settings from browser storage
                        if (!settings.isInitialized) {
                          // return null;
                        }

                        const theme = createTheme({
                          colorPreset: settings.colorPreset,
                          contrast: settings.contrast,
                          direction: settings.direction,
                          paletteMode: settings.paletteMode,
                          responsiveFontSizes: settings.responsiveFontSizes,
                        });

                        // Prevent guards from redirecting
                        const showSlashScreen = !auth.isInitialized;

                        return (
                          <ThemeProvider theme={theme}>
                            <Head>
                              <meta
                                name="color-scheme"
                                content={settings.paletteMode}
                              />
                              <meta
                                name="theme-color"
                                content={theme.palette.neutral[900]}
                              />
                            </Head>
                            <RTL direction={settings.direction}>
                              <CssBaseline />
                              {showSlashScreen ? (
                                <SplashScreen />
                              ) : (
                                <>
                                  {getLayout(<Component {...pageProps} />)}
                                  {/* <SettingsButton
                                    onClick={settings.handleDrawerOpen}
                                  />
                                  <SettingsDrawer
                                    canReset={settings.isCustom}
                                    onClose={settings.handleDrawerClose}
                                    onReset={settings.handleReset}
                                    onUpdate={settings.handleUpdate}
                                    open={settings.openDrawer}
                                    values={{
                                      colorPreset: settings.colorPreset,
                                      contrast: settings.contrast,
                                      direction: settings.direction,
                                      paletteMode: settings.paletteMode,
                                      responsiveFontSizes:
                                        settings.responsiveFontSizes,
                                      stretch: settings.stretch,
                                      layout: settings.layout,
                                      navColor: settings.navColor,
                                    }}
                                  /> */}
                                </>
                              )}
                              <Toaster />
                            </RTL>
                          </ThemeProvider>
                        );
                      }}
                    </SettingsConsumer>
                  </SettingsProvider>
                )}
              </AuthConsumer>
            </AuthProvider>
          </LocalizationProvider>
        </PersistGate>
      </ReduxProvider>
    </CacheProvider>
  );
};

export default App;
