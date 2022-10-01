<template>
  <div class="auction-browser pb-4">
    <auction-banner />
    <div class="auction-browser-container">
      <auction-filterbar :searchKeyword="productFilter ? productFilter.name : null" @change="handleFilterChange"/>
      <div v-if="!isViewAll" :class="{ 'invisible': loading }">
        <product-slider
          :title="$t('auctions.frontpage.recently_viewed')"
          :auctions="recentViewedAuctions"
          :type="'recently_viewed'"
          @showAll="showAllAuctions('recently_viewed')"
        ></product-slider>
        <product-slider
          :title="$t('auctions.frontpage.ending_soon')"
          :auctions="endingSoonAuctions"
          :type="'ending_soon'"
          @showAll="showAllAuctions('ending_soon')"
        ></product-slider>
        <product-slider
          :title="$t('auctions.frontpage.no_reserve')"
          :auctions="nonReserveAuctions"
          :type="'no_reserve'"
          @showAll="showAllAuctions('no_reserve')"
        ></product-slider>
        <product-slider
          :title="$t('auctions.frontpage.reserve')"
          :auctions="reserveAuctions"
          :type="'reserve'"
          @showAll="showAllAuctions('reserve')"
        ></product-slider>
      </div>
      <div v-else class="position-relative">
        <div class="container">
          <div class="row">
            <div class="col-12 ml-lg-n3 ml-xl-n5 mt-3">
              <div class="d-flex align-items-center back-btn" @click="backToMainView">
                <img :src="require('~/assets/img/icons/pagination-arrow-left.svg')" />
                <span class="ml-1" role="button">{{ $t('common.back') }}</span>
              </div>
            </div>
          </div>
        </div>
        <product-slider
          :title="$t(`auctions.frontpage.${isViewAll}`)"
          :auctions="viewAllAuctions"
          :type="'all'"
          :isCarouselMode="false"
        ></product-slider>
        <sell-with-us :class="{ lg: viewAllAuctions.length > 16, md: viewAllAuctions.length > 12, sm: viewAllAuctions.length > 8 }"></sell-with-us>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AuctionBanner from '~/components/Auctions/Banner'
import AuctionFilterbar from '~/components/Auctions/Filterbar'
import ProductSlider from '~/components/Auctions/ProductSlider'
import SellWithUs from '~/components/Auctions/SellWithUs'

export default {
  components: {
    AuctionBanner,
    AuctionFilterbar,
    ProductSlider,
    SellWithUs,
  },
  layout: 'IndexLayout',
  data() {
    return {
      sortBy: null,
      isViewAll: null, // recently_viewed, reserve, no_reserve, ending_soon, search_results
      viewAllAuctions: [],
      reserveAuctions: [],
      nonReserveAuctions: [],
      endingSoonAuctions: [],
      recentViewedAuctions: [],
      filterOptions: {
        type: 'collection',
      },
      slidesCount: 8,
      loading: false,
    }
  },
  computed: {
    ...mapGetters({
      productFilter: 'auction/getProductFilter'
    })
  },
  watch: {
    productFilter(newV) {
      if (this.productFilter) {
        this.isViewAll = 'search_results'
        this.filterOptions.product = newV.sku
      } else {
        this.isViewAll = null
        this.filterOptions.product = undefined
      }
      this.loadAuctions()
    }
  },
  mounted() {
    if (this.productFilter) {
      this.isViewAll = 'search_results'
      this.filterOptions.product = this.productFilter.sku
    }
    this.loadAuctions()
    this.fetchWatchlists({ type: 'auction' })
  },
  beforeDestroy() {
    this.setProductFilter(null)
  },
  methods: {
    ...mapActions({
      fetchWatchlists: 'watchlist/fetchWatchlists',
      setProductFilter: 'auction/setProductFilter',
    }),
    handleSortByChanged(opt) {
      this.sortBy = opt
      this.loadAuctions()
    },
    // Listen auction type, product name and sortBy option changes
    handleFilterChange(value) {
      this.filterOptions = value
      // Returns to the main auction page if search keyword is empty
      if (this.filterOptions.product) {
        this.isViewAll = 'search_results'
      } else if (this.isViewAll === 'search_results') {
        this.isViewAll = null
      }
      this.loadAuctions()
    },
    async loadAuctions() {
      this.loading = true
      if (this.isViewAll) {
        await this.showAllAuctions(this.isViewAll)
      } else {
        await this.loadRecentAuctions()
        await this.loadAuctionsByStatus('ending_soon')
        await this.loadAuctionsByStatus('reserve')
        await this.loadAuctionsByStatus('no_reserve')
      }
      this.loading = false
    },
    // Load recent viewed auctions from local storage
    loadRecentAuctions() {
      const auctionsStr = localStorage.getItem('auctions')
      if (auctionsStr) {
        const auctions = JSON.parse(auctionsStr)
        this.$axios.get('/auctions/public', {
          params: {
            status: 'live',
            take: this.isViewAll === 'recently_viewed' ? null : this.slidesCount,
            type: this.filterOptions.type,
            product: this.filterOptions.product,
            sort: this.filterOptions.sortby,
            items: auctions,
            category: this.filterOptions.categories,
            sizeType: this.filterOptions.sizeTypes,
            size: this.filterOptions.sizes,
            min_price: this.filterOptions.minPrice,
            max_price: this.filterOptions.maxPrice,
            min_year: this.filterOptions.minYear,
            max_year: this.filterOptions.maxYear,
          }
        })
          .then(res => {
            if (this.isViewAll === 'recently_viewed') {
              this.viewAllAuctions = res.data.data
            } else {
              this.recentViewedAuctions = res.data.data
            }
          })
          .catch(err => {
            this.$toasted.error(err)
          })
      } else {
        this.recentViewedAuctions = []
      }
    },
    // Load auctions by status - ending_soon/reserve/non-reserve
    loadAuctionsByStatus(status) {
      this.$axios.get('/auctions/public', {
        params: {
          status,
          take: this.slidesCount,
          type: this.filterOptions.type,
          product: this.filterOptions.product,
          sort: this.filterOptions.sortby,
          category: this.filterOptions.categories,
          sizeType: this.filterOptions.sizeTypes,
          size: this.filterOptions.sizes,
          min_price: this.filterOptions.minPrice,
          max_price: this.filterOptions.maxPrice,
          min_year: this.filterOptions.minYear,
          max_year: this.filterOptions.maxYear,
        }
      })
        .then(res => {
          switch (status) {
            case 'ending_soon':
              this.endingSoonAuctions = res.data.data
              break
            case 'reserve':
              this.reserveAuctions = res.data.data
              break
            case 'no_reserve':
              this.nonReserveAuctions = res.data.data
              break
            default:
          }
        })
        .catch(err => {
          this.$toasted.error(err)
        })
    },
    // Show all auctions
    showAllAuctions(status) {
      this.isViewAll = status
      if (status === 'recently_viewed') {
        this.loadRecentAuctions()
      } else {
        this.$axios.get('/auctions/public', {
          params: {
            status: this.filterOptions.product ? 'live' : status,
            product: this.filterOptions.product,
            type: this.filterOptions.type,
            sort: this.filterOptions.sortby,
            category: this.filterOptions.categories,
            sizeType: this.filterOptions.sizeTypes,
            size: this.filterOptions.sizes,
            min_price: this.filterOptions.minPrice,
            max_price: this.filterOptions.maxPrice,
            min_year: this.filterOptions.minYear,
            max_year: this.filterOptions.maxYear,
          }
        })
          .then(res => {
            this.viewAllAuctions = res.data.data
          })
          .catch(err => {
            this.$toasted.error(err)
          })
      }
    },
    backToMainView() {
      this.loading = true
      this.isViewAll = null
      if (this.productFilter) {
        this.loadAuctions()
      }
    }
  },
}
</script>

<style lang="sass" scoped>
  .auction-browser-container
    max-width: 1440px
    margin: auto
</style>