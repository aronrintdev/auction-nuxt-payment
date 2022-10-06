<template>
<div>
  <div class="filter-container mt-2">
    <div class="d-flex mt-2 ml-2">
      <div class="filter-heading">
        Filters By
      </div>
      <div @click="closeFilter()">
        <img  class="cross-image" :src="require('~/assets/img/cross.svg')"/>
      </div>
    </div>
    <div class="mt-1 ml-2">
      <span class="filtersHeading">Sort</span>
      <b-form-radio-group
        class="radios mt-1 mb-1"
        v-model="orderFilters"
        :options="generalListItemsCustomFilter"
        :checked="getTradesFilter.orderFilter"
      />
    </div>
    <hr class="hr" />
    <div class="mt-1 ml-2">
      <div class="d-flex" v-b-toggle="'collapse-1'">
        <div class="filtersHeading">
          Category
        </div>
        <div class="d-flex">
<!--          <span class="selected-catgory pull-left">{{categoryFilter}}</span>-->
          <img  v-if="isVisible" class="arrow-image pull-right" :src="require('~/assets/img/upArrow.svg')"/>
          <img  v-else class="arrow-image pull-right" :src="require('~/assets/img/downArrow.svg')"/>
        </div>
      </div>
      <b-collapse id="collapse-1" v-model="isVisible">
          <div class="d-flex mt-3">
            <div :class="[getTradesFilter.category == 'footwear' ? 'selected-item' : 'footwear-box']" @click="category('footwear')">Footwear</div>
            <div :class="[getTradesFilter.category == 'apparel' ? 'selected-item' : 'apparel-box']" class="ml-2" @click="category('apparel')">Apparel</div>
            <div :class="[getTradesFilter.category == 'accessories' ? 'selected-item' : 'accessories-box']" class="ml-2"  @click="category('accessories')">Accessories</div>
          </div>
      </b-collapse>
    </div>
    <hr class="hr" />
    <div class="mt-1 ml-2">
      <div class="d-flex" v-b-toggle="'collapse-sizeType'">
        <div class="filtersHeading">
          Size Type
        </div>
        <div class="d-flex">
<!--          <span class="selected-catgory pull-left">{{sizeTypesFilter}}</span>-->
          <img  v-if="isVisibleSizeType" class="arrow-image pull-right" :src="require('~/assets/img/upArrow.svg')"/>
          <img  v-else class="arrow-image pull-right" :src="require('~/assets/img/downArrow.svg')"/>
        </div>
      </div>
      <b-collapse id="collapse-sizeType" v-model="isVisibleSizeType">
        <div class="d-flex mt-3">
          <div :class="[(this.sizeTypesFilter !== null && sizeTypesFilter.includes('men')) || (getTradesFilter.sizeType!== undefined && getTradesFilter.sizeType !== null && getTradesFilter.sizeType.includes('men')) ? 'selected-item' : 'footwear-box']" id="men-box" @click="onSelect('men')">Men</div>
          <div :class="[(this.sizeTypesFilter !== null && sizeTypesFilter.includes('women')) || (getTradesFilter.sizeType!== undefined && getTradesFilter.sizeType !== null && getTradesFilter.sizeType.includes('women')) ? 'selected-item' : 'footwear-box']"  class="ml-2" id="women-box" @click="onSelect('women')">Women</div>
          <div :class="[(this.sizeTypesFilter !== null && sizeTypesFilter.includes('unisex')) || (getTradesFilter.sizeType!== undefined && getTradesFilter.sizeType !== null && getTradesFilter.sizeType.includes('unisex')) ? 'selected-item' : 'footwear-box']" class="ml-2"  id="unisex-box" @click="onSelect('unisex')">Unisex</div>
        </div>
        <div class="d-flex mt-3">
          <div :class="[(this.sizeTypesFilter !== null  && sizeTypesFilter.includes('bigkids')) || (getTradesFilter.sizeType!== undefined && getTradesFilter.sizeType !== null && getTradesFilter.sizeType.includes('bigkids')) ? 'selected-item' : 'footwear-box']" @click="onSelect('bigkids')">Big Kids</div>
          <div :class="[(this.sizeTypesFilter !== null  && sizeTypesFilter.includes('littlekids')) || (getTradesFilter.sizeType!== undefined && getTradesFilter.sizeType !== null && getTradesFilter.sizeType.includes('littlekids') )? 'selected-item' : 'footwear-box']" class="ml-2" @click="onSelect('littlekids')">Little Kids</div>
          <div  :class="[(this.sizeTypesFilter !== null && sizeTypesFilter.includes('toddlers')) || (getTradesFilter.sizeType!== undefined && getTradesFilter.sizeType !== null && getTradesFilter.sizeType.includes('toddlers')) ? 'selected-item' : 'footwear-box']" class="ml-2" @click="onSelect('toddlers')">Toddlers</div>
        </div>
        <div class="d-flex mt-3">
          <div :class="[(this.sizeTypesFilter !== null && sizeTypesFilter.includes('infants')) || (getTradesFilter.sizeType!== undefined && getTradesFilter.sizeType !== null && getTradesFilter.sizeType.includes('infants')) ? 'selected-item' : 'footwear-box']" @click="onSelect('infants')">Infants</div>
        </div>
      </b-collapse>
    </div>
    <hr class="hr" />
    <div class="mt-1 ml-2">
      <div class="d-flex" v-b-toggle="'collapse-sizes'">
        <div class="filtersHeading">
          Sizes
        </div>
        <div class="d-flex">
          <!--          <span class="selected-catgory pull-left">{{sizeTypesFilter}}</span>-->
          <img  v-if="isVisibleSizes" class="arrow-image pull-right" :src="require('~/assets/img/upArrow.svg')"/>
          <img  v-else class="arrow-image pull-right" :src="require('~/assets/img/downArrow.svg')"/>
        </div>
      </div>
      <b-collapse id="collapse-sizes" v-model="isVisibleSizes">
        <div class="d-flex">
          <div :class="[(this.sizeFilter !== null && sizeFilter.includes('3.0')) || (getTradesFilter.sizes!== undefined && getTradesFilter.sizes !== null && getTradesFilter.sizes.includes('3.0')) ? 'selected-size' : 'size-box']" id="men-box" @click="onSelectSizes('3.0')">3.0</div>
          <div :class="[(this.sizeFilter !== null && sizeFilter.includes('3.5')) || (getTradesFilter.sizes!== undefined && getTradesFilter.sizes !== null && getTradesFilter.sizes.includes('3.5')) ? 'selected-size' : 'size-box']"  @click="onSelectSizes('3.5')">3.5</div>
          <div :class="[(this.sizeFilter !== null && sizeFilter.includes('4.0')) || (getTradesFilter.sizes!== undefined && getTradesFilter.sizes !== null && getTradesFilter.sizes.includes('4.0')) ? 'selected-size' : 'size-box']"  @click="onSelectSizes('4.0')">4.0</div>
          <div :class="[(this.sizeFilter !== null  && sizeFilter.includes('4.5')) || (getTradesFilter.sizes!== undefined && getTradesFilter.sizes !== null && getTradesFilter.sizes.includes('4.5')) ? 'selected-size' : 'size-box']" @click="onSelectSizes('4.5')">4.5</div>
          <div :class="[(this.sizeFilter !== null  && sizeFilter.includes('5.0')) || (getTradesFilter.sizes!== undefined && getTradesFilter.sizes !== null && getTradesFilter.sizes.includes('5.0') )? 'selected-size' : 'size-box']"  @click="onSelectSizes('5.0')">5.0</div>
        </div>
        <div class="d-flex">
          <div  :class="[(this.sizeFilter !== null && sizeFilter.includes('5.5')) || (getTradesFilter.sizes!== undefined && getTradesFilter.sizes !== null && getTradesFilter.sizes.includes('5.5')) ? 'selected-size' : 'size-box']" @click="onSelectSizes('5.5')">5.5</div>
          <div :class="[(this.sizeFilter !== null && sizeFilter.includes('6.0')) || (getTradesFilter.sizes!== undefined && getTradesFilter.sizes !== null && getTradesFilter.sizes.includes('6.0')) ? 'selected-size' : 'size-box']" @click="onSelectSizes('6.0')">6.0</div>
          <div :class="[(this.sizeFilter !== null && sizeFilter.includes('6.5')) || (getTradesFilter.sizes!== undefined && getTradesFilter.sizes !== null && getTradesFilter.sizes.includes('6.5')) ? 'selected-size' : 'size-box']" @click="onSelectSizes('6.5')">6.5</div>
          <div :class="[(this.sizeFilter !== null && sizeFilter.includes('7.0')) || (getTradesFilter.sizes!== undefined && getTradesFilter.sizes !== null && getTradesFilter.sizes.includes('7.0')) ? 'selected-size' : 'size-box']" @click="onSelectSizes('7.0')">7.0</div>
          <div :class="[(this.sizeFilter !== null && sizeFilter.includes('7.5')) || (getTradesFilter.sizes!== undefined && getTradesFilter.sizes !== null && getTradesFilter.sizes.includes('7.5')) ? 'selected-size' : 'size-box']" @click="onSelectSizes('7.5')">7.5</div>
        </div>
        <div class="d-flex">
          <div  :class="[(this.sizeFilter !== null && sizeFilter.includes('8.0')) || (getTradesFilter.sizes!== undefined && getTradesFilter.sizes !== null && getTradesFilter.sizes.includes('8.0')) ? 'selected-size' : 'size-box']"  @click="onSelectSizes('8.0')">8.0</div>
          <div :class="[(this.sizeFilter !== null && sizeFilter.includes('8.5')) || (getTradesFilter.sizes!== undefined && getTradesFilter.sizes !== null && getTradesFilter.sizes.includes('8.5')) ? 'selected-size' : 'size-box']" @click="onSelectSizes('8.5')">8.5</div>
          <div :class="[(this.sizeFilter !== null && sizeFilter.includes('9.0')) || (getTradesFilter.sizes!== undefined && getTradesFilter.sizes !== null && getTradesFilter.sizes.includes('9.0')) ? 'selected-size' : 'size-box']" @click="onSelectSizes('9.0')">9.0</div>
          <div :class="[(this.sizeFilter !== null && sizeFilter.includes('9.5')) || (getTradesFilter.sizes!== undefined && getTradesFilter.sizes !== null && getTradesFilter.sizes.includes('9.5')) ? 'selected-size' : 'size-box']" @click="onSelectSizes('9.5')">9.5</div>
          <div :class="[(this.sizeFilter !== null && sizeFilter.includes('10.0')) || (getTradesFilter.sizes!== undefined && getTradesFilter.sizes !== null && getTradesFilter.sizes.includes('10.0')) ? 'selected-size' : 'size-box']" @click="onSelectSizes('10.0')">10.0</div>
        </div>
        <div class="d-flex">
          <div  :class="[(this.sizeFilter !== null && sizeFilter.includes('10.5')) || (getTradesFilter.sizes!== undefined && getTradesFilter.sizes !== null && getTradesFilter.sizes.includes('10.5')) ? 'selected-size' : 'size-box']"  @click="onSelectSizes('10.5')">10.5</div>
          <div :class="[(this.sizeFilter !== null && sizeFilter.includes('11.0')) || (getTradesFilter.sizes!== undefined && getTradesFilter.sizes !== null && getTradesFilter.sizes.includes('11.0')) ? 'selected-size' : 'size-box']" @click="onSelectSizes('11.0')">11.0</div>
          <div :class="[(this.sizeFilter !== null && sizeFilter.includes('11.5')) || (getTradesFilter.sizes!== undefined && getTradesFilter.sizes !== null && getTradesFilter.sizes.includes('11.5')) ? 'selected-size' : 'size-box']" @click="onSelectSizes('11.5')">11.5</div>
          <div :class="[(this.sizeFilter !== null && sizeFilter.includes('12.0')) || (getTradesFilter.sizes!== undefined && getTradesFilter.sizes !== null && getTradesFilter.sizes.includes('12.0')) ? 'selected-size' : 'size-box']" @click="onSelectSizes('12.0')">12.0</div>
          <div :class="[(this.sizeFilter !== null && sizeFilter.includes('12.5')) || (getTradesFilter.sizes!== undefined && getTradesFilter.sizes !== null && getTradesFilter.sizes.includes('12.5')) ? 'selected-size' : 'size-box']" @click="onSelectSizes('12.5')">12.5</div>
        </div>
        <div class="d-flex">
          <div  :class="[(this.sizeFilter !== null && sizeFilter.includes('13.0')) || (getTradesFilter.sizes!== undefined && getTradesFilter.sizes !== null && getTradesFilter.sizes.includes('13.0')) ? 'selected-size' : 'size-box']" @click="onSelectSizes('13.0')">13.0</div>
          <div :class="[(this.sizeFilter !== null && sizeFilter.includes('13.5')) || (getTradesFilter.sizes!== undefined && getTradesFilter.sizes !== null && getTradesFilter.sizes.includes('13.5')) ? 'selected-size' : 'size-box']" @click="onSelectSizes('13.5')">13.5</div>
          <div :class="[(this.sizeFilter !== null && sizeFilter.includes('14.0')) || (getTradesFilter.sizes!== undefined && getTradesFilter.sizes !== null && getTradesFilter.sizes.includes('14.0')) ? 'selected-size' : 'size-box']" @click="onSelectSizes('14.0')">14.0</div>
          <div :class="[(this.sizeFilter !== null && sizeFilter.includes('14.5')) || (getTradesFilter.sizes!== undefined && getTradesFilter.sizes !== null && getTradesFilter.sizes.includes('14.5')) ? 'selected-size' : 'size-box']" @click="onSelectSizes('14.5')">14.5</div>
          <div :class="[(this.sizeFilter !== null && sizeFilter.includes('15.0')) || (getTradesFilter.sizes!== undefined && getTradesFilter.sizes !== null && getTradesFilter.sizes.includes('15.0')) ? 'selected-size' : 'size-box']" @click="onSelectSizes('15.0')">15.0</div>
        </div>
        <div class="d-flex">
          <div  :class="[(this.sizeFilter !== null && sizeFilter.includes('15.5')) || (getTradesFilter.sizes!== undefined && getTradesFilter.sizes !== null && getTradesFilter.sizes.includes('15.5')) ? 'selected-size' : 'size-box']" @click="onSelectSizes('15.5')">15.5</div>
          <div :class="[(this.sizeFilter !== null && sizeFilter.includes('16.0')) || (getTradesFilter.sizes!== undefined && getTradesFilter.sizes !== null && getTradesFilter.sizes.includes('16.0')) ? 'selected-size' : 'size-box']" @click="onSelectSizes('16.0')">16.0</div>
          <div :class="[(this.sizeFilter !== null && sizeFilter.includes('16.5')) || (getTradesFilter.sizes!== undefined && getTradesFilter.sizes !== null && getTradesFilter.sizes.includes('16.5')) ? 'selected-size' : 'size-box']" @click="onSelectSizes('16.5')">16.5</div>
          <div :class="[(this.sizeFilter !== null && sizeFilter.includes('17.0')) || (getTradesFilter.sizes!== undefined && getTradesFilter.sizes !== null && getTradesFilter.sizes.includes('17.0')) ? 'selected-size' : 'size-box']" @click="onSelectSizes('17.0')">17.0</div>
          <div :class="[(this.sizeFilter !== null && sizeFilter.includes('17.5')) || (getTradesFilter.sizes!== undefined && getTradesFilter.sizes !== null && getTradesFilter.sizes.includes('17.5')) ? 'selected-size' : 'size-box']" @click="onSelectSizes('17.5')">17.5</div>
        </div>
        <div class="d-flex">
          <div  :class="[(this.sizeFilter !== null && sizeFilter.includes('18.0')) || (getTradesFilter.sizes!== undefined && getTradesFilter.sizes !== null && getTradesFilter.sizes.includes('18.0')) ? 'selected-size' : 'size-box']" @click="onSelectSizes('18.0')">18.0</div>
          <div :class="[(this.sizeFilter !== null && sizeFilter.includes('18.5')) || (getTradesFilter.sizes!== undefined && getTradesFilter.sizes !== null && getTradesFilter.sizes.includes('18.5')) ? 'selected-size' : 'size-box']" @click="onSelectSizes('18.5')">18.5</div>
          <div :class="[(this.sizeFilter !== null && sizeFilter.includes('19.0')) || (getTradesFilter.sizes!== undefined && getTradesFilter.sizes !== null && getTradesFilter.sizes.includes('19.0')) ? 'selected-size' : 'size-box']" @click="onSelectSizes('19.0')">19.0</div>
        </div>
      </b-collapse>
    </div>
    <hr class="hr" />
    <div class="d-flex">
      <div class="reset" @click="clearFilters">Reset</div>
      <div>
        <b-btn class="filter-btn" @click="sendEmit()">
          {{ $t('create_listing.trade.offer_items.filter_btn') }}
        </b-btn>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters} from 'vuex'
import {IMAGE_PATH, MAX_ITEMS_ALLOWED, PRODUCT_FALLBACK_URL} from '~/static/constants';


export default {
  name: 'filtersMobile.vue',
  data() {
    return {
      order:'',
      isVisible: false,
      isVisibleSizeType:false,
      isVisibleSizes:false,
      filterSection:false,
      IMAGE_PATH, // Image path const
      MAX_ITEMS_ALLOWED,
      selected_category: null,
      productsFilter: 'most_viewed',
      selected_checkbox: [],
      search_item: null,
      steps: [
        {name: this.$t('trades.create_listing.vendor.wants.offer_items'), active: true},
        {name: this.$t('trades.create_listing.vendor.wants.enter_what_you_want'), active: false},
        {name: this.$t('trades.create_listing.vendor.wants.confirm_trade'), active: false}
      ],
      searchText: null,
      searchedItems: [],
      categoryItems: [
        {text: this.$t('common.footwear'), value: 'sneakers'},
        {text: this.$t('common.apparel'), value: 'apparel'},
        {text: this.$tc('common.accessory', 2), value: 'accessories'},
      ],
      categoryFilter: '',
      sizeTypesFilter: [],
      sizeFilter: [],
      categoryFilterLabel: this.$t('trades.create_listing.vendor.wants.category'),
      sizeTypesFilterLabel: this.$t('trades.create_listing.vendor.wants.size_type'),
      sizeFilterLabel: this.$t('trades.create_listing.vendor.wants.size'),
      inventory_items: [],
      page: 1,
      perPage: 4,
      totalCount: 0,
      perPageOptions: [4, 8, 16, 24],
      orderFilters: null,
      generalListItemsCustomFilter: [
        { text: this.$t('trades.create_listing.vendor.wants.price_low_to_high'), value: 'price_low_to_high' },
        { text: this.$t('trades.create_listing.vendor.wants.price_high_to_low'), value: 'price_high_to_low' },
      ],
      orderFilterLabel: this.$t('trades.create_listing.vendor.wants.sort_by'),
      itemListingId: 0,
      alreadyListedItemDetails: {},
      fallbackImgUrl: PRODUCT_FALLBACK_URL,
    }
  },

  computed: {
    ...mapGetters('trades', ['getTradesFilter']),
  },
  watch:{
    orderFilters(order) {
      this.orderFilters = order
    },
  },
  created() {
    this.orderFilters = this.getTradesFilter.orderFilter
    this.categoryFilter = this.getTradesFilter.category ? this.getTradesFilter.category :''
  },

  methods :{
    category(cat) {
      this.selected_category = cat
    },
    sendEmit() {
      const filtersData = {
        orderFilter :  this.getTradesFilter.orderFilter !== null ? this.getTradesFilter.orderFilter : this.orderFilters,
        category :   this.getTradesFilter.category !== null ? this.getTradesFilter.category : this.selected_category,
        sizeType : this.getTradesFilter.sizeType.length > 0 ? this.getTradesFilter.sizeType :  this.sizeTypesFilter,
        sizes : this.getTradesFilter.sizes.length > 0 ? this.getTradesFilter.sizes :  this.sizeFilter,
      }
      this.$store.commit('trades/setTradeFilters', filtersData)
      this.$emit('click',filtersData)
    },
    clearFilters() {
      this.selected_category = null
      this.orderFilters = null
      this.categoryFilter = null
      this.sizeTypesFilter = []
      const resetFiltersData = {
        orderFilter :  this.orderFilters === undefined ? null  : this.orderFilters,
        category : this.selected_category,
        sizeType: this.sizeTypesFilter,
      }
      this.$store.commit('trades/setTradeFilters', resetFiltersData)
      this.$emit('click',resetFiltersData)
    },
    closeFilter() {
      this.$root.$emit('closeFilters', false)
    },

    onSelect(item) {
      if(this.sizeTypesFilter !== null && this.sizeTypesFilter.includes(item)) {
       const checkArray = this.sizeTypesFilter.indexOf(item)
        this.sizeTypesFilter.splice(checkArray,1)
      } else if(this.getTradesFilter.sizeType !== undefined && this.getTradesFilter.sizeType !== null && this.getTradesFilter.sizeType.length > 0)  {
        if(this.getTradesFilter.sizeType.includes(item)) {
          this.$store.commit('trades/setTradeFiltersRemove', item)
        } else {
          this.$store.commit('trades/setTradeFiltersUpdated', item)
        }
      }
      else {
        this.sizeTypesFilter.push(item)
      }
    },


    onSelectSizes(item) {
      if(this.sizeFilter !== null && this.sizeFilter.includes(item)) {
        const checkSizes = this.sizeFilter.indexOf(item)
        this.sizeFilter.splice(checkSizes,1)
      }
      else if(this.getTradesFilter.sizes !== undefined && this.getTradesFilter.sizes !== null && this.getTradesFilter.sizes.length > 0)
      {
        if(this.getTradesFilter.sizes.includes(item)) {
          this.$store.commit('trades/setTradeFiltersRemoveSizes', item)
        } else {
          this.$store.commit('trades/setTradeFiltersUpdatedSizes', item)
        }
      }
      else {
        this.sizeFilter.push(item)
      }
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.filter-container
   height: 1000px
   width: 340px
   background-color: #fff
   border-radius: 5px
   @media (min-width: 300px)  and (max-width: 349px)
    width: 290px
.filter-heading
  font-size: 18px
  font-weight: 700
  font-family: SF Pro Display
.cross-image
  margin-left: 14rem
.arrow-image
  height: 11px
  width: 11px
  margin-top: 7px
  margin-left: 7px
.filtersHeading
  font-size: 16px
  font-weight: 700
  font-family: SF Pro Display
  color: #667799
.radios
  font-size: 14px
  font-weight: 500
  color: #424242
  display: grid
.hr
  border-top: 1px solid #E1E1E1
  width: 318px
.cat-box
  width: 99px
  height: 45px
  border-radius: 3px
  background: #FFFFFF
  border: 1px solid #999999
  font-size: 14px
  font-weight: 500
  font-family: SF Pro Display
  color: #999999
  padding-top: 10px
  padding-left: 14px
  cursor: pointer
.footwear-box
  width: 99px
  height: 45px
  border-radius: 3px
  background: #FFFFFF
  border: 1px solid #999999
  font-size: 14px
  font-weight: 500
  font-family: SF Pro Display
  color: #999999
  padding-top: 10px
  padding-left: 20px
  cursor: pointer
.apparel-box
  width: 99px
  height: 45px
  border-radius: 3px
  background: #FFFFFF
  border: 1px solid #999999
  font-size: 14px
  font-weight: 500
  font-family: SF Pro Display
  color: #999999
  padding-top: 10px
  padding-left: 25px
  cursor: pointer
.accessories-box
  width: 99px
  height: 45px
  border-radius: 3px
  background: #FFFFFF
  border: 1px solid #999999
  font-size: 14px
  font-weight: 500
  font-family: SF Pro Display
  color: #999999
  padding-top: 10px
  padding-left: 10px
  cursor: pointer
.reset
  margin-left: 11px
  padding-top: 0.5rem
  padding-left: 3rem
  width: 135px
  height: 40px
  border-radius: 20px
  border: 1px solid #000000
  color: #000000
  font-size: 16px
  font-family: SF Pro Display
  font-weight: 600
  cursor: pointer
  @media (min-width: 300px)  and (max-width: 349px)
    padding-left: 25px
.filter-btn
   width: 135px
   height: 40px
   background: #667799
   border-radius: 20px
   font-family: 'SF Pro Display'
   font-weight: 600
   font-size: 16px
   line-height: 19px
   text-align: center
   color: #FFFFFF
   cursor: pointer
   margin-left: 3rem
.selected-catgory
  font-size: 16px
  font-weight: 500
  font-family: SF Pro Display
  color: #000000
  //margin-left: 10rem
.selected-item
  width: 99px
  height: 45px
  border-radius: 3px
  border: 1px solid #000
  font-size: 14px
  font-weight: 600
  font-family: SF Pro Display
  color: #999999
  padding-top: 10px
  padding-left: 20px
  cursor: pointer
  background: #F2F2F2
.selected-size
  width: 42px
  height: 42px
  border-radius: 3px
  border: 1px solid #000
  font-size: 14px
  font-weight: 600
  font-family: SF Pro Display
  color: #999999
  padding: 5px
  cursor: pointer
  background: #F2F2F2
  margin: 2px
.size-box
  width: 42px
  height: 42px
  border-radius: 3px
  background: #FFFFFF
  border: 1px solid #999999
  font-size: 14px
  font-weight: 500
  font-family: SF Pro Display
  color: #999999
  padding: 5px
</style>
