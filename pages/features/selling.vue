<template>
  <!-- todo: refactor code. refer to virtual-giftcards -->
  <div class="features-container selling-main">
    <FeatureBanner
      :title="$t('features.selling.title')"
      :description="$t('features.selling.desc')"
    />

    <div class="content mx-auto">
      <FeatureBackButton class="mb-2 d-lg-inline-flex d-none" />

      <h3 class="benefit-title text-center text-lg-left font-primary">
        {{ $tc('common.benefit', 2) }}
      </h3>

      <b-row class="justify-content-between h-card-main">
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

      <h3 class="title pl-lg-5 text-center text-lg-left font-primary">
        {{ $t('footer.process') }}
      </h3>

      <div class="d-flex justify-content-center cards-wrapper mb-3 mb-md-5">
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

      <div class="d-flex justify-content-center cards-wrapper">
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
    </div>
  </div>
</template>
<script>
import FeatureBanner from '~/components/feature/Banner'
import FeatureBackButton from '~/components/feature/BackButton'
import FeatureCardHoverable from '~/components/feature/CardHoverable'
import FeatureCard from '~/components/feature/Card'

export default {
  components: {
    FeatureBanner,
    FeatureCard,

    FeatureBackButton,
    FeatureCardHoverable,
  },

  layout: 'IndexLayout',

  data() {
    return {
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
      sellingCard: [
        {
          title: 'Immediate Payout',
          description:
            'Receive your payout immediately after the transaction is completed. ',
          image: require('~/assets/img/features/newest-feature/payment-plans/newest-money.png'),
        },
        {
          title: 'Low Fees',
          description:
            'The lowest seller fees in the marketplace, keep more of your revenue. ',
          image: require('~/assets/img/features/newest-feature/selling/low-fee.png'),
        },
        {
          title: 'Fast Shipping ',
          description:
            'Detailed instructions on how to quickly and efficiently ship your items.',
          image: require('~/assets/img/features/newest-feature/selling/free-shipping.png'),
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
    padding: 56px 116px
    max-width: 1440px

    .process-box
      width: 360px !important
      height: 320px !important

    h3.title, .benefit-title
      @include heading-7
      color: $color-black-5
      text-transform: uppercase
      margin: 68px 0px
    .benefit-title
      margin: 9px 0px 38px 0px !important

      &.title-shop
        margin: 137px 0 49px 0

    .feature-item
      margin-bottom: 115px

    .cards-wrapper
      gap: 180px
      > div
        max-width: 361px
        min-height: 168px
        max-height: 320px


@media (max-width: 1200px)
  .features-container
    .content
      .shop-section
        flex-direction: column
        align-items: center

        > div
          margin-top: 20px
          align-items: center
          padding: 0

        button
          margin-top: 20px

@media (max-width: 1000px)
  .features-container
    .content
      padding: 80px 40px

@media (max-width: 768px)
  .features-container
  .selling-main
    .content
      .cards-wrapper
        gap: 16px
      > div
        min-width: 168px !important
        min-height: 164px !important
      padding: 36px 16px
      .benefit-title, .title
        font-size: 16px !important
        font-weight: 600 !important
        font-size: 16px !important
        margin: 0px 0px 20px 0px !important
      .title
        margin: 40px 0px 24px 0px !important
      .feature-item::v-deep
        flex-direction: column
        align-items: center

        .img-wrapper
          margin: 0
          margin-bottom: 20px

        .text-wrapper
          text-align: center
</style>
