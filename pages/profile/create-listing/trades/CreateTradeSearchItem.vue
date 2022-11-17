<template>
  <div :class="{'p-5':padding}">
    <ProductView
      v-if="product"
      v-model="form"
      :product="product"
      :back-button-text="backButtonText"
      @back="backSearch"
    >
      <div slot="right-content">
        <div class="row">
          <div v-if="productFor !== 'wantsList'" class="col-12 mt-3" :class="isScreenXS ? 'input-col-mobile' : 'input-col'">
            <FormInput v-model="quantity"
                       :placeholder="$t('trades.create_listing.vendor.wants.enter_quantity')"
                       :label="$t('trades.create_listing.vendor.wants.quantity')"
                       class="input"
                       :class="{'input-error': !isValidQuantity(quantity)}"
                       required
                       integer
            />
            <div v-if="!isValidQuantity(quantity)" class="error-text mt-1">
              {{
                ((productFor === tradeOffer) || (productFor === tradeArena))
                  ? $t('create_listing.trade.offer_items.offer_items_limit')
                  : $t('trades.create_listing.vendor.wants.want_items_quantity_should_not_exceed', [MAX_ITEMS_ALLOWED])
              }}
            </div>
          </div>
          <div v-if="product.category.name !== 'sneakers'" class="col-12 mt-3" :class="isScreenXS ? 'input-col-mobile' : 'input-col'">
            <FormInput v-model="year"
                       :placeholder="$t('trades.create_listing.vendor.wants.enter_year')"
                       :label="$t('trades.create_listing.vendor.wants.year')"
                       class="input"
                       :class="{'input-error': !isValidYear(year)}"
                       required
                       integer
            />
            <div v-if="!isValidYear(year)" class="error-text mt-1">
              {{ $t('trades.create_listing.vendor.wants.enter_year') }}
            </div>
          </div>
          <div v-if="productFor === 'wantsList' && combinationId === null" class="col-12 mt-3" :class="isScreenXS ? 'input-col-mobile' : 'input-col'">
            <div class="input-label ml-2">Select List<sup>*</sup></div>
            <SelectListDropDown
              v-model="selectList"
              :options="selectListOptions" type="multi-select-checkbox"
              :label="selectListLabel" class="bg-white" optionsWidth="custom"
              :combinationId="combinationId"
              variant="white"
              :dropDownHeight="isScreenXS ? '49px' : '40px'"
              borderRadius="4px"
              borderRadiusClose="20px 20px 0 0"
              borderRadiusOptions="0 0 8px 8px"
              width="100%"
              @change="listType"
            />
          </div>
          <div  class="col-12">
            <b-btn class="search-trade-add-btn w-100 rounded" :disabled = !disabledBtn  @click="addToOffer(product)">
              {{ ((productFor === tradeOffer) || (productFor === tradeArena)) ?
              $t('trades.create_listing.vendor.wants.add_to_offers') : $t('trades.create_listing.vendor.wants.add_to_wants') }}
            </b-btn>
          </div>

        </div>
      </div>
    </ProductView>
  </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'
import {MAX_ITEMS_ALLOWED, DIGITS_IN_YEAR} from '~/static/constants/create-listing'
import {WANTS_SELECT_LIST_OPTIONS,PRODUCT_FOR_COUNTER_OFFER} from '~/static/constants/trades'
import SelectListDropDown from '~/pages/profile/trades/wants/SelectListDropDown'
import ProductView from '~/components/profile/create-listing/product/ProductView'
import screenSize from '~/plugins/mixins/screenSize'
import {FormInput} from '~/components/common'

export default {
  name: 'CreateTradeSearchItem',
  components:{
    SelectListDropDown,
    ProductView,
    FormInput
  },
  mixins: [screenSize],
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
      form: {
        currentSize: null,
        boxCondition: null,
      },
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
      return this.isFormValid()
    },
    backButtonText() {
      return (this.productFor === PRODUCT_FOR_COUNTER_OFFER)
        ? 'trades.back_to_counter_offer'
        : ((this.productFor === 'wantOfferConfirm' && !this.isTradeEditForm)
          ? 'trades.create_listing.vendor.wants.back_to_confirm_trade_listing'
          : (!this.isTradeEditForm ?'trades.create_listing.vendor.wants.back_to_search'
             : (!this.itemId ? 'trades.back_to_trade_search': 'trades.back_to_trade_editing')))
    }
  },
  watch: {
    form(newVal) {
      this.selected_size = newVal.currentSize;
      this.box_condition = newVal.boxCondition;
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
      if (this.productFor === this.tradeOffer && this.itemId)
        return this.getTradeItems.filter(offerItem => offerItem.id !== this.itemId).map(i => parseInt(i.quantity)).reduce((a, b) => a + b, 0)
      else if (this.productFor === this.tradeOffer)
        return this.getTradeItems.map(i => parseInt(i.quantity)).reduce((a, b) => a + b, 0)
      if (this.productFor === this.wantOfferConfirm)
        return this.getTradeItemsWants.map(i => parseInt(i.selected_quantity))
          .reduce((a, b) => a + b, 0) - (this.product.selected_quantity ? this.product.selected_quantity : 0)
      if (this.productFor === this.wantOffer && this.itemId)
        return this.getTradeItemsWants.filter(wantItem => wantItem.id !== this.itemId).map(i => parseInt(i.selected_quantity))
          .reduce((a, b) => a + b, 0) - (this.selected_quantity ? this.selected_quantity : 0)

      return this.getTradeItemsWants.map(i => parseInt(i.selected_quantity))
        .reduce((a, b) => a + b, 0)
    },
    /**
     * This function is used to check validation of input fields of a product to be added
     * @returns {false|any|boolean}
     */
    isFormValid() {
      return (this.productFor === 'wantsList') ? ((this.product.packaging_conditions && this.box_condition !== null) &&
          this.selected_size !== null && this.isValidYear(this.year) && ((this.selectList.length > 0 && this.combinationId === null) || (this.combinationId > 0)))
        : ((parseInt(this.itemsCount()) + parseInt(this.quantity)) <= MAX_ITEMS_ALLOWED &&
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
      selectedProduct.product_id = productDetails.id
      selectedProduct.quantity = 1 // quantity would be always 1
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
        for (let i = 0; i < this.quantity; i++){
          selectedProduct = this.setSelectedItem(selectedProduct)
          this.$store.commit('trade/setYourTradeItems', selectedProduct)
        }
        this.$root.$emit('back_to_search_offer')
      }
      else if (this.productFor === PRODUCT_FOR_COUNTER_OFFER) {
        for (let i = 0; i < this.quantity; i++){
          selectedProduct = this.setSelectedItem(selectedProduct)
          this.$root.$emit('add_new_product', selectedProduct)
        }
      }
      else if (this.productFor === this.tradeOffer) {
        for (let i = 0; i < this.quantity; i++){
          selectedProduct = this.setSelectedItem(selectedProduct)
          if (this.itemId && i <= 0) {
            selectedProduct.id = this.itemId
              setTimeout(function() {
                _self.$store.commit('trades/updateTradeItems', selectedProduct)
              }, 100);
          } else{
            selectedProduct.id = null
            this.$store.commit('trades/setTradeItems', selectedProduct)
          }
        }
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
            selected_quantity: 1,
            selected_year: this.year,
            selected_size: this.selected_size,
            selected_size_name: 'Size ' + selectedProduct.sizes.filter(function(size) {
              return (size.id === _self.selected_size) ?
                'Size ' + size.size : null

            })[0].size,
            product: selectedProduct
          }

          for (let i = 0; i < this.quantity; i++){
            if (this.itemId && i <= 0) {
              selectedProductWithAttributes.id = this.itemId
              setTimeout(function() {
                _self.$store.commit('trades/updateWantsItemsTrade', selectedProductWithAttributes)
              }, 100);
            } else{
              selectedProductWithAttributes.id = null
              this.$store.commit('trades/setWantsItemsTrade', selectedProductWithAttributes)
            }
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
            this.$root.$emit('back_to_edit_combination')
        })
        .catch((error) => {
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
.input-col::v-deep
  .input-label
    font-family: $font-montserrat
    font-style: normal
    @include body-8-normal
    color: $color-black-1
    margin-left: 0px!important
    text-transform: uppercase
    margin-bottom: 8px
  .input
    .form-input
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

  .custom-dropdown
    .label-wrapper
      border-radius: 4px!important
      padding: 2px 10px
      height: 40px
      left: 16px
      border: 1px solid $color-blue-20
    ul
      border: 1px solid $color-blue-20
      li
        padding: 8px
        border-color:  $color-blue-20

.input-col-mobile::v-deep
  .input-label
    margin-bottom: 3px
    font-family: $font-montserrat
    font-style: normal
    @include body-9-medium
    color: $color-black-1
  .input
    .form-input
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

  .custom-dropdown
    .label-wrapper
      padding: 8px 10px
      left: 16px
      top: 804px
      border: 1px solid $white-5
      border-radius: 4px!important
    ul
      li
        padding: 12px

.progress-bar-container
  margin-bottom: -36px
</style>
