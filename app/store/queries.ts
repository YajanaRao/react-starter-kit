import localforage from "localforage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
// Define the Zustand store

const useQueryStore = create()(
  persist(
    (set) => ({
      queries: {},
      index: 0,
      setQueries: (newQueries) => set(() => ({ queries: newQueries })),
      addQuery: (question: string, answer: string) =>
        set((state) => {
          const newId = Object.keys(state.queries).length + 1;
          return {
            queries: {
              ...state.queries,
              [newId]: { question, answer },
            },
          };
        }),
    }),
    {
      name: "query-store", // unique name for localStorage
      storage: createJSONStorage(() => localforage), // (optional) by default, 'localStorage' is used
    }
  )
);
export default useQueryStore;
