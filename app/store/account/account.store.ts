import create from 'zustand';

const useAccountStore = create((set) => ({
  accountDetails: {},
  chainId: localStorage.getItem('chainId') ? parseInt(localStorage.getItem('chainId')!) : 137,

  setChainId: (id: number) => {
    set((state: any) => ({
      ...state,
      chainId: id,
    }));
  },

  setAccountDetails: (data: object) =>
    set((state: any) => ({
      accountDetails: data,
    })),

}));
export default useAccountStore;
