<template>
  <div class="p-0 pb-5">
    <HeroSection />
    <div class="container">
      <HomeNewReleases />
      <HomeShopByStyle />
      <HomeShopByBrand />
      <InstantShipping /> 
      <ShopByCategory />
      <AllTrades />
      <AllAuctions />
      <PriceTrends />
      <CurrentPromotions />
      <NewestFeatures />
    </div>
  </div>
</template>
<script>
import HeroSection from '~/components/homepage/HeroSection'
import HomeNewReleases from '~/components/homepage/NewReleases.vue'
import HomeShopByStyle from '~/components/homepage/ShopByStyle.vue'
import HomeShopByBrand from '~/components/homepage/ShopByBrand.vue'
import InstantShipping from '~/components/homepage/InstantShipping.vue'
import ShopByCategory from '~/components/homepage/ShopByCategory.vue'
import AllTrades from '~/components/homepage/AllTrades.vue'
import AllAuctions from '~/components/homepage/AllAuctions.vue'
import PriceTrends from '~/components/homepage/PriceTrends.vue'
import CurrentPromotions from '~/components/homepage/CurrentPromotions.vue'
import NewestFeatures from '~/components/homepage/NewestFeatures.vue'
export default {
  components: {
    HeroSection,
    HomeNewReleases,
    HomeShopByStyle,
    HomeShopByBrand,
    InstantShipping,
    ShopByCategory,
    AllTrades,
    AllAuctions,
    PriceTrends,
    CurrentPromotions,
    NewestFeatures,
  },
  layout: 'IndexLayout',
  fetchOnServer: false,
}
</script>
