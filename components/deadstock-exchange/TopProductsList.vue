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

    <!-- Top Products Table -->
    <b-table
      v-if="!loading"
      :busy="loading"
      class="mt-3 auctions-table"
      :items="deadstockExchanges"
      :fields="tableColumns"
    >
      <template #table-busy>
        <div class="text-center text-dark my-2">
          <b-spinner class="align-middle"></b-spinner>
        </div>
      </template>
      <template #cell(details)="row">
        <div
          v-if="row.item.details"
          class="d-flex align-items-center text-left"
        >
          <ProductThumb :product="row.item.details.inventory.product" />
          <div class="ml-4">
            <span class="product-name">{{
              row.item.details.inventory.product.name
            }}</span>
            <br />
            <span class="product-sku"
              >{{ $t('sell.inventory.sku') }}:
              {{ row.item.details.inventory.product.sku }}</span
            >
            <br />
            <span class="item-number">{{ `#${row.item.id}` }}</span>
          </div>
        </div>
      </template>
      <template #cell(retail_price)="row">
        <span class="cell-wrapper quantity">$ {{ row.item.retail_price }}</span>
      </template>
      <template #cell(day_sales_percentage)="row">
        <span class="cell-wrapper quantity"> {{ row.item.day_sales_percentage }}%</span>
      </template>
      <template #cell(week_sales_percentage)="row">
        <span class="cell-wrapper quantity"> {{ row.item.week_sales_percentage }}%</span>
      </template>
      <template #cell(current_month_sale_percentage)="row">
        <span class="cell-wrapper quantity"> {{ row.item.current_month_sale_percentage }}%</span>
      </template>
    </b-table>
    <b-pagination
      v-if="totalRows"
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      class="auctions-pagination"
      @change="paginationChanged"
    ></b-pagination>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { Loader } from '~/components/common'
import ExchangeFilter from '~/components/deadstock-exchange/ExchangeFilter.vue'

export default {
  name: 'TopProductsList',
  components: {
    Loader,
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
      tableColumns: [
        {
          key: 'id',
          label: this.$t('deadstock_exchange.list.table_columns.ranking'),
          class: 'text-left',
        },
        {
          key: 'name',
          label: this.$t('deadstock_exchange.list.table_columns.name'),
        },
        {
          key: 'retail_price',
          label: this.$t('deadstock_exchange.list.table_columns.last_price'),
        },
        {
          key: 'day_sales_percentage',
          label: this.$t('deadstock_exchange.list.table_columns.24h'),
        },
        {
          key: 'week_sales_percentage',
          label: this.$t('deadstock_exchange.list.table_columns.7d'),
        },
        {
          key: 'current_month_sale_percentage',
          label: this.$t('deadstock_exchange.list.table_columns.30d'),
        },
        {
          key: 'week_sales_percentage',
          label: this.$t('deadstock_exchange.list.table_columns.last_7d'),
        },
      ],
      tableColumnsForCollection: [
        {
          key: 'id',
          label: this.$t('deadstock_exchange.list.table_columns.ranking'),
          class: 'text-left',
        },
        {
          key: 'name',
          label: this.$t('deadstock_exchange.list.table_columns.name'),
        },
        {
          key: 'retail_price',
          label: this.$t('deadstock_exchange.list.table_columns.last_price'),
        },
        {
          key: 'day_sales_percentage',
          label: this.$t('deadstock_exchange.list.table_columns.24h'),
        },
        {
          key: 'week_sales_percentage',
          label: this.$t('deadstock_exchange.list.table_columns.7d'),
        },
        {
          key: 'current_month_sale_percentage',
          label: this.$t('deadstock_exchange.list.table_columns.30d'),
        },
        {
          key: 'week_sales_percentage',
          label: this.$t('deadstock_exchange.list.table_columns.last_7d'),
        },
      ],
      totalRows: null,
      currentPage: 1,
      perPage: process.env.INVENTORY_ITEMS_PER_PAGE,
      deadstockExchanges: [],
      filter: null,
    }
  },
  computed: {
    ...mapGetters({
      promotions: 'promotions/getPromotions',
    }),
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
    searchPurchase() {
      this.loadData()
    },
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
            this.deadstockExchanges = response.data.data
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
