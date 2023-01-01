<template>
  <div>
    <div class="preference-heading">
      {{$t('trades.preferences.trade_preferences')}}
    </div>

    <div class="main-pref-container">
      <!-- Inventory Settings -->
      <b-col class="inventory-settings">
        <div class="invent-setting-head">
          {{$t('trades.preferences.inventory_settings')}}
        </div>
        <div class="invent-setting-sub-head">
          {{$t('trades.preferences.allow_other_traders_to')}}
        </div>
        <div class="d-flex mt-5 mb-4">
          <span class="invent-setting-option mr-3 current-status">
            {{$t('trades.preferences.current_status')}}
        </span>
          <custom-dropdown
            v-model="inventoryStatus"
            :options="inventoryStatusOptions"
            type="single-select"
            :label="inventoryStatusLabel"
            optionsWidth="custom"
            width="164px"
            variant="white"
            borderRadius="4px"
            padding-x="10px"
            padding-t="5px"
            padding-b="5px"
            @change="changeStatus"
            class="inventory-status-dropdown"
          />
        </div>
      </b-col>

      <!-- Your Inventory -->
      <b-col v-if="inventoryStatus === INVENTORY_STATUS_CUSTOM"  class="inventory-settings mt-4">
        <div class="invent-status-custom">
          {{$t('trades.your_inventory', {0: totalInventory})}}
        </div>
        <your-inventory @updateTotal="setTotalInventory" @change="changePublicInventories" />
      </b-col>

      <!-- Offers Settings -->
      <b-col class="inventory-offer-settings mt-4">
        <div class="offer-setting">
          {{$t('trades.preferences.offer_settings')}}
        </div>
        <div class="invent-setting-sub-head">
          {{$t('trades.preferences.other_traders_will_only_be_able')}}
        </div>
        <div class="mt-4 mb-4">
          <div class="mr-3 starting-at">
            {{$t('trades.preferences.starting_at')}}
          </div>
          <b-col class="d-flex justify-content-center" sm="12" md="12">
            <single-slider :value="fairTrade" :minValue="0" :maxValue="DEFAULT_INTERESTS" :textToShow="$t('trades.preferences.of_fair_offer')" :meterText="true" @slide="changeFairTrade" />
          </b-col>
        </div>
      </b-col>

      <!-- Refine Your Matches -->
      <b-col class="refine-settings mt-4 pb-5">
        <div class="refine-match">
          {{$t('trades.preferences.refine_your_matches')}}
        </div>
        <div class="invent-setting-sub-head">
          {{$t('trades.preferences.only_see_trade_matches_based')}}
        </div>
        <div class="mt-4 mb-2">
          <div class="invent-setting-option mr-3 d-flex flex-wrap offer-group">
            <b-col md="2" sm="12" class="d-flex pt-1">
              {{$t('trades.preferences.sneaker')}}
            </b-col>
            <b-col md="10" sm="12">
              <single-slider :value="sneakerInterest" :minValue="0" :maxValue="DEFAULT_INTERESTS" :belowText="true" :meterTextSneaker="true" @slide="changeSneakerInterest" />
            </b-col>
          </div>
        </div>
        <div class="mt-4 mb-2">
          <div class="invent-setting-option mr-3 d-flex flex-wrap offer-group">
            <b-col md="2" sm="12" class="d-flex pt-1">
              {{$t('trades.preferences.apparel')}}
            </b-col>
            <b-col md="10" sm="12">
              <single-slider :value="apparelInterest" :minValue="0" :maxValue="DEFAULT_INTERESTS" :belowText="true"  :meterTextSneaker="true" @slide="changeApparelInterest" />
            </b-col>
          </div>
        </div>
        <div class="mt-4 mb-3">
          <div class="invent-setting-option mr-3 d-flex flex-wrap offer-group">
            <b-col md="2" sm="12" class="d-flex pt-1">
              {{$t('trades.preferences.accessories')}}
            </b-col>
            <b-col md="10" sm="12">
              <single-slider :value="accessoriesInterest" :minValue="0" :maxValue="DEFAULT_INTERESTS" :belowText="true"  :meterTextSneaker="true" @slide="changeAccessoriesInterest" />
            </b-col>
          </div>
        </div>
      </b-col>

      <!-- Size Preferences -->
      <b-col class="size-settings mt-4">
        <div class="size-prefer pb-5">
          {{$t('trades.preferences.size_preferences')}}
        </div>
        <b-row class="pb-5">
          <b-col md="4" class="d-flex align-items-center" >
            <span class="invent-setting-option  size-type-left">
              {{$t('trades.preferences.size_type')}}
            </span>
            <client-only>
              <CustomDropdown
                v-model="sizeType"
                :options="filters.size_types"
                type="multi-select-checkbox"
                :label="sizeTypeLabel"
                :showFilterBtn="false"
                class="dropdown-margins"
                padding-x="10px"
                optionsWidth="custom"
                width="164px"
                drop-down-height="38px"
                variant="white"
                borderRadius="4px"
                @change="changeSizeTypeFilter"
              />
            </client-only>
          </b-col>
          <b-col md="4" class="d-flex align-items-center">
            <span class="invent-setting-option">{{$t('trades.preferences.sneaker')}}</span>
            <client-only>
              <CustomDropdown
                v-model="sizes"
                :options="filterOtherSizes"
                type="multi-select-checkbox"
                :label="sizesLabel"
                :showFilterBtn="false"
                class="dropdown-margins"
                optionsWidth="custom"
                padding-x="10px"
                width="164px"
                drop-down-height="38px"
                variant="white"
                borderRadius="4px"
                @change="changeSizeFilter"
              />
            </client-only>
          </b-col>
          <b-col md="4" class="d-flex align-items-center">
            <span class="invent-setting-option">{{$t('trades.preferences.apparel')}}</span>
            <client-only>
              <CustomDropdown
                v-model="apparelSize"
                :options="filterApparelSizes"
                type="multi-select-checkbox"
                :label="apparelSizesLabel"
                :showFilterBtn="false"
                class="dropdown-margins"
                optionsWidth="custom"
                padding-x="10px"
                width="164px"
                drop-down-height="38px"
                variant="white"
                borderRadius="4px"
                @change="changeApparelSizeFilter"
              />
            </client-only>
          </b-col>
        </b-row>
        <b-col class="d-flex">
          <b-col md="4" class="d-flex justify-content-start flex-wrap">
            <div  v-for="(size,index) in sizeType" :key="index" class="selected-size text-center mr-1 mb-3">
              {{size}}
              <img class="ml-3" :src="require('~/assets/img/size-cross.svg')" role="button" @click="removeSizeType(index)"/>
            </div>
          </b-col>
          <b-col md="4" class="d-flex justify-content-start flex-wrap">
            <div  v-for="(size,index) in sizes" :key="index" class="selected-size text-center mr-1 mb-3">
              {{size}}
              <img class="ml-3" :src="require('~/assets/img/size-cross.svg')" role="button" @click="removeSize(index)"/>
            </div>
          </b-col>
          <b-col md="4" class="d-flex justify-content-start flex-wrap">
            <div  v-for="(size,index) in apparelSize" :key="index" class="selected-size text-center mr-1 mb-3">
              {{size}}
              <img class="ml-3" :src="require('~/assets/img/size-cross.svg')" role="button" @click="removeApparelSize(index)"/>
            </div>
          </b-col>
        </b-col>
      </b-col>

      <!-- Brands Section -->
      <b-col class="brand-settings mt-4">
        <div class="brands-section">
          {{$t('trades.preferences.brands_i_am_looking_for')}}
        </div>
        <div class="invent-setting-sub-head">
          {{$t('trades.preferences.suggest_these_brands_to_find')}}
        </div>
        <b-row class="mt-4">
          <b-row>
            <b-col md="3" v-for="(brand,index) in filters.brands" :key="index" class="brand-section-left">
              <b-form-checkbox :checked="selectedBrands" :value="brand._id" @change="changeSelectedBrands(brand._id)"> <span class="brnad-name pl-3">{{brand.name}}</span>  </b-form-checkbox>
            </b-col>
          </b-row>
        </b-row>
      </b-col>

      <b-row class="justify-content-end pt-4">
        <span class="rest-btn" @click="$bvModal.show('resetModel')">
          {{$t('trades.preferences.reset_to_default_preferences')}}
        </span>
      </b-row>

    </div>
    <reset-modal @reset="resetToDefaultPreferences()" />
  </div>
</template>

<script>

import debounce from 'lodash.debounce';
import {mapActions, mapGetters} from 'vuex';
import CustomDropdown from '~/components/common/CustomDropdown';
import SingleSlider from '~/components/common/SingleSlider';
import YourInventory from '~/pages/profile/trades/preferences/YourInventory';
import ResetModal from '~/pages/profile/trades/preferences/ResetModal';
import {
  INVENTORY_STATUS_OPTIONS,
  APPAREL_SIZE_TYPE,
  INVENTORY_STATUS_CUSTOM,
  DEFAULT_INVENTORY_STATUS,
  DEFAULT_FAIR_TRADE,
  DEFAULT_INTERESTS
} from '~/static/constants/trades';

export default {
  name: 'Index',
  components: {ResetModal, YourInventory, SingleSlider, CustomDropdown},
  layout: 'Profile',
  data(){
    return {
      INVENTORY_STATUS_CUSTOM,
      APPAREL_SIZE_TYPE,
      DEFAULT_INVENTORY_STATUS,
      DEFAULT_FAIR_TRADE,
      DEFAULT_INTERESTS,
      totalInventory: 0,
      inventoryStatus: null,
      inventoryStatusOptions: INVENTORY_STATUS_OPTIONS.map(item => ({text: this.$t(item.text), value: item.value})),
      inventoryStatusLabel: this.$t('trades.preferences.status'),
      sizeTypeLabel: this.$t('trades.preferences.size_type'),
      sizeType: [],
      sizes: [],
      sizesLabel: this.$t('trades.preferences.size'),
      selectedBrands: [],
      categories: [
        { label: this.$t('common.all'), value: null },
        { label: this.$t('common.footwear'), value: 'sneakers' },
        { label: this.$t('common.apparel'), value: 'apparel' },
        { label: this.$tc('common.accessory', 2), value: 'accessories' },
      ],
      category: null,
      apparelSize: [],
      apparelSizesLabel: this.$t('trades.preferences.size'),
      filterApparelSizes: [],
      filterOtherSizes: [],
      fairTrade: DEFAULT_FAIR_TRADE,
      sneakerInterest: DEFAULT_INTERESTS,
      apparelInterest: DEFAULT_INTERESTS,
      accessoriesInterest: DEFAULT_INTERESTS,
      publicInventories: []

    }
  },
  computed:{
    ...mapGetters('browse', ['filters']), // getter for getting list of filters data
  },
  mounted() {
    this.filterApparelSizes = this.filters.sizes.filter(function (size) {
      return size.type === APPAREL_SIZE_TYPE
    })

    this.filterOtherSizes = this.filters.sizes.filter(function (size) {
      return size.type !== APPAREL_SIZE_TYPE
    })

    this.getTradePreferences()
    this.fetchFilters()
  },
  methods:{

    ...mapActions('browse', ['fetchFilters']), // getter to get filter listing from store
    ...mapActions('trade', ['fetchTradePreferences']), // getter to get trade preferences
    // get vendor trade preference
    getTradePreferences(){
      this.$axios
        .get('/trades/preferences')
        .then((response) => {  // list of vendor inventory
          const data = response.data.data
          this.changeStatus(data.inventory)
          this.sizeType = data.size_types
          this.sizes = data.sneaker_sizes
          this.apparelSize = data.apparel_sizes
          this.selectedBrands = data.brands
          this.fairTrade = data.fair_trade
          this.sneakerInterest = data.sneaker_interest
          this.apparelInterest = data.apparel_interest
          this.accessoriesInterest = data.accessories_interest
        })
        .catch((error) => {
          this.$toasted.error(this.$t(error.response.data.error))
        })
    },
    savePreference(){
      this.$axios
          .post('trades/preferences', {
            inventory: this.inventoryStatus,
            public_inventories: this.publicInventories.join(','),
            fair_trade: this.fairTrade,
            sneaker_interest: this.sneakerInterest,
            apparel_interest: this.apparelInterest,
            accessories_interest: this.accessoriesInterest,
            size_types: this.sizeType,
            sneaker_sizes: this.sizes,
            apparel_sizes: this.apparelSize,
            brands: this.selectedBrands
          })
          .then(() => {
            this.$toasted.success(this.$t('trades.preferences.preferences_updated_successfully'))
          })
          .catch((error) => {
            this.$toasted.error(this.$t(error.response.data.message))
          })
    },
    setTotalInventory(totalInventory){
      this.totalInventory = totalInventory
      this.savePreference()
    },
    changeFairTrade: debounce( function (val) {
      this.fairTrade = val
      this.savePreference()
    }, 1000),
    changeSneakerInterest: debounce( function (val) {
      this.sneakerInterest = val
      this.savePreference()
    }, 1000),
    changeApparelInterest: debounce( function (val) {
      this.apparelInterest = val
      this.savePreference()
    }, 1000),
    changeAccessoriesInterest: debounce( function (val) {
      this.accessoriesInterest = val
      this.savePreference()
    }, 1000),
    /**
     * This function is used to change product size filter
     * @param selectedSizeType
     */
    changeSizeTypeFilter(selectedSizeType) {

      if (!this.sizeType.includes(selectedSizeType)) {
        this.sizeType.push(selectedSizeType)
      } else {
        this.sizeType = this.sizeType.filter(item => item !== selectedSizeType)
      }
      this.sizeTypeLabel = this.$options.filters.joinAndCapitalizeFirstLetters(this.sizeType, 2) || this.$t('trades.create_listing.vendor.wants.size_type') // 2 is max number of labels show in filter
      this.savePreference()
    },

    /**
     * This function is used to change apparel size filter
     * for product
     * @param selectedApparelSize
     */
    changeApparelSizeFilter(selectedApparelSize) {
      if (!this.apparelSize.includes(selectedApparelSize.size)) {
        this.apparelSize.push(selectedApparelSize.size)
      } else {
        this.apparelSize = this.apparelSize.filter(item => item !== selectedApparelSize.size)
      }

      this.apparelSizesLabel = this.$options.filters.joinAndCapitalizeFirstLetters(this.apparelSize, 5)
        || this.$t('trades.create_listing.vendor.wants.size') // 5 is a max labels show in filter
      this.savePreference()
    },

    /**
     * This function is used to change size filter
     * for product
     * @param selectedSize
     */
    changeSizeFilter(selectedSize) {
      if (!this.sizes.includes(selectedSize.size)) {
        this.sizes.push(selectedSize.size)
      } else {
        this.sizes = this.sizes.filter(item => item !== selectedSize.size)
      }

      this.sizesLabel = this.$options.filters.joinAndCapitalizeFirstLetters(this.sizes, 5)
        || this.$t('trades.create_listing.vendor.wants.size') // 5 is a max labels show in filter
      this.savePreference()
    },

    /****
     * This function is used to change selected
     * type of product filter
     * @param selectedCategory
     */
    changeStatus(selectedStatus) {
      this.inventoryStatus = selectedStatus
      const FilteredKey = this.inventoryStatusOptions.find(item => item.value === this.inventoryStatus)
      this.inventoryStatusLabel = this.$options.filters.capitalizeFirstLetter(FilteredKey.text)
    },

    removeSizeType(index){
      this.sizeType.splice(index, 1)
      this.sizeTypeLabel = this.$options.filters.joinAndCapitalizeFirstLetters(this.sizeType, 2) || this.$t('trades.create_listing.vendor.wants.size_type') // 2 is max number of labels show in filter
      this.savePreference()
    },

    removeSize(index){
      this.sizes.splice(index, 1)
      this.sizesLabel = this.$options.filters.joinAndCapitalizeFirstLetters(this.sizes, 5)
        || this.$t('trades.create_listing.vendor.wants.size') // 5 is a max labels show in filter
      this.savePreference()
    },

    removeApparelSize(index){
      this.apparelSize.splice(index, 1)
      this.apparelSizesLabel = this.$options.filters.joinAndCapitalizeFirstLetters(this.apparelSize, 5)
        || this.$t('trades.create_listing.vendor.wants.size') // 5 is a max labels show in filter
      this.savePreference()
    },

    resetToDefaultPreferences(){
      this.changeStatus(DEFAULT_INVENTORY_STATUS)
      this.sizeType = []
      this.sizes = []
      this.apparelSize = []
      this.selectedBrands = []
      this.fairTrade = DEFAULT_FAIR_TRADE
      this.sneakerInterest = DEFAULT_INTERESTS
      this.apparelInterest = DEFAULT_INTERESTS
      this.accessoriesInterest = DEFAULT_INTERESTS
      this.savePreference()
    },

    changePublicInventories(selectedInventories){
      this.publicInventories = selectedInventories
      this.savePreference()
    },

    changeSelectedBrands(brandId){
      if(this.selectedBrands.includes(brandId)){
        this.selectedBrands = this.selectedBrands.filter(brand => brand !== brandId)
        this.savePreference()
      }else{
        this.selectedBrands.push(brandId)
        this.savePreference()
      }
    }

  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.preference-heading
  font-family: $font-family-montserrat
  font-style: normal
  @include heading-11
  color: $color-black-1
  padding: 50px 50px 65px 50px

.main-pref-container
  background: $color-white-5
  padding: 50px

.inventory-settings
  background: $color-white-1
  border-radius: 4px
  box-shadow: 0 1px 4px $drop-shadow1
  padding-bottom: 20px
.inventory-offer-settings
  background: $color-white-1
  border-radius: 4px
  box-shadow: 0 1px 4px $drop-shadow1
  padding-bottom: 30px
.refine-settings
  background: $color-white-1
  border-radius: 4px
  box-shadow: 0 1px 4px $drop-shadow1
.size-settings
  background: $color-white-1
  border-radius: 4px
  box-shadow: 0 1px 4px $drop-shadow1
  height: 325px
.brand-settings
  background: $color-white-1
  border-radius: 4px
  box-shadow: 0 1px 4px $drop-shadow1
.invent-setting-head
  font-family: $font-family-montserrat
  font-style: normal
  @include body-16-medium
  color: $color-black-1
  padding-top: 32px
  padding-left: 30px
  padding-bottom: 4px

.invent-status-custom
  font-family: $font-family-montserrat
  font-style: normal
  @include body-16-medium
  color: $color-black-1
  padding-top: 32px
  padding-left: 30px
.offer-setting
  font-family: $font-family-montserrat
  font-style: normal
  @include body-16-medium
  color: $color-black-1
  padding-left: 30px
  padding-top: 28px
  padding-bottom: 4px
.refine-match
  font-family: $font-family-montserrat
  font-style: normal
  @include body-16-medium
  color: $color-black-1
  padding-top: 32px
  padding-left: 30px
.size-prefer
  font-family: $font-family-montserrat
  font-style: normal
  @include body-16-medium
  color: $color-black-1
  padding-top: 32px
  padding-left: 30px
.brands-section
  font-family: $font-family-montserrat
  font-style: normal
  @include body-16-medium
  color: $color-black-1
  padding-top: 32px
  padding-left: 30px

.invent-setting-sub-head
  font-family: $font-montserrat
  font-style: normal
  @include body-5
  color: $color-gray-5
  padding-left: 30px
  font-weight: $medium

.invent-setting-option
  font-family: $font-family-montserrat
  font-style: normal
  @include body-2-medium
  color: $color-black-1

.brand
  background: $color-white-1
  border: 0.5px solid $color-gray-47
  box-shadow: 0 2px 4px $drop-shadow1
  border-radius: 8px
  width: 164px
  height: 151px

.checkbox-brand
  right: 5px
  top: 5px

.brand-image
  width: 165px
  height: 150px

.pr-39
  padding-right: 39px

.selected-size
  height: 24px
  background: $color-white-5
  border-radius: 5px
  color: $color-black-15
  font-family: $font-family-montserrat
  font-style: normal
  padding: 5px
  width: 109px
  @include body-10
.current-status
  padding-left: 30px
  padding-bottom: 64px
.inventory-status-dropdown
  @include body-5
  font-family: $medium
  font-family: $font-montserrat
.starting-at
  padding-top: 33px
  padding-left: 30px
  font-weight: $medium
  font-family: $font-montserrat
  @mixin body-20
  color: $color-black-1
  font-style: normal
.offer-group
  margin-left: 30px
.size-type-left
  margin-left: 40px
.dropdown-margins
  margin-left: 15px
.brand-section-left
  padding-left: 30px
.rest-btn
  border-bottom: 1px solid $color-black-1
.brnad-name
  font-family: $font-sp-pro
  font-style: normal
  font-weight: $normal
  @mixin body-13
  color: $color-gray-5
</style>
