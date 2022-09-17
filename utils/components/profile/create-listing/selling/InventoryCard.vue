<template>
  <div class="inventory-card-wrapper">
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

        <div class="product-size position-absolute">
          {{ `${$tc('common.size', 1)} ${inventory.size.size}` }}
        </div>

        <b-checkbox
          v-if="inventoryStock > 0"
          class="check-box position-absolute"
          :checked="selected"
          @change="toggleSelect"
        ></b-checkbox>
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
        <div class="product-price text-truncate">
          {{ $t('common.price') }}: {{ inventory.sale_price | toCurrency }}
        </div>

        <div
          class="position-absolute"
          :class="[
            typeof inventoryStock === 'number'
              ? 'product-stock text-truncate'
              : 'product-outofstock',
          ]"
        >
          <span v-if="typeof inventoryStock === 'number'">&#10005;</span
          >{{ inventoryStock }}
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
  },

  data() {
    return {
      quantity: 0,
    }
  },
  computed: {
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    inventoryStock: (vm) => {
      Object.keys(vm.inventory.listing_items).forEach(key => {
        vm.quantity = vm.inventory.listing_items[key].inventory_stock
      });

      if(vm.quantity <= 0){
        return vm.$t('createlisting.out_of_stock')
      }
      return Number(vm.quantity)
    },
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
  max-width: 213px
  margin-left: auto
  margin-right: auto

  .product-info
    border: 1px solid $color-gray-23

    .product-image
      padding: 25px
      height: 200px
      background-color: $color-white-1

      .product-size
        @include body-5-regular
        color: $color-black-1
        top: 12px
        left: 13px
        border: 1px solid $color-gray-23
        border-radius: 2px
        width: 88px
        height: 20px
        display: flex
        align-items: center
        justify-content: center
        overflow: hidden

      .check-box
        right: 4px
        top: 10px

    .product-detail
      @include body-10-normal
      background-color: $color-gray-1
      padding: 5px 8px

      .product-title
        @include body-5-medium
        color: $color-black-1
        margin-bottom: 3px

      .product-color
        color: $color-gray-5
        margin-bottom: 3px

      .product-price
        color: $color-gray-39
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
</style>
