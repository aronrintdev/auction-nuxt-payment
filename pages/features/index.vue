<template>
  <div class="features-container">
    <FeatureBanner
      :title="$t('features.title')"
      :description="$t('features.description')"
    />
    <div class="content mx-auto">
      <div class="title text-center">DEADSTOCK V2.0</div>

      <div class="v2-card-wrapper">
<!--        for now heat check is disabled-->
<!--        <FeatureCardV2-->
<!--          icon="heatcheck.svg"-->
<!--          :icon-width="61"-->
<!--          :icon-height="74"-->
<!--          :title="$t('heatcheck.heatcheck')"-->
<!--          :description="$t('features.heatcheck_desc')"-->
<!--        />-->
        <FeatureCardV2
          icon="trade-outline.svg"
          :icon-width="74"
          :icon-height="74"
          :title="$tc('common.trade', 1)"
          :description="$t('features.trade_desc')"
        />
        <FeatureCardV2
          icon="auction-outline.svg"
          :icon-width="68"
          :icon-height="74"
          :title="$t('common.auction')"
          :description="$t('features.auction_desc')"
        />
      </div>

      <InviteFriendsCard />

      <div class="all-features-title text-center">
        <span
          class="mx-auto d-block"
          v-html="$t('features.all_features')"
        ></span>
      </div>

      <div class="all-features d-flex flex-wrap">
        <FeatureCard
          v-for="(feature, index) in features"
          :key="`feature-${index}`"
          :to="feature.to"
          :title="feature.title"
          :description="feature.description"
          :imageUrl="feature.imageUrl"
          class="feature-item"
        />
      </div>
    </div>
  </div>
</template>
<script>
import FeatureBanner from '~/components/feature/Banner'
import FeatureCardV2 from '~/components/feature/CardV2'
import FeatureCard from '~/components/feature/Card'
import InviteFriendsCard from '~/components/profile/rewards/common/InviteFriendsCard'

export default {
  components: { FeatureBanner, FeatureCardV2, FeatureCard, InviteFriendsCard },

  layout: 'IndexLayout',

  data() {
    return {
      features: [
        {
          imageUrl: require('~/assets/img/features/index/Affirm.png'),
          to: './sell',
          title: this.$t('home.payment_plans'),
          description: this.$t('features.payment_plans.desc'),
        },
        {
          imageUrl: require('~/assets/img/features/index/buy.png'),
          to: './sell',
          title: this.$t('features.buying.title'),
          description: this.$t('features.buying.desc'),
        },
        {
          imageUrl: require('~/assets/img/features/index/selling.png'),
          to: './sell',
          title: this.$t('features.selling.title'),
          description: this.$t('features.selling.desc'),
        },
        {
          imageUrl: require('~/assets/img/features/index/auctions.png'),
          to: './sell',
          title: this.$t('features.auctions.title'),
          description: this.$t('features.auctions.desc'),
        },
        // for now heatcheck is disabled
        // {
        //   to: '/features/heat-check',
        //   title: this.$t('features.heat_check.title'),
        //   description: this.$t('features.heat_check.desc'),
        // },
        {
          imageUrl: require('~/assets/img/features/index/trade.png'),
          to: './sell',
          title: this.$t('features.trading.title'),
          description: this.$t('features.trading.desc'),
        },
        {
          imageUrl: require('~/assets/img/features/index/Bitcoin.png'),
          to: './sell',
          title: this.$t('features.crypto_payments.title'),
          description: this.$t('features.crypto_payments.desc'),
        },
        {
          imageUrl: require('~/assets/img/features/index/customerservice.png'),
          to: './sell',
          title: this.$t('features.live_customer_service.title'),
          description: this.$t('features.live_customer_service.desc'),
        },
        {
          imageUrl: require('~/assets/img/features/index/shopearnredeem.png'),
          to: './sell',
          title: this.$t('features.rewards_program.title'),
          description: this.$t('features.rewards_program.desc'),
        },
        {
          imageUrl: require('~/assets/img/features/index/streetwear.png'),
          to: './sell',
          title: this.$t('features.streetwear.title'),
          description: this.$t('features.streetwear.desc'),
        },
        {
          imageUrl: require('~/assets/img/features/index/virtualgiftcard.png'),
          to: './sell',
          title: this.$t('features.virtual_giftcards.title'),
          description: this.$t('features.virtual_giftcards.desc'),
        },
        {
          imageUrl: require('~/assets/img/features/default.png'),
          to: './sell',
          title: this.$t('features.inapp_game.title'),
          description: this.$t('features.inapp_game.desc'),
        },
        {
          imageUrl: require('~/assets/img/features//index/csvbulkuploadinglaptopwithshadow.png'),
          to: './sell',
          title: this.$t('features.csv_bulk_uploading.title'),
          description: this.$t('features.csv_bulk_uploading.desc'),
        },
        {
          imageUrl: require('~/assets/img/features/index/2fasecurity.png'),
          to: './sell',
          title: this.$t('features.2fa_security.title'),
          description: this.$t('features.2fa_security.desc'),
        },
        {
          imageUrl: require('~/assets/img/features/index/deadstockexchange.png'),
          to: './sell',
          title: this.$t('features.deadstock_exchange.title'),
          description: this.$t('features.deadstock_exchange.desc'),
        },
      ],
    }
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.features-container
  .content
    padding: 0 239px
    max-width: 1440px

    > .title
      @include heading-5
      line-height: 120%
      font-weight: $medium
      color: $color-black-1
      margin-top: 87px
      margin-bottom: 56px

    .v2-card-wrapper
      display: flex

      > div
        flex: 1 1 0px

    .all-features-title
      background: $color-black-1
      height: 1px
      margin-top: 90px
      margin-bottom: 98px

      span
        @include heading-5
        color: $color-black-1
        font-weight: $medium
        line-height: 120%
        background: $color-white-1
        padding: 0 80px
        position: relative
        top: -48px
        width: fit-content

    .all-features
      margin-left: -21px
      margin-right: -21px

      .feature-item
        margin-bottom: 50px
        width: 33.333%
        padding: 0 21px

@media (max-width: 1200px)
  .features-container
    .content
      padding: 0 90px

@media (max-width: 768px)
  .features-container
    .content
      padding: 0 20px

@media (max-width: 768px)
  .features-container
    .content
      .v2-card-wrapper
        flex-direction: column
        align-items: center

        >div
          margin: 20px 0 0 0
          max-width: 294px

      .all-features
        .feature-item
          width: 50%

@media (max-width: 576px)
  .features-container
    .content
      .all-features-title
        span
          padding: 0 20px

      .all-features
        margin: 0
        justify-content: center

        .feature-item
          width: 100%
          padding: 0
          max-width: 294px
</style>
