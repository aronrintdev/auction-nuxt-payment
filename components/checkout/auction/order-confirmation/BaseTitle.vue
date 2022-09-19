<template>
  <!-- Thank you message, Order Number -->
  <b-row>
    <b-col md="12">
      <!-- Thank You Message -->
      <b-row>
        <b-col md="12" class="mt-3 mb-5 text-center">
          <div class="heading-2-bold">{{ $t('create_listing.details.auction_posted') }}</div>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12" class="text-center">
          <b-img
            class="mb-3"
            :src="require('~/assets/img/shopping-cart/order-confirmation/checkmark.svg')"
            :alt="$t('shopping_cart.product_image')"
          ></b-img>
          <div class="heading-2-bold">{{ $t('create_listing.details.thankyou') }}</div>
        </b-col>
      </b-row> <!-- End of Thank You Message -->

      <!-- Order Number -->
      <b-row v-if="orderDetails.orderId" class="mt-4">
        <b-col md="12" class="text-center">
          <div class="body-5-bold">{{ $t('create_listing.details.reference_number') }}&colon;&nbsp;<span class="body-5-normal">{{ orderDetails.orderId }}</span></div>
        </b-col>
      </b-row><!-- End of Order Number -->
    </b-col>
  </b-row><!-- End of Thank you message, Order Number -->
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'BaseTitle',
  computed: {
    ...mapGetters({
      orderDetails: 'order-details/getOrderDetails'
    })
  }
}
</script>
