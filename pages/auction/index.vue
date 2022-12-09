<template>
  <div class="auction-browser pb-4">
    <div class="m-auto auction-browser-container">
      <div class="auction-banner-title">
        {{ $t('auction.browse_auction') }}
      </div>
      <auction-filterbar :searchKeyword="productFilter ? productFilter.name : null" @change="handleFilterChange"/>
      <auction-mobile-filter @change="handleFilterChange"></auction-mobile-filter>
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
        <product-slider
          :title="$t(`auctions.frontpage.${isViewAll}`)"
          :auctions="viewAllAuctions"
          :type="'all'"
          :isCarouselMode="false"
        ></product-slider>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AuctionFilterbar from '~/components/Auctions/Filterbar'
import ProductSlider from '~/components/Auctions/ProductSlider'
import AuctionMobileFilter from '~/components/Auctions/MobileFilter'

export default {
  components: {
    AuctionFilterbar,
    ProductSlider,
    AuctionMobileFilter,
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
        type: 'single',
      },
      slidesCount: 8,
      loading: false,
    }
  },
  async fetch() {
    this.loadingFilter = true
    await this.fetchFilters()
    this.loadingFilter = false
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
      fetchFilters: 'browse/fetchFilters',
    }),
    handleSortByChanged(opt) {
      this.sortBy = opt
      this.loadAuctions()
    },
    // Listen auction type, product name and sortBy option changes
    handleFilterChange(filters) {
      this.isViewAll = 'search_results'
      this.filterOptions = filters
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
      this.viewAllAuctions = []
      if (status === 'recently_viewed') {
        this.loadRecentAuctions()
      } else if (this.filterOptions.status && this.filterOptions.status.length > 0) {
        this.filterOptions.status.forEach(st => {
          this.fetchByStatus(st)
        })
      } else {
        this.fetchByStatus('live')
      }
    },
    async fetchByStatus(status) {
      const res = await this.$axios.get('/auctions/public', {
        params: {
          status,
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
          brands: this.filterOptions.brands,
        }
      })
      const data = this.viewAllAuctions.concat(res.data.data)
      this.viewAllAuctions = data.reduce((unique, o) => {
        if(!unique.some(obj => obj.id === o.id)) {
          unique.push(o);
        }
        return unique;
      }, []);

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
@import '~/assets/css/_variables'

.auction-browser-container
  max-width: 1440px
.auction-banner-title
  font-family: $font-family-garamond
  font-weight: $bold
  font-size: 48px
  line-height: 100%
  color: $black
  margin: 35px 60px 34px
  @media (max-width: 576px)
    display: none
    margin: 0

</style>