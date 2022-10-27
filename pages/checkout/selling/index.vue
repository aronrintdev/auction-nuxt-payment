<template>
  <b-row>
    <!-- Checkout selling normal version (md, lg & xl) -->
    <ItemsList v-if="! isScreenSM || ! isScreenXS" />
    <ShoppingCartOrder v-if="! isScreenSM || ! isScreenXS" class="order-summary" />
    <!-- End of Checkout selling normal version (md, lg & xl) -->

    <!-- Checkout selling mobile version (xs & sm) -->
    <ShoppingBag />
    <!-- End of Checkout selling mobile version (xs & sm) -->
  </b-row>
</template>

<script>
import { mapActions } from 'vuex'
import ItemsList from '~/components/checkout/selling/ItemsList'
import ShoppingCartOrder from '~/components/checkout/selling/ShoppingCartOrder'
import ShoppingBag from '~/components/checkout/selling/mobile/ShoppingBag'
import { GOOGLE_MAPS_BASE_URL, RISKIFIED_DOMAIN, RISKIFIED_SHOP_DOMAIN } from '~/static/constants/environments'
import screenSize from '~/plugins/mixins/screenSize'

export default {
  name: 'Index',
  components: { ItemsList, ShoppingCartOrder, ShoppingBag },
  mixins: [ screenSize ],
  layout: 'IndexLayout',
  head() {
    return {
      title: this.$t('shopping_cart.checkout_selling'),
    }
  },
  beforeMount() {
    if (this.$store.$auth.loggedIn) {
      this.getUserDetails()
      this.getUserRedeemedReward()
      this.getOrderSettings()
    }
  },
  mounted() {
    this.injectRiskifiedBeacon()
    this.injectGoogleMapsApi()
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
