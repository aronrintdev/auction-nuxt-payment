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
        $t('features.csv_bulk_uploading.the_process')
      }}</FeatureTitle>
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
      intBuySelling: [
        {
          title: this.$t(
            'newest_features.international_buying_and_selling.access_to_items'
          ),
          description: this.$t(
            'newest_features.international_buying_and_selling.access_to_items_desc'
          ),
          image: require('~/assets/img/features/newest-feature/international-buying-and-selling/internlbuysellaccitems.png'),
        },
        {
          title: this.$t(
            'newest_features.international_buying_and_selling.access_to_items_sold'
          ),
          description: this.$t(
            'newest_features.international_buying_and_selling.access_to_items_sold_desc'
          ),
          image: require('~/assets/img/features/newest-feature/international-buying-and-selling/interbuysellaccess.png'),
        },
        {
          title: this.$t(
            'newest_features.international_buying_and_selling.more_customers'
          ),
          description: this.$t(
            'newest_features.international_buying_and_selling.more_customers_desc'
          ),
          image: require('~/assets/img/features/newest-feature/international-buying-and-selling/interbuysellmorepeoplelooking.png'),
        },
      ],
      banner: {
        title: 'newest_features.international_buying_and_selling.title',
        description: 'newest_features.international_buying_and_selling.desc',
        backgroundImage: require('@/assets/img/features/newest-feature/international-buying-and-selling/inter-buy-banner.png'),
        backgroundImageSm: require('@/assets/img/features/newest-feature/international-buying-and-selling/inter-buy-banner.png'),
      },
      shopNowBanner: {
        shopNowDescription:
          'newest_features.international_buying_and_selling.shop_now_desc',
        shopNowButtonText:
          'newest_features.international_buying_and_selling.shop_now_btn',
        previousPage:
          'newest_features.international_buying_and_selling.previous_page_name',
        previousPageLink: '/features/virtual-giftcards',
        nextPage:
          'newest_features.international_buying_and_selling.next_page_name',
        nextPageLink: '/features/payment-plans',
      },
    }
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
</style>
