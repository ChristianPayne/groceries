import { Button, Checkbox, NumberInput, TextInput } from '@mantine/core';
import { customAlphabet } from 'nanoid';
import { ItemInfo } from '~/types';
const nanoid = customAlphabet('1234567890abcdef', 10);

type Props = {
  addItem: Function;
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
        value={newItem.itemName}
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
        checked={newItem.need}
        onChange={(event) => {
          newItem.need = event.currentTarget.checked;
        }}
      />
      <Button
        variant="light"
        color="cyan"
        onClick={() => {
          console.log('Added item', newItem);
          props.addItem(newItem);
        }}
      >
        Add Item
      </Button>
    </div>
  );
}
