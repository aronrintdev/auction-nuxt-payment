<template>
  <div class="features-container">
    <FeatureBanner :title="title" :description="description" />

    <div class="feature-content mx-auto">
      <FeatureBackButton class="mb-2" />

      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: 'FeatureContentWrapper',

  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
  },
}
</script>
<style lang="sass" scoped>
.features-container
  .feature-content
    padding: 80px 200px
    max-width: 1440px

@media (max-width: 1200px)
  .features-container
    .feature-content
      padding: 80px 40px

@media (max-width: 576px)
  .features-container
    .feature-content
      padding: 40px 30px
</style>
