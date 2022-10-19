<template>
  <FeatureContentWrapper
    :title="banner.title"
    :description="banner.description"
    :backgroundImage="banner.backgroundImage"
  >
    <FeatureTitle class="mb-6 text-center text-md-left">{{
      $tc('common.benefit', 2)
    }}</FeatureTitle>
    <b-row class="justify-content-between h-card-main mb-md-5">
      <b-col
        v-for="(item, index) in csvBulkUplaod"
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

    <FeatureTitle class="mb-6 text-center text-md-left">{{
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
  </FeatureContentWrapper>
</template>
<script>
import {
  FeatureStepCard,
  FeatureContentWrapper,
  FeatureTitle,
} from '~/components/feature'
import FeatureCard from '~/components/feature/Card'

export default {
  components: {
    FeatureStepCard,
    FeatureContentWrapper,
    FeatureCard,
    FeatureTitle,
  },

  layout: 'IndexLayout',

  data() {
    return {
      csvBulkUplaod: [
        {
          title: this.$t('features.csv_bulk_uploading.multiple_items'),
          description: this.$t(
            'features.csv_bulk_uploading.multiple_items_desc'
          ),
          image: require('~/assets/img/features/newest-feature/csv-bulk-uploading/csveasilyeditable.png'),
        },
        {
          title: this.$t('features.csv_bulk_uploading.user_friendly'),
          description: this.$t(
            'features.csv_bulk_uploading.user_friendly_desc'
          ),
          image: require('~/assets/img/features/newest-feature/csv-bulk-uploading/csvmultipleitems.png'),
        },
        {
          title: this.$t('features.csv_bulk_uploading.efficient'),
          description: this.$t('features.csv_bulk_uploading.efficient_desc'),
          image: require('~/assets/img/features/newest-feature/csv-bulk-uploading/csvsavetime.png'),
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
      banner: {
        title: 'features.csv_bulk_uploading.title',
        description: 'features.csv_bulk_uploading.desc',
        backgroundImage: require('@/assets/img/features/newest-feature/csv-bulk-uploading/csvbulkuploadingbanner.png'),
      },
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
