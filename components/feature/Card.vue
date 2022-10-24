<template>
  <div
    class="feature-card d-flex align-items-start flex-column"
    @click="handleCardClick"
  >
  <div style="height: 294px;margin: 0 auto;display: flex;justify-content: center;align-items: center;">
    <img
      :src="imageUrl"
      class="w-100"
    />
  </div>
    <div class="feature-title">{{ title }}</div>
    <div class="feature-description">
      {{ description }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'FeatureCard',

  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    imageUrl: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      default: null,
    },
  },

  methods: {
    handleCardClick() {
      if (this.to) {
        this.$router.push(this.to)
      }
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.feature-card
  color: $color-black-1
  cursor: pointer

  .feature-title
    @include body-1-regular
    margin-top: 12px
    padding: 0 7px

  .feature-description
    @include body-5-normal
    margin-top: 6px
    padding: 0 7px
</style>
