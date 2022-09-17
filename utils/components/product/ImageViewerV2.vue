<template>
  <div ref="container" class="container">
    <PinchScrollZoom
      v-if="shouldMount"
      ref="zoomer"
      :width="containerWidth"
      :height="height"
      :content-width="containerWidth"
      :content-height="containerWidth"
      :translate-y="translateY"
      :scale="scale"
      @scaling="handleScaling"
    >
      <ProductThumb :product="product" class="img" />
    </PinchScrollZoom>

    <b-form-input
      v-model="scale"
      type="range"
      :min="MIN_SCALE"
      :max="MAX_SCALE"
      step="0.1"
      class="input-range mt-3"
    />
  </div>
</template>
<script>
import ProductThumb from '~/components/product/Thumb'
import {
  MAX_WIDTH,
  INITIAL_SCALE,
  MIN_SCALE,
  MAX_SCALE,
} from '~/static/constants/product-image-viewer'

export default {
  name: 'ProductImageViewerV2',

  components: { ProductThumb },

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
      containerWidth: null,
    }
  },

  computed: {
    height() {
      return Math.min(this.containerWidth, MAX_WIDTH)
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
    this.shouldMount = true
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
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  width: 100%

  .input-range
    width: 189px
    max-width: 100%

    @media screen and (-webkit-min-device-pixel-ratio:0)
      &::-webkit-slider-thumb
        background: $color-blue-20
        scrollbar-shadow-color: $color-blue-20
</style>
