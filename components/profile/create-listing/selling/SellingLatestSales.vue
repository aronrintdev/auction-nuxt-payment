<template>
  <div class="row product-details-chart mt-3">
    <div class="col-12 product-details-chart-block">
      <div class="chart-latest-sales p-3">
        <div class="chart-heading">
          {{ $t('product_page.latest_sales') }}
        </div>
        <div
          class="text-right period-block d-flex justify-content-between mt-3"
        >
          <span v-if="latestPrice" class="increase-amount">
            {{ latestPrice | toCurrency }}
            <img
              :src="
                require(`~/assets/img/icons/product/trend-${
                  latestPrice >= currentTrend ? 'up' : 'down'
                }.svg`)
              "
            />
          </span>
          <span
            :class="{ active: currentFormat === 'day' }"
            @click="setFormat('day')"
            >{{ $tc('common.day', 1) }}</span
          >

          <span
            :class="{ active: currentFormat === 'week' }"
            @click="setFormat('week')"
            >{{ $t('common.week') }}</span
          >
          
          <span
            :class="{ active: currentFormat === 'month' }"
            @click="setFormat('month')"
            >{{ $t('common.month') }}</span
          >
          <span
            :class="{ active: currentFormat === 'quarter' }"
            @click="setFormat('quarter')"
            >{{ $t('common.quarter') }}</span
          >
          <span
            :class="{ active: currentFormat === 'year' }"
            @click="setFormat('year')"
            >{{ $t('common.year') }}</span
          >
        </div>
        <client-only>
          <LineChart
            id="line-chart"
            ref="chart"
            :chart-data="chartData"
            :options="chartOptions"
          ></LineChart>
        </client-only>
        <div class="row position-absolute fixed-bottom p-3 w-100">
          <div class="col text-center">
            <Button variant="chart">
              {{ $t('products.asks') }}
            </Button>
          </div>
          <div class="col text-center">
            <Button variant="chart">
              {{ $t('products.offers') }}
            </Button>
          </div>
          <div class="col text-center">
            <Button variant="chart">
              {{ $t('products.sales') }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { Button } from '~/components/common'
export default {
  name: 'SellingLatestSales',

  components: {
    Button,
  },

  props: {
    value: {
      type: Object,
      default: null,
    },

    sku: {
      type: String,
      default: null,
    },
  },

  data() {
    const screenWidth = window.innerWidth
    const hideLabel = screenWidth < 576

    return {
      currentFormat: 'day',
      data: null,
      chartData: {
        labels: [],
        datasets: [
          {
            label: this.$t('products.price_sold'),
            borderColor: '#32BD40',
            backgroundColor: null,
            data: [],
            fill: false,
            pointStyle: 'line',
          },
          {
            label: this.$t('products.price_trend'),
            borderColor: '#626262',
            backgroundColor: null,
            data: [],
            fill: false,
            pointStyle: 'dash',
            borderDash: [10, 5],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        spanGaps: true,
        scales: {
          xAxes: [
            {
              type: 'time',
              offset: true,
              time: {
                unit: 'hour',
              },
              gridLines: {
                display: true,
                color: '#000000',
                tickMarkLength: 0,
                zeroLineColor: '#ffffff',
                drawBorder: false,
                offsetGridLines: false,
              },
              ticks: {
                padding: 7,
                fontFamily: 'Montserrat',
                fontSize: 8,
                lineHeight: 1.2,
                fontColor: '#626262',
                autoSkip: true,
                maxTicksLimit: 3,
                maxRotation: 0,
              },
              scaleLabel: {
                display: !hideLabel,
                labelString: this.$t('common.price'),
                fontSize: 20,
                fontFamily: 'Montserrat',
                fontColor: '#6F6F6F',
                lineHeight: 1.2,
                padding: 23,
              },
            },
          ],
          yAxes: [
            {
              offset: true,
              gridLines: {
                display: true,
                color: '#000000',
                zeroLineColor: '#000000',
                drawBorder: false,
                tickMarkLength: 0,
              },
              ticks: {
                maxTicksLimit: 3,
                padding: hideLabel ? 10 : 50,
                fontFamily: 'Montserrat',
                fontSize: 8,
                lineHeight: 1.2,
                fontColor: '#626262',
                callback(value) {
                  return '$' + value
                },
              },
              scaleLabel: {
                display: !hideLabel,
                labelString: this.$t('common.date'),
                fontSize: 20,
                fontFamily: 'Montserrat',
                fontColor: '#6F6F6F',
                lineHeight: 1.2,
                padding: 23,
              },
            },
          ],
        },
        legend: {
          position: 'bottom',
          align: 'end',
          display: true,
          labels: {
            usePointStyle: true,
            fontSize: 12,
            fontFamily: 'Montserrat',
            fontColor: '#6F6F6F',
            lineHeight: 1.2,
            padding: 30,
          },
        },
        onResize: (chart, size) => {
          const showLabel = !(size.width < 380)
          chart.options.scales.xAxes[0].scaleLabel.display = showLabel
          chart.options.scales.yAxes[0].scaleLabel.display = showLabel
          chart.options.scales.yAxes[0].ticks.padding = 10
        },
      },
    }
  },

  computed: {
    latestPrice() {
      let arr = this.data?.current
      if (arr && arr.length) {
        arr = arr.sort((i, j) => new Date(i.date) - new Date(j.date))
        return parseInt(arr[arr.length - 1].sale_price)
      } else {
        return null
      }
    },

    currentTrend() {
      let arr = this.data?.trend
      if (arr && arr.length) {
        arr = arr.sort((i, j) => new Date(i.date) - new Date(j.date))
        return parseInt(arr[arr.length - 1].sale_price)
      } else {
        return null
      }
    },
  },

  created() {
    if (this.value) {
      this.setChartData(this.value)
      this.data = this.value
    }
  },

  methods: {
    setFormat(value) {
      if (this.currentFormat !== value) {
        this.currentFormat = value
        this.$axios
          .get(`/products/${this.sku}/sales`, {
            params: { period: value, trend: 1 },
          })
          .then((res) => {
            this.data = res.data
            this.setChartData(res.data)
            this.chartOptions.scales.xAxes[0].time.unit =
              value === 'day' ? 'hour' : 'day'
            // TODO: Disabled temporarily
            // this.$refs.chart.redraw() 
            this.$emit('latestPrice',{amount: this.latestPrice ,type: this.latestPrice >= this.currentTrend ? 'up' : 'down' })
          })
      }
    },

    setChartData(data) {
      this.chartData.labels = _.uniq(
        data.current
          ?.map((i) => i.date)
          ?.concat(data.trend?.map((i) => i.date))
          ?.sort()
      )
      this.chartData.datasets[0].data = this.chartData.labels.map(
        (i) => data.current?.find((j) => j.date === i)?.sale_price / 100
      )
      this.chartData.datasets[1].data = this.chartData.labels.map(
        (i) => data.trend?.find((j) => j.date === i)?.sale_price / 100
      )
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.product-details-chart-block
  .chart-latest-sales
    height: 372px
    background: $color-gray-90
    box-shadow: 0px 1px 2px $color-gray-th-43
    border-radius: 8px
  .chart-heading
    font-family: $font-montserrat
    font-style: normal
    @include  body-5-medium
    color: $color-black-1
  .period-block
    font-family: $font-sp-pro
    font-style: normal
    @include body-21-normal
    color: $color-gray-47
  #line-chart::v-deep
    #line-chart
      margin: auto
      height: 235px !important
      left: 44.5px !important
      top: 1125.91px !important
  .btn-chart
    background: $color-white-1
    border: 1px solid $light-gray-2
    box-shadow: 0px 1px 2px $color-gray-91
    border-radius: 4px
</style>