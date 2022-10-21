<template>
  <b-row>
    <b-col md="12">
      <AlternativePaymentTitle :product-price="lowestPrice" />

      <!-- Buy Now and Add to Wishlist Button Group -->
      <b-row class="mt-3">
        <b-col md="12" class="d-flex">
          <Button
            class="border-radius-right-0"
            variant="dark-blue"
            block
            @click="$emit('buy-now')"
          >{{ $t('products.buy_now') }}
          </Button>
          <Button
            variant="light"
            class="px-4 border-0 border-radius-left-0"
          >
            <template #default>
              <b-img width="18" :src="require('~/assets/img/product/heart-outline.svg')"></b-img>
            </template>
          </Button>
        </b-col>
      </b-row>
      <!-- Buy Now and Add to Cart and Add to Wishlist Button Group -->

      <Button class="my-3" block variant="dark" @click="$emit('add-to-cart')">{{ $t('products.add_to_cart') }}</Button>
    </b-col>
  </b-row>
</template>

<script>
import Button from '~/components/common/Button'
import AlternativePaymentTitle from '~/components/product/AlternativePaymentTitle'

export default {
  name: 'BuyNowSection',
  components: { Button, AlternativePaymentTitle},
  props: {
    lowestPrice: {
      type: Number,
      required: true,
      default: 0.00
    }
  }
}
</script>
