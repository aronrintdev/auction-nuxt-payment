<template>
  <div ref="container" class="flex w-100 jutify-content-center">
    <vue-three-sixty
      ref="vue360-el"
      :amount="AMOUNT_360_IMAGES"
      :paddingIndex="true"
      :autoplay="true"
      :loop="NO_OF_LOOP"
      :imagePath="product.path360Images"
      :fileName="product.image360Name"
    />

  </div>
</template>
<script>

import {
  MAX_WIDTH_360,
  MAX_HEIGHT_360,
  INITIAL_SCALE,
  MIN_SCALE,
  MAX_SCALE,
  AMOUNT_360_IMAGES,
  NO_OF_LOOP
} from '~/static/constants/product-image-viewer'

export default {
  name: 'ProductImageViewer360',

  props: {
    product: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      scale: INITIAL_SCALE,
      shouldMount: false,
      MIN_SCALE,
      MAX_SCALE,
      MAX_HEIGHT_360,
      MAX_WIDTH_360,
      containerWidth: null,
      containerHeight: null,
      NO_OF_LOOP,
      AMOUNT_360_IMAGES
    }
  },

  computed: {
    height() {
      return Math.min(this.containerHeight, MAX_HEIGHT_360)
    },

    width() {
      return Math.min(this.containerWidth, MAX_WIDTH_360)
    },

    translateY() {
      return (-Math.abs(this.containerWidth - this.height) / 2) * INITIAL_SCALE
    },
  },

  beforeMount() {
    window.addEventListener('resize', this.handleWindowResize)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleWindowResize)
  },

  mounted() {
    this.containerWidth = this.$refs.container.clientWidth
    this.containerHeight = this.$refs.container.clientHeight
    this.shouldMount = true
    this.$el.querySelector('canvas').width = this.width
    this.$el.querySelector('canvas').height = this.height
  },

  methods: {
    handleScaling(data) {
      this.scale = data.scale
    },

    handleWindowResize() {
      if (this.containerWidth !== this.$refs.containerWidth) {
        this.containerWidth = this.$refs.container.clientWidth
        this.resetViewer()
      }
    },

    resetViewer() {
      this.scale = INITIAL_SCALE
      this.$refs.zoomer.setData({
        scale: INITIAL_SCALE,
        originX: this.containerWidth / 2,
        originY: this.height / 2,
        translateX: 0,
        translateY: this.translateY,
        contentWidth: this.containerWidth,
        contentHeight: this.containerWidth,
        width: this.containerWidth,
        height: this.height,
      })
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.container
  :deep(.v360-viewer-container)
    height: 100%
  .input-range
    width: 189px
    max-width: 100%

    @media screen and (-webkit-min-device-pixel-ratio:0)
      &::-webkit-slider-thumb
        background: $color-blue-20
        scrollbar-shadow-color: $color-blue-20
</style>
