<template>
  <div v-show="productItems.length" id="products"  class="text-xs w-100 searched-item-row" :style="{'max-width': width}">
    <div class="white-bg mt-2" align-self="center">
      <b-list-group v-for="(product, index) in productItems" :key="`searched-product-${index}`" class="list-group">
        <b-list-group-item class="sub-con d-flex mb-2">
          <div><img class="searched-product-image ml-1 mr-3" :src="product.image"/></div>
          <div class="searched-product-name ml-1">{{product.name}}</div>
          <div class="searched-product-add-to-wants">
            <b-btn v-if="productsFor === tradeItem || productsFor === counterOffer" class="cursor-pointer btn-add" @click="addProductTrade(product)">
              {{$t('common.add_product_mobile')}}
            </b-btn>
            <b-btn v-else-if="productsFor === arenaItem"  class="cursor-pointer btn-add" @click="addProductArena(product)">
              {{$t('common.add_product_mobile')}}
            </b-btn>
            <b-btn v-else  class="cursor-pointer btn-add" @click="addProductWant(product)">
              {{$t('common.add_product_mobile')}}
            </b-btn>
          </div>
        </b-list-group-item>
      </b-list-group>
    </div>
    <div  align-self="center">
      <b-list-group class="text-md">
        <b-list-group-item class="p-4"><i>{{$t('common.dont_see_your_product')}} <a href="#">{{$t('common.suggest_a_new_product')}}</a></i></b-list-group-item>
      </b-list-group>
    </div>
  </div>
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
@import '~/assets/css/_variables'
.searched-item-row
  font-weight: $normal
  z-index: 100000
.sub-con
  width: 343px
  height: 80px
  padding: 0px
.searched-product-image
  width: 78px
.searched-product-name
 @include body-9
 font-family: $font-montserrat
 color: #979797
 margin-top: 2rem
 width: 149px
 height: 16px

.btn-add
  width: 54px
  border-radius: 5px
  background: #667799
  border: 1px solid #667799
  @include body-9
  color: #FFFFFF
  font-family: $font-sp-pro
  font-weight: $medium
  margin-top: 2rem
  margin-left: 20px
.white-bg
  background-color: #FFFFFF
</style>
