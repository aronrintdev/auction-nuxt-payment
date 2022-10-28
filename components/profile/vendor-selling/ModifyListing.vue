<template>
  <div class="create-listing-form-wrapper">
    <!-- Large screen -->

    <div
      v-if="!isScreenXS"
      class="d-flex justify-content-between align-items-center mt-3"
    >
      <h2 class="title">{{ product.name }}</h2>
      <span role="button" @click="moveBack">
        <img
          :src="require('~/assets/img/icons/arrow-back.svg')"
          class="img-fluid"
        />
        {{ $t('create_listing.back_to_listing') }}
      </span>
    </div>
    <!-- Large screen ends -->

    <!-- Large screen -->
    <div v-if="!isScreenXS" class="section-product-details">
      <div class="mt-2">{{ $t('common.sku') }}: {{ product.sku }}</div>
      <div class="mt-2">{{ $t('common.color') }}: {{ product.colorway }}</div>
    </div>
    <!-- Large screen ends -->

    <!-- Nav Bar for mobile -->
    <div v-if="isScreenXS" class="row mobile-nav-row">
      <div class="col-12 mobile-nav-col">
        <nav-group
          v-model="selectedCategory"
          :data="visibleCategories"
          nav-key="category"
          class="create-selling-details-nav"
        />
      </div>
      <div class="col-12 mobile-nav-price-col">
        <div class="price-section w-100 mt-2">
          <div :class="selectedCategory == buy && 'active'">
            {{ lowestPrice | toCurrency }}
          </div>
          <div :class="selectedCategory == offer && 'active'">
            {{ highestOffer | toCurrency }}
          </div>
        </div>
      </div>
    </div>
    <!-- Nav Bar for mobile -->

    <!-- Product thumbnail -->
    <ProductThumb
      v-if="!has360Images"
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
    <!-- Product thumbnail ends -->

    <!-- Product thumbnail 360 -->
    <ProductImageViewerMagic360
      v-if="has360Images"
      class="360-image-viewer"
      :product="product"
    />

    <div v-if="has360Images" class="row">
      <div class="col-12">
        <span class="float-right">
          <img
            :src="require('~/assets/img/icons/360.svg')"
            alt="360 view icon"
          />
        </span>
      </div>
    </div>
    <!-- Product thumbnail 360 ends -->

    <!-- Product details responsive -->
    <div v-if="isScreenXS" class="row product-details-responsive mt-4">
      <div class="col-12">
        <div class="product-name">
          {{ product.name }}
        </div>
      </div>
      <div class="col-12">
        <div class="product-last-sale">
          <span class="last-sale-title"
            >{{ $t('product_page.last_sale') }}&colon;
            <!-- TODO: Harcoded for now. -->
            </span
          >
          <span v-if="lastAmount" class="last-sale-amount">{{ lastAmount }}</span
          ><!-- TODO: Harcoded for now. -->
          <span v-if="avgAmount && avgType" class="last-sale-indicators" :class="avgType === 'down' ? 'text-danger' : 'text-sucess'">
            {{ avgAmount | toCurrency('USD', 'N/A') }}
          </span>
        </div>
      </div>
    </div>
    <!-- Product details responsive ends -->

    <div class="mt-2 mx-auto section-product-size">
      <div v-if="!isScreenXS" class="d-flex align-items-end">
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
        :view-mode="sizeViewMode"
        class="size-picker"
        @update="handleSizeChange"
        @changeViewMode="handleSizeViewModeChange"
      />
      <!-- ./SizePicker -->
    </div>

    <!-- Box Condition Section Responsive -->
    <div v-if="isScreenXS" class="row box-condition-responsive mt-4">
      <div class="col-12">
        <div class="box-condition-title d-flex justify-content-center">
          {{ $t('common.box_condition') }}
          <span class="info-icon" role="button">
            <img
              :src="require('~/assets/img/icons/info-dark-blue.svg')"
              alt="more-info"
              width="12"
            />
          </span>
        </div>
      </div>

      <div class="col-12 box-condition-select-col mt-3">
        <FormDropdown
          id="box-condition-dropdown"
          :value="value.boxCondition"
          :items="packagingConditions"
          class="dropdown-filters d-flex justify-content-center"
          :icon-arrow-up="arrowDownIcon"
          :icon-arrow-down="arrowDownIcon"
          @input="handlePackagingConditionChange"
        />
      </div>
    </div>
    <!-- Box Condition Section Responsive ends -->

    <div
      v-if="!isScreenXS"
      class="mt-4 mx-auto section-meter bg-white px-3 py-2"
    >
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
    <b-row
      v-if="!isScreenXS"
      class="section-form-fields d-flex justify-content-center m-auto"
    >
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
      <div class="col-xs-12 col-md-4 px-md-4 mt-3">
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
              amount: minOfferMinVal,
            })
          }}
        </div>
      </div>
      <!-- ./MinOffer Amount -->
    </b-row>

    <b-row
      v-if="!isScreenXS && typeof action === 'string' && action === 'edit'"
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
      <Button pill variant="outline-primary" class="mt-3" @click="moveBack">
        {{ $t('inventory.discard_changes') }}
      </Button>
    </b-row>
    <!-- End of Inputs -->

    <!-- Responsive -->
    <!-- Inputs Responsive -->
    <div v-if="isScreenXS" class="row responsive-inputs-row mt-3">
      <!-- Minimum offer -->
      <div class="col-6 input-col">
        <FormInput
          :id="
            (value.minOfferAmount !== null &&
              value.minOfferAmount <= minOfferMinVal &&
              'error-responsive') ||
            'form-input-responsive'
          "
          :value="value.minOfferAmount"
          :placeholder="$t('createlisting.enter_min_offer')"
          :label="$t('createlisting.minOfferAmount')"
          class="input-form input-error"
          required
          :pill="false"
          integer
          @input="handleMinOfferPriceChange"
        />
        <span v-if="value.minOfferAmount">
          <small class="text-danger">
            {{ minOfferError }}
          </small>
        </span>
      </div>
      <!-- Minimum offer ends -->
      <!-- Quantity -->
      <div class="col-6 input-col">
        <FormInput
          :id="
            ((value.quantity < quantityMinVal ||
              value.quantity > quantityMaxVal) &&
              'error-responsive') ||
            'form-input-responsive'
          "
          :value="value.quantity"
          :placeholder="$t('common.quantity')"
          :label="$t('common.quantity')"
          class="input-form input-error"
          required
          :pill="false"
          integer
          @input="handleQuantityChange"
        />
        <span>
          <small class="text-danger">
            {{ quantityError }}
          </small>
        </span>
      </div>
      <!-- Quantity ends -->
    </div>
    <!-- Minimum offer/ Quantity ends -->

    <div
      v-if="isScreenXS"
      id="responsive-inputs-row"
      class="row responsive-inputs-row mt-3"
    >
      <!-- Price -->
      <div class="col-12 input-col">
        <FormInput
          id="form-input-responsive"
          :value="value.price"
          :placeholder="$t('create_listing.amount_box_placeholder')"
          :label="$t('inventory.your_price')"
          class="input-form input-error"
          :class="
            value.price !== null &&
            value.price <= priceMinVal &&
            'error-responsive'
          "
          required
          :pill="false"
          integer
          @input="handlePriceChange"
        />
        <span v-if="value.price">
          <small class="text-danger">
            {{ priceError }}
          </small>
        </span>
      </div>
      <!-- Price -->
    </div>
    <!-- Inputs Responsive ends -->

    <!-- Product details block -->
    <div v-if="isScreenXS" class="row responsive-product-details-block mt-3">
      <div class="col-12 product-details-block-col">
        <div class="product-details-block d-flex justify-content-between px-3">
          <span class="product-details-row my-auto">{{
            $t('products.product_details')
          }}</span>
          <span class="img-icon-down my-auto">
            <img
              :src="require('~/assets/img/icons/arrow-down-dark-blue.svg')"
              alt="dropdown-caret-down"
            />
          </span>
        </div>
      </div>
    </div>

    <!-- Product details block responsive -->
    <SellingLatestSales
      v-if="isScreenXS"
      :value="product.latest_sales"
      :sku="product.sku"
    />
    <!-- Product details chart ends -->

    <!-- Add listing button responsive -->

    <div v-if="isScreenXS" class="row justify-content-between">
      <div class="col">
        <Button
          pill
          variant="discard-blue"
          class="mt-3"
          @click="showDiscardConfirmSheet"
        >
          {{ $t('inventory.discard_changes') }}
        </Button>
      </div>
      <div class="col">
        <Button
          variant="save-changes"
          pill
          :disabled="!isFormValid"
          :class="!isFormValid && 'disabled'"
          class="mt-3 mr-3"
          @click="handleEditClick"
        >
          {{ $t('inventory.save_changes') }}
        </Button>
      </div>
    </div>

    <!-- Add listing button responsive ends -->
    <!-- Responsive ends -->

    <!-- On save changes click -->
    <ModifyListingConfirm
      id="modify-listing-confirm"
      :heading="$t('selling_page.edit_listing_heading')"
      :text="$t('selling_page.edit_listing_text')"
      @hidden="emitEditSuccess"
      @success="$emit('success')"
    ></ModifyListingConfirm>
    <!-- End of On save changes click -->

    <!-- Discard confirm -->
    <MobileBottomSheet
      id="discard-confirm-sheet"
      ref="discardConfirmBottomSheet"
      class="mobile-bottom-sheet"
      :hasHeaderDivider="false"
      :height="`27%`"
      :open="discardConfirm"
      :title="``"
      @closed="closeDiscardConfirmSheet"
      @opened="$emit('opened')"
    >
      <div class="row px-5 mb-3">
        <div class="col">
          <div class="cancel-confirm-text">
            {{ $t('createlisting.sell_listing_modify_discard') }}
          </div>
        </div>
      </div>
      <b-button
        variant="discard-confirm"
        class="
          confirm-btn
          align-items-center
          text-align-center
          d-flex
          justify-content-center
          m-auto
        "
        @click="confirmDiscardSheet"
      >
        {{ $t('common.discard') }}
      </b-button>
      <b-button
        variant="discard-cancel"
        class="
          confirm-btn
          align-items-center
          text-align-center
          cancel-button
          d-flex
          justify-content-center
          m-auto
        "
        @click="closeDiscardConfirmSheet"
      >
        {{ $t('common.cancel') }}
      </b-button>

      <div class="text-center position-absolute w-100 bottom-indicator">
        <img
          :src="require('~/assets/img/icons/home_indicator.svg')"
          alt="footer-icon"
        />
      </div>
    </MobileBottomSheet>
    <!-- Discard confirm sheet -->

    <!-- Discard confirm -->
    <MobileBottomSheet
      id="edit-confirm-sheet"
      ref="editConfirmBottomSheet"
      class="mobile-bottom-sheet"
      :hasHeaderDivider="false"
      :height="`40%`"
      :open="editConfirm"
      :title="``"
      @closed="closeEditConfirmSheet"
      @opened="$emit('opened')"
    >
      <div class="row px-5 mb-5">
        <div class="col-12">
          <div class="cancel-confirm-text">
            {{ $t('createlisting.change_listing') }}
          </div>
        </div>
        <div class="col-12">
          <div class="cancel-confirm-text">
            {{ $t('createlisting.all_active_offers_will_be_lost') }}
          </div>
        </div>
      </div>
      <b-button
        variant="discard-confirm"
        class="
          confirm-btn
          align-items-center
          text-align-center
          d-flex
          justify-content-center
          m-auto
        "
        @click="saveConfirmChanges"
      >
        {{ $t('common.save_changes') }}
      </b-button>
      <b-button
        variant="discard-cancel"
        class="
          confirm-btn
          align-items-center
          text-align-center
          cancel-button
          d-flex
          justify-content-center
          m-auto
        "
        @click="closeDiscardConfirmSheet"
      >
        {{ $t('common.cancel') }}
      </b-button>

      <div class="text-center position-absolute w-100 bottom-indicator">
        <img
          :src="require('~/assets/img/icons/home_indicator.svg')"
          alt="footer-icon"
        />
      </div>
    </MobileBottomSheet>
    <!-- Discard confirm sheet -->

    <!-- Discard confirm -->
    <AlertModal
      id="discard-message-modal"
      :message="$t('createlisting.confirm_discard_text')"
      icon="trash-red-bg"
      auto-hide
      :auto-hide-timeout="MODAL_FADE_TIMEOUT"
      @hidden="onSavedModalHidden"
    />
    <!-- Discard confirm ends -->
    <!-- Edit Success confirm -->
    <AlertModal
      id="edit-message-modal"
      :message="$t('createlisting.editsuccess')"
      icon="success-tick"
      auto-hide
      :auto-hide-timeout="MODAL_FADE_TIMEOUT"
      @hidden="$emit('success')"
    />
    <!-- Edit Success confirm ends -->
  </div>
</template>

<script>
import _ from 'lodash'
import ModifyListingConfirm from './ModifyListingConfirm.vue'
import SellingLatestSales from '~/components/profile/create-listing/selling/SellingLatestSales.vue'
import ProductSizePicker from '~/components/product/SizePicker'
import {
  Meter,
  FormInput,
  FormDropdown,
  Button,
  NavGroup,
} from '~/components/common'
import {
  QUANTITY_MIN_VAL,
  QUANTITY_MAX_VAL,
  PRICE_MIN_VAL,
  MINOFFER_MIN_VAL,
  API_PROD_URL,
  TYPE_BUY,
  TYPE_OFFER
} from '~/static/constants'
import screenSize from '~/plugins/mixins/screenSize'
import arrowDownIcon from '~/assets/img/icons/arrow-down-dark-blue.svg'
import ProductImageViewerMagic360 from '~/components/product/ImageViewerMagic360'
import MobileBottomSheet from '~/components/mobile/MobileBottomSheet.vue'
import { AlertModal } from '~/components/modal'
export default {
  name: 'ModifyListing',

  components: {
    ProductSizePicker,
    Meter,
    FormInput,
    FormDropdown,
    Button,
    ModifyListingConfirm,
    NavGroup,
    ProductImageViewerMagic360,
    SellingLatestSales,
    MobileBottomSheet,
    AlertModal,
  },
  mixins: [screenSize],
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
      default: null,
    },
  },

  data() {
    return {
      quantityMinVal: QUANTITY_MIN_VAL,
      quantityMaxVal: QUANTITY_MAX_VAL,
      priceMinVal: PRICE_MIN_VAL,
      minOfferMinVal: MINOFFER_MIN_VAL,
      visibleCategories: [
        {
          label: this.$t('products.lowest_price'),
          value: 'buy',
        },
        {
          label: this.$t('products.highest_offer'),
          value: 'offer',
        },
      ],
      selectedCategory: 'buy',
      listedPrice: '',
      arrowDownIcon,
      selectedSize: '',
      selectedCondition: '',
      apiProdUrl: API_PROD_URL,
      sizeViewMode: 'carousel',
      discardConfirm: false,
      editConfirm: false,
      MODAL_FADE_TIMEOUT: 2000,
      avgAmount: '',
      avgType: '',
      lastAmount: '',
      buy: TYPE_BUY,
      offer: TYPE_OFFER
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

    has360Images() {
      return this.product && this.product.has360Images
    },

    lowestPrice: (vm) => {
      const val = vm.product.lowest_prices.find(
        (i) =>
          i.size_id === vm.selectedSize &&
          i.packaging_condition_id === vm.selectedCondition
      )
      return val && val.price
    },

    highestOffer: (vm) => {
      const val = vm.product.highest_offers.find(
        (i) =>
          i.size_id === vm.selectedSize &&
          i.packaging_condition_id === vm.selectedCondition
      )
      return val && val.price
    },

    quantityError: (vm) => {
      if (
        vm.quantityMinVal > vm.value.quantity ||
        vm.value.quantity > vm.quantityMaxVal
      ) {
        return vm.$t('inventory.message.between', {
          field: vm.$t('common.quantity').toLowerCase(),
          min: vm.quantityMinVal,
          max: vm.quantityMaxVal,
        })
      }
    },

    minOfferError: (vm) => {
      if (
        vm.value.minOfferAmount === null ||
        vm.value.minOfferAmount <= vm.minOfferMinVal
      ) {
        return vm.$t('inventory.message.gt_than', {
          field: vm.$t('common.price').toLowerCase(),
          amount: vm.minOfferMinVal,
        })
      }
    },

    priceError: (vm) => {
      if (vm.value.price !== null && vm.value.price <= vm.priceMinVal) {
        return vm.$t('inventory.message.gt_than', {
          field: vm.$t('common.price').toLowerCase(),
          amount: vm.priceMinVal,
        })
      }
    },
  },

  methods: {
    // On back icon click
    moveBack() {
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
      if (!this.isScreenXS) {
        this.$bvModal.show('modify-listing-confirm')
      } else {
        this.editConfirm = true
      }
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
        }

        this.$store.dispatch('sell-now/addItem', sellNowData)
        this.$router.push('/checkout/sell-now')
      }
    },

    handleSizeViewModeChange(mode) {
      this.sizeViewMode = mode
    },

    showDiscardConfirmSheet() {
      this.discardConfirm = true
    },

    confirmDiscardSheet() {
      this.closeDiscardConfirmSheet()
      this.$bvModal.show('discard-message-modal')
    },

    closeDiscardConfirmSheet() {
      this.discardConfirm = false
    },

    onSavedModalHidden() {
      this.moveBack()
    },

    closeEditConfirmSheet() {
      this.editConfirm = false
    },

    saveConfirmChanges() {
      this.closeEditConfirmSheet()
      this.$bvModal.show('edit-message-modal')
    },

    // Show the up/down
    latestPrice({ amount, type }){
      this.avgAmount = amount
      this.avgType = type
    }
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

@media (max-width: 576px)
  .create-listing-form-wrapper::v-deep
    .product-thumbnail
      width: 240px
      .overlay
        display: none
    .box-condition-responsive
      .box-condition-title
        font-family: $font-montserrat
        font-style: normal
        @include body-5-medium
        color: $color-black-1
    .btn-discard-blue
      border: 1px solid $color-blue-19
      border-radius: 20px
      font-family: $font-montserrat
      font-style: normal
      @include body-21-medium
      display: flex
      align-items: center
      text-align: center
      color: $color-blue-19
    .btn-save-changes
      background: $color-black-1
      border-radius: 20px
      font-family: $font-montserrat
      font-style: normal
      @include body-21-medium
      display: flex
      align-items: center
      text-align: center
      color: $color-white-1
    .responsive-product-details-block
      .product-details-block-col
        .product-details-block
          height: 56px
          left: 15.5px
          top: 977px
          background: $color-white-1
          box-shadow: 0px -0.1px 2px $color-gray-th-43, 0px 1px 2px $color-gray-th-43
          border-radius: 8px
          font-family: $font-montserrat
          font-style: normal
          @include body-5-medium
          color: $color-black-1
    .add-listing-btn
      background: $color-black-1
      border-radius: 20px
      color: $color-white-1
    .mobile-nav-row
      .mobile-nav-price-col
        .price-section
          display: inline-flex
          justify-content: space-around
          font-family: $font-montserrat
          font-style: normal
          @include body-17-medium
          display: flex
          align-items: center
          letter-spacing: -0.04em
          color: $color-gray-47
          .active
            font-family: $font-montserrat
            font-style: normal
            @include body-17-medium
            display: flex
            align-items: center
            text-align: center
            letter-spacing: -0.04em
            color: $color-black-1
    .product-details-responsive
      .product-name
        font-family: $font-montserrat
        font-style: normal
        @include body-3-medium
        display: flex
        align-items: center
        color: $color-black-1
      .product-last-sale
        .last-sale-title
          font-family: $font-montserrat
          font-style: normal
          @include body-5-normal
          color: $color-gray-6
        .last-sale-amount
          font-family: $font-montserrat
          font-style: normal
          @include body-5-normal
          color: $color-gray-6
        .last-sale-indicators
          font-family: $font-montserrat
          font-style: normal
          @include body-9-normal
          color: $color-green-26
    .product-size-select-row
      .select-size-title
        font-family: $font-montserrat
        font-style: normal
        @include body-21-regular
        display: flex
        align-items: center
        text-align: center
        color: $color-black-1
      .all-sizes-option
        font-family: $font-montserrat
        font-style: normal
        @include body-21-regular
        display: flex
        align-items: center
        text-align: center
        color: $color-black-1
    .box-condition-responsive
      .box-condition-title
        font-family: $font-montserrat
        font-style: normal
        @include body-21-medium
        color: $color-black-1

#form-input-responsive::v-deep
  .input-label
    margin-bottom: 3px
  input
    height: 49px
    left: 16px
    top: 804px
    border: 1px solid $white-5
    &::placeholder
      font-family: $font-montserrat
      font-style: normal
      @include body-9-medium
      color: $color-gray-23
#error-responsive::v-deep
  .input-label
    margin-bottom: 3px
  input
    height: 49px
    left: 16px
    top: 804px
    border: 1px solid $color-red-3
.responsive-inputs-row::v-deep
  .input-col
    .form-input-wrapper
      .input-label
        font-family: $font-montserrat
        font-style: normal
        @include body-9-medium
        color: $color-black-1
.box-condition-select-col::v-deep
  #dropdown-container-box-condition-dropdown
    #btn-dropdown-box-condition-dropdown
      div
        font-family: $font-montserrat
        font-style: normal
        @include body-5-normal
        display: flex
        align-items: center
        text-align: center
        color: $color-blue-20
        justify-content: center
.box-condition-select-col::v-deep
  .form-dropdown-wrapper
    .btn-dropdown
      border: 1px solid $color-black-1
      border-radius: 0
      width: 315px
      height: 37px
    .form-input
      .bg-white
        position: absolute
        width: 152px
        height: 49px
        left: 16px
        top: 804px
        border: 1px solid $white-5
        border-radius: 10px
    .search-results
      .popover-body > div:last-child
        border-bottom-left-radius: 0
        border-bottom-right-radius: 0
#discard-confirm-sheet::v-deep,
#edit-confirm-sheet::v-deep
  .cancel-confirm-text
    font-family: $font-sp-pro
    font-style: normal
    @include body-17-normal
    text-align: center
    color: $color-black-1
  .btn-discard-confirm
    background: $color-blue-20
    border-radius: 21px
    font-family: $font-sp-pro
    font-style: normal
    @include body-13-medium
    color: $color-white-1
    width: 216px
    height: 40px
    left: 80px
    top: 709px
  .btn-discard-cancel
    font-family: $font-sp-pro
    font-style: normal
    @include body-17-medium
    color: $color-blue-20
</style>
