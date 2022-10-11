<template>
  <hr v-if="visible" class="divider">
</template>

<script>
export default {
  name: 'ItemDivider',
  props: {
    visible: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~/assets/css/variables"
.divider
  border-top: 1px solid rgba($color-gray-23, 0.17)
  margin-top: 8px
  margin-bottom: 8px

</style>
