import { create } from "zustand";
import { persist } from "zustand/middleware";

type CodeStore = {
    // userCodeMap[problemId][languageId] = code
    userCodeMap: Record<number, Record<string, string>>;
    preferredLanguageId: string | null;
    preferredLanguageName: string | null;

    setUserCode: (problemId: number, languageId: string, code: string) => void;
    getUserCode: (problemId: number, languageId: string) => string | undefined;

    setPreferredLanguage: (id: string, name: string) => void;
};

export const useCodeStore = create<CodeStore>()(
    persist(
        (set, get) => ({
            userCodeMap: {},
            preferredLanguageId: null,
            preferredLanguageName: null,

            setUserCode: (problemId, languageId, code) => {
                const prev = get().userCodeMap[problemId] ?? {};
                set((state) => ({
                    userCodeMap: {
                        ...state.userCodeMap,
                        [problemId]: {
                            ...prev,
                            [languageId]: code,
                        },
                    },
                }));
            },

            getUserCode: (problemId, languageId) => {
                return get().userCodeMap[problemId]?.[languageId];
            },

            setPreferredLanguage: (id, name) => {
                set({
                    preferredLanguageId: id,
                    preferredLanguageName: name,
                });
            },
        }),
        {
            name: "user-code-storage", // key in localStorage
        }
    )
);
