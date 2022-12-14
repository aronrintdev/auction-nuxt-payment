<template>
  <div v-if="isScreenXS" class="add-funds-component">
    <b-row v-if="isScreenXS" class="add-funds-col mx-0">
      <!-- Image -->
      <b-col v-if="isScreenXS"  cols="12" class="add-funds-wrapper d-flex justify-content-center">
        <img
          class="add-funds-img img-fluid"
          :src="require(`/assets/img/preferences/giftcard/${imgName}`)"
          :alt="cardType"
        />
      </b-col>
      <!-- ./ Image -->
      <!-- Avaialable balance -->
      <b-col v-if="isScreenXS"  cols="12" class="available-balance d-flex justify-content-center">
        {{ $t('giftcard_section.available_balance') }}&colon; {{ availableBalance | toCurrency('USD', 'N/A') }}
      </b-col>
      <!-- ./Avaialable balance -->
      <!-- Giftcard code/ Pin -->
      <b-col v-if="isScreenXS"  cols="12" class="security-details d-flex px-0 justify-content-center">
        <div class="giftcard-code d-flex">
          <PinVisibility
            v-if="cardNumber"
            id="cardNumber"
            :text="$t('giftcard_section.giftcard_code')"
            :itemValue="cardNumber"
            :class="`ml-32`"
            lastDigitCount="4"
          />

        </div>
        <div v-if="isScreenXS"  class="pin">
          <PinVisibility
            v-if="cardPin"
            id="cardPin"
            :text="$t('giftcard_section.pin')"
            :itemValue="cardPin"
          />
        </div>
      </b-col>
      <!-- Giftcard code/ Pin -->

      <!-- Add Amount -->
      <b-col v-if="isScreenXS"  cols="12" class="add-amount-section px-0">
        <div class="add-amount-heading d-flex align-items-center text-align-center">
          {{ $t('preferences.payments.add_amount') }}
        </div>

        <b-row class="amount-list mx-0">
          <b-col
            v-for="(amount, index) in denominations"
            id="amount-list-button"
            :key="index"
            md="2"
            class="col-xs-4 mt-2"
            role="button"
            :class="{ selected: selectedDenomination.id === amount.id }"
            @click="selectAmount(amount)"
          >
            <div class="add-amount-item my-3 d-flex align-items-center justify-content-center">
              &dollar;{{ amount.val | formatPrice }}
            </div>
          </b-col>
        </b-row>

        <!-- Custom Input field -->
        <b-row class="custom-input">
           <ValidationProvider
              v-slot="{ errors }"
              :name="$t('watchlists.list_name')"
              :rules="{ price:true , min: 0, max: 2000 }"
            >
            <b-form-input
              id="custom-input-field"
              v-model="customAmount"
              type="number"
              :placeholder="$t('preferences.payments.custom_amount')"
              @input="handleAmountInput"
            />
            <span id="error-message">{{ errors[0] }}</span>

           </ValidationProvider>
        </b-row>
        <!-- Custom Input field -->

        <b-row class="amount-description d-flex w-100 justify-content-center">
          <div class="upto-amount px-0 d-flex align-items-center">
            {{ $t('preferences.payments.upto_limit', { limit: amountLimit }) }}
          </div>
          <div class="new-balance d-flex align-items-center">
            {{ $t('preferences.payments.new_balance') }}&colon; {{ newAmount | toCurrency('USD', 'N/A') }}
          </div>
        </b-row>
      </b-col>
      <!-- ./Add Amount -->
      <slot />
    </b-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { ValidationProvider } from 'vee-validate'
import PinVisibility from '~/components/profile/preferences/GiftCard/common/PinVisibility.vue'
import { PURCHASE_GIFTCARD_DENOMINATION } from '~/static/constants'
import screenSize from '~/plugins/mixins/screenSize'
export default {
  name: 'AddFundsComponent',

  components: {
    PinVisibility,
    ValidationProvider
  },

  mixins: [screenSize],

  props: {
    details: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      denominations: PURCHASE_GIFTCARD_DENOMINATION,
      customAmount: '',
      amountLimit: '2,000.00',
      selectedDenomination: {}
    }
  },

  computed: {
    ...mapGetters({
      amount: 'preferences/getSelectedAmount',
    }),
    imgName: (vm) => {
      return vm.details && vm.details.card.image_name
    },

    cardType: (vm) => {
      return vm.details && vm.details.card.card_type
    },

    cardNumber: (vm) => {
      return vm.details && vm.details.giftcard_number
    },

    cardPin: (vm) => {
      return vm.details && vm.details.pin
    },

    availableBalance: (vm) => {
      return vm.details && vm.details.remaining_amount
    },

    newAmount: (vm) => {
      return parseInt(vm.availableBalance) + parseInt(vm.amount)
    }
  },

  created() {
    // On load, select the first item.
    this.initializeDenomination()
  },

  methods: {
    ...mapActions({
      addAmount: 'preferences/addAmount'
    }),

    handleAmountInput(val){
      this.selectedDenomination = {}
      this.selectedAmount = val
      this.addAmount(val * 100)
    },

    initializeDenomination(){
      const firstValue = this.denominations[0]
      this.selectAmount(firstValue)
    },

    selectAmount(value){
      this.selectedDenomination = value
      this.selectedAmount = this.$options.filters.formatPrice(value.val)
      this.addAmount(value.val)
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.add-funds-component
  .add-funds-col
    .add-amount-section
      .amount-description
        margin-top: 14px
        .upto-amount
          font-family: $font-montserrat
          font-style: normal
          @include body-9-normal
          color: $color-gray-47
          width: 96px
          height: 15px
          margin-left: 42px
          margin-right: 56px
        .new-balance
          font-family: $font-montserrat
          font-style: normal
          @include body-9-normal
          color: $color-black-1
      .custom-input
        margin-left: 42px
        #error-message
          font-family: $font-montserrat
          font-style: normal
          @include body-9-medium
          color: $color-red-17
        #custom-input-field
          width: 174px
          height: 49px
          left: 42px
          top: 453px
          border: 1px solid $color-gray-3
          border-radius: 10px
          background: $color-white
          margin-top: 14px
          font-family: $font-montserrat
          font-style: normal
          @include body-9-medium
          color: $light-gray-2
      #amount-list-button
        width: 78px
        height: 49px
        border: 1px solid $color-gray-3
        border-radius: 10px
        &.selected
          border: 1.5px solid $color-black-1
        .add-amount-item
          margin-top: 10px
          font-family: $font-montserrat
          font-style: normal
          @include body-9-medium
          color: $color-black-4
      .add-amount-heading
        font-family: $font-montserrat
        font-style: normal
        @include body-21-medium
        color: $color-black-1
        margin-left: 16px
        margin-top: 20px
    .security-details::v-deep
      padding-top: 8px
      .pin
        margin-left: 16px
        #cardPin
          .text
            font-family: $font-montserrat
            font-style: normal
            @include body-9-medium
            color: $color-black-1
          .text-result
            font-family: $font-montserrat
            font-style: normal
            @include body-9-normal
            color: $color-blue-30
      .giftcard-code
        margin-left: 32px
        @media (max-width: 313px)
          margin-left: 6px
        #cardNumber
          .text
            font-family: $font-montserrat
            font-style: normal
            @include body-9-medium
            color: $color-black-1
          .text-result
            font-family: $font-montserrat
            font-style: normal
            @include body-9-normal
            color: $color-blue-30
          .eye-icon
            margin-left: 7px
    .available-balance
      font-family: $font-sp-pro
      font-style: normal
      @include body-34-normal
      letter-spacing: -0.02em
      color: $color-black-1
      margin-top: 19px
    .add-funds-wrapper
      margin-top: 19px
      width: 250px
      height: 158px
        
#amount-list-button
  &:not(:last-child)
    margin-right: 18px
  &:first-child
    margin-left: 42px
  @media (max-width: 325px)
    &:first-child
      margin-left: 30px
  @media (min-width: 301px) and (max-width: 325px)
    &:first-child
      margin-left: 24px
</style>