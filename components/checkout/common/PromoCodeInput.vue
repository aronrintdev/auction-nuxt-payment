<template>
  <b-row class="promo-wrapper">
    <b-col cols="12" sm="12" md="12">
      <slot name="label"></slot>
      <b-input-group>
        <b-form-input
          id="promo-input"
          v-model="inputPromoCode"
          class="custom-form-element"
          :placeholder="$t('shopping_cart.enter_your_code')"
        />
        <b-button
          id="btn-promo"
          type="button"
          :disabled="! inputPromoCode"
          variant="dark"
          @click="$emit('click', inputPromoCode)"
        >
          {{ $t('shopping_cart.apply') }}
        </b-button>
      </b-input-group>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'PromoCodeInput',
  data() {
    return {
      inputPromoCode: '',
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.promo-wrapper
  font-family: $font-sp-pro

  @media (max-width: 576px)
    border-bottom: 1px solid $color-gray-23b
    padding: 0 18px 24px
    margin: 20px 0 0

#btn-promo
  @media (max-width: 576px)
    opacity: 1
    @include body-13-medium

#promo-input
  @media (max-width: 576px)
    background: $color-white-5
    border-radius: 4px

    @include body-5-regular

    @at-root div
      padding: 0
</style>
