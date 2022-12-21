<template>
  <div>
    <b-row class="d-none d-sm-block h-100">
      <b-col md="12">
        <b-tabs content-class="mt-3" nav-class="pb-2 px-3">
          <b-tab
            title-link-class="body-2-bold border-0 p-0 w-160"
            :title="$t('products.product_details')"
          >
            <b-row>
              <div class="details-text-wrapper d-flex flex-column">
                <div class="body-24-normal text-black">
                  {{ $t('common.sku') }}:
                </div>
                <div class="body-24-normal text-black">
                  {{ $t('common.colorway') }}:
                </div>
                <div class="body-24-normal text-black">
                  {{ $t('common.retail_price') }}:
                </div>
                <div class="body-24-normal text-black">
                  {{ $t('common.release_date') }}:
                </div>
              </div>
              <div class="d-flex flex-column">
                <div class="body-24-normal text-color-gray-5">
                  {{ product.sku }}
                </div>
                <div class="body-24-normal text-color-gray-5">
                  {{ product.colorway }}
                </div>
                <div class="body-24-normal text-color-gray-5">
                  {{ product.retail_price | toCurrency }}
                </div>
                <div class="body-24-normal text-color-gray-5">
                  {{ product.release_year }}
                </div>
              </div>
            </b-row>
          </b-tab>
          <b-tab
            v-if="hasSize"
            title-link-class="body-2-bold border-0 p-0 w-160 text-center"
            :title="$t('products.size_guide')"
          >
            <ProductSizeGuideShoe
              v-if="isCategorySneakers"
              :selected-size="selectedSize"
            />
            <ProductSizeGuideApparel
              v-else-if="isCategoryApparel"
              :selected-size="selectedSize"
            />
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>

    <div class="d-sm-none d-flex flex-column">
      <div class="field" @click="isDetailsModalOpen = true">
        <div class="font-primary">{{ $t('products.product_details') }}</div>
        <Icon
          src="arrow-down-gray2.svg"
          width="25"
          height="25"
          class="btn-clear"
        />
      </div>

      <div class="mt-3 field" @click="isSizeModalOpen = true">
        <div class="font-primary">{{ $t('products.size_guide') }}</div>
        <Icon
          src="arrow-down-gray2.svg"
          width="25"
          height="25"
          class="btn-clear"
        />
      </div>
    </div>

    <DetailsModal
      :isOpen="isDetailsModalOpen"
      :product="product"
      @closed="isDetailsModalOpen = false"
    />

    <SizeGuideModal
      v-if="isCategorySneakers"
      :isOpen="isSizeModalOpen"
      :product="product"
      :selectedSize="selectedSize"
      @closed="isSizeModalOpen = false"
    />

    <ApparelSizeGuideModal
      v-else-if="isCategoryApparel"
      :isOpen="isSizeModalOpen"
      :product="product"
      :selectedSize="selectedSize"
      @closed="isSizeModalOpen = false"
    />
  </div>
</template>

<script>
import ProductSizeGuideShoe from '~/components/product/size-guide/Shoe'
import ProductSizeGuideApparel from '~/components/product/size-guide/Apparel'
import DetailsModal from '~/components/product/DetailsModal'
import SizeGuideModal from '~/components/product/size-guide/SizeGuideModal'
import ApparelSizeGuideModal from '~/components/product/size-guide/ApparelSizeGuideModal'
import { CATEGORY_SNEAKERS, CATEGORY_APPAREL } from '~/static/constants'
import { Icon } from '~/components/common'

export default {
  name: 'ProductDetailsTab',
  components: {
    ApparelSizeGuideModal,
    ProductSizeGuideShoe,
    ProductSizeGuideApparel,
    DetailsModal,
    SizeGuideModal,
    Icon,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
    selectedSize: {
      type: Object,
      required: false,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      // TODO: NP - Product description dummy content
      productDescription:
        'Lorem ipsum dolor sit amet, ' +
        'consectetur adipisicing elit. Amet, distinctio dolorem dolores dolorum ipsam iste iusto laboriosam minus non ' +
        'officia perferendis, praesentium, rerum unde vel veniam? Deserunt eligendi fuga voluptatem!',
      isFullTextShown: false,
      isDetailsModalOpen: false,
      isSizeModalOpen: false,
    }
  },
  computed: {
    isCategorySneakers(vm) {
      return vm.product.category.name === CATEGORY_SNEAKERS
    },
    isCategoryApparel(vm) {
      return vm.product.category.name === CATEGORY_APPAREL
    },
    productDescriptionText(vm) {
      if (vm.isFullTextShown) {
        return this.productDescription
      }

      return this.productDescription.slice(0, 128) + '...'
    },
    hasSize(vm) {
      return vm.isCategorySneakers || vm.isCategoryApparel
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

*:not(.font-primary)
  font-family: 'SF Pro Display', serif

.details-text-wrapper
  margin-left: 24px
  padding-right: 85px

.icon
  color: $color-blue-2
  width: 16px
  height: 18px

.field
  @include body-5-medium
  padding-left: 20px
  padding-right: 20px
  height: 56px
  border-radius: 8px
  display: flex
  align-items: center
  justify-content: space-between
  box-shadow: 0px -0.1px 2px $color-black-rgb2, 0px 1px 2px $color-black-rgb2
  color: $color-black-1

.label
  @include body-3-normal
  font-family: $font-family-sf-pro-display
  color: $color-black-1

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
      color: $color-black-1
      &:hover
        color: $black-1

.text-color-gray-5
  color: $color-gray-5
</style>
