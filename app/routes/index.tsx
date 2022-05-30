import { Button, Modal, Switch } from '@mantine/core';
import { ErrorBoundaryComponent, json, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { itemsAtom, shoppingListAtom, shoppingListToggleAtom } from '~/atoms';
import Item from '~/components/Item';
import { ItemInfo } from '~/types';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDra5wmP5z3ijYTq5FP2jlz8V-SHrqA7VM',
  authDomain: 'groceries-christianpayne.firebaseapp.com',
  projectId: 'groceries-christianpayne',
  storageBucket: 'groceries-christianpayne.appspot.com',
  messagingSenderId: '186982361770',
  appId: '1:186982361770:web:ae1b9f260bd75678c77ed3',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const loader: LoaderFunction = async () => {
  // const groceriesCol = collection(db, 'groceries');
  // const groceriesSnapshot = await getDocs(groceriesCol)
  // const items = groceriesSnapshot.docs.map((doc) => doc.data());

  const items: Array<ItemInfo> = [
    {
      id: '1',
      itemName: 'Kale pls',
      need: true,
      quantity: 2,
    },
    {
      id: '2',
      itemName: 'Peanuts pls',
      need: false,
      quantity: 2,
    },
  ];
  return json(items);
};

export default function MyApp() {
  const data = useLoaderData();
  const [items, setItems] = useAtom(itemsAtom);
  const [shoppingList] = useAtom(shoppingListAtom);
  const [shoppingListToggle, setShoppingListToggle] = useAtom(
    shoppingListToggleAtom
  );

  function getItems() {
    return shoppingListToggle ? shoppingList : items;
  }

  function updateItem(item: ItemInfo) {
    let newItems = items.map((i) => {
      if (i.id === item.id) {
        return item;
      }
      return i;
    });
    setItems(newItems);
  }

  useEffect(() => {
    setItems(data);
  }, [data]);

  return (
    <div className="flex flex-col w-full items-center">
      <div className="text-4xl mb-4">Groceries</div>

      <div className="flex">
        <p>Shopping List</p>
        <Switch
          aria-label="Shopping List Toggle"
          size="md"
          color="cyan"
          className="mb-4 ml-2"
          checked={shoppingListToggle}
          onChange={(event) =>
            setShoppingListToggle(event.currentTarget.checked)
          }
        />
      </div>

      <div className="space-y-4 w-full lg:w-1/2">
        {getItems().map((item, i) => (
          <Item key={i} item={item} updateItem={updateItem} />
        ))}

        {getItems().length === 0 && shoppingListToggle && (
          <div className="text-center text-xl">
            Looks like you got everything!
          </div>
        )}
      </div>
    </div>
  );
}

export const errorBoundary: ErrorBoundaryComponent = () => {
  return <> ERROR HELP!</>;
};
