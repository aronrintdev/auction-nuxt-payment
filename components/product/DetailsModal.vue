<template>
  <MobileBottomSheet
    :height="'35%'"
    :open="isOpen"
    @closed="$emit('closed')"
    :headerStyle="{ display: 'none !important' }"
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

  data() {
    console.log('product1', this.product);
    return {
    };
  },

  computed: {
  },

  mounted() {
    console.log('product1', this.product);
  },

  methods: {
    
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.font-sf-pro
  font-family: $font-family-sf-pro-display


.label
  font-weight: 600
  font-size: 14px
  color: $color-gray-5

.value
  font-weight: 400
  font-size: 14px
  color: #000

.header
  font-size: 17px
  font-weight: 700
  color: #000
  text-align: center
  border-bottom: 0.5px solid $color-gray-47
  padding-bottom: 17px

</style>