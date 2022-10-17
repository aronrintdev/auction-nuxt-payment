<template>
  <div class="font-monserrat px-3">
    <div class="pt-3 d-flex justify-content-center">
      <div class="d-flex flex-column separator col-6 justify-content-center align-items-center">
        <span class="label">{{ $t('common.sku') }}</span>
        <span class="value">{{ product.product.sku }}</span>
      </div>
      <div class="d-flex flex-column col-6 justify-content-center align-items-center">
        <span class="label">{{ $t('common.colorway') }}</span>
        <span class="value">{{ product.product.colorway }}</span>
      </div>
    </div>
    <div class="d-flex flex-column justify-content-center">
      <img 
        :src="product.product | getProductImageUrl" 
        alt="No Image" 
        width="150"
        class="h-auto mx-auto" 
      />

      <p class="mt-3 mb-0 title">{{product.product.name}}</p>
      <p>
        <span class="last-sale">{{ $t('product_page.last_sale') }}: $250.00</span>
        <span class="last-sale-value">+0.64 (+0.36%)</span>
      </p>
      <div class="d-flex justify-content-between mb-2">
        <div class="size">{{ $t('product_page.select_size') }}:</div>
        <div class="size">
          <img
            class="mr-1"
            :src="require('~/assets/img/icons/eye2.svg')"
          />
          {{ $t('products.all_sizes') }}
        </div>
      </div>
      <div class="d-flex horizontal-scroll justify-content-center">
        <div class="d-flex flex-column align-items-center mr-3">
          <div class="size-item">
            6.5
          </div>
          <div class="mt-1 size-price">$505</div>
        </div>
        <div class="d-flex flex-column align-items-center mr-3">
          <div class="size-item">
            7.0
          </div>
          <div class="mt-1 size-price">$505</div>
        </div>

        <div class="d-flex flex-column align-items-center mr-3">
          <div class="size-item">
            7.5
          </div>
          <div class="mt-1 size-price">$520</div>
        </div>

        <div class="d-flex flex-column align-items-center mr-3">
          <div class="size-item size-item-active">
            8.0
          </div>
          
          <div class="blue-separator"></div>
        </div>

        <div class="d-flex flex-column align-items-center mr-3">
          <div class="size-item">
            8.5
          </div>
          <div class="mt-1 size-price">$530</div>
        </div>

        <div class="d-flex flex-column align-items-center mr-3">
          <div class="size-item">
            9.0
          </div>
          <div class="mt-1 size-price">$530</div>
        </div>

        <div class="d-flex flex-column align-items-center">
          <div class="size-item">
            9.5
          </div>
          <div class="mt-1 size-price">$530</div>
        </div>

      </div>

      <div class="mt-3 d-flex flex-column pb-5">
        <div class="d-flex align-items-center justify-content-center mb-2">
          <div class="box mr-1">{{ $t('products.box_condition')}}</div>
          <img
            width="12"
            height="12"
            :src="require('~/assets/img/icons/info-dark-blue.svg')"
            :title="$t('products.message.box_condition_info')"
          />
        </div>

        <div class="px-3 mb-5 pb-5">
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
            :inputStyle="{ display: 'flex', justifyContent: 'center', border: '1px solid black !important' }"
            :dropdownStyle="{ border: '1px solid #000', borderTop: 0, borderBottom: 0, zIndex: 9999 }"
            :optionStyle="'font-weight: 500 !important; font-size: 14px; color: #667799; borderBottom: 1px solid black'"
            labelStyle="font-family: Montserrat; font-style: normal; font-weight: 500 !important; font-size: 14px; color: #667799;"
            arrowStyle='color: #667799; width: 16px; height: 18px; position: absolute; right: 50px; margin-bottom: 11px !important;'
          />
        </div>
      </div>

    </div>
      
  </div>
  <!-- <div :class="{'p-5':padding}">
    <div  class="create-trade-back-to-search" @click="backSearch()">
      <b-icon icon="chevron-left" aria-hidden="true"></b-icon>
      {{ (productFor === 'wantOfferConfirm') ? $t('trades.create_listing.vendor.wants.back_to_confirm_trade_listing') : $t('trades.create_listing.vendor.wants.back_to_search') }}
    </div>
    <b-row>
      <b-col md="6" class="create-trade-heading pt-50" >
        <div>{{product.product.name}}</div>
      </b-col>
    </b-row>
    <div  class="create-trade-product-color">
      <div>{{ $t('trades.create_listing.vendor.wants.sku') }}: {{product.product.sku}}</div>
      <div>{{ $t('trades.create_listing.vendor.wants.colorway') }}: {{product.product.colorway}}</div>
    </div>
    <b-row class="justify-content-center">
      <div class="thumb-wrapper">
        <img :src="product.product | getProductImageUrl" alt="No Image" class="trade-search-item-image"/>
      </div>
    </b-row>
    <b-row class="justify-content-center" :class="!selected_size && 'error'">
      <div id="size" ref="list" class="d-flex search-trade-size-list">
        <div class="search-trade-size-heading">{{ $t('trades.create_listing.vendor.wants.size') }}<sup>*</sup></div>
        <div class="error-text d-none mt-1 text-xs">
          {{ $t('trades.create_listing.vendor.wants.select_size') }}
        </div>
        <ProductSizePicker
          :value="selected_size"
          :v-model="selected_size"
          :sizes="product.product.sizes"
          single-mode
          class="size-picker"
          @input="select_size"
        />
      </div>
    </b-row>
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <b-row class="justify-content-center mt-5 mb-5">
      <div class="row wd-724 justify-content-center">
        <div v-if="productFor !== 'wantsList'" class="d-block" :class="(!isValidQuantity(quantity)) && 'error'">
          <ValidationProvider
            v-slot="validationContext"
            :name="$t('trades.create_listing.vendor.wants.quantity')"
            :rules="{ required: true }"
          >
          <label>{{ $t('trades.create_listing.vendor.wants.quantity') }}<sup>*</sup></label>
          <b-form-input v-model="quantity" type="number" :placeholder="$t('trades.create_listing.vendor.wants.enter_quantity')" class="create-trade-quantity-box" :state="getValidationState(validationContext)"></b-form-input>
          <b-form-invalid-feedback>{{
                validationContext.errors[0]
          }}</b-form-invalid-feedback>
          </ValidationProvider>
        </div>
        <div v-if="product.product.category.name !== 'sneakers'" class="d-block ml-4" :class="!isValidYear(year) && 'error'">
          <ValidationProvider
            v-slot="validationContext"
            :name="$t('trades.create_listing.vendor.wants.year')"
            :rules="{ required: true }"
          >
          <label>{{ $t('trades.create_listing.vendor.wants.year') }}<sup>*</sup></label>
          <b-form-input v-model="year" type="number" :placeholder="$t('trades.create_listing.vendor.wants.enter_year')" class="create-trade-quantity-box"></b-form-input>
            <b-form-invalid-feedback>{{
                validationContext.errors[0]
              }}</b-form-invalid-feedback>
          </ValidationProvider>
        </div>
        <div v-if="product.product.packaging_conditions" class="d-block ml-4" :class="!box_condition && 'error'">
          <ValidationProvider
            v-slot="validationContext"
            :name="$t('trades.create_listing.vendor.wants.select')"
            :rules="{ required: true }"
          >
          <label>{{ $t('trades.create_listing.vendor.wants.select') }}<sup>*</sup></label>
          <b-form-select v-model="box_condition" class="create-trade-select-box">
            <b-form-select-option :value="null">{{ $t('trades.create_listing.vendor.wants.select') }} </b-form-select-option>
            <b-form-select-option
              v-for="condition in product.product.packaging_conditions"
              :key="condition.id"
              :value="condition.id">
              {{condition.name}}
            </b-form-select-option>
          </b-form-select>
          <b-form-invalid-feedback>{{
                validationContext.errors[0]
              }}</b-form-invalid-feedback>
          </ValidationProvider>
        </div>
        <div v-if="productFor === 'wantsList'" class="d-block ml-4" >
          <ValidationProvider
            v-slot="validationContext"
            :name="$t('trades.create_listing.vendor.wants.select')"
            :rules="{ required: true }"
          >
          <label>Select List<sup>*</sup></label>
          <SelectListDropDown
            v-model="selectList"
            :options="selectListOptions" type="multi-select-checkbox"
            :label="selectListLabel" class="bg-white" optionsWidth="custom"
            :itemId="itemId"
            :combinationId="combinationId"
            maxWidth="203px" variant="white"
            dropDownHeight="33px"
            borderRadius="20px"
            borderRadiusClose="20px 20px 0 0"
            borderRadiusOptions="0 0 8px 8px"
            width="203px"
            @change="listType"
          />
          <b-form-invalid-feedback>{{
                validationContext.errors[0]
              }}</b-form-invalid-feedback>
          </ValidationProvider>
        </div>
      </div>
      <div class="row wd-724 justify-content-center mt-3">
        <Button pill variant="primary" class="btn-width ml-4 mr-4" @click="handleSubmit(addToOffer(product))">
          {{$t('trades.preferences.save_changes')}}
        </Button>
        <Button pill variant="outline-dark" class="btn-width" @click="discardChanges()">
          {{$t('trades.discard_changes')}}
        </Button>
      </div>
    </b-row>
    </ValidationObserver>
  </div> -->
</template>

<script>
/* eslint-disable vue/no-unused-components */
import {mapGetters, mapActions} from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import ProductSizePicker from '~/components/product/SizePicker'
import {MAX_ITEMS_ALLOWED, DIGITS_IN_YEAR} from '~/static/constants/create-listing'
import {WANTS_SELECT_LIST_OPTIONS} from '~/static/constants/trades'
import SelectListDropDown from '~/pages/profile/trades/wants/SelectListDropDown'
import Button from '~/components/common/Button'
import CustomDropdown from '~/components/common/CustomDropdown'

export default {
  name: 'EditItem',
  components: {
    Button,
    CustomDropdown,
    SelectListDropDown,
    ProductSizePicker,
    ValidationObserver,
    ValidationProvider,
  },
  props:{
    product: {
      type: Object,
      default: () => null,
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
      selectListOptions: WANTS_SELECT_LIST_OPTIONS.map(item => ({text: this.$t(item.text), value: item.value})),
      selectListLabel: this.$t('trades.wants_listing.add_to'),
      conditionsOptions: this.product.product.packaging_conditions.map((item) => ({ text: item.name, value: item.id })),
      condition: { text: this.product.packaging_condition.name, value: this.product.packaging_condition.id },
      conditionLabel: this.product.packaging_condition.name
      // condition: this.product.packaging_condition.name,

    }
  },
  computed: {
    ...mapGetters('trades', ['getTradeItems', 'getTradeItemsWants']),
    ...mapGetters('trade', ['getYourTradeItems']),
  },
  mounted() {
    if (this.itemId) {
      this.box_condition = this.product.packaging_condition_id
      this.selected_size = this.product.size_id
    }
    console.log('THIS', this);
    console.log('def', { text: this.product.packaging_condition.name, value: this.product.packaging_condition.id });
  },
  methods: {
    ...mapActions({
      createInventories: 'inventory/createInventories',
    }),

    changeCondition(selectedCondition) {
      console.log('this.product.product.packaging_conditions', this.product.product.packaging_conditions);
      console.log('selectedCondition', selectedCondition);

      // this.category = selectedCategory
      // console.log('CAT', this.category);
      // const categoryFilteredKey = this.categoryItems.find(item => item.value === this.category)
      // this.categoryFilterLabel = this.$options.filters.capitalizeFirstLetter(categoryFilteredKey.text)

      this.condition = this.product.product.packaging_conditions.find(
        (item) => item.id === selectedCondition
      );
      this.conditionLabel = this.condition.name
      console.log('this.condition', this.condition);
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
     if (this.productFor === 'wantsList' && !this.itemId) {
        this.addWantItem(selectedProduct)
      }
     else if (this.productFor === 'wantsList' && this.itemId) {
        this.updateWant(selectedProduct)
      }
    },
    /**
     * THis function is used to add wants item in wants list
     */
    addWantItem(selectedProduct) {
      const _self = this;
      const data = {
        product_id: selectedProduct.id,
        quantity: parseInt(_self.quantity),
        size_id: _self.selected_size,
        packaging_condition_id: _self.box_condition,
        year: _self.year,
        wants_list_type: _self.selectList
      }
      this.$axios.post('/trades/wants', data)
        .then(this.backSearch)
        .catch((error) => {
          this.$toasted.error(this.$t('preferences.payments.something_went_wrong'))
          this.$logger.logToServer('Add Want Item item in Listing', error.response.data)
        })
    },

    /**
     * THis function is used to add wants item in wants list
     */
    updateWant(selectedProduct) {
      const _self = this;
      const data = {
        product_id: selectedProduct.id,
        quantity: parseInt(_self.quantity),
        size_id: _self.selected_size,
        packaging_condition_id: _self.box_condition,
        year: _self.year,
        wants_list_type: _self.selectList
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
      if (value !== null)
        this.$emit('input', { ...this.value, sizeId: value })
    },

    /**
     * THis function is used to take back on previous page
     */
    backSearch() {
      if (this.productFor === 'wantsList' && !this.combinationId && !this.itemId) {
        this.$root.$emit('back_to_search_wants')
      }
      else if(this.combinationId){
        this.$root.$emit('back_to_edit')
      }
      else if(this.itemId){
        this.discardChanges()
      }
    },
    listType(checked){
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

.size
  font-size: 13px

.title 
  font-size: 18px
  font-weight: 600

.last-sale
  font-family: 500
  font-size: 14px
  color: #6F6F6F

.last-sale-value
  font-weight: 500
  font-size: 12px
  color: #36A60F

.label
  font-size: 13px
  font-weight: 600

.box
  font-size: 14px
  font-weight: 600

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
</style>
