import { useCallback, useEffect } from 'react';
import type { AuthContextType } from 'src/contexts/auth/auth0-context';
import { IssuerGuard } from 'src/guards/issuer-guard';
import { GuestGuard } from 'src/guards/guest-guard';
import { useAuth } from 'src/hooks/use-auth';
import { useMounted } from 'src/hooks/use-mounted';
import { useRouter } from 'src/hooks/use-router';
import { paths } from 'src/paths';
import type { Page as PageType } from 'src/types/page';
import { Issuer } from 'src/utils/auth';

const Page: PageType = () => {
  const isMounted = useMounted();
  const router = useRouter();
  const { handleRedirectCallback } = useAuth<AuthContextType>();

  const handle = useCallback(
    async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get('code');
      const state = searchParams.get('state');

      const hasParams = !!(code && state);

      if (!hasParams) {
        router.replace(paths.index);
        return;
      }

      try {
        const appState = await handleRedirectCallback() as { returnTo?: string };

        if (isMounted()) {
          // returnTo could be an absolute path
          window.location.replace(appState?.returnTo || paths.dashboard.index);
        }
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          router.replace(paths.index);
        }
      }
    },
    [router, handleRedirectCallback, isMounted]
  );

  useEffect(
    () => {
      handle();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return null;
};

Page.getLayout = (page) => (
  <IssuerGuard issuer={Issuer.Auth0}>
    <GuestGuard>
      {page}
    </GuestGuard>
  </IssuerGuard>
);

export default Page;
