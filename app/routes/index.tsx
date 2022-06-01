import { ErrorBoundaryComponent, json, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { Button, Modal, Switch, TextInput } from '@mantine/core';
import { useAtom } from 'jotai';
import {
  itemsAtom,
  lastActionAtom,
  filteredItemsAtom,
  shoppingListAtom,
  shoppingListToggleAtom,
} from '~/atoms';
import Item from '~/components/Item';
import { ItemInfo, UndoAction } from '~/types';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';

import { initializeApp } from 'firebase/app';
import AddItem from '~/components/AddItem';
import { showNotification } from '@mantine/notifications';
import Search from '~/components/Search';

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

const groceriesRef = doc(db, 'groceries/items');

export default function MyApp() {
  const [items, setItems] = useAtom(itemsAtom);
  const [shoppingList] = useAtom(shoppingListAtom);
  const [shoppingListToggle, setShoppingListToggle] = useAtom(
    shoppingListToggleAtom
  );
  const [addItemModal, setAddItemModal] = useState(false);
  const [lastAction, setLastAction] = useAtom(lastActionAtom);
  const [filteredItems] = useAtom(filteredItemsAtom);

  useEffect(() => {
    const unsub = onSnapshot(groceriesRef, (doc) => {
      // console.log('Current data: ', doc.data());
      setItems(doc.data()?.items ?? []);
    });
    return unsub;
  }, []);

  function getItems() {
    return shoppingListToggle ? shoppingList : filteredItems;
  }

  function sortItems() {
    let sortedItems = getItems().sort(function (a, b) {
      if (a.itemName < b.itemName) {
        return -1;
      }
      if (a.itemName > b.itemName) {
        return 1;
      }
      return 0;
    });
    console.log('Sorting?');

    setItems(sortedItems);
    updateDoc(groceriesRef, { items: sortedItems });
  }

  function undoAction() {
    switch (lastAction?.type) {
      case 'check':
        updateItem(lastAction.item);
        setLastAction(null);
        break;
      case 'delete':
        addItem(lastAction.item);
        setLastAction(null);
        break;
      default:
        console.log('Action not found!', lastAction);
    }
  }

  function updateLastAction(action: UndoAction) {
    setLastAction(action);
  }

  function updateItem(item: ItemInfo) {
    let newItems = items.map((i) => {
      if (i.id === item.id) {
        return item;
      }
      return i;
    });
    setItems(newItems);
    updateDoc(groceriesRef, { items: newItems });
  }

  function addItem(item: ItemInfo) {
    let newItems = [...items, item];
    setItems(newItems);
    updateDoc(groceriesRef, { items: newItems });
    showNotification({
      message: `${item.itemName} added to shopping list.`,
    });
  }

  function deleteItem(item: ItemInfo) {
    let newItems = items.filter((i) => i.id !== item.id);
    setItems(newItems);
    updateDoc(groceriesRef, { items: newItems });
    showNotification({
      message: `${item.itemName} deleted from shopping list.`,
    });
  }

  return (
    <div className="flex flex-col w-full items-center">
      <div className="text-4xl mb-4">Groceries</div>

      <div className="flex justify-between w-full lg:w-1/2">
        <Button className="p-2 cursor-pointer" onClick={() => sortItems()}>
          Aa
        </Button>
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
        <Search />
      </div>

      <div className="space-y-4 w-full lg:w-1/2">
        {getItems().map((item, i) => (
          <Item
            key={i}
            item={item}
            updateItem={updateItem}
            deleteItem={deleteItem}
          />
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
          addItem={addItem}
          closeModal={() => {
            setAddItemModal(false);
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
