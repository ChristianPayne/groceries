import { ErrorBoundaryComponent, json, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { Button, Modal, Switch, TextInput } from '@mantine/core';
import { useAtom } from 'jotai';
import { itemsAtom, shoppingListAtom, shoppingListToggleAtom } from '~/atoms';
import Item from '~/components/Item';
import { ItemInfo } from '~/types';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
} from 'firebase/firestore';

import { initializeApp } from 'firebase/app';
import AddItem from '~/components/AddItem';

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

const groceriesCol = doc(db, 'groceries/items');

export const loader: LoaderFunction = async () => {
  const groceriesSnapshot = await getDoc(groceriesCol);
  const items = groceriesSnapshot.data()?.items;

  return json(items ?? []);
};

export default function MyApp() {
  const data = useLoaderData();
  const [items, setItems] = useAtom(itemsAtom);
  const [shoppingList] = useAtom(shoppingListAtom);
  const [shoppingListToggle, setShoppingListToggle] = useAtom(
    shoppingListToggleAtom
  );
  const [addItemModal, setAddItemModal] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(groceriesCol, (doc) => {
      console.log('Current data: ', doc.data());
    });
    return unsub;
  }, []);

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

  function addItem(item: ItemInfo) {
    // Send it!
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
      <Modal
        opened={addItemModal}
        onClose={() => {
          setAddItemModal(false);
        }}
        title="Add Item"
      >
        <AddItem
          addItem={(newItem: ItemInfo) => {
            console.log('This is a log from index', newItem);
          }}
        />
      </Modal>
      <Button
        className="m-4"
        color="cyan"
        onClick={() => {
          setAddItemModal(true);
        }}
      >
        Add Item
      </Button>
    </div>
  );
}

export const errorBoundary: ErrorBoundaryComponent = () => {
  return <> ERROR HELP!</>;
};
