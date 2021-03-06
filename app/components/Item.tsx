import { ItemInfo } from '~/types';
import {
  Modal,
  Button,
  Group,
  Checkbox,
  NumberInput,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { lastActionAtom } from '~/atoms';

type Props = {
  item: ItemInfo;
  updateItem: Function;
  deleteItem: Function;
};

export default function Item({ item, updateItem, deleteItem }: Props) {
  const [opened, setOpened] = useState(false);
  const [lastAction, setLastAction] = useAtom(lastActionAtom);

  function Update(item: ItemInfo) {
    updateItem(item);
  }

  return (
    <>
      <Modal
        opened={opened}
        size="100%"
        onClose={() => setOpened(false)}
        title="🥖"
        className="w-full lg:w-1/2 m-auto"
      >
        <div className="space-y-4">
          <TextInput
            variant="headless"
            className="text-3xl text-black w-full"
            styles={{ input: { width: '100%', boxSizing: 'border-box' } }}
            value={item.itemName}
            onChange={(event) => {
              item.itemName = event.currentTarget.value;
              Update(item);
            }}
          />
          <Checkbox
            label="Item Needed"
            color="cyan"
            checked={item.need}
            onChange={(event) => {
              setLastAction({
                type: 'check',
                item: JSON.parse(JSON.stringify(item)),
              });
              item.need = event.currentTarget.checked;
              Update(item);
            }}
          />
          <NumberInput
            defaultValue={1}
            placeholder="Quantity"
            label="Quantity"
            size="md"
            value={item?.quantity}
            min={1}
            onChange={(val) => {
              item.quantity = val;
              Update(item);
            }}
          />
          <Textarea
            placeholder="Add a note..."
            label="Note"
            value={item?.note}
            onChange={(event) => {
              item.note = event.currentTarget.value;
              Update(item);
            }}
          />
          <Button
            color="red"
            variant="outline"
            onClick={() => {
              deleteItem(item);
              setOpened(false);
            }}
          >
            Delete Item
          </Button>
        </div>
      </Modal>
      <div className="bg-neutral-700 p-4 rounded-md w-full flex justify-between cursor-pointer hover:bg-cyan-700">
        <p className="w-full p-2" onClick={() => setOpened(true)}>
          {item.itemName}
        </p>
        <Checkbox
          aria-label="Item Needed"
          color="cyan"
          checked={item.need}
          size="lg"
          className="cursor-pointer"
          onChange={(event) => {
            setLastAction({
              type: 'check',
              item: JSON.parse(JSON.stringify(item)),
            });
            item.need = event.currentTarget.checked;
            Update(item);
          }}
        />
      </div>
    </>
  );
}
