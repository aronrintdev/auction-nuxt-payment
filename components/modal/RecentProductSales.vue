<template>
  <Modal
    :id="id"
    hide-footer
    no-border
    @shown="onShown"
    @hidden="$emit('hidden')"
  >
    <template #header>
      <div class="d-flex flex-column">
        <div class="title">{{ $t('products.recent_sales_modal.title') }}</div>
        <div class="desc">
          {{ $t('products.recent_sales_modal.description') }}
        </div>
      </div>
    </template>
    <template #default>
      <div class="message-modal-content">
        <b-overlay :opacity="0.85" blur="2px" :show="loading" rounded="sm">
          <table class="table-recent-sales">
            <tr>
              <th>{{ $t('common.time_date') }}</th>
              <th>{{ $tc('common.size', 1) }}</th>
              <th>{{ $t('common.price') }}</th>
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
    </template>
  </Modal>
</template>
<script>
import Modal from '~/components/common/Modal.vue'

export default {
  name: 'RecentProductSalesModal',

  components: { Modal },

  props: {
    id: {
      type: String,
      default: 'recent-sales-modal',
    },
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

  methods: {
    async onShown() {
      this.loading = true
      this.sales = await this.$axios
        .get(`/products/${this.sku}/sales`, { params: { period: 'all' } })
        .then((res) => res.data?.current)
        .catch(() => {}) // error is handled in /plugins/axios.js
      this.loading = false
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'


.title
  @include heading-4
  font-weight: $bold
  color: $color-black-1

.desc
  @include body-4-normal
  color: $color-gray-4

.message-modal-content::v-deep
  text-align: left
  max-height: 500px
  overflow-y: scroll

  .table-recent-sales
    width: 100%

    th
      @include body-8-bold
      color: $color-black-1
      text-align: center
      padding: 12px 9px
      border-bottom: 1px solid $color-gray-47

    td
      @include body-8-normal
      text-align: center
      padding: 15px 3px
      border-bottom: 1px solid $color-gray-47

      .time
        color: $color-gray-4
</style>
