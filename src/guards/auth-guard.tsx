import type { FC, ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'src/hooks/use-router';
import { paths } from 'src/paths';
import { useSelector } from 'src/store';
import { getAuthData } from 'src/slices/auth';

interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard: FC<AuthGuardProps> = (props) => {
  const { children } = props;
  const router = useRouter();
  const { authToken } = useSelector(getAuthData);
  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!authToken) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.href,
      }).toString();
      const href = paths.login + `?${searchParams}`;
      router.replace(href);
    } else {
      setChecked(true);
    }
  }, [authToken, router]);

  // Only check on mount, this allows us to redirect the user manually when auth state changes
  useEffect(
    () => {
      check();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return <>{children}</>;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};
