{#if item.need}
  <Swiper
  class="h-32 text-center text-2xl font-serif items-center m-2"
  spaceBetween={50}
  slidesPerView={1}
  on:transitionEnd={e => onTransitionEnd()}
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
<script>
// Import Swiper Svelte components
import { Swiper, SwiperSlide } from 'swiper/svelte';

export let item;
export let onSwipe;

let swiped = false;

function onEnd () {
  swiped = true;
}

function onTransitionEnd () {
  if(swiped) {
    onSwipe(item);
  }
}

// Import Swiper styles
import 'swiper/css';
</script>