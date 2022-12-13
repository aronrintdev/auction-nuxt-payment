<template>
  <div class="pt-3 pb-5">
    <div v-if="mainPageList" class="main-container ml-3">
      <div class="p-2 mt-1" @click="inventorySettings()">
        <div class="d-flex mb-1">
          <div class="inven-set d-flex justify-content-start align-content-start mt-2">{{$t('trades.preferences.inventory_settings')}}</div>
          <img class="chev-img d-flex justify-content-end align-content-end mt-2" src="~/assets/img/left-chev.svg" />
        </div>
        <div class="inven-sub-set mb-1">{{$t('trades.preferences.set_privacy_settting')}}</div>
        <div class="link-text">{{$t('common.public')}}</div>
      </div>
      <hr class="hr-border"/>
      <div class="p-2 mt-1" @click="offerSettings()">
        <div class="d-flex mb-1">
          <div class="inven-set d-flex justify-content-start align-content-start mt-2">{{$t('trades.preferences.set_privacy_settting')}}</div>
          <img class="chev-img-offer d-flex justify-content-end align-content-end mt-2" src="~/assets/img/left-chev.svg" />
        </div>
        <div class="inven-sub-set mb-1">{{'trades.preferences.customize_the_min_value'}}</div>
        <div class="link-text">{{'trades.preferences.starting_at_25_of_fair_offers'}}</div>
      </div>
      <hr class="hr-border"/>
      <div class="p-2 mt-1" @click="refineMatch()">
        <div class="d-flex mb-1">
          <div class="inven-set d-flex justify-content-start align-content-start mt-2">{{'trades.preferences.refine_your_match'}}</div>
          <img class="chev-img-offer d-flex justify-content-end align-content-end mt-2" src="~/assets/img/left-chev.svg" />
        </div>
        <div class="inven-sub-set mb-1">{{'trades.preferences.update_your_interests'}}</div>
        <div class="link-text">{{'trades.preferences.foot_apparel_accessFootwear'}}</div>
      </div>
      <hr class="hr-border"/>
      <div class="p-2 mt-1" @click="sizePrefer()">
        <div class="d-flex mb-1">
          <div class="inven-set d-flex justify-content-start align-content-start mt-2">{{$t('trades.preferences.size_preferences')}}</div>
          <img class="chev-img-size d-flex justify-content-end align-content-end mt-2" src="~/assets/img/left-chev.svg" />
        </div>
        <div class="inven-sub-set mb-1">{{$t('trades.preferences.select_preferred_size_type_and_sizes')}}</div>
        <div class="link-text">{{$t('trades.preferences.mens_55')}}</div>
      </div>
      <hr class="hr-border"/>
      <div class="p-2 mt-1" @click="brands()">
        <div class="d-flex mb-1">
          <div class="inven-set d-flex justify-content-start align-content-start mt-2">{{$t('trades.preferences.brand_preferences')}}</div>
          <img class="chev-img d-flex justify-content-end align-content-end mt-2" src="~/assets/img/left-chev.svg" />
        </div>
        <div class="inven-sub-set mb-1">{{$t('trades.preferences.select_brands_you_are_interested_in')}}</div>
        <div class="link-text">{{$t('trades.preferences.nike_supreme_bape')}}</div>
      </div>
      <hr class="hr-border"/>
    </div>
    <div v-if="showInventory">
      <div class="inven-cont ml-3 m-2 p-3">
        <div class="inven-set">{{$t('trades.preferences.inventory_settings')}}</div>
        <div class="inven-sub-set mb-2 mt-2">
          {{$t('trades.preferences.set_what_other_traders_are_able_to_view_when_placing')}}
        </div>
        <div  v-for="(status, index) in inventoryStatusOptions" :key="index">
         <div  class="option-status p-3" @click="changeStatus(status.value)">
           {{status.text}}  <img v-if="status.value == inventoryStatus" class="image-tick" src="~/assets/img/tick.svg" />
         </div>
        </div>
      </div>
    </div>
    <div v-if="inventoryStatus === INVENTORY_STATUS_CUSTOM" class="customize-cont ml-3 m-2 p-3" >
     <div>
       <your-inventory @updateTotal="setTotalInventory" @change="changePublicInventories" />
     </div>
    </div>
    <div v-if="showOfferSetting" class="mt-2 ml-3 mr-3 mb-5 offer-sections p-2">
      <div>
        <div class="offer-head ml-2">  {{$t('trades.preferences.offer_settings')}}</div>
        <div class="offer-start mt-1 ml-2"> {{$t('trades.preferences.starting_at_new')}}</div>
        <hr class="hr mt-3" />
        <div class="fair-text">
          <single-slider-offer
            :value="fairTrade"
            :minValue="0"
            :maxValue="DEFAULT_INTERESTS"
            :textToShow="$t('trades.preferences.of_fair_offer')"
            :meterText="true"
            @slide="changeFairTrade"
          />
        </div>
      </div>
    </div>

    <div v-if="showrefineMatch" class="mt-2 ml-3 mr-3 refine-sections p-2">
      <div>
        <div class="offer-head ml-2">  {{$t('trades.preferences.refine_your_matches')}}</div>
        <div class="update-urs ml-2 mt-1">{{$t('trades.preferences.update_your_interests')}}</div>
        <hr class="hr" />
       <div class="refine-headings ml-2">
         {{$t('trades.preferences.sneaker')}}
       </div>
        <div>
          <single-slider :value="sneakerInterest" :minValue="0" :maxValue="DEFAULT_INTERESTS" :belowText="true" @slide="changeSneakerInterest" />
        </div>
        <div class="refine-headings ml-2 mt-2">
          {{$t('trades.preferences.apparel')}}
        </div>
        <div>
          <single-slider :value="apparelInterest" :minValue="0" :maxValue="DEFAULT_INTERESTS" :belowText="true" @slide="changeApparelInterest" />
        </div>
        <div class="refine-headings ml-2 mt-2">
          {{$t('trades.preferences.accessories')}}
        </div>
        <div>
          <single-slider :value="accessoriesInterest" :minValue="0" :maxValue="DEFAULT_INTERESTS" :belowText="true" @slide="changeAccessoriesInterest" />
        </div>
    </div>
    </div>

    <div v-if="sizePre" class="mt-2 ml-2 mr-3 p-2">
      <div  class="sizePre-sections">
        <div class="offer-head ml-3 mb-2"> {{$t('trades.preferences.size_preferences')}}</div>
        <div class="mt-2 ml-2">
          <div v-b-toggle="'collapse-1'" class="d-flex">
            <b-row class="filtersHeading ml-2">
              <b-col class="col-sm-6">{{$tc('common.size_type')}}</b-col>
              <b-col class="col-sm-6">
                <div class="d-flex justify-content-end mr-3">
                  <img  v-if="isVisible" class="arrow-image" :src="require('~/assets/img/chev-up.svg')"/>
                  <img  v-else class="arrow-image" :src="require('~/assets/img/chev-down.svg')"/>
                </div>
              </b-col>
            </b-row>
          </div>
          <b-collapse id="collapse-1" v-model="isVisible">
            <b-row class="row mt-1">
              <b-col v-for="(sizeType, key) in filters.size_types" :key="'cat-' + key">
                <div :value="sizeType" class= "unselected-item m-1 d-flex justify-content-center align-content-center"
                     @click="changeSizeTypeFilter(sizeType)">
                  {{sizeType}}
                </div>
              </b-col>
            </b-row>
          </b-collapse>
        </div>
        <hr class="hr" />
        <div class="mt-1 ml-2">
          <div v-b-toggle="'collapse-2'" class="d-flex">
            <b-row class="filtersHeading ml-2">
              <b-col class="col-sm-6">{{$tc('common.size')}}</b-col>
              <b-col class="col-sm-6">
                <div class="d-flex justify-content-end mr-3">
                  <img  v-if="isVisibleSize" class="arrow-image" :src="require('~/assets/img/chev-up.svg')"/>
                  <img  v-else class="arrow-image" :src="require('~/assets/img/chev-down.svg')"/>
                </div>
              </b-col>
            </b-row>
          </div>
          <b-collapse id="collapse-2" v-model="isVisibleSize">
            <b-row class="row mt-1">
              <b-col v-for="(size, key) in filterOtherSizes" :key="'cat-' + key">
                <div :value="size" class= "unselected-item m-1 d-flex justify-content-center align-content-center"
                     @click="changeSizeFilter(size.size)">
                  {{size.size}}
                </div>
              </b-col>
            </b-row>
          </b-collapse>
        </div>
        <hr class="hr" />
        <div class="mt-1 ml-2">
          <div v-b-toggle="'collapse-3'" class="d-flex">
            <b-row class="filtersHeading ml-2">
              <b-col class="col-sm-6">{{$t('common.apparel')}}</b-col>
              <b-col class="col-sm-6">
                <div class="d-flex justify-content-end mr-3">
                  <img  v-if="isVisibleApp" class="arrow-image" :src="require('~/assets/img/chev-up.svg')"/>
                  <img  v-else class="arrow-image" :src="require('~/assets/img/chev-down.svg')"/>
                </div>
              </b-col>
            </b-row>
          </div>
          <b-collapse id="collapse-3" v-model="isVisibleApp">
            <b-row class="row mt-1">
              <b-col v-for="(app, key) in filterApparelSizes" :key="'cat-' + key">
                <div :value="app" class= "unselected-item m-1 d-flex justify-content-center align-content-center"
                     @click="changeApparelSizeFilter(app.size)">
                  {{app.size}}
                </div>
              </b-col>
            </b-row>
          </b-collapse>
        </div>
      </div>
    </div>
    <div v-if="brandsPre" class="mt-2 ml-2 mr-3 p-2">
      <div  class="brand-sections">
        <div class="offer-head ml-3 mb-2"> {{$t('trades.preferences.brand_preferences')}}</div>
        <div class="offer-start mt-1 ml-3 mb-3"> {{$t('trades.preferences.looking_for')}}</div>
        <hr />
        <div class="form-group rounded-search-input ml-2">
          <img :src="searchIcon" class="icon-search" alt="" />
          <input type="text" v-model="search" placeholder="Search Brands" />
        </div>
          <div class="brand-border" v-for="(brand,index) in filteredList" :key="index">
              <div class="m-2" >
                <div @click="changeSelectedBrands(brand._id)">
                  <div class="brand-name">
                    {{brand.name}}
                  </div>
                  <div class="right-tick">
                    <div v-if="selectedBrands.includes(brand._id)"  class="tick-circle">
                      <img  src="~/assets/img/white-tick.svg" class="white-tick" />
                    </div>
                  </div>
                </div>
              </div>
          </div>
      </div>
    </div>
    <div v-if="inventoryStatus === INVENTORY_STATUS_CUSTOM">
      <b-btn class="save-btn-customzie ml-5" @click="savePreference">
        {{$t('common.save_changes')}}
      </b-btn>
    </div>
    <div class="main-pref-container d-flex justify-content-center align-items-center" v-if="showInventory || showOfferSetting || showrefineMatch || sizePre || brandsPre">
      <b-btn class="save-changes-btn" @click="savePreference">
        {{$t('common.save_changes')}}
      </b-btn>
    </div>
    <reset-modal @reset="resetToDefaultPreferences()" />
  </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex';
import SingleSlider from '~/components/common/SingleSliderMobile';
import SingleSliderOffer from '~/components/common/SingleSliderMobileOfferSetting';
import YourInventory from '~/pages/profile/trades/preferences/YourInventoryMobile';
import ResetModal from '~/pages/profile/trades/preferences/ResetModal';
import searchIcon from '~/assets/img/icons/search.svg';

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
  components: {ResetModal, YourInventory, SingleSlider,SingleSliderOffer},
  layout: 'Profile',
  data(){
    return {
      searchIcon,
      showInventory:false,
      showOfferSetting:false,
      showrefineMatch:false,
      sizePre:false,
      brandsPre:false,
      mainPageList:true,
      isVisible:false,
      isVisibleSize:false,
      isVisibleApp:false,
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
      publicInventories: [],
      search:'',

    }
  },
  computed:{
    ...mapGetters('browse', ['filters','selectedBrands']),
    filteredList() {
      return this.filters.brands.filter(post => {
        return post.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  mounted() {
    this.filterApparelSizes = this.filters?.sizes?.filter(function (size) {
      return size.type === APPAREL_SIZE_TYPE
    })

    this.filterOtherSizes = this.filters?.sizes?.filter(function (size) {
      return size.type !== APPAREL_SIZE_TYPE
    })

    this.getTradePreferences()

  },
  created() {
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
    offerSettings(){
      this.showOfferSetting = true
      this.mainPageList = false
    },
    refineMatch(){
      this.showrefineMatch = true
      this.mainPageList = false
    },
    sizePrefer(){
      this.sizePre = true
      this.mainPageList = false
    },
    brands(){
      this.brandsPre = true
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
            this.showOfferSetting = false
            this.showrefineMatch = false
            this.sizePre = false
            this.brandsPre = false
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
      if(selectedStatus === 'customize') {
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
  width: 50px
  height: 50px

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
  width: 343px
  border-radius: 10px
  background: $color-white-1
  box-shadow: 0px 1px 4px $color-black-rgb2
.inven-set
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-13-medium
  color: $color-blue-20
.inven-sub-set
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-21-regular
  color: $color-gray-79c
.link-text
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-6
  text-decoration-line: underline
  color: $color-black-1
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
  border: 1px solid $color-gray-96
.inven-cont
  width: 343px
  height: 300px
  background: $color-white-1
  box-shadow: 0px 1px 4px $color-black-rgb2
  border-radius: 10px
.customize-cont
  width: 343px
  height: 450px
  background: $color-white-1
  box-shadow: 0 1px 4px $color-black-rgb2
  border-radius: 10px
.list-text
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-5-normal
  color: $color-black-1
.image-tick
  height: 20px
  width: 12px
  margin-left: 13rem
.option-status
  border-bottom: 1px solid $color-white-28
  font-family: $font-sp-pro
  font-style: normal
  font-weight: $normal
  @mixin body-14
  line-height: 19px
  letter-spacing: 0.01em
  color: $color-black-16
.save-btn
  background: $color-blue-20
  border-radius: 20px
  height: 40px
  width: 270px
  margin-top: 3rem
.save-changes-btn
  background: $color-blue-20
  border-radius: 20px
  height: 40px
  width: 270px
  bottom: 150px
  position: absolute
.save-btn-size
  background: $color-blue-20
  border-radius: 20px
  height: 40px
  width: 270px
  margin-top: 1rem
  margin-left: 2.3rem
.save-btn-brand
  background: $color-blue-20
  border-radius: 20px
  height: 40px
  width: 270px
  margin-top: 1rem
  margin-left: 2.3rem
.save-btn-offer-setting
  background: $color-blue-20
  border-radius: 20px
  height: 40px
  width: 270px
  margin-top: 1.5rem
.save-btn-customzie
  background: $color-blue-20
  border-radius: 20px
  height: 40px
  width: 270px
  margin-top: 1rem
.save-btn-refine
  background: $color-blue-20
  border-radius: 20px
  height: 40px
  width: 270px
  margin-top: 2rem
.offer-sections
  width: 343px
  height: 200px
  background: $color-white-1
  border-radius: 10px
  box-shadow: 0 1px 4px $color-black-rgb1
  padding-top: 20px
.offer-head
  font-family: $font-sp-pro
  font-style: normal
  font-weight: $medium
  font-size: 16px
  color: $color-blue-20
  line-height: 19px
  letter-spacing: 0.02em
.update-urs
  font-family: $font-sp-pro
  font-style: normal
  font-weight: $regular
  @include body-10
  line-height: 16px
  color: $color-black-17
.offer-start
  font-family: $font-sp-pro
  font-style: normal
  font-weight: $regular
  @include body-10
  color: $color-black-17
  line-height: 16px
.offer-subtext
  font-family: $font-family-montserrat
  font-style: normal
  @include body-9-normal
  color: $color-gray-5
.fair-text
  font-family: $font-family-montserrat
  font-style: normal
  @include body-9-medium
  color: $color-black-1
.refine-sections
  width: 343px
  height: 320px
  background: $color-white-1
  border-radius: 10px
  box-shadow: 0 1px 4px $color-black-rgb1
  padding-top: 20px

.refine-headings
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $medium
  font-size: 16px
  color: $color-black-1
  line-height: 19px
  letter-spacing: 0.01em
.sizePre-sections
  width: 343px
  background: $color-white-1
  border-radius: 10px
  box-shadow: 0 1px 4px $color-black-rgb1
  padding-top: 20px
  padding-bottom: 20px
.brand-sections
  width: 343px
  background: $color-white-1
  border-radius: 10px
  box-shadow: 0 1px 4px $color-black-rgb1
  padding-top: 20px
.hr
  border-top: 1px solid $color-gray-62
  width: 318px
.unselected-item
  width: 99px
  height: 45px
  border-radius: 3px
  background: $color-white-1
  border: 1px solid $color-gray-47
  @include body-5
  font-weight: $normal
  font-family: $font-sp-pro
  color: $color-gray-47
  padding-top: 10px
  cursor: pointer
.selected-item
  width: 99px
  height: 45px
  border-radius: 3px
  border: 1px solid $color-black-1
  @include body-5
  font-weight: $medium
  font-family: $font-sp-pro
  color: $color-gray-47
  padding-top: 10px
  cursor: pointer
  background: $color-gray-21
.selected-brand
  border-radius: 3px
  border: 1px solid $color-black-1
  padding-bottom: 4px
  padding-left: 2px
.unselected-brand
  border-radius: 3px
.column-sizes
  height: 100px
  overflow-y: scroll
.filtersHeading
  font-size: 14px
  font-weight: 600
  font-family: $font-sp-pro
  color: $color-black-1
  width: 100%
.images-row
  height: 300px
  overflow-y: scroll
.brand-name
  font-family: $font-sp-pro
  font-style: normal
  font-weight: $normal
  @include body-5
  line-height: 17px
  color: $color-black-16
.tick-circle
  background-color: #667799
  height: 19px
  width: 19px
  border-radius: 50%
.white-tick
  position: absolute
  height: 8px
  width: 10px
  margin-left: 4px
  margin-top: 5px
.brand-border
  border: 1px solid #E1E1E1
.right-tick
  float: right
  margin-top: -1rem
.rounded-search-input
  align-items: center
  background: #F7F7F7
  border-radius: 8px
  display: flex
  margin-bottom: 1rem
  padding: 6px 12px
  width: 315px
  .icon-search
      height: 18px
      width: 18px
  input
      background: transparent
      border: 0
      color: $dark-gray
      font-size: 15px
      line-height: 18px
      outline: none
      padding: 0 8px
      width: 300px
</style>
