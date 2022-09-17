<template>
  <b-col md="9" class="py-5 px-5">
    <b-row>
      <b-col md="12">
        <div class="heading-1-bold">{{ $t('heatcheck.checkout.heading') }}</div>
      </b-col>
      <b-col md="12">
        <p>{{ $t('heatcheck.checkout.tag_line') }}</p>
      </b-col>
    </b-row>
    <hr class="mb-3" />
    <b-row class="mt-4">
      <b-col md="10">{{ $t('heatcheck.checkout.item_name') }}</b-col>
      <b-col md="2">{{ $t('heatcheck.checkout.price') }}</b-col>
    </b-row>
    <div v-for="product in shoppingCart" :key="product.id">
      <b-row class="mt-4">
        <b-col md="2">
          <b-img
            class="custom-thumbnail"
            :src="product.image"
            :alt="$t('shopping_cart.product_image')"
          ></b-img>
        </b-col>
        <b-col md="8">
          <b-row class="mb-2 d-block">
            <div class="body-4-bold mb-2">{{ product.name }}</div>
            <div class="body-4-normal mb-2 text-gray-6 text-uppercase">
              {{ $t('shopping_cart.sku') }}&colon;&nbsp;{{ product.sku }}
            </div>
            <div class="body-4-normal mb-2 text-gray-6">
              {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{
                product.colorWay
              }}
            </div>
            <div class="mt-3 text-gray-6">
              <p class="draftSave" role="button">
                {{ $t('heatcheck.checkout.save_as_draft') }}
              </p>
            </div>
          </b-row>
        </b-col>
        <b-col md="2">
          <p class="body-4-bold">${{ product.price }}</p>
        </b-col>
      </b-row>
    </div>
  </b-col>
</template>

<script>
export default {
  props: {
    shoppingCart: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
}
</script>
<style scoped>
.draftSave {
  cursor: pointer;
  width: fit-content;
}
</style>
