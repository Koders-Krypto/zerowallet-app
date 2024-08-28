import create from 'zustand';

interface Dapp {
    topic: string;
    name: string;
    description: string;
    url: string;
    icons: string[];
}

interface DappStore {
    connectedDapps: Dapp[];
    addDapp: (dapp: Dapp) => void;
    removeDapp: (topic: string) => void;
}

const useDappStore = create<DappStore>((set) => ({
    connectedDapps: [],
    addDapp: (dapp) => set((state) => ({ connectedDapps: [...state.connectedDapps, dapp] })),
    removeDapp: (topic) => set((state) => ({
        connectedDapps: state.connectedDapps.filter((dapp) => dapp.topic !== topic),
    })),
}));

export default useDappStore;
