<template>
  <div class="nav-group">
    <b-button-group>
      <b-button
        v-for="(item, index) in data"
        :key="`nav-group-${navKey}-${index}`"
        :class="{ active: item.value === value }"
        :title="item.label"
        @click="onClick(item.value)"
        >{{ item.label }}</b-button
      >
    </b-button-group>
  </div>
</template>
<script>
export default {
  name: 'NavGroup',

  props: {
    value: {
      type: String,
      default: null,
    },
    data: {
      type: Array, // Array of nav item, example: { label: '#', value: '#'}
      default: () => [],
    },
    navKey: {
      type: String,
      default: '',
    },
  },

  methods: {
    onClick(value) {
      this.$emit('input', value)
      this.$emit('change', value)
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.nav-group
  .btn-group
    background-color: $color-gray-3
    border-radius: 20px
    padding: 4px 6px

    .btn
      @include body-6-regular
      background-color: $color-gray-3
      border: 0 !important
      border-radius: 20px !important
      color: $color-black-1 !important
      padding: 6px 35px
      height: auto

      &.active
        background-color: $color-white-1
        font-weight: $medium

      &::before
        display: block
        content: attr(title)
        font-weight: $medium
        height: 0
        overflow: hidden
        visibility: hidden

  @media (max-width: 576px)
    .btn-group
      width: 100%


</style>
