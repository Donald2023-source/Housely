import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type User = {
  name: string;
  email: string;
  isSignedIn: boolean;
};

type AuthState = {
  user: User | null;
  login: (user: any) => void;
  logout: () => void;
};

const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      login: (user) => {
        set({
          user,
        });
      },

      logout: () => {
        set({
          user: null,
        });
      },
    }),
    {
      name: "auth-storage",

      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useAuth;
