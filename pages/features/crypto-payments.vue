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
      <FeatureTitle>
        {{ $t('newest_features.crypto_payments.we_accept') }}
      </FeatureTitle>
      <div class="coins-section">
        <div
          class="coin bit-coin d-flex flex-column align-items-center gap-2 justify-content-center"
        >
          <img
            src="~/assets/img/features/newest-feature/crypto-payments/coin1.png"
            alt=""
            class="img-fluid"
          />
          <p class="mb-0 fs-24 fw-6 font-primary">
            {{ $t('newest_features.crypto_payments.bitcoin') }}
          </p>
        </div>
        <div
          class="coin ethrium-coin d-flex flex-column align-items-center gap-2 justify-content-center"
        >
          <img
            src="~/assets/img/features/newest-feature/crypto-payments/coin2.png"
            alt=""
            class="img-fluid"
          />
          <p class="mb-0 fs-24 fw-6 font-primary">
            {{ $t('newest_features.crypto_payments.etherium') }}
          </p>
        </div>
        <div
          class="coin binance-coin d-flex flex-column align-items-center gap-2 justify-content-center"
        >
          <img
            src="~/assets/img/features/newest-feature/crypto-payments/coin3.png"
            alt=""
            class="img-fluid"
          />
          <p class="mb-0 fs-24 fw-6 font-primary">
            {{ $t('newest_features.crypto_payments.binance') }}
          </p>
        </div>
        <div
          class="coin vechain-coin d-flex flex-column align-items-center gap-2 justify-content-center"
        >
          <img
            src="~/assets/img/features/newest-feature/crypto-payments/coin4.png"
            alt=""
            class="img-fluid"
          />
          <p class="mb-0 fs-24 fw-6 font-primary">
            {{ $t('newest_features.crypto_payments.vechain') }}
          </p>
        </div>
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
        backgroundImage: require('@/assets/img/features/newest-feature/crypto-payments/crypto-payments-banner.png'),
        backgroundImageXS: require('@/assets/img/features/newest-feature/crypto-payments/crypto-payments-banner-xs.png'),
      },
      benefits: [
        {
          benefitImage: require('@/assets/img/features/newest-feature/crypto-payments/safe-and-secure-transactions.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/crypto-payments/safe-and-secure-transactions-xs.png'),
          benefitTitle:
            'newest_features.crypto_payments.benefits.first_benefit_title',
          benefitDescription:
            'newest_features.crypto_payments.benefits.first_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/crypto-payments/privacy.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/crypto-payments/privacy-xs.png'),
          benefitTitle:
            'newest_features.crypto_payments.benefits.second_benefit_title',
          benefitDescription:
            'newest_features.crypto_payments.benefits.second_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/crypto-payments/transactional-freedom.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/crypto-payments/transactional-freedom-xs.png'),
          benefitTitle:
            'newest_features.crypto_payments.benefits.third_benefit_title',
          benefitDescription:
            'newest_features.crypto_payments.benefits.third_benefit_desc',
        },
      ],
      bottomBanner: {
        bottomBannerImage: require('@/assets/img/features/newest-feature/crypto-payments/bottom-banner.png'),
        bottomBannerImageXS: require('@/assets/img/features/newest-feature/crypto-payments/bottom-banner-xs.png'),
        bottomBannerDescription:
          'newest_features.crypto_payments.bottom_banner.desc',
        bottomBannerDescriptionXS:
          'newest_features.crypto_payments.bottom_banner.desc_xs',
        bottomBannerButtonLink: '/browse',
        bottomBannerButtonText:
          'newest_features.crypto_payments.bottom_banner.button_text',
        previousPage:
          'newest_features.crypto_payments.bottom_banner.previous_page_title',
        previousPageXS:
          'newest_features.crypto_payments.bottom_banner.previous_page_xs_title',
        previousPageLink: '/features/shop-by-style',
        nextPage:
          'newest_features.crypto_payments.bottom_banner.next_page_title',
        nextPageXS:
          'newest_features.crypto_payments.bottom_banner.next_page_xs_title',
        nextPageLink: '/features/live-customer-service',
      },
      // weAccept: 'newest_features.we_accept',
      bitcoin: 'newest_features.crypto_payments.bitcoin',
      etherium: 'newest_features.crypto_payments.etherium',
      binance: 'newest_features.crypto_payments.binance',
      vechain: 'newest_features.crypto_payments.vechain',
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.coins-section
  display: grid
  width: 100%
  justify-content: center !important
  grid-template-columns: minmax(76px, 228px) minmax(76px, 228px) minmax(76px, 228px) minmax(76px, 228px)
  gap: 32px
  margin-bottom: 100px
  .coin
    background: white
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
    border-radius: 20px
    height: 218px

    img
      width: 100px
      height: auto
    p
      font-size: 28px
      line-height: 32px


@media (max-width: 768px)
  .coins-section
    width: 272px
    margin: 0 auto
    margin-bottom: 34px
    gap: 10px

    .coin
      gap: 5px
      height: 76px
      img
        width: 34px
    p
      font-size: 12px !important
      font-weight: 600
      line-height: 15px !important
</style>
