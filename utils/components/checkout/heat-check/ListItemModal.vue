<template>
  <!-- List Item Modal -->
  <b-modal
    id="shopping-cart-list-item-modal"
    centered
    hide-footer
    hide-header
    content-class="radius-3"
    body-class="py-0"
  >
    <b-button
      class="float-right mt-3 mr-3"
      variant="img"
      @click="$bvModal.hide('shopping-cart-list-item-modal')"
    >
      <b-img :src="require('~/assets/img/shopping-cart/x-close.svg')"></b-img>
    </b-button>
    <b-row>
      <b-col md="4" class="text-center mt-5 py-4 mr-4">
        <b-img
          :src="require('~/assets/img/shopping-cart/product-thumbnail-1.png')"
          class="active mb-2"
        ></b-img>
        <b-img
          :src="require('~/assets/img/shopping-cart/product-thumbnail-2.png')"
          class="mb-2"
        ></b-img>
        <b-img
          :src="require('~/assets/img/shopping-cart/product-thumbnail-3.png')"
          class="mb-2"
        ></b-img>
        <b-img
          :src="require('~/assets/img/shopping-cart/product-thumbnail-4.png')"
        ></b-img>
      </b-col>
      <div class="vr"></div>
      <b-col md="7" class="pl-4">
        <b-row>
          <b-col md="12" class="text-center mt-5 py-4">
            <b-img
              :src="require('~/assets/img/shopping-cart/product-thumbnail.png')"
            ></b-img>
            <div class="body-4-bold mt-3 text-center">{{ product.name }}</div>
            <div class="body-4-normal text-gray-6 mt-2">
              {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{
                product.colorWay
              }}
            </div>
            <div class="body-4-bold mt-2">
              &dollar;{{ product.price | formatPrice }}
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row> </b-modal
  ><!-- End of List Item Modal -->
</template>

<script>
export default {
  name: 'ListItemModal',
  props: {
    product: {
      type: Object,
      default() {
        return {}
      },
    },
  },
}
</script>
