<template>
  <div>
    <div class="row my-5">
      <div class="col-6 col-md-3">
        <h1 class="font-secondary fs-24 fw-7 mb-0 heading">
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
        <template #cell(order_id)="data">
          <div class="d-flex align-items-center flex-column w-fit-content">
            <div class="col-thumb mb-1">
              <ProductThumb
                :src="data.item.listing_item.inventory.product.image"
                :product="data.item.listing_item.inventory.product"
              />
            </div>
            <div class="w-fit-content">
              <h4
                class="fw-7 fs-14 font-secondary border-bottom border-primary text-primary mb-0 mx-auto"
              >
                #{{ data.item.order_id }}
              </h4>
            </div>
          </div>
        </template>
        <template #cell(product)="data">
          <div
            class="d-flex align-items-center align-items-sm-baseline justify-content-center flex-sm-column gap-2 tdHeightSm mb-2 mb-sm-0"
          >
            <div class="col-thumb d-flex d-sm-none">
              <ProductThumb
                :src="data.item.listing_item.inventory.product.image"
                :product="data.item.listing_item.inventory.product"
              />
            </div>
            <div>
              <h4
                class="font-secondary fw-6 fs-15 text-primary border-bottom border-primary mb-1"
              >
                {{ data.item.listing_item.inventory.product.name }}
              </h4>
              <h4 class="font-secondary fs-14 fw-5 mb-0 text-gray-dark">
                {{ $t('vendor_dashboard.sku') }}:
                {{ data.item.listing_item.inventory.product.sku }}
              </h4>
              <h4 class="font-secondary fs-14 fw-5 mb-0 text-gray-dark">
                {{ $t('vendor_dashboard.colorway') }}:
                {{ data.item.listing_item.inventory.product.colorway }}
              </h4>
              <h4 class="font-secondary fs-14 fw-5 mb-0 text-gray-dark">
                {{ $t('vendor_dashboard.box_condition') }}:
                {{ data.item.listing_item.inventory.packaging_condition.name }}
              </h4>
            </div>
          </div>
        </template>
        <template #cell(date_ordered)="data">
          <div
            class="d-flex align-items-center justify-content-center tdHeight"
            :aria-label="$t('vendor_dashboard.date_ordered')"
          >
            <h4 class="font-secondary fw-5 fs-16 mb-0">
              {{ data.item.created_at }}
            </h4>
          </div>
        </template>
        <template #cell(type)="data">
          <div
            class="d-flex align-items-center justify-content-center tdHeight"
            :aria-label="$t('vendor_dashboard.type')"
          >
            <h4 class="font-secondary fw-5 fs-16 mb-0">{{ data.value }}</h4>
          </div>
        </template>
        <template #cell(vendor_payout)="data">
          <div
            class="d-flex align-items-center justify-content-center tdHeight"
            :aria-label="$t('vendor_dashboard.vendor_payout')"
          >
            <h4 class="font-secondary fw-5 fs-16 mb-0">{{ data.value }}</h4>
          </div>
        </template>
        <template #cell(status)="data">
          <div
            class="d-flex align-items-center justify-content-center tdHeight"
            :aria-label="$t('vendor_dashboard.status')"
          >
            <h4 class="status-badge-warning">
              {{ data.item.status }}
            </h4>
          </div>
        </template>
        <template #cell(actions)="data">
          <div
            class="d-flex align-items-center justify-content-center tdHeight"
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
export default {
  name: 'TopOrdersTable',
  components: { NavGroup, ProductThumb },
  data() {
    return {
      // Active Nav for the Toggle Button
      activeNav: '',
      topOrders: [],
      // TODO Dummy data
      fields: [
        {
          key: 'order_id',
          label: this.$t('vendor_dashboard.order_id'),
          sortable: true,
          tdClass: 'product-img-cell d-none d-sm-flex',
        },
        {
          key: 'product',
          label: this.$t('vendor_dashboard.product'),
          sortable: true,
          tdClass: 'product-info-cell',
        },
        {
          key: 'date_ordered',
          label: this.$t('vendor_dashboard.date_ordered'),
          sortable: true,
          thClass: 'text-center',
        },
        {
          key: 'type',
          label: this.$t('vendor_dashboard.type'),
          sortable: true,
          thClass: 'text-center',
        },
        {
          key: 'vendor_payout',
          label: this.$t('vendor_dashboard.vendor_payout'),
          sortable: true,
          thClass: 'text-center',
        },
        {
          key: 'status',
          label: this.$t('vendor_dashboard.status'),
          sortable: true,
          thClass: 'text-center',
        },
        {
          key: 'actions',
          label: this.$t('vendor_dashboard.actions'),
          sortable: true,
          thClass: 'text-center',
        },
      ],
      items: [
        {
          order_id: '#123456-2',
          product: 'product',
          date_ordered: '10/08/2021',
          type: 'Buy',
          vendor_payout: '$2350',
          status: 'Awaiting Shipping',
          actions: '103932827178746',
        },
        {
          order_id: '#123456-2',
          product: 'product',
          date_ordered: '10/08/2021',
          type: 'Buy',
          vendor_payout: '$2350',
          status: 'Awaiting Shipping',
          actions: '103932827178746',
        },
        {
          order_id: '#123456-2',
          product: 'product',
          date_ordered: '10/08/2021',
          type: 'Buy',
          vendor_payout: '$2350',
          status: 'Awaiting Shipping',
          actions: '103932827178746',
        },
        {
          order_id: '#123456-2',
          product: 'product',
          date_ordered: '10/08/2021',
          type: 'Buy',
          vendor_payout: '$2350',
          status: 'Awaiting Shipping',
          actions: '103932827178746',
        },
      ],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              type: 'time',
              offset: false,
              time: {
                unit: 'day',
              },
              gridLines: {
                display: false,
                drawBorder: false,
              },
              scaleLabel: {
                display: false,
              },
              ticks: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              offset: false,
              gridLines: {
                display: false,
                drawBorder: false,
              },
              scaleLabel: {
                display: false,
              },
              ticks: {
                display: false,
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
      datasets: {
        labels: [
          new Date('2022-2-8 03:24:00'),
          new Date('2022-2-9 03:24:00'),
          new Date('2022-2-10 03:24:00'),
          new Date('2022-2-11 03:24:00'),
          new Date('2022-2-12 03:24:00'),
          new Date('2022-2-13 03:24:00'),
          new Date('2022-2-14 03:24:00'),
        ],
        datasets: [
          {
            borderColor: '#18A0FB',
            backgroundColor: null,
            data: [0, 30, 200, 100, 280, 100, 400],
            fill: false,
            borderWidth: 2,
          },
        ],
      },
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
.ordersTable
  &.table.b-table.b-table-no-border-collapse
    border-spacing: 0 10px
  thead th div
    font-family: $font-family-base
    font-size: 16px
    font-weight: 700
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
