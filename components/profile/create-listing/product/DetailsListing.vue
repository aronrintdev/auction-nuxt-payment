<template>
  <div class="create-listing-form-wrapper">
    <span role="button" @click="backToSearch">
      <img
        :src="require('~/assets/img/icons/arrow-left-gray.svg')"
        class="img-fluid"
      />
      {{ $t('common.back_to_search') }}
    </span>
    <div class="d-flex justify-content-between align-items-center mt-3">
      <h2 class="title">{{ product.name }}</h2>
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

      <!-- Packaging Condition -->
      <div
        v-if="
          !['apparel', 'accessories'].includes(
            product.category.name.toLowerCase()
          )
        "
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
      <!-- End of Packaging Condition -->

      <!-- In case of Accessories / Apparel - Min Offer Amount -->
      <div
        v-if="
          ['apparel', 'accessories'].includes(
            product.category.name.toLowerCase()
          )
        "
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

      <div
        v-if="
          !['apparel', 'accessories'].includes(
            product.category.name.toLowerCase()
          )
        "
        class="col-md-4 col-xs-12 px-md-4 mt-3"
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
      <template v-if="typeof action === 'string' && action === 'add'">
        <div
          v-if="
            !['apparel', 'accessories'].includes(
              product.category.name.toLowerCase()
            )
          "
          class="col-md-4 col-xs-12 px-md-4 mt-auto text-center mt-3"
        >
          <Button
            variant="info"
            pill
            class="mt-3"
            :disabled="!isFormValid"
            @click="handleSaveClick"
          >
            {{ $t('createlisting.add_listing') }}
          </Button>
        </div>

        <div
          v-if="
            !['apparel', 'accessories'].includes(
              product.category.name.toLowerCase()
            )
          "
          class="col-md-4 col-xs-12 px-md-4 text-center mt-3"
        ></div>
      </template>

      <template
        v-if="
          ['apparel', 'accessories'].includes(
            product.category.name.toLowerCase()
          )
        "
      >
        <!-- Color -->
        <div class="col-md-4 col-xs-12 px-md-4 mt-3">
          <FormDropdown
            id="packaging-condition"
            :value="value.color"
            :placeholder="$t('createlisting.select_color')"
            :label="$t('common.color')"
            :items="colors"
            required
            @input="handleColorChange"
          />
        </div>
        <!-- End of Color -->

        <!-- Year -->
        <div class="col-md-4 col-xs-12 px-md-4 mt-3">
          <FormInput
            :value="``"
            :placeholder="$t('createlisting.enter_year')"
            :label="$t('common.year')"
            class="input-error"
            required
            number
            @input="handleYearChange"
          />
        </div>
        <!-- End of Year -->

        <!-- Packaging Condition -->
        <div class="col-md-4 col-xs-12 px-md-4 mt-3">
          <FormDropdown
            id="packaging-conditions"
            :value="value.boxCondition"
            :placeholder="$t('inventory.select_condition')"
            :label="$t('createlisting.packaging_condition')"
            :items="packagingConditions"
            required
            @input="handlePackagingConditionChange"
          />
        </div>
        <!-- End of Packaging Conditions -->

        <div class="col-md-4 col-xs-12 px-md-4 mt-auto text-center mt-3">
          <Button
            v-if="typeof action === 'string' && action === 'add'"
            variant="info"
            pill
            :disabled="!isFormValid"
            class="mt-3"
            @click="handleSaveClick"
          >
            {{ $t('createlisting.add_listing') }}
          </Button>
        </div>
      </template>
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
        @click="handleDiscard"
      >
        {{ $t('inventory.discard_changes') }}
      </Button>
    </b-row>
    <!-- End of Inputs -->

    <!-- On save changes click -->
    <AlertModal
      id="save-listing-success"
      :message="$t('inventory.message.saved')"
      icon="tick"
      auto-hide
      @hidden="emitEditSuccess"
    />
    <!-- End of On save changes click -->

    <!-- On discard changes -->
    <ConfirmModal
      id="discard"
      :message="$t('createlisting.discard_changes')"
      :confirmLabel="$t('common.discard')"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
    <!-- End of On discard changes -->

    <!-- Discard confirm message -->
    <AlertModal
      id="discard-confirm"
      :message="$t('inventory.message.discarded')"
      icon="trash"
      auto-hide
      @hidden="onCancelDiscard"
    />
    <!-- Discard confirm message -->
  </div>
</template>

<script>
import _ from 'lodash'
import { mapActions, mapGetters } from 'vuex'
import ProductSizePicker from '~/components/product/SizePicker'
import { Meter, FormInput, FormDropdown, Button } from '~/components/common'
import { AlertModal, ConfirmModal } from '~/components/modal'
import {
  QUANTITY_MIN_VAL,
  QUANTITY_MAX_VAL,
  PRICE_MIN_VAL,
  MINOFFER_MIN_VAL,
} from '~/static/constants'
export default {
  name: 'DetailsListing',

  components: {
    ProductSizePicker,
    Meter,
    FormInput,
    FormDropdown,
    Button,
    AlertModal,
    ConfirmModal,
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
    ...mapGetters({
      inventoryColors: 'inventory/getColors'
    }),
    sizes() {
      return this.product?.sizes || []
    },

    /**
     * Get the colors available.
     */
    colors: (vm) => {
      return (
        vm.inventoryColors?.map((i) => {
          return { label: i.name, value: i.id }
        }) || []
      )
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
  created() {
    this.getColors()
  },
  methods: {
    ...mapActions({
      fetchColors: 'inventory/fetchColors'
    }),
    // Get the colors
    getColors() {
      this.fetchColors()
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
     * On add listing button click.
     * Store the values and show confirmation screen.
     */
    handleSaveClick() {
      this.$emit('addToDraft')
    },
    /**
     * On update listing button click,
     * Show the values in the confirm screen.
     */
    handleEditClick() {
      this.$bvModal.show('save-listing-success')
    },

    // On confirm disacard
    onConfirm() {
      this.$bvModal.show('discard-confirm')
    },

    emitEditSuccess() {
      this.$emit('editDraft')
    },

    // TODO
    handleYearChange(value) {
      return null
    },

    // Color input on change.
    handleColorChange(value) {
      this.$emit('input', { ...this.value, color: value })
    },

    // On cancel discard
    onCancelDiscard() {
      this.$router.push({
        path: '/profile/create-listing/selling/confirm',
        query: { path: 'from-inventory' },
      })
    },

    // On cancel click, clear the value
    onCancel(){ 
      this.$emit('clearValue')
    },

    handleDiscard() {
      this.$bvModal.show('discard')
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
@import '~/assets/css/_typography'
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
