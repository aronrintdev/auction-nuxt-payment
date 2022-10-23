<template>
  <div class="deadstock-exchange-page">
    <div class="d-flex heading-garamond">
      <h1>{{ title[0].label }}</h1>
    </div>
    <!-- Loaders -->
    <div
      v-if="loading"
      class="d-flex align-items-center justify-content-center h-500"
    >
      <Loader :loading="loading"></Loader>
    </div>

    <!-- Filters -->
    <div v-if="!loading && !isMobile">
      <ExchangeFilter @filterList="filterList" />
    </div>

    <!-- ProductTrendListCard Table -->
      <ProductTrendListCard :products="products" :activeHeaders="activeHeaders" :type="type" />
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
      screenWidth: 0,
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
      type: this.$route.params.type,
    }
  },
  computed: {
    currentSweepStake() {
      return this.promotions.length ? this.promotions[0] : null
    },
    isMobile() {
      if (this.screenWidth<= 760) {
        return true
      } else {
        return false
      }
    },
  },
  created() {
    this.loadPage();
  },
  destroyed() {
    window.removeEventListener('resize', this.myEventHandler);
  },
  mounted() {
    window.addEventListener('resize', this.myEventHandler);
  },
  methods: {
    // Search Data
    myEventHandler(e) {
      this.screenWidth = screen.width
    },
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
        .get('/stock-exchange/'+this.$route.params.type, {
          params: {
            type: this.type,
            page: this.currentPage,
            take: this.perPage,
            paginate:1,
            ...this.filter
          },
        })
        .then((response) => {
          if (response.data) {
            console.log(response.data.data)
            this.trending = response.data.data.data
            this.totalRows = response.data.total
          }
        })
        .catch((error) => {
          this.$toasted.error(error.message)
        })
    },
  },
}
</script>
