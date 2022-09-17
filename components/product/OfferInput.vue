<template>
  <div>
    <div class="container">
      <div>{{ $t('products.make_an_offer') }}</div>
      <div class="input-wrapper">
        $
        <b-form-input
          v-model="price"
          placeholder=""
          class="offer-input"
          type="number"
          :min="minAmount"
        ></b-form-input>
        <b-button class="submit-offer-btn" @click="handleSubmitClick">
          <img
            :src="require('~/assets/img/icons/product/arrow-right-white.svg')"
          />
        </b-button>
      </div>
    </div>

    <div :class="{ 'info-text': true, 'error-text': minAmountError }">
      {{
        $t('products.enter_or_more', {
          amount: $options.filters.toCurrency(minAmount),
        })
      }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProductOfferInput',

  props: {
    minAmount: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      price: 0,
      minAmountError: false,
    }
  },

  methods: {
    handleSubmitClick() {
      if (this.price * 100 < this.minAmount) {
        this.minAmountError = true
      } else {
        this.$emit('submit', this.price)
        this.minAmountError = false
      }
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.container
  @include body-8-medium
  color: $color-black-1
  border: 3px solid $color-orange-11
  border-radius: 4px
  height: 38px
  width: 408px
  max-width: 100%
  padding: 0px 30px
  display: flex
  align-items: center
  justify-content: space-between

  .input-wrapper
    display: flex
    align-items: center
    margin-right: -15px

    .offer-input
      @include body-8-medium
      border-bottom: 1px solid $color-black-1
      border-radius: 0px
      width: 80px
      background-color: $color-white-1
      padding: 0
      height: auto
      margin-right: 10px

    .submit-offer-btn
      width: 24px
      height: 24px
      background-color: $color-orange-1
      border-radius: 24px
      border: none !important
      padding: 0
      margin: 0

      img
        width: 16px

.info-text
  font-size: 12px
  line-height: 15px
  color: $color-gray-5
  margin-top: 5px
  width: 100%
  text-align: right

  &.error-text
    color: $color-red-3
</style>
