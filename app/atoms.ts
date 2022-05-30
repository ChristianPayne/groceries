import { atom } from 'jotai';
import { ItemInfo } from './types';

export const itemsAtom = atom<Array<ItemInfo>>([]);
