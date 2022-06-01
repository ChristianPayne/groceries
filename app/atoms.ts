import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { ItemInfo, UndoAction } from './types';

export const itemsAtom = atomWithStorage<Array<ItemInfo>>('items', []);

export const filterAtom = atom('');

export const filteredItemsAtom = atom<Array<ItemInfo>>((get) =>
  get(filterAtom)
    ? get(itemsAtom).filter((item) =>
        item.itemName.toLowerCase().includes(get(filterAtom).toLowerCase())
      )
    : get(itemsAtom)
);

export const shoppingListAtom = atom((get) =>
  get(filteredItemsAtom).filter((item) => item.need)
);

export const shoppingListToggleAtom = atomWithStorage(
  'shoppingListToggle',
  false
);

export const lastActionAtom = atom<UndoAction | null>(null);
