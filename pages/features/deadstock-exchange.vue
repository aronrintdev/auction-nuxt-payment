<template>
  <div>
    <FeatureContentWrapper
      :backgroundImage="banner.backgroundImage"
      :backgroundImageXS="banner.backgroundImageXS"
      :bottomBannerImage="bottomBanner.bottomBannerImage"
      :bottomBannerImageXS="bottomBanner.bottomBannerImageXS"
      :bottomBannerDescription="bottomBanner.bottomBannerDescription"
      :bottomBannerDescriptionXS="bottomBanner.bottomBannerDescriptionXS"
      :bottomBannerButtonLink="bottomBanner.bottomBannerButtonLink"
      :bottomBannerButtonText="bottomBanner.bottomBannerButtonText"
      :previousPage="bottomBanner.previousPage"
      :previousPageXS="bottomBanner.previousPageXS"
      :previousPageLink="bottomBanner.previousPageLink"
      :nextPage="bottomBanner.nextPage"
      :nextPageXS="bottomBanner.nextPageXS"
      :nextPageLink="bottomBanner.nextPageLink"
    >
      <b-row class="justify-content-center h-card-main">
        <b-col
          v-for="(item, index) in csvBulkUplaod"
          :key="index"
          md="3"
          class="d-flex justify-content-center d-lg-block h-card-column px-0"
        >
          <FeatureCard
            :title="item.title"
            :description="item.description"
            :imageUrl="item.image"
            :resImageUrl="item.responsiveImage"
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
          responsiveImage: require('~/assets/img/features/newest-feature/deadstock-exchange/mobile-deadstockexchange.png'),
        },
        {
          title: this.$t(
            'newest_features.deadstock_exchange.benefits.second_benefit_title'
          ),
          description: this.$t(
            'newest_features.deadstock_exchange.benefits.second_benefit_desc'
          ),
          image: require('~/assets/img/features/newest-feature/deadstock-exchange/alyticshowtopri.png'),
          responsiveImage: require('~/assets/img/features/newest-feature/deadstock-exchange/mobile-deadstockexchjangeanalyticshowtoprice.png'),
        },
        {
          title: this.$t(
            'newest_features.deadstock_exchange.benefits.third_benefit_title'
          ),
          description: this.$t(
            'newest_features.deadstock_exchange.benefits.third_benefit_desc'
          ),
          image: require('~/assets/img/features/newest-feature/deadstock-exchange/deadstockexchanaly.png'),
          responsiveImage: require('~/assets/img/features/newest-feature/deadstock-exchange/mobile-deadstockexchangeanalytics.png'),
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
        backgroundImage: require('@/assets/img/features/newest-feature/deadstock-exchange/deadstock-exchange-banner.png'),
        backgroundImageXS: require('@/assets/img/features/newest-feature/deadstock-exchange/deadstock-exchange-banner-xs.png'),
      },
      bottomBanner: {
        bottomBannerImage: require('@/assets/img/features/newest-feature/deadstock-exchange/bottom-banner.png'),
        bottomBannerImageXS: require('@/assets/img/features/newest-feature/deadstock-exchange/bottom-banner-xs.png'),
        bottomBannerDescription:
          'newest_features.deadstock_exchange.bottom_banner.desc',
        bottomBannerDescriptionXS:
          'newest_features.deadstock_exchange.bottom_banner.desc_xs',
        bottomBannerButtonLink: '/deadstock-exchange',
        bottomBannerButtonText:
          'newest_features.deadstock_exchange.bottom_banner.button_text',
        previousPage:
          'newest_features.deadstock_exchange.bottom_banner.previous_page_title',
        previousPageXS:
          'newest_features.deadstock_exchange.bottom_banner.previous_page_xs_title',
        previousPageLink: '/features/2fa-security',
        nextPage:
          'newest_features.deadstock_exchange.bottom_banner.next_page_title',
        nextPageXS:
          'newest_features.deadstock_exchange.bottom_banner.next_page_xs_title',
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
