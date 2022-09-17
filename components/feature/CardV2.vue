<template>
  <div class="feature-card d-flex align-items-center flex-column">
    <Icon
      :src="icon"
      class="feature-icon"
      :width="iconWidth"
      :height="iconHeight"
    />
    <div class="feature-title">{{ title }}</div>
    <div class="feature-description text-center">
      {{ description }}
    </div>
  </div>
</template>
<script>
import Icon from '~/components/common/Icon'

export default {
  name: 'FeatureCardV2',

  components: { Icon },

  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      required: true,
    },
    iconWidth: {
      type: Number,
      default: null,
    },
    iconHeight: {
      type: Number,
      default: null,
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.feature-card
  border: 1px solid $color-gray-3
  border-radius: 14px
  padding: 36px 22px
  color: $color-black-1

  &:not(:last-of-type)
    margin-right: 42px

  .feature-icon
    margin-top: 5px

  .feature-title
    @include body-2-bold
    margin-top: 18px

  .feature-description
    @include body-8-regular
    margin-top: 32px
</style>
