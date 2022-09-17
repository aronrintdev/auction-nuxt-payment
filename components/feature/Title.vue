<template>
  <h3 class="title text-uppercase"><slot /></h3>
</template>
<script>
export default {
  name: 'FeatureTitle',
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

h3.title
  @include heading-7
  color: $color-black-5
</style>
