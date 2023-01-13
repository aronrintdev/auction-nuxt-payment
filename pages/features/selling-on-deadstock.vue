<template>
  <div class="selling-on-deadstock-main">
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
          v-for="(item, index) in sellingCard"
          :key="index"
          lg="3"
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

      <div class="selling-on-second-title">
        <FeatureTitle class="feature-title-my">
          {{ $t('newest_features.selling_on_deadstock.process') }}
        </FeatureTitle>
      </div>

      <div
        class="d-flex justify-content-center cards-wrapper-selling mb-3 mb-md-5"
      >
        <FeatureCardHoverable
          :icon="
            require('~/assets/img/features/newest-feature/selling-on-deadstock/plus.svg')
          "
          :title="$t('features.selling.create_listing')"
          :description="$t('features.selling.create_listing_desc')"
        />

        <FeatureCardHoverable
          :icon="
            require('~/assets/img/features/newest-feature/selling-on-deadstock/mark.svg')
          "
          :title="$t('features.selling.sell_items')"
          :description="$t('features.selling.sell_items_desc')"
        />
      </div>

      <div
        class="d-flex justify-content-center cards-wrapper-selling margin-bottom-class"
      >
        <FeatureCardHoverable
          :icon="
            require('~/assets/img/features/newest-feature/selling-on-deadstock/Truck-Icon.svg')
          "
          :title="$t('features.selling.ship_items')"
          :description="$t('features.selling.ship_items_desc')"
        />

        <FeatureCardHoverable
          :icon="
            require('~/assets/img/features/newest-feature/selling-on-deadstock/money-hand.svg')
          "
          :title="$t('features.selling.earn_commission')"
          :description="$t('features.selling.earn_commission_desc')"
        />
      </div>
    </FeatureContentWrapper>
  </div>
</template>
<script>
import FeatureCardHoverable from '~/components/feature/CardHoverable'
import FeatureCard from '~/components/feature/Card'
import FeatureContentWrapper from '~/components/feature/ContentWrapper'
import FeatureTitle from '~/components/feature/Title'

export default {
  components: {
    FeatureCard,
    FeatureCardHoverable,
    FeatureContentWrapper,
    FeatureTitle,
  },

  layout: 'IndexLayout',

  data() {
    return {
      sellingCard: [
        {
          title: this.$t(
            'newest_features.selling_on_deadstock.benefits.first_benefit_title'
          ),
          description: this.$t(
            'newest_features.selling_on_deadstock.benefits.first_benefit_desc'
          ),
          image: require('~/assets/img/features/newest-feature/selling-on-deadstock/newest-money.png'),
          responsiveImage: require('~/assets/img/features/newest-feature/selling-on-deadstock/mobile-money.png'),
        },
        {
          title: this.$t(
            'newest_features.selling_on_deadstock.benefits.second_benefit_title'
          ),
          description: this.$t(
            'newest_features.selling_on_deadstock.benefits.second_benefit_desc'
          ),
          image: require('~/assets/img/features/newest-feature/selling-on-deadstock/low-fee.png'),
          responsiveImage: require('~/assets/img/features/newest-feature/selling-on-deadstock/mobile-lowfee.png'),
        },
        {
          title: this.$t(
            'newest_features.selling_on_deadstock.benefits.third_benefit_title'
          ),
          description: this.$t(
            'newest_features.selling_on_deadstock.benefits.third_benefit_desc'
          ),
          image: require('~/assets/img/features/newest-feature/selling-on-deadstock/free-shipping.png'),
          responsiveImage: require('~/assets/img/features/newest-feature/selling-on-deadstock/mobile-upstrucknologo.png'),
        },
      ],
      banner: {
        backgroundImage: require('@/assets/img/features/newest-feature/selling-on-deadstock/selling-on-deadstock-banner.png'),
        backgroundImageXS: require('@/assets/img/features/newest-feature/selling-on-deadstock/selling-on-deadstock-banner-xs.png'),
      },
      bottomBanner: {
        bottomBannerImage: require('@/assets/img/features/newest-feature/selling-on-deadstock/bottom-banner.png'),
        bottomBannerImageXS: require('@/assets/img/features/newest-feature/selling-on-deadstock/bottom-banner-xs.png'),
        bottomBannerDescription:
          'newest_features.selling_on_deadstock.bottom_banner.desc',
        bottomBannerDescriptionXS:
          'newest_features.selling_on_deadstock.bottom_banner.desc_xs',
        bottomBannerButtonLink: '/apply',
        bottomBannerButtonText:
          'newest_features.selling_on_deadstock.bottom_banner.button_text',
        previousPage:
          'newest_features.selling_on_deadstock.bottom_banner.previous_page_title',
        previousPageXS:
          'newest_features.selling_on_deadstock.bottom_banner.previous_page_xs_title',
        previousPageLink: '/features/buying',
        nextPage:
          'newest_features.selling_on_deadstock.bottom_banner.next_page_title',
        nextPageXS:
          'newest_features.selling_on_deadstock.bottom_banner.next_page_xs_title',
        nextPageLink: '/features/trading',
      },
    }
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.features-container
  .feature-content
    .process-box
      width: 360px !important
      height: 320px !important

    .feature-item
      margin-bottom: 115px

    .selling-on-second-title
      h3.title
        margin: 80px 0px 100px 0px
        width: 100%
  .cards-wrapper-selling
    gap: 180px !important
    > div
      max-width: 361px
      min-height: 168px
      max-height: 320px
  .margin-bottom-class
    margin-bottom: 100px


@media (max-width: 768px)
  .features-container
    .feature-content
      .selling-on-second-title
        h3.title
          margin: 0px 0px 24px 0px
      .cards-wrapper-selling
        padding: 0px 16px
        gap: 16px !important
        .feature-item::v-deep
          flex-direction: column
          align-items: center
@media screen and (max-width: 577px)
  .features-container
    .margin-bottom-class
      margin-bottom: 35px
</style>
