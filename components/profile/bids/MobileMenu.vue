<template>
  <ul class="list-group">
    <li class="d-flex align-items-center px-3 pb-3 border-bottom">
      <ProductThumb :product="inventory.product" class="w-25" />
      <div class="flex-1 d-flex flex-column px-3">
        <div class="text-black body-3-medium">
          {{ inventory.product.name }}
        </div>
        <div class="text-gray-6 body-6-medium mt-1">
          {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{
            inventory.product.colorway
          }}, {{ $t('shopping_cart.size') }}&colon;&nbsp;{{
            inventory.size.size
          }} | {{ $t('products.box_condition') }}&colon;&nbsp;{{ inventory.packaging_condition.name }}
        </div>
      </div>
    </li>
    <li class="border-bottom">
      <a @click="$emit('edit')"
         class="p-3 d-inline-block text-black body-3-normal d-flex justify-content-between">
        <span>{{ isExpiredOrDelisted ? $t('bids.view') : $t('bids.edit_bid') }}</span>
        <img src="~/assets/img/icons/arrow-right-black.svg" class="pl-3"/>
      </a>
    </li>
    <li class="border-bottom">
      <a @click="$emit('viewSimilar')" class="p-3 d-inline-block text-black body-3-normal d-flex justify-content-between">
        <span>{{ $t('bids.view_similar') }}</span>
        <img src="~/assets/img/icons/arrow-right-black.svg" class="pl-3"/>
      </a>
    </li>
    <li>
      <a @click="$emit('close')" class="p-3 d-inline-block text-black body-3-normal d-flex justify-content-between">
        <span>{{ $t('create_listing.confirm.cancel') }}</span>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'MobileMenu',
  props: {
    inventory: {
      type: Object,
      required: true
    },
    isExpiredOrDelisted: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
