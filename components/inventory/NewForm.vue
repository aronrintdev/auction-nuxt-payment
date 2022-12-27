<template>
  <div class="row" :class="{'mobile-form' : isScreenXS}">
    <div class="mt-3" :class="[isScreenXS ? 'input-col-mobile pr-2' : 'input-col', colClass]">
      <FormInput :value="value.quantity"
                 :placeholder="$t('inventory.enter_quantity')"
                 :label="$t('common.quantity')"
                 :label-class="isScreenXS ? 'ml-0' : ''"
                 class="input"
                 :class="{'input-error': quantityChanged && (value.quantity <= 0 || value.quantity > 50)}"
                 required
                 :pill="false"
                 integer
                 @input="handleQuantityChange" />
      <div v-if="quantityChanged && (value.quantity <= 0 || value.quantity > 50)" class="error-text mt-1">
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
    <div class="mt-3" :class="[isScreenXS ? 'input-col-mobile d-flex justify-content-end' : 'input-col', colClass]">
      <FormInput
        :value="value.price"
        :placeholder="$t('inventory.enter_price')"
        :label="$t('inventory.your_price')"
        :label-class="isScreenXS ? 'ml-0' : ''"
        :pill="false"
        prefix="$"
        class="input"
        :class="{'input-error': isFormTouched && value.price !== null && value.price <= 50}"
        required
        number
        @input="handlePriceChange"
      />
      <div v-if="isFormTouched && value.price !== null && value.price <= 50" class="error-text mt-1">
        {{
          value.price > 50 ||
          $t('inventory.message.gt_than', {
            field: $t('common.price').toLowerCase(),
            amount: 50,
          })
        }}
      </div>
    </div>
    <template v-if="showButtons">
      <div v-if="!isEditForm"
           class="col-12" :class="isScreenXS ? 'input-col-mobile' : 'input-col mt-3'">
        <Button class="mt-3 w-100"
                variant="dark"
                :class="{'py-4' : !isScreenXS}"
                :disabled="!isFormValid"
                @click="$emit('submit')">{{ $t('inventory.add_inventory') }}</Button>
      </div>
      <template v-else>
        <div class="col-6 mt-3" :class="isScreenXS ? 'input-col-mobile' : 'input-col'">
          <Button class="mt-3 w-100"
                  variant="dark"
                  :class="{'py-4' : !isScreenXS}"
                  :disabled="!isFormValid || !isFormTouched"
                  @click="$emit('submit')">{{ $t('inventory.save_changes') }}</Button>
        </div>
        <div class="col-6 mt-3" :class="isScreenXS ? 'input-col-mobile' : 'input-col'">
          <Button class="mt-3 w-100"
                  variant="outline-dark"
                  :class="{'py-4' : !isScreenXS}"
                  @click="$emit('cancel')">{{ isFormTouched
            ? $t('inventory.discard_changes')
            : $t('common.cancel') }}</Button>
        </div>
      </template>
    </template>
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
      type: [Boolean, Number],
      default: false,
    },
    isFormTouched: {
      required: false,
      type: Boolean,
      default: false,
    },
    showButtons: {
      type: Boolean,
      default: true,
    },
    isEditForm: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  computed: {
    colClass() {
      if (this.isEditForm) {
        return this.isScreenXS ? 'col-6' : 'col-12'
      }
      return 'col-6'
    }
  },
  data() {
    return {
      quantityChanged: false,
    }
  },
  methods: {
    handleSizeChange(value) {
      this.$emit('input', { ...this.value, currentSize: value })
    },

    handleQuantityChange(value) {
      this.quantityChanged = true
      this.$emit('input', { ...this.value, quantity: value })
    },

    handlePriceChange(value) {
      this.$emit('input', { ...this.value, price: value })
    },
  }
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
    margin-left: 0px
    text-transform: uppercase
    margin-bottom: 16px
  .input
    .form-input
      border-radius: 4px
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
    margin-bottom: 7px
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
      border-radius: 10px
      max-width: 152px
      &::placeholder
        font-family: $font-montserrat
        font-style: normal
        @include body-9-medium
        color: $color-gray-23
  .error-text
    @include body-5-regular
    display: block
    color: $color-red-3

  button
    background: $color-black-1
    border-radius: 8px
    color: $color-white-1
    height: 40px

  .input-error
    .form-input
      border-color: $color-red-3

  .error-text
    @include body-5-regular
    display: block
    color: $color-red-3

.mobile-form
  max-width: 358px
  margin: auto
</style>
