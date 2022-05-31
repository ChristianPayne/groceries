import { ItemInfo } from '~/types';
import {
  Modal,
  Button,
  Group,
  Checkbox,
  NumberInput,
  Textarea,
} from '@mantine/core';
import { useState } from 'react';

type Props = {
  item: ItemInfo;
  updateItem: Function;
  deleteItem: Function;
};

export default function Item({ item, updateItem, deleteItem }: Props) {
  const [opened, setOpened] = useState(false);

  function Update(item: ItemInfo) {
    updateItem(item);
  }

  return (
    <>
      <Modal
        opened={opened}
        size="100%"
        onClose={() => setOpened(false)}
        title={item.itemName}
        className="w-full"
      >
        <div className="space-y-4">
          <Checkbox
            label="Item Needed"
            color="cyan"
            checked={item.need}
            onChange={(event) => {
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
      <div className="bg-neutral-700 p-4 rounded-md w-full flex justify-between">
        <p className="w-1/2 cursor-pointer p-2" onClick={() => setOpened(true)}>
          {item.itemName}
        </p>
        <Checkbox
          aria-label="Item Needed"
          color="cyan"
          checked={item.need}
          onChange={(event) => {
            item.need = event.currentTarget.checked;
            Update(item);
          }}
        />
      </div>
    </>
  );
}
