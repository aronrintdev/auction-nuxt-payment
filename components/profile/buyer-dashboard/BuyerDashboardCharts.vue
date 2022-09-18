<template>
  <section class="row mt-5 mb-4">
    <div class="col-md-8 mb-2 mb-md-0">
      <div class="bg-white br-10 p-4 shadow-sm">
        <div class="d-flex align-items-center justify-content-between">
          <h1 class="fs-20 fw-7 font-primary mb-0">
            {{ $t('buyer_dashboard.dashobard_buyer.total_purchases_main') }}
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
    <!-- TODO -->
    <div class="col-md-4">
      <div class="bg-white br-10 p-4 shadow-sm h-100">
        <div class="d-flex align-items-center justify-content-between">
          <h1 class="fs-20 fw-7 font-primary mb-0">
            {{ $t('buyer_dashboard.dashobard_buyer.rewards') }}
          </h1>
          <div>
            <a
              href="#"
              class="font-secondary fs-16 fw-400 border-bottom border-primary mb-0"
              >{{ $t('buyer_dashboard.dashobard_buyer.view_rewards') }}</a
            >
          </div>
        </div>
        <div class="my-4 text-center progressbar_wrapper mx-auto">
          <RadialChart />
          <!-- TODO -->
          <h6 class="fs-12 mb-0 fw-7 font-primary mt-3">
            {{ $t('buyer_dashboard.dashobard_buyer.your_next_reward') }}: $50
          </h6>
          <b-button
            class="mt-3 bg-blue-primary py-2 w-100 font-primary fw-5"
            pill
            >{{ $t('buyer_dashboard.dashobard_buyer.earn_money') }}</b-button
          >
          <h6 class="fs-12 mb-0 fw-4 font-primary mt-3 text-dark">
            *250
            {{ $t('buyer_dashboard.dashobard_buyer.points_will_expire_on') }}
            10/20/2022
          </h6>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import RadialChart from './RadialChart'
import { CustomSelect } from '~/components/common'
import { DEFAULT } from '~/static/constants'
export default {
  name: 'BuyerDashboardCharts',
  components: { CustomSelect, RadialChart },
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
<style lang="sass" scoped>
.line-chart
  #vendor-dashboard-line-chart
    height: 280px
.progressbar_wrapper
  width: 240px
</style>
