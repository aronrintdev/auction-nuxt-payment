<template>
  <div class="recent-sales-wrapper">
    <div class="table-wrapper">
      <b-overlay :opacity="0.85" blur="2px" :show="loading" rounded="sm">
        <table class="table-recent-sales">
          <tr>
            <th>{{ $t('products.date_time') }}</th>
            <th>{{ $tc('common.size', 1) }}</th>
            <th>{{ $t('products.sales') }}&nbsp;&dollar;</th>
          </tr>
          <tr v-for="(row, index) in sales" :key="`recent-sale-${index}`">
            <td>
              <div>{{ row.date | formatDate('DD-MM-YYYY') }}</div>
              <div class="time">{{ row.date | formatTime(':') }}</div>
            </td>
            <td>{{ row.size }}</td>
            <td>{{ row.sale_price | toCurrency }}</td>
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
  padding-top: 24px
  position: relative

  .table-wrapper
    min-height: 300px
    max-height: 450px
    overflow-y: scroll

  .table-recent-sales
    width: 100%

    th
      @include body-8-bold
      color: $color-black-1
      text-align: center
      padding: 12px 9px

    td
      @include body-8-normal
      text-align: center
      padding: 15px 3px

      .time
        color: $color-gray-4
</style>
