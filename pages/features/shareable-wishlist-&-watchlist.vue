<template>
  <FeatureContentWrapper
    :title="$t('features.blockchain_authentication_ledger.title')"
    :description="$t('features.blockchain_authentication_ledger.desc')"
    class="shareable-wish-watch"
  >
    <FeatureBenefits :items="benefitItems" />

    <FeatureTitle class="mb-6">{{ $t('footer.process') }}</FeatureTitle>

    <div class="d-flex cards-wrapper justify-content-center gap-6">
      <FeatureCardHoverableV2
        v-for="(item, index) in processes"
        :key="`process-${index}`"
        :icon="item.icon"
        :title="item.title"
        :description="item.description"
      />
    </div>
    <div class="shopnow-banner">
      <ShopNowBanner
        :previousPage="$t('newest_features.sell.title')"
        :previousPageLink="'/features/selling'"
        :nextPage="$t('newest_features.buy.title')"
        :nextPageLink="'/features/auctions'"
      />
    </div>
  </FeatureContentWrapper>
</template>
<script>
import { FeatureBenefits, FeatureContentWrapper } from '~/components/feature'
import FeatureCardHoverableV2 from '~/components/feature/CardHoverableV2'
import ShopNowBanner from '~/components/feature/ShopNowBanner'

export default {
  components: {
    FeatureBenefits,
    FeatureContentWrapper,
    FeatureCardHoverableV2,
    ShopNowBanner,
  },

  layout: 'IndexLayout',

  data() {
    return {
      benefitItems: [
        {
          icon: require('~/assets/img/features/blockchain-authentication-ledger/nfc.svg'),
          heading: this.$t('features.blockchain_authentication_ledger.nfc'),
          description: this.$t(
            'features.blockchain_authentication_ledger.nfc_desc'
          ),
        },
        {
          icon: require('~/assets/img/features/blockchain-authentication-ledger/verify-tick.svg'),
          heading: this.$t(
            'features.blockchain_authentication_ledger.proof_of_authentication'
          ),
          description: this.$t(
            'features.blockchain_authentication_ledger.proof_of_authentication_desc'
          ),
        },
        {
          icon: require('~/assets/img/features/blockchain-authentication-ledger/phone.svg'),
          heading: this.$t(
            'features.blockchain_authentication_ledger.scan_nfc'
          ),
          description: this.$t(
            'features.blockchain_authentication_ledger.scan_nfc_desc'
          ),
        },
      ],
      processes: [
        {
          icon: require('~/assets/img/features/newest-feature/shareable-wish-watchlist/heartplus.svg'),
          title: this.$t(
            'newest_features.shareable_wishlists_and_watchlists.save_to_wishlist'
          ),
          description: this.$t(
            'features.blockchain_authentication_ledger.scan_desc'
          ),
        },
        {
          icon: require('~/assets/img/features/newest-feature/shareable-wish-watchlist/eyeplus.svg'),
          title: this.$t(
            'newest_features.shareable_wishlists_and_watchlists.save_to_watchlist'
          ),
          description: this.$t(
            'features.blockchain_authentication_ledger.view_details_desc'
          ),
        },
        {
          icon: require('~/assets/img/features/newest-feature/shareable-wish-watchlist/prefrences.svg'),
          title: this.$t(
            'newest_features.shareable_wishlists_and_watchlists.name_organize_list'
          ),
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
