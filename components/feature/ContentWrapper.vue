<template>
  <div class="features-container">
    <FeatureBanner :title="title" :description="description" />

    <div class="feature-content mx-auto">
      <FeatureBackButton class="mb-2 d-md-inline-flex d-none" />

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
    padding: 56px 116px
    max-width: 1440px

@media (max-width: 1200px)
  .features-container
    .feature-content
      padding: 80px 40px

@media (max-width: 576px)
  .features-container
    .feature-content
      padding: 40px 16px
</style>
