<template>
  <div class="exchange-product-detail mb-5">
    <!-- Loaders -->
    <div
      v-if="loading"
      class="d-flex align-items-center justify-content-center h-500"
    >
      <Loader :loading="loading"></Loader>
    </div>
    <div v-if="!loading" class="row">
      <div class="col-lg-6 col-md-12 col-sm-12">
        <div class="row">
          <div class="col-lg-2">
            <ProductThumb
              src="https://api.deadstock.co/prod/api/sneakers/CV7562-401/image"
              class="product-thumbnail"
            />
          </div>
          <div class="col-lg-5">
            <div class="body-4-bold mb-2">Nike Lebron 18 Low (2021)</div>
            <div class="body-4-normal mb-2 text-gray-6">Black & White</div>
          </div>
          <div class="col-lg-5 text-right">
            <Button variant="dark-blue" @click="handleBuyClick">
              <div class="d-flex justify-content-between">
                <div>{{ $t('deadstock_exchange.detail.buy')}}</div>
              </div>
            </Button>
            <Button variant="dark" @click="handleSellClick">
              <div class="d-flex justify-content-between">
                <div>{{ $t('deadstock_exchange.detail.sell') }}</div>
              </div>
            </Button>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="body-4-normal mb-2 text-gray-6">
              {{ dayjs().format('DD, MMM, h:mm A') }}
            </div>
            <div class="body-4-bold mb-2">$ 250.00</div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-3">
            <div class="body-4-normal mb-2 text-success">+0.64 (+0.36%)</div>
          </div>
          <div class="col-lg-6">
            <div class="body-4-normal mb-2 text-gray-6">
              <NavGroup
                :data="CHART_FILTER_TABS"
                :value="chartTabCurrentValue"
                class="chart-section-nav"
                nav-key="line_chart"
                @change="handleTabChange"
              />
            </div>
          </div>
          <div class="col-lg-3">
            <div class="rounded-circle shadow share-icon">
              <ShareIcon />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <LineChart
              v-if="!loadingChart"
              :chart-data="lineDatasets"
              :options="lineChartOptions"
              class="line-chart"
              chart-id="vendor-dashboard-line-chart"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <NavGroup
              :data="PRICE_SIZE_TABS"
              :value="priceSizeTabCurrentValue"
              class="section-nav"
              nav-key="line_chart"
              @change="handleTabChange"
            />
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-12 col-sm-12">
        <div class="body-2-bold mb-2">
          {{ $t('deadstock_exchange.detail.similar_products') }}
        </div>

        <div class="row">
          <div class="col-lg-8">
            <!-- Input search -->
            <SearchInput
              :value="similarProductSearchValue"
              :placeholder="
                $t('deadstock_exchange.filter_by.details_placeholder')
              "
              variant="light"
              class="flex-grow-1 mr-4 search-input"
              :debounce="1000"
              @change="searchProduct"
            />
            <!-- ./Input search -->
          </div>
          <div class="col-lg-4">
            <FormDropdown
              id="sort-by"
              :value="sortBy"
              :placeholder="$t('deadstock_exchange.detail.filter')"
              :items="SIMILAR_FILTER_SORT_OPTIONS"
              :icon="require('~/assets/img/icons/three-lines.svg')"
              :icon-arrow-down="
                require('~/assets/img/icons/arrow-down-gray2.svg')
              "
              class="dropdown-sort flex-shrink-1"
              can-clear
              @select="handleSortBySelect"
            />
          </div>
        </div>
        <div class="row">
          <div id="tb-product" class="col-ld-12 overflow-auto scroll-smooth">
            <SimilarProductTable :products="products" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import SimilarProductTable from './SimilarProductTable.vue'
import { Button, Loader, FormDropdown, SearchInput } from '~/components/common'
import ProductThumb from '~/components/product/Thumb.vue'
import NavGroup from '~/components/common/NavGroup.vue'
import ShareIcon from '~/assets/img/icons/share.svg?inline'
export default {
  name: 'ProductDetail',
  components: {
    ProductThumb,
    Button,
    Loader,
    NavGroup,
    ShareIcon,
    SimilarProductTable,
    SearchInput,
    FormDropdown,
  },
  data() {
    return {
      dayjs,
      loading: false,
      loadingChart: false,
      products: [],
      similarProductSearchValue: '',
      sortBy: null,
      chartTabCurrentValue: '24',
      priceSizeTabCurrentValue: 'average_size',
      SIMILAR_FILTER_SORT_OPTIONS: [
        {
          label: this.$t('vendor_purchase.sort_by'),
          value: 'default',
        },
        {
          label: this.$t('deadstock_exchange.sort_by.highest_change'),
          value: 'highestChange',
        },
        {
          label: this.$t('deadstock_exchange.sort_by.lowest_change'),
          value: 'lowestChange',
        },
        {
          label: this.$t('deadstock_exchange.sort_by.release_date_asc'),
          value: 'releaseDateAsc',
        },
        {
          label: this.$t('deadstock_exchange.sort_by.last_price_lh'),
          value: 'lastPriceLh',
        },
        {
          label: this.$t('deadstock_exchange.sort_by.last_price_hl'),
          value: 'lastPriceHl',
        },
      ],
      PRICE_SIZE_TABS: [
        {
          label: this.$t('deadstock_exchange.detail.avg_price'),
          value: 'average_price',
        },
        {
          label: this.$t('deadstock_exchange.detail.size_specific'),
          value: 'size_specific',
        },
      ],
      CHART_FILTER_TABS: [
        {
          label: this.$t('deadstock_exchange.detail.24h'),
          value: '24',
        },
        {
          label: this.$t('deadstock_exchange.detail.7d'),
          value: '7',
        },
        {
          label: this.$t('deadstock_exchange.detail.30d'),
          value: '30',
        },
        {
          label: this.$t('deadstock_exchange.detail.6m'),
          value: '6',
        },
        {
          label: this.$t('deadstock_exchange.detail.1y'),
          value: '1',
        },
        {
          label: this.$t('deadstock_exchange.detail.all'),
          value: 'all',
        },
      ],
      // line chart data
      lineChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
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
                labelString: [
                  '$0.00',
                  '$100.00',
                  '$200.00',
                  '$300.00',
                  '$400.00',
                ],
              },
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
      lineDatasets: {
        labels: ['2 pm', '6 pm', '10 pm', '2 am', '6 am', '10 am', '2 pm'],
        datasets: [
          {
            borderColor: '#0bb63f',
            backgroundColor: null,
            data: [0, 50.0, 150.0, 250.0, 400.0],
            fill: false,
            borderWidth: 2,
          },
        ],
      },

    }
  },
  watch: {
    lineDatasets () {
      this.$nextTick(() => {
      this.renderLineChart({
      labels: this.lineDatasets.labels,
      datasets: this.lineDatasets
        }, this.lineChartOptions)
      })
    }
  },
  mounted() {
    this.loadPage()
  },

  methods: {
    handleTabChange(category) {
      this.chartTabCurrentValue = category
      this.changeGraphLabel(category)
    },
    changeGraphLabel(category) {
      switch (category) {
        case '24': {
          this.lineDatasets.labels = ['2 pm', '6 pm', '10 pm', '2 am', '6 am', '10 am', '2 pm'];
          break
        }
        case '7': {
          this.lineDatasets.labels = ['7 pm', '6 pm', '10 pm', '2 am', '6 am', '10 am', '2 pm'];
          break
        }
        case '30': {
          this.lineDatasets.labels = ['3 pm', '6 pm', '10 pm', '2 am', '6 am', '10 am', '2 pm'];
          break
        }
        case '1': {
          this.lineDatasets.labels = [
            '2 pm',
            '6 pm',
            '10 pm',
            '2 am',
            '6 am',
            '10 am',
            '2 pm',
          ]
          break
        }
        case 'all': {
          this.lineDatasets.labels = [
            '2 pm',
            '6 pm',
            '10 pm',
            '2 am',
            '6 am',
            '10 am',
            '2 pm',
          ]
          break
        }
        default:
        this.lineDatasets.labels = ['7 pm', '6 pm', '10 pm', '2 am', '6 am', '10 am', '2 pm'];
      }
    },
    // On filter by change.
    handleSortBySelect(value) {
      this.similarProductSearchValue = value.value
      // this.loadPage()
    },
    // On filter by change.
    searchProduct(value) {
      this.search = value
      this.loadPage()
    },
    handleBuyClick() {},
    handleSellClick() {},
    loadPage() {
      this.loading = true
      this.$axios
        .get('/products', {
          // .get('/stock-exchange', {
          params: {
            type: this.type,
            page: this.currentPage,
            take: this.perPage,
            search: this.search,
            sortBy: this.sortBy,
          },
        })
        .then((response) => {
          if (response.data) {
            console.log(response.data)
            this.products = response.data.data
            this.loading = false
            // this.totalRows = response.data.total
          }
        })
        .catch((error) => {
          this.loading = false
          this.$toasted.error(error.message)
        })
    },
  },
}
</script>
