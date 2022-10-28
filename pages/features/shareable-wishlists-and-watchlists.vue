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
      <HorizontalBenefitBox
        v-for="(benefit, index) in benefits"
        :key="index"
        :benefitImage="benefit.benefitImage"
        :benefitTitle="benefit.benefitTitle"
        :benefitDescription="benefit.benefitDescription"
      />
      <FeatureTitle>
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
        title:
          'newest_features.shareable_wishlists_and_watchlists.feature_banner_title',
        description:
          'newest_features.shareable_wishlists_and_watchlists.feature_banner_desc',
        backgroundImage: require('@/assets/img/features/newest-feature/shareable-wishlists-and-watchlists/shareable-wishlists-and-watchlists-banner.png'),
        backgroundImageSm: require('@/assets/img/features/newest-feature/shareable-wishlists-and-watchlists/shareable-wishlists-and-watchlists-banner.png'),
      },
      benefits: [
        {
          benefitImage: require('@/assets/img/features/newest-feature/shareable-wishlists-and-watchlists/save-items.png'),
          benefitTitle:
            'newest_features.shareable_wishlists_and_watchlists.benefits.first_benefit_title',
          benefitDescription:
            'newest_features.shareable_wishlists_and_watchlists.benefits.first_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/shareable-wishlists-and-watchlists/share-lists.png'),
          benefitTitle:
            'newest_features.shareable_wishlists_and_watchlists.benefits.second_benefit_title',
          benefitDescription:
            'newest_features.shareable_wishlists_and_watchlists.benefits.second_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/shareable-wishlists-and-watchlists/customize.png'),
          benefitTitle:
            'newest_features.shareable_wishlists_and_watchlists.benefits.third_benefit_title',
          benefitDescription:
            'newest_features.shareable_wishlists_and_watchlists.benefits.third_benefit_desc',
        },
      ],
      shopNowBanner: {
        shopNowDescription:
          'newest_features.shareable_wishlists_and_watchlists.shop_now_banner.desc',
        shopNowButtonText:
          'newest_features.shareable_wishlists_and_watchlists.shop_now_banner.button_text',
        previousPage: 'newest_features.instant_shipping.title',
        previousPageLink: '/features/instant-shipping',
      },
      processes: [
        {
          icon: require('~/assets/img/features/newest-feature/shareable-wishlists-and-watchlists/heartplus.svg'),
          title: this.$t(
            'newest_features.shareable_wishlists_and_watchlists.save_to_wishlist'
          ),
          description: this.$t(
            'newest_features.shareable_wishlists_and_watchlists.save_to_wishlist_desc'
          ),
        },
        {
          icon: require('~/assets/img/features/newest-feature/shareable-wishlists-and-watchlists/eyeplus.svg'),
          title: this.$t(
            'newest_features.shareable_wishlists_and_watchlists.save_to_wishlist'
          ),
          description: this.$t(
            'newest_features.shareable_wishlists_and_watchlists.save_to_wishlist_desc'
          ),
        },
        {
          icon: require('~/assets/img/features/newest-feature/shareable-wishlists-and-watchlists/prefrences.svg'),
          title: this.$t(
            'newest_features.shareable_wishlists_and_watchlists.name_organize_list'
          ),
          description: this.$t(
            'newest_features.shareable_wishlists_and_watchlists.save_to_wishlist_desc'
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
    margin-bottom: 148px
@media (max-width: 768px)
  .features-container
    .cards-wrapper
      counter-reset: css-counter 0
      flex-direction: column
      align-items: center
      gap: 16px !important
      margin-bottom: 40px

    > div:not(:last-child)
      margin: 0 0 40px 0
  .shareable-wish-watch
    .feature-card-hoverableV2
      box-shadow: 0 1px 4px 0 rgba($color-black-1, 0.25) !important
      max-width: 100%
</style>