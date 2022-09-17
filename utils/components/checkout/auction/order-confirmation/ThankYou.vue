<template>
  <b-col md="7">
    <!-- Thank you message, Order Number, Contact Details, Reward Points Card & Continue Shopping Card -->
    <base-title />

    <b-row>
      <b-col md="12">
        <!-- Contact Details -->
        <b-row class="mt-4">
          <b-col md="10" offset="1" class="text-center body-5-normal auction-contact-details">
            <i18n
              path="create_listing.details.contact_details"
              tag="div"
            >
              <span class="body-5-bold">{{
                  $t('shopping_cart.dead_stock_email')
                }}</span>
              <span class="body-5-bold">{{
                  $t('shopping_cart.dead_stock_telephone_number')
                }}</span>
            </i18n>
          </b-col>
        </b-row><!-- End of Contact Details -->

        <b-row class="mt-5 pt-5">
          <b-col md="12" class="text-center">
            <NuxtLink to="/profile/auctions">
              <b-button type="button" class="px-5" variant="confirm" pill>{{ $t('create_listing.details.go_to_auctions') }}</b-button>
            </NuxtLink>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import { mapGetters } from 'vuex'
import emitEvent from '~/plugins/mixins/emit-event';
import BaseTitle from '~/components/checkout/auction/order-confirmation/BaseTitle';

export default {
  name: 'ThankYou',
  components: {BaseTitle},
  mixins: [ emitEvent ],
  computed: {
    ...mapGetters({
      cryptoDetails: 'order-details/getCryptoDetails'
    })
  },
}
</script>

<style lang="sass">
@import '~/assets/css/_variables'

/* Order placed custom card styles */
article
  &.custom-card
    > .card-body
      background: $color-white-3
    > .card-header
      background: $color-white-2

div
  &.text-center
    #continue-shopping-more
      color: $black-1
      @include body-5-normal
      &:hover
        text-decoration: underline
</style>
