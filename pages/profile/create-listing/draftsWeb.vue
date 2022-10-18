<template>
  <b-container fluid class="container-profile-inventory h-100 b-gray p-4">
    <div class="mb-4 d-flex" @click="$router.push('/profile/create-listing')"><b-icon icon="arrow-left" class="font-26"></b-icon>&nbsp;
    <div class="back-listing" role="button">{{$t('trades.create_listing.back_to_create_listing')}}</div>
    </div>
    <div class="d-flex justify-content-between align-items-center">
      <h2 class="title">{{$t('trades.create_listing.vendor.wants.drafts')}}</h2>
    </div>
    <b-row class="pr-md-5 pr-lg-5 pr-sm-0 mb-2">
          <b-col class="col-md-8 col-12 col-sm-6 mt-md-4">
            <SearchInput
              :value="searchedText"
              :placeholder="$t('trades.create_listing.vendor.wants.search_by_options')"
              size="lg"
              @change="onSearchInput"
            />
          </b-col>
        </b-row>

    <div class="d-flex justify-content-center mt-3 align-items-center">

      <NavGroup
        :value="LISTING_TYPES.TRADE"
        nav-key="list-type"
        :data="translateNavigationTypesLabels"
        @change="handleTypeChange"
      />
    </div>

    <Loader v-if="loading" />
    <div v-else-if="type === LISTING_TYPES.SELLING"> <!-- show drafts for selling -->
    </div>
    <div v-else-if="type === LISTING_TYPES.AUCTION"> <!-- show drafts for auction -->
    </div>
     <!-- show drafts for trades -->
    <div v-else>
      <b-row>
        <p class="text-gray">{{$t('trades.create_listing.vendor.wants.recently_added')}}</p>
      </b-row>
      <b-row>
        <!-- These are the headers shown for the listing of the trade items -->
        <b-col md="5">{{$t('trades.create_listing.vendor.wants.details')}}</b-col>
        <b-col md="3">{{$t('trades.create_listing.vendor.wants.items')}}</b-col>
        <b-col md="2">{{$t('trades.create_listing.vendor.wants.last_updated')}}</b-col>
        <b-col md="2">{{$t('trades.create_listing.vendor.wants.actions')}}</b-col>
      </b-row>
      <!-- These are the body rows shown for the listing of the trade items -->
      <b-row v-for="(trade, index) in tradeDrafts" :key="trade.id" class="mb-4 col-md-12 draft-row">
        <div class="d-flex col-md-12 alignment-center">
        <b-col md="5">
          <div v-if="(show === null || show !== index)" class="d-flex" role="button" @click="show = index">
          <img class="mr-2" :src="require('~/assets/img/icons/draft-list-image.svg')" />
          <b>
            <img v-show="show !== index" class="mr-2" :src="require('~/assets/img/icons/triangle-arrow-down.svg')" />
            {{$t('trades.create_listing.vendor.wants.draft')}} {{(index+1)}}
           </b>
          </div>
          <div v-if="show === index" class="d-flex" role="button" @click="show = null">
          <img class="mr-2" :src="require('~/assets/img/icons/draft-list-image.svg')" />
          <b>
            <img v-show="show === index" class="mr-2" :src="require('~/assets/img/icons/triangle-arrow-up.svg')" />
            {{$t('trades.create_listing.vendor.wants.draft')}} {{(index+1)}}
           </b>
          </div>
        </b-col>
        <b-col md="3">{{trade.offers.length}} {{$t('trades.create_listing.vendor.wants.offered')}}/{{trade.wants.length}} {{$t('trades.create_listing.vendor.wants.wants')}}</b-col>
        <b-col md="2">{{trade.created_at | formatDate}}</b-col>
        <b-col md="2" class="d-flex justify-between">
          <img :src="require('~/assets/img/box-pencil.svg')" class="icon-size" role="button" :alt="$t('trades.create_listing.vendor.wants.no_image')" @click="setTradeId(trade.id)"/>
          <img :src="require('~/assets/img/box-delete.svg')" class="ml-1 icon-size" role="button" :alt="$t('trades.create_listing.vendor.wants.no_image')" @click="deleteTrade(trade.id)" />
        </b-col>
        </div>
        <div v-show="show === index" class=" col-md-12">
        <b-row  md="12" class="col-md-12 pt-3">
          <div v-if="trade.offers.length" class="col-md-12">
            <b-row class="col-md-12">
              <b-col md="3" class="text-center font-weight-bold">{{$t('trades.create_listing.vendor.wants.offered_items')}}</b-col>
              <b-col v-for="offerItem in trade.offers" :key="offerItem.id" md="2" class="draft-list-item p-0 mr-5 mt-4">
                <div class="d-flex justify-content-between mt-2 mx-2">
                  <div class="create-trade-size-car-sm">{{$t('trades.create_listing.vendor.wants.size')}} {{ offerItem.inventory.size && offerItem.inventory.size.size }}</div>
                  <div v-if="offerItem.quantity > 1" class="create-trade-quantity-car-sm">x{{ offerItem.quantity || 1 }}</div>
                </div>
                <object
                    :data="`${IMAGE_PATH}/${offerItem.inventory.product && offerItem.inventory.product.category && offerItem.inventory.product.category.name}/${offerItem.inventory.product && offerItem.inventory.product.sku}/800xAUTO/IMG01.jpg`"
                    class="create-trade-item-image" type="image/png">
                  <img class="create-trade-item-image mb-2" :src="fallbackImgUrl" alt="image"/>
                </object>
                <div class="create-trade-item-caption">
                  <span :id="`name${offerItem.id}`" class="create-trade-item-name-sm">{{ offerItem.inventory.product && offerItem.inventory.product.name }}</span>
                  <span :id="`colorway${offerItem.id}`" class="create-trade-item-caption-description-sm">{{ offerItem.inventory.product && offerItem.inventory.product.colorway }}</span>
                  <span
                      class="create-trade-item-caption-description-sm">{{$t('trades.create_listing.vendor.wants.box')}}: {{
                      offerItem.inventory.packaging_condition && offerItem.inventory.packaging_condition.name
                    }}</span>
                </div>
                <!-- tooltip for name -->
                <b-tooltip :target="`name${offerItem.id}`" triggers="hover">
                  {{ offerItem.inventory.product.name }}
                </b-tooltip>
                <!-- tooltip for colorway -->
                <b-tooltip :target="`colorway${offerItem.id}`" triggers="hover">
                  {{ offerItem.inventory.product && offerItem.inventory.product.colorway }}
                </b-tooltip>
              </b-col>
            </b-row>
          </div>
          <div v-else>
            <b-col md="6" class="text-center">({{$t('trades.create_listing.vendor.wants.no_offers_specified')}})</b-col>
          </div>
        </b-row>
        <b-row class="col-md-12 pt-4">
          <div v-if="trade.wants.length" class="col-md-12 mb-5">
            <b-row class="col-md-12">
              <b-col md="3" class="text-center font-weight-bold">{{$t('trades.create_listing.vendor.wants.want_items')}}</b-col>
              <b-col v-for="wantItem in trade.wants" :key="wantItem.id" md="2" class="draft-list-item p-0 mr-5 mt-4">
                <div class="d-flex justify-content-between mt-2 mx-2">
                  <div class="create-trade-size-car-sm">Size {{ wantItem.size && wantItem.size.size }}</div>
                  <div v-if="wantItem.quantity > 1" class="create-trade-quantity-car-sm">x{{ wantItem.quantity || 1 }}</div>
                </div>
                <img class="create-trade-item-image" :src="wantItem.product.image" alt="image"/>
                <div class="create-trade-item-caption">
                  <span :id="`want-name${wantItem.id}`" class="create-trade-item-name-sm wd-136">{{wantItem.product.name}}</span>
                  <span :id="`want-colorway${wantItem.id}`" class="create-trade-item-caption-description-sm">{{wantItem.product.colorway}}</span>
                  <span class="create-trade-item-caption-description-sm">{{ $t('trades.create_listing.vendor.wants.box') }}: {{wantItem.packaging_condition.name}}</span>
                </div>
                <!-- tooltip for name -->
                <b-tooltip :target="`want-name${wantItem.id}`" triggers="hover">
                  {{ wantItem.product.name }}
                </b-tooltip>
                <!-- tooltip for colorway -->
                <b-tooltip :target="`want-colorway${wantItem.id}`" triggers="hover">
                  {{ wantItem.product.colorway }}
                </b-tooltip>
              </b-col>
            </b-row>
          </div>
          <div v-else>
            <b-col md="6" class="text-center">({{$t('trades.create_listing.vendor.wants.want_items')}})</b-col>
          </div>
        </b-row>
        </div>
      </b-row>
      <b-row class="col-md-12 justify-content-center" >
        <Pagination
          v-if="tradeDrafts && tradeDrafts.length > 0"
          v-model="tradePage"
          :total="tradeTotalCount"
          :per-page="tradePerPage"
          :per-page-options="COMBINATIONS_PER_PAGE_ITEMS"
          class="mt-2"
          @page-click="handleTradePageClick"
          @per-page-change="handleTradePerPageChange"
        />
      </b-row>
    </div>
  </b-container>
</template>
<script>
import {
  NavGroup,
  SearchInput,
  Loader,
  Pagination
} from '~/components/common'
import {IMAGE_PATH,NAV_TYPES,COMBINATIONS_PER_PAGE_ITEMS,LISTING_TYPES} from '~/static/constants/create-listing'
import { PRODUCT_FALLBACK_URL } from '~/static/constants'

export default {
  name: 'ListingDrafts',

  components: {
    NavGroup,  // Component to show multiple Navigation tabs
    SearchInput, // Component for search and selection of a product
    Loader, // Loader for waiting screen
    Pagination, // The pagination component to be used, by default showing 4 items
  },

  layout: 'Profile', // Layout

  fetchOnServer: false,

  data() {
    return {
      IMAGE_PATH, // image production api url
      tradePage: 1,
      tradePerPage: 2,
      tradeTotalCount: 0,
      loading: false,
      tradeDrafts: [],
      searchedText: null,
      NAV_TYPES,
      COMBINATIONS_PER_PAGE_ITEMS,
      LISTING_TYPES,
      fallbackImgUrl: PRODUCT_FALLBACK_URL,
      show: null
    }
  },
  computed:{
    draftsListing() {
      return this.tradeDrafts
    }
  },
  mounted() {
    this.getTradeDrafts()
  },
  methods: {
    /**
    * Translate naviation types labels
    * @return {array}
    */
    translateNavigationTypesLabels() {
      return NAV_TYPES.map((nav) => {
        return { label: this.$t(nav.label), value: nav.value}
      })
    },

    /**
     * This function is used to set trade id for editing of listing
     * draft for trade offer item or trade want items
     * @param tradeId
     */
    setTradeId(tradeId) {
      this.$store.commit('trades/setTradeForEditing', tradeId)
      this.$router.push('/profile/create-listing/trades/create')
    },
    /**
     * This function is used to delete the draft item from listing it
     * takes list_ids as id of listing/draft which need to be deleted
     * @param list_ids
     */
    deleteTrade(tradeId, index) {
      this.$axios
        .delete('trades/multiple', {
          data: {
            trade_ids: String(tradeId)
          }
        })
        .then(() => {
          this.tradeDrafts.splice(index, 1)
          this.$nextTick(() => this.$forceUpdate())
        })
        .catch((error) => {
          this.$toasted.error(this.$t(error.response.data.error))
          this.getTradeDrafts()
        })
    },
    /**
     * This function is used to get listing of drafts from api
     * it takes params search for searching specific data
     * per_page for get limited no of records at a time page is for a page
     * no for pagination
     * in response we received array of listing of drafts
     */
    getTradeDrafts() {
      this.$axios
      .get('trades', {
        params: {
          search: this.searchedText,
          per_page: this.tradePerPage,
          page: this.tradePage,
          status: 'draft'
        }
      })
      .then((response) => {
        this.tradeDrafts = response.data.data.data // array of listing of drafts
        this.tradeTotalCount = parseInt(response.data.data.total) // total record count
        this.$store.commit('trades/setTradeDraftCount',this.tradeTotalCount) // storing record count in state
        this.tradePerPage = parseInt(response.data.data.per_page) // per page counts
      })
      .catch((error) => {
        this.$toasted.error(this.$t(error.response.data.error))
        this.tradeDrafts =  []
      })
    },
    /**
     * This function is used to pass search input query to
     * data property and call again listing draft function
     * @param term
     */
    onSearchInput(term) {
      this.searchedText =  term || null
      this.getTradeDrafts()
    },

    /**
     * This function is used to handle pagination click for
     * previous and next page and call for api listing again
     * for page change in param page number will be passed for listing
     * @param bvEvent
     * @param page
     */
    handleTradePageClick(bvEvent, page) {
      if (this.tradePage !== page) {
        this.tradePage = page
        this.getTradeDrafts()
      }
    },

    /**
     * this function handle number of records to be shown
     * on page it takes value param as a number of record and call
     * listing api
     * @param value
     */
    handleTradePerPageChange(value) {
      if (this.tradePerPage !== value) {
        this.tradePerPage = value
        this.tradePage = 1
        this.getTradeDrafts()
      }
    },

    /**
     * This function is used to show hide details of listing
     * param status will be true or false and index will be the
     * index of draft clicked whose details need to be show/hide
     * @param status
     * @param index
     */
    updateTradeShowDetails(status, index) {
      this.tradeDrafts[index].showDetails = status
      this.$nextTick(() => this.$forceUpdate())
    },

    /***
     * This function is used to get listing if trade draft listing
     * page is clicked
     * @param type
     */
    handleTypeChange(type) {
      if (type !== this.LISTING_TYPES.TRADE) {
        this.LISTING_TYPES.TRADE = type
        if(type === this.LISTING_TYPES.TRADE) {
          this.getTradeDrafts()
        }
      }
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.b-gray
  background: $color-white-5

.back-listing
  @include body-5-regular
  font-family: $font-sp-pro
  font-style: normal
  color: $color-gray-40
  padding-top: 5px

.font-26
  font-size: 26px
  color: $color-gray-40

.draft-row
  background: $color-white-1
  min-height: 80px
  position: relative

.alignment-center
  padding-top: 2%

.wd-136
  width: 136px!important
  font-weight: $medium

.draft-list-item
  border: 1px solid $color-gray-23

.icon-size
  height: 40px

.quantity-align
  position: absolute
  right: 5px
  margin-top: 8%
</style>

