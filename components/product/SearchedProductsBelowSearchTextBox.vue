<template>
  <b-row v-show="productItems.length" id="products" cols="1" class="text-xs w-100 searched-item-row" 
  :style="{'max-width': width, ...wrapperStyle}">
    <b-col :style="itemStyle" align-self="center">
      <b-list-group v-for="(product, index) in productItems" :key="`searched-product-${index}`">
        <div 
          :style="{ height: '60px' }" 
          class="rounded-0 border-top-0 list-group-item text-xs d-flex align-items-center justify-content-between"
        >
          <div class="d-flex">
            <span class="searched-product-image mr-2 col-md-1">
              <img class="img-fluid" :src="product.image" />
            </span>
            <span class="searched-product-name align-self-center col-md-7">{{product.name}}</span>
          </div>
          <span class="mt-2 col-md-3">
            <span 
              v-if="productsFor === tradeItem || productsFor === counterOffer" 
              class="cursor-pointer" 
              @click="addProductTrade(product)"
            >
              {{ $t('common.add_product') }} 
              <img :src="require('~/assets/img/icons/arrow-right-for-search-box.svg')" />
            </span>
            <span v-else-if="productsFor === arenaItem" class="cursor-pointer" @click="addProductArena(product)"><img :src="require('~/assets/img/icons/arrow-right-for-search-box.svg')" /></span>
            <a 
              v-else 
              class="d-flex justify-content-end searched-product-add-to-wants" 
              href="#" 
              @click="addProductWant(product)"

            >
              {{ $t('trades.create_listing.vendor.wants.add_want') }} 
              <img class="ml-3" :src="require('~/assets/img/icons/arrow-right-for-search-box.svg')" />
            </a>
          </span>
        </div>
      </b-list-group>
    </b-col>
    <b-col :style="itemStyle" align-self="center">
      <b-list-group class="text-md">
        <b-list-group-item class="p-4 border-top-0 no-product d-flex align-items-center">
          <i>
            {{$t('common.dont_see_your_product')}} 
            <a class="suggest-new" href="#">{{$t('common.suggest_a_new_product')}}</a>
          </i>
          </b-list-group-item>
      </b-list-group>
    </b-col>
  </b-row>
</template>

<script>
  import {
    PRODUCT_FOR_COUNTER_OFFER
  } from '~/static/constants/trades'
export default {
  name: 'SearchedProductsBelowSearchTextBox',
  props: {
    productItems: {
      type: Array,
      default: () => [],
    },
    productsFor: {
      type: String,
      default: () => null,
    },
    width: {
      type: String,
      default: 'unset',
    },
    inputType: {
      type: String,
      default: '',
    },
    wrapperStyle: {
      type: Object,
      default: () => {}
    },
    itemStyle: {
      type: Object,
      default: () => {}
    }
  },
  data(){
    return {
      // This data property is used add product for trade offer item listing
      tradeItem: 'tradeItem',
      // This data property is used add product for want item listing
      wantItemTrade: 'wantItemTrade',
      arenaItem: 'tradeItemArena',
      counterOffer: PRODUCT_FOR_COUNTER_OFFER,
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
    addProductTrade(product){
      if(this.productsFor === this.counterOffer){
        this.$root.$emit('add_product_counter_offer', product)
      }else{
        this.$root.$emit('add_product_trade', product)
      }
    },
    addProductWant(product){
      if(this.inputType === 'wantsList'){
        this.addProductWantList(product)
      }
      else {
        this.$root.$emit('add_product_want', product)
      }
    },
    addProductWantList(product){

      this.$root.$emit('add_product_want_list',product)
    },
    addProductArena(product){
      this.$root.$emit('add_product_trade_arena',product)
    },
  }
}
</script>
<style scoped lang="sass">
@import '~/assets/css/_typography'
@import '~/assets/css/_variables'

.searched-item-row
  font-weight: $normal
  z-index: 100000

.searched-product-name
  font-family: $font-family-montserrat
  font-weight: 500
  font-size: 16px

.searched-product-add-to-wants
  color: $color-gray-5 !important
  font-family: $font-family-montserrat
  font-weight: 500
  font-size: 16px

.no-product
  font-family: $font-family-montserrat
  font-size: 16px
  font-weight: 400
  color: #000
  border-bottom-left-radius: 8px
  border-bottom-right-radius: 8px
  height: 60px

.suggest-new
  color: #000
  text-decoration: underline

</style>
