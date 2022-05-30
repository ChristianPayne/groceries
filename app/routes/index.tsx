import { Button } from '@mantine/core';
import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { itemsAtom } from '~/atoms';
import Item from '~/components/Item';
import { ItemInfo } from '~/types';

export const loader: LoaderFunction = () => {
  const items: Array<ItemInfo> = [
    {
      itemName: 'Kale pls',
      quantity: 2,
    },
    {
      itemName: 'Peanuts pls',
      quantity: 2,
    },
  ];
  return json(items);
};

export default function MyApp() {
  const data = useLoaderData();
  const [items, setItems] = useAtom(itemsAtom);

  useEffect(() => {
    setItems(data);
  }, [data]);

  return (
    <div className="flex flex-col w-full items-center">
      <div className="text-4xl">Groceries</div>
      <div className="space-y-4 w-[80%]">
        {items.map((item) => (
          <Item item={item} />
        ))}
      </div>
    </div>
  );
}
