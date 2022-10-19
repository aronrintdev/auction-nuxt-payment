<template>
    <div>
      <div v-if="width<= 500">
        <browseTradeMobile></browseTradeMobile>
      </div>
      <div v-else>
        <browseTradeWeb></browseTradeWeb>
      </div>
    </div>
  </template>

<script>

export default {
  name: 'BrowseTrade',
  components: {
    browseTradeMobile:()=> import('././BrowseTradeMobile'),
    browseTradeWeb:()=>import('././BrowseTradeWeb'),
  },
  layout: 'IndexLayout',
  data() {
    return {
        width:'',
      }
  },

  computed: {},
  mounted() {
    this.width = window.innerWidth
  },
  methods: {}
}
</script>
<style lang="sass" scoped>
</style>
