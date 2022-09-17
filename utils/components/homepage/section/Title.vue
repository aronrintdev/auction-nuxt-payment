/* eslint-disable vue/no-v-html */
<template>
  <div class="section-title-wrapper">
    <div class="text-title" v-html="title"></div>
    <div class="text-description" v-html="description"></div>
  </div>
</template>
<script>
export default {
  name: 'HomeSectionTitle',

  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.section-title-wrapper
  display: flex
  align-items: center

  .text-title
    @include heading-5
    color: $color-black-1
    font-family: Adobe Garamond Pro
    text-align: right
    margin-right: 100px
    margin-left: 49px
    width: 233px

  .text-description
    @include body-3-regular
    color: $color-gray-6

  @media (max-width: 1158px)
    flex-direction: column

    .text-title
      margin: 0

    .text-description
      margin-top: 20px
      text-align: right
      width: 100%

  @media (max-width: 830px)
    .text-title
      width: 100%
      text-align: left

    .text-description
      text-align: left
</style>
