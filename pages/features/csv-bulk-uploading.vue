<template>
  <FeatureContentWrapper
    :title="$t('features.csv_bulk_uploading.title')"
    :description="$t('features.csv_bulk_uploading.desc')"
  >
    <FeatureBenefits :items="benefitItems" />

    <FeatureTitle class="mb-6">{{
      $t('features.csv_bulk_uploading.the_process')
    }}</FeatureTitle>

    <div class="d-flex cards-wrapper">
      <FeatureStepCard
        :icon="require('~/assets/img/features/csv-bulk-uploading/keyboard.svg')"
        :title="$t('features.csv_bulk_uploading.enter_data')"
        :description="$t('features.csv_bulk_uploading.enter_data_desc')"
        step="1"
      />

      <FeatureStepCard
        :icon="require('~/assets/img/features/csv-bulk-uploading/edit.svg')"
        :title="$t('features.csv_bulk_uploading.confirm')"
        :description="$t('features.csv_bulk_uploading.confirm_desc')"
        step="2"
      />
    </div>

    <div class="d-flex cards-wrapper">
      <FeatureStepCard
        :icon="require('~/assets/img/features/csv-bulk-uploading/upload.svg')"
        :title="$t('features.csv_bulk_uploading.upload')"
        :description="$t('features.csv_bulk_uploading.upload_desc')"
        step="3"
      />
      <FeatureStepCard
        :icon="require('~/assets/img/features/csv-bulk-uploading/create.svg')"
        :title="$t('features.csv_bulk_uploading.create')"
        :description="$t('features.csv_bulk_uploading.create_desc')"
        step="4"
      />
    </div>

    <!-- todo: add vendor signup page url -->
    <FeatureBrowseSection
      :title="$t('features.csv_bulk_uploading.add_inventory')"
      :icon="require('~/assets/img/features/csv-bulk-uploading/add.svg')"
      to="#"
      :button-label="$t('features.csv_bulk_uploading.become_vendor')"
    >
      {{ $t('features.csv_bulk_uploading.add_inventory_desc') }}
    </FeatureBrowseSection>
  </FeatureContentWrapper>
</template>
<script>
import {
  FeatureStepCard,
  FeatureContentWrapper,
  FeatureBenefits,
  FeatureTitle,
  FeatureBrowseSection,
} from '~/components/feature'

export default {
  components: {
    FeatureStepCard,
    FeatureContentWrapper,
    FeatureBenefits,
    FeatureTitle,
    FeatureBrowseSection,
  },

  layout: 'IndexLayout',

  data() {
    return {
      benefitItems: [
        {
          icon: require('~/assets/img/features/csv-bulk-uploading/multiple-items.svg'),
          heading: this.$t('features.csv_bulk_uploading.multiple_items'),
          description: this.$t(
            'features.csv_bulk_uploading.multiple_items_desc'
          ),
        },
        {
          icon: require('~/assets/img/features/csv-bulk-uploading/settings.svg'),
          heading: this.$t('features.csv_bulk_uploading.user_friendly'),
          description: this.$t(
            'features.csv_bulk_uploading.user_friendly_desc'
          ),
        },
        {
          icon: require('~/assets/img/features/csv-bulk-uploading/timer.svg'),
          heading: this.$t('features.csv_bulk_uploading.efficient'),
          description: this.$t('features.csv_bulk_uploading.efficient_desc'),
        },
      ],
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
    }
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.features-container
  .cards-wrapper
    > div
      margin: 18px 9px

  .feature-benefits::v-deep
    .img-wrapper
      min-width: 196px

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
        width: 100%
        flex-direction: column

        img
          margin-bottom: 20px

        div
          text-align: center
</style>
