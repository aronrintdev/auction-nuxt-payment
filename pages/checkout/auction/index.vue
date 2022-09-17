<template>
  <b-container fluid>
    <b-row v-if="activeAuction" >
      <AuctionCart :auction="activeAuction" />

      <CheckoutSidebar class="order-summary" />

      <!-- Quick Bid Modal -->
      <b-modal id="quick-bid-modal" hide-footer hide-header size="md">
        <div class="text-right">
          <close-icon role="button" class="close-icon" @click="$bvModal.hide('quick-bid-modal')"></close-icon>
        </div>
        <div class="text-center my-3">
          <h5 class="mb-4 mx-auto w-75 success-text">{{ $t('auctions.frontpage.highest_bidder_thanks_msg') }}</h5>
          <div class="d-inline-flex align-items-center justify-content-center checkmark-icon">
            <CheckmarkIcon />
          </div>
        </div>
      </b-modal>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'

import AuctionCart from '~/components/Auctions/AuctionCart'
import CheckoutSidebar from '~/components/checkout/bid/ShoppingCartOrder'
import CheckmarkIcon from '~/assets/img/icons/checkmark.svg?inline'
import CloseIcon from '~/assets/img/icons/close.svg?inline'
import {GOOGLE_MAPS_BASE_URL, RISKIFIED_DOMAIN, RISKIFIED_SHOP_DOMAIN} from '~/static/constants/environments'

export default {
  name: 'AuctionCheckout',
  components: { AuctionCart, CheckoutSidebar, CheckmarkIcon, CloseIcon },
  layout: 'IndexLayout',
  head() {
    return {
      title: this.$t('shopping_cart.shopping_cart'),
      script: [
        {
          src: GOOGLE_MAPS_BASE_URL,
          async: true,
          preload: true,
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      activeAuction: 'auction/activeAuction',
      checkoutStatus: 'auction/getCheckoutStatus',
    }),
  },
  watch: {
    checkoutStatus(status) {
      if (status === 'completed') {
        this.$bvModal.show('quick-bid-modal')
      }
    }
  },
  mounted() {
    this.injectRiskifiedBeacon()
    this.injectGoogleMapsApi()
  },
  methods: {
    // Inject Riskified Beacon (if it doesn't exist)
    injectRiskifiedBeacon() {
      if (window.RISKX) {
        return false
      }

      const url = new URL(RISKIFIED_DOMAIN)
      url.searchParams.set('shop', RISKIFIED_SHOP_DOMAIN)
      url.searchParams.set('sid', this._uid)

      const scriptTag = this.createScriptTag()
      scriptTag.src = url.toString()

      this.insertScript(scriptTag)
    },
    // Inject Google Maps Api (if it doesn't exist)
    injectGoogleMapsApi() {
      if (window.google) {
        return false
      }

      const scriptTag = this.createScriptTag()
      scriptTag.src = GOOGLE_MAPS_BASE_URL

      this.insertScript(scriptTag)
    },
    // Create a new script tag without the src attribute.
    createScriptTag() {
      const scriptTag = document.createElement('script')
      scriptTag.type = 'text/javascript'
      scriptTag.async = true

      return scriptTag
    },
    // Insert a new script tag before the first found script tag.
    insertScript(scriptTag) {
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag)
    }
  }
}
</script>
