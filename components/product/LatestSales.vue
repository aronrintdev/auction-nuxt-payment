<template>
  <div class="child-container">
    <h2 :class="headerClass" class="m-0">{{ $t('products.latest_sales') }}</h2>
    <div :style="labelsStyle" class="text-right period-block">
      <Button
        variant="link"
        :class="{ active: currentFormat === 'day' }"
        :style="labelStyle"
        @click="setFormat('day')"
        >{{ $tc('common.day', 1) }}</Button
      >
      <Button
        variant="link"
        :class="{ active: currentFormat === 'month' }"
        :style="labelStyle"
        @click="setFormat('month')"
        >{{ $t('common.month') }}</Button
      >
      <Button
        variant="link"
        :class="{ active: currentFormat === 'quarter' }"
        :style="labelStyle"
        @click="setFormat('quarter')"
        >{{ $t('common.quarter') }}</Button
      >
      <Button
        variant="link"
        :class="{ active: currentFormat === 'year' }"
        :style="labelStyle"
        @click="setFormat('year')"
        >{{ $t('common.year') }}</Button
      >
      <Button
        variant="link"
        :class="{ active: currentFormat === 'all' }"
        :style="labelStyle"
        @click="setFormat('all')"
        >{{ $t('common.all') }}</Button
      >
    </div>
    <div v-if="latestPrice" class="d-flex align-items-center current-trend">
      {{ latestPrice | toCurrency }}
      <img
        :src="
          require(`~/assets/img/icons/product/trend-${
            latestPrice >= currentTrend ? 'up' : 'down'
          }.svg`)
        "
      />
    </div>
    <div class="position-relative sales-chart">
      <client-only>
        <LineChart
          ref="chart"
          :chart-data="chartData"
          :options="chartOptions"
        ></LineChart>
      </client-only>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import Button from '~/components/common/Button'

export default {
  name: 'ProductLatestSales',

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
    headerClass: {
      type: String,
      default: ''
    },
    labelsStyle: {
      type: Object,
      default: () => {}
    },
    labelStyle: {
      type: Object,
      default: () => {}
    }
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
            this.$refs.chart.redraw()
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

.responsive-chart
  margin-left: auto
  margin-right: auto
  padding-left: 10px !important
  padding-right: 10px !important
  @media (min-width: 993px)
    width: 85%
    margin-left: 10px !important
    margin-right: 10px !important
    
.responsive-header
  color: #000 !important
  font-size: 14px !important
  font-weight: 600 !important
  @media (min-width: 576px)
    font-family: $font-family-sf-pro-display !important
    font-weight: 700 !important
    font-size: 20px !important


.child-container
  margin-top: 18px
  padding: 0 56px

  h2
    @include heading-4
    color: $color-black-5
    font-family: 'Baloo 2', cursive

  .period-block
    margin-top: 40px

    .btn
      @include body-8-medium
      color: $color-black-1
      margin: 0 40px

      &.active
        color: #000 !important
        text-decoration: underline

  .current-trend
    @include body-2-regular
    color: $color-black-1
    margin-left: 70px

    img
      margin-left: 20px

  .sales-chart
    width: 100%

    >div
      height: 380px

@media (max-width: 576px)
  .child-container
    padding: 0

    .period-block
      display: flex
      flex-direction: column
      align-items: flex-end
      margin: 20px 0

      > button.btn
        margin: 5px 0

    .current-trend
      margin-left: 0
</style>
