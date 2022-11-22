<template>
  <section class="d-flex  mt-sm-5 mb-4" :class="{
    'flex-column': isScreenXS
  }">
    <div :class="{
      'mobile': isScreenXS,
      'XL': isScreenXL,
    }" class="charts chart-line mb-2 mb-md-0">
      <div
          :class="{
          'pt-4': !isScreenXS,
        }"
          class="bg-white br-10 px-2 p-sm-4"
      >
        <div class="d-flex align-items-center justify-content-between">
          <h1 class="fs-20 fw-7 font-primary mb-0 d-none d-sm-block">
            {{ $t('buyer_dashboard.dashobard_buyer.total_purchases_main') }}
          </h1>
          <h1
              class="fs-14 fw-7 font-primary text-grey-69 mb-0 d-block d-sm-none w-100"
          >
            {{ $t('buyer_dashboard.dashobard_buyer.total_purchases_main') }}
          </h1>
          <div class="dropdownSelect d-none d-sm-block">
            <CustomSelect
                :default="filterBy"
                :options="chartFilterOptions"
                :threelineIcon="false"
                :title="filterByTitle"
                bordered
                class="dropdown-filter"
                @input="handleFilterByChangeTotalSale"
            />
          </div>
        </div>
        <div class="position-relative mt-3">
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
          <LineChart
              :chart-data="mainChart"
              :height="260"
              :options="lineChartOptions"
              chart-id="vendor-dashboard-line-chart"
              class="line-chart d-none d-sm-block"
              is-graph
          />
          <LineChart
              :chart-data="mainChart"
              :height="204"
              :options="lineChartOptions"
              chart-id="vendor-dashboard-line-chart"
              class="line-chart d-block d-sm-none"
              is-graph
          />
        </div>
      </div>
    </div>
    <!-- TODO -->
    <div :class="{
      'mobile': isScreenXS,
      'XL': isScreenXL,
    }" class="charts radial">
      <div
          :class="{
          'py-3': !isScreenXS,
          'pb-4 pt-1': isScreenXS,
        }"
          class="bg-white br-10 px-2 p-sm-4 h-100"
      >
        <div
            :class="{
            'mb-5': isScreenXS,
          }"
            class="d-flex align-items-center justify-content-between"
        >
          <h1 class="fs-20 fw-7 font-primary mb-0 rewards-title">
            {{ $t('buyer_dashboard.dashobard_buyer.rewards') }}
          </h1>
          <div>
            <nuxt-link
                :class="{
                'body-18-regular text-link-blue-mobile': isScreenXS,
                'text-link-blue': !isScreenXS,
              }"
                class="font-secondary fs-16 fw-400 text-decoration-underline text-nowrap rewards-link"
                to="/profile/rewards"
            >{{ $t('buyer_dashboard.dashobard_buyer.view_rewards') }}
            </nuxt-link>
          </div>
        </div>

        <div
            class="mt-3 mb-0 my-sm-4 text-center progressbar_wrapper mx-auto position-relative"
        >
          <RadialChart
              v-if="!isScreenXS"
              :progress="progress"
              :rewards="rewards"
          />
          <MobileRewardGauge
              v-else
              :current-points="rewardPoints"
              :height="'250px'"
              :show-next-expire="false"
          />
          <!-- TODO -->
          <div
              v-if="rewards.next_reward && !isScreenXS"
              class="fs-12 mb-0 fw-7 font-primary text-black mt-3"
          >
            {{ $t('buyer_dashboard.dashobard_buyer.your_next_reward') }}:
            {{ rewards.next_reward.name }}
          </div>
          <b-button
              class="mt-3 bg-blue-primary py-2 w-200 font-primary fw-5 d-none d-sm-inline-block"
              pill
              to="/shop"
          >{{ $t('buyer_dashboard.dashobard_buyer.earn_money') }}
          </b-button>

          <div
              v-if="last.length"
              class="body-9-regular font-primary mt-3 text-black d-none d-sm-block"
          >
            {{ last[0].points.toLocaleString() }}
            {{ $t('buyer_dashboard.dashobard_buyer.points_will_expire_on') }}
            {{ new Date(last[0].expires_on).toLocaleDateString() }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import {mapGetters} from 'vuex'
import RadialChart from './RadialChart'
import {CustomSelect} from '~/components/common'
import {DEFAULT} from '~/static/constants'
import screenSize from '~/plugins/mixins/screenSize'
import MobileRewardGauge from '~/components/profile/rewards/MobileRewardGauge'

export default {
  name: 'BuyerDashboardCharts',
  components: {MobileRewardGauge, CustomSelect, RadialChart},
  mixins: [screenSize],
  data() {
    return {
      progress: 25,
      activeTab: 'week',
      tabsOptions: [
        {title: 'Week', value: 'week'},
        {title: 'Month', value: 'month'},
        {title: 'Year', value: 'year'},
      ],
      // TODO Dummy Data
      filterByTitle: this.$t('selling_page.status'),
      filterBy: '',
      rewards: {},
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
      dataChart: [],
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
            data: this.dataChart,
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
  computed: {
    ...mapGetters({
      rewardPoints: 'auth/getRewardPoints',
      last: 'rewards/getLastCreditHistoryItem',
      tiers: 'rewards/getRedeemableRewardsStages',
    }),
    tillNext() {
      return this.nextTier ? this.nextTier.highestValue - this.currentPoints : 0
    },
    nextTier() {
      let next = null
      for (const tier of this.tiers) {
        if (tier.highestValue > this.currentPoints) {
          next = tier
          break
        }
      }
      return next
    },
    mainChart() {
      return {
        labels: this.labels,
        datasets: [
          {
            borderColor: this.isScreenXS ? '#667799' : '#18A0FB',
            backgroundColor: 'rgba(24, 160, 251, 0.15)',
            data: this.dataChart,
            fill: !this.isScreenXS,
            borderWidth: 4,
          },
        ],
      }
    },
  },
  mounted() {
    this.handleFilterByChangeTotalSale('week')
    this.getRewards()
  },
  methods: {
    getRewards() {
      this.$axios
          .get('/dashboard/buyer/rewards')
          .then((res) => {
            this.rewards = res.data.data
            if (res.data.data.current_points > 0) {
              this.progress =
                  parseInt(
                      (res.data.data.current_points /
                          res.data.data.next_reward.redemption_points) *
                      100
                  ) + 25
            }
          })
          .catch((err) => {
            this.logger.logToServer(err.response)
          })
    },
    changeTab(tab) {
      this.activeTab = tab
      this.handleFilterByChangeTotalSale(tab)
    },
    handleFilterByChangeTotalSale(value) {
      this.$axios
          .get('/dashboard/buyer/purchases-graph?group_by=' + value)
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
.w-200
  width: 200px
.charts
  &:not(.mobile)
    height: 364px
    &.chart-line
      width: 730px
      max-width: 730px
      margin-right: 59px
      &.XL
        width: 100%
        max-width: 70%
        min-width: 730px
    &.radial
      width: 330px
      max-width: 330px
      margin-left: auto
      &.XL
        width: 100%
        max-width: 30%
        min-width: 330px

  &.mobile
    box-shadow: 0px 1px 4px rgba($color-black-1, 0.25)
    border-radius: 8px
    padding: 10px 7px

    &.radial
      padding-bottom: 30px

.reward-button
  right: 50px

.dropdown-filter::v-deep
  background-color: $color-white-4
  border-radius: 8px
  border: none !important
  width: 200px

  .selected
    @include body-13-normal
    color: $color-black-1
    background-color: $color-white-4 !important
    font-family: $font-family-sf-pro-display
    border: none !important

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
    width: 100%

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
</style>
