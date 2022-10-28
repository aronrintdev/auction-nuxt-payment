<template>
  <div class="inventory-card-wrapper mx-auto">
    <div class="product-info">
      <div
        class="
          product-image
          d-flex
          align-items-center
          justify-content-center
          position-relative
        "
      >
        <ProductThumb :product="inventory.product" />
        <!-- Add icon -->
        <span v-if="showAddIcon" role="button" class="check-box position-absolute">
          <img v-if="!selectedItems.includes(inventory.id)"  :src="require('~/assets/img/icons/add-plus-icon.svg')" alt="add-icon" @click="$emit('select', {id: inventory.id, checked : true})">
          <img v-if="selectedItems.includes(inventory.id)" :src="require('~/assets/img/icons/minus-red-icon.svg')" alt="minus-icon" @click="$emit('select',{id: inventory.id, checked: false})">
        </span>
        <!-- Add icon -->
      </div>
      
      <div class="product-detail position-relative">
        <div class="product-title text-truncate">
          {{ inventory.product.name }}
        </div>
        <div class="product-color text-truncate">
          {{ inventory.product.colorway }}
        </div>
        <div class="product-color text-truncate mr-5">
          {{ inventory.packaging_condition.name }}
        </div>
        <div class="product-price text-truncate d-flex align-items-center">
          {{ $t('common.price') }}: {{ inventory.sale_price | toCurrency }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ProductThumb from '~/components/product/Thumb'
export default {
  name: 'InventoryCard',

  components: { ProductThumb },

  props: {
    inventory: {
      type: Object,
      required: true,
    },

    selected: {
      type: Boolean,
      default: false,
    },

    showAddIcon: {
      type: Boolean,
      default: false
    },

    selectedItems: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      quantity: 0,
      checked: false
    }
  },

  methods: {
    ...mapActions({
      deleteInventories: 'inventory/deleteInventories',
    }),
    // Check box on select
    toggleSelect(checked) {
      this.$emit('select', this.inventory.id, checked)
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.inventory-card-wrapper
  width: 164px
  height: 265px

  .product-info

    .product-image
      padding: 25px
      height: 200px
      background-color: $color-white-4

      .check-box
        right: 4px
        top: 2px

    .product-detail
      @include body-10-normal
      padding: 5px 8px

      .product-title
        font-family: $font-sp-pro
        font-style: normal
        @include body-10-medium
        color: $color-black-1
        margin-bottom: 3px

      .product-color
        font-family: $font-sp-pro
        font-style: normal
        @include body-10-medium
        color: $color-gray-5
        margin-bottom: 3px

      .product-price
        font-family: $font-sp-pro
        font-style: normal
        @include body-9-medium
        color: $color-black-1
        margin-top: 3px

      .product-stock
        @include body-4-normal
        background-color: $color-gray-4
        border-radius: 4px
        color: $color-white-1
        padding: 4px 5px
        bottom: 11px
        right: 8px
        max-width: 50px

      .product-outofstock
        padding: 2px 2px
        bottom: 1px
        right: 4px
        color: $color-white-1
        margin-bottom: 3px
        background-color: $color-gray-4
        border-radius: 4px

  .actions
    margin-top: 12px

    :deep(.btn-list)
      @include body-10-normal
      width: 82px
      height: 32px
      padding: 0
      border-color: $color-gray-4

    :deep(.btn-delete)
      width: 27px
      height: 32px
      padding: 0
      border-color: $color-gray-4

@media (max-width: 536px)
  .inventory-card-wrapper
    margin-bottom: 2.3rem

@media (min-width: 536px) and (max-width: 576px)
  .inventory-card-wrapper
    margin-bottom: 3rem

@media (min-width: 576px)
  .inventory-card-wrapper
    display: none
</style>
