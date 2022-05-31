import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { ItemInfo, UndoAction } from './types';

export const itemsAtom = atomWithStorage<Array<ItemInfo>>('items', []);

export const shoppingListAtom = atom((get) =>
  get(itemsAtom).filter((item) => item.need)
);

export const shoppingListToggleAtom = atomWithStorage(
  'shoppingListToggle',
  false
);

export const lastActionAtom = atom<UndoAction | null>(null);
