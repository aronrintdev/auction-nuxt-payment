<template>
  <div :class="`d-flex align-items-${isScreenXS? 'start': 'center'} align-${imageAlign} ${isScreenXS? 'mt-2': 'mt-5'}`">
    <div :class="mobileClass" class="block-image d-flex flex-column">
      <img v-if="data.promotion_image" :class="mobileClass" :src="data.promotion_image" class="promotion-image"
           height="200" width="280"/>
    </div>
    <div>
      <div :class="{
        'mb-3': !isScreenXS,
        'mb-2': isScreenXS
      }" class="body-2-medium ">{{ data.name }}
      </div>
      <div :class="{
        'mb-3': !isScreenXS,
        'mb-2': isScreenXS
      }" class="body-8-medium ">{{ data.subheader }}
      </div>
      <p class="body-8-regular mb-0">{{ data.description }}</p>
    </div>
  </div>
</template>
<script>
import screenSize from '~/plugins/mixins/screenSize';

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
  },
  mixins: [screenSize]
};
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.promotion-image
  &.mobile
    height: 100px
    width: 100px

.align-right
  flex-direction: row-reverse

.block-image
  min-width: 280px
  height: 200px
  background: $color-ui-secondary-disabled
  margin-right: 90px

  &.mobile
    background: transparent
    height: 100%
    min-width: 100px
    margin-right: 18px

  img
    object-fit: cover

.body-2-medium
  color: $color-blue-20

.align-right
  .block-image
    margin-right: 0
    margin-left: 90px
</style>
