<template>
  <div class="container">
    <div class="preview">
      <b-img :src="previewImage.src" />
    </div>

    <div class="thumbnails">
      <div
        v-for="(image, index) in images"
        :key="index"
        :class="previewImage.src === image.src && 'active'"
      >
        <b-img
          :src="image.src"
          :alt="'photo' + index"
          @click="handleThumbnailClick(image)"
        >
        </b-img>
      </div>
    </div>
  </div>
</template>
<script>
import { API_PROD_URL } from '~/static/constants/environments'

export default {
  name: 'ProductImageViewerV1',

  props: {
    category: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      API_PROD_URL,
      currentImage: null,
      scale: 1,
    }
  },

  computed: {
    images() {
      return [
        { src: `${this.API_PROD_URL}/${this.category}/${this.sku}/image` },
      ]
    },

    previewImage() {
      return this.currentImage || this.images[0]
    },
  },

  methods: {
    handleThumbnailClick(image) {
      this.currentImage = image
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.container
  display: flex
  justify-content: center
  flex-direction: column

  .preview
    margin: 8px 0
    width: 100%
    text-align: center

    >img
      width: 414px
      max-width: 100%

  .thumbnails
    display: flex
    justify-content: center

    >div
      position: relative
      margin-right: 8px

      img
        width: 91px
        cursor: pointer

      &.active:after
        content: ""
        background: $color-black-1
        display: block
        height: 2px
        width: 51px
        margin-left: auto
        margin-right: auto
</style>
