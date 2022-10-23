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
          v-for="(item, index) in csvBulkUplaod"
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

      <div class="d-flex cards-wrapper justify-content-center">
        <FeatureStepCard
          :icon="
            require('~/assets/img/features/csv-bulk-uploading/keyboard.svg')
          "
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

      <div class="d-flex cards-wrapper justify-content-center csv-bulk">
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
  </div>
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
          title: this.$t(
            'newest_features.csv_bulk_uploading.benefits.first_benefit_title'
          ),
          description: this.$t(
            'newest_features.csv_bulk_uploading.benefits.first_benefit_desc'
          ),
          image: require('~/assets/img/features/newest-feature/csv-bulk-uploading/csveasilyeditable.png'),
        },
        {
          title: this.$t(
            'newest_features.csv_bulk_uploading.benefits.second_benefit_title'
          ),
          description: this.$t(
            'newest_features.csv_bulk_uploading.benefits.second_benefit_desc'
          ),
          image: require('~/assets/img/features/newest-feature/csv-bulk-uploading/csvmultipleitems.png'),
        },
        {
          title: this.$t(
            'newest_features.csv_bulk_uploading.benefits.third_benefit_title'
          ),
          description: this.$t(
            'newest_features.csv_bulk_uploading.benefits.third_benefit_desc'
          ),
          image: require('~/assets/img/features/newest-feature/csv-bulk-uploading/csvsavetime.png'),
        },
      ],
      banner: {
        title: 'newest_features.csv_bulk_uploading.feature_banner_title',
        description: 'newest_features.csv_bulk_uploading.feature_banner_desc',
        backgroundImage: require('@/assets/img/features/newest-feature/csv-bulk-uploading/csvbanner.png'),
        backgroundImageSm: require('@/assets/img/features/newest-feature/csv-bulk-uploading/csvbannermobile.png'),
      },
      shopNowBanner: {
        shopNowDescription:
          'newest_features.csv_bulk_uploading.shop_now_banner.desc',
        shopNowButtonText:
          'newest_features.csv_bulk_uploading.shop_now_banner.button_text',
        previousPage: 'newest_features.international_languages.title',
        previousPageLink: '/features/international-languages',
        nextPage: 'newest_features.promotions.title',
        nextPageLink: '/features/promotions',
      },
    }
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.features-container
  .csv-bulk
    margin-bottom: 100px
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
        margin: 12px 0px

@media (max-width: 576px)
  .features-container
    .csv-bulk
      margin-bottom: 50px
    .cards-wrapper::v-deep
      padding: 0px 16px
      > div
        flex: none
        width: 100%
        flex-direction: column

        img
          margin-bottom: 20px

        div
          text-align: center
</style>
