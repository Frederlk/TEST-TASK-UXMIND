'use client';

import { useEffect, useState } from 'react';

import { RepoModal } from '@components/modals/repo-modal';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <RepoModal />
    </>
  );
};
