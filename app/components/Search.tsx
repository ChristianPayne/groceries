import { TextInput } from '@mantine/core';
import { useAtom } from 'jotai';
import { filterAtom } from '~/atoms';

export default function Search() {
  let [searchTerm, setSearchTerm] = useAtom(filterAtom);
  return (
    <div className="relative overflow-hidden">
      <TextInput
        placeholder="Search items..."
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
        value={searchTerm}
        rightSection={
          <p
            className="text-black p-2 select-none cursor-pointer"
            onClick={() => {
              setSearchTerm('');
            }}
          >
            x
          </p>
        }
      />
    </div>
  );
}
