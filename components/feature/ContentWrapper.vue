<template>
  <div class="features-container">
    <FeatureBanner
      :title="title"
      :description="description"
      :backgroundImage="backgroundImage"
    />

    <div class="feature-content mx-auto">
      <FeatureBackButton class="mb-2 d-md-inline-flex d-none" />
      <FeatureTitle>{{ $tc('common.benefit', 2) }}</FeatureTitle>
      <slot></slot>
      <ShopNowBanner
        :shopNowDescription="shopNowDescription"
        :shopNowButtonText="shopNowButtonText"
        :previousPage="previousPage"
        :previousPageLink="previousPageLink"
        :nextPage="nextPage"
        :nextPageLink="nextPageLink"
      />
    </div>
    <div class="my-check-class"></div>
  </div>
</template>
<script>
import FeatureBanner from '~/components/feature/Banner'
import FeatureBackButton from '~/components/feature/BackButton'
import FeatureTitle from '~/components/feature/Title'
import ShopNowBanner from '~/components/feature/ShopNowBanner'
export default {
  name: 'FeatureContentWrapper',
  components: {
    FeatureBanner,
    FeatureBackButton,
    FeatureTitle,
    ShopNowBanner,
  },

  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    backgroundImage: {
      type: String,
      required: true,
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.features-container
  .feature-content
    width: 1196px
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
    .feature-content
      padding: 0px
</style>
