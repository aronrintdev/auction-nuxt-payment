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
              :fill="false"
              border-color="#667799"
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
          <h1 :class="{
            'mb-5': isScreenXS
          }"
              class="fs-20 fw-7 font-primary mb-0 rewards-title">
            {{ $t('buyer_dashboard.dashobard_buyer.rewards') }}
          </h1>
          <div>
            <nuxt-link
                to='/profile/rewards'
                class="font-secondary fs-16 fw-400 border-bottom border-primary mb-0 d-none d-sm-inline"
            >{{ $t('buyer_dashboard.dashobard_buyer.view_rewards') }}
            </nuxt-link>
          </div>
        </div>
        <div class="mt-3 mb-0 my-sm-4 text-center progressbar_wrapper mx-auto">
          <RadialChart v-if="!isScreenXS"
                       :progress="progress"
                       :rewards="rewards"
          />
          <MobileRewardGauge
              v-else
              :current-points="rewardPoints"
              :show-next-expire="false"
          />
          <!-- TODO -->
          <h6 v-if='rewards.next_reward' class="fs-12 mb-0 fw-7 font-primary text-black mt-3">
            {{ $t('buyer_dashboard.dashobard_buyer.your_next_reward') }}: {{ rewards.next_reward.name }}
          </h6>
          <b-button
              class="mt-3 bg-blue-primary py-2 w-100 font-primary fw-5 d-none d-sm-inline-block"
              pill
              to="/shop"
          >{{ $t('buyer_dashboard.dashobard_buyer.earn_money') }}
          </b-button
          >
          <b-button
              class="mt-3 px-4 py-2 font-primary fs-12 fw-6 border d-sm-none d-inline-block"
              variant="outline-secondary"
              pill
              to="/profile/rewards"
            >{{ $t('buyer_dashboard.dashobard_buyer.view_rewards') }}</b-button
          >
          <h6
              v-if="last.length"
              class="fs-12 mb-0 fw-4 font-primary mt-3 text-dark d-none d-sm-block"
          >
            {{ last[0].points.toLocaleString() }}
            {{ $t('buyer_dashboard.dashobard_buyer.points_will_expire_on') }}
            {{ new Date(last[0].expires_on).toLocaleDateString() }}
          </h6>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import {mapGetters} from 'vuex';
import RadialChart from './RadialChart'
import {CustomSelect} from '~/components/common'
import {DEFAULT} from '~/static/constants'
import screenSize from '~/plugins/mixins/screenSize';
import MobileRewardGauge from '~/components/profile/rewards/MobileRewardGauge';

export default {
  name: 'BuyerDashboardCharts',
  components: {MobileRewardGauge, CustomSelect, RadialChart},
  mixins: [screenSize],
  data() {
    return {
      progress: 0,
      activeTab: 'week',
      tabsOptions: [
        {title: 'Week', value: 'week'},
        {title: 'Month', value: 'month'},
        {title: 'Year', value: 'year'}
      ],
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
  computed: {
    ...mapGetters({
      rewardPoints: 'auth/getRewardPoints',
      last: 'rewards/getLastCreditHistoryItem',
      tiers: 'rewards/getRedeemableRewardsStages',
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
      }
    })
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
            this.rewards = res.data.data;
            if (res.data.data.current_points > 0) {
              this.progress = parseInt((res.data.data.current_points / res.data.data.next_reward.redemption_points) * 100);
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
