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
                <div>{{ $t('deadstock_exchange.detail.buy') }}</div>
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
                @change="handleChartTabChange"
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
              :chart-data="lineDatasets"
              :options="lineChartOptions"
              class="line-chart"
              chart-id="vendor-dashboard-line-chart"
            />
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-lg-12 text-center">
            <NavGroup
              :data="PRICE_SIZE_TABS"
              :value="priceSizeTabCurrentValue"
              class="section-nav"
              nav-key="line_chart"
              @change="handlePriceSizeTabChange"
            />
          </div>
          <ProductSizePicker
            :sizes="sizes"
            :value="currentSize"
            :viewMode="sizeViewMode"
            class="size-picker"
            @update="handleSizeChange"
            @changeViewMode="handleSizeViewAll"
          />
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
          <div id="tb-product" class="col-ld-12 overflow-auto">
            <SimilarProductTable :products="products" />
          </div>
        </div>
      </div>
    </div>
    <Modal
      id="size-all-modal"
      centered
      no-header-border
      no-footer-border
      hide-footer
    >
      <template #default>
        <div class="row text-left">
          <div class="col-12">
            <div class="body-4-bold">All Sizes</div>
          </div>
        </div>
        <hr class="my-2"/>
        <div class="row">
          <div class="col-6 text-left">
            <div class="body-6-bold mb-2">Average price</div>
            <div class="body-4-bold">$ 234.00</div>
          </div>
          <div class="col-6 text-right">
            <div class="body-6-bold mb-2">Day gain</div>
            <div class="body-6-normal text-success">$90.00</div>
          </div>
        </div>
        <hr class="my-2"/>
        <div class="row">
          <div class="col-12">
            <div class="all-sizes">
              <div class="row items-wrapper">
                <div
                  v-for="size in sizes"
                  :key="`size-${size.type}-${size.id}`"
                  :class="`col-3 item ${
                    currentSize === size.id ? 'active' : ''
                  }`"
                >
                  <div
                    class="card text-left pl-2"
                    @click="handleSizeSelect(size.id)"
                  >
                    {{ size.size }}
                    <div class="price">
                      $ 234.00
                      <!-- {{ getPriceBySize(size.id) | toCurrency }} -->
                    </div>
                    <div class="price-ratio text-success">
                      +0.64(+0.36%)
                      <!-- {{ getPriceBySize(size.id) | toCurrency }} -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import SimilarProductTable from './SimilarProductTable.vue'
import ProductSizePicker from '~/components/product/SizePicker'
import {
  Button,
  Loader,
  FormDropdown,
  SearchInput,
  Modal,
} from '~/components/common'
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
    ProductSizePicker,
    Modal,
  },
  data() {
    return {
      dayjs,
      loading: false,
      products: [],
      prices: [],
      similarProductSearchValue: '',
      sortBy: null,
      chartTabCurrentValue: '24',
      currentSize: null,
      currentCondition: null,
      method: 'buy',
      sizeViewMode: 'carousel',
      priceSizeTabCurrentValue: 'average_price',
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

  computed: {
    sizes() {
      // return this.products?.sizes || []
      return [
        {
          created_at: '2022-08-19T18:53:52.000000Z',
          enabled: true,
          id: 35,
          size: '5',
          size_type_id: null,
          type: 'women',
          updated_at: '2022-08-19T18:53:52.000000Z',
        },
        {
          created_at: '2022-08-19T18:53:52.000000Z',
          enabled: true,
          id: 36,
          size: '6',
          size_type_id: null,
          type: 'women',
          updated_at: '2022-08-19T18:53:52.000000Z',
        },
        {
          created_at: '2022-08-19T18:53:52.000000Z',
          enabled: true,
          id: 37,
          size: '7',
          size_type_id: null,
          type: 'women',
          updated_at: '2022-08-19T18:53:52.000000Z',
        },
        {
          created_at: '2022-08-19T18:53:52.000000Z',
          enabled: true,
          id: 38,
          size: '9',
          size_type_id: null,
          type: 'women',
          updated_at: '2022-08-19T18:53:52.000000Z',
        },
      ]
    },
  },
  watch: {
    lineDatasets: {
      handler(newValue, oldValue) {
        // Note: `newValue` will be equal to `oldValue` here
        // on nested mutations as long as the object itself
        // hasn't been replaced.
        // this.render()
      },
      deep: true
    }
  },
  mounted() {
    this.loadPage()
  },
  methods: {
    handleChartTabChange(value) {
      this.chartTabCurrentValue = value
      this.changeGraphLabel(value)
    },

    handlePriceSizeTabChange(value) {
      this.priceSizeTabCurrentValue = value
    },
    handleSizeViewAll() {
      this.$bvModal.show('size-all-modal')
    },
    render() {

      // this.renderChart({
      //   // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      //   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      //   datasets: [
      //     {
      //       label: 'Data One',
      //       backgroundColor: '#f87979',
      //       data: [0, 50.0, 150.0, 250.0, 400.0] // [40, 39, 10, 40, 39, 80, 40]
      //     }
      //   ]
      // }, {responsive: true, maintainAspectRatio: false})

    },
    handleSizeChange(sizeId) {
      if (sizeId) {
        this.currentSize = sizeId
      }
    },
    // Event handler when user select size in `view all` mode
    handleSizeSelect(sizeId) {},
    // Get min price for a given size among listing items
    getPriceBySize(sizeId) {
      return this.prices.find((i) => String(i.size_id) === String(sizeId))
        ?.price
    },
    // pricesBySize() {
    //   if (this.method === 'buy') {
    //     return this.products?.lowest_prices?.filter(
    //       (i) => i.packaging_condition_id === this.currentCondition
    //     )
    //   } else {
    //     return this.products?.highest_offers?.filter(
    //       (i) => i.packaging_condition_id === this.currentCondition
    //     )
    //   }
    // },
    changeGraphLabel(category) {

      switch (category) {
        case '24': {
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
        case '7': {
          this.lineDatasets.labels = [
            '7 pm',
            '6 pm',
            '10 pm',
            '2 am',
            '6 am',
            '10 am',
            '2 pm',
          ]
          break
        }
        case '30': {
          this.lineDatasets.labels = [
            '3 pm',
            '6 pm',
            '10 pm',
            '2 am',
            '6 am',
            '10 am',
            '2 pm',
          ]
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
          this.lineDatasets.labels = [
            '7 pm',
            '6 pm',
            '10 pm',
            '2 am',
            '6 am',
            '10 am',
            '2 pm',
          ]
      }
      this.$set(this.lineDatasets, 0, {
        data: [0, 50.0, 150.0, 250.0, 400.0],
        label: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
      });
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
          // .get('/stock-exchange/', {
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
