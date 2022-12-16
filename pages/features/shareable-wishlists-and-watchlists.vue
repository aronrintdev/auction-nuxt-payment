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
        {{
          $t(
            'newest_features.shareable_wishlists_and_watchlists.what_you_can_do'
          )
        }}
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
import FeatureCardHoverableV2 from '~/components/feature/CardHoverableV2'

export default {
  components: {
    FeatureContentWrapper,
    HorizontalBenefitBox,
    FeatureTitle,
    FeatureCardHoverableV2,
  },

  layout: 'IndexLayout',

  data() {
    return {
      banner: {
        backgroundImage: require('@/assets/img/features/newest-feature/shareable-wishlists-and-watchlists/shareable-wishlists-and-watchlists-banner.jpg'),
        backgroundImageXS: require('@/assets/img/features/newest-feature/shareable-wishlists-and-watchlists/shareable-wishlists-and-watchlists-banner-xs.png'),
      },
      benefits: [
        {
          benefitImage: require('@/assets/img/features/newest-feature/shareable-wishlists-and-watchlists/save-items.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/shareable-wishlists-and-watchlists/save-items-xs.png'),
          benefitTitle:
            'newest_features.shareable_wishlists_and_watchlists.benefits.first_benefit_title',
          benefitDescription:
            'newest_features.shareable_wishlists_and_watchlists.benefits.first_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/shareable-wishlists-and-watchlists/share-lists.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/shareable-wishlists-and-watchlists/share-lists-xs.png'),
          benefitTitle:
            'newest_features.shareable_wishlists_and_watchlists.benefits.second_benefit_title',
          benefitDescription:
            'newest_features.shareable_wishlists_and_watchlists.benefits.second_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/shareable-wishlists-and-watchlists/customize.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/shareable-wishlists-and-watchlists/customize-xs.png'),
          benefitTitle:
            'newest_features.shareable_wishlists_and_watchlists.benefits.third_benefit_title',
          benefitDescription:
            'newest_features.shareable_wishlists_and_watchlists.benefits.third_benefit_desc',
        },
      ],
      bottomBanner: {
        bottomBannerImage: require('@/assets/img/features/newest-feature/shareable-wishlists-and-watchlists/bottom-banner.png'),
        bottomBannerImageXS: require('@/assets/img/features/newest-feature/shareable-wishlists-and-watchlists/bottom-banner-xs.png'),
        bottomBannerDescription:
          'newest_features.shareable_wishlists_and_watchlists.bottom_banner.desc',
        bottomBannerDescriptionXS:
          'newest_features.shareable_wishlists_and_watchlists.bottom_banner.desc_xs',
        bottomBannerButtonLink: '/browse',
        bottomBannerButtonText:
          'newest_features.shareable_wishlists_and_watchlists.bottom_banner.button_text',
        previousPage:
          'newest_features.shareable_wishlists_and_watchlists.bottom_banner.previous_page_title',
        previousPageXS:
          'newest_features.shareable_wishlists_and_watchlists.bottom_banner.previous_page_xs_title',
        previousPageLink: '/features/instant-shipping',
        nextPage:
          'newest_features.shareable_wishlists_and_watchlists.bottom_banner.next_page_title',
        nextPageXS:
          'newest_features.shareable_wishlists_and_watchlists.bottom_banner.next_page_xs_title',
        nextPageLink: '/features/selling-on-deadstock',
      },
      processes: [
        {
          icon: require('~/assets/img/features/newest-feature/shareable-wishlists-and-watchlists/heart-with-plus.svg'),
          title: this.$t(
            'newest_features.shareable_wishlists_and_watchlists.save_to_wishlist'
          ),
          description: this.$t(
            'newest_features.shareable_wishlists_and_watchlists.save_to_wishlist_desc'
          ),
        },
        {
          icon: require('~/assets/img/features/newest-feature/shareable-wishlists-and-watchlists/eye-with-plus.svg'),
          title: this.$t(
            'newest_features.shareable_wishlists_and_watchlists.save_to_watchlist'
          ),
          description: this.$t(
            'newest_features.shareable_wishlists_and_watchlists.save_to_watchlist_desc'
          ),
        },
        {
          icon: require('~/assets/img/features/newest-feature/shareable-wishlists-and-watchlists/Preferences.svg'),
          title: this.$t(
            'newest_features.shareable_wishlists_and_watchlists.name_organize_list'
          ),
          description: this.$t(
            'newest_features.shareable_wishlists_and_watchlists.name_organize_list_desc'
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
      gap: 22px !important
      margin-bottom: 40px
      .feature-card-hoverableV2
        max-width: 343px
        width: 100%
        background-color: $color-white-1 !important
        box-shadow: 0 1px 4px 0 rgb(0 0 0 / 25%) !important
        border-radius: 10px
        .feature-title
          &:before
            diplay: none !important

    > div:not(:last-child)
      margin: 0 0 40px 0
@media screen and (max-width: 577px)
  .feature-title-my
    width: 95%
    margin-top: 48px !important
    margin-bottom: 24px !important
</style>
