import { Button } from '@mantine/core';
import { ActionFunction, json } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { parseCSV } from '~/utils/importFromCSV.server';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  setDoc,
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
    // Get all data
    let newItems = (await (await getDoc(groceriesRef)).data())
      ?.items as ItemInfo[];
    newItems.forEach(async (item) => {
      addItem(item)
    });


    // const querySnapshot = await getDocs(collection(db, 'lists'));
    // querySnapshot.forEach(async (doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    //   await deleteItem(doc.data())
    // });


    async function deleteItem(item: ItemInfo) {
      return deleteDoc(doc(db, `lists/${item.id}`))
    }

    async function addItem(item: ItemInfo) {
      // Add to data
      let newItem = {
        id: item.id,
        itemName: item.itemName,
        need: false,
        quantity: item.quantity,
        ...(item.note && { note: item.note })
      };

      console.log('Making new item', newItem)

      // Push data
      let docRef = doc(db, `lists/${newItem.id}`)
      await setDoc(docRef, { ...newItem, list: 'christian-1' });
    }



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
      <Form method="post">
        <Button type="submit">Run import</Button>
      </Form>
    </>
  );
}
