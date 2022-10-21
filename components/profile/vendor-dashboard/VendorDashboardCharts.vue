<template>
  <section class="row mb-4">
    <div class="col-md-8">
      <div class="bg-white br-10 p-1 p-sm-4 shadow-sm">
        <div class="d-flex align-items-center justify-content-between">
          <h1 class="fs-20 fw-7 font-primary mb-0 d-none d-sm-block">
            {{ $tc('vendor_dashboard.total_sales', 1) }}
          </h1>
          <h1
            class="fs-14 fw-7 font-primary text-grey-69 mb-0 d-block d-sm-none text-center w-100"
          >
            {{ $tc('vendor_dashboard.total_sales', 2) }}
          </h1>
          <div class="dropdownSelect d-none d-sm-block">
            <CustomSelect
              bordered
              :default="filterBy"
              :threelineIcon="false"
              :options="chartFilterOptions"
              :title="filterByTitle"
              @input="handleFilterByChangeTotalSale"
            />
          </div>
        </div>
        <div class="tabs d-sm-none d-flex gap-2 justify-content-center my-4">
          <h6
            v-for="(tab, index) in tabsOptions"
            :key="index"
            class="fs-10 fw-7 font-primary mb-0 cursor-pointer position-relative text-uppercase"
            :class="{ activeOne: activeTab === tab.value }"
            @click="changeTab(tab.value)"
          >
            {{ tab.title }}
          </h6>
        </div>
        <div class="position-relative mt-3 mt-sm-5 mb-3 mb-sm-4">
          <LineChart
            :data="dataGraph"
            :labels="labels"
            :options="lineChartOptions"
            class="line-chart d-none d-sm-block"
            chart-id="vendor-dashboard-line-chart"
          />
          <LineChart
            :chart-data="lineDatasets"
            :options="lineChartOptions"
            class="line-chart d-block d-sm-none"
            :height="204"
            chart-id="vendor-dashboard-line-chart"
          />
        </div>
        <div class="text-right d-none d-sm-block">
          <a
            href="#"
            class="font-secondary fs-16 fw-400 border-bottom border-primary mb-0 view-more-link"
            >{{ $t('vendor_dashboard.view_breakdown') }}</a
          >
        </div>
      </div>
      <div class="text-right d-block d-sm-none mt-2">
        <a
          href="#"
          class="font-primary fs-16 fw-400 border-bottom border-primary mb-0 view-more-link"
          >{{ $t('vendor_dashboard.view_breakdown') }}</a
        >
      </div>
    </div>
    <div class="col-md-4 mt-3 mt-sm-0">
      <div class="bg-white br-10 p-1 p-sm-4 shadow-sm">
        <div class="d-flex align-items-center justify-content-between">
          <h1 class="fs-20 fw-7 font-primary mb-0 d-none d-sm-block">
            {{ $tc('vendor_dashboard.by_type', 1) }}
          </h1>
          <h1
            class="fs-14 fw-7 font-primary text-grey-69 mb-0 d-block d-sm-none text-center w-100"
          >
            {{ $tc('vendor_dashboard.by_type', 2) }}
          </h1>
          <div class="dropdownSelect d-none d-sm-block">
            <CustomSelect
              bordered
              :default="filterBy"
              :threelineIcon="false"
              :options="chartFilterOptions"
              :title="filterByTitle"
              @input="handleFilterByChangeTotalSaleChart"
            />
          </div>
        </div>
        <div class="tabs d-sm-none d-flex gap-2 justify-content-center my-4">
          <h6
            v-for="(tab, index) in tabsOptions"
            :key="index"
            class="fs-10 fw-7 font-primary mb-0 cursor-pointer position-relative text-uppercase"
            :class="{ activeOne: activeTab === tab.value }"
            @click="changeTab(tab.value)"
          >
            {{ tab.title }}
          </h6>
        </div>
        <div class="positoin-relative mt-5 mb-4">
          <DoughnutChart
            :data="dataChart"
            :labels="chartLabels"
            :options="chartOptions"
            class="doughnut-chart d-none d-sm-block"
            chart-id="vendor-dashboard-doughnut-chart"
          />
          <DoughnutChart
            :chart-data="dataChart"
            :labels="chartLabels"
            :options="chartOptions"
            class="doughnut-chart d-block d-sm-none"
            :height="204"
            :bgColors="dataBgColors"
            chart-id="vendor-dashboard-doughnut-chart"
          />
        </div>
        <div class="text-right d-none d-sm-block">
          <a
            href="#"
            class="font-secondary fs-16 fw-400 border-bottom border-primary mb-0 view-more-link"
            >{{ $t('vendor_dashboard.view_breakdown') }}</a
          >
        </div>
      </div>
      <div class="text-right mt-2 d-block d-sm-none">
        <a
          href="#"
          class="font-primary fs-16 fw-400 border-bottom border-primary mb-0 view-more-link"
          >{{ $t('vendor_dashboard.view_breakdown') }}</a
        >
      </div>
    </div>
  </section>
</template>
<script>
import { CustomSelect } from '~/components/common'
import { DEFAULT } from '~/static/constants'
export default {
  name: 'VendorDashboardCharts',
  components: { CustomSelect },
  data() {
    return {
      // TODO Dummy Data
      filterByTitle: this.$t('selling_page.status'),
      filterBy: '',
      activeTab: '24h',
      tabsOptions: [
        { title: '24H', value: '24h' },
        { title: '7D', value: '7d' },
        { title: '30D', value: '30m' },
        { title: '6M', value: '6m' },
        { title: '1Y', value: '1y' },
        { title: 'All', value: 'all' },
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
      dataChart: [],
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
            fontSize: 12,
          },
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
      dataBgColors: [],
      labels: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Friday',
        'Saturday',
      ],
      lineDatasets: {
        labels: this.labels,
        datasets: [
          {
            borderColor: '#18A0FB',
            backgroundColor: 'rgba(24, 160, 251, 0.15)',
            data: this.dataGraph,
            fill: true,
            borderWidth: 4,
          },
        ],
      },
      chartFilterOptions: {
        week: 'Week',
        month: 'Month',
        year: 'Year',
      },
    }
  },
  mounted() {
    this.handleFilterByChangeTotalSale('week')
    this.handleFilterByChangeTotalSaleChart('week')
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
    },
    random_bg_color() {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16)
      return '#' + randomColor
    },
    handleFilterByChangeTotalSaleChart(value) {
      this.$axios
        .get('/dashboard/vendor/sales-chart?group_by=' + value)
        .then((res) => {
          const labels = []
          const dataSet = []
          const bgColors = []
          for (const property in res.data.data) {
            labels.push(property)
            dataSet.push(res.data.data[property])
            bgColors.push(this.random_bg_color())
          }
          this.dataChart = dataSet
          this.chartLabels = labels
          this.dataBgColors = bgColors
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
.doughnut-chart
  #vendor-dashboard-doughnut-chart
    height: 280px
.line-chart
  #vendor-dashboard-line-chart
    height: 280px
    @media (max-width: 576px)
      height: 204px
.dropdownSelect
  width: 180px
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
