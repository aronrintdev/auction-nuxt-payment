<template>
  <MobileBottomSheet
    :max-height="'30%'"
    :open="isOpen"
    :headerStyle="{
      display: 'none !important'
    }"
    @closed="$emit('closed')"
    @opened="$emit('opened')"
  >
  <div class="d-flex flex-column">
    <div class="d-flex">
      <div 
        v-if="productType === 'combination'"
        class="col-2 d-flex justify-content-center"
      >
        <img 
          width="16"
          height="16"
          :src="require('assets/img/icons/draft-list-image.svg')"
        />
      </div>
      <div class="col">
        <div class="title">
          {{ product.product.name }}
        </div>
        <div class="sub-header">
          {{ product.product.colorway }} | 
          {{ $t('common.box_condition') }}: {{ product.packaging_condition.name }} |
          {{ $t('vendor_purchase.size') }}: {{ product.size.size }}
        </div>
      </div>
    </div>

    <div class="mt-2 d-flex flex-column">
      <div class="action" @click="editProduct()">
        {{ $t('common.edit_product') }}
      </div>
      <div class="action" @click="deleteProduct()">
        {{ $t('common.delete') }}
      </div>
      <div class="action" @click="$emit('closed')">
        {{ $t('common.cancel') }}
      </div>
    </div>
  </div>
  </MobileBottomSheet>
</template>

<script>
import MobileBottomSheet from '~/components/mobile/MobileBottomSheet'


export default {
  name: 'ActionsModal',

  components: {
    MobileBottomSheet,
  },

  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    product: {
      type: Object,
      default: () => {}
    },
    combinationId: {
      type: Number,
      default: null
    },
    productType: {
      type: String,
      defaut: 'combination'
    }
  },

  methods: {
    editProduct() {
      this.$emit('closed')
      if (this.productType === 'combination') {
        this.$root.$emit('edit', this.product)
      } else {
        this.$emit('editWant')
      }
    },

    deleteProduct() {
      if (this.productType === 'combination') {
        this.$root.$emit('delete', this.product.id, this.combinationId)
      } else {
        this.$emit('deleteWant')
      }
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.title
  @include body-17
  font-family: $font-family-sf-pro-display
  font-weight: $bold
  color: $color-black-1

.sub-header
  font-family: $font-family-sf-pro-display
  color: $color-gray-5
  font-weight: $normal
  font-size: $font-size-12

.action
  @include body-17
  display: flex
  align-items: center
  height: 54px
  border-top: 0.5px solid $color-gray-47
  font-family: $font-family-sf-pro-display
  font-weight: $normal
  color: $color-black-1
  padding-left: 20px

</style>