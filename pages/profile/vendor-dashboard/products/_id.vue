<template>
  <b-container
    fluid
    class="container-profile-dashboard-product h-100"
    :class="(isScreenXS ? '' : ' web-padding ') + mobileClass"
  >
    <div
      v-if="!isScreenXS"
      class="font-primary body-9-normal text-gray-24 mb-19"
      role="button"
      @click="$router.push('/profile/vendor-dashboard/products')"
    >
      &lt; {{ $t('common.back') }}
    </div>

    <div class="d-flex">
      <div
        :class="{
          mobile: isScreenXS,
          'mr-31 flex-grow-1': !isScreenXS,
        }"
        class="chart-card bg-white br-10 p-1 p-sm-4"
      >
        <div
          :class="{
            'm-padding-title': isScreenXS,
          }"
          class="d-flex align-items-center justify-content-between"
        >
          <div>
            <h1 class="fs-24 fw-7 font-primary mb-0 d-none d-sm-block">
              {{ result.product.name }}
            </h1>

            <h1 class="body-2-normal font-primary mb-0 d-none d-sm-block">
              {{ result.product.colorway }}
            </h1>
          </div>

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
            v-for="(tab, index) in filterTabs"
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
      </div>

      <div
        v-if="!isScreenXS"
        :class="{
          'mt-20 flex-grow-1': !isScreenXS,
        }"
      >
        <div
          class="d-flex w-100 justify-content-between align-items-baseline mb-12"
        >
          <div
            :class="{
              'body-21-medium text-black font-primary': isScreenXS,
              'body-4-bold font-primary text-uppercase text-black': !isScreenXS,
            }"
          >
            {{ chartFilterOptions[activeTab] }}
          </div>
          <div
            class="text-decoration-underline text-black body-4-normal font-secondary"
            role="button"
          >
            {{ $t('vendor_dashboard.breakdown.export') }}
          </div>
        </div>

        <div>
          <BreakdownProductStatCard
            :label="
              $t('vendor_dashboard.breakdown.table.items_sold').toString()
            "
            :value="result.stats.items_sold || 0"
            class="mb-14"
          />
          <BreakdownProductStatCard
            :label="
              $t('vendor_dashboard.breakdown.table.price_premium').toString()
            "
            :sub-label="`(${$t(
              'vendor_dashboard.breakdown.over_retail_price'
            ).toString()})`"
            :value="(result.stats.price_premium || 0) + '%'"
            class="mb-14"
          />
          <BreakdownProductStatCard
            :label="
              $t('vendor_dashboard.breakdown.table.avg_sale_price').toString()
            "
            :value="(result.stats.price_premium || 0) | toCurrency"
            class="mb-14"
          />
          <BreakdownProductStatCard
            :label="$t('vendor_dashboard.breakdown.table.sales').toString()"
            :value="(result.stats.price_premium || 0) | toCurrency"
          />
        </div>
      </div>
    </div>

    <div
      :class="{
        'my-5': !isScreenXS,
      }"
    >
      <div
        v-if="isScreenXS"
        class="d-flex mt-26"
        :class="{
          'justify-content-center ': isScreenXS,
          'mb-31': !isScreenXS,
        }"
      >
        <div
          class="ml-4 font-primary"
          :class="{
            'body-21-medium mr-1 text-black': isScreenXS,
            'body-2-bold mr-22': !isScreenXS,
          }"
        >
          {{ $t('vendor_dashboard.breakdown.statistics') }}
        </div>
        <div
          :class="{
            'body-21-medium text-black font-primary': isScreenXS,
            'body-2-normal font-secondary text-capitalize text-gray-simple':
              !isScreenXS,
          }"
        >
          ({{ chartFilterOptions[activeTab] }})
        </div>
      </div>
      <b-table
        class="ordersTable"
        borderless
        no-border-collapse
        :fields="tableFields"
        :items="result.orders"
        tbody-tr-class="bg-white"
        :busy="loading"
        :show-empty="!loading && result.orders.length === 0"
      >
        <template #table-busy>
          <div class="d-flex align-items-center justify-content-center w-100">
            <Loader :loading="loading" />
          </div>
        </template>
        <template #head()="scope">
          <div class="text-nowrap" role="button" @click="orderBy(scope)">
            <span class="mr-1">{{ scope.label }}</span>
            <img
              v-if="scope.label !== $t('vendor_dashboard.actions')"
              :src="require('~/assets/img/icons/down-arrow-solid.svg')"
              :alt="scope.label"
              class="sort-icon"
              :class="reverseDirection(scope.column)"
            />
          </div>
        </template>
        <template #cell(product)="data">
          <div
            class="d-flex align-items-center align-items-sm-baseline justify-content-center flex-sm-column gap-2 tdHeightSm mb-2 mb-sm-0"
            :class="mobileClass"
          >
            <div class="col-thumb d-flex d-sm-none">
              <ProductThumb
                v-if="data.item.listing_item"
                :src="data.item.listing_item.inventory.product.image"
                :product="data.item.listing_item.inventory.product"
              />
            </div>
            <div v-if="data.item.listing_item">
              <h4
                :class="{
                  'body-5-medium mobile': isScreenXS,
                  'font-secondary': !isScreenXS,
                }"
                class="fw-6 fs-15 border-primary mb-1 text-nowrap text-truncate mw-220"
              >
                {{ data.item.listing_item.inventory.product.name }}
              </h4>
              <h4 class="font-secondary body-6-normal mb-0 text-secondary-6">
                {{ $t('vendor_dashboard.sku') }}:
                {{ data.item.listing_item.inventory.product.sku }}
              </h4>
              <h4
                :class="mobileClass"
                class="font-secondary body-6-normal mb-0 text-secondary-6 text-nowrap text-truncate mw-220"
              >
                {{ $t('vendor_dashboard.colorway') }}:
                {{ data.item.listing_item.inventory.product.colorway }}
              </h4>
              <h4 class="font-secondary body-6-normal mb-0 text-secondary-6">
                {{ $t('vendor_dashboard.box_condition') }}:
                {{ data.item.listing_item.inventory.packaging_condition.name }}
              </h4>
            </div>
          </div>
        </template>
        <template #cell(order_id)="data">
          <div
            :aria-label="$t('vendor_dashboard.order_id')"
            class="d-flex align-items-center w-fit-content tdHeight"
            :class="{
              'flex-column': !isScreenXS,
            }"
            role="button"
            @click="$router.push(`/orders/${orderId(data.item)}`)"
          >
            <div v-if="!isScreenXS" class="col-thumb mb-1">
              <ProductThumb
                v-if="data.item.listing_item"
                :product="data.item.listing_item.inventory.product"
                :src="data.item.listing_item.inventory.product.image"
              />
            </div>
            <h4
              class="fw-7 fs-14 font-secondary text-decoration-underline text-link-blue-mobile mb-0 mx-auto text-nowrap"
            >
              #{{ orderId(data.item) }}
            </h4>
          </div>
        </template>
        <template #cell(date_ordered)="data">
          <div
            class="d-flex align-items-center justify-content-center tdHeight"
            :aria-label="$t('vendor_dashboard.date_ordered')"
          >
            <h4 class="font-secondary fw-5 fs-16 mb-0">
              {{ new Date(data.item.created_at).toLocaleDateString() }}
            </h4>
          </div>
        </template>
        <template #cell(type)="data">
          <div
            class="d-flex align-items-center justify-content-center tdHeight text-capitalize"
            :aria-label="$t('vendor_dashboard.type')"
          >
            <h4 v-if="data.item.order" class="font-secondary fw-5 fs-16 mb-0">
              {{ data.item.order.type.label }}
            </h4>
          </div>
        </template>
        <template #cell(vendor_payout)="data">
          <div
            class="d-flex align-items-center justify-content-center tdHeight"
            :aria-label="$t('vendor_dashboard.vendor_payout')"
          >
            <h4 class="font-secondary fw-5 fs-16 mb-0">
              {{
                (data.item.commission ? data.item.commission.commission : 0)
                  | toCurrency
              }}
            </h4>
          </div>
        </template>
        <template #cell(status)="data">
          <div
            :class="{
              'text-center': !isScreenXS,
            }"
            class="d-flex align-items-center justify-content-center tdHeight"
            :aria-label="$t('vendor_dashboard.status')"
          >
            <h4
              :class="
                styleFor(data.item.status) +
                ` ${mobileClass}` +
                `${isScreenXS ? 'text-nowrap' : ''}`
              "
              class="text-capitalize status body-13-normal mb-0"
            >
              {{ getLabelForStatus(data.item.status, 'vendor') }}
            </h4>
          </div>
        </template>
        <template #cell(actions)="data">
          <div
            class="d-flex align-items-center justify-content-center tdHeight text-link-blue-mobile"
            :aria-label="$t('vendor_dashboard.actions')"
          >
            <div
              :class="{
                'text-nowrap': isScreenXS,
              }"
              class="font-secondary fw-5 fs-16 mb-0 text-primary text-center mw-140"
            >
              <div
                v-if="data.item.status === PROCESSING && !isScreenXS"
                class="d-flex align-items-center justify-content-center"
              >
                <img :src="require('~/assets/img/paper.svg')" />
              </div>
              <div v-if="data.item.status === PROCESSING">
                <a
                  href="#generate-label"
                  class="text-link-blue-mobile"
                  @click="generateLabel(data.item)"
                  >{{ $t('orders.generate_shipping_label') }}
                  <img
                    v-if="isScreenXS"
                    :src="require('~/assets/img/paper.svg')"
                    height="16"
                    width="12"
                  />
                  <img
                    v-if="!isScreenXS"
                    :src="require('~/assets/img/rewards/arrow-right-blue.svg')"
                  />
                </a>
              </div>
              <div v-if="data.item.status === AWAITING_SHIPMENT_TO_DEADSTOCK">
                <a
                  href="#generate-label"
                  class="text-link-blue-mobile"
                  @click="generateLabel(data.item)"
                  >{{ $t('orders.delivered_to_deadstock') }}
                  <img
                    v-if="isScreenXS"
                    :src="require('~/assets/img/paper.svg')"
                    height="16"
                    width="12"
                  />
                  <img
                    v-if="!isScreenXS"
                    :src="require('~/assets/img/rewards/arrow-right-blue.svg')"
                  />
                </a>
              </div>
              <div
                v-if="
                  data.item.status !== PROCESSING && data.item.vendor_shipment
                "
              >
                <a
                  class="text-link-blue-mobile"
                  :download="`${data.item.vendor_shipment.tracking_no}.pdf`"
                  :href="downloadPdf(data.item)"
                  >{{ $t('orders.print_shipping_label') }}
                  <img
                    v-if="isScreenXS"
                    :src="require('~/assets/img/paper.svg')"
                    height="16"
                    width="12"
                /></a>
              </div>
              <span
                v-if="
                  data.item.status !== PROCESSING && data.item.vendor_shipment
                "
                class="text-link-blue-mobile"
              >
                <span>{{
                  data.item.vendor_shipment.shipping_method_text
                }}</span>
                <a
                  :href="data.item.vendor_shipment.tracking_url"
                  class="text-decoration-underline text-link-blue-mobile"
                  target="_blank"
                  >{{ data.item.vendor_shipment.tracking_no }}</a
                >
              </span>
            </div>
          </div>
        </template>
      </b-table>
    </div>
  </b-container>
</template>

<script>
import Loader from '~/components/common/Loader'
import screenSize from '~/plugins/mixins/screenSize'
import { AWAITING_SHIPMENT_TO_DEADSTOCK, PROCESSING } from '~/static/constants'
import ProductThumb from '~/components/product/Thumb'
import orderStatus from '~/plugins/mixins/order-status'
import CustomSelect from '~/components/common/CustomSelect'
import BreakdownProductStatCard from '~/components/profile/vendor-dashboard/BreakdownProductStatCard'
export default {
  name: 'DashboardSingleProduct',
  components: { BreakdownProductStatCard, CustomSelect, ProductThumb, Loader },
  mixins: [screenSize, orderStatus],
  layout: 'Profile',
  data() {
    return {
      PROCESSING,
      AWAITING_SHIPMENT_TO_DEADSTOCK,
      filterByTitle: this.$t('selling_page.status'),
      filterBy: 'week',
      activeTab: 'week',
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
                beginAtZero: true,
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
      statusColors: {
        pending: 'orange',
        processing: 'orange',
        arrived_to_ds: 'green',
        send_to_ds: 'purple',
        processing_payment: '',
        authenticated_and_shipped: '',
        delivered: 'black',
        cancelled: 'red',
        shipped_and_auth: '',
        multiple: '',
      },
      fields: [
        {
          key: 'order_id',
          label: this.$t('vendor_dashboard.order_id'),
          sortable: false,
          tdClass: 'product-img-cell ',
          thClass: 'text-nowrap  body-4-bold',
        },
        {
          key: 'product',
          label: this.$t('vendor_dashboard.product'),
          sortable: false,
          tdClass: 'product-info-cell',
          thClass: 'text-nowrap body-4-bold',
        },
        {
          key: 'date_ordered',
          label: this.$t('vendor_dashboard.date_ordered'),
          sortable: false,
          thClass: 'text-nowrap text-center body-4-bold',
        },
        {
          key: 'type',
          label: this.$t('vendor_dashboard.type'),
          sortable: false,
          thClass: 'text-nowrap text-center body-4-bold',
        },
        {
          key: 'vendor_payout',
          label: this.$t('vendor_dashboard.vendor_payout'),
          sortable: false,
          thClass: 'text-nowrap text-center body-4-bold',
        },
        {
          key: 'status',
          label: this.$t('vendor_dashboard.status'),
          sortable: false,
          thClass: 'text-nowrap text-center body-4-bold',
        },
        {
          key: 'actions',
          label: this.$t('vendor_dashboard.actions'),
          sortable: false,
          thClass: 'text-nowrap text-center body-4-bold',
        },
      ],
      orderStatuses: Object.keys(this.$t('orders.order_statuses')).map((a) => {
        return {
          text: this.$t('orders.order_statuses.' + a),
          value: a,
        }
      }),
      loading: false,
      orderByField: 'id',
      orderByDirection: 'asc',
      result: {
        orders: [],
        graph: {},
        product: {},
        stats: {
          avg_price: null,
          items_sold: null,
          price_premium: null,
          sales: null,
        },
      },
    }
  },
  computed: {
    mainChart() {
      return {
        labels: Object.keys(this.result.graph),
        datasets: [
          {
            borderColor: this.isScreenXS ? '#667799' : '#18A0FB',
            backgroundColor: 'rgba(24, 160, 251, 0.15)',
            data: Object.values(this.result.graph),
            fill: false,
            borderWidth: this.isScreenXS ? 2 : 4,
          },
        ],
      }
    },
    tableFields() {
      if (!this.isScreenXS) return this.fields
      else return this.swapElementTable()
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
    this.getTopOrders()
  },
  methods: {
    changeTab(tab) {
      this.activeTab = tab
      this.getTopOrders()
    },
    handleFilterByChangeTotalSale(tab) {
      this.activeTab = tab
      this.getTopOrders()
    },
    orderBy(scope) {
      if (scope.column !== 'actions') {
        this.orderByDirection = this.reverseDirection(scope.column)
        this.orderByField = scope.column
        this.getTopOrders()
      }
    },
    reverseDirection(column) {
      return column === this.orderByField
        ? this.orderByDirection === 'asc'
          ? 'desc'
          : 'asc'
        : 'desc'
    },
    async generateLabel(item) {
      const len = item.status_markable.length
      if (len < 1) {
        return false
      }
      const status = item.status_markable[len - 1]
      const url = `/order-items/${item.id}/status?status=${status.key}`

      const resp = await this.$axios.put(url)
      if (resp.status === 200) {
        this.$emit('labelCreated')
      }
    },
    styleFor(statusLabel) {
      switch (statusLabel.toLowerCase()) {
        case 'arrived_at_deadstock':
          return 'arrived'
        case 'arrived_at_ds':
          return 'arrived'
        case 'delivered':
          return 'delivered'
        case 'completed':
          return 'arrived'
        case 'cancel':
          return 'cancel'
        case 'refunded':
          return 'cancel'
        case 'cancelled':
          return 'cancel'
        case 'shipped_to_deadstock':
          return 'shipped'
        case 'shipped_to_ds':
          return 'shipped'
        case 'awaiting_authentication':
          return 'awaiting-auth'
        case 'auth_completed':
          return 'auth-completed'
        case 'order_taken_over':
          return 'order-taken-over'
      }

      return 'awaiting'
    },
    downloadPdf(item) {
      return `data:application/pdf;base64,${item.vendor_shipment.shipment_pdf}`
    },
    swapElementTable() {
      return [
        this.fields[1],
        this.fields[0],
        ...this.fields.slice(2, this.fields.length),
      ]
    },
    orderId(order) {
      const length = order.order.items.length
      return `${order.order.order_id}${length > 0 ? '-1' : ''}`
    },
    getTopOrders() {
      this.loading = true
      this.$axios
        .get(`dashboard/vendor/product-breakdown/${this.$route.params.id}`, {
          params: {
            group_by: this.activeTab,
          },
        })
        .then((res) => {
          this.result = res.data.data
        })
        .catch((err) => {
          this.logger.logToServer(err.response)
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>

<style scoped lang="sass">
@import "~/assets/css/variables"
.mt-26
  margin-top: 26px
.mw-220
  max-width: 220px
.mb-12
  margin-bottom: 12px
.mb-14
  margin-bottom: 14px
.mt-20
  margin-top: 20px
.mr-31
  margin-right: 31px

.mb-19
  margin-bottom: 19px

.text-gray-24
  color: $color-gray-24

.line-chart
  height: 210px
  &.mobile
    height: 204px

.chart-card
  max-width: 730px
  height: 364px
  &.mobile
    box-shadow: 0px 1px 4px rgba($color-black-1, 0.25)
    border-radius: 8px
    max-width: 100%
    width: 100%
    height: max-content

.dropdown-filter::v-deep
  background-color: $color-white-4
  border-radius: 8px
  border: none
  width: 200px
  &.custom-selectbox
    .selected
      @include body-13-medium
      color: $color-black-1
      background-color: $color-white-4
      font-family: $font-family-sf-pro-display
      border: none
      padding-inline: 18px

      label
        display: none

    .items
      @include body-13-regular
      color: $color-black-1
      font-family: $font-family-sf-pro-display

.web-padding
  padding: 30px 25px
.container-profile-dashboard-product
  background-color: $color-gray-1
  &.mobile
    background-color: $color-white-1
    padding: 10px 15px 38px 17px

.sort-icon
  &.asc
    transform: rotate(180deg)

.status
  &.mobile
    border: none
    box-shadow: none
    filter: none
    text-align: right

  &:not(.mobile)
    padding: 11px 30px
    border-radius: 4px
    width: 141px
    height: 61px
    display: flex
    align-items: center
    justify-content: center
    border: none

.status.awaiting
  color: $color-red-20

  &:not(.mobile)
    background: rgba($color-red-20, 0.08)

.status.cancel
  color: $color-red-3

  &:not(.mobile)
    background: rgba($color-red-3, 0.05)

.status.arrived
  color: $color-green-3

  &:not(.mobile)
    background: $color-green-20

.status.delivered
  color: $color-blue-17

  &:not(.mobile)
    background: rgba($color-blue-17, 0.05)

.status.shipped
  color: $color-blue-16

  &:not(.mobile)
    background: $dark-gray-5

.status.auth-completed
  color: $color-purple-7

  &:not(.mobile)
    background: $color-purple-8

.status.awaiting-auth
  &:not(.mobile)
    background: rgba($color-blue-17, 0.05)
  color: $color-blue-17

.status.order-taken-over
  &:not(.mobile)
    background: $dark-gray-7
  color: $color-gray-5

.status-badge-warning
  &.mobile
    background-color: transparent
    padding: 0


::v-deep.ordersTable
  &.table.b-table.b-table-no-border-collapse
    border-spacing: 0 10px

  thead th div
    font-family: $font-family-base
    @include body-13-bold

  tbody td
    height: 120px
    @media (max-width: 576px)
      display: flex
      height: fit-content
      padding: 2px 0.75rem
      &:nth-child(odd)
        background-color:  $color-white-5
      &:first-child
        background-color:  transparent
  .tdHeight
    height: inherit
  .tdHeightSm
    @media (min-width: 576px)
      height: inherit
  .col-thumb
    display: flex
    justify-content: center
    width: 100px
  .stats-graph
    width: 100px
    height: 40px
  @media (max-width: 576px)
    .view-more-link
      font-size: 10px
      font-weight: $medium
    .heading
      font-size: 14px
      font-family: $font-family-base
      font-weight: $medium
    thead
      display: none
    tr[role="row"]
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25)
      border-radius: 8px
      outline: 1px solid $color-gray-3
      display: block
      margin: 12px 0
      padding: 15px 0 6px 0

      div.font-secondary
        font-size: 12px
        color: $color-gray-6
        font-weight: $normal
        font-family: $font-family-base
    .tdHeight
      @include body-9-medium
      color: $color-black-1
      width: 100%
      padding: 1px 0

      .status-badge
        background: none
        padding: 0
      h4
        @include body-9-normal
        font-family: $font-family-base
        &.actions
          display: flex
          column-gap: 6px
      &::before
        content: attr(aria-label)
        margin-right: auto
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
