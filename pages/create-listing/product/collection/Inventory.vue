<template>
  <b-container v-if="activeInventoryProduct" fluid class="container-product-auction h-100">
    <!-- Back to search -->
    <div class="d-none d-md-flex align-items-center justify-content-between">
      <NuxtLink to="/create-listing/search/inventory">
        <LeftArrowSvg class="back-arrow" />
        <span class="body-5-normal back-to-search-btn">{{ $t('create_listing.product.back_to_search') }}</span>
      </NuxtLink>
      <FormStepper :steps="steps" :selected="getCollectionState"/>
    </div>
    <b-row class="mt-4 d-none d-md-flex">
      <b-col md="8">
        <div class="heading-1-bold">{{ activeInventoryProduct.name }}</div>
        <div class="body-3-regular mt-1 text-capitalize">{{ $t('sell.confirm_listing.sku') }}: {{ activeInventoryProduct.sku }}</div>
        <div class="body-3-regular mt-1 text-capitalize">{{ $t('common.colorway') }}: {{ activeInventoryProduct.colorway }}</div>
      </b-col>
    </b-row>
    <div class="d-flex d-md-none align-items-center justify-content-center color-sku-section">
      <div class="w-50 text-center">
        <div class="label mb-1">{{ $t('sell.confirm_listing.sku') }}</div>
        <div class="value">{{ activeInventoryProduct.sku }}</div>
      </div>
      <div class="vertical-divider "></div>
      <div class="w-50 text-center px-3">
        <div class="label mb-1">{{ $t('common.colorway') }}</div>
        <div class="value">{{ activeInventoryProduct.colorway || '-' }}</div>
      </div>
    </div>
    <b-row v-if="activeInventoryProduct" class="m-auto w-100 w-md-75">
      <b-col md="12">
        <div class="my-3 text-center">
          <ProductThumb :product="activeInventoryProduct" width="350" class="my-4" />
        </div>
        <div class="d-md-none body-3-bold text-capitalize mb-2">{{ activeInventoryProduct.name }}</div>
        <div class="d-flex d-md-none last-sale-price mb-4">
          {{ $t('create_listing.product.last_sale') }}: {{ lastSold ? lastSold : $t('common.n/a') }}
        </div>
        <div class="my-5 d-flex flex-column justify-content-center m-auto size-selector-box">
          <div class="d-flex align-items-center justify-content-between size-bar">
            <span>{{ $t('products.select_size') }}</span>
            <span role="button" class="button d-flex align-items-center">
              <img class="d-md-none" src="~/assets/img/icons/eye.svg" />&nbsp;{{ $t('products.all_sizes') }}
            </span>
          </div>
          <ProductSizePicker
            :sizes="sizes"
            :prices="pricesBySize"
            :value="form.size_id"
            viewMode="carousel"
            singleMode
            :xsCount="6"
            :xsCenter="true"
            @update="handleSizeChange"
          />
          <div v-if="showError && errors.size_id" class="text-danger body-5-regular">{{ $t('create_listing.product.errors.size') }}</div>
          <div class="d-none mt-3 mb-5 mx-4 d-md-flex justify-content-between min-medium-high-prices">
            <div class="text-left">
              <div>{{ $t('create_listing.product.lowest_price') }}:</div>
              <div>{{ lowestPrice ? lowestPrice : $t('common.n/a') }}</div>
            </div>
            <div class="text-center">
              <div>{{ $t('create_listing.product.last_sold') }}:</div>
              <div>{{ lastSold ? lastSold : $t('common.n/a') }}</div>
            </div>
            <div class="text-right">
              <div>{{ $t('create_listing.product.highest_sold') }}:</div>
              <div>{{ highestSold ? highestSold : $t('common.n/a') }}</div>
            </div>
          </div>
        </div>

      </b-col>
      <b-col md="4">
        <div class="bid-section d-flex flex-column mt-4 mr-md-4">
          <span class="font-weight-bold mb-1">{{ $t('common.quantity') }}*</span>
          <div class="d-flex align-items-center mb-1">
            <FormInput
              v-model="form.quantity"
              :placeholder="$t('common.quantity')"
              required
              number
              max="10"
              class="flex-grow-1"
              :pill="false"
            />
          </div>
        </div>
        <div v-if="showError && errors.quantity" class="text-danger body-5-regular">
          <span v-if="errors.quantity === 'greater_than_limit'">{{ $t('create_listing.product.errors.max_quantity') }}</span>
          <span v-else>{{ $t('create_listing.product.errors.quantity') }}</span>
        </div>
      </b-col>
      <b-col v-if="!isSneakers" md="4">
        <div class="duration-section d-flex flex-column mt-4 mr-md-4">
          <span class="font-weight-bold mb-1">{{ $t('common.color') }}*</span>
          <FormDropdown
            id="colorSelector"
            :value="form.color"
            :placeholder="$t('common.color')"
            :items="colors"
            :icon-arrow-up="arrowUpIcon"
            :icon-arrow-down="arrowDownIcon"
            class="mb-1 mw-40"
            no-arrow
            can-clear
            @select="handleColorSelect"
          />
        </div>
        <div v-if="showError && errors.color" class="text-danger body-5-regular">{{ $t('create_listing.product.errors.color') }}</div>
      </b-col>
      <b-col v-if="!isSneakers" md="4">
        <div class="duration-section d-flex flex-column mt-4 mr-md-4">
          <span class="font-weight-bold">{{ $t('common.year') }}*</span>
          <FormInput
            v-model="form.year"
            :placeholder="$t('create_listing.product.enter_year')"
            class="mw-40 mb-1 mt-n1"
            required
            number
          />
        </div>
        <div v-if="showError && errors.year" class="text-danger body-5-regular">{{ $t('create_listing.product.errors.year') }}</div>
      </b-col>
      <b-col md="4" class="d-none d-md-block">
        <div class="duration-section d-flex flex-column mt-4 mr-md-4">
          <span class="font-weight-bold mb-1">{{ $t('common.box_condition') }}*</span>
          <FormDropdown
            id="boxConditionSelector"
            :value="form.packaging_condition_id"
            :placeholder="$t('trades.create_listing.default_box_condition')"
            :items="packageConditions"
            :icon-arrow-up="arrowUpIcon"
            :icon-arrow-down="arrowDownIcon"
            class="mb-1 mw-40"
            no-arrow
            can-clear
            @select="handleBoxConditionSelect"
          />
        </div>
        <div v-if="showError && errors.packageCondition" class="text-danger body-5-regular">{{ $t('create_listing.product.errors.box_condition') }}</div>
      </b-col>
      <!-- Mobile Box Condition -->
      <b-col class="d-md-none">
        <div class="duration-section box-condition d-flex flex-column mt-2 mr-md-4">
          <div class="text-center mb-2">
            <span class="box-condition-title">{{ $t('common.box_condition') }}</span>
            <img :src="infoIcon" class="ml-1" />
          </div>
          <button
            class="box-condition-btn position-relative d-flex align-items-center justify-content-center"
            @click="openBoxConditionSheet"
          >
            <span>{{ form.packageCondition || $t('trades.create_listing.default_box_condition') }}</span>
            <img :src="arrowDownIcon" class="position-absolute" />
          </button>
        </div>
        <div v-if="showError && errors.packageCondition" class="text-danger body-5-regular">{{ $t('create_listing.product.errors.box_condition') }}</div>
      </b-col>
      <!-- product details mobile -->
      <div class="col-md-12 mt-4 d-md-none w-100 mx-auto">
        <collapsible-box :title="$t('create_listing.product.product_details')">
          <div class="d-flex flex-column flex-md-row mt-3">
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between mb-2">
                <span class="product-details-title">{{ $t('sell.confirm_listing.sku') }}:</span>
                <span class="product-details-value">{{ activeInventoryProduct.sku }}</span>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <span class="product-details-title">{{ $t('common.colorway') }}:</span>
                <span class="product-details-value">{{ activeInventoryProduct.colorway || '-' }}</span>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <span class="product-details-title">{{ $t('create_listing.product.retail_price') }}:</span>
                <span class="product-details-value">{{ $t('create_listing.product.excellent') }}</span>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <span class="product-details-title">{{ $t('create_listing.product.release_date') }}:</span>
                <span class="product-details-value">{{ new Date().toLocaleDateString('en-US') }}</span>
              </div>
            </div>
            <div class="flex-grow-1">
              <div class="product-details-title mb-1">{{ $t('create_listing.product.description') }}:</div>
              <div class="product-details-value">{{ $t('create_listing.product.description_details') }}</div>
            </div>
          </div>
        </collapsible-box>
      </div>
      <div class="col-md-12 mt-4 d-md-none w-100 mx-auto">
        <div class=" latest-sales-graph">
          <ProductLatestSales
            :value="activeInventoryProduct.latest_sales"
            :sku="activeInventoryProduct.sku"
          />
        </div>
      </div>
      <b-col md="4" class="text-center">
        <div class="duration-section d-flex flex-column my-5 mr-md-5">
          <span class="font-weight-bold mb-1">&nbsp;</span>
          <Button
            variant="dark"
            class="px-5 w-100 h-auto add-product-btn"
            pill
            @click="addAuction"
          >
            {{ $t('create_listing.product.add_product') }}
          </Button>
        </div>
      </b-col>
    </b-row>
    <!-- Box Condition Sheet -->
    <vue-bottom-sheet ref="boxConditionSheet">
      <div class="d-flex flex-column h-100 filters-sheet">
        <div class="filters-sheet-title text-center">{{ $t('create_listing.product.select_box_condition') }}</div>
        <div class="flex-shrink-1 overflow-auto filters-sheet-content">
          <div v-for="condition in packageConditions" :key="condition.value">
            <button class="w-100 border-0 text-left condition-option" @click="handleBoxConditionSelect(condition);closeBoxConditionSheet()">
              <div>{{ condition.label }}</div>
            </button>
          </div>
        </div>
      </div>
    </vue-bottom-sheet>
  </b-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import _ from 'lodash';
import {FormDropdown, FormInput, Button} from '~/components/common'
import auctionValidation from '~/plugins/mixins/create-listing-auction'
import FormStepper from '~/components/createListing/FormStepper'
import CollapsibleBox from '~/components/common/CollapsibleBox';

import ProductThumb from '~/components/product/Thumb.vue'
import LeftArrowSvg from '~/assets/img/home/arrow-left.svg?inline'
import ProductSizePicker from '~/components/product/SizePicker'
import arrowUpIcon from '~/assets/img/icons/arrow-up-blue.svg'
import arrowDownIcon from '~/assets/img/icons/arrow-down-blue.svg'
import infoIcon from '~/assets/img/icons/info-dark-blue.svg'

export default {
  name: 'NoInventoryCollectionProduct',
  components: {
    LeftArrowSvg,
    ProductThumb,
    FormDropdown,
    FormInput,
    Button,
    ProductSizePicker,
    FormStepper,
    CollapsibleBox,
  },
  mixins: [auctionValidation],
  layout: 'Profile',
  data(){
    return {
      DURATIONS: Object.keys(this.$t('create_listing.confirm.select_duration')).map(a => {
        return {
          label: this.$t(`create_listing.confirm.select_duration.${a}`),
          value:a,
        }
      }),
      form: {
        size_id: null,
        packageCondition: null,
        year: null,
        color: null,
        quantity: null,
      },
      showError: false,
      errors: {},
      lowestPrice: null,
      lastSold: null,
      highestSold: null,
      arrowUpIcon,
      arrowDownIcon,
      infoIcon,
    }
  },
  computed:{
    ...mapGetters({
      packageConditionsData: 'inventory/getPackageConditions',
      inventoryColors: 'inventory/getColors',
      activeInventoryProduct: 'create-listing/getActiveInventoryProduct',
      selectedAuctionType: 'create-listing/getAuctionType',
    }),
    sizes() {
      return this.activeInventoryProduct?.sizes || []
    },
    pricesBySize() {
      const prices = []
      this.sizes.forEach(size => {
        const productPrice = this.activeInventoryProduct?.product_sizes.find(sz => sz.size === size.size)
        if (productPrice) {
          prices.push({ price: productPrice.price * 100, size_id: size.id })
        }
      })
      return prices
    },
    packageConditions() {
      return this.packageConditionsData.map(pc => ({ value: pc.id, label: pc.name }))
    },
    colors() {
      return this.inventoryColors.map(color => ({ value: color.id, label: color.name }))
    },
    isSneakers() {
      if (this.activeInventoryProduct && this.activeInventoryProduct.category) {
        return this.activeInventoryProduct.category.name === 'sneakers'
      }
      return false
    },
  },
  mounted() {
    this.fetchPackagingConditions(this.activeInventoryProduct.category.name)
    this.fetchColors()
  },
  methods: {
    ...mapActions({
      fetchPackagingConditions: 'inventory/fetchPackagingConditions',
      fetchColors: 'inventory/fetchColors',
    }),
    handleSizeChange(sizeId) {
      this.showError = false
      if (sizeId) {
        this.form = {
          ...this.form,
          size_id: sizeId,
        }
      }
    },
    addAuction() {
      let hasErrors = false
      this.errors = {}
      // validate form
      _.keys(this.form).forEach(key => {
        if (key === 'quantity') {
          if (this.form.quantity > 10) {
            this.errors.quantity = 'greater_than_limit'
            hasErrors = true
          }
        }
        if (this.form[key] === null) {
          if (this.isSneakers && (key !== 'year' && key !== 'color')) {
            this.errors[key] = true
            hasErrors = true
          }
        }
      })
      this.showError = true
      if (!hasErrors) {
        const newInventory = {
          item: {
            product: {
              ...this.activeInventoryProduct,
              sizes: this.sizes,
            },
            ...this.form,
            packaging_condition: {
              name: this.form.packageCondition,
            },
            color: this.form.color ? this.form.color : this.activeInventoryProduct.colorway,
            size: this.sizes.find(sz => sz.id === this.form.size_id),
            stock: this.form.quantity,
          },
          id: this.randomStringId(),
        }
        this.$store.commit('create-listing/addItemToNonInventoryCollectionAuction', newInventory)
        this.$router.push('/create-listing/product/collection/confirm')
      }
    },
    handleBoxConditionSelect(item) {
      this.showError = false
      this.form = {
        ...this.form,
        packageCondition: item.label,
        packaging_condition_id: item.value,
      }
    },
    handleColorSelect(item) {
      this.showError = false
      this.form = {
        ...this.form,
        color: item.value,
        color_id: item.id,
      }   
    },
    openBoxConditionSheet() {
      this.$refs.boxConditionSheet.open()
    },
    closeBoxConditionSheet() {
      this.$refs.boxConditionSheet.close()
    },
  }
}
</script>


<style lang="sass" scoped>
@import '~/assets/css/_variables'

.container-product-auction
  .size-bar
    @include body-8
    font-weight: $normal
    color: $black
    .button
      font-weight: $medium
      color: $color-blue-30
      img
        width: 20px
  @media (max-width: 576px)
    background: transparent
    padding: 20px 9px
    .thumb-wrapper::v-deep
      width: 70%
      margin: auto
    .container::v-deep
      .carousel-wrapper
        margin: 0 -20px !important
        width: auto
        max-width: unset
        padding: 0
        &-title
          display: none
        .size-carousel
          width: 100%
          padding: 0
          .card
            @include body-9
            width: 50px
            height: 50px
            border-width: 1px
            margin: 4px 0 0
          .price
            @include body-18
            letter-spacing: 0.005em
            margin-top: 10px

        .owl-nav
          display: none !important
    .size-selector-box::v-deep
      width: 100%
      .select-size
        display: none
    .size-bar
      @include body-21
      font-weight: $normal
      .button
        font-weight: $normal
        color: $black
    .last-sale-price
      @include body-5
      font-weight: $normal
      color: $color-gray-6
    .font-weight-bold
      @include body-9
    .duration-section
      .form-dropdown-wrapper::v-deep
        .btn-dropdown
          @include body-9
          border: 1px solid $white-5
          border-radius: 10px
          padding: 17px 14px
          font-weight: $normal
          height: auto

    .color-sku-section
      .vertical-divider
        width: 1px
        height: 30px
        background: $color-gray-4
      .label
        @include body-21
        font-weight: $medium
        color: $black
      .value
        @include body-5
        font-weight: $normal
        color: $color-blue-20
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
    .reserve-section,
    .bid-section
      .form-input-wrapper::v-deep
        .form-input
          font-weight: $medium
          font-size: 12px
          line-height: 15px
          padding: 17px 14px
          height: auto
          border-radius: 10px
          border: 1px solid $white-5
      .checkbox-switch::v-deep
        .custom-switch
          margin: 0
          padding-left: 55px
          height: 30px
          .custom-control-input ~ .custom-control-label::before
            background: $white-5
            border-radius: 2px
            height: 30px
            width: 55px
            border: none
            top: 0
            left: -55px
          .custom-control-input ~ .custom-control-label::after
            width: 24px
            height: 24px
            background: $white
            box-shadow: 0px 2px 4px rgba($black, 0.15), 0px 3px 8px rgba($black, 0.15)
            border-radius: 2px
            top: 3px
            left: -51px
          .custom-control-input:checked ~ .custom-control-label::before
            background: $color-green-16
          .custom-control-input:checked ~ .custom-control-label::after
            transform: translateX(24px)
    .reserve-info
      align-items: flex-start
      padding: 8px 12px
      img
        height: 12px
        margin-top: 2px
        margin-right: 8px
    .collapsible-box::v-deep
      box-shadow: 0px -0.1px 2px rgba($black, 0.25), 0px 1px 2px rgba($black, 0.25)
      border-radius: 8px
      padding: 20px
      .title
        @include body-5
        font-weight: $medium
        color: $black
    .product-details
      &-title
        @include body-30
        font-weight: $medium
      &-value
        @include body-30
        color: $color-gray-5
        font-weight: $normal
    .latest-sales-graph
      box-shadow: 0px -0.1px 2px rgba($black, 0.25), 0px 1px 2px rgba($black, 0.25)
      border-radius: 8px
      padding: 16px 20px
      .child-container::v-deep
        margin-top: 0
        h2
          @include body-5
          font-family: $font-montserrat
          font-weight: $medium
          color: $black
        .period-block
          flex-direction: row
          justify-content: flex-end
          .btn
            @include body-21
            font-weight: $medium
            color: $color-gray-47
            margin: 0 8px
            &.active
              color: $black
  .add-product-btn
    padding: 12px
    @media (max-width: 576px)
      border-radius: 25px
  .box-condition
    &-title
      @include body-5
      font-weight: $medium
      & + img
        width: 12px
        margin-top: -1px
    &-btn
      border: 1px solid $black
      filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.25))
      height: 38px
      background: $white
      span
        @include body-5
        font-weight: $normal
        color: $color-blue-20
      img
        width: 15px
        top: 10px
        right: 12px

.bottom-sheet::v-deep
  .bottom-sheet__content
    overflow: hidden
.filters-sheet-content
  padding: 0
  .condition-option
    @include body-5
    font-family: $font-family-sf-pro-display
    font-weight: $regular
    color: $black
    padding: 0 14px
    background: transparent
    div
      padding: 17px 0
      border-bottom: 0.5px solid $color-white-12
    &:active
      background: $color-blue-20
      div
        border-color: $color-blue-20
        color: $white

</style>