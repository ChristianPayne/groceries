import {
  Button,
  Checkbox,
  NumberInput,
  Textarea,
  TextInput,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { customAlphabet } from 'nanoid';
import { ItemInfo } from '~/types';
const nanoid = customAlphabet('1234567890abcdef', 10);

type Props = {
  addItem: Function;
  closeModal: Function;
};

export default function AddItem(props: Props) {
  let newItem: ItemInfo = {
    id: nanoid(),
    itemName: 'New Item',
    need: true,
    quantity: 1,
  };
  return (
    <div className="space-y-4">
      <TextInput
        label="Item Name"
        description="What do you need to get?"
        placeholder={newItem.itemName}
        onChange={(event) => {
          newItem.itemName = event.currentTarget.value;
        }}
      />
      <NumberInput
        defaultValue={1}
        placeholder="Quantity"
        label="Quantity"
        size="md"
        value={newItem?.quantity}
        min={1}
        onChange={(val) => {
          newItem.quantity = val;
        }}
      />
      <Checkbox
        label="Item Needed"
        color="cyan"
        onChange={(event) => {
          newItem.need = event.currentTarget.checked;
        }}
      />
      <Textarea
        placeholder="Add a note..."
        label="Note"
        onChange={(event) => {
          newItem.note = event.currentTarget.value;
        }}
      />
      <Button
        variant="light"
        color="cyan"
        onClick={() => {
          console.log('Added item', newItem);
          props.addItem(newItem);
          props.closeModal();
        }}
      >
        Add Item
      </Button>
    </div>
  );
}
