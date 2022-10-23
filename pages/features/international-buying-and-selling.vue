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
          v-for="(item, index) in intBuySelling"
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
        $t('newest_features.international_buying_and_selling.refer_a_friend')
      }}</FeatureTitle>
      <InviteFriend />
    </FeatureContentWrapper>
  </div>
</template>
<script>
import { FeatureContentWrapper, FeatureTitle } from '~/components/feature'
import FeatureCard from '~/components/feature/Card'
import InviteFriend from '~/components/feature/InviteFriend'

export default {
  components: {
    FeatureContentWrapper,
    FeatureCard,
    FeatureTitle,
    InviteFriend,
  },

  layout: 'IndexLayout',

  data() {
    return {
      intBuySelling: [
        {
          title: this.$t(
            'newest_features.international_buying_and_selling.benefits.first_benefit_title'
          ),
          description: this.$t(
            'newest_features.international_buying_and_selling.benefits.first_benefit_desc'
          ),
          image: require('~/assets/img/features/newest-feature/international-buying-and-selling/internlbuysellaccitems.png'),
        },
        {
          title: this.$t(
            'newest_features.international_buying_and_selling.benefits.second_benefit_title'
          ),
          description: this.$t(
            'newest_features.international_buying_and_selling.benefits.second_benefit_desc'
          ),
          image: require('~/assets/img/features/newest-feature/international-buying-and-selling/interbuysellaccess.png'),
        },
        {
          title: this.$t(
            'newest_features.international_buying_and_selling.benefits.third_benefit_title'
          ),
          description: this.$t(
            'newest_features.international_buying_and_selling.benefits.third_benefit_desc'
          ),
          image: require('~/assets/img/features/newest-feature/international-buying-and-selling/interbuysellmorepeoplelooking.png'),
        },
      ],
      banner: {
        title:
          'newest_features.international_buying_and_selling.feature_banner_title',
        description:
          'newest_features.international_buying_and_selling.feature_banner_desc',
        backgroundImage: require('@/assets/img/features/newest-feature/international-buying-and-selling/inter-buy-banner.png'),
        backgroundImageSm: require('@/assets/img/features/newest-feature/international-buying-and-selling/inter-buy-banner.png'),
      },
      shopNowBanner: {
        shopNowDescription:
          'newest_features.international_buying_and_selling.shop_now_banner.desc',
        shopNowButtonText:
          'newest_features.international_buying_and_selling.shop_now_banner.button_text',
        previousPage: 'newest_features.virtual_giftcards.title',
        previousPageLink: '/features/virtual-giftcards',
        nextPage: 'newest_features.payments_plans.title',
        nextPageLink: '/features/payment-plans',
      },
    }
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
</style>
