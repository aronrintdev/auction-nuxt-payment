<template>
  <b-card
    :class="{ activeClassItem: activeItem === items.id }"
    @click.stop="chooseItem(items)"
  >
    <div class="row">
      <div class="col-md-3 text-center">
        <!-- Item image -->
        <img
          :src="items.listing_item.inventory.product.image || fallbackImage"
          alt="product-image"
          class="img-fluid"
          @error="imageLoadError"
        />
        <!-- Item image -->
      </div>
      <!-- Item Details -->
      <div class="col-md-9">
        <h5 class="text-bold">
          {{ items.listing_item.inventory.product.name }}
        </h5>
        <p class="mb-0">
          {{ $t('vendor_purchase.updated_on') }}
          {{ updatedAt | formatDate }}
        </p>
        <p class="mb-0"><i class="fa fa-map-marker"></i>&nbsp;{{ location }}</p>
        <!-- TODO: item location. Harcoded for now. -->

        <p class="mb-0">
          {{ $t(`vendor_purchase.orderstatus.${status}`) }}
        </p>
      </div>
      <!-- Item Details -->
    </div>
  </b-card>
</template>

<script>
import {PRODUCT_IMG_WIDTH, PRODUCT_FALLBACK_URL} from '~/static/constants'

export default {
  name: 'VendorPurchaseShippingItems',

  props: {
    items: {
      type: Object,
      required: true,
    },
    activeItem: {
      type: Number,
      default: 0,
    },
    updatedAt: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      productImageWidth: PRODUCT_IMG_WIDTH,
      location: 'San Francisco, CA', // TODO: Harcoded for now
      fallbackImgUrl: PRODUCT_FALLBACK_URL,
    }
  },

  computed: {
    fallbackImage: (vm) => {
      return vm.fallbackImgUrl + '' + vm.productImageWidth
    },
  },

  methods: {
    // Image on load error
    imageLoadError(event) {
      event.target.src = this.fallbackImage
    },

    // Choosen item
    chooseItem(val) {
      this.$nuxt.refresh()
      this.$emit('selectedItem', val)
    },
  },
}
</script>

<style lang="sass" scoped>
img
  width: 100%
@media (max-width: 426px)
  img
    width: 50%
</style>
