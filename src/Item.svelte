<script lang="ts">
  // Import Swiper Svelte components
  import { Swiper, SwiperSlide } from 'swiper/svelte';
  import type { Direction } from "./types";

  export let item;
  export let onSwipe;
  export let direction: Direction;

  let swiped = false;
  let scale = false;

  function onEnd () {
    console.log("Toggle OnEnd");
    
    swiped = true;
  }

  function onTransitionEnd () {
    if(swiped) {
      scale = true
      onSwipe(item);
    }
  }

  // Import Swiper styles
  import 'swiper/css';
</script>

{#if item.need}
  <Swiper
  class={`h-32 text-center text-2xl font-serif rounded-xl items-center m-2 ease-in-out transition-all ${scale ? 'h-0' : ''}`}
  spaceBetween={50}
  slidesPerView={1}
  dir={`${direction == 'right' ? "rtl" : ""}`}
  on:reachEnd={e => onEnd()}
  on:slideChangeTransitionEnd={e => onTransitionEnd()}
  >
    <SwiperSlide class="flex bg-green-900 rounded-xl text-white justify-center items-center">
      <div>
        <p>{item.name}</p>
        {#if item.quantity && item.quantity > 1}
          <p>Quantity: {item.quantity}</p>
        {/if}
        <p>Need: {item.need}</p>
      </div>
    </SwiperSlide>

    <SwiperSlide></SwiperSlide>
  </Swiper>
{/if}
