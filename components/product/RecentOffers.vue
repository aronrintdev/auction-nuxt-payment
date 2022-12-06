<template>
  <div class="recent-offers-wrapper">
    <div class="table-wrapper">
      <b-overlay :opacity="0.85" blur="2px" :show="loading" rounded="sm">
        <b-table-simple class="table-recent-offers" fixed borderless>
          <b-tr>
            <b-th class="text-center">{{ $t('products.date_time') }}</b-th>
            <b-th class="text-center">{{ $tc('common.size', 1) }}</b-th>
            <b-th class="text-center">{{ $t('product_page.offers') }}</b-th>
          </b-tr>
          <b-tr v-for="(row, index) in offers" :key="`recent-offer-${index}`">
            <b-td class="text-center">
              <div>{{ row.created_at | formatDate('MM-DD-YYYY') }}</div>
              <div class="time">{{ row.created_at | formatTime(':') }}</div>
            </b-td>
            <b-td class="text-center">{{ row.size.size }}</b-td>
            <b-td class="text-center">{{ row.bid_price | toRoundedCurrency }}</b-td>
          </b-tr>
        </b-table-simple>
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
  position: relative

  .table-wrapper
    min-height: 300px
    max-height: 450px
    overflow-y: scroll

  .table-recent-offers
    width: 100%

    th
      @include body-8-normal
      color: $color-black-1

    td
      @include body-8-normal

      .time
        display: block
        color: $color-gray-4
</style>
