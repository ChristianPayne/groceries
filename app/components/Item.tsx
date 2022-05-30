import { ItemInfo } from '~/types';

type Props = {
  item: ItemInfo;
};

export default function Item({ item }: Props) {
  return (
    <div className="bg-neutral-400 p-4 rounded-md w-full">
      <p>{item.itemName}</p>
      <p>{item?.quantity}</p>
    </div>
  );
}
