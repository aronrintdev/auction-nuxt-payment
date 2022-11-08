<template>
  <div>
    <div v-if="width > 500">
      <trade-banner-web></trade-banner-web>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TradeBanner',
  components: {
    tradeBannerWeb:()=>import('./TradeBannerWeb')
  },
  data(){
    return {
      width:'',
    }
  },
  mounted() {
    this.width = window.innerWidth
  },
}
</script>
