<template>
  <section class="row mt-5 mb-4">
    <div class="col-md-8">
      <div class="bg-white br-10 p-4 shadow-sm">
        <div class="d-flex align-items-center justify-content-between">
          <h1 class="fs-20 fw-7 font-primary mb-0">
            {{ $t('vendor_dashboard.total_sales') }}
          </h1>
          <div class="dropdownSelect">
            <CustomSelect
              bordered
              :default="filterBy"
              :threelineIcon="false"
              :options="{
                default: $t('vendor_dashboard.week_to_date'),
              }"
              :title="filterByTitle"
              @input="handleFilterByChange"
            />
          </div>
        </div>
        <div class="positoin-relative mt-5 mb-4">
          <LineChart
            :chart-data="lineDatasets"
            :options="lineChartOptions"
            class="line-chart"
            chart-id="vendor-dashboard-line-chart"
          />
        </div>
        <div class="text-right">
          <a
            href="#"
            class="font-secondary fs-16 fw-400 border-bottom border-primary mb-0"
            >{{ $t('vendor_dashboard.view_breakdown') }}</a
          >
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="bg-white br-10 p-4 shadow-sm">
        <div class="d-flex align-items-center justify-content-between">
          <h1 class="fs-20 fw-7 font-primary mb-0">
            {{ $t('vendor_dashboard.by_type') }}
          </h1>
          <div class="dropdownSelect">
            <CustomSelect
              bordered
              :default="filterBy"
              :threelineIcon="false"
              :options="{
                default: $t('vendor_dashboard.week_to_date'),
              }"
              :title="filterByTitle"
              @input="handleFilterByChange"
            />
          </div>
        </div>
        <div class="positoin-relative mt-5 mb-4">
          <DoughnutChart
            :chart-data="chartData"
            :options="chartOptions"
            class="doughnut-chart"
            chart-id="vendor-dashboard-doughnut-chart"
          />
        </div>
        <div class="text-right">
          <a
            href="#"
            class="font-secondary fs-16 fw-400 border-bottom border-primary mb-0"
            >{{ $t('vendor_dashboard.view_breakdown') }}</a
          >
        </div>
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
      searchFilters: {
        startDate: '',
        endDate: '',
        keyWord: '',
        sortBy: '',
        filterBy: '',
        perPage: 8,
        page: 1,
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        cutoutPercentage: 60,
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            padding: 40,
            usePointStyle: true,
            pointStyle: 'circle',
            fontFamily: 'Montserrat',
            fontColor: '#000',
            fontSize: 12,
          },
        },
      },
      chartData: {
        labels: [
          this.$t('vendor_dashboard.footwear'),
          this.$t('vendor_dashboard.apparel'),
          this.$t('vendor_dashboard.accessories'),
        ],
        datasets: [
          {
            backgroundColor: ['#667799', '#CE745F', '#7196B1'],
            data: [60, 30, 10],
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
      lineDatasets: {
        labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Fri', 'Sat'],
        datasets: [
          {
            borderColor: '#18A0FB',
            backgroundColor: 'rgba(24, 160, 251, 0.15)',
            data: [0, 90, 80, 5, 47, 50, 40],
            fill: true,
            borderWidth: 4,
          },
        ],
      },
    }
  },
  methods: {
    handleFilterByChange(value) {
      this.searchFilters.filterBy = value === DEFAULT ? '' : value
    },
  },
}
</script>
<style lang="sass">
.doughnut-chart
  #vendor-dashboard-doughnut-chart
    height: 280px
.line-chart
  #vendor-dashboard-line-chart
    height: 280px
.dropdownSelect
  width: 180px
</style>
