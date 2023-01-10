<template>
  <b-container fluid class="px-0">
    <div v-if="activeAuction" class="d-flex flex-column flex-md-row flex-md-nowrap">
      <AuctionCart v-if="! isResponsive" :auction="activeAuction" />

      <CheckoutSidebar v-if="! isResponsive"  class="order-summary auction-checkout" />
      <ShoppingBag v-else />
      
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
    </div>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AuctionCart from '~/components/Auctions/AuctionCart'
import CheckoutSidebar from '~/components/checkout/bid/ShoppingCartOrder'
import CheckmarkIcon from '~/assets/img/icons/checkmark.svg?inline'
import CloseIcon from '~/assets/img/icons/close.svg?inline'
import {GOOGLE_MAPS_BASE_URL, RISKIFIED_DOMAIN, RISKIFIED_SHOP_DOMAIN} from '~/static/constants/environments'
import { enquireScreenSizeHandler } from '~/utils/screenSizeHandler'
import screenSize from '~/plugins/mixins/screenSize'
import ShoppingBag from '~/components/checkout/bid/mobile/ShoppingBag'

export default {
  name: 'AuctionCheckout',
  components: { AuctionCart, CheckoutSidebar, CheckmarkIcon, CloseIcon, ShoppingBag },
  mixins: [ screenSize ],
  layout: 'IndexLayout',
  head() {
    return {
      title: this.$t('shopping_cart.shopping_cart'),
    }
  },
  computed: {
    ...mapGetters({
      activeAuction: 'auction/activeAuction',
      checkoutStatus: 'auction/getCheckoutStatus',
    }),
    isResponsive(vm) {
      return vm.isScreenXS || vm.isScreenSM
    }
  },
  watch: {
    checkoutStatus(status) {
      if (status === 'completed') {
        this.$bvModal.show('quick-bid-modal')
      }
    }
  },
  beforeMount() {
    this.$root.$emit('hide-header', { hideHeader: true })
    this.$root.$emit('hide-footer', { hideFooter: true })

    if (this.$store.$auth.loggedIn) {
      this.getUserDetails()
      this.getUserRedeemedReward()
      this.getOrderSettings()
    }

    enquireScreenSizeHandler((type) => {
      this.$store.commit('size/setScreenType', type)
    })
  },
  mounted() {
    this.injectRiskifiedBeacon()
    this.injectGoogleMapsApi()
  },
  beforeDestroy() {
    this.$root.$emit('hide-header', { hideHeader: false })
    this.$root.$emit('hide-footer', { hideFooter: false })
  },
  methods: {
    ...mapActions({
      getUserDetails: 'auth/getUserDetails',
      getUserRedeemedReward: 'redeemed-reward/getUserRedeemedReward',
      getOrderSettings: 'order-settings/getOrderSettings'
    }),
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

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.auction-checkout
  min-height: calc(100vh - 224px)
  padding: 44px 32px 44px 33px
  @media (max-width: 576px)
    background: $white
    padding: 18px 0
.mobile-header-title
  font-family: $font-montserrat
  font-weight: $medium
  @include body-12
  color: $black
.header-back-icon
  padding: 0 6px 0 8px
.empty-notification-slot
  width: 51px
</style>