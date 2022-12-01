<template>
  <b-container
    fluid
    class="container-profile-dashboard-breakdown h-100"
    :class="isScreenXS ? 'p-4' : 'web-padding'"
  >
    <span
      v-if="!isScreenXS"
      class="backToSearch body-13"
      role="button"
      @click="moveBack"
    >
      <img
        :src="require('~/assets/img/icons/arrow-left-gray.svg')"
        class="img-fluid"
      />
      {{ $t('common.back') }}
    </span>
    <NavGroup
      v-if="isScreenXS"
      :data="globalTabs"
      :value="activeGlobalTab"
      :class="mobileClass"
      class="mt-20 nav-grp"
      @change="tabChange"
    />

    <div>
      <div
        :class="{
          mobile: isScreenXS,
          'mt-19': !isScreenXS,
        }"
        class="chart-card bg-white br-10"
      >
        <div
          v-if="!isScreenXS"
          :class="{
            'm-padding-title': isScreenXS,
          }"
          class="d-flex align-items-center justify-content-between"
        >
          <h1 class="body-2-bold font-primary mb-0">
            {{ $t('vendor_dashboard.breakdown.sales') }}
          </h1>

          <div
            class="text-decoration-underline text-black body-4-normal font-secondary"
            role="button"
          >
            {{ $t('vendor_dashboard.breakdown.export') }}
          </div>
        </div>

        <div
          v-if="!isScreenXS"
          class="mt-14 d-flex align-items-center justify-content-between"
        >
          <div class="tabs d-flex align-items-center">
            <div
              v-for="tab in globalTabs"
              :key="tab.value"
              role="button"
              @click="tabChange(tab.value)"
            >
              <div
                class="tab font-secondary"
                :class="{
                  'body-3-medium text-black': tab.value === activeGlobalTab,
                  'body-3-normal text-gray-4': tab.value !== activeGlobalTab,
                }"
              >
                {{ tab.text }}
              </div>
            </div>
          </div>
          <CustomSelect
            :default="filterBy"
            :options="chartFilterOptions"
            :threelineIcon="false"
            :title="filterByTitle"
            class="dropdown-filter"
            @input="handleFilterByChangeTotalSale"
          />
        </div>

        <BreakDownFilters :current-tab="activeGlobalTab"/>

        <div class="tabs d-sm-none d-flex gap-2 justify-content-center my-4">
          <h6
            v-for="(tab, index) in filterTabs"
            :key="index"
            :class="{ activeOne: activeTab === tab.value }"
            class="fs-10 fw-7 font-primary mb-0 cursor-pointer position-relative text-uppercase"
            @click="changeFilter(tab.value)"
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
      </div>
    </div>
    <div class="mt-36">
      <div class="d-flex">
        <div class="ml-4 body-2-bold font-primary mr-22">
          {{ $t('vendor_dashboard.breakdown.statistics') }}
        </div>
        <div class="body-2-normal font-secondary text-capitalize text-gray-simple">
          ({{chartFilterOptions[activeTab]}})
        </div>
      </div>

      <b-table
        :fields="filteredTableFields"
        :items="stats"
        borderless
        class="stat-table"
        no-border-collapse
        tbody-tr-class="bg-white p-web-row mt-31"
        :busy="loading"
        :show-empty="!loading && stats.length === 0"
      >
        <template #table-busy>
          <div class="d-flex align-items-center justify-content-center w-100">
            <Loader :loading="loading" />
          </div>
        </template>
        <template #head()="scope">
          <div class="text-nowrap" role="button" onselectstart="return false" @click="orderBy(scope)">
            <span class="mr-1">{{ scope.label }}</span>
            <img
              v-if="scope.label"
              :src="require('~/assets/img/icons/down-arrow-solid.svg')"
              :alt="scope.label"
              class="sort-icon"
              :class="reverseDirection(scope.column)"
            />
          </div>
        </template>
        <template #cell(sales_this_month)="row">
          <div
            :aria-label="$t('vendor_dashboard.sales_this_month')"
            class="d-flex align-items-center justify-content-center tdHeight"
          >
            <h4 class="font-secondary fw-5 fs-16 mb-0">
              {{ row.item.sales_amount_this_month | toCurrency }}
              <span
                v-if="row.item.sales_percentage > 0"
                class="text-success text-sm"
                >(+{{ row.item.sales_percentage }}%)</span
              >
              <span
                v-if="row.item.sales_percentage < 0"
                class="text-danger text-sm"
                >(-{{ row.item.sales_percentage }}%)</span
              >
            </h4>
          </div>
        </template>
        <template #cell(total_sales)="row">
          <div
            :aria-label="$tc('vendor_dashboard.total_sales', 1)"
            class="d-flex align-items-center justify-content-center tdHeight"
          >
            <h4 class="font-secondary fw-5 fs-16 mb-0">
              {{ row.item.total_sales_amount | toCurrency }}
            </h4>
          </div>
        </template>
        <template #cell(average_sale_price)="row">
          <div
            :aria-label="$t('vendor_dashboard.avg_price')"
            class="d-flex align-items-center justify-content-center tdHeight"
          >
            <h4 class="font-secondary fw-5 fs-16 mb-0">
              {{ row.item.avg_sales_price | toCurrency }}
            </h4>
          </div>
        </template>
      </b-table>
    </div>
  </b-container>
</template>

<script>
import screenSize from '~/plugins/mixins/screenSize'
import { CustomSelect } from '~/components/common'
import NavGroup from '~/components/common/NavGroup'
import Loader from '~/components/common/Loader'
import BreakDownFilters from '~/components/profile/vendor-dashboard/BreakDownFilters';

export default {
  name: 'BreakDownPage',
  components: {BreakDownFilters, Loader, NavGroup, CustomSelect },
  mixins: [screenSize],
  layout: 'Profile',
  data() {
    return {
      activeGlobalTab: 'category',
      globalTabs: Object.keys(this.$t('vendor_dashboard.breakdown.tabs')).map(
        (key) => {
          return {
            text: this.$t(`vendor_dashboard.breakdown.tabs.${key}`),
            value: key,
          }
        }
      ),
      loading: false,
      stats: [],
      fields: [
        {
          key: 'brand',
          label: this.$t('vendor_dashboard.breakdown.table.brand'),
          thClass: 'text-center text-nowrap body-4-bold',
        },
        {
          key: 'product',
          label: this.$t('vendor_dashboard.breakdown.table.product'),
          thClass: 'text-center text-nowrap body-4-bold',
        },
        {
          key: 'category',
          label: this.$t('vendor_dashboard.breakdown.table.category'),
          thClass: 'text-center text-nowrap body-4-bold',
        },
        {
          key: 'items_sold',
          label: this.$t('vendor_dashboard.breakdown.table.items_sold'),
          thClass: 'text-nowrap text-center body-4-bold',
        },
        {
          key: 'price_premium',
          label: this.$t('vendor_dashboard.breakdown.table.price_premium'),
          thClass: 'text-nowrap text-center body-4-bold',
        },
        {
          key: 'avg_sale_price',
          label: this.$t('vendor_dashboard.breakdown.table.avg_sale_price'),
          thClass: 'text-nowrap text-center body-4-bold',
        },
        {
          key: 'sales',
          label: this.$t('vendor_dashboard.breakdown.table.sales'),
          thClass: 'text-nowrap text-center body-4-bold',
        },
      ],
      filterByTitle: this.$t('selling_page.status'),
      filterBy: 'month',
      activeTab: 'month',
      activeTabDoughnut: 'week',
      filterTabs: [
        { title: 'Week', value: 'week' },
        { title: 'Month', value: 'month' },
        { title: 'Year', value: 'year' },
      ],
      chartFilterOptions: {
        week: 'Week to Date',
        month: 'Month to Date',
        year: 'Year to Date',
      },
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
      orderByField: 'id',
      orderByDirection: 'asc',
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
    filteredTableFields(){
      return [...this.fields.filter(field => field.key === this.activeGlobalTab), ...this.fields.slice(3, this.fields.length)]
    }
  },
  mounted() {
    console.log(this.$route)
    console.log(this.$router)
  },
  methods: {
    orderBy(scope) {
      this.orderByDirection = this.reverseDirection(scope.column)
      this.orderByField = scope.column
      this.getData()
    },
    reverseDirection(column) {
      return column === this.orderByField
        ? this.orderByDirection === 'asc'
          ? 'desc'
          : 'asc'
        : 'desc'
    },
    moveBack() {
      this.$router.push('/profile/vendor-dashboard')
    },
    changeFilter(tab) {
      this.activeTab = tab
      this.handleFilterByChangeTotalSale(tab)
    },
    tabChange(tab) {
      this.activeGlobalTab = tab
    },
    handleFilterByChangeTotalSale(filter) {},
    getData() {},
  },
}
</script>

<style scoped lang="sass">
@import "~/assets/css/variables"
::v-deep.p-web-row
  padding: 26px 28px

.sort-icon
  &.asc
    transform: rotate(180deg)
::v-deep.nav-grp
  &.mobile
    width: 100%
  .btn-group
    height: 32px
    button.btn
      @include body-6-regular
      font-family: $font-montserrat
      width: 103px
      padding-block: 1px
      &.active
        font-weight: $medium

.mt-19
  margin-top: 19px

.mt-36
  margin-top: 36px

.mt-31
  margin-top: 31px

.mt-14
  margin-top: 14px

.mr-22
  margin-right: 22px

.tabs
  width: 408px
  border-bottom:  0.5px solid $color-gray-23
  padding-bottom: 4px
  .tab
    &:not(last-child)
      margin-right: 96px

.text-gray-4
  color: $color-gray-4

.chart-card
  padding: 25px 27px
  &.mobile
    box-shadow: 0px 1px 4px rgba($color-black-1, 0.25)
    border-radius: 8px

.web-padding
  padding: 30px 24px
.container-profile-dashboard-breakdown
  background-color: $color-gray-1

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

::v-deep.stat-table
  &.table.b-table.b-table-no-border-collapse
    border-spacing: 0 10px

  thead th div
    font-family: $font-family-base
    @include body-13-bold

  tbody td
    height: 100px
    @media (max-width: 576px)
      display: flex
      height: fit-content
      padding: 2px 0.75rem
      &:nth-child(odd)
        background-color: $color-white-5
      &:first-child
        background-color: transparent

  .tdHeight
    height: inherit

  .stats-graph
    width: 100px
    height: 40px

  @media (max-width: 576px)
    .view-more-link
      font-size: 10px
      font-weight: $medium
    .heading
      font-family: $font-family-base
      @include body-5-medium
    thead
      display: none
    tr[role="row"]
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25)
      border-radius: 8px
      outline: 1px solid $color-gray-3
      display: block
      margin: 12px 0
      padding: 15px 0 6px 0

      h4.font-secondary
        width: fit-content
        font-size: 12px
        color: $color-gray-6
        font-weight: $normal
        font-family: $font-family-base

        &.border-bottom.bottom-primary
          border: 0 !important
    .tdHeight
      @include body-9-medium
      color: $color-black-1
      width: 100%
      padding: 1px 0
      h4
        @include body-9-normal
        color: $color-gray-6

      &::before
        content: attr(aria-label)
        margin-right: auto
        width: 100%
</style>
