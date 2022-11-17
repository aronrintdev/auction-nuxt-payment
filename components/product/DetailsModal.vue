<template>
  <MobileBottomSheet
    :height="'35%'"
    :open="isOpen"
    :headerStyle="{ display: 'none !important' }"
    @closed="$emit('closed')"
  >
    <div class="font-sf-pro">
      <div class="header">
        <div>{{ $t('products.product_details') }}</div>
      </div>
      <div class="mt-4 d-flex flex-column">
        <div class="px-3 d-flex justify-content-between">
          <div class="label">{{ $t('common.sku') }}:</div>
          <div class="value">{{ product.sku }}</div>
        </div>

        <div class="mt-3 px-3 d-flex justify-content-between">
          <div class="label">{{ $t('common.colorway') }}:</div>
          <div class="value">{{ product.colorway }}</div>
        </div>

        <div class="mt-3 px-3 d-flex justify-content-between">
          <div class="label">{{ $t('common.retail_price') }}:</div>
          <div class="value">{{ product.retail_price }}$</div>
        </div>

        <div class="mt-3 px-3 d-flex justify-content-between">
          <div class="label">{{ $t('common.release_date') }}:</div>
          <div class="value">{{ product.release_year }}</div>
        </div>
      </div>
    </div>
  </MobileBottomSheet>
</template>

<script>
import MobileBottomSheet from '~/components/mobile/MobileBottomSheet'

export default {
  name: 'DetailsModal',

  components: {
    MobileBottomSheet
  },

  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    product: {
      type: Object,
      required: true
    }
  },
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.font-sf-pro
  font-family: $font-family-sf-pro-display

.label
  @include body-5-medium
  color: $color-gray-5

.value
  @include body-5-regular
  color: $color-black-1

.header
  @include body-17-bold
  color: $color-black-1
  text-align: center
  border-bottom: 0.5px solid $color-gray-47
  padding-bottom: 17px

</style>