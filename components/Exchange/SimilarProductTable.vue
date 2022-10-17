<template>
    <table class="table trend-table-wrapper">
      <tbody>
        <tr
          v-for="(product, index) in products"
          :key="`product-${product.id}-trend`"
        >
          <td></td>
          <td class="col-no font-primary">{{ index + 1 }}</td>
          <td class="col-thumb">
            <div><ProductThumb :product="product" /></div>
          </td>
          <td class="col-product-detail">
            <div class="text-name font-primary">{{ product.name }}</div>
            <div class="text-color font-primary">{{ product.colorway }}</div>
          </td>
          <td class="col-price d-none d-sm-table-cell">
            {{ product.last_price | toCurrency }}
          </td>
          <td
            :class="`col-trend-${
              product.trend_24h >= 0 ? 'positive' : 'negative'
            }`"
            class="d-none d-sm-table-cell"
          >
            {{ product.trend_24h | toPercentage }}
          </td>
          <td
            :class="`col-trend-${
              product.trend_7d >= 0 ? 'positive' : 'negative'
            }`"
            class="d-none d-sm-table-cell"
          >
            {{ product.trend_7d | toPercentage }}
          </td>
          <td
            :class="`col-trend-${
              product.trend_30d >= 0 ? 'positive' : 'negative'
            }`"
            class="d-none d-sm-table-cell"
          >
            {{ product.trend_30d | toPercentage }}
          </td>
          <td class="col-graph d-none d-sm-table-cell">
            <LineChart
              :chart-data="product.last_7d_data"
              :options="chartOptions"
              class="trend-graph"
            ></LineChart>
          </td>
          <td class="d-table-cell d-sm-none text-right">
            <div class="col-price pricing font-primary">
              {{ product.last_price | toCurrency }}
            </div>
            <div
              class="font-primary pricing"
              :class="`col-trend-${
                product.trend_24h >= 0 ? 'positive' : 'negative'
              }`"
            >
              {{ product.trend_24h | toPercentage }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </template>
  <script>
  import ProductThumb from '~/components/product/Thumb.vue'
  export default {
    name: 'ProductTrendListCard',
    components: { ProductThumb },
    props: {
      products: {
        type: Array,
        default: () => {
          return [
            {
              id: 1,
              name: 'Yeezy Boost 350 V2',
              category: 'sneakers',
              sku: 'GY3438',
              colorway: 'Black & White',
              trend_24h: -10.5,
              trend_7d: -10.5,
              trend_30d: -12.5,
              last_price: 23000,
              last_7d_data: {
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
                    borderColor: '#d93730',
                    backgroundColor: null,
                    data: [0, 30, 200, 100, 280, 100, 400],
                    fill: false,
                    borderWidth: 2,
                  },
                ],
              },
            },
            {
              id: 2,
              name: 'Nike Dunk Low (2021)',
              category: 'sneakers',
              sku: 'DC6515-100',
              colorway: 'Sesame',
              trend_24h: 10.5,
              trend_7d: 10.5,
              trend_30d: 12.5,
              last_price: 23000,
              last_7d_data: {
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
                    borderColor: '#0bb63f',
                    backgroundColor: null,
                    data: [0, 30, 200, 100, 280, 100, 400],
                    fill: false,
                    borderWidth: 2,
                  },
                ],
              },
            },
            {
              id: 3,
              name: 'Jordan 4 Retro (2021)',
              category: 'sneakers',
              sku: 'CW6024-600',
              colorway: 'University Blue',
              trend_24h: -10.5,
              trend_7d: -10.5,
              trend_30d: -12.5,
              last_price: 23000,
              last_7d_data: {
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
                    borderColor: '#d93730',
                    backgroundColor: null,
                    data: [0, 30, 200, 100, 280, 100, 400],
                    fill: false,
                    borderWidth: 2,
                  },
                ],
              },
            },
            {
              id: 4,
              name: 'Jordan 4 Retro (2021)',
              category: 'sneakers',
              sku: 'CW6024-600',
              colorway: 'Plum',
              trend_24h: -10.5,
              trend_7d: -10.5,
              trend_30d: -12.5,
              last_price: 23000,
              last_7d_data: {
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
                    borderColor: '#d93730',
                    backgroundColor: null,
                    data: [0, 30, 200, 100, 280, 100, 400],
                    fill: false,
                    borderWidth: 2,
                  },
                ],
              },
            },
            {
              id: 5,
              name: 'Jordan 4 Retro (2021)',
              category: 'sneakers',
              sku: 'CW6024-600',
              colorway: 'Silver',
              trend_24h: -10.5,
              trend_7d: -10.5,
              trend_30d: -12.5,
              last_price: 23000,
              last_7d_data: {
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
                    borderColor: '#d93730',
                    backgroundColor: null,
                    data: [0, 30, 200, 100, 280, 100, 400],
                    fill: false,
                    borderWidth: 2,
                  },
                ],
              },
            },
          ]
        },
      },
    },
    data() {
      return {
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
      }
    },
  }
  </script>
  <style lang="sass" scoped>
  @import '~/assets/css/_variables'
  @import '~/assets/css/_typography'
  
  .trend-table-wrapper
    width: calc( 100% - 16px )
    margin: 0 auto
    tr
      border-top: 1px solid $color-gray-63
    thead tr td
      @include body-4-bold
      color: $color-black-1
      padding: 29px 3px
      border: none
    tbody
      tr td
        @include body-8-medium
        vertical-align: middle
        padding: 20px 3px
        border: none
  
      .col-no
        @include body-8-medium
        color: $color-black-1
  
      .col-thumb
        display: flex
        justify-content: center
        >div
          width: 106px
          height: 71px
          overflow: hidden
          display: flex
          align-items: center
          justify-content: center
        @media (max-width: 550px)
          padding: 4px 3px
          >div
            width: 80px
            justify-content: start
          .thumb-wrapper
            width: 62px
      .col-product-detail
        .text-name
          @include body-8-bold
          color: $color-black-1
        .text-color
          @include body-10-normal
          color: $color-gray-5
          margin-top: 1px
        @media (max-width: 550px)
          .text-name
            font-size: 11px
            font-weight: $bold
          .text-color
            color: $color-gray-74
            font-size: 11px
            font-weight: $normal
      .col-price
        color: $color-black-1
  
      .col-trend-positive
        color: $color-green-4
  
      .col-trend-negative
        color: $color-red-5
  
      .col-graph
        .trend-graph
          width: 96px
          height: 35px
    @media (max-width: 550px)
      .pricing
        font-size: 11px
        font-weight: $medium
  </style>
  