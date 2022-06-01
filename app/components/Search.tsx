import { TextInput } from '@mantine/core';
import { useAtom } from 'jotai';
import { filterAtom } from '~/atoms';

export default function Search() {
  let [searchTerm, setSearchTerm] = useAtom(filterAtom);
  return (
    <div className="relative overflow-hidden w-full mb-4">
      <TextInput
        placeholder="Search items..."
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
        value={searchTerm}
        styles={{ input: { width: '100%', boxSizing: 'border-box' } }}
        rightSection={
          <p
            className="text-neutral-700 p-2 select-none cursor-pointer"
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
