<template>
  <div class="row">
    <div class="col-6 col-md-6 mt-3" :class="isScreenXS ? 'input-col-mobile pr-4' : 'input-col'">
      <FormInput :value="value.quantity"
                 :placeholder="$t('inventory.enter_quantity')"
                 :label="$t('common.quantity')"
                 :label-class="isScreenXS ? 'ml-0 mb-2' : ''"
                 class="input"
                 :class="{'input-error': value.price !== null && (value.quantity <= 0 || value.quantity > 50)}"
                 required
                 integer
                 @input="handleQuantityChange" />
      <div v-if="value.price !== null && (value.quantity <= 0 || value.quantity > 50)" class="error-text mt-1">
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
    <div class="col-6 col-md-6 mt-3" :class="isScreenXS ? 'input-col-mobile pl-4' : 'input-col'">
      <FormInput
        :value="value.price"
        :placeholder="$t('inventory.enter_price')"
        :label="$t('inventory.your_price')"
        :label-class="isScreenXS ? 'ml-0 mb-2' : ''"
        prefix="$"
        class="input"
        :class="{'input-error': value.price !== null && value.price <= 50}"
        required
        number
        @input="handlePriceChange"
      />
      <div v-if="value.price !== null && value.price <= 50" class="error-text mt-1">
        {{
          value.price > 50 ||
          $t('inventory.message.gt_than', {
            field: $t('common.price').toLowerCase(),
            amount: 50,
          })
        }}
      </div>
    </div>
    <div class="col-12 mt-3" :class="isScreenXS ? 'input-col-mobile' : 'input-col'" v-if="showAddButton">
      <Button class="mt-3 w-100"
              variant="dark"
              :class="{'py-4' : !isScreenXS}"
              :disabled="!isFormValid"
              @click="$emit('submit')">{{ $t('inventory.add_inventory') }}</Button>
    </div>
  </div>
</template>
<script>

import { Button, FormInput, } from '~/components/common'
import screenSize from '~/plugins/mixins/screenSize'

export default {
  name: 'InventoryNewForm',
  components: {
    FormInput,
    Button
  },
  mixins: [screenSize],
  props: {
    value: {
      type: Object,
      required: true,
    },
    isFormValid: {
      type: Boolean,
      default: false,
    },
    showAddButton: {
      type: Boolean,
      default: true,
    }
  },
  methods: {
    handleSizeChange(value) {
      this.$emit('input', { ...this.value, currentSize: value })
    },

    handleQuantityChange(value) {
      this.$emit('input', { ...this.value, quantity: value })
    },

    handlePriceChange(value) {
      this.$emit('input', { ...this.value, price: value })
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.input-col::v-deep
  .input-label
    font-family: $font-montserrat
    font-style: normal
    @include body-8-normal
    color: $color-black-1
    margin-left: 0px!important
    text-transform: uppercase
    margin-bottom: 16px
  .input
    .form-input
      border-radius: 4px!important
      height: 40px
      left: 16px
      border: 1px solid $color-blue-20
      &::placeholder
        font-family: $font-montserrat
        font-style: normal
        @include body-8-normal
        font-weight: normal
        color: $color-gray-23
  .error-text
    @include body-5-regular
    display: block
    color: $color-red-3

  .button
    background: $color-black-1
    border-radius: 20px
    color: $color-white-1

  .input-error
    .form-input
      border-color: $color-red-3

  .error-text
    @include body-5-regular
    display: block
    color: $color-red-3

.input-col-mobile::v-deep
  .input-label
    margin-bottom: 3px
    font-family: $font-montserrat
    font-style: normal
    @include body-9-medium
    color: $color-black-1
  .input
    .form-input
      height: 49px
      left: 16px
      top: 804px
      border: 1px solid $white-5
      border-radius: 10px!important
      &::placeholder
        font-family: $font-montserrat
        font-style: normal
        @include body-9-medium
        color: $color-gray-23
  .error-text
    @include body-5-regular
    display: block
    color: $color-red-3

  .button
    background: $color-black-1
    border-radius: 20px
    color: $color-white-1

  .input-error
    .form-input
      border-color: $color-red-3

  .error-text
    @include body-5-regular
    display: block
    color: $color-red-3
</style>
