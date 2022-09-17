<template>
  <div class="trend-list-card-wrapper">
    <div class="section-header">
      <div class="header">
        <img :src="icon" :alt="title" />
        {{ title }}
      </div>
      <Button variant="link">{{ $t('common.more') }} ></Button>
    </div>
    <table class="section-table">
      <tr v-for="(product, index) in products" :key="`${title}-${product.id}`">
        <td class="col-no">{{ index + 1 }}</td>
        <td class="col-thumb">
          <div><ProductThumb :product="product" /></div>
        </td>
        <td>
          <div class="col-name">{{ product.name }}</div>
          <div class="col-color">{{ product.colorway }}</div>
        </td>
        <td
          :class="
            product.trend >= 0 ? 'col-stat-positive' : 'col-stat-negative'
          "
        >
          {{ Math.abs(product.trend) }}%
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import Button from '~/components/common/Button.vue'
import ProductThumb from '~/components/product/Thumb.vue'

export default {
  name: 'ProductTrendListCard',

  components: { Button, ProductThumb },

  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    products: {
      type: Array,
      default: () => {
        return [
          {
            id: 1,
            name: 'Yeezy Boost 350 V2',
            category: 'sneakers',
            sku: 'GY3438',
            trend: 10.5,
            colorway: 'Sesame',
          },
          {
            id: 2,
            name: 'Nike Dunk Low (2021)',
            category: 'sneakers',
            sku: 'DC6515-100',
            trend: -10.5,
            colorway: 'Grey',
          },
          {
            id: 3,
            name: 'Jordan 4 Retro (2021)',
            category: 'sneakers',
            sku: 'CW6024-600',
            trend: -22.5,
            colorway: 'Orange',
          },
        ]
      },
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.trend-list-card-wrapper
  border: 1px solid $color-gray-32
  border-radius: 5px
  padding: 13px 15px

  .section-header
    display: flex
    justify-content: space-between

    .header
      @include body-8-bold
      color: $color-black-1
      display: flex
      align-items: center

      img
        width: 25px
        height: 25px
        margin-right: 14px

    button
      @include body-5-medium
      color: $color-gray-30

  .section-table
    width: 100%
    margin-top: 10px

    tr
      td
        vertical-align: middle

      .col-no
        @include body-8-normal
        color: $color-black-1

      .col-thumb
        >div
          width: 93px
          height: 56px
          padding: 0 10px
          display: flex
          align-items: center
          justify-content: center
          overflow: hidden

      .col-name
        @include body-9-bold
        color: $color-black-1

      .col-color
        @include body-9-normal
        color: $color-gray-5
        margin-top: 5px

      .col-stat-positive
        @include body-5-bold
        color: $color-green-3

        &::before
          display: inline-block
          margin-left: 0.255em
          vertical-align: 0.255em
          content: ""
          border-top: 0
          border-right: 0.3em solid transparent
          border-bottom: 0.3em solid
          border-left: 0.3em solid transparent

      .col-stat-negative
        @include body-5-bold
        color: $color-red-4

        &::before
          display: inline-block
          margin-left: 0.255em
          vertical-align: 0.255em
          content: ""
          border-top: 0.3em solid
          border-right: 0.3em solid transparent
          border-bottom: 0
          border-left: 0.3em solid transparent
</style>
