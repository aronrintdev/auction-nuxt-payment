<template>
  <b-row class="place-offer">
    <ItemList v-if="! isResponsive" />

    <PlaceOfferSummary v-if="! isResponsive" class="offer-summary" />

    <ShoppingBag v-else />
  </b-row>
</template>

<script>
import { mapActions } from 'vuex'
import screenSize from '~/plugins/mixins/screenSize'
import ItemList from '~/components/checkout/place-offer/ItemList'
import PlaceOfferSummary from '~/components/checkout/place-offer/PlaceOfferSummaryComponent'
import ShoppingBag from '~/components/checkout/place-offer/mobile/ShoppingBag'
import { GOOGLE_MAPS_BASE_URL } from '~/static/constants/environments'
import { enquireScreenSizeHandler } from '~/utils/screenSizeHandler'

export default {
  name: 'PlaceOffer',
  components: {
    ItemList,
    PlaceOfferSummary,
    ShoppingBag
  },
  mixins: [ screenSize ],
  layout: 'IndexLayout',
  computed: {
    isResponsive() {
      return this.isScreenXS || this.isScreenSM
    }
  },
  beforeMount() {
    this.$root.$emit('hide-header', { hideHeader: true })
    enquireScreenSizeHandler((type) => {
      this.$store.commit('size/setScreenType', type)
    })
  },
  mounted() {
    if (this.$store.$auth.loggedIn) {
      this.getUserDetails()
      this.getUserRedeemedReward()
      this.getOrderSettings()
      this.$auth.fetchUser()
    }
    this.injectGoogleMapsApi()
  },
  beforeDestroy() {
    this.$root.$emit('hide-header', { hideHeader: false })
  },
  methods: {
    ...mapActions({
      getUserDetails: 'auth/getUserDetails',
      getUserRedeemedReward: 'redeemed-reward/getUserRedeemedReward',
      getOrderSettings: 'order-settings/getOrderSettings'
    }),
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
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.offer-summary
  background: $color-gray-1
.place-offer
  min-height: 721px
</style>
