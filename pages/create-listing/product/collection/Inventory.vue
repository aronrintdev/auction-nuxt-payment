<template>
  <b-container fluid class="container-product-auction h-100">
    <!-- Back to search -->
    <div class="d-flex align-items-center justify-content-between">
      <NuxtLink to="/create-listing/search/inventory">
        <LeftArrowSvg class="back-arrow" />
        <span class="body-5-normal back-to-search-btn">{{ $t('create_listing.product.back_to_search') }}</span>
      </NuxtLink>
      <FormStepper :steps="steps" :selected="getCollectionState"/>
    </div>
    <b-row class="mt-4">
      <b-col md="8">
        <div class="heading-1-bold">{{ activeInventoryProduct.name }}</div>
        <div class="body-3-regular mt-1 text-capitalize">{{ $t('sell.confirm_listing.sku') }}: {{ activeInventoryProduct.sku }}</div>
        <div class="body-3-regular mt-1 text-capitalize">{{ $t('common.colorway') }}: {{ activeInventoryProduct.colorway }}</div>
      </b-col>
    </b-row>
    <b-row class="m-auto w-75">
      <b-col md="12">
        <div class="my-3 text-center">
          <ProductThumb :product="activeInventoryProduct" width="350" class="my-4" />
        </div>
        <div class="my-5 d-flex flex-column justify-content-center m-auto size-selector-box">
          <div class="d-flex align-items-center">
            <span class="body-3-normal">{{ $t('common.size') }}*</span>
            <span class="body-5-regular ml-3">({{ $t('create_listing.product.suggested_value_displayed') }})</span>
            <span v-if="showError && errors.size_id" class="ml-5 text-danger body-5-regular">{{ $t('create_listing.product.errors.size') }}</span>
          </div>
          <ProductSizePicker
            :sizes="sizes"
            :prices="pricesBySize"
            :value="form.size_id"
            viewMode="carousel"
            singleMode
            @update="handleSizeChange"
          />
          <div class="mt-3 mb-5 mx-4 d-flex justify-content-between min-medium-high-prices">
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
        <div class="duration-section d-flex flex-column mt-4 mr-4">
          <span class="font-weight-bold">{{ $t('common.quantity') }}*</span>
          <FormInput
            v-model="form.quantity"
            :placeholder="$t('common.quantity')"
            class="mw-40 mb-1 mt-n1"
            required
            number
            max="10"
          />
        </div>
        <div v-if="showError && errors.quantity" class="text-danger body-5-regular">
          <span v-if="errors.quantity === 'greater_than_limit'">{{ $t('create_listing.product.errors.max_quantity') }}</span>
          <span v-else>{{ $t('create_listing.product.errors.quantity') }}</span>
        </div>
      </b-col>
      <b-col v-if="!isSneakers" md="4">
        <div class="duration-section d-flex flex-column mt-4 mr-4">
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
        <div class="duration-section d-flex flex-column mt-4 mr-4">
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
      <b-col md="4">
        <div class="duration-section d-flex flex-column mt-4 mr-4">
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
      <b-col md="4" class="text-center">
        <div class="duration-section d-flex flex-column mt-4 mr-5">
          <span class="font-weight-bold mb-1">&nbsp;</span>
          <Button
            variant="outline-primary"
            class="px-5 add-product-btn"
            pill
            @click="addAuction"
          >
            {{ $t('create_listing.product.add_product') }}
          </Button>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import _ from 'lodash';
import {FormDropdown, FormInput, Button} from '~/components/common'
import auctionValidation from '~/plugins/mixins/create-listing-auction'
import FormStepper from '~/components/createListing/FormStepper'

import ProductThumb from '~/components/product/Thumb.vue'
import LeftArrowSvg from '~/assets/img/home/arrow-left.svg?inline'
import ProductSizePicker from '~/components/product/SizePicker'
import arrowUpIcon from '~/assets/img/icons/arrow-up-blue.svg'
import arrowDownIcon from '~/assets/img/icons/arrow-down-blue.svg'

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
          },
          quantity: this.form.quantity,
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
  }
}
</script>

