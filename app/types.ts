export type ItemInfo = {
  id: string;
  itemName: string;
  need: boolean;
  quantity?: number;
  note?: string;
};

export type UndoAction = {
  type: 'delete' | 'check';
  item: ItemInfo;
};
