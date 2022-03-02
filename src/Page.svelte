<script lang="ts">
import Item from "./Item.svelte";
import type {Direction, Item as ItemType} from './types';
export let items: ItemType[]
export let direction: Direction;

function onSwipe (item) {
  // items = items.filter(i => i != item)
  setTimeout(() => {
    items = items.map(i => {
      if(item === i){
        item.need = false
      }
      return i
    })
  }, 120)
}

</script>

<div>
  {#each items as item}
    <Item item={item} onSwipe={onSwipe} direction={direction}/>
  {/each}
</div>