<template>
  <b-row>
    <b-col md="12">
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
