<template>
  <b-row v-show="productItems.length" id="products" cols="1" class="text-xs w-100 searched-item-row" :style="{'max-width': width}">
    <b-col align-self="center">
      <b-list-group v-for="(product, index) in productItems" :key="`searched-product-${index}`">
        <b-list-group-item class="text-xs">
          <span class="searched-product-image mr-2 col-md-2"><img :src="product.image" width="40px" height="40px" /></span>
          <span class="searched-product-name align-self-center mt-5 col-md-7">{{product.name}}</span>
          <span class="searched-product-add-to-wants pull-right mt-2 col-md-3 text-right">
            <span v-if="productsFor === tradeItem || productsFor === counterOffer" class="cursor-pointer" @click="addProductTrade(product)">{{$t('common.add_product')}} <img :src="require('~/assets/img/icons/arrow-right-for-search-box.svg')" /></span>
            <span v-else-if="productsFor === arenaItem" class="cursor-pointer" @click="addProductArena(product)"><img :src="require('~/assets/img/icons/arrow-right-for-search-box.svg')" /></span>
            <a v-else href="#" @click="addProductWant(product)">{{$t('common.add_to_wants')}} <img :src="require('~/assets/img/icons/arrow-right-for-search-box.svg')" /></a>
          </span>
        </b-list-group-item>
      </b-list-group>
    </b-col>
    <b-col  align-self="center">
      <b-list-group class="text-md">
        <b-list-group-item class="p-4"><i>{{$t('common.dont_see_your_product')}} <a href="#">{{$t('common.suggest_a_new_product')}}</a></i></b-list-group-item>
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
.searched-item-row
  font-weight: $normal
  z-index: 100000
</style>
