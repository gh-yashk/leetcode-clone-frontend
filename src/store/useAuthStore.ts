import { fetchCurrentUser, logoutUser, type CurrentUser, } from "@/lib/api/users";
import { toast } from "sonner";
import { create } from "zustand";

interface AuthState {
    user: CurrentUser | null;
    loading: boolean;
    fetchUser: () => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    loading: false,

    fetchUser: async () => {
        set({ loading: true });
        const user = await fetchCurrentUser();
        set({ user, loading: false });
    },

    logout: async () => {
        set({ user: null });
        toast.success("Signed out. See you soon!", {
            style: {
                background: "#333",
                color: "#f5f5f5",
            },
        });
        setTimeout(() => {
            logoutUser();
        }, 4000);
    },
}));
