<template>
  <div v-if="currentImage" class="card-carousel carousel-with-thumbs">
    <div v-if="!currentImage.is_video" class="card-img">
      <img :src="currentImage.big" alt="">
    </div>
    <div v-else class="card-img">
      <video :src="currentImage.big" playsinline muted autoplay></video>
    </div>
    <div class="thumbnails">
      <div 
        v-for="(image, index) in images"
        :key="image.id"
        :class="['thumbnail-image', (activeImage === index) ? 'active' : '']"
        @click="activateImage(index)"
      >
        <img :src="image.thumb">
        <div v-if="image.is_video" class="thumbnail-overlay">
          <video-play-icon></video-play-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VideoPlayIcon from '~/assets/img/icons/video-play.svg?inline'

export default {
  name: 'MediaCarouselWithThumbs',
  components: {
    VideoPlayIcon,
  },
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      activeImage: 0,
    }
  },
  computed: {
    currentImage() {
      return this.images[this.activeImage];
    },
  },
  methods: {
    // Set active image
    activateImage(imageIndex) {
      this.activeImage = imageIndex;
    },
  }
}
</script>
