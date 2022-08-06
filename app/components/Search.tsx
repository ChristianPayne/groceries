import { TextInput } from '@mantine/core';
import { useAtom } from 'jotai';
import { SearchBox, useSearchBox } from 'react-instantsearch-hooks-web';

export default function Search() {

  const preSearchHook = (query: string, search: (value: string) => void) => {
    console.log('🚀 ~ queryHook ~ query, search', query, search);
    search(query);
  };

  const { query, refine, clear, isSearchStalled } = useSearchBox({
    // ...
    // queryHook: preSearchHook,
  });

  return (
    <div className="relative overflow-hidden w-full mb-4">
      <TextInput
        placeholder="Search items..."
        onChange={(event) => {
          refine(event.target.value)
        }}
        value={query}
        styles={{ input: { width: '100%', boxSizing: 'border-box' } }}
        rightSection={
          <p
            className="text-neutral-700 p-2 select-none cursor-pointer"
            onClick={() => {
              clear();
            }}
          >
            x
          </p>
        }
      />
    </div>
  );
}
