<template>
  <div class="">
    <b-row class="d-none d-sm-block h-100">
      <b-col md="12">
        <b-tabs content-class="mt-3" nav-class="pb-2 px-3">
          <b-tab title-link-class="body-2-bold border-0 pl-0" :title="$t('products.product_details')">
            <b-row>
              <b-col md="6">
                <b-row class="px-3 mt-3">
                  <b-col md="4" class="body-24-normal text-black">
                    <div class="label">{{ $t('common.sku') }}&colon;</div>
                    <div class="label">{{ $t('common.colorway') }}&colon;</div>
                    <div class="label">{{ $t('common.retail_price') }}&colon;</div>
                    <div class="label">{{ $t('common.release_date') }}&colon;</div>
                  </b-col>
                  <b-col md="8" class="body-24-normal text-color-gray-5">
                    <div>{{ product.sku }}</div>
                    <div>{{ product.colorway }}</div>
                    <div>{{ product.retail_price | toCurrency }}</div>
                    <div>{{ product.release_year }}</div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col md="6" class="mt-3">
                <div class="label border-0">{{ $t('products.description') }}&colon;</div>
                <span class="mt-2 body-24-normal text-color-gray-5">{{ productDescriptionText }}</span>
                <Button variant="link" @click="isFullTextShown = !isFullTextShown">
                  <span class="label mb-1">{{ isFullTextShown ? $t('products.read_less') : $t('products.read_more') }}</span>
                </Button>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title-link-class="body-2-bold border-0 pl-5" :title="$t('products.size_guide')">
            <ProductSizeGuideShoe
              v-if="product.size_type && SHOE_CATEGORIES.indexOf(product.size_type) > -1"
              :selected-size="selectedSize"
            />
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>

    <div class="d-sm-none px-3 d-flex flex-column">
      <div 
        class="field"
        @click="isDetailsModalOpen = true"
      >
        <div>{{ $t('products.product_details') }}</div>
        <i class="fa fa-2x fa-angle-down icon"></i>
      </div>

      <div 
        class="mt-3 field"
        @click="isSizeModalOpen = true"
      >
        <div>{{ $t('products.size_guide') }}</div>
        <i class="fa fa-2x fa-angle-down icon"></i>
      </div>
    </div>

    <DetailsModal
      :isOpen="isDetailsModalOpen"
      :product="product"
      @closed="isDetailsModalOpen = false"
    />

    <SizeGuideModal
      :isOpen="isSizeModalOpen"
      :product="product"
      :selectedSize="selectedSize"
      @closed="isSizeModalOpen = false"
    />

  </div>
</template>

<script>
import ProductSizeGuideShoe from '~/components/product/size-guide/Shoe'
import Button from '~/components/common/Button'
import DetailsModal from '~/components/product/DetailsModal'
import SizeGuideModal from '~/components/product/size-guide/SizeGuideModal'

export default {
  name: 'ProductDetailsTab',
  components: {
    ProductSizeGuideShoe,
    Button,
    DetailsModal,
    SizeGuideModal
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
    selectedSize: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data() {
    return {
      SHOE_CATEGORIES: [
        'men',
        'women',
        'child',
        'infant',
        'preschool',
        'toddler',
        'unisex',
        'youth',
      ],
      // TODO: NP - Product description dummy content
      productDescription: 'Lorem ipsum dolor sit amet, ' +
        'consectetur adipisicing elit. Amet, distinctio dolorem dolores dolorum ipsam iste iusto laboriosam minus non ' +
        'officia perferendis, praesentium, rerum unde vel veniam? Deserunt eligendi fuga voluptatem!',
      isFullTextShown: false,
      isDetailsModalOpen: false,
      isSizeModalOpen: false
    }
  },
  computed: {
    productDescriptionText(vm) {
      if (vm.isFullTextShown) {
        return this.productDescription
      }

      return this.productDescription.slice(0, 128) + '...'
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.icon
  color: $color-blue-2
  width: 16px
  hegith: 18px

.field
  padding-left: 20px
  padding-right: 20px
  height: 56px
  border-radius: 8px
  display: flex
  align-items: center
  justify-content: space-between
  box-shadow: 0px -0.1px 2px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.25)
  color: #000
  font-weight: 600
  font-size: 14px

.label
  font-family: $font-family-sf-pro-display
  font-weight: 500
  font-size: 18px
  color: #000

::v-deep
  .nav-tabs
    border-bottom: 0.5px solid $color-gray-23 !important

/* Overriding admin-lite theme styles */
::v-deep
  .nav-link
    color: $color-gray-47
    font-family: $font-family-sf-pro-display
    &:hover
      color: $color-gray-5
    &.active
      color: #000
      &:hover
        color: $black-1

.text-color-gray-5
  color: $color-gray-5
</style>
