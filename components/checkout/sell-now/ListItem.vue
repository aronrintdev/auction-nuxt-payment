<template>
  <!-- Shopping Cart List Item -->
  <b-row  class="mt-4">
    <b-col v-if="ifItemExist"  md="6">
      <b-row>
        <b-col md="3">
          <b-img
            class="custom-thumbnail"
            :src="product.image"
            :alt="$t('shopping_cart.product_image')"
          ></b-img>
        </b-col>
        <b-col md="9" class="pl-3">
          <b-row class="mb-2 d-block">
            <div class="body-4-bold mb-2">{{ product.name }}</div>
            <div class="body-4-normal mb-2 text-gray-6 text-uppercase">
              {{ $t('shopping_cart.sku') }}&colon;&nbsp;{{ product.sku }} &nbsp;
            </div>
            <div class="body-4-normal mb-2 text-gray-6">
              {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{
                product.colorWay
              }} &nbsp;
              {{ $tc('common.size', 1) }}&colon;&nbsp;{{ product.size.size }}
            </div>
            <div class="body-4-normal mb-2 text-gray-6">
              {{ $t('common.box_condition') }}&colon;&nbsp;{{
                product.packaging_condition.name
              }} &nbsp;
            </div>
          </b-row>
          <b-row class="d-inline">
            <b-btn
              class="custom-link pl-0"
              variant="link"
              @click="editItem(product)"
              >{{ $t('common.edit') }}</b-btn
            >
          </b-row>
        </b-col>
      </b-row>
    </b-col>
    <b-col v-if="ifItemExist"  md="6">
      <b-row class="justify-content-center">
        <div class="text-center">
          <div class="body-4-bold">&dollar;{{ total | formatPrice }}</div>
        </div>
      </b-row>
    </b-col> </b-row
  ><!-- End of Shopping Cart List Item -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ListItem',
  computed: {
    ...mapGetters({
      product: 'sell-now/getSellingItem',
      wishLists: 'wish-list/getWishLists',
      listing: 'listingItems/getListingDrafts',
    }),
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    total: (vm) => {
      return vm.product.highestOffer * vm.product.quantity
    },

    ifItemExist: (vm) => {
      return Object.keys(vm.product).length
    }
  },
  methods: {
    ...mapActions({
      addListingToDraft: 'listingItems/addListingToDraft',
    }),
    // On edit click
    editItem(val) {
      const payload = {
        product: val.product,
        sizeId: val.size_id,
        quantity: val.quantity,
        price: val.highestOffer,
        packagingConditionId: val.packaging_condition_id,
        minOfferAmount: val.highestOffer,
      }
      this.addListingToDraft(payload).then(() => {
        this.$router.push({
        path: `/profile/create-listing/selling/product/edit/${this.listing.indexOf(
          payload
        )}`,
        query: {
          id: this.listing.indexOf(payload),
        },
      })
      })
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

/* Quantity controls (plus and minus incrementer) styles */
.quantity-control
  &:hover,
  &:focus
    color: $color-gray-4
    cursor: pointer
    user-select: none

/* Quantity indicator styles */
.quantity-indicator
  &.form-control
    background: $white
    border: 1px solid $color-gray-4
    border-radius: 0.25rem
    position: absolute
    right: 0
    top: -0.6rem
    @include body-4-bold
    &:focus
      border: 1px solid $color-gray-4
      border-radius: 0.25rem
</style>
