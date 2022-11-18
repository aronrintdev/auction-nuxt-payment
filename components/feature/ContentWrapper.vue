<template>
  <div class="features-container">
    <FeatureBanner
      :backgroundImage="backgroundImage"
      :backgroundImageXS="backgroundImageXS"
    />

    <div class="feature-content mx-auto">
      <FeatureBackButton class="mb-2 d-md-inline-flex d-none" />
      <FeatureTitle>{{ $tc('common.benefit', 2) }}</FeatureTitle>
      <slot></slot>
      <BottomBanner
        :bottomBannerImage="bottomBannerImage"
        :bottomBannerImageXS="bottomBannerImageXS"
        :bottomBannerDescription="bottomBannerDescription"
        :bottomBannerDescriptionXS="bottomBannerDescriptionXS"
        :bottomBannerButtonLink="bottomBannerButtonLink"
        :bottomBannerButtonText="bottomBannerButtonText"
        :previousPage="previousPage"
        :previousPageXS="previousPageXS"
        :previousPageLink="previousPageLink"
        :nextPage="nextPage"
        :nextPageXS="nextPageXS"
        :nextPageLink="nextPageLink"
      />
    </div>
  </div>
</template>
<script>
import FeatureBanner from '~/components/feature/Banner'
import FeatureBackButton from '~/components/feature/BackButton'
import FeatureTitle from '~/components/feature/Title'
import BottomBanner from '~/components/feature/BottomBanner'
export default {
  name: 'FeatureContentWrapper',
  components: {
    FeatureBanner,
    FeatureBackButton,
    FeatureTitle,
    BottomBanner,
  },

  props: {
    backgroundImage: {
      type: String,
      default: null,
    },
    backgroundImageXS: {
      type: String,
      default: null,
    },
    bottomBannerImage: {
      type: String,
      default: null,
    },
    bottomBannerImageXS: {
      type: String,
      default: null,
    },
    bottomBannerDescription: {
      type: String,
      default: null,
    },
    bottomBannerDescriptionXS: {
      type: String,
      default: null,
    },
    bottomBannerButtonLink: {
      type: String,
      default: null,
    },
    bottomBannerButtonText: {
      type: String,
      default: null,
    },
    previousPage: {
      type: String,
      default: null,
    },
    previousPageXS: {
      type: String,
      default: null,
    },
    previousPageLink: {
      type: String,
      default: null,
    },
    nextPage: {
      type: String,
      default: null,
    },
    nextPageXS: {
      type: String,
      default: null,
    },
    nextPageLink: {
      type: String,
      default: null,
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.features-container
  background-color: $color-gray-1
  .feature-content
    width: 1216px
    padding: 3rem 0px
    h3.benefit-title
      color: #1d1d1d
@media screen and (max-width: 1280px)
  .features-container
    .feature-content
      width: 1024px
@media screen and (max-width: 1211px)
  .features-container
    .feature-content
      width: 1024px
@media screen and (max-width: 1025px)
  .features-container
    .feature-content
      width: 100%
      padding: 3rem 2rem
@media screen and (max-width: 577px)
  .features-container
    background-color: $color-white-1
    .feature-content
      padding: 0px
</style>
