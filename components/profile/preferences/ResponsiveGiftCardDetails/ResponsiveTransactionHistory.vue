<template>
  <div class="responsive-transaction-history">
    <TransactionHistoryCard 
      v-for="(transactions, index) in transactionHistory"
      id="history-card"
      :key="`history-${index}`"
      :history="transactions"
      class="mb-16"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TransactionHistoryCard from './TransactionHistoryCard.vue'
export default {
  name: 'ResponsiveTransactionHistory',

  components: {
    TransactionHistoryCard
  },

  computed: {
    ...mapGetters({
      getSelectedGiftCard: 'preferences/getSelectedGiftCard',
    }),

    transactionHistory: (vm) => {
      return vm.getSelectedGiftCard && vm.getSelectedGiftCard.transaction_history
    }
  },
}
</script>

<style lang="sass" scoped>
.responsive-transaction-history
  .mb-16
    margin-bottom: 16px
</style>