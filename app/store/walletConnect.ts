import { create } from "zustand";

export interface Dapp {
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
  getDapp: (topic: string) => Dapp;
}

const useDappStore = create<DappStore>((set, get) => ({
  connectedDapps: [],
  addDapp: (dapp) =>
    set((state) => ({ connectedDapps: [...state.connectedDapps, dapp] })),
  removeDapp: (topic) =>
    set((state) => ({
      connectedDapps: state.connectedDapps.filter(
        (dapp) => dapp.topic !== topic
      ),
    })),
  getDapp(topic) {
    return get().connectedDapps.find((dapp) => dapp.topic === topic)!;
  },
}));

export default useDappStore;
