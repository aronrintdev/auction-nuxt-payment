<template>
  <div class="deadstock-exchange-page">
    <div class="d-flex heading-garamond">
      <h1>{{ title[0].label}}</h1>
    </div>
    <!-- Loaders -->
    <div
      v-if="loading"
      class="d-flex align-items-center justify-content-center h-500"
    >
      <Loader :loading="loading"></Loader>
    </div>

    <!-- Filters -->
    <div v-if="!loading">
      <ExchangeFilter @filterList="filterList" />
    </div>

    <!-- ProductTrendListCard Table -->
    <ProductTrendListCard :products="products" :activeHeaders="activeHeaders" />
  </div>
</template>
<script>
import { Loader } from '~/components/common'
import ExchangeFilter from '~/components/Exchange/Filters'
import ProductTrendListCard from '~/components/Exchange/SimilarProductTable'

export default {
  name: 'TopProductsList',
  components: {
    Loader,
    ProductTrendListCard,
    ExchangeFilter,
  },
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
    title: {
      type: Array,
      required: true,
      defualt: [],
    },
  },
  data() {
    return {
      searchValue: '',
      categorySelected: '', // For Sort by filter
      filterBy: '',
      showSuccessMessage: null,
      searchFilters: {
        startDate: '',
        endDate: '',
        keyWord: '',
        sortBy: '',
        filterBy: '',
        perPage: 8,
        page: 1,
      },
      totalRows: null,
      currentPage: 1,
      perPage: process.env.INVENTORY_ITEMS_PER_PAGE,
      products: [],
      trending: [],
      gainers: [],
      losers: [],
      top_products: [],
      filter: null,
      activeHeaders: true,
    }
  },
  computed: {
    currentSweepStake() {
      return this.promotions.length ? this.promotions[0] : null
    },
  },
  created() {
    this.loadPage()
  },
  methods: {
    // Search Data
    filterList(value) {
      this.filter = value
      this.loadPage()
    },
    // Pagination "Change" event listener
    paginationChanged(page) {
      this.currentPage = page
      this.loadPage()
    },
    // Get auctions list from API
    loadPage() {
      this.$axios
        // .get('/products', {
        .get('/stock-exchange', {
          params: {
            // loser_products_count:10,
            // gainer_products_count:10,
            // trending_products_count:10,
            // top_products_count:10,
            // losers: 10,
            // type: this.type,
            // page: this.currentPage,
            // take: this.perPage,
            // ...this.filter
          },
        })
        .then((response) => {
          if (response.data) {
            console.log(response.data)
            this.trending = response.data.data.trending
            this.gainers = response.data.data.gainers
            this.losers = response.data.data.losers
            this.top_products = response.data.data
            this.totalRows = response.data.total
            this.setListData()
          }
        })
        .catch((error) => {
          this.$toasted.error(error.message)
        })
    },
    setListData() {
      switch (this.$route.params.type) {
        case 'trending': {
          this.products = this.trending
          break
        }
        case 'biggestWinners': {
          this.products = this.gainers
          break
        }
        case 'biggestLossers': {
          this.products = this.losers
          break
        }
        default:
          this.products = []
      }
    },
  },
}
</script>
