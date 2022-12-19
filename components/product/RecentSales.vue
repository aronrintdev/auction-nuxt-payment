<template>
  <div class="recent-sales-wrapper">
    <div class="table-wrapper">
      <b-overlay :opacity="0.85" blur="2px" :show="loading" rounded="sm">
        <table class="table-recent-sales">
          <tr>
            <th class="text-center">{{ $t('products.date_time') }}</th>
            <th class="text-center">{{ $tc('common.size', 1) }}</th>
            <th class="text-center">{{ $t('products.sales') }}&nbsp;&dollar;</th>
          </tr>
          <tr v-for="(row, index) in sales" :key="`recent-sale-${index}`">
            <td class="text-center">
              <div>{{ row.date | formatDate('MM-DD-YYYY') }}</div>
              <div class="time">{{ row.date | formatTime(':') }}</div>
            </td>
            <td class="text-center">{{ row.size }}</td>
            <td class="text-center">{{ row.sale_price | toRoundedCurrency }}</td>
          </tr>
        </table>
      </b-overlay>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProductRecentSales',
  props: {
    sku: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      loading: true,
      sales: [],
    }
  },

  async fetch() {
    this.loading = true
    this.sales = await this.$axios
      .get(`/products/${this.sku}/sales`, { params: { period: 'all' } })
      .then((res) => res.data?.current)
      .catch(() => {}) // error is handled in /plugins/axios.js
    this.loading = false
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.recent-sales-wrapper
  position: relative

  .table-wrapper
    min-height: 300px
    max-height: 450px
    overflow-y: scroll

  .table-recent-sales
    width: 100%

    th
      @include body-8-normal
      color: $color-black-1
      padding: 12px 9px

    td
      @include body-8-normal
      padding: 15px 3px

      .time
        display: block
        color: $color-gray-4
</style>
