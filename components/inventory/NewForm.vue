<template>
  <div class="inventory-new-form-wrapper">
    <div class="d-flex justify-content-between align-items-center mt-3">
      <h2 class="title">{{ product.name }}</h2>

      <Button to="/profile/inventory" variant="link" class="btn-back">
        <img
          :src="require('~/assets/img/icons/arrow-back.svg')"
          :alt="$t('common.back')"
          class="mr-2"
        />
        {{ $t('inventory.back_to_inventory') }}
      </Button>
    </div>

    <div class="section-product-details">
      <div class="mt-2">{{ $t('common.sku') }}: {{ product.sku }}</div>
      <div class="mt-2">{{ $t('common.color') }}: {{ product.colorway }}</div>
    </div>

    <ProductThumb
      :product="product"
      overlay
      class="product-thumbnail mx-auto d-flex align-items-center overflow-hidden mt-3"
    />

    <div class="mt-2 mx-auto section-product-size">
      <div class="d-flex align-items-end">
        <div class="mr-2 form-item-title">{{ $tc('common.size', 1) }}*</div>
        <div class="form-item-desc">
          ({{ $t('inventory.suggested_value_displayed') }})
        </div>
      </div>

      <ProductSizePicker
        :value="value.sizeId"
        :sizes="sizes"
        :prices="pricesBySize"
        single-mode
        class="size-picker"
        @input="handleSizeChange"
      />
    </div>

    <div class="mt-4 mx-auto section-meter">
      <Meter
        :value="value.price ? Number(value.price) * 100 : null"
        :lowest="lowestListedPrice"
        :highest="highestOfferPrice"
        :fair="lastSoldPrice"
      />

      <div class="d-flex justify-content-between mt-4">
        <div class="text-left">
          <div class="field">{{ $t('products.highest_offer') }}</div>
          <div class="value">
            {{ highestOfferPrice | toCurrency('USD', 'N/A') }}
          </div>
        </div>
        <div class="text-center">
          <div class="field">
            {{ $t('sell.sell_now.last_sold') }}
          </div>
          <div class="value">
            {{ lastSoldPrice | toCurrency('USD', 'N/A') }}
          </div>
        </div>
        <div class="text-right">
          <div class="field">{{ $t('inventory.lowest_listed') }}</div>
          <div class="value">
            {{ lowestListedPrice | toCurrency('USD', 'N/A') }}
          </div>
        </div>
      </div>
    </div>

    <div class="mt-4 mx-auto section-form-fields d-flex justify-content-center">
      <div
        class="mr-5"
        :class="(value.quantity <= 0 || value.quantity > 50) && 'error'"
      >
        <FormInput
          :value="value.quantity"
          :placeholder="$t('inventory.enter_quantity')"
          :label="$t('common.quantity')"
          class="input-error"
          required
          integer
          @input="handleQuantityChange"
        />
        <div class="error-text mt-1">
          {{
            (0 >= value.quantity || value.quantity > 50) &&
            $t('inventory.message.between', {
              field: $t('common.quantity').toLowerCase(),
              min: 1,
              max: 50,
            })
          }}
        </div>
      </div>
      <div
        class="mr-5"
        :class="value.price !== null && value.price <= 50 && 'error'"
      >
        <FormInput
          :value="value.price"
          :placeholder="$t('inventory.enter_price')"
          :label="$t('inventory.your_price')"
          prefix="$"
          class="input-error"
          required
          number
          @input="handlePriceChange"
        />
        <div class="error-text mt-1">
          {{
            value.price > 50 ||
            $t('inventory.message.gt_than', {
              field: $t('common.price').toLowerCase(),
              amount: 50,
            })
          }}
        </div>
      </div>
      <FormDropdown
        id="packaging-conditions"
        :value="value.packagingConditionId"
        :placeholder="$t('inventory.select_condition')"
        :label="$t('common.box_condition')"
        :items="packagingConditions"
        required
        @input="handlePackagingConditionChange"
      />
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import { Button, Meter, FormInput, FormDropdown } from '~/components/common'
import ProductThumb from '~/components/product/Thumb'
import ProductSizePicker from '~/components/product/SizePicker'

export default {
  name: 'InventoryNewForm',

  components: {
    Button,
    ProductThumb,
    ProductSizePicker,
    Meter,
    FormInput,
    FormDropdown,
  },

  props: {
    product: {
      type: Object,
      required: true,
    },
    value: {
      type: Object,
      required: true,
    },
  },

  computed: {
    sizes() {
      return this.product?.sizes || []
    },

    pricesBySize() {
      return this.product?.lowest_prices?.filter((i) => {
        const items = this.product.lowest_prices.filter(
          (j) => j.packaging_condition_id === i.packaging_condition_id
        )
        const minItem = _.minBy(items, 'price')
        return i.size_id === minItem.size_id
      })
    },

    packagingConditions() {
      return (
        this.product?.packaging_conditions?.map((i) => {
          return { label: i.name, value: i.id }
        }) || []
      )
    },

    highestOfferPrice() {
      const offers = this.product?.highest_offers?.filter(
        (i) => i.size_id === this.value.sizeId
      )
      return _.maxBy(offers, 'price')?.price
    },

    lowestListedPrice() {
      const items = this.product?.lowest_prices?.filter(
        (i) => i.size_id === this.value.sizeId
      )
      return _.minBy(items, 'price')?.price
    },

    // todo
    lastSoldPrice() {
      return null
    },
  },

  methods: {
    handleSizeChange(value) {
      this.$emit('input', { ...this.value, sizeId: value })
    },

    handleQuantityChange(value) {
      this.$emit('input', { ...this.value, quantity: value })
    },

    handlePriceChange(value) {
      this.$emit('input', { ...this.value, price: value })
    },

    handlePackagingConditionChange(value) {
      this.$emit('input', { ...this.value, packagingConditionId: value })
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.inventory-new-form-wrapper
  h2.title
    @include heading-1
    font-family: Futura Md BT
    color: $color-black-1

  .btn-back
    @include body-4-regular
    color: $color-black-1

  .section-product-details
    @include body-3-normal
    color: $color-gray-5

  .product-thumbnail
    width: 323px
    height: 246px

  .form-item-title
    @include body-3-normal
    color: $color-black-1

  .form-item-desc
    @include body-5-regular
    color: $color-gray-5

  .section-product-size
    max-width: 570px

  .section-meter
    max-width: 390px

    .field
      @include body-4-medium
      color: $color-black-1

    .value
      @include body-4-regular
      color: $color-gray-5

  .section-form-fields
    >div
      width: 203px

    .error-text
      display: none

    .error
      .input-error::v-deep
        .form-input
          border-color: $color-red-3

      .error-text
        @include body-5-regular
        display: block
        color: $color-red-3
</style>
