<template>
  <b-row class="place-offer">
    <ItemList />

    <PlaceOfferSummary class="offer-summary" />
  </b-row>
</template>

<script>
import ItemList from '~/components/checkout/place-offer/ItemList'
import PlaceOfferSummary from '~/components/checkout/place-offer/PlaceOfferSummaryComponent'
import { GOOGLE_MAPS_BASE_URL } from '~/static/constants/environments'

export default {
  name: 'PlaceOffer',

  components: {
    ItemList,
    PlaceOfferSummary,
  },

  layout: 'IndexLayout',

  mounted() {
    this.injectGoogleMapsApi()
  },

  methods: {
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