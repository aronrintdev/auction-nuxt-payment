<template>
  <div class="item d-flex align-items-center justify-content-between" role="button" @click="$emit('click')">
    <div class="title body-5-normal font-secondary text-black text-truncate text-nowrap">
      {{title}}
    </div>
    <div v-if="selected">
      <check-item/>
    </div>
  </div>
</template>

<script>
import checkItem from 'assets/img/icons/dark-blue-check.svg?inline'
export default {
  name: 'MobileFilterItem',
  components: {checkItem},
  props: {
    title: {
      type: String,
      required: true
    },
    selected: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="sass">
@import "~/assets/css/variables"
.item
  background-color: $color-white-1
  padding-block: 11px
  border-bottom: 1px solid $color-gray-62
  .title
    max-width: 250px
</style>
