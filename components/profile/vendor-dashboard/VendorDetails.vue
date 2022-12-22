<template>
  <SideOverlay
    :is-open="detailsMenu"
    @closed="$emit('closed')"
    @opened="$emit('opened')"
  >
    <div class="d-flex flex-column h-100 menu-content">
      <div
        class="menu-header position-relative d-flex align-items-center justify-content-between"
      >
        <div
          class="position-absolute close-icon"
          role="button"
          @click="$emit('closed')"
        >
          <closeIcon height="14px" width="14px" />
        </div>
        <div class="d-flex flex-column text-white">
          <div class="body-3-medium">
            {{ $t('vendor_dashboard.hi_name', [$auth.user.first_name]) }}
          </div>
          <div class="body-5-regular d-flex align-items-center">
            {{ $t('vendor_dashboard.you_are_seller', { rank: vendor.rank }) }}
            <!--            TODO make it dynamic when rank color design is ready-->

            <img
              :src="
                require(`~/assets/img/icons/${
                  vendor.rank ? vendor.rank.toLowerCase() : 'bronze'
                }-badge.svg`)
              "
              aria-hidden="true"
              class="ml-2"
              height="26px"
              width="26px"
            />
          </div>
        </div>
        <div class="d-flex flex-column text-white text-center">
          <div v-if="currentThreshold" class="body-7-medium">
            {{ currentThreshold.percentage | toPercentage }}
          </div>
          <div class="body-5-medium">
            {{ $t('vendor_dashboard.seller_fee') }}
          </div>
        </div>
      </div>

      <div class="flex-grow-1 menu-body d-flex flex-column">
        <div class="body-4-medium title text-black">
          {{ $t('vendor_dashboard.overview') }}
        </div>
        <div class="d-flex overview-body align-items-center">
          <div class="position-relative image-bg">
            <!--            TODO make it dynamic when medal design is ready-->
            <img
              :src="require('~/assets/img/icons/silver-medal.svg')"
              aria-hidden="true"
              class="position-absolute medal-icon"
            />
          </div>
          <div
            v-if="nextThreshold"
            class="d-flex flex-column gray-color pl-3 mr-120"
          >
            <div class="body-13-medium">
              {{
                $t('vendor_dashboard.on_track', { rank: nextThreshold.label })
              }}
            </div>
            <div class="body-5-normal mt-2">
              {{ $t('vendor_dashboard.next_sales', { next: ordersTillNext }) }}
            </div>
          </div>
          <div class="gauge position-absolute">
            <GaugeChart
              :max-height="150"
              :max-width="150"
              :radius="60"
              :stroke-width="'10'"
            >
              <template #center>
                <div
                  class="d-flex flex-column align-items-center justify-content-center h-100"
                >
                  <div class="heading-13">{{ vendor.current_points }}</div>
                  <div class="body-18-bold gray-color">
                    {{ $t('vendor_dashboard.seller_ranking') }}
                  </div>
                </div>
              </template>
              <template #bottom>
                <div
                  v-if="nextThreshold"
                  class="d-flex body-9-medium blue-dark-color text-center"
                >
                  {{
                    $t('vendor_dashboard.till_next', {
                      point:
                        nextThreshold.ending_ranking - vendor.current_points,
                      next: nextThreshold.label,
                    })
                  }}
                </div>
              </template>
            </GaugeChart>
          </div>
        </div>

        <div class="body-4-medium title text-black">
          {{ $t('vendor_dashboard.selling_history') }}
        </div>

        <div class="overlay-card px-11 mb-35">
          <b-table
            :busy="loading"
            :fields="fields"
            :items="orders"
            class="orders-table"
            foot-row-variant="dflex justify-content-center"
            no-border-collapse
            tbody-tr-class="bg-white body-9-normal gray-color"
            thead-tr-class="body-21-medium text-center"
          >
            <template #table-busy>
              <div class="d-flex align-items-center justify-content-center">
                <Loader :loading="loading"></Loader>
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
            <template #cell(order_id)="data">
              <div class="text-decoration-underline blue-color-link">
                #{{ data.item.order.order_id }}
              </div>
            </template>

            <template #cell(product)="data">
              <div class="text-nowrap text-truncate max-128">
                {{
                  data.item.listing_item
                    ? data.item.listing_item.inventory.product.name
                    : '-'
                }}
              </div>
            </template>

            <template #cell(date_ordered)="data">
              <div>
                {{ new Date(data.item.created_at).toLocaleDateString() }}
              </div>
            </template>

            <template #cell(outcome)="data">
              <div class="text-nowrap text-truncate text-center">
                {{ $t(`vendor_dashboard.outcomes.${itemOutcome(data.item)}`) }}
              </div>
            </template>

            <template #cell(actions)=""> </template>
            <template #head(actions)="">
              <!--              TODO will be added order score calc column-->
              <div></div>
            </template>
          </b-table>

          <div
            class="d-flex align-items-center justify-content-center blue-color-link body-9-normal read-more"
            role="button"
            @click="addMore"
          >
            {{ $t('vendor_dashboard.view_more') }}
            <arrowBottomLong class="ml-2 bottom-arrow" />
          </div>
        </div>

        <div class="text-center body-5-regular mb-17 text-black">
          {{ $t('vendor_dashboard.faq_body') }}
        </div>

        <div
          class="overlay-card faq p-17 d-flex align-items-center justify-content-between"
          @click="$router.push('/faqs/vendor-hub')"
        >
          <div class="body-5-medium blue-color">
            {{ $t('vendor_dashboard.faq_title') }}
          </div>
          <div>
            <arrowRightLong />
          </div>
        </div>
      </div>
    </div>
  </SideOverlay>
</template>

<script>
import closeIcon from '~/assets/img/icons/close-icon.svg?inline'
import arrowRightLong from '~/assets/img/icons/arrow-right-long-black.svg?inline'
import arrowBottomLong from '~/assets/img/icons/arrow-down-blue.svg?inline'
import SideOverlay from '~/components/common/SideOverlay'
import Loader from '~/components/common/Loader'
import GaugeChart from '~/components/profile/vendor-dashboard/GaugeChart'
import {
  DETAILS_ORDER_COUNT,
  SUCCESSFUL_ORDER_REWARD,
} from '~/static/constants/vendor-dashboard.js'

export default {
  name: 'VendorDetails',
  components: {
    GaugeChart,
    Loader,
    SideOverlay,
    arrowBottomLong,
    closeIcon,
    arrowRightLong,
  },
  props: {
    vendor: {
      type: Object,
      required: true,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      ordersCount: DETAILS_ORDER_COUNT,
      total: DETAILS_ORDER_COUNT,
      orders: [],
      fields: [
        {
          key: 'order_id',
          label: this.$t('vendor_dashboard.order_id'),
          sortable: false,
          tdClass: '',
        },
        {
          key: 'product',
          label: this.$t('vendor_dashboard.product'),
          sortable: false,
          tdClass: 'text-center',
        },
        {
          key: 'date_ordered',
          label: this.$t('common.date'),
          sortable: false,
          thClass: 'text-center',
        },
        {
          key: 'outcome',
          label: this.$t('vendor_dashboard.outcome'),
          sortable: false,
          thClass: 'text-center',
        },
        {
          key: 'actions',
          label: this.$t('vendor_dashboard.actions'),
          thClass: 'text-center',
        },
      ],
      orderByField: 'id',
      orderByDirection: 'asc',
      detailsMenu: false,
      loading: false,
      thresholds: [],
    }
  },
  computed: {
    currentThreshold() {
      const currentIndex = this.thresholds.findIndex(
        (item) => item.label === this.vendor.rank
      )
      if (currentIndex < 0) return null
      return this.thresholds[currentIndex]
    },
    nextThreshold() {
      const currentIndex = this.thresholds.findIndex(
        (item) => item.label === this.vendor.rank
      )
      if (currentIndex < 0) return null
      if (
        this.thresholds.length > 0 &&
        currentIndex === this.thresholds.length - 1
      )
        return this.thresholds[currentIndex]
      return this.thresholds[currentIndex + 1]
    },
    ordersTillNext() {
      if (!this.nextThreshold) return 0
      else
        return Math.ceil(
          (this.nextThreshold.ending_ranking - this.vendor.current_points) /
            SUCCESSFUL_ORDER_REWARD
        )
    },
  },
  watch: {
    isOpen(val) {
      this.detailsMenu = val
    },
  },
  mounted() {
    this.getOrders()
    this.getCommissionThresholds()
  },
  methods: {
    orderBy(scope) {
      if (scope.column !== 'actions') {
        this.orderByDirection = this.reverseDirection(scope.column)
        this.orderByField = scope.column
        this.getOrders()
      }
    },
    reverseDirection(column) {
      return column === this.orderByField
        ? this.orderByDirection === 'asc'
          ? 'desc'
          : 'asc'
        : 'desc'
    },
    addMore() {
      if (this.total > this.ordersCount) {
        this.ordersCount += DETAILS_ORDER_COUNT
        this.getOrders()
      }
    },
    itemOutcome(item) {
      return item.commission ? item.commission.status : 'failed_auth'
    },
    getCommissionThresholds() {
      this.$axios
        .get('/commission-thresholds')
        .then((res) => {
          this.thresholds = res.data.data
        })
        .catch((err) => {
          this.logger.logToServer(err.response)
        })
    },
    getOrders() {
      this.loading = true
      this.$axios
        .get('/dashboard/vendor/orders', {
          params: {
            orders_count: this.ordersCount,
            order_by_column: this.orderByField,
            order_by_direction: this.orderByDirection,
          },
        })
        .then((res) => {
          this.orders = res.data.data.data
          this.total = res.data.data.total
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

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.gauge
  right: 0

.bottom-arrow
  height: 11px
  width: 12px

.sort-icon
  &.asc
    transform: rotate(180deg)
.overview-body
  margin-bottom: 50px

.image-bg
  width: 55px
  min-width: 55px
  height: 55px
  min-height: 55px
  border-radius: 100%
  background-color: $color-gray-44

  .medal-icon
    top: 25px

.read-more
  font-family: $font-family-sf-pro-display
  margin-bottom: 8px


::v-deep.orders-table
  margin-bottom: 0
  font-family: $font-family-sf-pro-display

  tr
    td
      padding: 13px 5px

    th
      border-top: none

.blue-color
  color: $color-blue-2

.blue-dark-color
  color: $color-blue-20

.gray-color
  color: $color-gray-5

.blue-color-link
  color: $color-blue-30

.menu-content
  font-family: $font-montserrat
.mr-120
  margin-right: 120px

.p-17
  padding: 17px

.max-128
  max-width: 128px

.mb-17
  margin-bottom: 17px

.mb-35
  margin-bottom: 35px

.px-11
  padding-inline: 11px

.overlay-card
  background: $color-white-1
  box-shadow: 10px 10px 84px rgba($color-black-1, 0.11)
  border-radius: 10px
  &.faq
    height: 51px

.close-icon
  top: 5px
  right: 5px

.menu-header
  background-color: $color-black-1
  height: 80px
  padding: 28px

.menu-body
  background-color: $color-gray-1
  padding: 28px

  .title
    margin-bottom: 18px
</style>
