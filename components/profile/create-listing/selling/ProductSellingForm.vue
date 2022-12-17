<template>
  <div class="row">
    <div
      v-if="['apparel', 'accessories'].includes(product.category.name.toLowerCase())"
      class="col-12 col-md-6 mt-3"
      :class="isScreenXS ? 'input-col-mobile' : 'input-col'">
      <FormInput :value="value.quantity"
                 :placeholder="$t('createlisting.enter_min_offer_amount')"
                 :label="$t('createlisting.min_offer_amount')"
                 class="input"
                 :class="{'input-error': value.minOfferAmount !== null && value.minOfferAmount <= minOfferMinVal}"
                 prefix="$"
                 required
                 integer
                 @input="handleMinOfferPriceChange" />
      <div v-if="value.minOfferAmount !== null && value.minOfferAmount <= minOfferMinVal" class="error-text mt-1">
        {{
          value.minOfferAmount === null ||
          $t('inventory.message.gt_than', {
            field: $t('common.price').toLowerCase(),
            amount: minOfferMinVal,
          })
        }}
      </div>
    </div>
    <div
      v-if="!['apparel', 'accessories'].includes(product.category.name.toLowerCase())"
      class="col-12 col-md-6 mt-3"
      :class="isScreenXS ? 'input-col-mobile' : 'input-col'"
    >
      <FormInput
        :value="value.minOfferAmount"
        :placeholder="$t('createlisting.enter_min_offer_amount')"
        :label="$t('createlisting.min_offer_amount')"
        prefix="$"
        class="input"
        :class="{'input-error': value.minOfferAmount !== null &&
                                (value.minOfferAmount <= minOfferMinVal) ||
                                (value.minOfferAmount > value.price)
        }"
        required
        integer
        @input="handleMinOfferPriceChange"
      />
      <div
        v-if="value.minOfferAmount !== null && value.minOfferAmount <= minOfferMinVal" class="error-text mt-1">
        {{
          value.minOfferAmount === null ||
          $t('inventory.message.gt_than', {
            field: $t('common.price').toLowerCase(),
            amount: minOfferMinVal,
          })
        }}
      </div>
      <div
        v-if="value.minOfferAmount !== null && value.minOfferAmount > value.price" class="error-text mt-1">
        {{ $t('inventory.message.offer_gth_than_price') }}
      </div>
    </div>
    <div
      class="col-12 col-md-6 mt-3"
      :class="isScreenXS ? 'input-col-mobile' : 'input-col'"
    >
      <FormInput
        :value="value.quantity"
        :placeholder="$t('inventory.enter_quantity')"
        :label="$t('common.quantity')"
        class="input"
        :class="{'input-error': value.quantity < quantityMinVal || value.quantity > quantityMaxVal}"
        required
        integer
        @input="handleQuantityChange"
      />
      <div v-if="value.quantity < quantityMinVal || value.quantity > quantityMaxVal" class="error-text mt-1">
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
    <div
      class="col-12 col-md-6 mt-4"
      :class="isScreenXS ? 'input-col-mobile' : 'input-col'"
    >
      <FormInput
        :value="value.price"
        :placeholder="$t('create_listing.your_listing_price_placeholder')"
        :label="$t('create_listing.your_listing_price')"
        prefix="$"
        class="input"
        :class="{'input-error': value.price !== null && value.price <= priceMinVal}"
        required
        number
        @input="handlePriceChange"
      />
      <div v-if="value.price !== null && value.price <= priceMinVal" class="error-text mt-1">
        {{
          value.price > priceMinVal ||
          $t('inventory.message.gt_than', {
            field: $t('common.price').toLowerCase(),
            amount: priceMinVal,
          })
        }}
      </div>
    </div>
    <!-- year and color options -->
    <template  v-if="['apparel', 'accessories'].includes(product.category.name.toLowerCase())">
      <div
        class="col-12 col-md-6 mt-3"
        :class="isScreenXS ? 'input-col-mobile' : 'input-col'"
      >
        <FormDropdown
          :value="value.color"
          :placeholder="$t('createlisting.select_color')"
          :label="$t('common.color')"
          :items="colors"
          class="input"
          required
          @input="handleColorChange"

        />
      </div>
      <div
        class="col-12 col-md-6 mt-3"
        :class="isScreenXS ? 'input-col-mobile' : 'input-col'"
      >
        <FormInput
          :value="``"
          :placeholder="$t('createlisting.enter_year')"
          :label="$t('common.year')"
          class="input"
          :class="{'input-error': value.price !== null && value.price <= priceMinVal}"
          required
          number
          @input="handleYearChange"
        />
      </div>
    </template>
    <div
      v-if="typeof action === 'string' && action === 'add'"
      class="col-12 mt-3" :class="isScreenXS ? 'input-col-mobile' : 'input-col'">
      <Button class="mt-3 w-100"
              variant="dark"
              :disabled="!isFormValid"
              :class="{'py-4' : !isScreenXS}"
              @click="$emit('submit')">{{ $t('createlisting.add_listing') }}</Button>
    </div>
    <div
      v-if="typeof action === 'string' && action === 'edit'"
      class="col-12 mt-3" :class="isScreenXS ? 'input-col-mobile' : 'input-col'">
      <Button
        variant="dark"
        :disabled="!isFormValid"
        class="mt-3 mr-3 w-100"
        :class="{'py-4' : !isScreenXS}"
        @click="handleEditClick"
      >
        {{ $t('inventory.save_changes') }}
      </Button>
      <Button
        variant="outline-primary"
        class="mt-3 w-100"
        :class="{'py-4' : !isScreenXS}"
        @click="handleDiscard"
      >
        {{ $t('inventory.discard_changes') }}
      </Button>
    </div>
    <div v-if="isScreenXS && selectedCategory === offer"
      class="col-12 mt-3" :class="isScreenXS ? 'input-col-mobile' : 'input-col'">
      <Button
        variant="dark"
        :disabled="!isFormValid"
        class="mt-3 mr-3 w-100"
        :class="{'py-4' : !isScreenXS}"
        @click="handleSellNow"
      >
        {{ $t('sell_now.sell_now') }}&colon;
        {{ highestOffer | toCurrency('USD', 'N/A') }}
      </Button>
      <Button
        variant="outline-primary"
        class="mt-3 w-100"
        :class="{'py-4' : !isScreenXS}"
        @click="handleDiscard"
      >
        {{ $t('inventory.discard_changes') }}
      </Button>
    </div>
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
    <!-- Modal popup ends here -->

  </div>
</template>
<script>

import { Button, FormInput, FormDropdown } from '~/components/common'
import { AlertModal, ConfirmModal } from '~/components/modal'
import screenSize from '~/plugins/mixins/screenSize'
import {MINOFFER_MIN_VAL, PRICE_MIN_VAL, QUANTITY_MAX_VAL, QUANTITY_MIN_VAL, TYPE_OFFER} from '~/static/constants'

export default {
  name: 'ProductSellingForm',
  components: {
    FormInput,
    Button,
    FormDropdown,
    AlertModal,
    ConfirmModal
  },
  mixins: [screenSize],
  props: {
    product: {
      type: Object,
      required: true,
    },
    value: {
      type: Object,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      minOfferMinVal: MINOFFER_MIN_VAL,
      quantityMinVal: QUANTITY_MIN_VAL,
      quantityMaxVal: QUANTITY_MAX_VAL,
      priceMinVal: PRICE_MIN_VAL,
      avgAmount: '',
      avgType: '',
      selectedCategory: 'buy',
      offer: TYPE_OFFER,
    }
  },
  computed: {
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
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    highestOffer: (vm) => {
      const val = vm.product.highest_offers.find(
        (i) =>
          i.size_id === vm.selectedSize &&
          i.packaging_condition_id === vm.selectedCondition
      )
      return val && val.price
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
    handleSizeChange(value) {
      this.$emit('input', { ...this.value, currentSize: value })
    },

    handleQuantityChange(value) {
      this.$emit('input', { ...this.value, quantity: value })
    },

    handlePriceChange(value) {
      this.$emit('input', { ...this.value, price: value })
    },
    handleMinOfferPriceChange(value) {
      this.$emit('input', { ...this.value, minOfferAmount: value })
    },
    // Color input on change.
    handleColorChange(value) {
      this.$emit('input', { ...this.value, color: value })
    },
    // TODO
    handleYearChange(value) {
      return null
    },
    handleEditClick() {
      this.$bvModal.show('save-listing-success')
    },

    // On confirm disacard
    onConfirm() {
      this.$bvModal.show('discard-confirm')
    },

    emitEditSuccess() {
      this.$emit('submit')
    },

    handleDiscard() {
      this.$bvModal.show('discard')
    },

    handleMethodNavClick(selected) {
      if (selected) {
        this.selectedCategory = selected
      }
    },
    // On cancel discard
    onCancelDiscard() {
      this.$router.push({
        path: '/profile/create-listing/selling/confirm',
        query: { path: 'from-inventory' },
      })
    },

    // On cancel click, clear the value
    onCancel() {
      this.$emit('clearValue')
    },

    // On sell now click
    handleSellNow() {
      // If the user is not a vendor then we will redirect user to vendor hub apply page
      if (this.isAuthenticated && !this.isVendor) {
        this.$router.push('/profile/vendor-hub')
        return true
      }

      // If no highest offer is placed.
      if (!this.highestOffer) {
        this.$toasted.error(this.$t('sell_now.no_offer'))
        return false
      }

      // If no listing or
      // If the currently listing inventory's vendor id doesnot matches the logged in vendor id,
      // then create listing with inventory.

      this.checkItemExistforVendor({
        productID: this.product.id,
        sizeId: this.selectedSize,
        packagingConditionId: this.selectedCondition,
        offerAmount: this.highestOffer,
      })
        .then((res) => {
          this.$store
            .dispatch('sell-now/selectedItem', res.data.data)
            .then(() => {
              this.moveToSellNow()
            })
          return true
        })
        .catch((err) => {
          this.$logger.logToServer(
            'Sell now create inventory and listing error',
            err.response
          )
          this.$nuxt.refresh()
        })
    },

    moveToSellNow() {
      if (
        this.getSelectedItemforVendor &&
        this.getSelectedItemforVendor.product &&
        this.authenticated &&
        this.isVendor
      ) {
        const sellNowData = {
          id: this.getSelectedItemforVendor.product_id,
          size: this.getSelectedItemforVendor.size,
          size_id: this.getSelectedItemforVendor.size_id,
          name: this.getSelectedItemforVendor.product.name,
          product: this.getSelectedItemforVendor.product,
          brand: this.getSelectedItemforVendor.product.brand,
          sku: this.getSelectedItemforVendor.product.sku,
          colorWay: this.getSelectedItemforVendor.product.colorway,
          image: `${this.apiProdUrl}/${this.getSelectedItemforVendor.product.category.name}/${this.getSelectedItemforVendor.product.sku}/image`,
          quantity: 1,
          packaging_condition:
            this.product.packaging_conditions[
            this.getSelectedItemforVendor.packaging_condition_id - 1
              ],
          packaging_condition_id: this.selectedCondition,
          price: this.getSelectedItemforVendor.sale_price,
          listing_item_id: this.getSelectedItemforVendor.listing_items[0].id,
          highestOffer: this.highestOffer,
          selectedOfferId: this.highestOfferId
        }

        this.$store.dispatch('sell-now/addItem', sellNowData)
        this.$router.push('/checkout/sell-now')
      }
    },

    // Show the up/down
    latestPrice({ amount, type }) {
      this.avgAmount = amount
      this.avgType = type
    },
  }
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.input-col::v-deep
  .input-label
    font-family: $font-montserrat
    font-style: normal
    @include body-8-normal
    color: $color-black-1
    margin-left: 0px!important
    text-transform: uppercase
    margin-bottom: 16px
  .input
    .form-input, .dropdown-btn
      border-radius: 4px!important
      height: 40px
      left: 16px
      border: 1px solid $color-blue-20
      &::placeholder
        font-family: $font-montserrat
        font-style: normal
        @include body-8-normal
        font-weight: normal
        color: $color-gray-23
    .dropdownItem
      border-radius: 0px!important
  .error-text
    @include body-5-regular
    display: block
    color: $color-red-3

  .button
    background: $color-black-1
    border-radius: 20px
    color: $color-white-1

  .input-error
    .form-input
      border-color: $color-red-3

  .error-text
    @include body-5-regular
    display: block
    color: $color-red-3

.input-col-mobile::v-deep
  .input-label
    margin-bottom: 3px
    font-family: $font-montserrat
    font-style: normal
    @include body-9-medium
    color: $color-black-1
  .input
    .form-input, .dropdown-btn
      height: 49px
      left: 16px
      top: 804px
      border: 1px solid $white-5
      border-radius: 4px!important
      &::placeholder
        font-family: $font-montserrat
        font-style: normal
        @include body-9-medium
        color: $color-gray-23
    .dropdownItem
      border-radius: 0px !important
  .error-text
    @include body-5-regular
    display: block
    color: $color-red-3

  .button
    background: $color-black-1
    border-radius: 20px
    color: $color-white-1

  .input-error
    .form-input
      border-color: $color-red-3

  .error-text
    @include body-5-regular
    display: block
    color: $color-red-3
</style>
