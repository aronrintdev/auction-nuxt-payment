<template>
  <section class="row mb-4">
    <div class="col-md-8">
      <div
        :class="{
          mobile: isScreenXS,
          'mr-59': !isScreenXS,
        }"
        class="chart-card bg-white br-10 p-1 p-sm-4"
      >
        <div
          :class="{
            'm-padding-title': isScreenXS,
          }"
          class="d-flex align-items-center justify-content-between"
        >
          <h1 class="fs-20 fw-7 font-primary mb-0 d-none d-sm-block">
            {{ $tc('vendor_dashboard.total_sales', 1) }}
          </h1>
          <h1
            class="fs-14 fw-7 font-primary text-grey-69 mb-0 d-block d-sm-none"
          >
            {{ $tc('vendor_dashboard.total_sales', 2) }}
          </h1>
          <nuxt-link
            v-if="isScreenXS"
            class="font-primary fs-16 fw-400 text-decoration-underline text-link-blue-mobile mb-0 view-more-link text-nowrap"
            to="/profile/vendor-dashboard/breakdown/categories"
            >{{ $t('vendor_dashboard.view_breakdown') }}</nuxt-link
          >
          <div class="dropdownSelect d-none d-sm-block">
            <CustomSelect
              :default="filterBy"
              :options="chartFilterOptions"
              :threelineIcon="false"
              :title="filterByTitle"
              class="dropdown-filter"
              @input="handleFilterByChangeTotalSale"
            />
          </div>
        </div>
        <div class="tabs d-sm-none d-flex gap-2 justify-content-center my-4">
          <h6
            v-for="(tab, index) in tabsOptions"
            :key="index"
            :class="{ activeOne: activeTab === tab.value }"
            class="fs-10 fw-7 font-primary mb-0 cursor-pointer position-relative text-uppercase"
            @click="changeTab(tab.value)"
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
        </div>
        <div class="text-right d-none d-sm-block">
          <nuxt-link
            class="font-secondary fs-16 fw-400 text-decoration-underline text-link-blue-mobile mb-0"
            to="/profile/vendor-dashboard/breakdown/categories"
            >{{ $t('vendor_dashboard.view_breakdown') }}</nuxt-link
          >
        </div>
      </div>
    </div>
    <div class="col-md-4 mt-3 mt-sm-0">
      <div
        :class="mobileClass"
        class="chart-card bg-white br-10 p-1 p-sm-4 diagram"
      >
        <div
          :class="{
            'm-padding-title': isScreenXS,
          }"
          class="d-flex align-items-center justify-content-between"
        >
          <h1 class="fs-20 fw-7 font-primary mb-0 d-none d-sm-block">
            {{ $tc('vendor_dashboard.by_type', 1) }}
          </h1>
          <h1
            class="fs-14 fw-7 font-primary text-grey-69 mb-0 d-block d-sm-none"
          >
            {{ $tc('vendor_dashboard.by_type', 1) }}
          </h1>
          <nuxt-link
            v-if="isScreenXS"
            class="font-primary fs-16 fw-400 text-decoration-underline text-link-blue-mobile mb-0 view-more-link text-nowrap"
            to="/profile/vendor-dashboard/breakdown/categories"
            >{{ $t('vendor_dashboard.view_breakdown') }}</nuxt-link
          >
          <div class="dropdownSelect d-none d-sm-block">
            <CustomSelect
              :default="filterBy"
              :options="chartFilterOptions"
              :threelineIcon="false"
              :title="filterByTitle"
              class="dropdown-filter"
              @input="handleFilterByChangeTotalSaleChart"
            />
          </div>
        </div>
        <div class="tabs d-sm-none d-flex gap-2 justify-content-center my-4">
          <h6
            v-for="(tab, index) in tabsOptions"
            :key="index"
            :class="{ activeOne: activeTabDoughnut === tab.value }"
            class="fs-10 fw-7 font-primary mb-0 cursor-pointer position-relative text-uppercase"
            @click="changeTabDoughnut(tab.value)"
          >
            {{ tab.title }}
          </h6>
        </div>
        <div class="positoin-relative mt-5 mb-4">
          <DoughnutChart
            ref="donChart1"
            :bg-colors="dataBgColors"
            :data="dataChart"
            :height="170"
            :labels="chartLabels"
            :options="chartOptions"
            chart-id="vendor-dashboard-doughnut-chart"
            class="doughnut-chart d-none d-sm-block"
          />
          <DoughnutChart
            ref="donChart2"
            :bg-colors="dataBgColors"
            :data="dataChart"
            :height="170"
            :labels="chartLabels"
            :options="chartOptions"
            chart-id="vendor-dashboard-doughnut-chart"
            class="doughnut-chart d-block d-sm-none"
          />
        </div>
        <div class="text-right d-none d-sm-block">
          <nuxt-link
            class="font-secondary fs-16 fw-400 text-decoration-underline text-link-blue-mobile mb-0 view-more-link"
            to="/profile/vendor-dashboard/breakdown/categories"
            >{{ $t('vendor_dashboard.view_breakdown') }}</nuxt-link
          >
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { CustomSelect } from '~/components/common'
import {
  DEFAULT,
  FILTERED_CATEGORIES,
  FOOTWEAR_CATEGORIES,
  GRAPH_COLORS,
} from '~/static/constants'
import screenSize from '~/plugins/mixins/screenSize'

export default {
  name: 'VendorDashboardCharts',
  components: { CustomSelect },
  mixins: [screenSize],
  data() {
    return {
      // TODO Dummy Data
      filterByTitle: this.$t('selling_page.status'),
      filterBy: 'month',
      activeTab: 'month',
      activeTabDoughnut: 'week',
      tabsOptions: [
        { title: 'Week', value: 'week' },
        { title: 'Month', value: 'month' },
        { title: 'Year', value: 'year' },
      ],
      searchFilters: {
        startDate: '',
        endDate: '',
        keyWord: '',
        sortBy: '',
        filterBy: '',
        perPage: 8,
        page: 1,
      },
      dataChart: [0, 0, 0],
      chartLabels: [
        this.$t('vendor_dashboard.footwear'),
        this.$t('vendor_dashboard.apparel'),
        this.$t('vendor_dashboard.accessories'),
      ],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        cutoutPercentage: 60,
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            padding: 20,
            usePointStyle: true,
            pointStyle: 'circle',
            fontFamily: 'Montserrat',
            fontColor: '#000',
            fontSize: 10,
            lineHeight: 12,
            fontWeight: 500,
          },
        },
        tooltips: {
          callbacks: {
            title(tooltipItem, data) {
              return data.labels[tooltipItem[0].index]
            },
            label: (tooltipItem, data) => {
              const dataset = data.datasets[0]
              return (
                Math.round(
                  (dataset.data[tooltipItem.index] /
                    Object.values(dataset._meta)[0].total) *
                    100
                ) +
                '% ' +
                this.$options.filters.toCurrency(
                  parseInt(dataset.data[tooltipItem.index])
                )
              )
            },
            afterLabel(tooltipItem, data) {
              return ''
            },
          },
          backgroundColor: '#FAFAFA',
          titleFont: {
            weight: 500,
            family: 'Montserrat',
            size: 12,
            lineHeight: 15,
          },
          cornerRadius: 9,
          bodyFont: {
            weight: 700,
            family: 'Montserrat',
            size: 14,
            lineHeight: 17,
          },
          titleFontColor: '#626262',
          bodyFontColor: '#4B942D',
          displayColors: false,
          padding: 8,
        },
      },
      chartData: {
        labels: this.chartLabels,
        datasets: [
          {
            data: this.dataChart,
          },
        ],
      },
      // line chart data
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
      dataGraph: [],
      dataBgColors: Object.values(GRAPH_COLORS),
      labels: [],
      chartFilterOptions: {
        week: 'Week to Date',
        month: 'Month to Date',
        year: 'Year to Date',
      },
    }
  },
  computed: {
    mainChart() {
      return {
        labels: this.labels,
        datasets: [
          {
            borderColor: this.isScreenXS ? '#667799' : '#18A0FB',
            backgroundColor: 'rgba(24, 160, 251, 0.15)',
            data: this.dataGraph,
            fill: !this.isScreenXS,
            borderWidth: this.isScreenXS ? 2 : 4,
          },
        ],
      }
    },
    isDataEmpty() {
      return this.dataGraph.every((item) => !item)
    },
  },
  created() {
    // eslint-disable-next-line no-undef
    Chart.plugins.register({
      afterDraw(chart) {
        if (chart.data.datasets[0].data.every((item) => item === 0)) {
          const ctx = chart.chart.ctx
          const width = chart.chart.width
          const height = chart.chart.height
          ctx.clearRect(width * 0.25, height * 0.25, width * 0.75, height * 0.6)
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
    this.handleFilterByChangeTotalSale('month')
    this.handleFilterByChangeTotalSaleChart('month')
  },
  methods: {
    handleFilterByChangeTotalSale(value) {
      this.$axios
        .get('/dashboard/vendor/sales-graph?group_by=' + value)
        .then((res) => {
          const labels = []
          const dataSet = []
          for (const property in res.data.data) {
            labels.push(property)
            dataSet.push(res.data.data[property])
          }
          this.dataGraph = dataSet
          this.labels = labels
        })
        .catch((err) => {
          this.logger.logToServer(err.response)
        })
    },
    changeTab(tab) {
      this.activeTab = tab
      this.handleFilterByChangeTotalSale(tab)
    },
    changeTabDoughnut(tab) {
      this.activeTabDoughnut = tab
      this.handleFilterByChangeTotalSaleChart(tab)
    },
    handleFilterByChangeTotalSaleChart(value) {
      this.$axios
        .get('/dashboard/vendor/sales-chart?group_by=' + value)
        .then((res) => {
          const data = [0, 0, 0]
          // LIMIT categories to 'apparel', 'accessories' and 'footwear' as grouped 'sneakers', 'shoes'
          for (const property in res.data.data) {
            if (FILTERED_CATEGORIES.includes(property)) {
              data[FILTERED_CATEGORIES.indexOf(property) + 1] +=
                res.data.data[property]
            }
            if (FOOTWEAR_CATEGORIES.includes(property)) {
              data[0] += res.data.data[property]
            }
          }
          this.dataChart = data
        })
        .catch((err) => {
          this.logger.logToServer(err.response)
        })
      this.searchFilters.filterBy = value === DEFAULT ? '' : value
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.m-padding-title
  padding: 12px 14px 0 14px


.mr-59
  margin-right: 59px

.chart-card
  &.mobile
    box-shadow: 0px 1px 4px rgba($color-black-1, 0.25)
    border-radius: 8px

.doughnut-chart
  #vendor-dashboard-doughnut-chart
    height: 170px

.line-chart
  #vendor-dashboard-line-chart
    height: 280px
    @media (max-width: 576px)
      height: 204px

.dropdownSelect
  width: 180px

.view-more-link
  color: $color-blue-30

.dropdown-filter::v-deep
  background-color: $color-white-4
  border-radius: 8px
  border: none !important
  width: 200px

  .selected
    @include body-13-medium
    color: $color-black-1
    background-color: $color-white-4 !important
    font-family: $font-family-sf-pro-display
    border: none !important
    padding-inline: 18px

    label
      display: none

  .items
    @include body-13-regular
    color: $color-black-1
    font-family: $font-family-sf-pro-display


.text-grey-69
  color: $color-gray-69

.tabs
  h6
    color: $color-gray-47
    transition: 0.1s all ease-in

    &:hover
      color: $color-black-1

    &.activeOne
      color: $color-black-1

      &::after
        content: ''
        position: absolute
        left: 50%
        bottom: -5px
        translate: -50% 50%
        background: $color-black-1
        height: 4px
        width: 4px
        border-radius: 50%

@media (max-width: 576px)
  .view-more-link
    font-size: 10px
    font-weight: $medium
</style>
