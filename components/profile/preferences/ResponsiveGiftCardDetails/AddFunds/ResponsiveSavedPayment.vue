<template>
  <b-row class="responsive-saved-payment">
    <div class="d-flex">
      <div class="input-radio h-100 mt-3">
        <div class="form-check ">
          <input
            id="input-radio"
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            :value="payment.id"
            @change="selectOption"
          />
        </div>
      </div>

      <div class="card-brand h-100 d-flex">
        <img :src="cardBrand" alt="card-logo" class="my-auto img-fluid" />
      </div>

      <div class="ending-in h-100 d-flex">
        <span class="ending-in-text my-auto">{{ $t('shopping_cart.ending_in') }}&colon; {{ payment.card_last_digits }}</span>
      </div>

      <div class="expire-in h-100 d-flex">
        <span class="ending-in-text my-auto">{{ $t('shopping_cart.exp') }}&colon; {{ payment.card_expiry_date | formatDate('mm/yy')}}</span>
      </div>
      <div v-if="payment.is_default" class="default-status h-100 d-flex">
        <span v-if="payment.is_default" class="default-text my-auto d-flex align-items-center">{{ $t('preferences.common.default') }}</span>
      </div>
    </div>
  </b-row>
</template>

<script>
export default {
  name: 'ResponsiveSavedPayment',

  props: {
    payment: {
      type: Object,
      default: () => {},
    },
    value: {
      type: String,
      default: ''
    }
  },

  computed: {
    cardBrand: (vm) => {
      try {
        return require(`~/assets/img/shopping-cart/${vm.payment.card_brand}-logo.png`)
      } catch (error) {
        return require('~/assets/img/shopping-cart/visa-logo.png')
      }
    },
  },

  methods: {
    selectOption(){
      this.$emit('selected', this.payment)
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.responsive-saved-payment
  height: 57px
  background: $color-white-5
  border-radius: 4px
  @media only screen and (max-width: 375px)
    max-width: 343px
  .input-radio
    margin-left: 12px
  .card-brand
    margin-left: 20px
    width: 43px
    height: 13px
  .ending-in
    font-family: $font-sf-pro-text
    font-style: normal
    @include body-1214-normal
    color: $color-black-1
    margin-left: 16px
    width: 89px
    height: 14px
  .expire-in
    font-family: $font-sf-pro-text
    font-style: normal
    @include body-1214-normal
    color: $color-black-1
    margin-left: 12px
    width: 65px
    height: 17px
  .default-status
    margin-left: 12px
    width: 47px
    height: 15px
    .default-text
      font-family: $font-montserrat
      font-style: normal
      @include body-9-medium
      color: $color-green-2
@media only screen and (max-width: 367px)
  .responsive-saved-payment
    .card-brand,
    .default-status
      margin-left: 0
    .ending-in
      margin-left: 9px
    .expire-in
      margin-left: 5px
</style>