<template>
  <b-container fluid>
    <div class="mb-4 d-flex" @click="$router.push('/profile/create-listing')"><b-icon icon="arrow-left" class="font-26"></b-icon>&nbsp;
    <div class="back-listing" role="button">{{$t('trades.create_listing.back_to_create_listing')}}</div>
    </div>
    <div class="d-flex mt-2"  v-if="!filterSection">
      <div>
        <SearchInput
          :value="searchedText"
          :placeholder="$t('trades.create_listing.vendor.wants.search_by_options')"
          size="lg"
          @change="onSearchInput"
        />
      </div>
      <div>
        <img class="ml-3 mt-1" :src="require('~/assets/img/filters.svg')" />
      </div>
    </div>
    <!-- Filters Section -->
    <div v-if="filterSection">
      <mobileFilters @click="applyFilters"/>
    </div>

    <div class="d-flex justify-content-center mt-3 align-items-center">
      <NavGroup
        :data="listingItems"
        :value="selectedItems"
        nav-key="trade-type"
        class="section-nav pb-4"
        @change="changeTotalTradeItems"
      />
    </div>
    <div v-if="selectedItems === 'trade'">
      <div class="mt-2" v-for="(trade, index) in tradeDrafts" :key="trade.id">
        <div class="d-flex mb-2">
          <div class="heading-draft ml-2">{{$t('trades.create_listing.vendor.wants.draft')}} # {{(index+1)}} </div>
          <div class="margin-set">
            <img :src="require('~/assets/img/Delete.svg')" class="ml-1 del-img mr-2" role="button"
                 :alt="$t('trades.create_listing.vendor.wants.no_image')" @click="deleteTrade(trade.id)"
            /><span class="del-text">{{$t('trades.create_listing.vendor.wants.delete_draft')}}</span>
          </div>
        </div>
        <div class="sub-main-container ml-2">
          <div>
            <div v-if="trade.offers.length">
              <div class="offer-text ml-3 mt-2">{{$t('trades.create_listing.vendor.wants.offering_items')}}</div>
              <div class="d-flex">
                <div v-for="offerItem in trade.offers" :key="offerItem.id" class="draft-list-item ml-2 mr-1 mt-1">
                  <object
                    :data="`${IMAGE_PATH}/${offerItem.inventory.product && offerItem.inventory.product.category && offerItem.inventory.product.category.name}/${offerItem.inventory.product && offerItem.inventory.product.sku}/800xAUTO/IMG01.jpg`"
                    class="create-trade-item-image" type="image/png">
                    <img class="create-trade-item-image mb-2" :src="fallbackImgUrl" alt="image"/>
                  </object>
                  <div class="create-trade-item-captions">
                    <span :id="`name${offerItem.id}`" class="create-trade-item-name-sm pt-1 pl-1">{{ offerItem.inventory.product && offerItem.inventory.product.name }}</span>
                    <span :id="`colorway${offerItem.id}`" class="create-trade-item-caption-description-sm pl-1">
                   {{ offerItem.inventory.product && offerItem.inventory.product.colorway }}</span>
                    <span
                      class="create-trade-item-caption-description-sm pl-1">{{$t('trades.create_listing.vendor.wants.box')}}: {{
                        offerItem.inventory.packaging_condition && offerItem.inventory.packaging_condition.name
                      }}</span>
                    <span :id="`size${offerItem.id}`" class="create-trade-item-caption-description-sm pl-1"> {{$t('trades.create_listing.vendor.wants.size')}}:
                   {{ offerItem.inventory.product && offerItem.inventory.size.size }}</span>
                  </div>
                  <!-- tooltip for name -->
                  <b-tooltip :target="`name${offerItem.id}`" triggers="hover">
                    {{ offerItem.inventory.product.name }}
                  </b-tooltip>
                  <!-- tooltip for colorway -->
                  <b-tooltip :target="`colorway${offerItem.id}`" triggers="hover">
                    {{ offerItem.inventory.product && offerItem.inventory.product.colorway }}
                  </b-tooltip>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="text-center">({{$t('trades.create_listing.vendor.wants.no_offers_specified')}})</div>
            </div>
          </div>
          <hr/>
          <div>
            <div v-if="trade.wants.length">
              <div class="wants-text ml-3">{{$t('trades.create_listing.vendor.wants.want_items-sm')}}</div>
              <div class="d-flex">
                <div v-for="wantItem in trade.wants" :key="wantItem.id"  class="draft-list-item mr-1 ml-2 mt-1">

                  <img class="create-trade-item-image" :src="wantItem.product.image" alt="image"/>
                  <div class="create-trade-item-captions">
                    <span :id="`want-name${wantItem.id}`" class="create-trade-item-name-sm pt-1 pl-1">{{wantItem.product.name}}</span>
                    <span :id="`want-colorway${wantItem.id}`" class="create-trade-item-caption-description-sm pl-1">{{wantItem.product.colorway}}</span>
                    <span class="create-trade-item-caption-description-sm pl-1">{{ $t('trades.create_listing.vendor.wants.box') }}: {{wantItem.packaging_condition.name}}</span>
                    <span :id="`want-size${wantItem.id}`" class="create-trade-item-caption-description-sm pl-1">{{$t('trades.create_listing.vendor.wants.size')}}: {{wantItem.size.size}}</span>
                  </div>
                  <!-- tooltip for name -->
                  <b-tooltip :target="`want-name${wantItem.id}`" triggers="hover">
                    {{ wantItem.product.name }}
                  </b-tooltip>
                  <!-- tooltip for colorway -->
                  <b-tooltip :target="`want-colorway${wantItem.id}`" triggers="hover">
                    {{ wantItem.product.colorway }}
                  </b-tooltip>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="text-center">({{$t('trades.create_listing.vendor.wants.want_items')}})</div>
            </div>
          </div>
          <hr/>
          <div class="mt-2 d-flex justify-content-center align-center">
            <b-btn class="edit-view-btn"
                   @click="setTradeId(trade.id)">
              {{  $t('trades.create_listing.vendor.wants.view_edit_btn')  }}
            </b-btn>
          </div>
        </div>
      </div>
      <div>
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
    </div>

  </b-container>
</template>
<script>
import {
  NavGroup,
  SearchInput,
  Pagination
} from '~/components/common'
import {IMAGE_PATH,NAV_TYPES,COMBINATIONS_PER_PAGE_ITEMS} from '~/static/constants/create-listing'
import { PRODUCT_FALLBACK_URL } from '~/static/constants'
import mobileFilters from '~/pages/profile/create-listing/trades/filtersMobile'

export default {
  name: 'ListingDrafts',

  components: {

    NavGroup,  // Component to show multiple Navigation tabs
    SearchInput, // Component for search and selection of a product
    Pagination, // The pagination component to be used, by default showing 4 items
    mobileFilters,
  },

  layout: 'Profile', // Layout

  fetchOnServer: false,

  data() {
    return {
      filterSection:false,
      IMAGE_PATH, // image production api url
      tradePage: 1,
      tradePerPage: 2,
      tradeTotalCount: 0,
      loading: false,
      tradeDrafts: [],
      searchedText: null,
      NAV_TYPES,
      COMBINATIONS_PER_PAGE_ITEMS,
      fallbackImgUrl: PRODUCT_FALLBACK_URL,
      show: null,
      listingItems: [
        { label: this.$t('trades.index.browse.selling'), value: 'selling' },
        { label: this.$t('trades.index.browse.auction'), value: 'auction' },
        { label: this.$t('trades.index.browse.trade'), value: 'trade' },
      ],
      selectedItems: 'trade',
      sectionTypes: []
    }
  },
  computed:{
    draftsListing() {
      return this.tradeDrafts
    }
  },
  mounted() {
    // this.selectedItems = this.getTotalItemTrades
    this.getTradeDrafts()
  },
  methods: {
    changeTotalTradeItems(listingItems) {
      this.selectedItems = listingItems
    },
    closeFiltersSection() {
      this.filterSection = false
    },
    applyFilters(data){
      this.orderFilter = data.orderFilter ? data.orderFilter : null
      this.categoryFilter = data.category ? data.category : null
      this.sizeTypesFilter = data.sizeType ? data.sizeType : null
      this.sizeFilter = data.sizes ? data.sizes: null
      this.getInventory()
    },
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

//.draft-list-item
//  border: 1px solid $color-gray-23

.icon-size
  height: 40px

.quantity-align
  position: absolute
  right: 5px
  margin-top: 8%
.heading-draft
  font-size: 14px
  font-weight: 700
  font-family: $font-montserrat
  color: #000000
.del-img
  width: 22px
  height: 22px

.del-text
  font-size: 12px
  font-weight: $normal
  font-family: $font-sp-pro
  color: #999999
.sub-main-container
  width: 343px
  height: 450px
  background: #FBFAFA
  box-sizing: border-box
  border: 1px solid #999999
  @media (min-width: 300px)  and (max-width: 349px)
    width: 300px
  @media (min-width: 400px)  and (max-width: 500px)
    width: 390px
.draft-list-item
  width: 100px
  height: 143px
  border: 1px solid #D8D8D8
  background: #FFFFFF
  @media (min-width: 400px)  and (max-width: 500px)
    width: 115px
.create-trade-item-image
  width: 83px
  height: 80px
  top: 24px
  left: 11px
.create-trade-item-name-sm
  width: 62px
  height: 20px
  font-size: 11px
  font-weight: $medium
  font-family: $font-sp-pro
  color: #000000
.create-trade-item-captions
  background: #f5f5f5
  font-family: $font-sp-pro, serif
  font-style: normal
  height: 60px
.create-trade-item-caption-description-sm
  width: 81px
  height: 12px
  font-family: $font-sp-pro
  font-style: normal
  font-weight: $normal
  font-size: 10px
.wants-text
  font-family: $font-montserrat
  font-style: normal
  font-weight: $medium
  font-size: 12px
  color: #667799

.offer-text
  font-family: $font-montserrat
  font-style: normal
  font-weight: $medium
  font-size: 12px
  color: #667799
.margin-set
  margin-left: 11rem
  @media (min-width: 300px)  and (max-width: 349px)
    margin-left: 8rem
  @media (min-width: 400px)  and (max-width: 500px)
    margin-left: 14rem
.edit-view-btn
  font-size: 13px
  font-family: $font-montserrat
  font-weight: $medium
  color: #FFFFFF
  width: 155px
  height: 32px
  border-radius: 20px
  background: #667799
</style>

