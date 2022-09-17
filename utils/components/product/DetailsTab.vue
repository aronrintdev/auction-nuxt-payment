<template>
  <div class="details-wrapper">
    <div class="tab-menu">
      <Button
        variant="link"
        :class="{ active: currentTab === 'detail' }"
        @click="setTab('detail')"
        >{{ $t('products.product_details') }}</Button
      >
      <Button
        variant="link"
        :class="{ active: currentTab === 'size' }"
        @click="setTab('size')"
        >{{ $t('products.size_guide') }}</Button
      >
    </div>

    <div v-if="currentTab === 'detail'" class="tab-content mt-40">
      <div class="content-row">
        <div>{{ $t('common.sku') }}</div>
        <div>{{ product.sku }}</div>
      </div>

      <div class="content-row">
        <div>{{ $t('common.colorway') }}</div>
        <div>{{ product.colorway }}</div>
      </div>

      <div class="content-row">
        <div>{{ $t('common.retail_price') }}</div>
        <div>{{ product.retail_price | toCurrency }}</div>
      </div>

      <div class="content-row">
        <div>{{ $t('common.release_date') }}</div>
        <div>{{ product.release_year }}</div>
      </div>
    </div>

    <div v-if="currentTab === 'size'" class="tab-content">
      <div class="helper-text">
        {{ $t('products.scroll_to_view_more_sizes') }}
      </div>

      <ProductSizeGuideShoe
        v-if="
          product.size_type && SHOE_CATEGORIES.indexOf(product.size_type) > -1
        "
      />
    </div>
  </div>
</template>
<script>
import Button from '~/components/common/Button'
import ProductSizeGuideShoe from '~/components/product/size-guide/Shoe'

export default {
  name: 'ProductDetailsTab',

  components: {
    Button,
    ProductSizeGuideShoe,
  },

  props: {
    product: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      currentTab: 'detail',
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
    }
  },

  methods: {
    setTab(tab) {
      this.currentTab = tab
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.details-wrapper
  background-color: $color-blue-6
  padding: 20px 37px
  height: 100%

  .tab-menu
    .btn
      @include body-1-medium
      margin-right: 26px
      color: $color-gray-4

      &.active
        color: $color-black-1

  .tab-content
    margin-top: 9px

    &.mt-40
      margin-top: 40px

    .helper-text
      @include body-5-bold
      color: $color-gray-6
      margin-top: 20px

    .content-row
      padding: 17px 0
      display: flex
      justify-content: space-between

      &:not(:last-child)
        border-bottom: 1px solid $color-gray-5

      >div:first-child
        @include body-3-medium
        color: $color-gray-5
        margin-right: 20px

      >div:last-child
        @include body-3-regular
        color: $color-black-1
        word-break: break-word

@media (max-width: 576px)
  .details-wrapper
    padding: 20px
</style>
