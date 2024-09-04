import { create } from 'zustand';

interface AccountStoreState {
  accountDetails: Record<string, any>; // or a more specific type if you know the structure
  chainId: number;
  setChainId: (id: number) => void;
  setAccountDetails: (data: Record<string, any>) => void;
}

const useAccountStore = create<AccountStoreState>((set) => ({
  accountDetails: {},
  chainId: typeof window !== 'undefined' && localStorage.getItem('chainId')
    ? parseInt(localStorage.getItem('chainId')!)
    : 137, // Default value when localStorage is not available

  setChainId: (id: number) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chainId', id.toString());
    }
    set((state) => ({
      ...state,
      chainId: id,
    }));
  },

  setAccountDetails: (data: Record<string, any>) =>
    set(() => ({
      accountDetails: data,
    })),
}));

export default useAccountStore;
