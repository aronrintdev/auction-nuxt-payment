<template>
  <div :class="{'p-5':padding}">
    <div  class="create-trade-back-to-search" @click="backSearch()">
      <b-icon icon="chevron-left" aria-hidden="true"></b-icon>
      {{ (productFor === PRODUCT_FOR_COUNTER_OFFER) ? $t('trades.back_to_counter_offer') : ((productFor === 'wantOfferConfirm' && !isTradeEditForm) ?
        $t('trades.create_listing.vendor.wants.back_to_confirm_trade_listing') :
        (!isTradeEditForm ? $t('trades.create_listing.vendor.wants.back_to_search') : (!itemId ? $t('trades.back_to_trade_search') : $t('trades.back_to_trade_editing')))) }}
    </div>
    <b-row>
      <b-col md="6" class="create-trade-heading pt-50" >
        <div>{{product.name}}</div>
      </b-col>
      <b-col v-if="!isTradeEditForm" md="6">
        <div v-if="productFor !== 'wantsList'" class="row">
          <div class="col-md-12 ">
            <FormStepProgressBar v-if="progressBar" :steps="steps" variant="transparent"/>
          </div>
        </div>
      </b-col>
    </b-row>
    <div  class="create-trade-product-color">
      <div>{{ $t('trades.create_listing.vendor.wants.sku') }}: {{product.sku}}</div>
      <div>{{ $t('trades.create_listing.vendor.wants.colorway') }}: {{product.colorway}}</div>
    </div>
    <b-row class="justify-content-center">
      <div class="thumb-wrapper">
        <img :src="product.image" alt="No Image" class="trade-search-item-image"/>
      </div>
    </b-row>
    <b-row class="justify-content-center" :class="!selected_size && 'error'">
      <div id="size" ref="list" class="d-flex search-trade-size-list">
        <div class="search-trade-size-heading">{{ $t('trades.create_listing.vendor.wants.size') }}<sup>*</sup></div>
        <div class="error-text mt-1 text-xs">
          {{ $t('trades.create_listing.vendor.wants.select_size') }}
        </div>
          <ProductSizePicker
          :value="selected_size"
          :v-model="selected_size"
          :sizes="product.sizes"
          single-mode
          class="size-picker"
          @input="select_size"
        />
      </div>
    </b-row>
    <b-row class="justify-content-center mt-5">
      <div class="row wd-724 justify-start">
        <div v-if="productFor !== 'wantsList'" class="d-block" :class="(!isValidQuantity(quantity)) && 'error'">
          <label>{{ $t('trades.create_listing.vendor.wants.quantity') }}<sup>*</sup></label>
          <b-form-input v-model="quantity" type="number" :placeholder="$t('trades.create_listing.vendor.wants.enter_quantity')" class="create-trade-quantity-box"></b-form-input>
          <div class="error-text mt-1 text-xs">
            {{((productFor === tradeOffer) || (productFor === tradeArena)) ? $t('create_listing.trade.offer_items.offer_items_limit'): $t('trades.create_listing.vendor.wants.want_items_quantity_should_not_exceed', [MAX_ITEMS_ALLOWED]) }}
          </div>
        </div>
        <div v-if="product.category.name !== 'sneakers'" class="d-block ml-4" :class="!isValidYear(year) && 'error'">
            <label>{{ $t('trades.create_listing.vendor.wants.year') }}<sup>*</sup></label>
            <b-form-input v-model="year" type="number" :placeholder="$t('trades.create_listing.vendor.wants.enter_year')" class="create-trade-quantity-box"></b-form-input>
            <div class="error-text mt-1 text-xs">
              {{ $t('trades.create_listing.vendor.wants.enter_year') }}
            </div>
          </div>
        <div v-if="product.packaging_conditions" class="d-block ml-4" :class="!box_condition && 'error'">
          <label>{{ $t('trades.create_listing.vendor.wants.box_condition') }}<sup>*</sup></label>
          <b-form-select v-model="box_condition" class="create-trade-select-box">
            <b-form-select-option :value="null">{{ $t('trades.create_listing.vendor.wants.select') }} </b-form-select-option>
            <b-form-select-option
              v-for="condition in product.packaging_conditions"
              :key="condition.id"
              :value="condition.id">
                {{condition.name}}
            </b-form-select-option>
          </b-form-select>
          <div class="error-text mt-1 text-xs">
            {{ $t('trades.create_listing.vendor.wants.select_box_condition') }}
          </div>
        </div>
        <div v-if="productFor === 'wantsList'" class="d-block ml-4" >
          <label>Select List<sup>*</sup></label>
          <SelectListDropDown
            v-model="selectList"
            :options="selectListOptions" type="multi-select-checkbox"
            :label="selectListLabel" class="bg-white" optionsWidth="custom"
            :combinationId="combinationId"
            maxWidth="203px" variant="white"
            dropDownHeight="33px"
            borderRadius="20px"
            borderRadiusClose="20px 20px 0 0"
            borderRadiusOptions="0 0 8px 8px"
            width="203px"
            @change="listType"
          />
        </div>
        <b-btn class="search-trade-add-btn ml-4" :disabled = !disabledBtn  @click="addToOffer(product)">
          {{ ((productFor === tradeOffer) || (productFor === tradeArena)) ?
            $t('trades.create_listing.vendor.wants.add_to_offers') : $t('trades.create_listing.vendor.wants.add_to_wants') }}
        </b-btn>
      </div>
    </b-row>
  </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'
import FormStepProgressBar from '~/components/common/FormStepProgressBar.vue'
import ProductSizePicker from '~/components/product/SizePicker'
import {MAX_ITEMS_ALLOWED, DIGITS_IN_YEAR} from '~/static/constants/create-listing'
import {WANTS_SELECT_LIST_OPTIONS,PRODUCT_FOR_COUNTER_OFFER} from '~/static/constants/trades'
import SelectListDropDown from '~/pages/profile/trades/wants/SelectListDropDown'


export default {
  name: 'CreateTradeSearchItem',
  components:{
    SelectListDropDown,
    FormStepProgressBar,
    ProductSizePicker
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
    isTradeEditForm: {
      type: Boolean,
      default: () => false,
    },
    progressBar: {
      type: Boolean,
      default: () => true,
    },
    padding: {
      type: Boolean,
      default: () => false,
    },
    combinationId: {
      type: Number,
      default: () => null,
    },
    yourItems: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
        disabled:false,
      PRODUCT_FOR_COUNTER_OFFER,
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
    }
  },
  computed: {
    ...mapGetters('trades', ['getTradeItems', 'getTradeItemsWants']),
    ...mapGetters('trade', ['getYourTradeItems']),
      disabledBtn(){
        return this.selected_size !== null &&  this.box_condition !== null
      }
  },
  mounted() {
    if (this.itemId) {
      this.box_condition = this.product.selected_box_condition
      this.quantity = this.product.selected_quantity
      this.year = this.product.selected_year
      this.selected_size = this.product.selected_size
    }
  },
  methods: {
    ...mapActions({
      createInventories: 'inventory/createInventories',
    }),

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
      if(this.productFor === PRODUCT_FOR_COUNTER_OFFER)
        return this.yourItems.length
      if(this.productFor === this.tradeArena)
        return this.getYourTradeItems.length
      if (this.productFor === this.tradeOffer)
        return this.getTradeItems.map(i => parseInt(i.quantity)).reduce((a, b) => a + b, 0)
      if (this.productFor === this.wantOfferConfirm)
        return this.getTradeItemsWants.map(i => parseInt(i.selected_quantity))
          .reduce((a, b) => a + b, 0) - (this.product.selected_quantity ? this.product.selected_quantity : 0)

      return this.getTradeItemsWants.map(i => parseInt(i.selected_quantity))
        .reduce((a, b) => a + b, 0)
    },
    /**
     * This function is used to check validation of input fields of a product to be added
     * @returns {false|any|boolean}
     */
    isFormValid() {
      return ((parseInt(this.itemsCount()) + parseInt(this.quantity)) <= MAX_ITEMS_ALLOWED &&
        (this.product.packaging_conditions && this.box_condition !== null) &&
        this.isValidQuantity(parseInt(this.quantity)) &&
        this.isValidYear(this.year) &&
        this.selected_size !== null)
    },
    /**
     * This function is used to check year is valid with 4 digits in it
     * @param year
     * @returns {boolean}
     */
    isValidYear(year) {
      return (this.product.category.name !== 'sneakers') ? (year && year.length === DIGITS_IN_YEAR) : true
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
    setSelectedItem(selectedProduct){
      const _self = this;
      let productDetails;
      if(selectedProduct.product){
        productDetails = {
          id: selectedProduct.product.id,
          name: selectedProduct.product.name,
          colorway: selectedProduct.product.colorway,
          sku: selectedProduct.product.sku,
          category: selectedProduct.product.category,
          image: selectedProduct.product.image,
          sizes: selectedProduct.product.sizes,
          packaging_conditions: selectedProduct.product.packaging_conditions
        }
      }else{
        productDetails = {
          id: selectedProduct.id,
          name: selectedProduct.name,
          sku: selectedProduct.sku,
          colorway: selectedProduct.colorway,
          category: selectedProduct.category,
          image: selectedProduct.image,
          sizes: selectedProduct.sizes,
          packaging_conditions: selectedProduct.packaging_conditions
        }
      }
      selectedProduct.product = productDetails
      selectedProduct.product_id = selectedProduct.id
      selectedProduct.quantity = parseInt(this.quantity)
      selectedProduct.year = parseInt(this.year)
      selectedProduct.size_id = parseInt(this.selected_size)
      selectedProduct.size = selectedProduct?.sizes.find( i => i.id === this.selected_size)
      selectedProduct.packaging_condition = selectedProduct.packaging_conditions
        .filter(condition => condition.id === _self.box_condition)[0]
      selectedProduct.box_condition = selectedProduct.packaging_conditions
        .find(condition => condition.id === _self.box_condition)
      selectedProduct.packaging_condition_id = this.box_condition
      selectedProduct.sale_price = selectedProduct.retail_price

      return selectedProduct
    },
    /**
     * This function is used to add item in offer listing
     * @param selectedProduct
     */
    addToOffer(selectedProduct) {
      const _self = this;
      if (this.productFor === this.tradeArena){
        for (let i = 0; i < _self.quantity; i++){
          selectedProduct = this.setSelectedItem(selectedProduct)

        this.$store.commit('trade/setYourTradeItems', selectedProduct)
        this.$root.$emit('back_to_search_offer')
        }
      }
      else if (this.productFor === PRODUCT_FOR_COUNTER_OFFER) {
        selectedProduct = this.setSelectedItem(selectedProduct)
        this.$root.$emit('add_new_product', selectedProduct)
      }
      else if (this.productFor === this.tradeOffer) {
        selectedProduct = this.setSelectedItem(selectedProduct)

        this.$store.commit('trades/setTradeItems', selectedProduct)
        this.$root.$emit('add_trade_item', false)
      }
      else if (this.productFor === this.wantOffer || this.productFor === this.wantOfferConfirm) {
        let selectedProductWithAttributes

        if (this.isFormValid()) {
          selectedProductWithAttributes = {
            id: selectedProduct.id,
            product_id: selectedProduct.id,
            name: selectedProduct.name,
            colorway: selectedProduct.colorway,
            sku: selectedProduct.sku,
            category: selectedProduct.category.name,
            image: selectedProduct.image,
            selected_box_condition: this.box_condition,
            selected_box_condition_name: selectedProduct.packaging_conditions.filter(function(condition) {
              return (condition.id === _self.box_condition) ?
                condition.name : null
            })[0].name,
            selected_quantity: parseInt(this.quantity),
            selected_year: this.year,
            selected_size: this.selected_size,
            selected_size_name: 'Size ' + selectedProduct.sizes.filter(function(size) {
              return (size.id === _self.selected_size) ?
                'Size ' + size.size : null

            })[0].size,
            product: selectedProduct
          }

          if (this.itemId) {
            selectedProductWithAttributes.id = this.itemId
            this.$store.commit('trades/updateWantsItemsTrade', selectedProductWithAttributes)
          } else{
            this.$store.commit('trades/setWantsItemsTrade', selectedProductWithAttributes)
          }

          if (this.productFor === this.wantOfferConfirm) {
            this.$root.$emit('back_to_search_wants')
          } else{
            this.$root.$emit('add_trade_item_want',false)
          }
        }
      } else if (this.productFor === 'wantsList') {
        if(this.combinationId){
          this.addWantItemCombination(selectedProduct)
        }
        else {
          this.addWantItem(selectedProduct)
        }
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
          this.$toasted.error(this.$t('error.something_went_wrong'))
          this.$logger.logToServer('Add want item', error.response.data)
        })
    },
    addWantItemCombination(selectedProduct) {
      const _self = this;
      const data = {
              want_combination_id: this.combinationId,
              product_id: selectedProduct.id,
              quantity: parseInt(_self.quantity),
              size_id: _self.selected_size,
              packaging_condition_id: _self.box_condition,
              year: _self.year,
              wants_list_type: _self.selectList
      }
      this.$axios.post('trades/wants/combination/items', data)
        .then(()=>{
            this.$root.$emit('back_to_edit')
        })
        .catch((error) => {
          this.$toasted.error(this.$t('error.something_went_wrong'))
          this.$logger.logToServer('Add want item combination', error.response.data)
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
      if(this.itemId){
        this.$root.$emit('back_to_trade_editing')
      }else if(this.productFor === PRODUCT_FOR_COUNTER_OFFER){
        this.$root.$emit('back_to_counter_offer')
      }else if (this.isTradeEditForm) {
        this.$root.$emit('back_to_trade_search')
      }
      else if (this.productFor === this.tradeOffer) {
        this.$root.$emit('back_to_search_offer')
      }
      else if (this.productFor === this.wantOffer || this.productFor === this.wantOfferConfirm || this.productFor === 'wantsList') {
        this.$root.$emit('back_to_search_wants')
      }
    },
    backToList(){
      this.$root.$emit('back_to_list')
    },
    listType(checked){
      if (!this.selectList.includes(checked)) {
        this.selectList.push(checked)
      } else {
        this.selectList = this.selectList.filter(item => item !== checked)
      }
    },
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.wd-724
  width: 724px

.pt-50
  padding-top: 50px

.error-text
  display: none

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
  background: $color-white-1
  border: 0.5px solid $color-gray-43
  box-sizing: border-box
  border-radius: 20px
  width: 203px
  height: 32px
  padding: 0 0.75rem

.create-trade-quantity-box
  background-color: $color-white-1
  border: 0.5px solid $color-gray-43
  box-sizing: border-box
  border-radius: 20px
  width: 203px
  height: 32px

</style>
