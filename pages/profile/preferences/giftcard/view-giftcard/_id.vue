<template>
  <b-col class="vendor-preferences-body">
    <div v-if="!isScreenXS" class="vd-preferences-slider">
      <h1 v-if="getPageTitle" class="vd-preferences-heading position-absolute">
        {{ getPageTitle }}
      </h1>
    </div>
    <b-container v-if="!isScreenXS" id="content-body" fluid>
      <ViewGiftCard v-if="showDetails" />
    </b-container>
      <gift-card-details v-if="isScreenXS"/>
    
    <client-only  v-if="isScreenXS">
      <Portal to="page-title"> {{ $t('preferences.payments.gift_card') }}&colon; {{ getSelectedGiftCard.giftcard_number }}</Portal>
      <!-- If back icons needed -->
      <Portal to="back-icon-slot"> 
        <img
          :src="require('~/assets/img/icons/back.svg')"
          alt="back-arrow"
          class="float-left"
          @click="backTo"
        />
      </Portal>
    </client-only>
  </b-col>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ViewGiftCard from '~/components/profile/preferences/GiftCard/ViewGiftCard.vue'
import screenSize from '~/plugins/mixins/screenSize'
import GiftCardDetails from '~/components/profile/preferences/ResponsiveGiftCardDetails/Details.vue'
import { GOOGLE_MAPS_BASE_URL } from '~/static/constants'

export default {
  name: 'GiftCard',

  components: {
    ViewGiftCard,
    GiftCardDetails
  },

  mixins: [screenSize],

  layout: 'Profile',

  middleware: 'auth',

  data() {
    return {
      showDetails: false,
    }
  },

  computed: {
    ...mapGetters({
      getSelectedGiftCard: 'preferences/getSelectedGiftCard',
      getPageTitle: 'preferences/getPageTitle',
    }),
    // Giftcard number
    giftCardNumber: (vm) => {
      if (vm.getSelectedGiftCard) {
        return vm.getSelectedGiftCard.giftcard_number
      }
    },
  },

  mounted() {
     this.injectGoogleMapsApi()
  },

  created() {
    // Get the card details
    const id = this.$route.params.id
    this.saveGiftCardDetails(id)
      .then((res) => {
        this.showDetails = true
      })
      .catch((error) => {
        this.$logger.logToServer('View Giftcard details', error.response)
        this.$router.push('/profile/preferences')
      })
    // Update the page title
    this.updatePageTitle(
      this.$t('giftcard_section.giftcard', { cardNo: this.giftCardNumber })
    )
  },

  methods: {
    ...mapActions({
      saveGiftCardDetails: 'preferences/saveGiftCardDetails',
      updatePageTitle: 'preferences/viewPageTitle',
    }),

    backTo() {
      this.$store.dispatch('preferences/changeHeaderVisibility', true)
      this.$router.push('/profile/preferences')
      this.$auth.$storage.setState('showGiftCardMethod', true)
    },

    injectGoogleMapsApi() {
      if (!window.google) {
        const scriptTag = this.createScriptTag()
        scriptTag.src = GOOGLE_MAPS_BASE_URL
        this.insertScript(scriptTag)
        return true
      }
      return false
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
.vd-preferences-heading
  font-style: normal
  @include heading-11
  color: $color-black-1
  left: 2rem
  top: 5rem

/* media query */
@media (max-width: 320px)
  .vd-preferences-heading
    @include body-2
@media (min-width: 320px) and (max-width: 345px)
  .vd-preferences-heading
    @include body-7
@media (min-width: 345px) and (max-width: 375px)
  .vd-preferences-heading
    @include body-1
@media (min-width: 376px) and (max-width: 425px)
  .vd-preferences-heading
    @include heading-2
@media (min-width: 426px) and (max-width: 768px)
  .vd-preferences-heading
    @include heading-5
</style>
