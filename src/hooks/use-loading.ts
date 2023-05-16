import { useState } from 'react';

export const useLoading = () => {
  const [loading, setLoading] = useState(false);

  const toggle = (value?: boolean) => {
    setLoading((prev) => value ?? !prev);
  };

  return { loading, toggle };
};
