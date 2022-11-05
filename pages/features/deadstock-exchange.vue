<template>
  <div>
    <FeatureContentWrapper
      :title="banner.title"
      :description="banner.description"
      :backgroundImage="banner.backgroundImage"
      :backgroundImageSm="banner.backgroundImageSm"
      :shopNowDescription="shopNowBanner.shopNowDescription"
      :shopNowButtonText="shopNowBanner.shopNowButtonText"
      :previousPage="shopNowBanner.previousPage"
      :previousPageLink="shopNowBanner.previousPageLink"
      :nextPage="shopNowBanner.nextPage"
      :nextPageLink="shopNowBanner.nextPageLink"
    >
      <b-row
        class="justify-content-md-between justify-content-center h-card-main mb-md-5 w-100 mx-0"
      >
        <b-col
          v-for="(item, index) in csvBulkUplaod"
          :key="index"
          md="3"
          class="d-flex justify-content-center d-lg-block px-0"
        >
          <FeatureCard
            :title="item.title"
            :description="item.description"
            :imageUrl="item.image"
          />
        </b-col>
      </b-row>

      <FeatureTitle>{{
        $t('newest_features.deadstock_exchange.check_it_out')
      }}</FeatureTitle>

      <div class="text-center new-features mb-5">
        <img
          :src="
            require('~/assets/img/features/newest-feature/deadstock-exchange/statics.png')
          "
          class="img-fluid d-md-inline d-none"
        />
        <img
          :src="
            require('~/assets/img/features/newest-feature/deadstock-exchange/staticsmobile.png')
          "
          class="img-fluid d-md-none d-inline"
        />
      </div>
    </FeatureContentWrapper>
  </div>
</template>
<script>
import { FeatureContentWrapper, FeatureTitle } from '~/components/feature'
import FeatureCard from '~/components/feature/Card'

export default {
  components: {
    FeatureContentWrapper,
    FeatureCard,
    FeatureTitle,
  },

  layout: 'IndexLayout',

  data() {
    return {
      csvBulkUplaod: [
        {
          title: this.$t(
            'newest_features.deadstock_exchange.benefits.first_benefit_title'
          ),
          description: this.$t(
            'newest_features.deadstock_exchange.benefits.first_benefit_desc'
          ),
          image: require('~/assets/img/features/newest-feature/deadstock-exchange/deadstockexchang.png'),
        },
        {
          title: this.$t(
            'newest_features.deadstock_exchange.benefits.second_benefit_title'
          ),
          description: this.$t(
            'newest_features.deadstock_exchange.benefits.second_benefit_desc'
          ),
          image: require('~/assets/img/features/newest-feature/deadstock-exchange/alyticshowtopri.png'),
        },
        {
          title: this.$t(
            'newest_features.deadstock_exchange.benefits.third_benefit_title'
          ),
          description: this.$t(
            'newest_features.deadstock_exchange.benefits.third_benefit_desc'
          ),
          image: require('~/assets/img/features/newest-feature/deadstock-exchange/deadstockexchanaly.png'),
        },
      ],
      options: [
        {
          id: 'affirm',
          icon: require('~/assets/img/icons/affirm-black.svg'),
        },
        {
          id: 'afterpay',
          icon: require('~/assets/img/icons/afterpay.svg'),
        },
      ],
      banner: {
        title: 'newest_features.deadstock_exchange.feature_banner_title',
        description: 'newest_features.deadstock_exchange.feature_banner_desc',
        backgroundImage: require('@/assets/img/features/newest-feature/deadstock-exchange/deadstockexchangebbanner.svg'),
        backgroundImageSm: require('@/assets/img/features/newest-feature/deadstock-exchange/deadstockexchangemobile.svg'),
      },
      shopNowBanner: {
        shopNowDescription:
          'newest_features.deadstock_exchange.shop_now_banner.desc',
        shopNowButtonText:
          'newest_features.deadstock_exchange.shop_now_banner.button_text',
        previousPage: 'newest_features.2fa_security.title',
        previousPageLink: '/features/2fa-security',
        nextPage: 'newest_features.blockchain_authentication_ledger.title',
        nextPageLink: '/features/blockchain-authentication-ledger',
      },
    }
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.features-container
  .new-features img
    max-width: 837px !important
    width: 100% !important
@media (max-width: 768px)
  .features-container
    .new-features img
      padding: 0px 16px
</style>
