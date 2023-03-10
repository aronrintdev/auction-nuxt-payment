<template>
  <div>
    <div
      v-if="!isScreenXS"
      class="d-flex align-items-center justify-content-between"
    >
      <h1 class="heading-1-bold mb-0 font-secondary">
        {{ $t('vendor_dashboard.orders') }}
      </h1>
      <NavGroup
        :data="menus"
        :value="activeNav"
        :class="mobileClass"
        class="nav-grp"
        @change="navItem"
      />
      <div class="d-flex justify-content-end align-items-center">
        <nuxt-link
          to="/orders"
          class="font-secondary fs-16 fw-400 text-decoration-underline text-link-blue-mobile mb-0 view-more-link"
          >{{ $t('vendor_dashboard.view_all') }}
        </nuxt-link>
      </div>
    </div>
    <div
      v-if="isScreenXS"
      class="d-flex align-items-center justify-content-between"
    >
      <div class="body-5-medium">
        {{ $t('vendor_dashboard.orders') }}
      </div>
      <nuxt-link
        class="font-secondary text-decoration-underline body-18-regular border-primary mb-0 text-link-blue-mobile"
        to="/orders"
        >{{ $t('vendor_dashboard.view_all') }}
      </nuxt-link>
    </div>
    <NavGroup
      v-if="isScreenXS"
      :data="mobileMenu"
      :value="activeNav"
      :class="mobileClass"
      class="mt-2 nav-grp"
      @change="navItem"
    />

    <div
      :class="{
        'my-5': !isScreenXS,
      }"
    >
      <b-table
        class="ordersTable"
        borderless
        no-border-collapse
        :fields="tableFields"
        :items="topOrders"
        tbody-tr-class="bg-white"
        :busy="loading"
        :show-empty="!loading && topOrders.length === 0"
      >
        <template #table-busy>
          <div class="d-flex align-items-center justify-content-center w-100">
            <Loader :loading="loading" />
          </div>
        </template>
        <template #head()="scope">
          <div
            v-if="scope.label"
            class="text-nowrap"
            role="button"
            @click="orderBy(scope)"
          >
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
                class="fw-6 fs-15 border-primary mb-1 text-nowrap text-truncate mw-170"
              >
                {{ data.item.listing_item.inventory.product.name }}
              </h4>
              <h4 class="font-secondary body-6-normal mb-0 text-secondary-6">
                {{ $t('vendor_dashboard.sku') }}:
                {{ data.item.listing_item.inventory.product.sku }}
              </h4>
              <h4
                :class="mobileClass"
                class="font-secondary body-6-normal mb-0 text-secondary-6 text-nowrap text-truncate mw-170"
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
            class="d-flex w-fit-content tdHeight"
            :class="{
              'flex-column mr-55': !isScreenXS,
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
              {{
                data.item.order.type.label === 'buy'
                  ? $t('common.shop')
                  : data.item.order.type.label
              }}
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
                'mw-101': !isScreenXS,
              }"
              class="font-secondary fw-5 fs-16 mb-0 text-primary text-center"
            >
              <div
                v-if="data.item.status === PROCESSING && !isScreenXS"
                class="d-flex align-items-center justify-content-center"
              >
                <img :src="require('~/assets/img/paper.svg')" />
              </div>
              <div
                v-if="data.item.status === PROCESSING"
                class="text-decoration-underline"
              >
                <a
                  href="#generate-label"
                  class="text-link-blue-mobile"
                  @click="generateLabel(data.item)"
                  >{{ $t('orders.print_shipping_label') }}
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
                  class="text-decoration-underline text-link-blue-mobile text-break"
                  target="_blank"
                  >{{ data.item.vendor_shipment.tracking_no }}</a
                >
              </span>
            </div>
          </div>
        </template>
      </b-table>
    </div>
  </div>
</template>
<script>
import ProductThumb from '~/components/product/Thumb.vue'
import NavGroup from '~/components/common/NavGroup.vue'
import screenSize from '~/plugins/mixins/screenSize'
import { AWAITING_SHIPMENT_TO_DEADSTOCK, PROCESSING } from '~/static/constants'
import Loader from '~/components/common/Loader'
import orderStatus from '~/plugins/mixins/order-status'

export default {
  name: 'TopOrdersTable',
  components: { Loader, NavGroup, ProductThumb },
  mixins: [screenSize, orderStatus],
  data() {
    return {
      PROCESSING,
      AWAITING_SHIPMENT_TO_DEADSTOCK,
      activeNav: '1',
      topOrders: [],
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
          label: this.$t('vendor_dashboard.product'),
          sortable: false,
          tdClass: 'product-img-cell',
          thClass: 'text-nowrap  body-4-bold',
        },
        {
          key: 'product',
          label: '',
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
      /** Todo need to make dynamic onces we have way of main categories in DB */
      menus: [
        { label: this.$t('vendor_dashboard.all'), value: '' },
        { label: this.$t('vendor_dashboard.footwear'), value: '1' },
        { label: this.$t('vendor_dashboard.apparel'), value: '2' },
        {
          label: this.$t('vendor_dashboard.accessories'),
          value: '3',
        },
      ],
    }
  },
  computed: {
    tableFields() {
      if (!this.isScreenXS) return this.fields
      else return this.swapElementTable()
    },
    mobileMenu() {
      return this.menus.filter((menu) => menu.value !== '')
    },
  },
  mounted() {
    this.getTopOrders()
  },
  methods: {
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
    // On Tab Change (All/ Footwear/ Apparel/ Accessories)
    navItem(val) {
      this.activeNav = val
      this.getTopOrders()
    },
    getTopOrders() {
      this.loading = true
      this.$axios
        .get('/dashboard/vendor/orders', {
          params: {
            category_id: this.activeNav,
            order_by_column: this.orderByField,
            order_by_direction: this.orderByDirection,
          },
        })
        .then((res) => {
          this.topOrders = res.data.data.data
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
.mr-55
  margin-right: 55px


.sort-icon
  &.asc
    transform: rotate(180deg)

::v-deep.nav-grp
  width: 460px
  &:not(.mobile)
    .btn-group
      height: 32px
      background-color: $color-gray-3
      button.btn
        &:not(.active)
          background-color: $color-gray-3

  &.mobile
    width: 343px
    margin-inline: auto
  .btn-group
    height: 36px
    button.btn
      @include body-6-regular
      font-family: $font-montserrat
      width: 103px
      padding-block: 1px
      &.active
        font-weight: $medium

.status
  &.mobile
    border: none
    box-shadow: none
    filter: none
    text-align: right

  &:not(.mobile)
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

.mw-101
  max-width: 101px

.mw-170
  max-width: 170px

  &.mobile
    max-width: 200px

.text-secondary-6
  color: $color-gray-6
  font-family: $font-sf-pro-text

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
</style>
