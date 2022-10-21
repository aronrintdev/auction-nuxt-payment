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
      <b-row class="justify-content-between h-card-main mb-md-5">
        <b-col
          v-for="(item, index) in sellingCard"
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

      <FeatureTitle>
        {{ $t('newest_features.selling_on_deadstock.process') }}
      </FeatureTitle>

      <div
        class="d-flex justify-content-center cards-wrapper-selling mb-3 mb-md-5"
      >
        <FeatureCardHoverable
          :icon="require('~/assets/img/features/selling/create-listing.svg')"
          :title="$t('features.selling.create_listing')"
          :description="$t('features.selling.create_listing_desc')"
        />

        <FeatureCardHoverable
          :icon="require('~/assets/img/features/selling/sell-items.svg')"
          :title="$t('features.selling.sell_items')"
          :description="$t('features.selling.sell_items_desc')"
        />
      </div>

      <div class="d-flex justify-content-center cards-wrapper-selling mb-5">
        <FeatureCardHoverable
          :icon="require('~/assets/img/features/selling/ship-items.svg')"
          :title="$t('features.selling.ship_items')"
          :description="$t('features.selling.ship_items_desc')"
        />

        <FeatureCardHoverable
          :icon="require('~/assets/img/features/selling/earn-commission.svg')"
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
            'newest_features.selling_on_deadstock.immediate_payout'
          ),
          description: this.$t(
            'newest_features.selling_on_deadstock.immediate_payout_desc'
          ),
          image: require('~/assets/img/features/newest-feature/selling-on-deadstock/newest-money.png'),
        },
        {
          title: this.$t('newest_features.selling_on_deadstock.low_fees'),
          description: this.$t(
            'newest_features.selling_on_deadstock.low_fees_desc'
          ),
          image: require('~/assets/img/features/newest-feature/selling-on-deadstock/low-fee.png'),
        },
        {
          title: this.$t('newest_features.selling_on_deadstock.fast_shipping'),
          description: this.$t(
            'newest_features.selling_on_deadstock.fast_shipping_desc'
          ),
          image: require('~/assets/img/features/newest-feature/selling-on-deadstock/free-shipping.png'),
        },
      ],
      banner: {
        title: 'newest_features.selling_on_deadstock.title',
        description: 'newest_features.selling_on_deadstock.desc',
        backgroundImage: require('@/assets/img/features/newest-feature/selling-on-deadstock/sellingbanner.png'),
        backgroundImageSm: require('@/assets/img/features/newest-feature/selling-on-deadstock/sellingbannermobile.png'),
      },
      shopNowBanner: {
        shopNowDescription:
          'newest_features.selling_on_deadstock.shop_now_desc',
        shopNowButtonText: 'newest_features.selling_on_deadstock.shop_now_btn',
        previousPage: 'newest_features.selling_on_deadstock.previous_page_name',
        previousPageLink: '/features/buying',
        nextPage: 'newest_features.selling_on_deadstock.next_page_name',
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

  .cards-wrapper-selling
    gap: 180px !important
    > div
      max-width: 361px
      min-height: 168px
      max-height: 320px

@media (max-width: 768px)
  .features-container
    .cards-wrapper-selling
      padding: 0px 16px
      gap: 16px !important
    > div
      min-width: 168px !important
      min-height: 164px !important
      .feature-item::v-deep
        flex-direction: column
        align-items: center
</style>
