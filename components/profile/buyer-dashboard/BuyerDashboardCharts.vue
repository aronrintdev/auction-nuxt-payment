<template>
  <section class="row mt-sm-5 mb-4">
    <div class="col-md-8 mb-2 mb-md-0">
      <div class="bg-white br-10 px-2 pt-4 p-sm-4 shadow-sm">
        <div class="d-flex align-items-center justify-content-between">
          <h1 class="fs-20 fw-7 font-primary mb-0 d-none d-sm-block">
            {{ $t('buyer_dashboard.dashobard_buyer.total_purchases_main') }}
          </h1>
          <h1
            class="fs-14 fw-7 font-primary text-grey-69 mb-0 d-block d-sm-none text-center w-100"
          >
            {{ $t('buyer_dashboard.dashobard_buyer.total_purchases_main') }}
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
        <div class="position-relative mt-3 mt-sm-5 mb-3 mb-sm-4">
          <LineChart
            :data="dataChart"
            :labels='labels'
            :options="lineChartOptions"
            :height="260"
            class="line-chart d-none d-sm-block"
            chart-id="vendor-dashboard-line-chart"
          />
          <LineChart
            :data="dataChart"
            :labels='labels'
            :options="lineChartOptions"
            class="line-chart d-block d-sm-none"
            :height="204"
            chart-id="vendor-dashboard-line-chart"
          />
        </div>
        <div class="text-right d-none d-sm-block">
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
      <div class="bg-white br-10 px-2 py-3 p-sm-4 shadow-sm h-100">
        <div class="d-flex align-items-center justify-content-between">
          <h1 class="fs-20 fw-7 font-primary mb-0 rewards-title">
            {{ $t('buyer_dashboard.dashobard_buyer.rewards') }}
          </h1>
          <div>
            <nuxt-link
              to='/profile/rewards'
              class="font-secondary fs-16 fw-400 border-bottom border-primary mb-0 d-none d-sm-inline"
              >{{ $t('buyer_dashboard.dashobard_buyer.view_rewards') }}</nuxt-link>
          </div>
        </div>
        <div class="mt-3 mb-0 my-sm-4 text-center progressbar_wrapper mx-auto">
          <RadialChart />
          <!-- TODO -->
          <h6 v-if='rewards.next_reward' class="fs-12 mb-0 fw-7 font-primary mt-3">
            {{ $t('buyer_dashboard.dashobard_buyer.your_next_reward') }}: {{rewards.next_reward.name}}
          </h6>
          <b-button
            class="mt-3 bg-blue-primary py-2 w-100 font-primary fw-5 d-none d-sm-inline-block"
            pill
            >{{ $t('buyer_dashboard.dashobard_buyer.earn_money') }}</b-button
          >
          <b-button
            class="mt-3 px-4 py-2 font-primary fs-12 fw-6 border d-sm-none d-inline-block"
            variant="outline-secondary"
            pill
            >{{ $t('buyer_dashboard.dashobard_buyer.view_rewards') }}</b-button
          >
          <h6
            class="fs-12 mb-0 fw-4 font-primary mt-3 text-dark d-none d-sm-block"
          >
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
      rewards: '',
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
      dataChart: [],
      labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Friday', 'Saturday'],
      lineDatasets: {
        labels: this.labels,
        datasets: [
          {
            borderColor: '#18A0FB',
            backgroundColor: 'rgba(24, 160, 251, 0.15)',
            data : this.dataChart,
            fill: true,
            borderWidth: 4,
          },
        ],
      },
      chartFilterOptions: {
        week: 'Week',
        month: 'Month',
        year: 'Year',
      }
    }
  },
  mounted(){
    this.handleFilterByChangeTotalSale('week')
  },
  methods: {
    handleFilterByChangeTotalSale(value) {
      this.$axios
        .get('/dashboard/buyer/purchases-graph?group_by='+value)
        .then((res) => {
          const labels = []
          const dataSet = []
          for (const property in res.data.data) {
            labels.push(property)
            dataSet.push(res.data.data[property])
          }
          this.dataChart = dataSet
          this.labels = labels
        })
        .catch((err) => {
          this.logger.logToServer(err.response)
        })
    },
    handleFilterByChange(value) {
      this.searchFilters.filterBy = value === DEFAULT ? '' : value
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.line-chart
  #vendor-dashboard-line-chart
    height: 280px
.progressbar_wrapper
  width: 240px
@media (max-width: 576px)
  .view-more-link
    font-size: 10px
    font-weight: $medium
  .rewards-title
    font-size: 14px
    font-weight: $bold
    color: $color-gray-69
    text-align: center
    width: 100%
</style>