<template>
  <div v-show="productItems.length" id="products"  class="text-xs w-100 searched-item-row" :style="{'max-width': width}">
    <div class="white-bg mt-2" align-self="center">
      <b-list-group v-for="(product, index) in productItems" :key="`searched-product-${index}`" class="list-group">
        <b-list-group-item class="sub-con d-flex mb-2" :class="listGroupItemClass">
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
    <div class="d-flex white-bg see-product">
      <div class="dont-see-your-product-mobile">
        {{$t('common.dont_see_your_product_mobile')}}
      </div>
      <div class="suggest-a-new-product-mob">
        <a href="#" style="color: #000000">{{$t('common.suggest_a_new_product_mobile')}}</a>
      </div>

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
    listGroupItemClass: {
      type: String,
      default: ''
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
.sub-con
  width: 343px
  height: 80px
  padding: 0px
.searched-product-image
  width: 78px
.searched-product-name
 @include body-6
 font-family: $font-montserrat
 color: $color-black-15
 margin-top: 29px
 width: 149px
 height: 16px

.btn-add
  width: 54px
  border-radius: 5px
  background: $color-blue-20
  border: 1px solid $color-blue-20
  @include body-9
  color: $color-white-1
  font-family: $font-sp-pro
  font-weight: $medium
  margin-top: 2rem
  margin-left: 20px
.white-bg
  background-color: $color-white-1
.see-product
  height: 130px
.dont-see-your-product-mobile
  font-family: $font-montserrat
  font-style: normal
  font-weight: $normal
  @include body-6
  letter-spacing: 0.06em
  text-transform: capitalize
  color: $color-black-1
  margin-left: 5px
.suggest-a-new-product-mob
  font-family: $font-montserrat
  font-style: normal
  font-weight: $normal
  @include body-6
  line-height: 13px
  letter-spacing: 0.06em
  text-decoration: none
  color: $color-black-1
  margin-left: 6.5rem
</style>
