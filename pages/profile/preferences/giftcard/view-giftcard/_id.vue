<template>
  <b-col class="vendor-preferences-body">
    <div class="vd-preferences-slider">
      <h1 v-if="getPageTitle" class="vd-preferences-heading">
        {{ getPageTitle }}
      </h1>
    </div>
    <b-container id="content-body" fluid>
      <ViewGiftCard v-if="showDetails" />
    </b-container>
  </b-col>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ViewGiftCard from '~/components/profile/preferences/GiftCard/ViewGiftCard.vue'
export default {
  name: 'GiftCard',

  components: {
    ViewGiftCard,
  },

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
  position: absolute
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
