<template>
  <MobileBottomSheet
      :height="`90%`"
      :open="isOpen"
      :title="''"
      @closed="$emit('closed')"
      @opened="$emit('opened')"
  >
    <template #subtitle>
      <div class="d-flex align-items-center justify-content-between w-100 px-4">
        <div class="d-flex flex-column">
          <div class="body-3-medium">
            {{ $t('vendor_dashboard.hi_name', [$auth.user.first_name]) }}
          </div>
          <div class="body-5-normal d-flex align-items-center color-gray-dark mt-12">
            {{ vendor.rank }} {{ $t('vendor_dashboard.seller') }}
            <!--            TODO make it dynamic when rank color design is ready-->
            <img
                :src="require(`~/assets/img/icons/${vendor.rank? vendor.rank.toLowerCase(): 'bronze'}-badge.svg`)"
                aria-hidden="true"
                class="ml-2"
                height="14px"
                width="14px"
            />
          </div>
        </div>

        <div class="d-flex flex-column align-items-end justify-content-end">
          <Button
              class="text-right"
              variant="link-blue-dark"
              @click="$emit('closed')"
          >
            {{ $t('common.done') }}
          </Button>
          <div v-if="currentThreshold" class="body-5-medium mt-12">
            {{ currentThreshold.percentage | toPercentage }} {{ $t('vendor_dashboard.seller_fee') }}
          </div>
        </div>
      </div>
    </template>


    <div class="p-4 d-flex flex-column h-100">
      <div class="d-flex flex-column">
        <div class="body-13-medium title text-black mb-17">
          {{ $t('vendor_dashboard.overview') }}
        </div>

        <div class="d-flex overview-body align-items-center justify-content-around color-gray">
          <div class="position-relative image-bg ">
            <!--            TODO make it dynamic when medal design is ready-->
            <img
                :src="require('~/assets/img/icons/silver-medal.svg')"
                aria-hidden="true"
                class="position-absolute medal-icon"
            />
          </div>
          <div v-if="nextThreshold" class="d-flex flex-column gray-color pl-3">
            <div class="body-13-medium ">
              {{ $t('vendor_dashboard.on_track', {rank: nextThreshold.label}) }}
            </div>
            <div class="body-5-normal mt-2">
              {{ $t('vendor_dashboard.next_sales', {next: ordersTillNext}) }}
            </div>
          </div>
        </div>

        <div class="d-flex align-items-center justify-content-center mt-22">
          <GaugeChart :max-height="150" :max-width="150" :radius="60" :stroke-width="'10'">
            <template #center>
              <div class="d-flex flex-column align-items-center justify-content-center h-100">
                <div class="heading-13">{{ vendor.current_points }}</div>
                <div class="body-18-bold gray-color">{{ $t('vendor_dashboard.seller_ranking') }}</div>
              </div>
            </template>
            <template #bottom>
              <div v-if="nextThreshold" class="d-flex body-9-medium blue-dark-color text-center">
                {{
                  $t('vendor_dashboard.till_next', {
                    point: nextThreshold.ending_ranking - vendor.current_points,
                    next: nextThreshold.label
                  })
                }}
              </div>
            </template>
          </GaugeChart>
        </div>
      </div>

      <div class="rest-data flex-grow-1 d-flex flex-column">
        <div class="body-13-medium title text-black mb-14">
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
            <template #cell(order_id)="data">
              <div class="text-decoration-underline blue-color-link">
                #{{ data.item.order.order_id }}
              </div>
            </template>

            <template #cell(product)="data">
              <div class="text-nowrap text-truncate max-128">
                {{ data.item.listing_item.inventory.product.name }}
              </div>
            </template>

            <template #cell(outcome)="data">
              <div class="text-nowrap text-truncate text-center">
                {{ $t(`vendor_dashboard.outcomes.${itemOutcome(data.item)}`) }}
              </div>
            </template>

            <template #cell(actions)="">

            </template>
            <template #head(actions)="">
              <!--              TODO will be added order score calc column-->
              <div></div>
            </template>
          </b-table>

          <div class="d-flex align-items-center justify-content-center blue-color-link body-9-normal read-more"
               role="button" @click="addMore">
            {{ $t('vendor_dashboard.view_more') }}
            <arrowBottomLong class="ml-2"/>
          </div>
        </div>

        <div class="body-5-regular mb-17 text-black faq-title">
          {{ $t('vendor_dashboard.faq_body') }}
        </div>
        <div class="overlay-card p-17 d-flex align-items-center justify-content-between mb-4"
             @click="$router.push('/faqs/vendor-hub')">
          <div class="body-9-medium blue-color text-nowrap">
            {{ $t('vendor_dashboard.faq_title') }}
          </div>
          <div>
            <arrowRightLong/>
          </div>
        </div>
      </div>
    </div>
  </MobileBottomSheet>
</template>

<script>
import arrowRightLong from '~/assets/img/icons/arrow-right-long-black.svg?inline'
import arrowBottomLong from '~/assets/img/icons/arrow-down-blue.svg?inline'
import Loader from '~/components/common/Loader';
import {DETAILS_ORDER_COUNT, SUCCESSFUL_ORDER_REWARD} from '~/static/constants/vendor-dashboard.js';
import MobileBottomSheet from '~/components/mobile/MobileBottomSheet';
import Button from '~/components/common/Button';
import GaugeChart from '~/components/profile/vendor-dashboard/GaugeChart';

export default {
  name: 'MobileVendorDetails',
  components: {GaugeChart, Button, MobileBottomSheet, arrowRightLong, arrowBottomLong, Loader},
  // components: {GaugeChart, Loader, SideOverlay, arrowBottomLong, closeIcon, arrowRightLong},
  props: {
    vendor: {
      type: Object,
      required: true
    },
    isOpen: {
      type: Boolean,
      default: false
    }
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
          sortable: true,
          tdClass: 'text-left text-nowrap',
        },
        {
          key: 'product',
          label: this.$t('vendor_dashboard.product'),
          sortable: true,
          tdClass: 'text-center',
        },
        {
          key: 'outcome',
          label: this.$t('vendor_dashboard.outcome'),
          sortable: true,
          thClass: 'text-center',
        },
        {
          key: 'actions',
          label: this.$t('vendor_dashboard.actions'),
          thClass: 'text-center',
        },
      ],
      detailsMenu: false,
      loading: false,
      thresholds: []
    }
  },
  computed: {
    currentThreshold() {
      const currentIndex = this.thresholds.findIndex(item => item.label === this.vendor.rank)
      if (currentIndex < 0)
        return null
      return this.thresholds[currentIndex]
    },
    nextThreshold() {
      const currentIndex = this.thresholds.findIndex(item => item.label === this.vendor.rank)
      if (currentIndex < 0)
        return null
      if (this.thresholds.length > 0 && currentIndex === this.thresholds.length - 1)
        return this.thresholds[currentIndex]
      return this.thresholds[currentIndex + 1]
    },
    ordersTillNext() {
      if (!this.nextThreshold)
        return 0
      else
        return Math.ceil((this.nextThreshold.ending_ranking - this.vendor.current_points) / SUCCESSFUL_ORDER_REWARD)
    }
  },
  watch: {
    isOpen(val) {
      this.detailsMenu = val
    }
  },
  mounted() {
    this.getOrders()
    this.getCommissionThresholds()
  },
  methods: {
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
              orders_count: this.ordersCount
            }
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
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~/assets/css/variables"

::v-deep.orders-table
  margin-bottom: 0
  font-family: $font-family-sf-pro-display

  tr
    td
      padding: 13px 4px

    th
      border-top: none

.faq-title
  margin-top: 31px

.rest-data
  background: $color-white-19
  border-radius: 8px 8px 0 0
  margin-inline: -24px
  padding: 16px 14px
  margin-top: 45px

.blue-color
  color: $color-blue-2

.max-128
  max-width: 128px

.blue-dark-color
  color: $color-blue-20

.mt-12
  margin-top: 12px

.mt-22
  margin-top: 22px

.px-11
  padding-inline: 11px

.mb-17
  margin-bottom: 17px

.mb-14
  margin-bottom: 14px

.p-17
  padding: 17px

.read-more
  font-family: $font-family-sf-pro-display
  margin-bottom: 8px

.color-gray-dark
  color: $color-gray-25

.color-gray
  color: $color-gray-5

.blue-color-link
  color: $color-blue-30

.image-bg
  width: 55px
  min-width: 55px
  height: 55px
  min-height: 55px
  border-radius: 100%
  background-color: $color-gray-th-44

  .medal-icon
    top: 25px

.overlay-card
  background: $color-white-1
  box-shadow: 10px 10px 84px rgba($color-black-1, 0.11)
  border-radius: 10px
</style>
