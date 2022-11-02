<template>
  <div>
    <div class="row my-5">
      <div class="col-6 col-md-3">
        <h1 class="heading-1-bold mb-0 heading font-secondary">
          {{ $t('vendor_dashboard.orders') }}
        </h1>
      </div>
      <div class="col-md-6 d-none d-sm-flex justify-content-center">
        <NavGroup :value="activeNav" :data="menus" @change="navItem" />
      </div>
      <div class="col-6 col-md-3 d-flex justify-content-end align-items-center">
        <nuxt-link
          to="/orders"
          class="font-secondary fs-16 fw-400 border-bottom border-primary mb-0 view-more-link"
          >{{ $t('vendor_dashboard.view_all') }}</nuxt-link
        >
      </div>
    </div>
    <div class="my-5">
      <b-table
        class="ordersTable"
        borderless
        no-border-collapse
        :fields="fields"
        :items="topOrders"
        tbody-tr-class="bg-white"
      >

        <template #cell(product)="data">
          <div
              class="d-flex align-items-center align-items-sm-baseline justify-content-center flex-sm-column gap-2 tdHeightSm mb-2 mb-sm-0"
              :class="mobileClass"
          >
            <div class="col-thumb d-flex d-sm-none">
              <ProductThumb
                :src="data.item.listing_item.inventory.product.image"
                :product="data.item.listing_item.inventory.product"
              />
            </div>
            <div>
              <h4
                  :class="{
                 'body-5-medium mobile': isScreenXS,
                  'font-secondary': !isScreenXS,
                }"
                  class="fw-6 fs-15 border-primary mb-1 text-nowrap text-truncate mw-300"
              >
                {{ data.item.listing_item.inventory.product.name }}
              </h4>
              <h4 class="font-secondary fs-13 fw-5 mb-0 text-secondary-6">
                {{ $t('vendor_dashboard.sku') }}:
                {{ data.item.listing_item.inventory.product.sku }}
              </h4>
              <h4 :class="mobileClass"
                  class="font-secondary fs-13 fw-5 mb-0 text-secondary-6 text-nowrap text-truncate mw-300">
                {{ $t('vendor_dashboard.colorway') }}:
                {{ data.item.listing_item.inventory.product.colorway }}
              </h4>
              <h4 class="font-secondary fs-13 fw-5 mb-0 text-secondary-6">
                {{ $t('vendor_dashboard.box_condition') }}:
                {{ data.item.listing_item.inventory.packaging_condition.name }}
              </h4>
            </div>
          </div>
        </template>
        <template #cell(order_id)="data">
          <div :aria-label="$t('vendor_dashboard.order_id')" class="d-flex align-items-center  w-fit-content tdHeight"
               role="button"
               @click="$router.push(`/orders/${orderId(data.item)}`)">
            <div v-if="!isScreenXS" class="col-thumb mb-1">
              <ProductThumb
                  :product="data.item.listing_item.inventory.product"
                  :src="data.item.listing_item.inventory.product.image"
              />
            </div>
            <h4
                class="fw-7 fs-14 font-secondary border-bottom border-primary text-primary mb-0 mx-auto"
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
            <h4 class="font-secondary fw-5 fs-16 mb-0">{{ data.item.order.type.label }}</h4>
          </div>
        </template>
        <template #cell(vendor_payout)="data">
          <div
            class="d-flex align-items-center justify-content-center tdHeight"
            :aria-label="$t('vendor_dashboard.vendor_payout')"
          >
            <h4 class="font-secondary fw-5 fs-16 mb-0">{{
                (data.item.commission ? data.item.commission : 0) | toCurrency
              }}</h4>
          </div>
        </template>
        <template #cell(status)="data">
          <div
              class="d-flex align-items-center justify-content-center tdHeight"
              :aria-label="$t('vendor_dashboard.status')"
          >
            <h4 :class="mobileClass" class="status-badge-warning text-capitalize">
              {{ data.item.status_label }}
            </h4>
          </div>
        </template>
        <template #cell(actions)="data">
          <div
              class="d-flex align-items-center justify-content-center tdHeight"
              :aria-label="$t('vendor_dashboard.actions')"
          >
            <h4 class="font-secondary fw-5 fs-16 mb-0 text-primary text-center">
              {{ $t('vendor_dashboard.fedex') }} <br />
              <span class="border-bottom border-primary">
                {{ data.value }}</span
              >
            </h4>
          </div>
        </template>
      </b-table>
    </div>
  </div>
</template>
<script>
import ProductThumb from '~/components/product/Thumb.vue'
import NavGroup from '~/components/common/NavGroup.vue'
import screenSize from '~/plugins/mixins/screenSize';
export default {
  name: 'TopOrdersTable',
  components: {NavGroup, ProductThumb},
  mixins: [screenSize],
  data() {
    return {
      // Active Nav for the Toggle Button
      activeNav: '',
      topOrders: [],
      statusColors: {
        'pending': 'orange',
        'processing': 'orange',
        'arrived_to_ds': 'green',
        'send_to_ds': 'purple',
        'processing_payment': '',
        'authenticated_and_shipped': '',
        'delivered': 'black',
        'cancelled': 'red',
        'shipped_and_auth': '',
        'multiple': ''
      },
      fields: [
        {
          key: 'order_id',
          label: this.$t('vendor_dashboard.order_id'),
          sortable: true,
          tdClass: 'product-img-cell ',
          thClass: ' body-4-bold',
        },
        {
          key: 'product',
          label: this.$t('vendor_dashboard.product'),
          sortable: true,
          tdClass: 'product-info-cell',
          thClass: 'body-4-bold',
        },
        {
          key: 'date_ordered',
          label: this.$t('vendor_dashboard.date_ordered'),
          sortable: true,
          thClass: 'text-center body-4-bold',
        },
        {
          key: 'type',
          label: this.$t('vendor_dashboard.type'),
          sortable: true,
          thClass: 'text-center body-4-bold',
        },
        {
          key: 'vendor_payout',
          label: this.$t('vendor_dashboard.vendor_payout'),
          sortable: true,
          thClass: 'text-center body-4-bold',
        },
        {
          key: 'status',
          label: this.$t('vendor_dashboard.status'),
          sortable: true,
          thClass: 'text-center body-4-bold',
        },
        {
          key: 'actions',
          label: this.$t('vendor_dashboard.actions'),
          sortable: false,
          thClass: 'text-center body-4-bold',
        },
      ],
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
  mounted() {
    this.getTopOrders()
  },
  methods: {
    orderId(order) {
      const length = order.order.items.length
      return `${order.order.order_id}${(length > 0 ? '-1' : '')}`
    },
    // On Tab Change (All/ Footwear/ Apparel/ Accessories)
    navItem(val) {
      this.activeNav = val
      this.getTopOrders()
    },
    getTopOrders() {
      this.$axios
          .get('/dashboard/vendor/orders?category_id=' + this.activeNav)
          .then((res) => {
            this.topOrders = res.data.data.data
        })
        .catch((err) => {
          this.logger.logToServer(err.response)
        })
    },
  },
}
</script>
<style lang="sass">
@import '~/assets/css/_variables'
.status-badge-warning
  &.mobile
    background-color: transparent
    padding: 0

.mw-300
  max-width: 300px

  &.mobile
    max-width: 200px

.text-secondary-6
  color: $color-gray-6
  font-family: $font-sf-pro-text

.ordersTable
  &.table.b-table.b-table-no-border-collapse
    border-spacing: 0 10px

  thead
    tr
      [aria-sort=none]
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='black' d='M51 1l25 23 24 22H1l25-22zM51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e") !important

      [aria-sort=descending]
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='black' d='M51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e") !important

      [aria-sort=ascending]
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='black' d='M51 1l25 23 24 22H1l25-22z'/%3e%3c/svg%3e") !important

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
      padding: 15px 0
      h4.font-secondary
        font-size: 12px
        color: $color-gray-6
        font-weight: $normal
        font-family: $font-family-base
    .tdHeight
      font-size: 12px
      color: $color-black-1
      font-weight: $bold
      width: 100%
      .status-badge
        background: none
        padding: 0
      h4
        font-size: 12px
        font-weight: $normal
        font-family: $font-family-base
        &:not(.status-badge)
          color: $color-gray-6
        &.actions
          display: flex
          column-gap: 6px
      &::before
        content: attr(aria-label)
        margin-right: auto
        width: 100%
</style>
