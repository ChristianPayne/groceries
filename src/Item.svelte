<script>
  // Import Swiper Svelte components
  import { Swiper, SwiperSlide } from 'swiper/svelte';

  export let item;
  export let onSwipe;

  let swiped = false;
  let scale = false;

  function onEnd () {
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
  on:slideChangeTransitionEnd={e => onTransitionEnd()}
  on:reachEnd={e => onEnd()}
  >
    <SwiperSlide class="flex bg-green-900 rounded-xl text-white justify-center items-center">
      <div>
        <p>{item.name}</p>
        {#if item.quantity && item.quantity > 1}
          <p>Quantity: {item.quantity}</p>
        {/if}
      </div>
    </SwiperSlide>
    <SwiperSlide></SwiperSlide>
  </Swiper>
{/if}
