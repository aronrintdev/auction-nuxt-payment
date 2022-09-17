<template>
  <div class="sub-title-wrapper">
    <div class="title">{{ title }}</div>
    <div class="underline">
      <div></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.sub-title-wrapper
  .title
    @include heading-5
    font-family: adobe-garamond-pro, serif
    margin-left: 8px
    color: $color-black-1

  .underline
    padding-right: 19px
    margin-top: 7.5px

    >div
      width: 100%
      border-bottom: 3px solid $color-blue-20
</style>
