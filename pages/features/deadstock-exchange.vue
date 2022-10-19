<template>
  <FeatureContentWrapper
    :title="banner.title"
    :description="banner.description"
    :backgroundImage="banner.backgroundImage"
  >
    <FeatureTitle class="mb-6 text-center text-md-left">{{
      $tc('common.benefit', 2)
    }}</FeatureTitle>
    <b-row class="justify-content-between h-card-main mb-md-5">
      <b-col
        v-for="(item, index) in deadExchange"
        :key="index"
        lg="3"
        class="d-flex justify-content-center d-lg-block"
      >
        <FeatureCard
          :title="item.title"
          :description="item.description"
          :imageUrl="item.image"
        />
      </b-col>
    </b-row>

    <FeatureTitle class="mb-6">{{
      $t('features.deadstock_exchange.check_it_out')
    }}</FeatureTitle>

    <div class="graph-wrapper mx-auto w-100 mb-md-5">
      <img
        :src="
          require('~/assets/img/features/deadstock-exchange/sneaker-graph.png')
        "
        class="w-100"
      />
    </div>
    <div class="shopnow-banner">
      <ShopNowBanner
        :previousPage="$t('newest_features.sell.title')"
        :nextPage="$t('newest_features.buy.title')"
        :nextPageLink="'/features/bloclchain-authentication-ledger'"
        :previousPageLink="'/features/2fa-security'"
      />
    </div>
  </FeatureContentWrapper>
</template>
<script>
import { FeatureContentWrapper, FeatureTitle } from '~/components/feature'
import ShopNowBanner from '~/components/feature/ShopNowBanner'

export default {
  components: {
    FeatureContentWrapper,
    ShopNowBanner,
    FeatureTitle,
  },

  layout: 'IndexLayout',

  data() {
    return {
      deadExchange: [
        {
          title: this.$t(
            'newest_features.deadstock_exchange.analytics_on_current'
          ),
          description: this.$t(
            'newest_features.deadstock_exchange.analytics_on_current_desc'
          ),
          image: require('~/assets/img/features/newest-feature/deadstock-exchange/deadstockexchang.png'),
        },
        {
          title: this.$t('newest_features.deadstock_exchange.analytics_on_how'),
          description: this.$t(
            'newest_features.deadstock_exchange.analytics_on_how_desc'
          ),
          image: require('~/assets/img/features/newest-feature/deadstock-exchange/alyticshowtopri.png'),
        },
        {
          title: this.$t(
            'newest_features.deadstock_exchange.insights_on_value'
          ),
          description: this.$t(
            'newest_features.deadstock_exchange.insights_on_value_desc'
          ),
          image: require('~/assets/img/features/newest-feature/deadstock-exchange/deadstockexchanaly.png'),
        },
      ],
      banner: {
        title: 'features.deadstock_exchange.title',
        description: 'features.deadstock_exchange.desc',
        backgroundImage: require('@/assets/img/features/newest-feature/deadstock-exchange/deadstockexchangebbanner.png'),
      },
    }
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.features-container
  .graph-wrapper
    background: $color-white-1
    box-shadow: 0 1px 4px 0 rgba($color-black-1, 0.25)
    border-radius: 36px
    padding: 62px 99px
    max-width: 896px

@media (max-width: 576px)
  .features-container
    .graph-wrapper
      padding: 20px
</style>
