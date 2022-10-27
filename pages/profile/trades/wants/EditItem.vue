<template>
  <div id="edit-item" class="page-content font-monserrat px-3">
    <div class="pt-3 d-flex d-lg-none justify-content-center">
      <div class="d-flex flex-column separator col-6 justify-content-center align-items-center">
        <span class="label">{{ $t('common.sku') }}</span>
        <span class="value">{{ product.product.sku }}</span>
      </div>
      <div class="d-flex flex-column col-6 justify-content-center align-items-center">
        <span class="label">{{ $t('common.colorway') }}</span>
        <span
          class="value text-truncate max-w-120"
        >
          {{ product.product.colorway }}
        </span>
      </div>
    </div>

    <div class="d-flex flex-column justify-content-center">
      <div class="d-flex flex-column flex-xl-row">
        <div class="col-xl-5">
          <div 
            class="back-to-wants" 
            role="button" 
            @click="backSearch()"
          >
            <b-icon icon="chevron-left" aria-hidden="true"></b-icon>
            {{$t('trades.wants_listing.back_to_want_list')}}
          </div>
          <ProductImageViewer v-if="!product.product.has360Images" :product="product.product" />
          <ProductImageViewerMagic360 v-if="product.product.has360Images" :product="product.product" />
        </div>
        <div class="col-xl-6 px-0 px-sm-2">
          <p class="mt-3 mb-0 title">{{ product.product.name }}</p>
          <!-- <p class="custom-border">
            <span class="last-sale">{{ $t('product_page.last_sale') }}: $250.00</span>
            <span class="last-sale-value">+0.64 (+0.36%)</span>
          </p> -->
          <div class="position-relative">
            <ProductSizePicker
              :value="currentSizeId"
              :sizes="product.product.sizes"
              :prices="[]"
              :viewMode="sizeViewMode"
              class="size-picker px-0"
              :style="{
                maxWidth: 'unset'
              }"
              @update="handleSizeChange"
              @changeViewMode="handleSizeViewModeChange"
              :cardStyle="{
                width: '64px',
                height: '64px',
                borderWidth: '1px'
              }"
              :selectSizeLabelClass="'size-label-responsive'"
              :iconClass="'d-inline d-sm-none'"
              :iconTextClass="'icon-text-responsive'"
              :arrowStyle="{
                display: 'none !important'
              }"
              :carouselContainerStyle="{
                width: '100%',
                padding: 0,
                position: 'absolute !important'
              }"
              :wrapperStyle="{
                margin: '0 !important',
                width: '100%'
              }"
              :errorText="errors.size"
            />
          </div>
          
          <div 
            :style="{
              marginTop: '130px'
            }" 
            class="d-flex flex-column pb-sm-2"
          >
            <div class="d-flex align-items-center mb-2">
              <div class="box mr-1">{{ $t('products.box_condition') }}</div>
              <img
                width="12"
                height="12"
                :src="require('~/assets/img/icons/info-dark-blue.svg')"
                :title="$t('products.message.box_condition_info')"
              />
              <div v-if="errors.box" class="ml-2 body-8-normal text-red">{{ errors.box }}</div>
            </div>

            <div class="mb-4">
              <div class="px-3 d-block d-sm-none">
                <CustomDropdown 
                  v-model="condition"
                  :label="conditionLabel"
                  :options="conditionsOptions"
                  type="single-select"
                  optionsWidth="custom"
                  dropDownHeight="38px"
                  variant="white"
                  paddingX="10px"
                  @change="changeCondition"
                  :inputStyle="{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    border: '1px solid black !important' 
                  }"
                  :dropdownStyle="{ 
                    border: '1px solid #000', 
                    borderTop: 0, 
                    zIndex: 9999 
                  }"
                  :optionsStyle="{
                    fontWeight: '500 !important',
                    fontSize: '14px',
                    color: '#667799',
                    borderBottom: '1px solid #000',
                  }"
                  labelStyle="font-family: Montserrat; font-style: normal; font-weight: 500 !important; font-size: 14px; color: #667799;"
                  arrowStyle='color: #667799; width: 16px; height: 18px; position: absolute; right: 50px; margin-bottom: 12.5px !important;'
                />
              </div>
              <div class="d-none d-sm-flex justify-content-between">
                <div
                  v-for="box in conditionsOptions"
                  :key="box.value"
                  class="box-item"
                  role="button"
                  @click="box_condition = box.value"
                >
                  <span :class="{ 'text-black': box_condition === box.value }">
                    {{ box.text }}
                  </span>
                </div>
              </div>
            </div>

            <div class="d-flex flex-column flex-sm-row justify-content-between">
              <div class="col-sm-6 d-flex flex-column px-0 pr-sm-2 pl-sm-0">
                <div class="d-flex align-items-center">
                  <div class="form-label">
                    {{ $t('common.quantity') }} <sup>*</sup>
                  </div>
                  <div v-if="errors.quantity" class="ml-2 mb-2 body-8-normal text-red">
                    {{ errors.quantity }}
                  </div>
                </div>
                <input
                  type="number"
                  v-model="quantity"
                  required
                  class="bg-white form-label form-input pr-2"                 
                />
              </div>
              <div class="col-sm-6 px-0 pl-sm-2 pr-sm-0">
                <div class="d-flex align-items-center">
                  <div class="form-label">
                    {{ $t('common.select_list') }} <sup>*</sup>
                  </div>
                  <div v-if="errors.list" class="ml-2 mb-2 body-8-normal text-red">
                    {{ errors.list }}
                  </div>
                </div>
                <div class="d-none d-sm-block">
                  <SelectListDropDown
                    v-model="selectList"
                    :options="selectListOptions" type="multi-select-checkbox"
                    :label="selectListLabel" class="bg-white" optionsWidth="custom"
                    :itemId="itemId"
                    inputClass="form-input"
                    :combinationId="combinationId"
                    variant="white"
                    dropDownHeight="33px"
                    borderRadius="10px"
                    borderRadiusClose="10px 10px 0 0"
                    borderRadiusOptions="0 0 8px 8px"
                    @change="listType"
                    :inputStyle="{
                      borderColor: '#E8E8E8',
                      height: '49px',
                      borderRadius: '10px',
                      paddingLeft: '15px',
                      paddingRight: '15px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }"
                    :labelStyle="{
                      padding: 0,
                      margin: 0,
                      fontWeight: '600 !important',
                      fontSize: '12px',
                      color: '#000'
                    }"
                    :iconStyle="{
                      color: '#7196B1',
                      width: '16px',
                      height: '18px',
                      display: 'flex',
                      alignItems: 'center'
                    }"
                    :dropdownStyle="{
                      borderColor: '#667799',
                    }"
                    :dropdownItemStyle="{
                      borderColor: '#667799',
                    }"
                  />
                </div>
                <div class="d-sm-none mobile-input" @click="listModalOpen = !listModalOpen">
                  <div>{{ $t('trades.wants_listing.add_to') }}</div>
                  <i 
                    :style="{ color: '#7196B1'}" 
                    class="fa fa-2x" 
                    :class="listModalOpen ? 'fa-angle-up' : 'fa-angle-down'">
                  </i>
                </div>
              </div>
            </div>
          </div>

          <button 
            class="add-want-button d-none d-sm-flex w-100"
            @click="addToOffer(product)"
          >
            {{ $t('trades.create_listing.vendor.wants.add_want') }}
          </button>

        </div>
        <div class="col-xl-1"></div>
      </div>

      <div class="d-none d-sm-block">
        <div class="product-details px-2">{{ $t('orders.product_details') }}</div>
        <div class="mt-3 d-flex">
          <div class="col-2 mr-2">
            <div class="product-details-label">{{ $t('common.sku') }}:</div>
            <div class="product-details-label">{{ $t('common.colorway') }}:</div>
            <div class="product-details-label">{{ $t('common.retail_price') }}:</div>
            <div class="product-details-label">{{ $t('common.release_date') }}:</div>
          </div>
          <div class="col-3">
            <div class="product-details-value">{{ product.product.sku }}</div>
            <div class="product-details-value">{{ product.product.colorway }}</div>
            <div class="product-details-value">{{ product.product.retail_price }}</div>
            <div class="product-details-value">
              {{ product.product.release_date || $t('products.box_conditions.none') }}
            </div>
          </div>
          <!-- <div class="col-5">
            <div class="product-details-label">{{ $t('rewards.description') }}:</div>
            <div>Lorem ipsum dolor dit amet</div>
          </div> -->
        </div>
      </div>

      <div class="mt-4 px-3 px-sm-0 mb-3 pb-3 custom-shadow">
        <SalesSection
          :product="product"
          :sku="product.product.sku"
          chartHeaderClass="d-none"
          :chartLabelsStyle="{
            display: 'flex',
            flexDirection: 'row !important',
            justifyContent: 'space-between',
            fontFamily: 'SF Pro Display',
            fontWeight: 500,
            fontSize: '13px',
          }"
        />
      </div>
      <div
        class="add-want-button d-sm-none mt-1 mb-3"
        role="button"
        @click="addToOffer(product)"
      >
        {{ $t('trades.create_listing.vendor.wants.add_want') }}
      </div>

    </div>

    <SelectListModal
      :isOpen="listModalOpen"
      @closed="closeSelectListModal"
      @opened="listModalOpen = true"
    />
  </div>

</template>

<script>
/* eslint-disable vue/no-unused-components */
import {mapGetters, mapActions} from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import ProductSizePicker from '~/components/product/SizePicker'
import {MAX_ITEMS_ALLOWED, DIGITS_IN_YEAR} from '~/static/constants/create-listing'
import SelectListDropDown from '~/pages/profile/trades/wants/SelectListDropDown'
import SelectListModal from '~/pages/profile/trades/wants/SelectListModal'
import Button from '~/components/common/Button'
import CustomDropdown from '~/components/common/CustomDropdown'
import ProductImageViewer from '~/components/product/ImageViewerV2'
import ProductImageViewerMagic360 from '~/components/product/ImageViewerMagic360'
import ProductLatestSales from '~/components/product/LatestSales'
import SalesSection from '~/components/product/SalesSection'
import { Icon } from '~/components/common'


export default {
  name: 'EditItem',
  components: {
    Button,
    CustomDropdown,
    SelectListDropDown,
    ProductSizePicker,
    ValidationObserver,
    ValidationProvider,
    ProductImageViewer,
    ProductImageViewerMagic360,
    ProductLatestSales,
    SelectListModal,
    SalesSection,
    Icon
  },
  props: {
    product: {
      type: Object,
      default: () => null,
    },
    combinations: {
      type: Array,
      default: () => []
    },
    productFor: {
      type: String,
      default: () => null,
    },
    itemId: {
      type: Number,
      default: () => null,
    },
    combinationId: {
      type: Number,
      default: () => null,
    },
    progressBar: {
      type: Boolean,
      default: () => true,
    },
    padding: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    // console.log('DEFAULT LIST', this.cmbinationId ? [this.combinationId] : []);
    return {
      listModalOpen: false,
      MAX_ITEMS_ALLOWED,
      box_condition: null,
      quantity: 1,
      year: null,
      selected_size: null,
      tradeOffer: 'tradeOffer',
      tradeArena: 'tradeArena',
      wantOfferConfirm: 'wantOfferConfirm',
      wantOffer: 'wantOffer',
      steps: [
        {name: this.$t('trades.create_listing.vendor.wants.offer_items'), active: true},
        {name: this.$t('trades.create_listing.vendor.wants.enter_what_you_want'), active: true},
        {name: this.$t('trades.create_listing.vendor.wants.confirm_trade'), active: false}
      ],
      selectList: [],
      selectListOptions: [{ text: this.$t('trades.wants_listing.general_wants'), value: 'general_wants' }],
      conditionsOptions: this.product.product.packaging_conditions.map((item) => ({ text: item.name, value: item.id })),
      condition: { text: this.product.packaging_condition.name, value: this.product.packaging_condition.id },
      conditionLabel: this.product.packaging_condition.name || this.$t('products.box_conditions.none'),
      sizeViewMode: 'carousel',
      currentSizeId: this.product.size.id,
      currentTab: 'graph',
      currentDataTab: '',
      errors: {
        size: '',
        box: '',
        quantity: '',
        list: ''
      }
    }
  },
  computed: {
    ...mapGetters('trades', ['getTradeItems', 'getTradeItemsWants']),
    ...mapGetters('trade', ['getYourTradeItems']),

    selectListLabel() {
      return this.$t('trades.wants_listing.add_to')
    }
  },
  mounted() {
    if (this.itemId) {
      this.box_condition = this.product.packaging_condition_id
      this.selected_size = this.product.size_id
    }

    const wrapper = document.querySelector('.main-wrapper')
    if (wrapper.querySelector('#edit-item')) {
      wrapper.style.backgroundColor = '#fafafa'
    }
  },
  methods: {
    ...mapActions({
      createInventories: 'inventory/createInventories',
    }),

    closeSelectListModal(list) {
      this.listModalOpen = false
      this.selectList = list
    },
    handleSizeViewModeChange(mode) {
      this.sizeViewMode = mode
    },

    changeCondition(selectedCondition) {
      const condition = this.product.product.packaging_conditions.find(
        (item) => item.id === selectedCondition
      )
      this.box_condition = condition.id;
      this.conditionLabel = condition.name
    },

    /**
     * This function is used to select size and
     * add active class for selected border inside selected once size
     * @param size
     */
    select_size(size) {
      const header = this.$refs.list
      const btns = header.getElementsByClassName('search-trade-item-size');
      for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', function () {
          const current = document.getElementsByClassName('active-size');
          if (current.length > 0) {
            current[0].className = current[0].className.replace('active-size', '');
          }
          this.className += ' active-size';
        });
      }
      this.selected_size = size
    },
    /**
     * This function is used to count items in offer items or in wants item
     * @returns {number|*}
     */
    itemsCount() {
      if(this.productFor === this.tradeArena)
        return this.getYourTradeItems.length
      if (this.productFor === this.tradeOffer)
        return this.getTradeItems.map(i => parseInt(i.quantity)).reduce((a, b) => a + b, 0)
      if (this.productFor === this.wantOfferConfirm)
        return this.getTradeItemsWants.map(i => parseInt(i.selected_quantity))
          .reduce((a, b) => a + b, 0) - (this.product.product.selected_quantity ? this.product.product.selected_quantity : 0)

      return this.getTradeItemsWants.map(i => parseInt(i.selected_quantity))
        .reduce((a, b) => a + b, 0)
    },
    /**
     * This function is used to check year is valid with 4 digits in it
     * @param year
     * @returns {boolean}
     */
    isValidYear(year) {
      return (this.product.product.category.name !== 'sneakers') ? (year && year.length === DIGITS_IN_YEAR) : true
    },
    /**
     * This function is used to check quantity of items added inside the Drag & drop box for selection
     * Maximum items allowed to put are {MAX_ITEMS_ALLOWED}
     * @param quantity
     * @returns {boolean}
     */
    isValidQuantity(quantity) {
      return quantity > 0 && quantity <= MAX_ITEMS_ALLOWED
        && (parseInt(this.itemsCount()) + parseInt(quantity)) <= MAX_ITEMS_ALLOWED
    },

    /**
     * This function is used to add item in offer listing
     * @param selectedProduct
     */
    addToOffer(selectedProduct) {
      console.log('addToOffer1');
      this.validate()
      if (!Object.values(this.errors).every(x => x === null || x === '')) return

      if (!this.itemId) {
          this.addWantItem(selectedProduct)
        } else {
          this.updateWant(selectedProduct)
        }
    },

    /**
     * THis function is used to add wants item in wants list
     */
    addWantItem(selectedProduct) {
      console.log('addWantItem2');
      const data = {
        product_id: selectedProduct.product.id,
        quantity: parseInt(this.quantity),
        size_id: this.currentSizeId,
        packaging_condition_id: this.box_condition,
        year: selectedProduct.product.release_year,
        wants_list_type: this.selectList
      }
      this.$axios.post('/trades/wants', data)
        .then(this.backSearch)
        .catch((error) => {
          this.$toasted.error(this.$t('preferences.payments.something_went_wrong'))
          this.$logger.logToServer('Add Want Item item in Listing', error.response.data)
        })
    },

    validate() {
      if (!this.currentSizeId) {
        this.errors.size = this.$t('error.incorrect_size')
      } else {
        this.errors.size = ''
      }
      if (!this.quantity || this.quantity < 1) {
        this.errors.quantity = this.$t('error.incorrect_quantity')
      } else {
        this.errors.quantity = ''
      }
      if (!this.box_condition) {
        this.errors.box = this.$t('error.box')
      } else {
        this.errors.box = ''
      }
      if (this.selectList.length < 1) {
        this.errors.list = this.$t('error.list')
      } else {
        this.errors.list = ''
      }
    },

    /**
     * THis function is used to add wants item in wants list
     */
    updateWant(selectedProduct) {
      const data = {
        product_id: selectedProduct.product.id,
        quantity: parseInt(this.quantity),
        size_id: this.currentSizeId,
        packaging_condition_id: this.box_condition,
        year: selectedProduct.product.release_year,
        wants_list_type: this.selectList
      }
      this.$axios.put('/trades/wants/' + this.itemId, data)
        .then(this.backToList)
        .catch((error) => {
          this.$toasted.error(this.$t('preferences.payments.something_went_wrong'))
          this.$logger.logToServer('Upddate Want Item in Listing', error.response.data)
        })
    },
    /**
     * THis function is used to emit change in size value
     * @param value
     */
    handleSizeChange(value) {
      this.currentSizeId = value
    },

    /**
     * THis function is used to take back on previous page
     */
    backSearch() {
      console.log('backSearch3', this.productFor, this.combinationId, this.itemId);
      if (this.productFor === 'wantsList' && !this.combinationId && !this.itemId) {
        this.$root.$emit('back_to_list')
      }
      else if(this.combinationId) {
        console.log('backSearch4');
        this.$root.$emit('back_to_edit_combination')
      }
      else if(this.itemId){
        this.discardChanges()
      }
    },
    listType(checked) {
      console.log('listType1', checked);
      if (!this.selectList.includes(checked)) {
        this.selectList.push(checked)
      } else {
        this.selectList = this.selectList.filter(item => item !== checked)
      }
    },
    discardChanges(){
      this.$root.$emit('discard_changes')
    },
    backToList(){
      this.$root.$emit('back_to_list')
    },
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.max-w-120 
  @media (max-width: 576px)
    max-width: 120px

.product-details
  font-family: $font-family-sf-pro-display
  font-weight: 700
  font-size: 20px
  padding-bottom: 17px
  margin-top: 55px
  border-bottom: 0.5px solid $color-gray-23

.custom-shadow
  @media (max-width: 576px)
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25)
    border-radius: 8px

.horizontal-scroll 
  overflow-x: scroll
  -ms-overflow-style: none
  scrollbar-width: none

.horizontal-scroll::-webkit-scrollbar 
  display: none

.blue-separator
  height: 2px
  width: 36px
  background: $color-blue-20
  margin-top: 13px

.font-monserrat
  font-family: $font-family-montserrat

.separator
  border-right: 0.5px solid #99999950

.size-item, .size-item-active
  width: 49px
  height: 49px
  border-radius: 4px
  display: flex
  align-items: center
  justify-content: center

.size-item
  border: 1px solid $color-gray-3
  font-weight: 600
  font-size: 12px

.size-item-active
  border-color: #000
  font-weight: 600
  font-size: 17px

.size-price
  font-weight: 700
  font-size: 10px
  color: $color-gray-20

.select-size, .all-sizes
  font-size: 13px

.select-size
  @media (min-width: 576px)
    font-weight: 500
    font-size: 15px
    text-transform: uppercase
    color: #000

.all-sizes
  @media (min-width: 576px)
    color: $color-blue-30
    font-weight: 600
    font-size: 15px

.title 
  font-size: 18px
  font-weight: 600
  @media (min-width: 576px)
    font-weight: 700
    font-size: 24px

.last-sale
  font-family: 500
  font-size: 14px
  color: $color-gray-6
  @media (min-width: 576px)
    font-weight: 600

.last-sale-value
  font-weight: 500
  font-size: 12px
  color: #36A60F
  @media (min-width: 576px)
    font-weight: 600
    font-size: 14px

.label
  font-size: 13px
  font-weight: 600

.box
  font-size: 14px
  font-weight: 600
  color: #000
  @media (min-width: 576px)
    font-weight: 500
    font-size: 15px
    text-transform: uppercase

.back-to-wants
  margin-top: 26px
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-13-regular
  letter-spacing: 0.06em
  color: $color-black-1

.value
  font-weight: 500
  font-size: 14px
  color: $color-blue-20

.wd-724
  width: 724px

.pt-50
  padding-top: 50px

.error
  :deep(.input-error)
    .form-input
      border-color: $color-red-3

  .error-text
    @include body-5-regular
    display: block
    color: $color-red-3

  .overlay
    background: $light-opacity

.create-trade-select-box
  border-radius: 0
  margin-top: 15px
  background-color: $color-white-1
  border: 1px solid #000
  font-weight: 500
  font-size: 14px

.create-trade-quantity-box
  margin-top: 15px
  background-color: $color-white-1
  border: 1px solid #000
  font-weight: 500
  font-size: 14px

.btn-width
  width: 203px

.form-label
  margin-bottom: 9px
  font-size: 12px
  font-weight: 600 !important
  color: #000
  @media (min-width: 576px)
    font-weight: 500 !important
    font-size: 15px
    text-transform: uppercase

.add-want-button
  height: 40px
  background: #000
  display: flex
  align-items: center
  justify-content: center
  font-weight: 600
  font-size: 16px
  color: #FFF
  border-radius: 25px
  margin-top: 40px
  @media (min-width: 576px)
    border-radius: 4px
    margin-top: 0

.product-details-label, .product-details-value
  line-height: 30px
  font-family: $font-family-sf-pro-display
  font-weight: 500
  font-size: 18px

.product-details-label
  color: #000

.product-details-value
  color: $color-gray-5

.page-content
  @media (min-width: 992px) and (max-width: 1200px) 
    width: 100%
  
.custom-border
  @media (min-width: 576px)
    padding-bottom: 15px
    border-bottom: 1px solid $color-gray-16f

.box-item
  font-weight: 500
  font-size: 15px
  color: $color-gray-23

.form-input
  border: 1px solid $color-gray-3
  border-radius: 10px
  height: 49px
  padding-left: 16px
  @media (min-width: 576px)
    border-color: $color-blue-20
    border-radius: 4px
    height: 40px

.mobile-input
  height: 49px
  padding-left: 15px
  padding-right: 15px
  border: 1px solid $color-gray-3
  border-radius: 10px
  display: flex
  align-items: center
  justify-content: space-between
  font-weight: 600
  font-size: 12px

.close-table
  position: relative
  display: flex
  justify-content: flex-end
  top: 33px
  z-index: 100

</style>
