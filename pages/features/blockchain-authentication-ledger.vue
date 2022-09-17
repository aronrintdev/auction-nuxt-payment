<template>
  <FeatureContentWrapper
    :title="$t('features.blockchain_authentication_ledger.title')"
    :description="$t('features.blockchain_authentication_ledger.desc')"
  >
    <FeatureBenefits :items="benefitItems" />

    <FeatureTitle class="mb-6">{{ $t('footer.process') }}</FeatureTitle>

    <div class="d-flex cards-wrapper">
      <FeatureCardHoverable
        v-for="(item, index) in processes"
        :key="`process-${index}`"
        :icon="item.icon"
        :title="item.title"
        :description="item.description"
      />
    </div>

    <!-- todo: add faq url -->
    <FeatureBrowseSection :title="$t('common.shop')" to="/shop">
      {{ $t('features.blockchain_authentication_ledger.shop_desc') }}
    </FeatureBrowseSection>
  </FeatureContentWrapper>
</template>
<script>
import {
  FeatureBenefits,
  FeatureContentWrapper,
  FeatureBrowseSection,
  FeatureCardHoverable,
} from '~/components/feature'

export default {
  components: {
    FeatureBenefits,
    FeatureContentWrapper,
    FeatureBrowseSection,
    FeatureCardHoverable,
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
          icon: require('~/assets/img/features/blockchain-authentication-ledger/qr-code.svg'),
          title: this.$t('common.scan'),
          description: this.$t(
            'features.blockchain_authentication_ledger.scan_desc'
          ),
        },
        {
          icon: require('~/assets/img/features/blockchain-authentication-ledger/detail-page.svg'),
          title: this.$t('vendor_purchase.view_details'),
          description: this.$t(
            'features.blockchain_authentication_ledger.view_details_desc'
          ),
        },
        {
          icon: require('~/assets/img/features/blockchain-authentication-ledger/share.svg'),
          title: this.$t('common.share'),
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
@media (max-width: 899px)
  .features-container
    .cards-wrapper
      flex-direction: column
      align-items: center

      > div:not(:last-child)
        margin: 0 0 40px 0
</style>
