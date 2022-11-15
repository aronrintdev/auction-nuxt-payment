<template>
  <div>
    <b-row
      v-show="productItems.length"
      id="products"
      cols="1"
      class="d-none d-sm-flex text-xs w-100 searched-item-row"
      :style="{ 'max-width': width, ...wrapperStyle }"
    >
      <b-col :style="itemStyle" align-self="center">
        <b-list-group v-for="(product, index) in productItems" :key="`searched-product-${index}`">
          <div
            :style="{ minHeight: '60px' }"
            class="rounded-0 border-top-0 list-group-item text-xs d-flex align-items-center justify-content-between"
          >
            <div class="d-flex col-sm-8 pl-0 align-items-center">
              <img
                :style="{ maxHeight: '50px', width: 'auto' }"
                class="mr-3"
                :src="product.image"
              />
              <span class="searched-product-name align-self-center">
                {{ product.name }}
              </span>
            </div>
            <div class="col-sm-4 px-0">
              <span
                v-if="productsFor === tradeItem || productsFor === counterOffer"
                class="cursor-pointer"
                @click="addProductTrade(product)"
              >
                {{ $t('common.add_product') }}
                <img :src="require('~/assets/img/icons/arrow-right-for-search-box.svg')" />
              </span>
              <span
                v-else-if="productsFor === arenaItem"
                class="cursor-pointer"
                @click="addProductArena(product)"
              >
                <img :src="require('~/assets/img/icons/arrow-right-for-search-box.svg')" />
              </span>
              <a
                v-else
                class="d-flex justify-content-end searched-product-add-to-wants"
                href="#"
                @click="addProductWant(product)"
              >
                {{ $t('trades.create_listing.vendor.wants.add_want') }}
                <img class="ml-2" :src="require('~/assets/img/icons/arrow-right-for-search-box.svg')" />
              </a>
            </div>
          </div>
        </b-list-group>
      </b-col>
      <b-col :style="itemStyle" align-self="center" v-if="productItems.length > 0">
        <b-list-group class="text-md" :style="suggestNewStyle">
          <b-list-group-item class="p-4 border-top-0 no-product d-flex align-items-center">
            <i>
              {{$t('common.dont_see_your_product')}}
              <a
                class="suggest-new"
                @click="$bvModal.show('suggest_a_new_product')"
              >
                {{$t('common.suggest_a_new_product')}}
              </a>
            </i>
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <ListingItemProductSuggestion
        :id="`suggest_a_new_product`"
        @showSuccess="showSuccess"
      />
      <Modal :id="`showSuceessModal`" hideFooter>
        <div class="successContent my-5">
          {{ $t('createlisting.product_suggestion_message') }}
        </div>
      </Modal>
    </b-row>

    <div class="mt-3 d-sm-none">
      <div
        v-for="item in productItems"
        :key="item.id"
        class="d-flex search-item justify-content-between align-items-center"
      >
        <div class="d-flex align-items-center">
          <img
            :style="{ maxHeight: '70px', width: 'auto' }"
            class="mr-1"
            :src="item.image"
          />
          <span class="searched-product-name col-7 align-self-center mx-3">
            {{ item.name }}
          </span>
        </div>

        <div
          class="add-item-button col-2"
          @click="addProductWant(item)"
        >
          {{ $t('common.add') }}
        </div>
      </div>

      <div
        v-if="productItems.length > 0"
        class="mt-2 d-flex justify-content-between px-4 no-product"
      >
        <div class="">{{ $t('common.dont_see_your_product') }}</div>
        <u @click="$bvModal.show('suggest_a_new_product')">
          {{ $t('common.suggest_a_new_product') }}
        </u>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { ListingItemProductSuggestion } from '~/components/modal'
  import {
    PRODUCT_FOR_COUNTER_OFFER
  } from '~/static/constants/trades'
  import { Modal } from '~/components/common'


export default {
  name: 'SearchedProductsBelowSearchTextBox',
  components: {
    ListingItemProductSuggestion,
    Modal
  },
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
    },
    suggestNewStyle: {
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
  methods: {
    ...mapActions({
      suggestProduct: 'product/suggestProduct',
    }),
    addProductTrade(product){
      if(this.productsFor === this.counterOffer){
        this.$root.$emit('add_product_counter_offer', product)
      }else{
        this.$root.$emit('add_product_trade', product)
      }
    },

    showSuccess({ sku, name }) {
      this.suggestProduct({ name, sku }).then((res) => {
        this.$bvModal.show('showSuceessModal')
      })
    },

    addProductWant(product) {
      if(this.inputType === 'wantsList'){
        this.addProductWantList(product)
      }
      else {
        this.$root.$emit('add_product_want', product)
      }
    },
    addProductWantList(product) {
      this.$emit('add_product_want_list', product)
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
  @include body-9-normal
  font-family: $font-family-montserrat
  color: $color-black-15
  @media (min-width: 576px)
    @include body-4
    color: $color-black-1

.searched-product-add-to-wants
  @include body-4-normal
  color: $color-gray-5 !important
  font-family: $font-family-montserrat

.no-product
  @include body-6-normal
  font-style: italic
  color: $color-black-1
  letter-spacing: 1px
  @media (min-width: 576px)
    @include body-4-regular
    font-family: $font-family-montserrat
    border-bottom-left-radius: 8px
    border-bottom-right-radius: 8px
    height: 60px

.suggest-new
  color: $color-black-1
  text-decoration: underline

.search-item
  border: 0.5px solid $color-gray-89
  margin-top: 11px
  border-radius: 4px
  padding: 10px

.add-item-button
  @include body-9-medium
  background: $color-blue-20
  border-radius: 5px
  display: flex
  align-items: center
  justify-content: center
  font-family: $font-family-sf-pro-display
  color: $color-white-1
  height: 22px

</style>
