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
    let newItems = (await (await getDoc(groceriesRef)).data())
      ?.items as ItemInfo[];

    // Push data
    // await updateDoc(groceriesRef, { items: newItems });
    return json(newItems);
  } catch (e) {
    console.error(e);
    return json(e);
  }
};

export default function Export() {
  let actionData = useActionData();
  return (
    <>
      <Form method="post">
        <Button type="submit">Export Data</Button>
      </Form>
      <p className='text-white'>
        {`${JSON.stringify(actionData, null, 2)}`}
      </p>
    </>
  );
}