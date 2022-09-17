<template>
  <div class="create-listing-form-wrapper">
    
    <div class="d-flex justify-content-between align-items-center mt-3">
      <h2 class="title">{{ product.name }}</h2>
      <span role="button" @click="moveBack">
      <img
        :src="require('~/assets/img/icons/arrow-back.svg')"
        class="img-fluid"
      />
      {{ $t('create_listing.back_to_listing') }}
    </span>
    </div>

    <div class="section-product-details">
      <div class="mt-2">{{ $t('common.sku') }}: {{ product.sku }}</div>
      <div class="mt-2">{{ $t('common.color') }}: {{ product.colorway }}</div>
    </div>

    <ProductThumb
      :product="product"
      overlay
      class="
        product-thumbnail
        mx-auto
        d-flex
        align-items-center
        overflow-hidden
        mt-3
      "
    />

    <div class="mt-2 mx-auto section-product-size">
      <div class="d-flex align-items-end">
        <div class="mr-2 form-item-title">{{ $tc('common.size', 1) }}*</div>
        <div class="form-item-desc">
          ({{ $t('inventory.suggested_value_displayed') }})
        </div>
        <span class="error-msg form-item-desc">{{
          value.currentSize ? '' : $t('createlisting.please_select_a_size')
        }}</span>
      </div>

      <!-- SizePicker -->
      <ProductSizePicker
        :sizes="sizes"
        :prices="pricesBySize"
        :value="value.currentSize"
        single-mode
        class="size-picker"
        @update="handleSizeChange"
      />
      <!-- ./SizePicker -->
    </div>

    <div class="mt-4 mx-auto section-meter bg-white px-3 py-2">
      <!-- Meter -->
      <Meter
        :value="value.price ? Number(value.price) * 100 : null"
        :lowest="lowestListedPrice"
        :highest="highestOfferPrice"
        :fair="lastSoldPrice"
      />
      <!-- ./Meter -->

      <!-- Price list -->
      <div class="d-flex justify-content-between mt-4">
        <div class="text-left">
          <div class="field">{{ $t('products.highest_offer') }}</div>
          <div class="value">
            {{ highestOfferPrice | toCurrency('USD', 'N/A') }}
          </div>
        </div>
        <div class="text-center">
          <div class="field">
            {{ $t('sell.sell_now.last_sold') }}
          </div>
          <div class="value">
            {{ lastSoldPrice | toCurrency('USD', 'N/A') }}
          </div>
        </div>
        <div class="text-right">
          <div class="field">{{ $t('inventory.lowest_listed') }}</div>
          <div class="value">
            {{ lowestListedPrice | toCurrency('USD', 'N/A') }}
          </div>
        </div>
      </div>
      <!-- ./Price List -->
    </div>

    <!-- Inputs -->
    <b-row class="section-form-fields d-flex justify-content-center m-auto">
      <!-- Quantity -->
      <div
        class="col-xs-12 col-md-4 px-md-4 mt-3"
        :class="
          (value.quantity < quantityMinVal ||
            value.quantity > quantityMaxVal) &&
          'error'
        "
      >
        <FormInput
          :value="value.quantity"
          :placeholder="$t('inventory.enter_quantity')"
          :label="$t('common.quantity')"
          class="input-error"
          required
          integer
          @input="handleQuantityChange"
        />
        <div class="error-text mt-1">
          {{
            (quantityMinVal > value.quantity ||
              value.quantity > quantityMaxVal) &&
            $t('inventory.message.between', {
              field: $t('common.quantity').toLowerCase(),
              min: quantityMinVal,
              max: quantityMaxVal,
            })
          }}
        </div>
      </div>
      <!-- End of Quantity -->

      <!-- Price -->
      <div
        class="col-xs-12 col-md-4 px-md-4 mt-3"
        :class="value.price !== null && value.price <= priceMinVal && 'error'"
      >
        <FormInput
          :value="value.price"
          :placeholder="$t('inventory.enter_price')"
          :label="$t('inventory.your_price')"
          prefix="$"
          class="input-error"
          required
          number
          @input="handlePriceChange"
        />
        <div class="error-text mt-1">
          {{
            value.price > priceMinVal ||
            $t('inventory.message.gt_than', {
              field: $t('common.price').toLowerCase(),
              amount: priceMinVal,
            })
          }}
        </div>
      </div>
      <!-- End of Price -->

      <!-- Box Condition -->
      <div
        class="col-xs-12 col-md-4 px-md-4 mt-3"
      >
        <FormDropdown
          id="packaging-conditions"
          :value="value.boxCondition"
          :placeholder="$t('inventory.select_condition')"
          :label="$t('common.box_condition')"
          :items="packagingConditions"
          required
          @input="handlePackagingConditionChange"
        />
      </div>
      <!-- Box Condition -->

      <!-- Min Offer Amount -->
      <div
        class="col-xs-12 col-md-4 px-md-4 min-offer-div mt-3"
        :class="
          value.minOfferAmount !== null &&
          value.minOfferAmount <= minOfferMinVal &&
          'error'
        "
      >
        <FormInput
          :value="value.minOfferAmount"
          :placeholder="$t('createlisting.enter_min_offer_amount')"
          :label="$t('createlisting.min_offer_amount')"
          class="input-error"
          prefix="$"
          required
          integer
          @input="handleMinOfferPriceChange"
        />
        <div class="error-text mt-1">
          {{
            value.minOfferAmount === null ||
            $t('inventory.message.gt_than', {
              field: $t('common.price').toLowerCase(),
              amount: minOfferMinVal
            })
          }}
        </div>
      </div>
      <!-- ./MinOffer Amount -->
    </b-row>

    <b-row
      v-if="typeof action === 'string' && action === 'edit'"
      class="section-form-fields d-flex justify-content-center m-auto"
    >
      <Button
        variant="info"
        pill
        :disabled="!isFormValid"
        class="mt-3 mr-3"
        @click="handleEditClick"
      >
        {{ $t('inventory.save_changes') }}
      </Button>
      <Button
        pill
        variant="outline-primary"
        class="mt-3"
        @click="moveBack"
      >
        {{ $t('inventory.discard_changes') }}
      </Button>
    </b-row>
    <!-- End of Inputs -->

    <!-- On save changes click -->
    <ModifyListingConfirm
      id="modify-listing-confirm"
      :heading="$t('selling_page.edit_listing_heading')"
      :text="$t('selling_page.edit_listing_text')"
      @hidden="emitEditSuccess"
      @success="$emit('success')"
    ></ModifyListingConfirm>
    <!-- End of On save changes click -->
  </div>
</template>

<script>
import _ from 'lodash'
import ModifyListingConfirm from './ModifyListingConfirm.vue'
import ProductSizePicker from '~/components/product/SizePicker'
import { Meter , FormInput, FormDropdown, Button } from '~/components/common'
import {
  QUANTITY_MIN_VAL,
  QUANTITY_MAX_VAL,
  PRICE_MIN_VAL,
  MINOFFER_MIN_VAL,
} from '~/static/constants'
export default {
  name: 'ModifyListing',

  components: {
    ProductSizePicker,
    Meter,
    FormInput,
    FormDropdown,
    Button,
    ModifyListingConfirm
  },

  layout: 'Profile',

  props: {
    product: {
      type: Object,
      required: true,
    },
    value: {
      type: Object,
      default: () => {},
    },
    action: {
      type: String,
      required: true,
    },
    listingId: {
      type: Number,
      default: null
    }
  },

  data() {
    return {
      quantityMinVal: QUANTITY_MIN_VAL,
      quantityMaxVal: QUANTITY_MAX_VAL,
      priceMinVal: PRICE_MIN_VAL,
      minOfferMinVal: MINOFFER_MIN_VAL,
    }
  },

  computed: {
    sizes() {
      return this.product?.sizes || []
    },

    /**
     * Get the prices of the product wrt. size id.
     */
    pricesBySize() {
      return this.product?.lowest_prices?.filter((i) => {
        const items = this.product.lowest_prices.filter(
          (j) => j.packaging_condition_id === i.packaging_condition_id
        )
        const minItem = _.minBy(items, 'price')
        return i.size_id === minItem.size_id
      })
    },
    /**
     * Get the lowest listed price of the product wrt. size.
     */
    lowestListedPrice() {
      const items = this.product?.lowest_prices?.filter(
        (i) => i.size_id === this.value.currentSize
      )
      return _.minBy(items, 'price')?.price
    },
    /**
     * Get the highest offer price of the product wrt. size.
     */
    highestOfferPrice() {
      const offers = this.product?.highest_offers?.filter(
        (i) => i.size_id === this.value.currentSize
      )
      return _.maxBy(offers, 'price')?.price
    },

    // todo
    lastSoldPrice() {
      return null
    },
    /**
     * Get the packaging Condtions of product.
     */
    packagingConditions() {
      return (
        this.product?.packaging_conditions?.map((i) => {
          return { label: i.name, value: i.id }
        }) || []
      )
    },
    // Form valid? Enable the save/update button
    isFormValid() {
      return (
        this.value.currentSize &&
        this.value.quantity &&
        this.value.price &&
        this.value.boxCondition &&
        this.value.quantity >= this.quantityMinVal &&
        this.value.quantity <= this.quantityMaxVal &&
        this.value.price > this.priceMinVal &&
        this.value.minOfferAmount > this.minOfferMinVal
      )
    },
  },
  
  methods: {
    // On back icon click
    moveBack(){
      this.$router.push(`/profile/vendor-selling/details/${this.listingId}`)
    },
    /**
     * On size input emit the value to be updated.
     */
    handleSizeChange(value) {
      if (value && this.$route.query.path !== 'from-inventory') {
        this.$emit('input', { ...this.value, currentSize: value })
      }
    },

    // Back to Search on click
    backToSearch() {
      this.$router.push('/profile/create-listing/selling')
    },
    /**
     * On quantity input emit the value to be updated.
     */
    handleQuantityChange(value) {
      this.$emit('input', { ...this.value, quantity: value })
    },
    /**
     * On price input emit the value to be updated.
     */
    handlePriceChange(value) {
      if (value && this.$route.query.path !== 'from-inventory') {
        this.$emit('input', { ...this.value, price: value })
      }
    },
    /**
     * on packaging condition input, emit the value to be updated.
     */
    handlePackagingConditionChange(value) {
      if (value && this.$route.query.path !== 'from-inventory') {
        this.$emit('input', { ...this.value, boxCondition: value })
      }
    },
    // On min offer amount input
    handleMinOfferPriceChange(value) {
      this.$emit('input', { ...this.value, minOfferAmount: value })
    },
  
    /**
     * On update listing button click,
     * Show the values in the confirm screen.
     */
    handleEditClick() {
      this.$bvModal.show('modify-listing-confirm')
    },

    // On confirm disacard
    onConfirm() {
      this.$bvModal.show('discard-confirm')
    },

    emitEditSuccess() {
      this.$emit('editDraft')
    },

    handleDiscard() {
      this.$bvModal.show('discard')
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.create-listing-form-wrapper
  h2.title
    @include heading-1
    color: $color-black-1

  .btn-back
    @include body-4-regular
    color: $color-black-1

  .section-product-details
    @include body-3-normal
    color: $color-gray-5

  .product-thumbnail
    width: 323px
    height: 246px

  .form-item-title
    @include body-3-normal
    color: $color-black-1

  .form-item-desc
    @include body-5-regular
    color: $color-gray-5
  .error-msg
    @include body-5-regular
    color: $color-red-3

  .section-product-size
    max-width: 570px

  .section-meter
    max-width: 390px

    .field
      @include body-4-medium
      color: $color-black-1

    .value
      @include body-4-regular
      color: $color-gray-5

  .section-form-fields
    >div
      width: 203px

    >.min-offer-div
      width: 234px

    .error-text
      display: none

    .error
      border: 0
      .input-error::v-deep
        .form-input
          border-color: $color-red-3

      .error-text
        @include body-5-regular
        display: block
        color: $color-red-3
@media (max-width: 375px)
  .create-listing-form-wrapper
    .product-thumbnail
      width: 246px
@media (min-width: 650px)
  .section-form-fields
    width: 75%
</style>
