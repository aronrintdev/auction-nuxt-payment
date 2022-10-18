<template>
  <div class="exchange-product-detail">
    <!-- Loaders -->
    <div
      v-if="loading"
      class="d-flex align-items-center justify-content-center h-500"
    >
      <Loader :loading="loading"></Loader>
    </div>
    <div class="row">
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
            <Button variant="dark-blue" class="mx-3" @click="handleBuyClick">
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
                :data="categoryItems"
                :value="current"
                class="section-nav"
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
              :chart-data="lineDatasets"
              :options="lineChartOptions"
              class="line-chart"
              chart-id="vendor-dashboard-line-chart"
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
              :value="searchValue"
              :placeholder="$t('deadstock_exchange.filter_by.details_placeholder')"
              variant="light"
              class="flex-grow-1 mr-4 search-input"
              :debounce="1000"
              @change="searchProduct"
            />
            <!-- ./Input search -->
          </div>
          <div class="col-lg-4"></div>
          <div class="row">
            <div class="col-ld-12">
              <!-- ProducListCard Table -->
              <SimilarProductTable :products="products" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import SimilarProductTable from './SimilarProductTable.vue'
import { Button, Loader ,SearchInput} from '~/components/common'
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
    SearchInput
  },
  data() {
    return {
      dayjs,
      loading: false,
      products: [],
      categoryItems: [
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
      searchValue: '',
      current: '24',
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
  mounted() {
    this.loadPage()
  },
  methods: {
    handleTabChange(category) {
      this.current = category
    },
    // On filter by change.
    searchProduct(value) {
      this.search =  value
      this.loadPage()
    },
    handleBuyClick() {},
    handleSellClick() {},
    loadPage() {
      this.$axios
        .get('/products', {
          // .get('/stock-exchange', {
          params: {
            type: this.type,
            page: this.currentPage,
            take: this.perPage,
            search: this.search,
          },
        })
        .then((response) => {
          if (response.data) {
            console.log(response.data)
            this.products = response.data.data
            // this.totalRows = response.data.total
          }
        })
        .catch((error) => {
          this.$toasted.error(error.message)
        })
    },
  },
}
</script>
