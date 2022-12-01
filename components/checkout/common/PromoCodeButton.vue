<template>
  <b-row class="promo-btn-wrapper" role="button" @click="$emit('show-promo')">
    <b-col v-if="isResponsive" cols="12" sm="12" class="d-flex align-items-center px-0">
      <span class="body-5-regular text-gray-5">{{ $t('shopping_cart.have_promo_code') }}&quest;</span>
      <span class="body-12-regular text-gray-5 ml-auto">&plus;</span>
    </b-col>
    <b-col v-else md="12" class="d-flex align-items-center">
      <span class="body-12-regular text-gray-5">&plus;</span>
      <span class="body-5-regular text-gray-5 ml-2">{{ $t('shopping_cart.have_promo_code') }}&quest;</span>
    </b-col>
  </b-row>
</template>

<script>
import screenSize from '~/plugins/mixins/screenSize'

export default {
  name: 'PromoCodeButton',
  mixins: [ screenSize ],
  computed: {
    isResponsive(vm) {
      return vm.isScreenXS || vm.isScreenSM
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.promo-btn-wrapper
  font-family: $font-sp-pro
  padding: 0

  @media (max-width: 576px)
    border-bottom: 1px solid $color-gray-23b
    padding: 0 18px 20px
    margin: 20px 0 0
</style>
