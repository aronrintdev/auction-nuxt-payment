<template>
  <div class="saved-payment mt-4">
    <b-row class="saved-payment-row">
      <b-col cols class="payment-heading">
        <div class="add-payments">
          {{ $t('preferences.payments.add_amount') }}
        </div>
      </b-col>
      <b-col cols class="denomination-col d-flex">
        <div
            v-for="(amount, index) in denomination"
            id="amount-list-button"
            :key="index"
            class="denomination mr-3"
            role="button"
            :class="{ selected: selectedDenomination === amount.id }"
            @click="updateAmount(amount)"
          >
          <div class="add-amount-item">
            &dollar;{{ amount.val | formatPrice }}
          </div>
        </div>
        <div>
          <b-form-input
            v-model="selectedAmount"
            :placeholder="$t('preferences.payments.custom_amount')"
            class="form-input custom-amount"
            :number="true"
            @input="handleAmountInput"
          ></b-form-input>
          <small class="upto-limit">{{ $t('preferences.payments.upto_limit', { limit: inputLimit }) }}</small>
        </div>
      </b-col>
      
      <b-col cols class="new-payment-col mt-4">
        <div class="new-payment">
          {{ $t('giftcard_section.new_payment') }}&colon;&nbsp;{{ newBalance  | toCurrency('USD', 'N/A')}}
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import {
  PURCHASE_GIFTCARD_DENOMINATION,
  GIFTCARD_INPUTAMOUNTLIMIT
} from '~/static/constants'
export default {
  name: 'Denomination',

  data() {
    return {
      denomination: PURCHASE_GIFTCARD_DENOMINATION,
      selectedDenomination: 0,
      selectedAmount: '',
      inputLimit: GIFTCARD_INPUTAMOUNTLIMIT
    }
  },

  computed: {
    ...mapGetters({
      selectedCard: 'preferences/getSelectedGiftCard',
      amountSelected: 'preferences/getSelectedAmount'
    }),
    // On amount select
    newBalance: (vm) => {
      return parseInt(vm.selectedCard.remaining_amount)
       + parseInt(vm.amountSelected) || 0
    },
  },

  created() {
    // On load, select the first item.
    this.initializeDenomination()
  },

  methods: {
    ...mapActions({
      addAmount: 'preferences/addAmount'
    }),
    // On load set the first item as selected
    initializeDenomination() {
      const firstValue = this.denomination[0]
      this.updateAmount(firstValue)

    },
    // on denomination clicl
    updateAmount(value){
      this.selectedDenomination = value.id
      this.selectedAmount = this.$options.filters.formatPrice(value.val)
      this.addAmount(value.val)
    },
    // On input field enter
    handleAmountInput(event){
      if(event <= this.inputLimit){
        this.selectedDenomination = ''
        this.selectedAmount = event
        this.addAmount(event * 100)
        this.$emit('input', this.selectedAmount)
      }
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.add-payments
  font-style: normal
  @include body-3-medium
  color: $color-black-1
.denomination
  width: 80px
  height: 50px
  left: 750px
  top: 519px
  .add-amount-item
    display: table
    margin: 0 auto
    margin-top: 10px
.denomination
  border: 1px solid $color-gray-23
  border-radius: 4px
  &.selected
    border: 1.5px solid $color-black-1
    border-radius: 4px
.payment-heading
  flex: 0 0 100%
  max-width: 100%
.denomination-col
  flex: 0 0 100%
  max-width: 100% 
  margin-top: 15px
.new-payment
  font-style: normal
  @include body-4-normal
  color: $color-black-1
.upto-limit
  font-style: normal
  @include body-5-normal
  color: $color-gray-23

.custom-amount
  width: 184px
  height: 50px
  left: 1038px
  top: 519px
  border: 1px solid $color-gray-23
  border-radius: 4px
</style>