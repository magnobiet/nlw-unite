import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type Badge = {
  id: number;
  name: string;
  email: string;
  eventName: string;
  checkInURL: string;
  image?: string;
};

type StateProps = {
  data: Badge | null;
  save: (badge: Badge) => void;
  remove: () => void;
  updateAvatar: (uri: string) => void;
};

export const useBadgeStore = create(
  persist<StateProps>(
    (set) => ({
      data: null,
      save(data) {
        set(() => ({ data }));
      },
      remove() {
        set(() => ({ data: null }));
      },
      updateAvatar(uri) {
        set((state) => ({
          data: state.data
            ? {
                ...state.data,
                image: uri,
              }
            : state.data,
        }));
      },
    }),
    {
      name: 'nlw-unite:badge',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
