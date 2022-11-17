<template>
  <!-- View Offer Item Modal -->
  <b-modal
    id="offer-item-modal"
    centered
    size="lg"
    hide-footer
    content-class="pb-4"
    body-class="py-0"
    hide-header
  >
    <div class="d-flex justify-content-end position-relative">
      <img :src="require('~/assets/img/trades/modelclose.svg')" role="button" @click="$bvModal.hide('offer-item-modal')" class="close-btn position-absolute">
    </div>
    <div class="custom-header-modal mt-3">
      {{$t('trades.create_listing.vendor.wants.offer_items')}}
    </div>
    <b-row class="justify-content-center mt-4">
      <div v-for="prod in getTradeItems" :key="prod.id" class="create-trade-item-sm mr-4 mb-4">
        <div class="sm-img-cont position-relative d-flex justify-content-center align-items-center">
        <div v-if="prod.quantity > 1" class="create-trade-quantity-car-sm position-absolute">x{{ prod.quantity || 1 }}</div>
        <div class="create-trade-item-image-div-sm position-relative">
          <object
            :data="`${IMAGE_PATH}/${prod.product && prod.product.category.name ? prod.product.category.name : prod.category.name }/${prod.sku ? prod.sku : prod.product.sku}/800xAUTO/IMG01.jpg`"
            class="create-trade-item-image-sm" type="image/png">
            <img class="create-trade-item-image-sm mb-2" :src="fallbackImgUrl" alt="image"/>
          </object>
        </div>
        <div class="overlay-item"></div>
        </div>
        <div class="create-trade-item-caption-sm">
          <span :id="`name-sm${prod.id}`"
                      class="create-trade-item-name-sm">{{ prod.name ? prod.name : prod.product.name }}</span>
          <span :id="`colorway-sm${prod.id}`"
                class="create-trade-item-caption-description-sm">{{ prod.colorway ? prod.colorway : prod.product.colorway }},{{$t('common.size')}}{{ prod.size && prod.size.size }}</span>
          <span class="create-trade-item-caption-description-sm">{{$t('common.box.')}}: {{
              prod.packaging_condition && prod.packaging_condition.name
            }}</span>
        </div>

        <b-tooltip :target="`name-sm${prod.id}`" triggers="hover">
          {{ prod.name ? prod.name : prod.product.name }}
        </b-tooltip>

        <!-- tooltip for colorway -->
        <b-tooltip :target="`colorway-sm${prod.id}`" triggers="hover">
          {{ prod.colorway ? prod.colorway : prod.product.colorway }}
        </b-tooltip>
      </div>
    </b-row>
  </b-modal
  ><!-- End of List Item Modal -->
</template>

<script>
import {mapGetters} from 'vuex'
import {IMAGE_PATH} from '~/static/constants/create-listing'
import { PRODUCT_FALLBACK_URL } from '~/static/constants'

export default {
  name: 'ViewOfferItemsModal',
  data() {
    return {
      IMAGE_PATH,
      fallbackImgUrl: PRODUCT_FALLBACK_URL,
    }
  },
  computed: {
    ...mapGetters('trades', ['getTradeItems']),
  },
  methods: {
    decrementOrRemoveItem(id) {
      const existingItem = this.getTradeItems.find(val => val.id === id)
      if (existingItem.quantity > 1) {
        this.$store.commit('trades/decrementTradeItemQuantity', id)
      } else {
        this.$store.commit('trades/removeTradeItem', id)
      }
    }
  }
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.custom-header-modal
  background: $color-white-1
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-1-bold
  color: $color-black-1
.close-btn
  right: 10px
  top: 13px
.overlay-item
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: $color-grey-70
.create-trade-item-sm
  width: 164px
  height: 249px
  border: unset
.create-trade-item-image
  width: 100%
  aspect-ratio: 1
.create-trade-item-image-sm
  width: 100%
  aspect-ratio: 1
.create-trade-item-image-div-sm
  background: $color-white-1
.create-trade-quantity-car-sm
  left: 10px
  top: 10px
.sm-img-cont
  height: 185px
  background: $color-white-1
  padding: 25px
.create-trade-item-caption-sm
  background: $color-white-1
</style>
