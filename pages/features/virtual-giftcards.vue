<template>
  <FeatureContentWrapper
    :title="$t('features.virtual_giftcards.title')"
    :description="$t('features.virtual_giftcards.desc')"
  >
    <FeatureBenefits :items="benefitItems" />

    <FeatureTitle class="mb-6">{{ $tc('common.option', 2) }}</FeatureTitle>

    <div class="d-flex justify-content-between cards-wrapper">
      <FeatureStepCard
        :icon="require('~/assets/img/features/virtual-giftcards/computer.svg')"
        :description="$t('features.virtual_giftcards.online_desc')"
        variant="large"
        :step="`1. ${$t('features.virtual_giftcards.online')}`"
      />

      <FeatureStepCard
        :icon="require('~/assets/img/features/virtual-giftcards/store.svg')"
        :description="$t('features.virtual_giftcards.in_store_desc')"
        variant="large"
        :step="`2. ${$t('features.virtual_giftcards.in_store')}`"
      />
    </div>

    <!-- todo: add card purchase url -->
    <FeatureBrowseSection
      :title="$t('features.virtual_giftcards.send_gift')"
      :icon="require('~/assets/img/features/virtual-giftcards/gift.svg')"
      to="#"
      :button-label="$t('common.purchase')"
    >
      {{ $t('features.virtual_giftcards.send_gift_desc') }}
    </FeatureBrowseSection>
  </FeatureContentWrapper>
</template>
<script>
import {
  FeatureBenefits,
  FeatureStepCard,
  FeatureContentWrapper,
  FeatureTitle,
  FeatureBrowseSection,
} from '~/components/feature'

export default {
  components: {
    FeatureBenefits,
    FeatureStepCard,
    FeatureContentWrapper,
    FeatureTitle,
    FeatureBrowseSection,
  },

  layout: 'IndexLayout',

  data() {
    return {
      benefitItems: [
        {
          icon: require('~/assets/img/features/virtual-giftcards/clock.svg'),
          heading: this.$t('features.virtual_giftcards.no_expiration'),
          description: this.$t('features.virtual_giftcards.no_expiration_desc'),
        },
        {
          icon: require('~/assets/img/features/virtual-giftcards/cloud-lock.svg'),
          heading: this.$t('features.virtual_giftcards.never_lose_card'),
          description: this.$t(
            'features.virtual_giftcards.never_lose_card_desc'
          ),
        },
        {
          icon: require('~/assets/img/features/virtual-giftcards/card.svg'),
          heading: this.$t('features.virtual_giftcards.partial_increments'),
          description: this.$t(
            'features.virtual_giftcards.partial_increments_desc'
          ),
        },
      ],
    }
  },
}
</script>
<style lang="sass" scoped>
.features-container
  .cards-wrapper
    > div
      margin: 18px 9px

@media (max-width: 900px)
  .features-container
    .cards-wrapper
      flex-direction: column
      align-items: center

      > div
        width: 100%

@media (max-width: 576px)
  .features-container
    .cards-wrapper::v-deep
      > div
        flex: none

        div
          text-align: center
</style>
