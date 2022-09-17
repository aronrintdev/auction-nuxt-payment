<template>
  <div class="feature-benefits">
    <FeatureTitle class="mb-6">{{ $tc('common.benefit', 2) }}</FeatureTitle>

    <FeatureBenefitItem
      v-for="(item, index) in items"
      :key="`feature-item-${index}`"
      :icon="item.icon"
      :heading="item.heading"
      :description="item.description"
      class="feature-item mb-7"
    />
  </div>
</template>
<script>
export default {
  name: 'FeatureBenefits',

  props: {
    items: {
      type: Array,
      required: true,
    },
  },
}
</script>
<style lang="sass" scoped>
@media (max-width: 576px)
  .feature-benefits
    .feature-item::v-deep
      flex-direction: column
      align-items: center

      .img-wrapper
        margin: 0
        margin-bottom: 20px

      .text-wrapper
        text-align: center
</style>
