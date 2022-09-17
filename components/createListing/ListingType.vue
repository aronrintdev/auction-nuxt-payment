<template>
  <div class="listing-type" @click="$emit('click')">
    <div class="listing-type-title " :class="titleClass" >
      {{ title }}
    </div>
    <div class="listing-type-desc">
      {{ description }}
    </div>
    <div class="listing-type-icon">
      <img
        v-for="i in imageRepeatCount"
        :key="i"
        :src="image"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListingType',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    titleClass: {
      type: String,
      required: true
    },
    imageRepeatCount: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style lang="sass">
@import '~/assets/css/_variables'

.listing-types

  .listing-type
    background: $white
    padding: 15px 30px
    flex: 1
    border-radius: 5px
    height: 280px
    display: flex
    flex-direction: column
    max-width: 400px
    &:hover
      cursor: pointer
      background: $color-white-2
      border: 1px solid $gray
    &-title
      font-weight: $bold
      font-size: 20px
      line-height: 24px
      letter-spacing: -0.02em
      margin-bottom: 10px
      &.selling
        color: $orange
      &.auction
        color: $light-orange
      &.trade
        color: $primary
    &-desc
      color: $color-gray-6
      font-size: 16px
      line-height: 19px
      letter-spacing: -0.02em
    &-icon
      padding: 0 0 44px
      flex: 1
      display: flex
      align-items: flex-end
      justify-content: center
      flex-flow: row wrap
      width: 300px
      margin: auto
      img
        height: 84px
</style>
