<script lang="ts">
import Item from "./Item.svelte";
import type {Direction, Item as ItemType} from './types';
export let items: ItemType[]
export let direction: Direction;
export let onSwipe;

let filterNeeded: boolean;
if(direction === 'left') {
  filterNeeded = true;
} else {
  filterNeeded = false;
}
</script>

<div>
  {#each items as item}
    {#if item.need === filterNeeded}
      test
      <Item item={item} onSwipe={onSwipe} direction={direction}/>
    {/if}
  {/each}
</div>