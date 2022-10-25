<template>
  <MobileBottomSheet
    :max-height="'30%'"
    :open="isOpen"
    @closed="$emit('closed')"
    @opened="$emit('opened')"
    :headerStyle="{
      display: 'none !important'
    }"
  >
  <div class="d-flex flex-column">
    <div class="d-flex">
      <div class="col-2 d-flex justify-content-center">
        <img 
          width="16"
          height="16"
          :src="require('assets/img/icons/draft-list-image.svg')"
        />
      </div>
      <div class="col-10">
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
      
      <div class="action" @click="$emit('closed'); $root.$emit('edit', product)">
        {{ $t('common.edit_product') }}
      </div>
      <div class="action" @click="$root.$emit('delete', product.id, combinationId)">
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
/* eslint-disable vue/no-unused-components */
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
    }
  },

  data() {
    console.log('PRODUCT', this.product, this.combinationId);
    return {
      
    };
  },

  computed: {
    
  },
  
  mounted() {
  },

  methods: {
    
    
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.title
  font-family: $font-family-sf-pro-display
  font-weight: 700
  font-size: 17px
  color: #000

.sub-header
  font-family: $font-family-sf-pro-display
  color: $color-gray-5
  font-weight: 500
  font-size: 12px

.action
  display: flex
  align-items: center
  height: 54px
  border-top: 0.5px solid $color-gray-47
  font-family: $font-family-sf-pro-display
  font-weight: 500
  color: #000
  font-size: 17px
  padding-left: 20px

</style>