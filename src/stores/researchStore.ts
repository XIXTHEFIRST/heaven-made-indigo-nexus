import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from 'sonner';

export interface ResearchEntry {
    id: string;
    title: string;
    type: string;
    content: string;
    source: string;
    createdAt: string;
}

interface ResearchStore {
    entries: ResearchEntry[];
    addEntry: (entry: Omit<ResearchEntry, 'id' | 'createdAt'>) => void;
    removeEntry: (id: string) => void;
}

export const useResearchStore = create<ResearchStore>()(
    persist(
        (set) => ({
            entries: [],
            addEntry: (entry) => {
                const newEntry = {
                    ...entry,
                    id: crypto.randomUUID(),
                    createdAt: new Date().toISOString(),
                };
                set((state) => ({
                    entries: [newEntry, ...state.entries],
                }));
                toast.success('Research entry added successfully');
            },
            removeEntry: (id) => {
                set((state) => ({
                    entries: state.entries.filter((e) => e.id !== id),
                }));
                toast.success('Research entry removed');
            },
        }),
        {
            name: 'research-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        }
    )
);
