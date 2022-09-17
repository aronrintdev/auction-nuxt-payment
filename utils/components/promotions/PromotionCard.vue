<template>
  <div :class="`mt-5 d-flex align-items-center align-${imageAlign}`">
    <div class="block-image">
      <img v-if="data.promotion_image" :src="data.promotion_image" height="200" width="280"/>
    </div>
    <div class="flex-1">
      <div class="body-2-medium mb-3">{{ data.name }}</div>
      <div class="body-8-medium mb-3">{{ data.subheader }}</div>
      <p class="body-8-regular mb-0">{{ data.description }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PromotionCard',
  props: {
    data: {
      type: Object,
      default: () => {
      },
    },
    imageAlign: {
      type: String,
      default: 'left',
    }
  }
};
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.align-right
  flex-direction: row-reverse

.block-image
  min-width: 280px
  height: 200px
  background: $color-ui-secondary-disabled
  margin-right: 90px

  img
    object-fit: cover

.body-2-medium
  color: $color-blue-20

.align-right
  .block-image
    margin-right: 0
    margin-left: 90px
</style>
