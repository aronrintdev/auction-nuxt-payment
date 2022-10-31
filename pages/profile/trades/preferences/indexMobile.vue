<template>
  <div>
    <div class="main-container ml-3 m-2 mt-5" v-if="mainPageList">
      <div class="p-2 mt-1" @click="inventorySettings()">
        <div class="d-flex mb-1">
          <div class="inven-set d-flex justify-content-start align-content-start mt-2">Inventory Settings </div>
          <img class="chev-img d-flex justify-content-end align-content-end mt-2" src="~/assets/img/left-chev.svg" />
        </div>
        <div class="inven-sub-set mb-1"> Set privacy settings for your inventory </div>
        <div class="link-text"> Public </div>
      </div>
      <hr class="hr-border"/>
      <div class="p-2 mt-1">
        <div class="d-flex mb-1">
          <div class="inven-set d-flex justify-content-start align-content-start mt-2">Offer Settings </div>
          <img class="chev-img-offer d-flex justify-content-end align-content-end mt-2" src="~/assets/img/left-chev.svg" />
        </div>
        <div class="inven-sub-set mb-1"> Customize the min. value (%) of incoming offers </div>
        <div class="link-text"> Starting at: 25% of Fair Offers </div>
      </div>
      <hr class="hr-border"/>
      <div class="p-2 mt-1">
        <div class="d-flex mb-1">
          <div class="inven-set d-flex justify-content-start align-content-start mt-2"> Size Preferences </div>
          <img class="chev-img-size d-flex justify-content-end align-content-end mt-2" src="~/assets/img/left-chev.svg" />
        </div>
        <div class="inven-sub-set mb-1"> Select prefered size type and sizes   </div>
        <div class="link-text"> Men’s: 5.5, 13, 12....  </div>
      </div>
      <hr class="hr-border"/>
      <div class="p-2 mt-1">
        <div class="d-flex mb-1">
          <div class="inven-set d-flex justify-content-start align-content-start mt-2"> Brand Preferences </div>
          <img class="chev-img d-flex justify-content-end align-content-end mt-2" src="~/assets/img/left-chev.svg" />
        </div>
        <div class="inven-sub-set mb-1"> Select brands you are interested in  </div>
        <div class="link-text"> Nike, Supreme, Bape  </div>
      </div>
      <hr class="hr-border"/>
    </div>
    <div v-if="showInventory">
      <div class="inven-cont ml-3 m-2 p-3">
        <div class="inven-set">Inventory Settings</div>
        <div class="inven-sub-set mb-2 mt-2">
          Set what other traders are able to view when placing
          an offer
        </div>
        <div  v-for="(status, index) in inventoryStatusOptions" :key="index">
         <div  @click="changeStatus(status.value)" class="option-status p-3">
           {{status.text}}  <img class="image-tick" v-if="status.value == inventoryStatus" src="~/assets/img/tick.svg" />
         </div>
        </div>
      </div>
      <div>
       <b-btn class="save-btn ml-3" @click="savePreference">
         Save Changes
       </b-btn>
      </div>
    </div>

    <div class="inven-cont ml-3 m-2 p-3" v-if="inventoryStatus === INVENTORY_STATUS_CUSTOM" >
     <div>
       <your-inventory @updateTotal="setTotalInventory" @change="changePublicInventories" />
     </div>
      <b-btn class="save-btn ml-3" @click="savePreference">
        Save Changes
      </b-btn>
    </div>
















    <div class="main-pref-container">
      <!-- Your Inventory -->
<!--      <b-col v-if="inventoryStatus === INVENTORY_STATUS_CUSTOM"  class="inventory-settings mt-4">-->
<!--        <div class="invent-setting-head">-->
<!--          {{$t('trades.your_inventory', {0: totalInventory})}}-->
<!--        </div>-->
<!--        <your-inventory @updateTotal="setTotalInventory" @change="changePublicInventories" />-->
<!--        <b-row class="justify-content-center pt-3">-->
<!--          <Button variant="primary" class="mr-4" pill @click="savePreference()">-->
<!--            {{$t('trades.preferences.save_changes')}}-->
<!--          </Button>-->
<!--          <Button variant="grey-light" pill @click="getTradePreferences()">-->
<!--            {{$t('trades.preferences.discard_changes')}}-->
<!--          </Button>-->
<!--        </b-row>-->
<!--      </b-col>-->

      <!-- Offers Settings -->
      <b-col class="inventory-settings mt-4">
        <div class="invent-setting-head">
          {{$t('trades.preferences.offer_settings')}}
        </div>
        <div class="invent-setting-sub-head">
          {{$t('trades.preferences.other_traders_will_only_be_able')}}
        </div>
        <div class="mt-4 mb-4">
          <div class="invent-setting-option mr-3">
            {{$t('trades.preferences.starting_at')}}
          </div>
          <b-col class="d-flex justify-content-center" sm="12" md="12">
            <single-slider :value="fairTrade" :minValue="0" :maxValue="DEFAULT_INTERESTS" :textToShow="$t('trades.preferences.of_fair_offer')" :meterText="true" @slide="changeFairTrade" />
          </b-col>
          <b-row class="justify-content-center pt-3">
            <Button variant="primary" class="mr-4" pill @click="savePreference()">
              {{$t('trades.preferences.save_changes')}}
            </Button>
            <Button variant="grey-light" pill @click="getTradePreferences()">
              {{$t('trades.preferences.discard_changes')}}
            </Button>
          </b-row>
        </div>
      </b-col>

      <!-- Refine Your Matches -->
      <b-col class="inventory-settings mt-4 pb-5">
        <div class="invent-setting-head">
          {{$t('trades.preferences.refine_your_matches')}}
        </div>
        <div class="invent-setting-sub-head">
          {{$t('trades.preferences.only_see_trade_matches_based')}}
        </div>
        <div class="mt-4 mb-2">
          <div class="invent-setting-option mr-3 d-flex flex-wrap">
            <b-col md="2" sm="12" class="d-flex pt-1">
              {{$t('trades.preferences.sneaker')}}
            </b-col>
            <b-col md="10" sm="12">
              <single-slider :value="sneakerInterest" :minValue="0" :maxValue="DEFAULT_INTERESTS" :belowText="true" @slide="changeSneakerInterest" />
            </b-col>
          </div>
        </div>
        <div class="mt-4 mb-2">
          <div class="invent-setting-option mr-3 d-flex flex-wrap">
            <b-col md="2" sm="12" class="d-flex pt-1">
              {{$t('trades.preferences.apparel')}}
            </b-col>
            <b-col md="10" sm="12">
              <single-slider :value="apparelInterest" :minValue="0" :maxValue="DEFAULT_INTERESTS" :belowText="true" @slide="changeApparelInterest" />
            </b-col>
          </div>
        </div>
        <div class="mt-4 mb-3">
          <div class="invent-setting-option mr-3 d-flex flex-wrap">
            <b-col md="2" sm="12" class="d-flex pt-1">
              {{$t('trades.preferences.accessories')}}
            </b-col>
            <b-col md="10" sm="12">
              <single-slider :value="accessoriesInterest" :minValue="0" :maxValue="DEFAULT_INTERESTS" :belowText="true" @slide="changeAccessoriesInterest" />
            </b-col>
          </div>
        </div>
        <b-row class="justify-content-center pt-3">
          <Button variant="primary" class="mr-4" pill @click="savePreference()">
            {{$t('trades.preferences.save_changes')}}
          </Button>
          <Button variant="grey-light" pill @click="getTradePreferences()">
            {{$t('trades.preferences.discard_changes')}}
          </Button>
        </b-row>
      </b-col>

      <!-- Size Preferences -->
      <b-col class="inventory-settings mt-4">
        <div class="invent-setting-head pb-5">
          {{$t('trades.preferences.size_preferences')}}
        </div>
        <b-row class="pb-5">
          <b-col md="4" class="d-flex align-items-center" >
            <span class="invent-setting-option pr-39">
              {{$t('trades.preferences.size_type')}}
            </span>
            <client-only>
              <CustomDropdown
                v-model="sizeType"
                :options="filters.size_types"
                type="multi-select-checkbox"
                :label="sizeTypeLabel"
                :showFilterBtn="false"
                class="mr-3 width-156"
                optionsWidth="custom"
                width="164px"
                variant="white"
                borderRadius="4px"
                @change="changeSizeTypeFilter"
              />
            </client-only>
          </b-col>
          <b-col md="4" class="d-flex align-items-center">
            <span class="invent-setting-option pr-39">{{$t('trades.preferences.sneaker')}}</span>
            <client-only>
              <CustomDropdown
                v-model="sizes"
                :options="filterOtherSizes"
                type="multi-select-checkbox"
                :label="sizesLabel"
                :showFilterBtn="false"
                class="mr-3 width-156"
                optionsWidth="custom"
                width="164px"
                variant="white"
                borderRadius="4px"
                @change="changeSizeFilter"
              />
            </client-only>
          </b-col>
          <b-col md="4" class="d-flex align-items-center">
            <span class="invent-setting-option pr-39">{{$t('trades.preferences.apparel')}}</span>
            <client-only>
              <CustomDropdown
                v-model="apparelSize"
                :options="filterApparelSizes"
                type="multi-select-checkbox"
                :label="apparelSizesLabel"
                :showFilterBtn="false"
                class="mr-3 width-156"
                optionsWidth="custom"
                width="164px"
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
              <img class="ml-3" :src="require('~/assets/img/trades/small-cross.svg')" role="button" @click="removeSizeType(index)"/>
            </div>
          </b-col>
          <b-col md="4" class="d-flex justify-content-start flex-wrap">
            <div  v-for="(size,index) in sizes" :key="index" class="selected-size text-center mr-1 mb-3">
              {{size}}
              <img class="ml-3" :src="require('~/assets/img/trades/small-cross.svg')" role="button" @click="removeSize(index)"/>
            </div>
          </b-col>
          <b-col md="4" class="d-flex justify-content-start flex-wrap">
            <div  v-for="(size,index) in apparelSize" :key="index" class="selected-size text-center mr-1 mb-3">
              {{size}}
              <img class="ml-3" :src="require('~/assets/img/trades/small-cross.svg')" role="button" @click="removeApparelSize(index)"/>
            </div>
          </b-col>
        </b-col>
        <b-row class="justify-content-center pt-3">
          <Button variant="primary" class="mr-4" pill @click="savePreference()">
            {{$t('trades.preferences.save_changes')}}
          </Button>
          <Button variant="grey-light" pill @click="getTradePreferences()">
            {{$t('trades.preferences.discard_changes')}}
          </Button>
        </b-row>
      </b-col>

      <!-- Brands Section -->
      <b-col class="inventory-settings mt-4">
        <div class="invent-setting-head">
          {{$t('trades.preferences.brands_i_am_looking_for')}}
        </div>
        <div class="invent-setting-sub-head">
          {{$t('trades.preferences.suggest_these_brands_to_find')}}
        </div>
        <b-row class="mt-4">
          <div  v-for="(brand,index) in filters.brands" :key="index" class="brand mr-5 mb-5">
            <div class="position-relative">
              <div class="position-absolute checkbox-brand">
                <b-form-checkbox :checked="selectedBrands" :value="brand._id" @change="changeSelectedBrands(brand._id)"></b-form-checkbox>
              </div>
              <div>
                <img :src="brand.image" class="brand-image">
              </div>
            </div>
          </div>
        </b-row>
        <b-row class="justify-content-center pt-3">
          <Button variant="primary" class="mr-4" pill @click="savePreference()">
            {{$t('trades.preferences.save_changes')}}
          </Button>
          <Button variant="grey-light" pill @click="getTradePreferences()">
            {{$t('trades.preferences.discard_changes')}}
          </Button>
        </b-row>
      </b-col>

      <b-row class="justify-content-end pt-4">
        <Button variant="grey-light" pill @click="$bvModal.show('resetModel')">
          {{$t('trades.preferences.reset_to_default_preferences')}}
        </Button>
      </b-row>

    </div>
    <reset-modal @reset="resetToDefaultPreferences()" />
  </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex';
import CustomDropdown from '~/components/common/CustomDropdown';
import SingleSlider from '~/components/common/SingleSlider';
import Button from '~/components/common/Button';
import YourInventory from '~/pages/profile/trades/preferences/YourInventoryMobile';
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
  components: {ResetModal, YourInventory, Button, SingleSlider, CustomDropdown},
  layout: 'Profile',
  data(){
    return {
      showInventory:false,
      mainPageList:true,
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
    inventorySettings(){
      this.showInventory = true
      this.mainPageList = false
    },
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
            this.showInventory = false
            this.mainPageList = true
          })
          .catch((error) => {
            this.$toasted.error(this.$t(error.response.data.message))
          })
    },
    setTotalInventory(totalInventory){
      this.totalInventory = totalInventory
    },
    changeFairTrade(val){
      this.fairTrade = val
    },
    changeSneakerInterest(val){
      this.sneakerInterest = val
    },
    changeApparelInterest(val){
      this.apparelInterest = val
    },
    changeAccessoriesInterest(val){
      this.accessoriesInterest = val
    },
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
    },

    /****
     * This function is used to change selected
     * type of product filter
     * @param selectedCategory
     */
    changeStatus(selectedStatus) {
      console.log('selectedStatus',selectedStatus)
      if(selectedStatus === 'customize') {
        console.log('come in')
        this.showInventory = false
      }
      this.inventoryStatus = selectedStatus
      const FilteredKey = this.inventoryStatusOptions.find(item => item.value === this.inventoryStatus)
      this.inventoryStatusLabel = this.$options.filters.capitalizeFirstLetter(FilteredKey.text)
    },

    removeSizeType(index){
      this.sizeType.splice(index, 1)
      this.sizeTypeLabel = this.$options.filters.joinAndCapitalizeFirstLetters(this.sizeType, 2) || this.$t('trades.create_listing.vendor.wants.size_type') // 2 is max number of labels show in filter
    },

    removeSize(index){
      this.sizes.splice(index, 1)
      this.sizesLabel = this.$options.filters.joinAndCapitalizeFirstLetters(this.sizes, 5)
        || this.$t('trades.create_listing.vendor.wants.size') // 5 is a max labels show in filter
    },

    removeApparelSize(index){
      this.apparelSize.splice(index, 1)
      this.apparelSizesLabel = this.$options.filters.joinAndCapitalizeFirstLetters(this.apparelSize, 5)
        || this.$t('trades.create_listing.vendor.wants.size') // 5 is a max labels show in filter
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
    },

    changeSelectedBrands(brandId){
      if(this.selectedBrands.includes(brandId)){
        this.selectedBrands = this.selectedBrands.filter(brand => brand !== brandId)
      }else{
        this.selectedBrands.push(brandId)
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
  padding: 50px

.main-pref-container
  background: $color-white-1
  padding: 50px

.inventory-settings
  background: $color-white-1
  border-radius: 4px
  box-shadow: 0 1px 4px $drop-shadow1
  padding: 30px

.invent-setting-head
  font-family: $font-family-montserrat
  font-style: normal
  @include body-16-medium
  color: $color-black-1

.invent-setting-sub-head
  font-family: $font-family-montserrat
  font-style: normal
  @include body-5-regular
  color: $color-gray-5

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
  height: 26px
  background: $light-blue-rgba
  border-radius: 20px
  color: $color-blue-2
  font-family: $font-family-montserrat
  font-style: normal
  padding: 5px
  min-width: 75px
  @include body-9-regular
.main-container
  height: 451px
  width: 343px
  border-radius: 10px
  background: #FFFFFF
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25)
.inven-set
  font-family: 'SF Pro Display'
  font-style: normal
  font-weight: 600
  font-size: 16px
  line-height: 19px
  color: #667799
.inven-sub-set
  font-family: 'SF Pro Display'
  font-style: normal
  font-weight: 400
  font-size: 13px
  line-height: 16px
  color: #33363C
.link-text
  font-family: 'SF Pro Display'
  font-style: normal
  font-weight: 500
  font-size: 13px
  line-height: 16px
  text-decoration-line: underline
  color: #9E9E9E
.chev-img
  height: 15px
  width: 7px
  margin-left: 11rem
.chev-img-offer
  height: 15px
  width: 7px
  margin-left: 13rem
.chev-img-size
  height: 15px
  width: 7px
  margin-left: 12rem
.hr-border
  border: 1px solid rgba(196, 196, 196, 0.17)
.inven-cont
  width: 343px
  height: 400px
  background: #FFFFFF
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25)
  border-radius: 10px
.list-text
  font-family: 'SF Pro Display'
  font-style: normal
  font-weight: 500
  font-size: 14px
  line-height: 17px
  color: #000000
.image-tick
  height: 20px
  width: 12px
  margin-left: 10rem
.option-status
  border-bottom: 1px solid #E6E6E6
.save-btn
  background: #667799
  border-radius: 20px
  height: 40px
  width: 340px
  margin-top: 5rem

</style>
