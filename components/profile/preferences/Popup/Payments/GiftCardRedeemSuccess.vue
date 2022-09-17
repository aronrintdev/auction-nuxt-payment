<template>
  <b-card-text>
    <b-row class="justify-content-center d-flex">
      <b-col md="12">
        <!-- Card image -->
        <b-row class="justify-content-center d-flex">
          <img
            :src="giftCardImage"
            alt="Demo Debit Card"
            class="w-50 justify-content-center"
          />
        </b-row>
        <!-- Card Image -->

        <!-- Avaialble Balance -->
        <b-row class="justify-content-center d-flex mt-3">
          <b-col md="12">
            <div class="available-balance">
              {{ $t('preferences.payments.available_balance') }} &colon;
              {{ remainingBalance | toCurrency('USD', 'N/A') }}
            </div>
          </b-col>
        </b-row>
        <!-- ./Avaialble Balance -->

        <!-- GiftCard number/ Pin -->
        <b-row class="justify-content-center d-flex my-1">
          <b-col md="12">
            <div class="sub-text">
              <span class="mt-2"
                >{{ $t('preferences.payments.giftcard_code') }}&colon;
                <span class="text-primary">{{ cardCode }}</span></span
              >

              <span class="mt-2"
                >{{ $t('common.pin') }}&colon;
                <span class="text-primary">{{ pin }}</span></span
              >
            </div>
          </b-col>
        </b-row>
        <!-- GiftCard number/ Pin -->

        <!-- How To Use -->
        <b-row class="m-4">
          <div class="how-to-use">
            {{ $t('preferences.payments.how_to_use') }} &colon;
          </div>
          <div class="description">
            <p align="left" class="mt-3">
              {{ $t('preferences.payments.redeem_text') }}
            </p>
            <p align="left" class="mt-3">
              {{ $t('preferences.payments.redeem_subtext') }}
            </p>
            <p>
              <b-button
                type="button"
                pill
                class="float-right px-3"
                @click="closeModal()"
              >
                {{ $t('preferences.common.continue') }}
              </b-button>
            </p>
          </div>
        </b-row>
      </b-col>
    </b-row>
  </b-card-text>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import emitEvent from '~/plugins/mixins/emit-event'
export default {
  name: 'GiftCardRedeemSuccess',

  mixins: [emitEvent],

  computed: {
    ...mapGetters({
      redeemSuccess: 'preferences/getRedeemSuccess'
    }),

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    giftCardImage: (vm) => {
      return require(`~/assets/img/preferences/giftcard/${vm.redeemSuccess.card.image_name}`)
    },

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    remainingBalance: (vm) => {
      return vm.redeemSuccess.remaining_amount
    },

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    cardCode: (vm) => {
      return vm.redeemSuccess.giftcard_number
    },

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    pin: (vm) => {
      return vm.redeemSuccess.pin
    }
  },

  created() {
    // Update the modal title.
    this.updateModalHeader({
      title: this.$t('preferences.payments.your_gift_card_redemeed'),
      showTabs: true
    })
  },

  methods: {
    ...mapActions({
      updateModalHeader: 'preferences/updateModalHeader',
    }),
    
    // Close Modal, Removed the stored values.
    closeModal() {
      this.$bvModal.hide('payment-methods-modal')
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.available-balance
  font-style: normal
  @include body-2-bold
  color: $color-black-1

.sub-text
  font-style: normal
  @include body-4-medium
  text-align: center
  color: $color-black-1
.how-to-use
  font-style: normal
  @include body-1-medium
  color: $color-black-1
.description
  p
    font-style: normal
    @include body-5-normal
    color: $color-black-1
.btn
  background: $color-white-1
  border: 1px solid $color-blue-20
  border-radius: 20px
  color: $color-blue-20
</style>
