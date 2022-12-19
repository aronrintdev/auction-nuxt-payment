<template>
  <div>
    <FeatureContentWrapper
      :backgroundImage="banner.backgroundImage"
      :backgroundImageXS="banner.backgroundImageXS"
      :bottomBannerImage="bottomBanner.bottomBannerImage"
      :bottomBannerImageXS="bottomBanner.bottomBannerImageXS"
      :bottomBannerDescription="bottomBanner.bottomBannerDescription"
      :bottomBannerDescriptionXS="bottomBanner.bottomBannerDescriptionXS"
      :bottomBannerButtonLink="bottomBanner.bottomBannerButtonLink"
      :bottomBannerButtonText="bottomBanner.bottomBannerButtonText"
      :previousPage="bottomBanner.previousPage"
      :previousPageXS="bottomBanner.previousPageXS"
      :previousPageLink="bottomBanner.previousPageLink"
      :nextPage="bottomBanner.nextPage"
      :nextPageXS="bottomBanner.nextPageXS"
      :nextPageLink="bottomBanner.nextPageLink"
    >
      <b-row class="justify-content-center h-card-main">
        <b-col
          v-for="(item, index) in csvBulkUplaod"
          :key="index"
          md="3"
          class="d-flex justify-content-center d-lg-block h-card-column px-0"
        >
          <FeatureCard
            :title="item.title"
            :description="item.description"
            :imageUrl="item.image"
            :resImageUrl="item.responsiveImage"
          />
        </b-col>
      </b-row>

      <FeatureTitle class="feature-title-my">{{
        $t('features.csv_bulk_uploading.the_process')
      }}</FeatureTitle>

      <div class="d-flex cards-wrapper justify-content-center">
        <FeatureStepCard
          :icon="
            require('~/assets/img/features/newest-feature/csv-bulk-uploading/keyboard.svg')
          "
          :title="$t('features.csv_bulk_uploading.enter_data')"
          :description="$t('features.csv_bulk_uploading.enter_data_desc')"
          step="1"
        />

        <FeatureStepCard
          :icon="
            require('~/assets/img/features/newest-feature/csv-bulk-uploading/clarity_form-line.svg')
          "
          :title="$t('features.csv_bulk_uploading.confirm')"
          :description="$t('features.csv_bulk_uploading.confirm_desc')"
          step="2"
        />
      </div>

      <div class="d-flex cards-wrapper justify-content-center csv-bulk">
        <FeatureStepCard
          :icon="
            require('~/assets/img/features/newest-feature/csv-bulk-uploading/upload-icon.svg')
          "
          :title="$t('features.csv_bulk_uploading.upload')"
          :description="$t('features.csv_bulk_uploading.upload_desc')"
          step="3"
        />
        <FeatureStepCard
          :icon="
            require('~/assets/img/features/newest-feature/csv-bulk-uploading/slip.svg')
          "
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
          image: require('~/assets/img/features/newest-feature/csv-bulk-uploading/desktop-auctionscollectionsweb.png'),
          responsiveImage: require('~/assets/img/features/newest-feature/csv-bulk-uploading/mobile-auctionscollectionsweb.png'),
        },
        {
          title: this.$t(
            'newest_features.csv_bulk_uploading.benefits.second_benefit_title'
          ),
          description: this.$t(
            'newest_features.csv_bulk_uploading.benefits.second_benefit_desc'
          ),
          image: require('~/assets/img/features/newest-feature/csv-bulk-uploading/desktop-Basketball.png'),
          responsiveImage: require('~/assets/img/features/newest-feature/csv-bulk-uploading/mobile-Basketball.png'),
        },
        {
          title: this.$t(
            'newest_features.csv_bulk_uploading.benefits.third_benefit_title'
          ),
          description: this.$t(
            'newest_features.csv_bulk_uploading.benefits.third_benefit_desc'
          ),
          image: require('~/assets/img/features/newest-feature/csv-bulk-uploading/desktop-supremeclockresize.png'),
          responsiveImage: require('~/assets/img/features/newest-feature/csv-bulk-uploading/mobile-supremeclockresize.png'),
        },
      ],
      banner: {
        backgroundImage: require('@/assets/img/features/newest-feature/csv-bulk-uploading/csv-bulk-uploading-banner.jpg'),
        backgroundImageXS: require('@/assets/img/features/newest-feature/csv-bulk-uploading/csv-bulk-uploading-banner-xs.png'),
      },
      bottomBanner: {
        bottomBannerImage: require('@/assets/img/features/newest-feature/csv-bulk-uploading/bottom-banner.png'),
        bottomBannerImageXS: require('@/assets/img/features/newest-feature/csv-bulk-uploading/bottom-banner-xs.png'),
        bottomBannerDescription:
          'newest_features.csv_bulk_uploading.bottom_banner.desc',
        bottomBannerDescriptionXS:
          'newest_features.csv_bulk_uploading.bottom_banner.desc_xs',
        bottomBannerButtonLink: '/become-a-vendor',
        bottomBannerButtonText:
          'newest_features.csv_bulk_uploading.bottom_banner.button_text',
        // previousPage:
        //   'newest_features.csv_bulk_uploading.bottom_banner.previous_page_title',
        // previousPageXS:
        //   'newest_features.csv_bulk_uploading.bottom_banner.previous_page_xs_title',
        // previousPageLink: '/features/international-languages',
        nextPage:
          'newest_features.csv_bulk_uploading.bottom_banner.next_page_title',
        nextPageXS:
          'newest_features.csv_bulk_uploading.bottom_banner.next_page_xs_title',
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
    .feature-title-my
      width: 100%
      margin-top: 48px !important
      margin-bottom: 24px !important
    .csv-bulk
      margin-bottom: 22px
    .cards-wrapper::v-deep
      padding: 0px 16px
      > div
        flex: none
        width: 100%
        flex-direction: column
        border-radius: 10px

        img
          margin-bottom: 20px

        div
          text-align: center
</style>
