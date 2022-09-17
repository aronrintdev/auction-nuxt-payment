<template>
  <!-- <b-row class="mx-5 my-2 viewgiftcard-main"> -->
  <b-row class=" viewgiftcard-main">

    <!-- Back Button -->
    <b-col md="12" cols>
      <BackButton backLink  :text="contentVisibility.backTo !== 'Preferences' ? 'giftcard_section.back_to_previous' : 'shopping_cart.back'"  @click="backOnClick"/>
    </b-col>
    <!-- ./Back Button -->

    <!-- Giftcard details -->
    <GiftCardDetails v-if="getSelectedGiftCard"
      class="mt-3"
      showAddFunds
      
    />
    <!-- ./Giftcard details -->

    <!-- Transaction history -->
    <TransactionHistory v-if="contentVisibility.showTransactionHistory" />
    <!-- ./Transaction history -->

    <!-- Helptext -->
    <b-col v-if="contentVisibility.showHowToUse"  cols class="how-to-use-col mt-5">
      <div class="how-to-use-heading">
        {{ $t('giftcard_section.how_to_use.heading') }}&colon;
      </div>

      <div class="main-text mt-3">
        {{ $t('giftcard_section.how_to_use.main_text') }}
      </div>
      <div class="help-text mt-3">
        {{ $t('giftcard_section.how_to_use.help_text') }}
      </div>
    </b-col>
    <!-- ./Helptext -->

  </b-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BackButton from './common/BackButton.vue'
import TransactionHistory from './ViewGiftcard/TransactionHistory.vue'
import GiftCardDetails from './ViewGiftcard/GiftCardDetails.vue'
import emitEvent from '~/plugins/mixins/emit-event'

export default {
  name: 'ViewGiftCard',

  components: {
    BackButton,
    GiftCardDetails,
    TransactionHistory,
  },

  mixins: [emitEvent],

  computed: {
    ...mapGetters({
      getSelectedGiftCard: 'preferences/getSelectedGiftCard',
      contentVisibility: 'preferences/getContentVisibility'
    }),

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    selectedCard: (vm) => {
      if(vm.getSelectedGiftCard){
        return vm.getSelectedGiftCard.card
      }
    },

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    cardNumber: (vm) => {
      if(vm.getSelectedGiftCard){
        return vm.getSelectedGiftCard.giftcard_number
      }
    },

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    pin: (vm) => {
      if(vm.getSelectedGiftCard){
       return vm.getSelectedGiftCard.pin
      }
    },

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    balance: (vm) => {
      if(vm.getSelectedGiftCard){
        return vm.getSelectedGiftCard.remaining_amount
      }
    },

    cardImage:(vm) => {
      if(vm.getSelectedGiftCard && vm.getSelectedGiftCard.card){
        return vm.getSelectedGiftCard.card.image_name
      }
    }
  },

  methods: {
    ...mapActions({
      removeSelectedGiftCard: 'preferences/removeSelectedGiftCard',
      toggleContent: 'preferences/toggleContent'
    }),
    // Fallback image
    fallbackImage(event) {
      event.target.src = require('~/assets/img/preferences/giftcard/Black_Deadstock_Logo.png')
    },

    // On back button click
    backOnClick(){
      if(this.contentVisibility.backTo === 'Preferences') {
        this.$router.push('/profile/preferences')
      }else{
        this.$auth.$storage.setState('backTo', this.contentVisibility.backTo)
      }
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.how-to-use-heading
  font-style: normal
  @include body-1-medium
  color: $color-black-1
.main-text,
.help-text
  font-style: normal
  @include body-5-normal
  color: $color-black-1

@media (max-width: 768px)
  .viewgiftcard-main
    padding: 2.5rem
@media (min-width: 768px)
  .viewgiftcard-main
    padding: 3rem
  .how-to-use-col
    flex: 0 0 50%
    max-width: 50%

@media (max-width: 320px)
  .viewgiftcard-main
    padding: 2rem 0.5rem
@media (min-width: 321px) and (max-width: 425px)
  .viewgiftcard-main
    padding: 3rem 1rem

@media (min-width: 376px) and (max-width: 425px)
  .how-to-use-col
    margin: 3rem 1rem
@media (min-width: 426px)
  .how-to-use-col
    margin: 3rem 0rem
</style>