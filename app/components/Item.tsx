import { ItemInfo } from '~/types';
import { Modal, Button, Group, Checkbox } from '@mantine/core';
import { useState } from 'react';

type Props = {
  item: ItemInfo;
  updateItem: Function;
};

export default function Item({ item, updateItem }: Props) {
  const [opened, setOpened] = useState(false);

  function Update(item: ItemInfo) {
    updateItem(item);
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={item.itemName}
      >
        <p>Quantity: {item?.quantity}</p>
      </Modal>
      <div className="bg-neutral-700 p-4 rounded-md w-full flex justify-between">
        <p onClick={() => setOpened(true)}>{item.itemName}</p>
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
