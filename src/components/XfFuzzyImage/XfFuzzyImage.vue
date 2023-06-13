<template>
  <div
    v-if="img"
    class="fuzzy-image"
    :class="{ 'fuzzy-image-background': background }"
    ref="imgContainer"
    :data-image-full="img"
  >
    <img ref="image" :src="minImg" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

// ** Props **
const props = defineProps<{
  img: string;
  minImg: string;
  background?: boolean;
}>();

// ** Data **
const imgContainer = ref<HTMLDivElement>();
const image = ref<HTMLImageElement>();

// ** Methods **
const setNewImage = (imageUrl: string | null): void => {
  if (imgContainer.value && imageUrl) {
    imgContainer.value.style.backgroundImage = props.img;
    imgContainer.value.classList.add("fuzzy-image-loaded");
  }
};

const lazyLoad = (): void => {
  if (imgContainer.value) {
    const imageUrl: string | null =
      imgContainer.value.getAttribute("data-image-full");

    if (image.value) {
      image.value.src = imageUrl || "";

      image.value.addEventListener("load", () => setNewImage(imageUrl));
    }
  }
};

onMounted(lazyLoad);
</script>

<style lang="scss" scoped>
.fuzzy-image {
  background-size: cover;
  background-repeat: no-repeat;
  filter: blur(5px);
  background-image: v-bind(minImg);

  &-background {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
  }

  & > img {
    display: block;
    height: 100%;
    width: 100%;
  }

  &-loaded {
    filter: none;
    transition: filter 3s;
  }
}
</style>
