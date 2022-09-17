<template>
  <h1>{{ $t('sell.summary.title') }}</h1>
</template>

<script>
import { mapGetters } from 'vuex'

/*
  Summary tab of Sell page
 */
export default {
  name: 'SellSummary',
  // get current language
  computed: {
    ...mapGetters([
      'getLang'
    ])
  },
}
</script>