<template>
    <h1>{{ $t('sell.settings.title') }}</h1>
</template>

<script>
import { mapGetters } from 'vuex'

/*
  Settings tab of Sell page
 */
export default {
  name: 'SellSettings',
  // get current language
  computed: {
    ...mapGetters([
      'getLang'
    ])
  },
}
</script>