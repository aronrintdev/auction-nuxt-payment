<template>
  <div class="homepage-container">
    <HomeBanner />
    <div class="content">
      <HomeNewReleases />
      <HomeShopByStyle />
      <HomeShopByBrand />
      <HomeBrowseAllTrades />
      <HomeBrowseAllAuctions />
      <HomeLatestPriceTrends />
      <HomeNewestFeatures />
      <HomeCurrentPromotions />
      <HomeShopAllStreetwear />
      <HomeFromOurSocials />
    </div>
  </div>
</template>
<script>
import HomeBanner from '~/components/homepage/Banner.vue'
import HomeNewReleases from '~/components/homepage/NewReleases.vue'
import HomeShopByStyle from '~/components/homepage/ShopByStyle.vue'
import HomeShopByBrand from '~/components/homepage/ShopByBrand.vue'
import HomeBrowseAllTrades from '~/components/homepage/BrowseAllTrades.vue'
import HomeBrowseAllAuctions from '~/components/homepage/BrowseAllAuctions.vue'
import HomeLatestPriceTrends from '~/components/homepage/LatestPriceTrends.vue'
import HomeNewestFeatures from '~/components/homepage/NewestFeatures.vue'
import HomeCurrentPromotions from '~/components/homepage/CurrentPromotions.vue'
import HomeShopAllStreetwear from '~/components/homepage/ShopAllStreetwear.vue'
import HomeFromOurSocials from '~/components/homepage/FromOurSocials.vue'

export default {
  components: {
    HomeBanner,
    HomeNewReleases,
    HomeShopByStyle,
    HomeShopByBrand,
    HomeBrowseAllTrades,
    HomeBrowseAllAuctions,
    HomeLatestPriceTrends,
    HomeNewestFeatures,
    HomeCurrentPromotions,
    HomeShopAllStreetwear,
    HomeFromOurSocials,
  },

  layout: 'IndexLayout',

  fetchOnServer: false,

  data() {
    return {}
  },
  methods: {},
}
</script>
<style lang="sass" scoped>
.homepage-container
  padding: 0

  .content
    padding: 0 89px
    max-width: 1440px
    margin-left: auto
    margin-right: auto

  @media (max-width: 830px)
    .content
      padding: 0 35px
</style>
