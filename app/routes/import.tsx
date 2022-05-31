import { Button } from '@mantine/core';
import { ActionFunction, json } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { parseCSV } from '~/utils/importFromCSV.server';
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
import { ItemInfo } from '~/types';
import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('1234567890abcdef', 10);

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

export const action: ActionFunction = async () => {
  try {
    let rows: Array<{ itemName: string; quantity: number }> = await parseCSV();
    // Get all data
    let newItems = (await (await getDoc(groceriesRef)).data())
      ?.items as ItemInfo[];
    rows.forEach((row) => {
      // Add to data
      let newItem = {
        id: nanoid(),
        itemName: row.itemName,
        need: false,
        quantity: row.quantity,
      };

      console.log('Making new item', newItem);

      if (row.itemName && row.quantity) {
        newItems.push(newItem);
      }
    });
    console.log('Pushing all items', newItems);

    // Push data
    await updateDoc(groceriesRef, { items: newItems });
    return json('Imported');
  } catch (e) {
    console.error(e);
    return json(e);
  }
};

export default function Import() {
  let actionData = useActionData();
  return (
    <>
      {JSON.stringify(actionData)}
      {/* <Form method="post">
        <Button type="submit">Run import</Button>
      </Form> */}
    </>
  );
}
