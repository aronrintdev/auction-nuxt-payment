<template>
  <!-- View Offer Item Modal -->
  <b-modal
    id="offer-item-modal"
    centered
    size="lg"
    hide-footer
    content-class="pb-4"
    body-class="py-0"
  >
    <template #modal-title class="custom-header-modal">
      {{$t('trades.create_listing.vendor.wants.offer_items')}}
    </template>
    <b-row class="justify-content-center mt-4">
      <div v-for="prod in getTradeItems" :key="prod.id" class="create-trade-item-sm d-flex justify-content-between flex-column mr-4 mb-4">
        <div class="d-flex justify-content-between mt-2 mx-2">
          <div class="create-trade-size-car-sm">Size {{ prod.size && prod.size.size }}</div>
          <div v-if="prod.quantity > 1" class="create-trade-quantity-car-sm">x{{ prod.quantity || 1 }}</div>
        </div>
        <div class="create-trade-item-image-div-sm">
          <object
            :data="`${IMAGE_PATH}/${prod.product && prod.product.category.name ? prod.product.category.name : prod.category.name }/${prod.sku ? prod.sku : prod.product.sku}/800xAUTO/IMG01.jpg`"
            class="create-trade-item-image-sm" type="image/png">
            <img class="create-trade-item-image-sm mb-2" :src="fallbackImgUrl" alt="image"/>
          </object>
        </div>
        <div class="create-trade-item-caption-sm">
                <span :id="`name-sm${prod.id}`"
                      class="create-trade-item-name-sm">{{ prod.name ? prod.name : prod.product.name }}</span>
          <span :id="`colorway-sm${prod.id}`"
                class="create-trade-item-caption-description-sm">{{ prod.colorway ? prod.colorway : prod.product.colorway }}</span>
          <span class="create-trade-item-caption-description-sm">Box: {{
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
