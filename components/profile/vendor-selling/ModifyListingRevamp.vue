<template>
  <div class="create-listing-form-wrapper">
    <span
      v-if="!isScreenXS"
      class="backToSearch body-13"
      role="button"
      @click="moveBack"
    >
      <img
        :src="require('~/assets/img/icons/arrow-left-gray.svg')"
        class="img-fluid"
      />
      {{ $t('common.back') }}
    </span>

    <b-row>
      <b-col v-if="!isScreenXS" md="6" offset-md="6" sm="12" class="mt-38">
        <ProductTitleSec
          :lowest-price="lowestPrice ? lowestPrice : 0"
          :product="product"
          :product-color="product.colorway"
          :product-last-sale-price="
            lastSold && lastSold.sale_price ? lastSold.sale_price : 0
          "
          :product-name="product.name"
          class="mt-2"
        />
      </b-col>
      <b-col v-else md="6" sm="12">
        <!-- Nav Bar Mobile -->
        <div class="row mb-3">
          <div class="col-12">
            <nav-group
              v-model="selectedCategory"
              :data="visibleCategories"
              class="m-0 w-100 d-flex justify-content-center"
              nav-key="category"
            />
          </div>
          <div class="col-12">
            <div class="d-flex justify-content-center mt-2">
              <div
                :class="selectedCategory == buy && 'active text-black'"
                class="px-5 mx-3 text-gray-24 body-5-medium"
              >
                {{ lowestPrice | toCurrency }}
              </div>
              <div
                :class="selectedCategory == offer && 'active text-black'"
                class="px-5 mx-3 text-gray-24 body-5-medium"
              >
                {{ highestOffer | toCurrency }}
              </div>
            </div>
          </div>
        </div>
        <!-- Nav Bar Mobile end -->
      </b-col>
    </b-row>
    <b-row>
      <b-col md="6" sm="12">
        <!-- Product thumbnail -->
        <ProductThumb
          v-if="!has360Images"
          :product="product"
          class="product-thumbnail mx-auto align-items-center overflow-hidden mt-3"
        />
        <!-- Product thumbnail ends -->

        <!-- Product thumbnail 360 -->
        <ProductImageViewerMagic360
          v-if="has360Images"
          :product="product"
          class="image-viewer-three-sixty px-2"
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
      </b-col>
      <b-col md="6" sm="12">
        <!-- Nav Bar -->
        <div v-if="!isScreenXS" class="row">
          <div class="col-12 mt-4">
            <nav-group
              v-model="selectedCategory"
              :class="{
                'nav-408': !isScreenXS,
              }"
              :data="visibleCategories"
              class="m-0 w-100 d-flex justify-content-center"
              nav-key="category"
            />
          </div>
          <div class="col-12 d-flex justify-content-center">
            <div class="d-flex justify-content-center mt-3 web-prices">
              <div
                :class="selectedCategory == buy && 'active text-black'"
                class="w-100 text-center text-gray-24 body-1-medium"
              >
                {{ lowestPrice | toCurrency }}
              </div>
              <div
                :class="selectedCategory == offer && 'active text-black'"
                class="w-100 text-center text-gray-24 body-1-medium"
              >
                {{ highestOffer | toCurrency }}
              </div>
            </div>
          </div>
        </div>
        <!-- Nav Bar end -->

        <!-- Mobile product name begin -->
        <b-row v-else>
          <b-col md="6" sm="12">
            <ProductTitleSec
              :lowest-price="lowestPrice ? lowestPrice : 0"
              :product="product"
              :product-color="product.colorway"
              :product-last-sale-price="
                lastSold && lastSold.sale_price ? lastSold.sale_price : 0
              "
              :product-name="product.name"
              class="mt-5"
            />
          </b-col>
        </b-row>
        <!-- Mobile product name end -->

        <!-- SizePicker -->
        <div class="mt-2 mx-auto section-product-size">
          <!-- SizePicker -->
          <SizeCarouselResponsive
            v-if="isScreenXS"
            :prices="pricesBySize"
            :sizes="sizes"
            :value="value.currentSize"
            :view-mode="sizeViewMode"
            class="size-picker"
            @changeViewMode="handleSizeViewModeChange"
            @update="handleSizeChange"
          />
          <ProductSizePicker
            v-if="!isScreenXS"
            :prices="pricesBySize"
            :sizes="sizes"
            :value="value.currentSize"
            :view-mode="sizeViewMode"
            :card-style="{
              'background-color': '#F5F5F5',
            }"
            class="size-picker"
            iconClass="d-none"
            iconTextClass="text-color-blue-30"
            @changeViewMode="handleSizeViewModeChange"
            @update="handleSizeChange"
          />
          <!-- ./SizePicker -->
        </div>
        <!-- SizePicker ends -->

        <!-- Box Condition Section Responsive -->
        <div class="row box-condition-responsive mt-4 mb-4 px-2">
          <BoxConditionPicker
            :conditions="packagingConditions"
            :value="value.boxCondition"
            class="box-conditions m-0"
            @change="(obj) => handlePackagingConditionChange(obj.id)"
          />
        </div>
        <!-- Box Condition Section Responsive ends -->

        <!-- Inputs -->
        <div v-if="!isScreenXS" class="row section-form-fields m-auto mt-5">
          <!-- In case of Accessories / Apparel - Min Offer Amount -->
          <div
            v-if="
              ['apparel', 'accessories'].includes(
                product.category.name.toLowerCase()
              )
            "
            :class="
              value.minOfferAmount !== null &&
              value.minOfferAmount <= minOfferMinVal &&
              'error'
            "
            class="col-md-6 col-xs-12 input-col"
          >
            <FormInput
              :label="$t('createlisting.min_offer_amount')"
              :placeholder="$t('createlisting.enter_min_offer_amount')"
              :value="value.minOfferAmount"
              class="input-error"
              integer
              prefix="$"
              required
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

          <div
            v-if="
              !['apparel', 'accessories'].includes(
                product.category.name.toLowerCase()
              )
            "
            :class="
              value.minOfferAmount !== null &&
              value.minOfferAmount <= minOfferMinVal &&
              'error'
            "
            class="mt-3 col-md-6 col-xs-12 input-col"
          >
            <FormInput
              :label="$t('createlisting.min_offer_amount')"
              :placeholder="$t('createlisting.enter_min_offer_amount')"
              :value="value.minOfferAmount"
              class="input-error"
              integer
              prefix="$"
              required
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

          <!-- Quantity -->
          <div
            :class="
              (value.quantity < quantityMinVal ||
                value.quantity > quantityMaxVal) &&
              'error'
            "
            class="mt-3 col-md-6 col-xs-12 input-col"
          >
            <FormInput
              :label="$t('common.quantity')"
              :placeholder="$t('inventory.enter_quantity')"
              :value="value.quantity"
              class="input-error"
              integer
              required
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
            :class="
              value.price !== null && value.price <= priceMinVal && 'error'
            "
            class="mt-4 col-12 input-col"
          >
            <FormInput
              :label="$t('create_listing.your_listing_price')"
              :placeholder="$t('create_listing.your_listing_price_placeholder')"
              :value="value.price"
              class="input-error"
              number
              prefix="$"
              required
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

          <template
            v-if="
              ['apparel', 'accessories'].includes(
                product.category.name.toLowerCase()
              )
            "
          >
            <!-- Color -->
            <div class="mt-3 col-md-6 col-xs-12 input-col">
              <FormDropdown
                id="packaging-condition"
                :items="colors"
                :label="$t('common.color')"
                :placeholder="$t('createlisting.select_color')"
                :value="value.color"
                required
                @input="handleColorChange"
              />
            </div>
            <!-- End of Color -->

            <!-- Year -->
            <div class="mt-3 col-md-6 col-xs-12 input-col">
              <FormInput
                :label="$t('common.year')"
                :placeholder="$t('createlisting.enter_year')"
                :value="``"
                class="input-error"
                number
                required
                @input="handleYearChange"
              />
            </div>
            <!-- End of Year -->
          </template>
        </div>
        <div
          v-if="!isScreenXS && typeof action === 'string' && action === 'edit'"
          class="row section-form-fields d-flex justify-content-center px-3"
        >
          <Button
            :disabled="!isFormValid"
            class="mt-3 mr-3 flex-grow-1 submit-buttons"
            variant="dark"
            @click="handleEditClick"
          >
            {{ $t('inventory.save_changes') }}
          </Button>
          <Button
            class="mt-3 flex-grow-1 submit-buttons"
            variant="outline-dark"
            @click="handleDiscard"
          >
            {{ $t('inventory.discard_changes') }}
          </Button>
        </div>
        <!-- End of Inputs -->

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
              :label="$t('createlisting.minOfferAmount')"
              :pill="false"
              :placeholder="$t('createlisting.enter_min_offer')"
              :value="value.minOfferAmount"
              class="input-form input-error"
              integer
              required
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
              :label="$t('common.quantity')"
              :pill="false"
              :placeholder="$t('common.quantity')"
              :value="value.quantity"
              class="input-form input-error"
              integer
              required
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

        <div v-if="isScreenXS" class="row responsive-inputs-row mt-3">
          <!-- Price -->
          <div class="col-12 input-col">
            <FormInput
              id="form-input-responsive"
              :class="
                value.price !== null &&
                value.price <= priceMinVal &&
                'error-responsive'
              "
              :label="$t('create_listing.your_listing_price')"
              :pill="false"
              :placeholder="$t('create_listing.your_listing_price_placeholder')"
              :value="value.price"
              class="input-form input-error"
              integer
              required
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
      </b-col>
    </b-row>

    <div v-if="!isScreenXS" class="section-product-details mb-1">
      <div class="body-2-medium font-secondary text-black mb-1 mt-68">
        {{ $t('create_listing.product.product_details') }}
      </div>
      <hr />
      <b-row class="mt-40">
        <b-col md="6" sm="12">
          <b-row>
            <b-col class="text-black font-secondary py-1" cols="4"
              >{{ $t('common.sku') }}:
            </b-col>
            <b-col class="py-1" cols="8">{{ product.sku }}</b-col>
            <b-col class="text-black font-secondary py-1" cols="4"
              >{{ $t('common.color') }}:
            </b-col>
            <b-col class="py-1" cols="8">{{ product.colorway }}</b-col>
            <template v-if="product.retail_price">
              <b-col class="text-black font-secondary py-1" cols="4"
                >{{ $t('common.retail_price') }}:
              </b-col>
              <b-col class="py-1" cols="8"
                >{{ product.retail_price | formatPrice }}
              </b-col>
            </template>
            <template v-if="product.release_date">
              <b-col class="text-black font-secondary py-1" cols="4"
                >{{ $t('common.release_date') }}:
              </b-col>
              <b-col class="py-1" cols="8"
                >{{ product.release_date | formatDate }}
              </b-col>
            </template>
          </b-row>
        </b-col>
        <!-- TODO add this part when description added.
        <b-col sm="12" md="6" class="pt-3 pt-md-0 text-black">
          {{ $t('create_listing.product.description') }}
        </b-col>
        -->
      </b-row>
    </div>
    <div
      v-else
      class="rounded p-3 box-shadow mt-4"
      @click="mobileDetailsIsExpanded = !mobileDetailsIsExpanded"
    >
      <div class="d-flex justify-content-between">
        <span class="body-9-medium text-black">
          {{ $t('create_listing.product.product_details') }}
        </span>
        <img
          :class="{ rotate: mobileDetailsIsExpanded }"
          :src="require('~/assets/img/icons/arrow-down-dark-blue.svg')"
          width="12"
        />
      </div>
      <div v-if="mobileDetailsIsExpanded" class="mt-3">
        <div class="d-flex justify-content-between body-6-normal py-1">
          <div class="flex-grow-1">{{ $t('common.sku') }}:</div>
          <div>{{ product.sku }}</div>
        </div>
        <div class="d-flex justify-content-between body-9-normal py-1">
          <div class="flex-grow-1">{{ $t('common.color') }}:</div>
          <div>{{ product.colorway }}</div>
        </div>
        <div
          v-if="product.retail_price"
          class="d-flex justify-content-between body-6-medium py-1"
        >
          <div class="flex-grow-1">{{ $t('common.retail_price') }}:</div>
          <div>{{ product.retail_price | formatPrice }}</div>
        </div>
        <div
          v-if="product.release_date"
          class="d-flex justify-content-between body-6-medium py-1"
        >
          <div class="flex-grow-1">{{ $t('common.retail_price') }}:</div>
          <div>{{ product.release_date | formatDate }}</div>
        </div>
      </div>
    </div>

    <!-- Sales Graph and Sales Data Section -->
    <b-row v-if="product" class="my-5">
      <b-col md="12">
        <SalesSection :product="product" />
      </b-col>
    </b-row>
    <!-- End of Sales Graph and Sales Data Section -->

    <Button
      v-if="isScreenXS && action === 'edit'"
      :class="!isFormValid && 'disabled'"
      :disabled="!isFormValid"
      class="mt-3 add-listing-btn"
      variant="block"
      @click="handleEditClick"
    >
      {{ $t('inventory.save_changes') }}
    </Button>
    <!-- Add listing button responsive ends -->
    <!-- Modal popup -->
    <!-- On save changes click -->
    <AlertModal
      id="save-listing-success"
      :message="$t('inventory.message.saved')"
      auto-hide
      icon="tick"
      @hidden="emitEditSuccess"
    />
    <!-- End of On save changes click -->

    <!-- On discard changes -->
    <ConfirmModal
      id="discard"
      :confirmLabel="$t('common.discard')"
      :message="$t('createlisting.discard_changes')"
      @cancel="onCancel"
      @confirm="onConfirm"
    />
    <!-- End of On discard changes -->

    <!-- Discard confirm message -->
    <AlertModal
      id="discard-confirm"
      :message="$t('inventory.message.discarded')"
      auto-hide
      icon="trash"
      @hidden="onCancelDiscard"
    />
    <!-- Discard confirm message -->
    <!-- Modal popup ends here -->
    <ModifyListingConfirm
      id="modify-listing-confirm"
      :heading="$t('selling_page.edit_listing_heading')"
      :text="$t('selling_page.edit_listing_text')"
      @hidden="emitEditSuccess"
      @success="$emit('success')"
    ></ModifyListingConfirm>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapActions, mapGetters } from 'vuex'
import ModifyListingConfirm from './ModifyListingConfirm.vue'
import ProductSizePicker from '~/components/product/SizePicker'
import SizeCarouselResponsive from '~/components/profile/create-listing/SizeCarouselResponsive.vue'
import SalesSection from '~/components/product/SalesSection'

import {
  // Meter,
  FormInput,
  FormDropdown,
  Button,
  NavGroup,
} from '~/components/common'
import { AlertModal, ConfirmModal } from '~/components/modal'
import {
  QUANTITY_MIN_VAL,
  QUANTITY_MAX_VAL,
  PRICE_MIN_VAL,
  MINOFFER_MIN_VAL,
  API_PROD_URL,
  TYPE_BUY,
  TYPE_OFFER,
} from '~/static/constants'

import ProductImageViewerMagic360 from '~/components/product/ImageViewerMagic360'
import screenSize from '~/plugins/mixins/screenSize'
import arrowDownIcon from '~/assets/img/icons/arrow-down-dark-blue.svg'
import BoxConditionPicker from '~/components/product/BoxConditionPicker'
import ProductTitleSec from '~/components/profile/vendor-selling/details/ProductTitleSec'
import ProductThumb from '~/components/product/Thumb'

export default {
  name: 'ModifyListingRevamp',

  components: {
    ProductThumb,
    ProductTitleSec,
    ProductSizePicker,
    ModifyListingConfirm,
    // Meter,
    FormInput,
    FormDropdown,
    Button,
    AlertModal,
    ConfirmModal,
    NavGroup,
    ProductImageViewerMagic360,
    SalesSection,
    SizeCarouselResponsive,
    BoxConditionPicker,
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
      showLastSalePrice: '',
      lastAmount: '',
      avgAmount: '',
      avgType: '',
      buy: TYPE_BUY,
      offer: TYPE_OFFER,
      mobileDetailsIsExpanded: false,
    }
  },

  computed: {
    ...mapGetters({
      inventoryColors: 'inventory/getColors',
      isVendor: 'auth/isVendor',
      isAuthenticated: 'auth/authenticated',
      getSelectedItemforVendor: 'sell-now/getSelectedItem',
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
          return { ...i }
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

    listingItemOrder: (vm) => {
      return vm.product.listing_item_order
    },

    lastSold: (vm) => {
      if (vm.listingItemOrder && vm.listingItemOrder.length) {
        const items = vm.listingItemOrder && vm.listingItemOrder.reverse()
        const sold = items.find(
          (i) =>
            i.inventory.size_id === vm.value.currentSize &&
            i.inventory.packaging_condition_id === vm.value.boxCondition
        )
        return sold && sold.inventory
      }
    },

    has360Images() {
      return this.product?.has360Images
    },

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    lowestPrice: (vm) => {
      const val = vm.product.lowest_prices.find(
        (i) =>
          i.size_id === vm.selectedSize &&
          i.packaging_condition_id === vm.selectedCondition
      )
      return val && val.price
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

    highestOfferId: (vm) => {
      return vm.product?.highest_offers?.find(
        (i) =>
          i.size_id === vm.selectedSize &&
          i.packaging_condition_id === vm.selectedCondition
      )?.offer_id
    },

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
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

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
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

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    priceError: (vm) => {
      if (vm.value.price !== null && vm.value.price <= vm.priceMinVal) {
        return vm.$t('inventory.message.gt_than', {
          field: vm.$t('common.price').toLowerCase(),
          amount: vm.priceMinVal,
        })
      }
    },
  },

  created() {
    this.getColors()
    if (!this.value.boxCondition) {
      this.handlePackagingConditionChange(1)
    }
  },

  methods: {
    ...mapActions({
      fetchColors: 'inventory/fetchColors',
      checkItemExistforVendor: 'sell-now/checkItemExistforVendor',
    }),
    // On back icon click
    moveBack() {
      this.$router.push(`/profile/vendor-selling/details/${this.listingId}`)
    },

    onSavedModalHidden() {
      this.moveBack()
    },

    handleSizeViewModeChange(mode) {
      this.sizeViewMode = mode
    },

    // Get the colors
    getColors() {
      this.fetchColors()
    },
    /**
     * On size input emit the value to be updated.
     */
    handleSizeChange(value) {
      if (value) {
        this.selectedSize = value
        this.$emit('input', { ...this.value, currentSize: value })
      }
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
      if (value) {
        this.$emit('input', { ...this.value, price: value })
      }
    },
    /**
     * on packaging condition input, emit the value to be updated.
     */
    handlePackagingConditionChange(value) {
      if (value) {
        this.selectedCondition = value
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
      this.moveBack()
    },
    // On cancel click, clear the value
    onCancel() {
      this.$emit('clearValue')
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
          selectedOfferId: this.highestOfferId,
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
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.mt-38
  margin-top: 38px

.mt-68
  margin-top: 68px

.mt-40
  margin-top: 40px

.mb-20
  margin-bottom: 20px

::v-deep.submit-buttons
  &.btn
    height: 46px

.web-prices
  width: 408px

::v-deep.nav-408
  .btn-group
    width: 408px

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

    .input-col::v-deep
      .input-label
        font-family: $font-montserrat
        font-style: normal
        @include body-8-normal
        color: $color-black-1
        margin-left: 0px !important
        text-transform: uppercase
        margin-bottom: 16px
      input
        border-radius: 4px !important
        height: 40px
        left: 16px
        top: 804px
        border: 1px solid $color-blue-20
        &::placeholder
          font-family: $font-montserrat
          font-style: normal
          @include body-8-normal
          font-weight: normal
          color: $color-gray-23

@media (max-width: 375px)
  .create-listing-form-wrapper
    .product-thumbnail
      width: 246px
@media (min-width: 650px)
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
        border: 1px solid $color-gray-3
        border-radius: 10px
    .search-results
      .popover-body > div:last-child
        border-bottom-left-radius: 0
        border-bottom-right-radius: 0

.responsive-inputs-row::v-deep
  .input-col
    .form-input-wrapper
      .input-label
        font-family: $font-montserrat
        font-style: normal
        @include body-9-medium
        color: $color-black-1

// For !mobile screen
@media (min-width: 576px)
  .create-listing-form-wrapper::v-deep
    .section-product-details,
    .product-size-details,
    .size-meter,

    .backToSearch
      display: block
    .product-thumbnail
      display: flex
    .mobile-nav-row,
    .responsive-inputs-row,
    .add-listing-btn,
    .responsive-product-details-block,
    .product-thumbnail
      width: 420px !important
      // Added !important coz the product thumb component breaks the width of component
      height: 420px
    .image-viewer-three-sixty
      width: 323px !important
      // Added !important coz the product thumb component breaks the width of component
      height: 246px
      display: flex
      justify-content: center
      position: relative
      margin: auto

// For mobile screen
@media (max-width: 576px)
  .create-listing-form-wrapper::v-deep
    .product-details-heading,
    .section-product-details,
    .product-size-details,
    .size-meter,
    .backToSearch
      display: none
    .product-thumbnail
      width: 240px
      .overlay
        display: none
    .responsive-inputs::v-deep
      .form-input-wrapper
        .form-input
          width: 152px
          height: 49px
          left: 16px
          top: 804px
          border: 1px solid $color-gray-3
          border-radius: 10px

    .add-listing-btn
      background: $color-black-1
      border-radius: 20px
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
        @include body-5-medium
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
.box-condition-select-col::v-deep
  #dropdown-container-box-condition-dropdown
    .popover
      .popover-body
        border: 1px solid $color-gray-85
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

.box-shadow
  box-shadow: 0px 1px 2px $color-gray-th-43

.rotate
  transform: rotate(180deg)
</style>
