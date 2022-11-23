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
      <HorizontalBenefitBox
        v-for="(benefit, index) in benefits"
        :key="index"
        :benefitImage="benefit.benefitImage"
        :benefitImageXS="benefit.benefitImageXS"
        :benefitTitle="benefit.benefitTitle"
        :benefitDescription="benefit.benefitDescription"
      />
      <FeatureTitle class="feature-title-my">
        {{ $t('newest_features.blockchain_authentication_ledger.process') }}
      </FeatureTitle>
      <div class="d-flex cards-wrapper justify-content-center gap-6">
        <FeatureCardHoverableV2
          v-for="(item, index) in processes"
          :key="`process-${index}`"
          :icon="item.icon"
          :title="item.title"
          :description="item.description"
        />
      </div>
    </FeatureContentWrapper>
  </div>
</template>
<script>
import FeatureContentWrapper from '~/components/feature/ContentWrapper'
import HorizontalBenefitBox from '~/components/feature/HorizontalBenefitBox'
import FeatureTitle from '~/components/feature/Title'

export default {
  components: {
    FeatureContentWrapper,
    HorizontalBenefitBox,
    FeatureTitle,
  },

  layout: 'IndexLayout',

  data() {
    return {
      banner: {
        backgroundImage: require('@/assets/img/features/newest-feature/blockchain-authentication-ledger/blockchain-authentication-banner.jpg'),
        backgroundImageXS: require('@/assets/img/features/newest-feature/blockchain-authentication-ledger/blockchain-authentication-banner-xs.png'),
      },
      benefits: [
        {
          benefitImage: require('@/assets/img/features/newest-feature/blockchain-authentication-ledger/each-item-bought.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/blockchain-authentication-ledger/each-item-bought-xs.png'),
          benefitTitle:
            'newest_features.blockchain_authentication_ledger.benefits.first_benefit_title',
          benefitDescription:
            'newest_features.blockchain_authentication_ledger.benefits.first_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/blockchain-authentication-ledger/each-nfc-scan.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/blockchain-authentication-ledger/each-nfc-scan-xs.png'),
          benefitTitle:
            'newest_features.blockchain_authentication_ledger.benefits.second_benefit_title',
          benefitDescription:
            'newest_features.blockchain_authentication_ledger.benefits.second_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/blockchain-authentication-ledger/scan-nfc.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/blockchain-authentication-ledger/scan-nfc-xs.png'),
          benefitTitle:
            'newest_features.blockchain_authentication_ledger.benefits.third_benefit_title',
          benefitDescription:
            'newest_features.blockchain_authentication_ledger.benefits.third_benefit_desc',
        },
      ],
      bottomBanner: {
        bottomBannerImage: require('@/assets/img/features/newest-feature/blockchain-authentication-ledger/bottom-banner.png'),
        bottomBannerImageXS: require('@/assets/img/features/newest-feature/blockchain-authentication-ledger/bottom-banner-xs.png'),
        bottomBannerDescription:
          'newest_features.blockchain_authentication_ledger.bottom_banner.desc',
        bottomBannerDescriptionXS:
          'newest_features.blockchain_authentication_ledger.bottom_banner.desc_xs',
        bottomBannerButtonLink: '/browse',
        bottomBannerButtonText:
          'newest_features.blockchain_authentication_ledger.bottom_banner.button_text',
        previousPage:
          'newest_features.blockchain_authentication_ledger.bottom_banner.previous_page_title',
        previousPageXS:
          'newest_features.blockchain_authentication_ledger.bottom_banner.previous_page_xs_title',
        previousPageLink: '/features/deadstock-exchange',
        nextPage:
          'newest_features.blockchain_authentication_ledger.bottom_banner.next_page_title',
        nextPageXS:
          'newest_features.blockchain_authentication_ledger.bottom_banner.next_page_xs_title',
        nextPageLink: '/features/in-app-notifications',
      },
      processes: [
        {
          icon: require('~/assets/img/features/newest-feature/blockchain-authentication-ledger/tag.svg'),
          title: this.$t('common.scan'),
          description: this.$t(
            'features.blockchain_authentication_ledger.scan_desc'
          ),
        },
        {
          icon: require('~/assets/img/features/newest-feature/blockchain-authentication-ledger/eye-with-paper.png'),
          title: this.$t('vendor_purchase.view_details'),
          description: this.$t(
            'features.blockchain_authentication_ledger.view_details_desc'
          ),
        },
        {
          icon: require('~/assets/img/features/newest-feature/blockchain-authentication-ledger/network.svg'),
          title: this.$t('common.share'),
          description: this.$t(
            'features.blockchain_authentication_ledger.share_desc'
          ),
        },
      ],
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.features-container
  .cards-wrapper
    margin-bottom: 100px
@media (max-width: 768px)
  .features-container
    .cards-wrapper
      counter-reset: css-counter 0
      flex-direction: column
      align-items: center
      gap: 0px !important
      margin-bottom: 40px
      .feature-card-hoverableV2
        max-width: 343px
        width: 100%
        background-color: $color-white-1 !important
        box-shadow: 0 1px 4px 0 rgb(0 0 0 / 25%) !important
        border-radius: 10px

      > div:not(:last-child)
        margin: 0 0 22px 0
@media screen and (max-width: 577px)
  .features-container
    .feature-title-my
      margin-top: 48px !important
      margin-bottom: 24px !important
</style>
