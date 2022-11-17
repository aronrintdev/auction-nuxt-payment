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
          <p class="mb-0 title">{{ product.product.name }}</p>
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
              allSizesClass="mt-3"
              :errorText="errors.size"
              @update="handleSizeChange"
              @changeViewMode="handleSizeViewModeChange"
            />
          </div>
          
          <div class="d-flex flex-column pb-sm-2 mt-130">
            <div class="d-flex align-items-center mb-2">
              <div class="box mr-2">{{ $t('products.box_condition') }}<sup>*</sup></div>
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
                  @change="changeCondition"
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
                  v-model="quantity"
                  type="number"
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
                      fontWeight: '500 !important',
                      fontSize: '15px',
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
                    @change="listType"
                  />
                </div>
                <div class="d-sm-none mobile-input" @click="listModalOpen = !listModalOpen">
                  <div>{{ $t('trades.wants_listing.add_to') }}</div>
                  <i 
                    class="fa fa-2x color-blue-19" 
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
import {mapGetters, mapActions} from 'vuex'
import ProductSizePicker from '~/components/product/SizePicker'
import {MAX_ITEMS_ALLOWED, DIGITS_IN_YEAR} from '~/static/constants/create-listing'
import SelectListDropDown from '~/pages/profile/trades/wants/SelectListDropDown'
import SelectListModal from '~/pages/profile/trades/wants/SelectListModal'
import CustomDropdown from '~/components/common/CustomDropdown'
import ProductImageViewer from '~/components/product/ImageViewerV2'
import ProductImageViewerMagic360 from '~/components/product/ImageViewerMagic360'
import SalesSection from '~/components/product/SalesSection'
import { WANTS_SELECT_LIST_OPTIONS } from '~/static/constants/trades'


export default {
  name: 'EditItem',
  components: {
    CustomDropdown,
    SelectListDropDown,
    ProductSizePicker,
    ProductImageViewer,
    ProductImageViewerMagic360,
    SelectListModal,
    SalesSection
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
      selectListOptions: WANTS_SELECT_LIST_OPTIONS.map(
        item => ({ text: this.$t(item.text), value: item.value })
      ),
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
      if (!this.quantity || this.quantity < 1 || this.quantity > MAX_ITEMS_ALLOWED) {
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
      if (this.productFor === 'wantsList' && !this.combinationId && !this.itemId) {
        this.$root.$emit('back_to_list')
      }
      else if(this.combinationId) {
        this.$root.$emit('back_to_edit_combination')
      }
      else if(this.itemId){
        this.discardChanges()
      }
    },
    listType(checked) {
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

.color-blue-19
  color: $color-blue-19

.mt-130
  margin-top: 130px

.max-w-120 
  @media (max-width: 576px)
    max-width: 120px

.product-details
  @include body-2-bold
  font-family: $font-family-sf-pro-display
  padding-bottom: 17px
  margin-top: 55px
  border-bottom: 0.5px solid $color-gray-23

.custom-shadow
  @media (max-width: 576px)
    box-shadow: 0px 1px 2px $drop-shadow1
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
  @include body-9-medium
  border: 1px solid $color-gray-3

.size-item-active
  @include body-17-medium
  border-color: $color-black-1

.size-price
  @include body-18-bold
  color: $color-gray-20

.select-size, .all-sizes
  @include body-10

.select-size
  @media (min-width: 576px)
    @include body-8-normal
    text-transform: uppercase
    color: $color-black-1

.all-sizes
  @media (min-width: 576px)
    @include body-8-normal
    color: $color-blue-30

.title
  @include body-3-medium 
  margin-top: 20px
  @media (min-width: 576px)
    @include heading-1
    margin-top: 60px
    border-bottom: 1px solid $color-gray-16f
    padding-bottom: 14px

.last-sale
  @include body-5-normal
  color: $color-gray-6
  @media (min-width: 576px)
    font-weight: $medium

.last-sale-value
  @include body-9-normal
  color: $color-green-26
  @media (min-width: 576px)
    @include body-5-medium

.label
  @include body-10-medium

.box
  @include body-5-medium
  color: $color-black-1
  @media (min-width: 576px)
    @include body-8-normal
    text-transform: uppercase

.back-to-wants
  margin-top: 26px
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-13-regular
  letter-spacing: 0.06em
  color: $color-black-1

.value
  @include body-5-normal
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
  @include body-5-normal
  border-radius: 0
  margin-top: 15px
  background-color: $color-white-1
  border: 1px solid $color-black-1

.create-trade-quantity-box
  @include body-5-normal
  margin-top: 15px
  background-color: $color-white-1
  border: 1px solid $color-black-1

.btn-width
  width: 203px

.form-label
  @include body-9
  margin-bottom: 9px
  font-weight: $medium !important
  color: $color-black-1
  @media (min-width: 576px)
    @include body-8
    font-weight: $normal !important
    text-transform: uppercase

.add-want-button
  @include body-4-medium
  height: 40px
  background: $color-black-1
  display: flex
  align-items: center
  justify-content: center
  color: $color-white-1
  border-radius: 25px
  margin-top: 40px
  @media (min-width: 576px)
    @include body-8-medium
    border-radius: 4px
    border: 0
    margin-top: 0

.product-details-label, .product-details-value
  @include body-3
  line-height: 30px
  font-family: $font-family-sf-pro-display
  font-weight: $normal

.product-details-label
  color: $color-black-1

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
  @include body-8-normal
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
  @include body-9-medium
  height: 49px
  padding-left: 15px
  padding-right: 15px
  border: 1px solid $color-gray-3
  border-radius: 10px
  display: flex
  align-items: center
  justify-content: space-between

.close-table
  position: relative
  display: flex
  justify-content: flex-end
  top: 33px
  z-index: 100

</style>
