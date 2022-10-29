<template>
  <div class="recent-offers-wrapper">
    <div class="table-wrapper">
      <b-overlay :opacity="0.85" blur="2px" :show="loading" rounded="sm">
        <table class="table-recent-offers">
          <tr>
            <th>{{ $t('products.date_time') }}</th>
            <th>{{ $tc('common.size', 1) }}</th>
            <th>{{ $t('products.recent_offers_modal.offer_price') }}</th>
          </tr>
          <tr v-for="(row, index) in offers" :key="`recent-offer-${index}`">
            <td>
              <div>{{ row.created_at | formatDate('DD-MM-YYYY') }}</div>
              <div class="time">{{ row.created_at | formatTime(':') }}</div>
            </td>
            <td>{{ row.size.size }}</td>
            <td>{{ row.bid_price | toCurrency }}</td>
          </tr>
        </table>
      </b-overlay>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProductRecentOffers',

  props: {
    sku: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      loading: true,
      offers: [],
    }
  },

  async fetch() {
    this.loading = true
    this.offers = await this.$axios
      .get(`/products/${this.sku}/offers`)
      .then((res) => res.data)
      .catch(() => {}) // error is handled in /plugins/axios.js
    this.loading = false
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.recent-offers-wrapper
  padding-top: 24px
  position: relative

  .table-wrapper
    min-height: 300px
    max-height: 450px
    overflow-y: scroll

  .table-recent-offers
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
