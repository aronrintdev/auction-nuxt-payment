<template>
  <b-container
    fluid
    class="container-profile-dashboard-breakdown h-100"
    :class="(isScreenXS ? '' : ' web-padding ') + mobileClass"
  >
    <span
      v-if="!isScreenXS"
      class="backToSearch body-13"
      role="button"
      @click="moveBack"
    >
      <img
        :src="require('~/assets/img/icons/arrow-left-gray.svg')"
        class="img-fluid"
      />
      {{ $t('common.back') }}
    </span>

    <NavGroup
      v-if="isScreenXS"
      :data="globalTabs"
      :value="activeGlobalTab"
      :class="mobileClass"
      class="nav-grp mb-20"
      @change="tabChange"
    />

    <div v-if="isScreenXS">
      <div
        v-if="activeGlobalTab === 'category'"
        class="categories row d-flex align-items-center mb-20"
      >
        <div class="col-6 form-check mr-43">
          <input
            id="flexCheckDefault-total"
            v-model="categorySelectAll"
            class="form-check-input"
            type="checkbox"
            @change="categoryTotalSelect"
          />
          <label for="flexCheckDefault-total">
            {{ $t('vendor_dashboard.breakdown.total') }}
          </label>
        </div>
        <div
          v-for="(item, index) in categories"
          :key="index"
          class="form-check mr-43 col-6"
        >
          <input
            :id="`${activeGlobalTab}-flexCheckDefault-${index}`"
            v-model="filters.categories"
            :value="item.value"
            class="form-check-input"
            type="checkbox"
            @change="categoryChange"
          />
          <label :for="`${activeGlobalTab}-flexCheckDefault-${index}`">
            {{ item.label | capitalizeFirstLetter }}
          </label>
        </div>
      </div>
      <div v-if="activeGlobalTab === 'brand'" class="mt-1 mb-31">
        <div @click="mobileFiltersOpen = true">
          <MobileSearchInput
            :value="''"
            :placeholder="$t('common.search_brands').toString()"
          />
        </div>
      </div>
      <div v-if="activeGlobalTab === 'product'" class="mt-1 mb-31">
        <div @click="mobileFiltersOpen = true">
          <MobileSearchInput
            :value="''"
            :placeholder="$t('common.search_products').toString()"
          />
        </div>
      </div>

      <div
        v-if="
          (activeGlobalTab === 'brand' || activeGlobalTab === 'product') &&
          (filters.brands.length || filters.products.length)
        "
        class="categories shown row d-flex align-items-center mb-20"
      >
        <div
          v-for="(item, index) in activeGlobalTab === 'brand'
            ? filters.brands
            : filters.products"
          :key="index"
          class="form-check col-6"
        >
          <input
            :id="`${activeGlobalTab}-flexCheckDefault-${index}`"
            :checked="true"
            class="form-check-input"
            type="checkbox"
            @change="selectedChange(item)"
          />
          <label :for="`${activeGlobalTab}-flexCheckDefault-${index}`">
            {{ item.name | capitalizeFirstLetter }}
          </label>
        </div>
        <div class="form-check col-6">
          <div
            v-if="filters.brands.length || filters.products.length"
            class="body-13-normal font-secondary text-decoration-underline text-gray-simple"
            role="button"
            @click="resetFilter"
          >
            {{ $t('vendor_dashboard.breakdown.clear_all') }}
          </div>
        </div>
      </div>
    </div>

    <div>
      <div
        :class="{
          mobile: isScreenXS,
          'mt-19': !isScreenXS,
        }"
        class="chart-card bg-white br-10"
      >
        <div
          v-if="!isScreenXS"
          :class="{
            'm-padding-title': isScreenXS,
          }"
          class="d-flex align-items-center justify-content-between"
        >
          <h1 class="body-2-bold font-primary mb-0">
            {{ $t('vendor_dashboard.breakdown.sales') }}
          </h1>

          <div
            class="text-decoration-underline text-black body-4-normal font-secondary"
            role="button"
          >
            {{ $t('vendor_dashboard.breakdown.export') }}
          </div>
        </div>

        <div
          v-if="!isScreenXS"
          class="mt-14 d-flex align-items-center justify-content-between"
        >
          <div class="tabs global d-flex align-items-center">
            <div
              v-for="tab in globalTabs"
              :key="tab.value"
              role="button"
              @click="tabChange(tab.value)"
            >
              <div
                class="tab font-secondary"
                :class="{
                  'body-3-medium text-black': tab.value === activeGlobalTab,
                  'body-3-normal text-gray-4': tab.value !== activeGlobalTab,
                }"
              >
                {{ tab.text }}
              </div>
            </div>
          </div>
          <CustomSelect
            :default="filterBy"
            :options="chartFilterOptions"
            :threelineIcon="false"
            :title="filterByTitle"
            class="dropdown-filter"
            @input="handleFilterByChangeTotalSale"
          />
        </div>

        <BreakDownFilters
          v-if="!isScreenXS"
          :current-tab="activeGlobalTab"
          :server-brands="serverBrands"
          :server-categories="serverCategories"
          @filters="filterChanged"
        />

        <div class="tabs d-sm-none d-flex gap-2 justify-content-center">
          <h6
            v-for="(tab, index) in filterTabs"
            :key="index"
            :class="{ activeOne: activeTab === tab.value }"
            class="fs-10 fw-7 font-primary mb-0 cursor-pointer position-relative text-uppercase"
            @click="changeFilter(tab.value)"
          >
            {{ tab.title }}
          </h6>
        </div>

        <div class="position-relative mt-3 mt-sm-5 mb-3 mb-sm-4">
          <LineChart
            :chart-data="mainChart"
            :height="174"
            :options="lineChartOptions"
            chart-id="vendor-dashboard-line-chart"
            class="line-chart d-none d-sm-block"
            is-graph
          />
          <LineChart
            :chart-data="mainChart"
            :height="174"
            :options="lineChartOptions"
            chart-id="vendor-dashboard-line-chart"
            class="line-chart d-block d-sm-none"
            is-graph
          />
          <div class="chart-labels mx-3 mt-4">
            <div v-for="item in mainChart.datasets" :key="item.label" class="item d-flex align-items-center mr-3 ">
              <div class="dot" :style="{
                'background-color': item.borderColor
              }">
              </div>
              <div class="body-5-normal font-primary text-black chart-label">
                {{item.label}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      :class="{
        'mt-26': isScreenXS,
        'mt-36': !isScreenXS,
      }"
    >
      <div
        class="d-flex"
        :class="{
          'justify-content-center ': isScreenXS,
          'mb-31': !isScreenXS,
        }"
      >
        <div
          class="ml-4 font-primary"
          :class="{
            'body-21-medium mr-1 text-black': isScreenXS,
            'body-2-bold mr-22': !isScreenXS,
          }"
        >
          {{ $t('vendor_dashboard.breakdown.statistics') }}
        </div>
        <div
          :class="{
            'body-21-medium text-black font-primary': isScreenXS,
            'body-2-normal font-secondary text-capitalize text-gray-simple':
              !isScreenXS,
          }"
        >
          ({{ chartFilterOptions[activeTab] }})
        </div>
      </div>

      <b-table
        :fields="filteredTableFields"
        :items="result.statistics"
        borderless
        class="stat-table"
        no-border-collapse
        tbody-tr-class="bg-white p-web-row"
        :busy="loading"
        :show-empty="!loading && result.statistics.length === 0"
      >
        <template #table-busy>
          <div class="d-flex align-items-center justify-content-center w-100">
            <Loader :loading="loading" />
          </div>
        </template>
        <template #head()="scope">
          <div
            class="text-nowrap"
            role="button"
            onselectstart="return false"
            @click="orderBy(scope)"
          >
            <span class="mr-1">{{ scope.label }}</span>
            <img
              v-if="scope.label"
              :src="require('~/assets/img/icons/down-arrow-solid.svg')"
              :alt="scope.label"
              class="sort-icon"
              :class="reverseDirection(scope.column)"
            />
          </div>
        </template>
        <template #cell(category)="row">
          <div
              :aria-label="row.item.category | capitalizeFirstLetter"
              class="d-flex align-items-center justify-content-center tdHeight tTitle"
          >
            <h4 class="font-secondary fw-5 fs-18 mb-0">
              {{ row.item.category | capitalizeFirstLetter }}
            </h4>
          </div>
        </template>
        <template #cell(brand)="row">
          <div
              :aria-label="row.item.brand | capitalizeFirstLetter"
              class="d-flex align-items-center justify-content-center tdHeight tTitle"
          >
            <h4 class="font-secondary fw-5 fs-18 mb-0">
              {{ row.item.brand | capitalizeFirstLetter }}
            </h4>
          </div>
        </template>
        <template #cell(product)="row">
          <div
              :aria-label="row.item.product | capitalizeFirstLetter"
              class="d-flex align-items-center justify-content-center tdHeight tTitle"
          >
            <h4 class="font-secondary fw-5 fs-18 mb-0">
              {{ row.item.product | capitalizeFirstLetter }}
            </h4>
          </div>
        </template>
        <template #cell(premium_percentage)="row">
          <div
            :aria-label="$t('vendor_dashboard.breakdown.table.price_premium')"
            class="d-flex align-items-center justify-content-center tdHeight"
          >
            <h4
              class="font-secondary fw-5 fs-18 mb-0"
              :class="{
                'text-success': (row.item.premium_percentage | 0) > 0,
                'text-danger': (row.item.premium_percentage | 0) < 0,
              }"
            >
              {{ row.item.premium_percentage || 0 | toPercentage }}
            </h4>
          </div>
        </template>
        <template #cell(total_sales_amount)="row">
          <div
            :aria-label="$t('vendor_dashboard.breakdown.table.sales')"
            class="d-flex align-items-center justify-content-center tdHeight"
          >
            <h4 class="font-secondary fw-5 fs-18 mb-0">
              {{ row.item.total_sales_amount || 0 | toCurrency }}
              <span
                v-if="(row.item.premium_percentage | 0) > 0"
                class="text-success text-sm"
                >(+{{ row.item.avg_sales_price || 0 }}%)</span
              >
              <span
                v-if="(row.item.premium_percentage | 0) < 0"
                class="text-danger text-sm"
                >(-{{ row.item.avg_sales_price || 0 }}%)</span
              >
            </h4>
          </div>
        </template>
        <template #cell(avg_sales_price)="row">
          <div
            :aria-label="$t('vendor_dashboard.breakdown.table.avg_sale_price')"
            class="d-flex align-items-center justify-content-center tdHeight"
          >
            <h4 class="font-secondary fw-5 fs-18 mb-0">
              {{ row.item.avg_sales_price || 0 | toCurrency }}
            </h4>
          </div>
        </template>

        <template #cell(items_sold)="row">
          <div
            :aria-label="$t('vendor_dashboard.breakdown.table.items_sold')"
            class="d-flex align-items-center justify-content-center tdHeight"
          >
            <h4 class="font-secondary fw-5 fs-18 mb-0">
              {{ row.item.items_sold || '-' }}
            </h4>
          </div>
        </template>
      </b-table>
    </div>

    <MobileBottomSheet
      :height="'90%'"
      :open="mobileFiltersOpen"
      :is-rounded="false"
      :has-overlay="false"
      :swipeable="false"
      :header-style="{
        display: 'none !important',
      }"
      class="bottom-sheet"
      :title="$t('notifications.filter_by')"
      @closed="mobileFiltersOpen = false"
      @opened="mobileFiltersOpen = true"
    >
      <div
        class="filter-content py-2 px-4 d-flex flex-column justify-content-between h-100"
      >
        <div class="my-2">
          <MobileSearchInput
            v-model="productSearchKey"
            :value="productSearchKey"
            :placeholder="
              activeGlobalTab === 'brand'
                ? $t('common.search_brands').toString()
                : $t('common.search_products').toString()
            "
            @input="filterSearchChange"
          />
        </div>
        <div class="overflow-auto flex-grow-1">
          <div v-if="activeGlobalTab === 'brand'">
            <MobileFilterItem
              :title="$t('vendor_dashboard.breakdown.select_all').toString()"
              :selected="allBrandsSelected"
              @click="allBrandSelect"
            />
            <div v-for="item in filteredBrands" :key="item.id">
              <MobileFilterItem
                :title="item.name"
                :selected="hasItem(filters.brands, item)"
                @click="brandFilterClick(item)"
              />
            </div>
          </div>
          <div v-if="activeGlobalTab === 'product'">
            <div
              v-if="searchLoading"
              class="d-flex align-items-center justify-content-center"
            >
              <Loader :loading="searchLoading"></Loader>
            </div>
            <div v-else>
              <MobileFilterItem
                :title="$t('vendor_dashboard.breakdown.select_all').toString()"
                :selected="allProductsSelected"
                @click="allProductSelect"
              />
              <div v-for="item in products" :key="item.id">
                <MobileFilterItem
                  :title="item.name"
                  :selected="hasItem(filters.products, item)"
                  @click="productFilterClick(item)"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-between my-4">
          <Button
            class="filter-button"
            pill
            variant="outline-dark"
            @click="resetFilter"
          >
            {{ $t('notifications.reset') }}
          </Button>

          <Button
            :disabled="loading"
            class="filter-button apply-filters"
            pill
            variant="dark-blue"
            @click="applyFilters"
          >
            {{
              $t('vendor_dashboard.breakdown.select_name', {
                name: $options.filters.capitalizeFirstLetter(activeGlobalTab),
              })
            }}
          </Button>
        </div>
      </div>
    </MobileBottomSheet>
  </b-container>
</template>

<script>
import _ from 'lodash'
import screenSize from '~/plugins/mixins/screenSize'
import { CustomSelect } from '~/components/common'
import NavGroup from '~/components/common/NavGroup'
import Loader from '~/components/common/Loader'
import BreakDownFilters from '~/components/profile/vendor-dashboard/BreakDownFilters'
import MobileSearchInput from '~/components/mobile/MobileSearchInput'
import MobileBottomSheet from '~/components/mobile/MobileBottomSheet'
import Button from '~/components/common/Button'
import MobileFilterItem from '~/components/profile/vendor-dashboard/MobileFilterItem'

export default {
  name: 'BreakDownPage',
  components: {
    MobileFilterItem,
    Button,
    MobileBottomSheet,
    MobileSearchInput,
    BreakDownFilters,
    Loader,
    NavGroup,
    CustomSelect,
  },
  mixins: [screenSize],
  layout: 'Profile',
  data() {
    return {
      productSearchKey: '',
      products: [],
      serverCategories: [],
      serverBrands: [],
      mobileFiltersOpen: false,
      allBrandsSelected: false,
      allProductsSelected: false,
      categorySelectAll: false,
      categories: Object.keys(
        this.$t('vendor_dashboard.breakdown.categories')
      ).map((key) => {
        return {
          label: this.$t(`vendor_dashboard.breakdown.categories.${key}`),
          value: key,
        }
      }),
      activeGlobalTab: 'category',
      globalTabs: Object.keys(this.$t('vendor_dashboard.breakdown.tabs')).map(
        (key) => {
          return {
            text: this.$t(`vendor_dashboard.breakdown.tabs.${key}`),
            label: this.$t(`vendor_dashboard.breakdown.tabs.${key}`),
            value: key,
          }
        }
      ),
      loading: false,
      searchLoading: false,
      stats: [],
      fields: [
        {
          key: 'brand',
          label: this.$t('vendor_dashboard.breakdown.table.brand'),
          thClass: 'text-nowrap text-center body-4-bold',
        },
        {
          key: 'product',
          label: this.$t('vendor_dashboard.breakdown.table.product'),
          thClass: 'text-nowrap text-center body-4-bold',
        },
        {
          key: 'category',
          label: this.$t('vendor_dashboard.breakdown.table.category'),
          thClass: 'text-nowrap text-center body-4-bold',
        },
        {
          key: 'items_sold',
          label: this.$t('vendor_dashboard.breakdown.table.items_sold'),
          thClass: 'text-nowrap text-center body-4-bold',
        },
        {
          key: 'premium_percentage',
          label: this.$t('vendor_dashboard.breakdown.table.price_premium'),
          thClass: 'text-nowrap text-center body-4-bold',
        },
        {
          key: 'avg_sales_price',
          label: this.$t('vendor_dashboard.breakdown.table.avg_sale_price'),
          thClass: 'text-nowrap text-center body-4-bold',
        },
        {
          key: 'total_sales_amount',
          label: this.$t('vendor_dashboard.breakdown.table.sales'),
          thClass: 'text-nowrap text-center body-4-bold',
        },
      ],
      result: {
        chart: {},
        statistics: [],
      },
      filters: {
        category_ids: [],
        categories: [],
        brands: [],
        products: [],
        brand_ids: [],
        product_ids: [],
      },
      filterByTitle: this.$t('selling_page.status'),
      filterBy: 'month',
      activeTab: 'month',
      activeTabDoughnut: 'week',
      filterTabs: [
        { title: 'Week', value: 'week' },
        { title: 'Month', value: 'month' },
        { title: 'Year', value: 'year' },
      ],
      chartFilterOptions: {
        week: 'Week to Date',
        month: 'Month to Date',
        year: 'Year to Date',
      },
      lineChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        borderWidth: 5,
        showLine: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                drawOnChartArea: false,
              },
              ticks: {
                fontFamily: 'Montserrat',
                fontColor: '#000',
                fontSize: 12,
                fontStyle: 'bold',
              },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                labelString: ['5k', '15k', '20k', '25k', '30k'],
              },
              gridLines: {
                drawOnChartArea: false,
              },
              ticks: {
                fontFamily: 'Montserrat',
                fontColor: '#000',
                fontSize: 12,
                fontStyle: 'bold',
                callback(value, index, ticks) {
                  const formatter = Intl.NumberFormat('en', {
                    notation: 'compact',
                  })
                  return formatter.format(value)
                },
              },
            },
          ],
        },
        legend: {
          display: false,
        },
        elements: {
          point: {
            radius: 0,
          },
        },
      },
      orderByField: 'id',
      orderByDirection: 'asc',
      labels: [],
      colors: [
          '#CE745F80',
          '#7196B180',
          '#3A71EA80',
          '#DD5E5E80',
          '#E09D6A',
          '#5D5FEF80',
          '#FDB92780',
          '#1D1C1D80',
          '#EF5DA880',
          '#66779980',
          '#FF8181',
          '#32BD4080',
          '#C1C1C1',
          '#FD800280',
          '#6F88EA80',
      ],
      mainChart: {
        labels: [],
        datasets: [],
      }
    }
  },
  computed: {
    filteredBrands() {
      return this.serverBrands.filter((item) =>
        this.productSearchKey
          ? item.name.toLowerCase().includes(this.productSearchKey)
          : true
      )
    },
    isDataEmpty() {
      return this.dataGraph.every((item) => !item)
    },
    filteredTableFields() {
      return [
        ...this.fields.filter((field) => field.key === this.activeGlobalTab),
        ...this.fields.slice(3, this.fields.length),
      ]
    },
  },
  created() {
    // eslint-disable-next-line no-undef
    Chart.plugins.register({
      afterDraw(chart) {
        let sum = 0
        sum = chart.data.datasets.reduce((accumulator, item) => accumulator + item.data.reduce((acc, val) => acc + val, 0), sum)
        if (sum === 0) {
          const ctx = chart.chart.ctx
          const width = chart.chart.width
          const height = chart.chart.height
          ctx.clearRect(width * 0.25, height * 0.25, width * 0.75, height * 0.5)
          ctx.fillStyle = '#626262'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.font = '500 18px Montserrat'

          ctx.fillText('No Data Found', width / 2, height / 2 - 30)
          ctx.restore()
        }
      },
    })
  },
  mounted() {
    this.fetchServerData()
    this.searchProduct()
    this.getData()
  },
  methods: {
    allProductSelect() {
      this.allProductsSelected = !this.allProductsSelected
      this.filters.products = []
      this.filters.product_ids = []
    },
    allBrandSelect() {
      this.allBrandsSelected = !this.allBrandsSelected
      this.filters.brands = []
      this.filters.brand_ids = []
    },
    brandFilterClick(item) {
      this.allBrandsSelected = false
      if (this.hasItem(this.filters.brands, item)) {
        this.filters.brands = this.removeItem(this.filters.brands, item)
      } else {
        this.filters.brands.push(item)
      }
    },
    productFilterClick(item) {
      this.allProductsSelected = false
      if (this.hasItem(this.filters.products, item)) {
        this.filters.products = this.removeItem(this.filters.products, item)
      } else {
        this.filters.products.push(item)
      }
    },
    resetFilter() {
      this.allProductsSelected = false
      this.allBrandsSelected = false
      this.filters = {
        category_ids: [],
        categories: [],
        brands: [],
        products: [],
        brand_ids: [],
        product_ids: [],
      }
      this.mobileFiltersOpen = false
      this.filterChanged({ filterData: {} })
    },
    applyFilters() {
      let filterData = {}
      if (this.activeGlobalTab === 'brand') {
        filterData = {
          brand_ids: this.filters.brands.map((item) => item.id),
        }
      } else {
        filterData = {
          product_ids: this.filters.products.map((item) => item.id),
        }
      }
      this.filterChanged({ filterData })
      this.mobileFiltersOpen = false
    },
    removeItem(arr, value) {
      return arr?.filter((i) => i.id !== value.id)
    },
    hasItem(arr, item) {
      return arr?.filter((it) => it.id === item.id).length > 0
    },
    filterSearchChange: _.debounce(function (search) {
      if (this.activeGlobalTab === 'product') {
        this.searchProduct()
      }
    }, 300),
    searchProduct() {
      this.searchLoading = true
      this.$axios
        .get('/products', {
          params: {
            search: this.productSearchKey.toLowerCase(),
            take: 50,
          },
        })
        .then((response) => {
          this.products = response.data.data || []
        })
        .catch((error) => {
          this.$toasted.error(error)
        })
        .finally(() => {
          this.searchLoading = false
        })
    },
    fetchServerData() {
      this.$axios.get('/categories').then((res) => {
        this.serverCategories = res.data
      })
      this.$axios.get('/brands').then((res) => {
        this.serverBrands = res.data
      })
    },
    categoryTotalSelect(val) {
      if (this.categorySelectAll) {
        this.filters.categories = this.categories.map((item) => item.value)
      } else {
        this.filters.categories = []
      }
      this.categoryTransformer()
    },
    selectedChange(item) {
      if (this.activeGlobalTab === 'brand') {
        this.filters.brands = this.filters.brands.filter(
          (it) => item.id !== it.id
        )
      } else {
        this.filters.products = this.filters.products.filter(
          (it) => item.id !== it.id
        )
      }
      this.applyFilters()
    },
    categoryChange(val) {
      this.categorySelectAll = this.filters.categories.length === 3
      this.categoryTransformer()
    },
    categoryTransformer() {
      const categories = this.serverCategories
        .filter((item) => this.filters.categories.includes(item.name))
        .map((a) => a.id)
      if (this.filters.categories.includes('footwear')) {
        categories.push(1)
      }
      const filterData = {
        category_ids: categories,
      }
      this.filterChanged({ filterData })
    },
    filterChanged(data) {
      const filters = data.filterData
      this.filters.category_ids = filters.category_ids || []
      this.filters.brand_ids = filters.brand_ids || []
      this.filters.product_ids = filters.product_ids || []
      this.getData()
    },
    orderBy(scope) {
      this.orderByDirection = this.reverseDirection(scope.column)
      this.orderByField = scope.column
      this.getData()
    },
    reverseDirection(column) {
      return column === this.orderByField
        ? this.orderByDirection === 'asc'
          ? 'desc'
          : 'asc'
        : 'desc'
    },
    moveBack() {
      this.$router.push('/profile/vendor-dashboard')
    },
    changeFilter(tab) {
      this.activeTab = tab
      this.handleFilterByChangeTotalSale(tab)
    },
    tabChange(tab) {
      this.activeGlobalTab = tab
    },
    handleFilterByChangeTotalSale(filter) {
      this.filterBy = filter
      this.getData()
    },
    getData() {
      this.loading = true
      this.$axios
        .get('/dashboard/vendor/sales-breakdown', {
          params: {
            category_ids: Array.isArray(this.filters.category_ids)? this.filters.category_ids.join(','): null,
            group_by: this.filterBy,
            brand_ids: Array.isArray(this.filters.brand_ids)? this.filters.brand_ids.join(','): null,
            product_ids: Array.isArray(this.filters.product_ids)? this.filters.product_ids.join(','): null,
          },
        })
        .then((response) => {
          const stats = response.data.data.statistics
          const chart = response.data.data.chart
          this.result.chart = chart
          this.result.statistics = Object.keys(stats).map(key => {
            const obj = stats[key]
            obj[this.activeGlobalTab] = key
            return obj
          })
          const chartData = {
            labels: [],
            datasets: []
          }
          chartData.labels = Array.from(new Set(Object.keys(chart).map(item => Object.keys(chart[item])).flat(1)))
          chartData.datasets = Object.keys(chart).map((key, index) => {
            return {
              label: this.$options.filters.capitalizeFirstLetter(key),
              data: chartData.labels.map(label => Number(chart[key][label] || 0)),
              fill:false,
              borderColor: this.colors[index],
            }
          })

          this.mainChart = chartData
          console.log(this.mainChart);
          console.log(response.data.data);
          console.log(this.labels);
        })
        .catch((error) => {
          this.$toasted.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>

<style scoped lang="sass">
@import "~/assets/css/variables"
.chart-labels
  direction: rtl
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))
  .item
    direction: ltr
    margin-left: auto
  .chart-label
    max-width: 170px
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

.dot
  width: 12px
  min-width: 12px
  height: 12px
  border-radius: 43px
  margin-right: 13px

::v-deep.bottom-sheet
  .bottom-sheet__pan
    display: none !important

::v-deep.p-web-row
  padding: 26px 28px

.sort-icon
  &.asc
    transform: rotate(180deg)
::v-deep.nav-grp
  &.mobile
    width: 100%
  .btn-group
    height: 36px
    margin-inline: 0
    button.btn
      @include body-6-regular
      font-family: $font-montserrat
      width: 103px
      padding-block: 1px
      &.active
        font-weight: $medium

.mt-19
  margin-top: 19px

.mt-36
  margin-top: 36px

.mt-26
  margin-top: 26px

.mb-15
  margin-bottom: 15px

.mt-15
  margin-top: 15px

.mt-31
  margin-top: 31px

.mb-31
  margin-bottom: 31px

.mt-14
  margin-top: 14px

.mr-22
  margin-right: 22px

.mb-20
  margin-bottom: 20px

.tabs
  &.global
    width: 408px
    border-bottom:  0.5px solid $color-gray-23
    padding-bottom: 4px
    .tab
      &:not(last-child)
        margin-right: 96px

.text-gray-4
  color: $color-gray-4

.chart-card
  padding: 25px 27px 20px 27px
  &.mobile
    padding: 15px 8px 10px 7px
    box-shadow: 0px 1px 4px rgba($color-black-1, 0.25)
    border-radius: 8px

.web-padding
  padding: 30px 24px
.container-profile-dashboard-breakdown
  background-color: $color-gray-1
  &.mobile
    background-color: $color-white-1
    padding: 10px 15px 38px 17px

.dropdown-filter::v-deep
  background-color: $color-white-4
  border-radius: 8px
  border: none
  width: 200px
  &.custom-selectbox
    .selected
      @include body-13-medium
      color: $color-black-1
      background-color: $color-white-4
      font-family: $font-family-sf-pro-display
      border: none
      padding-inline: 18px

      label
        display: none

    .items
      @include body-13-regular
      color: $color-black-1
      font-family: $font-family-sf-pro-display

::v-deep.stat-table
  &.table.b-table.b-table-no-border-collapse
    border-spacing: 0 10px

  thead th div
    font-family: $font-family-base
    @include body-13-bold

  tbody td
    height: 100px
    @media (max-width: 576px)
      display: flex
      height: fit-content
      padding: 2px 0.75rem
      &:nth-child(odd)
        background-color: $color-white-5
      &:first-child
        background-color: transparent

  .tdHeight
    height: inherit

  .stats-graph
    width: 100px
    height: 40px

  @media (max-width: 576px)
    .view-more-link
      font-size: 10px
      font-weight: $medium
    .heading
      font-family: $font-family-base
      @include body-5-medium
    thead
      display: none
    tr[role="row"]
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25)
      border-radius: 8px
      outline: 1px solid $color-gray-3
      display: block
      margin: 12px 0
      padding: 15px 0 6px 0

      h4.font-secondary
        width: fit-content
        font-size: 12px
        color: $color-gray-6
        font-weight: $normal
        font-family: $font-family-base

        &.border-bottom.bottom-primary
          border: 0
    .tdHeight
      @include body-9-medium
      color: $color-black-1
      width: 100%
      padding: 1px 0
      h4
        @include body-9-normal
        color: $color-gray-6

      &::before
        content: attr(aria-label)
        margin-right: auto
        width: 100%

.categories
  margin-inline: 30px
  &.shown
    margin-inline: 4px

.form-check

  .form-check-input
    border: none
    box-shadow: none

    &::after
      content: ' '
      background-color: $color-gray-75
      position: absolute
      left: 0
      top: 50%
      width: 16px
      height: 16px
      transform: translateY(-7px)
      border-radius: 2px

    &:checked
      &::after
        background-color: $color-blue-20
        border-color: $color-blue-20
        background-image: url('~/assets/img/icons/checkmark-thick.svg')
        background-repeat: no-repeat
        background-size: 10px
        box-shadow: none
        background-position: center

  label
    max-width: 140px
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    font-family: $font-family-sf-pro-display
    @include body-13-normal
    text-align: left
    color: $color-gray-5
    padding-left: 16px
    width: 100%
</style>
