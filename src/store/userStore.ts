import { create } from "zustand";

type UserInfo = {
  id: string;
  email: string | null;
  name: string | null;
};

type UserState = {
  user: UserInfo | null;
  setUser: (u: UserInfo | null) => void;
  clear: () => void;
  getUser: () => UserInfo | null;
};

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  setUser: (u) => set({ user: u }),
  clear: () => set({ user: null }),
  getUser: () => get().user,
}));

