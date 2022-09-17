<template>
  <!-- Shopping Cart Product -->
  <b-col md="9" class="p-5 background-light">
    <b-row>
      <b-col md="12">
        <b-row>
          <b-col md="6">
            <div class="pull-left heading-1-bold w-100">
              {{ productName }}
            </div>
            <span class="offer-placed-text">{{ $t('place_offer.offer_accepted_text') }}</span>
          </b-col>
          <b-col md="6">
            <div class="pull-right pr-5 heading-1-bold">
              {{ offerQuantity }}
              {{ $tc('shopping_cart.item', offerQuantity ) }}
            </div>
          </b-col>
        </b-row>
        <hr class="mb-5 mt-4" />
      </b-col> </b-row
    ><!-- End of Shopping Cart Product -->

    <!-- Shopping Cart List Headers -->
    <b-row class="mb-5">
      <b-col md="6">
        <div class="body-5-bold text-gray-6 text-uppercase">
          {{ $t('place_offer.my_products') }}
        </div>
      </b-col>
      <b-col md="6">
        <b-row class="justify-content-center">
          <b-col>
            <div class="body-5-bold text-gray-6 text-uppercase text-center">
              {{ $t('place_offer.quantity') }}
            </div>
          </b-col>
                <b-col>
            <div class="body-5-bold text-gray-6 text-uppercase text-center">
              {{ $t('place_offer.duration') }}
            </div>
          </b-col>
                <b-col>
            <div class="body-5-bold text-gray-6 text-uppercase text-center">
              {{ $t('place_offer.offer') }}
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <!-- End Of Product List Headers -->

    <!-- Empty Cart Message -->
    <b-row v-if="!getOfferDetails" class="mt-5">
      <b-col md="12">
        <h6>
          {{ $t('sell_now.you_have_no_items') }}
        </h6>
      </b-col>
    </b-row>
    <!-- End of Empty Cart Message -->

    <!-- List Item -->
    <div v-if="getOfferDetails">
      <ListItem  />
    </div>
  </b-col>
</template>

<script>
import { mapGetters } from 'vuex'
import ListItem from './ListItem.vue'
export default {
  name: 'ItemList',

  components: {
    ListItem
  },

  computed: {
    ...mapGetters({
      getOfferDetails: 'offer/getOfferDetails'
    }),

    productName: (vm) => {

      return vm.getOfferDetails.product ? vm.getOfferDetails.product.name : null
    },

    offerQuantity: (vm) => {
      return vm.getOfferDetails.quantity
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.offer-placed-text
  font-family: $font-montserrat
  font-style: normal
  @include body-8-medium
  color: $color-gray-5
</style>