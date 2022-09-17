<template>
  <div class="thumb-wrapper" @click="handleClick">
    <b-img :src="imageUrl" :width="width" :height="height" :alt="altText" />
    <div v-if="overlay" class="overlay"></div>
  </div>
</template>
<script>
import { PRODUCT_FALLBACK_URL, API_PROD_URL } from '~/static/constants'
export default {
  name: 'ProductThumb',

  props: {
    src: {
      type: String,
      default: null,
    },
    product: {
      type: Object,
      default: null,
    },
    width: {
      type: [String, Number],
      default: null,
    },
    height: {
      type: [String, Number],
      default: null,
    },
    variant: {
      type: String, // enum: ['small', 'large', 'original']
      default: null,
    },
    overlay: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      API_PROD_URL,
    }
  },

  computed: {
    params() {
      const values = { small: '300', large: '800', original: 'original' }
      return this.variant ? '?width=' + values[this.variant] : ''
    },

    imageUrl() {
      if (this.src) {
        if (this.src.indexOf('//') === 0) {
          return 'https:' + this.src
        } else {
          return this.src
        }
      } else if (this.product) {
        return API_PROD_URL+'/'+(this.product.category_name ? this.product.category_name : this.product.category.name)+'/'+this.product.sku+'/image'+this.params
      } else {
        return PRODUCT_FALLBACK_URL
      }
    },

    altText() {
      return this.product ? this.product.name : ''
    },
  },

  methods: {
    handleClick(event) {
      this.$emit('click', event)
    },
  },
}
</script>
<style lang="sass" scoped>
.thumb-wrapper
  position: relative

  img
    width: 100%

  .overlay
    position: absolute
    top: 0px
    left: 0px
    width: 100%
    height: 100%
    background: rgb(153,153,153,0.1)
</style>
