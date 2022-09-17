<template>
  <div
    class="d-flex align-items-center justify-content-center flex-column h-100 promo-wrapper"
  >
    <div class="d-flex justify-content-between w-100 align-items-center">
      <div>
        <h4 class="m-0">{{ $t('products.have_pair_to_sell') }}</h4>
        <h5>{{ $t('products.list_what_you_have_with_us') }}</h5>
      </div>
      <div>
        <Button variant="dark btn-promo">{{ $t('common.list') }}</Button>
      </div>
    </div>

    <div class="d-flex justify-content-between w-100 mt-6 align-items-center">
      <div>
        <h4>{{ $t('products.join_affiliate_program') }}</h4>
        <h5>{{ $t('products.join_us_today') }}</h5>
      </div>
      <div>
        <Button variant="dark btn-promo">{{
          $t('shopping_cart.apply')
        }}</Button>
      </div>
    </div>
  </div>
</template>
<script>
import Button from '~/components/common/Button'
import {API_PROD_URL} from '~/static/constants/environments'

export default {
  name: 'ProductPromo',

  components: {
    Button,
  },

  props: {
    product: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      API_PROD_URL,
    }
  },

  methods: {},
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.promo-wrapper
  background-color: $color-blue-6
  padding: 95px 40px

  h4
    @include body-2-bold
    color: $color-black-1

  h5
    @include body-4-regular
    color: $color-black-1
    margin: 3px 0 0 0

  .mt-6
    margin-top: 60px

  .btn-promo
    width: 160px

@media (max-width: 576px)
  .promo-wrapper
    padding: 20px

    .mt-6
      margin-top: 40px

    > div
      flex-direction: column
      width: 100% !important
      align-items: flex-start !important

    .btn-promo
      margin-top: 10px
</style>
