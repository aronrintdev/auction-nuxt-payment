<template>
    <h1>{{ $t('sell.orders.title') }}</h1>
</template>

<script>
import { mapGetters } from 'vuex'

/* 
  Orders tab of Sell page
 */
export default {
  name: 'SellOrders',
  // get current language
  computed: {
    ...mapGetters([
      'getLang'
    ])
  },
}
</script>