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
    <div v-if="!loading && !isResponsive">
      <ExchangeFilter @filterList="filterList" />
    </div>

    <!-- ProductTrendListCard Table -->
    <div v-if="products.length > 0" class="mb-3">
      <ProductTrendListCard
        :products="products"
        :activeHeaders="activeHeaders"
        :type="type"
      />
      <Pagination
        v-if="products.length > 0 && !isResponsive"
        :value="currentPage"
        :total="products.length"
        :per-page="perPage"
        :per-page-options="perPageOptions"
        class="pagination-group"
        @input="handlePageChange"
        @page-click="handlePageClick"
        @per-page-change="handlePerPageChange"
      />
    </div>
    <div v-else>
      <div class="product-carousel-wrapper">
        <div class="no-text py-5 text-center">No Products Found</div>
      </div>
    </div>
    <div v-if="products.length > 0 && isResponsive" class="ml-auto float-right">
      <div class="view-more-wrapper d-flex align-items-end">
        <span
          variant="link"
          class="btn-view-more font-primary text-gray-lightm mb-2 mr-3 d-lg-flex"
          @click="loadMore"
        >
          View More
        </span>
        <img
          class="pointer"
          width="44px"
          :src="require('assets/img/dashicons_arrow-right.png')"
          @click="loadMore"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { Loader, Pagination } from '~/components/common'
import ExchangeFilter from '~/components/Exchange/Filters'
import ProductTrendListCard from '~/components/Exchange/SimilarProductTable'
import { PAGE_OPTIONS, PER_PAGE } from '~/static/constants/stock-exchange'
import screenSize from '~/plugins/mixins/screenSize'
import { enquireScreenSizeHandler } from '~/utils/screenSizeHandler'

export default {
  name: 'TopProductsList',
  components: {
    Loader,
    ProductTrendListCard,
    ExchangeFilter,
    Pagination,

  },
  mixins: [ screenSize ],
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
      totalRows: null,
      currentPage: 1,
      page: 1,
      perPage: PER_PAGE,
      perPageOptions: PAGE_OPTIONS,
      products: [],
      trending: [],
      filter: null,
      activeHeaders: true,
      type: this.$route.params.type,
    }
  },
  computed: {
    currentSweepStake() {
      return this.promotions.length ? this.promotions[0] : null
    },
    isResponsive() {
      return this.isScreenXS || this.isScreenSM
    },
  },
  created() {
    if (this.isResponsive === true)
    {
      this.loadPage()
    }
  },
  beforeMount() {
    enquireScreenSizeHandler((type) => {
      this.$store.commit('size/setScreenType', type)
    })
  },
  methods: {
    // Search Data
    filterList(value) {
      this.filter = value
      this.loadPage()
    },

    loadMore() {
      this.perPage += 10
      this.loadPage()
    },
    handlePageClick(bvEvent, page) {
      if (this.page !== page) {
        this.perPage = page
        this.loadPage()
      }
    },

    handlePageChange(value) {
      if (this.page !== value) {
        this.perPage = value
        this.loadPage()
      }
    },

    handlePerPageChange(value) {
      if (this.perPage !== value) {
        this.perPage = value
        this.loadPage()
      }
    },
    // Get auctions list from API
    loadPage() {
      this.$axios
        .get('/stock-exchange/' + this.$route.params.type, {
          params: {
            type: this.type,
            page: this.currentPage,
            take: this.perPage,
            paginate: 1,
            'sort_by_column':'id',
            'sort_by_direction':'asc',
            ...this.filter,
          },
        })
        .then((response) => {
          if (response.data) {
            this.products = response.data.data.data
            this.totalRows = response.data.data.total
          }
        })
        .catch((error) => {
          this.$toasted.error(error.message)
        })
    },
  },
}
</script>
