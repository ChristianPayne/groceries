<script lang="ts">
import Item from "./Item.svelte";

let items = [
  {
    name:"Kale",
    quantity: 2,
    need: true
  },
  {
    name:"Broccoli",
    quantity: 1,
    need: true
  },
  {
    name:"Bread",
    quantity: 1,
    need: true
  },
  {
    name:"Corn",
    need: true
  }
]

function OnSwipe (item) {
  // items = items.filter(i => i != item)

  items = items.map(i => {
    if(item === i){
      item.need = false
    }
    return i
  })
}

</script>

<main class="flex flex-col justify-between fixed inset-0">
  <!-- Header -->
  <div class="flex justify-center p-4 bg-green-900 text-white font-serif">
    <h1 class="text-4xl">Leafy Kale</h1>
  </div>
  <!-- Items -->
  <div class="grow">
    {#each items as item}
      <Item item={item} onSwipe={OnSwipe}/>
    {/each}
  </div>
  <!-- Footer -->
  <div class="flex-none justify-center p-2 bg-green-900 text-white font-serif text-xl">
    <div class="flex justify-around">
      <button class="p-4 grow">All Items</button>
      <button class="p-4 grow">Grocery List</button>
    </div>
  </div>
</main>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>