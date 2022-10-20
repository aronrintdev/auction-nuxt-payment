<template>
  <b-table
    class="productTable"
    borderless
    no-border-collapse
    :fields="fields"
    :items="items"
    tbody-tr-class="bg-white"
  >
    <template #cell(product)>
      <div class="d-flex align-items-center gap-2 mb-2 mb-sm-0">
        <div class="col-thumb">
          <ProductThumb />
        </div>
        <div>
          <h4
            class="font-secondary fw-6 fs-15 text-primary border-bottom border-primary mb-1 w-fit-content"
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
        </div>
      </div>
    </template>
    <template #cell(average_sale_price)="data">
      <div
        class="d-flex align-items-center justify-content-center tdHeight"
        :aria-label="$t('vendor_dashboard.avg_price')"
      >
        <h4 class="font-secondary fw-5 fs-16 mb-0">{{ data.value }}</h4>
      </div>
    </template>
    <template #cell(sales_this_month)="data">
      <div
        class="d-flex align-items-center justify-content-center tdHeight"
        :aria-label="$t('vendor_dashboard.sales_this_month')"
      >
        <h4 class="font-secondary fw-5 fs-16 mb-0">
          {{ data.value }} <span class="text-success text-sm">(+12.55%)</span>
        </h4>
      </div>
    </template>
    <template #cell(total_sales)="data">
      <div
        class="d-flex align-items-center justify-content-center tdHeight"
        :aria-label="$t('vendor_dashboard.total_sales')"
      >
        <h4 class="font-secondary fw-5 fs-16 mb-0">{{ data.value }}</h4>
      </div>
    </template>
    <template #cell(chart)>
      <div
        class="d-flex align-items-center justify-content-center tdHeight position-relative"
      >
        <LineChart
          :chart-data="datasets"
          :options="chartOptions"
          class="stats-graph"
        ></LineChart>
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
      // TODO dummy data
      fields: [
        {
          key: 'product',
          label: this.$t('vendor_dashboard.product'),
          sortable: true,
        },
        {
          key: 'average_sale_price',
          label: this.$t('vendor_dashboard.avg_price'),
          sortable: true,
          thClass: 'text-center',
        },
        {
          key: 'sales_this_month',
          label: this.$t('vendor_dashboard.sales_this_month'),
          sortable: true,
          thClass: 'text-center',
        },
        {
          key: 'total_sales',
          label: this.$t('vendor_dashboard.total_sales'),
          sortable: true,
          thClass: 'text-center',
        },
        {
          key: 'chart',
          label: '',
          sortable: false,
          tdClass: 'd-none d-sm-flex',
        },
      ],
      items: [
        {
          product: 40,
          average_sale_price: '$350',
          sales_this_month: '$360',
          total_sales: '$2350',
          chart: 4,
        },
        {
          product: 40,
          average_sale_price: '$350',
          sales_this_month: '$360',
          total_sales: '$2350',
          chart: 4,
        },
        {
          product: 40,
          average_sale_price: '$350',
          sales_this_month: '$360',
          total_sales: '$2350',
          chart: 4,
        },
        {
          product: 40,
          average_sale_price: '$350',
          sales_this_month: '$360',
          total_sales: '$2350',
          chart: 4,
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
.productTable
  &.table.b-table.b-table-no-border-collapse
    border-spacing: 0 10px
  thead th div
    font-family: $font-family-base
    font-size: 16px
    font-weight: 700
  tbody td
    height: 100px
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
  .col-thumb
    display: flex
    justify-content: center
    width: 100px
  .stats-graph
    width: 100px
    height: 40px
  @media (max-width: 576px)
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
        white-space: nowrap
        font-size: 12px
        color: $color-gray-6
        font-weight: $normal
        font-family: $font-family-base
    .tdHeight
      font-size: 12px
      color: $color-black-1
      font-weight: $bold
      width: 100%
      h4
        white-space: nowrap
        font-size: 12px
        color: $color-gray-6
        font-weight: $normal
      &::before
        content: attr(aria-label)
        margin-right: auto
        width: 100%
</style>
