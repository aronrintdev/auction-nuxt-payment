<template>
  <div class="add-funds-button mt-4">
    <Button id="add-funds" pill variant="add-funds" :disabled="giftCardStatus" @click="backButton">{{
      $t('giftcard_section.add_funds')
    }}</Button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Button } from '~/components/common'
import emitEvent from '~/plugins/mixins/emit-event'
import { EXPIRED_CARD, ACTIVE_CARD } from '~/static/constants'
export default {
  name: 'AddFundButton',

  components: {
    Button,
  },
  mixins: [emitEvent],

  data() {
    return {
      expiredCard: EXPIRED_CARD,
      activeCard: ACTIVE_CARD
    }
  },

  computed: {
    ...mapGetters({
      paymentMethod: 'preferences/getUserPaymentMethods',
      getSelectedGiftCard: 'preferences/getSelectedGiftCard',
    }),

    // Giftcard number
    giftCardNumber: (vm) => {
      if(vm.getSelectedGiftCard){
        return vm.getSelectedGiftCard.giftcard_number
      }
    },
    
    giftCardStatus: (vm) => {
      return vm.getSelectedGiftCard.giftcard_status === vm.expiredCard
    }
  },
  created() {
    // Set the page title and content,
    this.initializeData()
  },
  methods: {
    ...mapActions({
      toggleContent: 'preferences/toggleContent',
      updatePageTitle: 'preferences/viewPageTitle'
    }),
    // Update the page title and content
    initializeData(){
      this.toggleContent({ transactionHistory: true, howToUse: true, backTo: 'Preferences'})
      this.updatePageTitle(this.$t('giftcard_section.giftcard', { cardNo: this.giftCardNumber }))
    },
    // On Add funds button
    backButton() {
      this.toggleContent({ transactionHistory: false, howToUse: false, backTo: 'Preferences'})
      // If no save payment
      if(!this.paymentMethod && !this.paymentMethod.length){
        this.emitRenderComponentEvent(
          this.$parent.$options.components.NewPaymentInfo.name
        )
      }
      // Move to Saved user payment
      this.emitRenderComponentEvent(
        this.$parent.$options.components.SavedUserPayments.name
      )

    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
#add-funds
    background: $color-white-1
    border: 1px solid $color-blue-20
    border-radius: 20px
</style>