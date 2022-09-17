<template>
  <b-col cols class="transaction-details-col mt-5">
    <div class="transaction-history-heading">
      {{ $t('giftcard_section.transaction_history') }}&colon;
    </div>

    <div class="transction-details mt-3">
      <b-table-simple borderless responsive>
        <b-thead>
          <b-tr class="text-center vd-transaction-heading">
            <b-th scope="col" class="text-left">{{ $t('giftcard_section.transaction_table.order_id') }}</b-th>
            <b-th scope="col" class="text-center">{{ $t('giftcard_section.transaction_table.products') }}</b-th>
            <b-th scope="col" class="text-center">{{ $t('giftcard_section.transaction_table.date') }}</b-th>
            <b-th scope="col" class="text-center">{{ $t('giftcard_section.transaction_table.transaction') }}</b-th>
            <b-th scope="col" class="text-right">{{ $t('giftcard_section.transaction_table.balance') }}</b-th>
          </b-tr>
        </b-thead>

        <b-tbody>
           <b-tr v-for="(transaction, index) in transactionHistory" :key="index" class="text-center">
            <b-td class="text-left">{{ transaction.order.order_id }}</b-td>
            <b-td v-if="transaction.transaction_type === reload">
              <span class="text-bold">{{ $t('giftcard_section.add_funds') }}</span>
            </b-td>
            <b-td v-else></b-td>
            <b-td>{{ transaction.order.created_at | formatDate }}</b-td>
            <b-td>
              <span :class="[refund, reload].includes(transaction.transaction_type) && 'text-success'">
                {{ transaction.amount | toCurrency('USD', 'N/A') }}
                <span v-if="transaction.transaction_type === refund" class="text-normal">
                  {{ transaction.transaction_type }}
                </span>
              </span>
            </b-td>
            <b-td class="text-bold text-right">
              {{ transaction.balance | toCurrency('USD', 'N/A') }}
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </div>
  </b-col>
</template>

<script>
import { mapGetters } from 'vuex'
import { RELOAD, REFUND, ORDER } from '~/static/constants'
export default {
  name: 'TransactionHistory',

  data() {
    return {
      reload: RELOAD,
      refund: REFUND,
      order: ORDER
    }
  },

  computed: {
    ...mapGetters({
      selectedGiftCard: 'preferences/getSelectedGiftCard'
    }),

    transactionHistory: (vm) => {
      return vm.selectedGiftCard.transaction_history
    }
  },

  
}
</script>


<style lang="sass" scoped>
@import '~/assets/css/_variables'
.transaction-details-col
  .transaction-history-heading
    font-style: normal
    @include body-1-normal
    color: $color-black-1
  table
    thead
      tr
        border-bottom: 1px solid $color-black-1
    tbody
      tr
        border-bottom: 1px solid $color-gray-23
        padding: 35px 0
      td
        padding: 1.75rem

@media (min-width: 768px)
  .transaction-details-col
    flex: 0 0 100%
    max-width: 100%
@media (min-width: 425px)
  .transaction-details-col
    margin:3rem 0
@media (min-width: 375px) and (max-width: 425px)
  .transaction-details-col
    margin: 2rem 1rem
</style>