<template>
  <b-table
    class="ordersTable"
    borderless
    no-border-collapse
    :fields="fields"
    :items="items"
    tbody-tr-class="bg-white"
  >
    <template #cell(order_id)="data">
      <div class="d-flex align-items-center flex-column w-fit-content">
        <div class="col-thumb mb-1">
          <ProductThumb />
        </div>
        <div class="w-fit-content">
          <h4
            class="fw-7 fs-14 font-secondary border-bottom border-primary text-primary mb-0 mx-auto"
          >
            {{ data.value }}
          </h4>
        </div>
      </div>
    </template>
    <template #cell(product)>
      <div
        class="d-flex align-items-baseline justify-content-center flex-column tdHeight"
      >
        <h4
          class="font-secondary fw-6 fs-15 text-primary border-bottom border-primary mb-1"
        >
          <!-- TODO  -->
          Jordan 4 Retro (2021)
        </h4>
        <h4 class="font-secondary fs-14 fw-5 mb-0 text-gray-dark">
          {{ $t('vendor_dashboard.sku') }}: J-123456789
        </h4>
        <h4 class="font-secondary fs-14 fw-5 mb-0 text-gray-dark">
          {{ $t('vendor_dashboard.colorway') }}: University Blue
        </h4>
        <h4 class="font-secondary fs-14 fw-5 mb-0 text-gray-dark">
          {{ $t('vendor_dashboard.box_condition') }}: Excellent
        </h4>
      </div>
    </template>
    <template #cell(date_ordered)="data">
      <div class="d-flex align-items-center justify-content-center tdHeight">
        <h4 class="font-secondary fw-5 fs-16 mb-0">
          {{ data.value }}
        </h4>
      </div>
    </template>
    <template #cell(type)="data">
      <div class="d-flex align-items-center justify-content-center tdHeight">
        <h4 class="font-secondary fw-5 fs-16 mb-0">{{ data.value }}</h4>
      </div>
    </template>
    <template #cell(vendor_payout)="data">
      <div class="d-flex align-items-center justify-content-center tdHeight">
        <h4 class="font-secondary fw-5 fs-16 mb-0">{{ data.value }}</h4>
      </div>
    </template>
    <template #cell(status)>
      <div class="d-flex align-items-center justify-content-center tdHeight">
        <h4 class="status-badge-warning">
          {{ $t('vendor_dashboard.awaiting_shipment') }}
        </h4>
      </div>
    </template>
    <template #cell(actions)="data">
      <div class="d-flex align-items-center justify-content-center tdHeight">
        <h4 class="font-secondary fw-5 fs-16 mb-0 text-primary text-center">
          {{ $t('vendor_dashboard.fedex') }} <br />
          <span class="border-bottom border-primary"> {{ data.value }}</span>
        </h4>
      </div>
    </template>
  </b-table>
</template>
<script>
import ProductThumb from '~/components/product/Thumb.vue'
export default {
  name: 'TopProductsTable',
  components: { ProductThumb },
  data() {
    return {
      // TODO Dummy data
      fields: [
        {
          key: 'order_id',
          label: this.$t('vendor_dashboard.order_id'),
          sortable: true,
        },
        {
          key: 'product',
          label: this.$t('vendor_dashboard.product'),
          sortable: true,
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
    }
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
        height: 110px
    .tdHeight
        height: inherit
    .col-thumb
        display: flex
        justify-content: center
        width: 90px
    .stats-graph
        width: 100px
        height: 40px
</style>
