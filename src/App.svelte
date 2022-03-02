<script lang="ts">
import { Swiper, SwiperSlide } from "swiper/svelte";

import Page from "./Page.svelte";
import type {Item} from './types';

let items: Item[] = [
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
    quantity: 1,
    need: true
  }
]

function getItemsFromDB () {

}

function filterNeeded (needed: boolean) {
  if(items.length > 0) {
    return items.filter(i => i.need === needed);
  } else {
    return []
  }
}

let swiper;
function init (_swiper) {
  swiper = _swiper.detail[0];
}

function changePage(page: number) {
  if(swiper === undefined) return;
  if(page === 0) {
    swiper.slidePrev()
  } else {
    swiper.slideNext()
  }
}

</script>

<main class="flex flex-col justify-between fixed inset-0">
  <!-- Header -->
  <div class="flex justify-center p-4 bg-green-900 text-white font-serif">
    <h1 class="text-4xl">Leafy Kale</h1>
  </div>
  <!-- Items -->
  <div class="grow">
    <Swiper
    class=""
    spaceBetween={50}
    slidesPerView={1}
    allowTouchMove={false}
    on:swiper={s => init(s)}
    >
      <SwiperSlide class="">
        <Page items={filterNeeded(true)} direction="right"/>
      </SwiperSlide>
      
      <SwiperSlide class="">
        <Page items={filterNeeded(true)} direction="left"/>
      </SwiperSlide>
    </Swiper>
  </div>
  <!-- Footer -->
  <div class="flex-none justify-center p-2 bg-green-900 text-white font-serif text-xl">
    <div class="flex justify-around">
      <button class="p-4 grow prev" on:click={_ =>changePage(0)}>All Items</button>
      <button class="p-4 grow next" on:click={_ =>changePage(1)}>Grocery List</button>
    </div>
  </div>
</main>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>