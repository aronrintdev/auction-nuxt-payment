<template>
  <div class="position-relative recent-asks-wrapper">
    <div class="table-wrapper">
      <b-overlay :opacity="0.85" blur="2px" :show="loading" rounded="sm">
        <table class="w-100 table-recent-asks">
          <tr>
            <th class="text-center">{{ $t('products.date_time') }}</th>
            <th class="text-center">{{ $tc('common.size', 1) }}</th>
          </tr>
          <tr v-for="(row, index) in asks" :key="`recent-ask-${index}`">
            <td class="text-center">
              <div>{{ row.created_at | formatDate('DD-MM-YYYY') }}</div>
              <div class="time">{{ row.created_at | formatTime(':') }}</div>
            </td>
            <td class="text-center">{{ row.size.size }}</td>
          </tr>
        </table>
      </b-overlay>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProductRecentAsks',

  props: {
    sku: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      loading: true,
      asks: [],
    }
  },

  async fetch() {
    this.loading = true
    this.asks = await this.$axios
      .get(`/products/${this.sku}/requests`)
      .then((res) => res.data)
      .catch(() => {}) // error is handled in /plugins/axios.js
    this.loading = false
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.recent-asks-wrapper
  padding-top: 24px

  .table-wrapper
    min-height: 300px
    max-height: 450px
    overflow-y: scroll

  .table-recent-asks
    th
      @include body-8-bold
      color: $color-black-1
      padding: 12px 9px

    td
      @include body-8-normal
      padding: 15px 3px

      .time
        color: $color-gray-4
</style>
