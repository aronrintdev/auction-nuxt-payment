<template>
  <div>
    <div v-if="width<= 500">
      <trade-banner-mobile></trade-banner-mobile>
    </div>
    <div v-else>
      <trade-banner-web></trade-banner-web>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TradeBanner',
  data(){
    return {
      width:'',
    }
  },
  components: {
    tradeBannerMobile:()=> import('./TradeBannerMobile'),
    tradeBannerWeb:()=>import('./TradeBannerWeb'),
  },
  mounted() {
    this.width = window.innerWidth
  },
}
</script>
