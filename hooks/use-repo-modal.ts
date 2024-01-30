import { create } from 'zustand';

type RepoModalStore = {
  repoId?: number;
  isOpen: boolean;
  onOpen: (repoId: number) => void;
  onClose: () => void;
};

export const useRepoModal = create<RepoModalStore>((set) => ({
  repoId: undefined,
  isOpen: false,
  onOpen: (repoId: number) => set({ isOpen: true, repoId }),
  onClose: () => set({ isOpen: false, repoId: undefined }),
}));
