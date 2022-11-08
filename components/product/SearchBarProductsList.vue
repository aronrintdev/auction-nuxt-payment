<template>
  <b-row 
    v-show="productItems.length" 
    id="products" 
    cols="1" 
    class="text-xs w-100 searched-item-row" 
    :style="{ 'max-width': width }"
  >
    <b-col align-self="center">
      <b-list-group 
        v-for="(product, index) in productItems" 
        :key="`searched-product-${index}`" 
        role="button"
        :class="listGroupClass" 
        @click="applySearch(product)"
      >
        <b-list-group-item class="text-xs" :class="listItemClass">
          <span class="searched-product-image mr-2 col-md-2"><img :src="product.image" width="40px" height="40px" /></span>
          <span class="searched-product-name align-self-center mt-5 col-md-7">{{product.name}}</span>
        </b-list-group-item>
      </b-list-group>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'SearchBarProductsList',
  props: {
    productItems: {
      type: Array,
      default: () => [],
    },
    width: {
      type: String,
      default: 'unset',
    },
    listGroupClass: {
      type: String,
      default: ''
    },
    listItemClass: {
      type: String,
      default: ''
    }
  },
  data(){
    return {
      outside_clicked: null
    }
  },
  mounted() {
    /**
     * This event listener is to close search
     * input if users click outside the search field
     *
     */
    this.outside_clicked = (e) => {
      if (!this.$el.contains(e.target)) {
        this.$root.$emit('click_outside', true)
      }
    }

    document.addEventListener('click', this.outside_clicked)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.outside_clicked)
  },
  methods:{
    applySearch(product){
      this.$root.$emit('productClick', product)
    }
  }
}
</script>
<style scoped lang="sass">
@import '~/assets/css/_typography'
.searched-item-row
  font-weight: $normal
  z-index: 100000
</style>
