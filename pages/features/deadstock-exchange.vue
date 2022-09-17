<template>
  <FeatureContentWrapper
    :title="$t('features.deadstock_exchange.title')"
    :description="$t('features.deadstock_exchange.desc')"
  >
    <FeatureBenefits :items="benefitItems" />

    <FeatureTitle class="mb-6">{{
      $t('features.deadstock_exchange.check_it_out')
    }}</FeatureTitle>

    <div class="graph-wrapper mx-auto w-100">
      <img
        :src="
          require('~/assets/img/features/deadstock-exchange/sneaker-graph.png')
        "
        class="w-100"
      />
    </div>

    <!-- todo: add faq url -->
    <FeatureBrowseSection
      :title="$t('common.view_more')"
      :icon="
        require('~/assets/img/features/deadstock-exchange/stack-dollar.svg')
      "
      to="#"
      :button-label="$t('features.deadstock_exchange.title')"
      variant="secondary"
    >
      {{ $t('features.deadstock_exchange.view_more_desc') }}
    </FeatureBrowseSection>
  </FeatureContentWrapper>
</template>
<script>
import {
  FeatureBenefits,
  FeatureContentWrapper,
  FeatureTitle,
  FeatureBrowseSection,
} from '~/components/feature'

export default {
  components: {
    FeatureBenefits,
    FeatureContentWrapper,
    FeatureBrowseSection,
    FeatureTitle,
  },

  layout: 'IndexLayout',

  data() {
    return {
      benefitItems: [
        {
          icon: require('~/assets/img/features/deadstock-exchange/graph.svg'),
          heading: this.$t('features.deadstock_exchange.analytics'),
          description: this.$t('features.deadstock_exchange.analytics_desc'),
        },
        {
          icon: require('~/assets/img/features/deadstock-exchange/tag.svg'),
          heading: this.$t('features.deadstock_exchange.analytics_price'),
          description: this.$t(
            'features.deadstock_exchange.analytics_price_desc'
          ),
        },
        {
          icon: require('~/assets/img/features/deadstock-exchange/shoe-size.svg'),
          heading: this.$t('features.deadstock_exchange.insights'),
          description: this.$t('features.deadstock_exchange.insights_desc'),
        },
      ],
    }
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.features-container
  .graph-wrapper
    background: $color-white-1
    box-shadow: 0 1px 4px 0 rgba($color-black-1, 0.25)
    border-radius: 36px
    padding: 62px 99px
    max-width: 896px

@media (max-width: 576px)
  .features-container
    .graph-wrapper
      padding: 20px
</style>
