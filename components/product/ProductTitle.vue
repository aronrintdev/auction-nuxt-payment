<template>
  <div class="container">
    <div class="d-flex align-items-start">
      <div>
        <b-img
          :src="`${API_PROD_URL}/${category}/${sku}/brand`"
          width="60"
          height="60"
          :alt="productName"
          class="brand-image"
        />
      </div>
      <div class="flex-grow-1">
        <h2 class="title">{{ productName }}</h2>

        <!-- Keep below code for revert change -->
        <!-- <p class="color">{{ productColor }}</p> -->

        <div v-if="productPrice" class="price">
          <div class="total">{{ productPrice | toCurrency }}&nbsp;</div>
          <div class="affirm-payment">
            {{ $t('common.or') }}
            {{
              $t('products.4_payments', {
                price: $root.$options.filters.toCurrency(
                  Math.ceil(productPrice / 4)
                ),
              })
            }}
          </div>
        </div>
      </div>
    </div>
    <!-- Keep below code for revert change -->
    <!-- <div>
      <p v-if="authentic" class="certificate">
        <b-img
          :src="require('~/assets/img/icons/authentic.svg')"
          width="16"
          height="16"
          :alt="$t('products.certified_authentic')"
        />
        {{ $t('products.certified_authentic') }}
      </p>
    </div> -->
  </div>
</template>
<script>
import { API_PROD_URL } from '~/static/constants/environments'
export default {
  name: 'ProductBreadcrumb',

  props: {
    category: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productColor: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      default: null,
    },
    authentic: {
      type: Boolean,
      default: true,
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

.container
  .brand-image
    margin-right: 4px
    margin-left: 13px

  .title
    @include heading-2
    color: $color-black-1
    margin: 0
    word-break: break-all

  .color
    @include body-7-normal
    color: $color-gray-5
    margin: 0

  .price
    display: flex
    align-items: baseline

    .total
      @include body-1-medium
      color: $color-blue-20

    .affirm-payment
      @include body-2-regular
      color: $color-orange-11

  .certificate
    @include body-8-medium
    color: $color-black-1
    display: flex
    align-items: center
    margin: 5px 0 0 72px

    >img
      margin-right: 5px

@media (max-width: 520px)
  .container
    .price
      flex-direction: column
</style>
