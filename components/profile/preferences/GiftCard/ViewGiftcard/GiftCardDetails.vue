<template>
  <!-- <b-col cols class="details-col px-5"> -->
  <b-col cols class="details-col">
    <b-row class="giftcarddetails-row">
      <!-- Image -->
      <b-col class="cols img-col">
        <div class="img-wrapper">
          <b-img-lazy
            :src="getImage"
            alt="giftcrd-image"
            class="giftcard-image"
            @error="fallbackImage"
          >
          </b-img-lazy>
        </div>
      </b-col>
      <!-- ./Image -->

      <b-col class="carddetails-col">
        <div class="details-wrapper">
          <!-- Available Balance -->
          <div class="available-balance">
            {{ $t('giftcard_section.available_balance') }}&colon;
            {{ balance | toCurrency('USD', 'N/A') }}
          </div>
          <!-- ./Available Balance -->

          <div class="pin-show-hide mt-4">
            <!-- Gift card number (hide/ show) -->
            <div class="number-wrapper">
              <PinVisibility
                v-if="cardNumber"
                class="cardNumber"
                :text="$t('giftcard_section.giftcard_code')"
                :itemValue="cardNumber"
                lastDigitCount="4"
              />
            </div>
            <!-- ./Gift card number (hide/ show) -->
            
            <!-- Pin number (hide/ show) -->
            <div class="pin-wrapper">
              <PinVisibility
                v-if="pin"
                :text="$t('giftcard_section.pin')"
                :itemValue="pin"
              />
            </div>
            <!-- Pin Number (hide/ show) -->
          </div>

          <GiftcardUpdateComponent />

        </div>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import { mapGetters } from 'vuex'
import PinVisibility from '../common/PinVisibility.vue'
import GiftcardUpdateComponent from '~/components/profile/preferences/GiftCard/GiftcardUpdateComponent.vue'
import { GOOGLE_MAPS_BASE_URL } from '~/static/constants'


export default {
  name: 'GiftCardDetails',

  components: {
    PinVisibility,
    GiftcardUpdateComponent
  },

  props: {    
    showAddFunds: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapGetters({
      getSelectedGiftCard: 'preferences/getSelectedGiftCard',
    }),
  
    getImage: (vm) => {
      try {
        if(vm.getSelectedGiftCard.card){
          return require(`~/assets/img/preferences/giftcard/${vm.getSelectedGiftCard.card.image_name}`)
        }
      } catch (error) {
        return require('~/assets/img/preferences/giftcard/Black_Deadstock_Logo.png')
      }
    },
    
    pin: (vm) => {
      return vm.getSelectedGiftCard.pin
    },

    balance: (vm) => {
      return vm.getSelectedGiftCard.remaining_amount
    },

    cardNumber: (vm) => {
      return vm.getSelectedGiftCard.giftcard_number
    }
  },

  mounted() {
     this.injectGoogleMapsApi()
  },

  methods: {
    // Fallback image
    fallbackImage(event) {
      event.target.src = require('~/assets/img/preferences/giftcard/Black_Deadstock_Logo.png')
    },

    // Inject Google Maps Api (if it doesn't exist)
    injectGoogleMapsApi() {
      if (!window.google) {
        const scriptTag = this.createScriptTag()
        scriptTag.src = GOOGLE_MAPS_BASE_URL
        this.insertScript(scriptTag)
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
.details-col
  .giftcard-image
    width: 291px
    height: 184px
    left: 402px
    top: 380px
  .details-wrapper
    .available-balance
      font-style: normal
      @include body-2-bold
      color: $color-black-1

@media (max-width: 320px)
  .carddetails-col
    margin-top: 30px
  .img-col
    flex: 0 0 100%
    max-width: 100%
  .carddetails-col
    flex: 0 0 100%
    max-width: 100%
  .details-col
    .giftcard-image
      width: 274px
    .details-wrapper
      .available-balance
        @include body-3
  .pin-hide-show
    span
      @include body-3
    .number-wrapper,
    .pin-wrapper
      width: 100%
@media (min-width:321px) and (max-width: 375px)
  .carddetails-col
    margin-top: 30px
  .img-col
    flex: 0 0 100%
    max-width: 100%
  .carddetails-col
    flex: 0 0 100%
    max-width: 100%
  .details-col
    .details-wrapper
      .available-balance
        @include body-2
  .pin-hide-show
    .number-wrapper,
    .pin-wrapper
       width: 100%
@media (min-width:376px) and (max-width: 425px)
  .carddetails-col
    margin-top: 30px
  .img-col
    flex: 0 0 100%
    max-width: 100%
    .img-wrapper
      display: flex
      justify-content: center
  .carddetails-col
    flex: 0 0 100%
    max-width: 100%

@media (min-width: 1260px)
  .img-col
    flex: 0 0 40%
    max-width: 40%
  .carddetails-col
    flex: 0 0 60%
    max-width: 60%
  .details-col
    .row
      padding: 0 3rem
@media (min-width: 1350px)
  .pin-show-hide
    display: flex
    .number-wrapper
      flex: 0 0 50%
      max-width: 50%
    .pin-wrapper
      flex: 0 0 50%
      max-width: 50%
</style>