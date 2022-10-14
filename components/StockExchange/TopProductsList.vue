<template>
  <div class="deadstock-exchange-page">
    <div class="d-flex heading-garamond">
      <h1>{{ title }}</h1>
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
    <ProductTrendListCard :products="products" />

  </div>
</template>
<script>
import { Loader } from '~/components/common'
import ExchangeFilter from '~/components/stockExchange/ExchangeFilter'
import ProductTrendListCard from '~/components/product/TrendTable'

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
      type: String,
      required: true,
      defualt: 'Top Products',
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
      filter: null,
    }
  },
  computed: {
    currentSweepStake() {
      return this.promotions.length ? this.promotions[0] : null
    },
    entries() {
      return this.currentSweepStake && this.$auth.user
        ? this.currentSweepStake.promotion_entries.filter(
            (entry) => entry.user_id === this.$auth.user.id
          ).length
        : 0
    },
  },
  created() {
    this.loadPage()
  },
  methods: {
    // Search Data
    filterList(value) {
      this.filter =value
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
        .get('/products', {
          params: {
            type: this.type,
            page: this.currentPage,
            take: this.perPage,
            ...this.filter
          },
        })
        .then((response) => {
          if (response.data) {
            console.log(response.data)
            this.products = response.data.data
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
