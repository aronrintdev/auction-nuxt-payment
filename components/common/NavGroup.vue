<template>
  <div class="nav-group">
    <b-button-group class="col-lg-8" :style="btnGroupStyle">
      <b-button
        v-for="(item, index) in data"
        :key="`nav-group-${navKey}-${index}`"
        :class="{ active: item.value === value }"
        :title="item.label"
        :style="btnStyle"
        class="font-primary"
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
    btnGroupStyle: {
      type: Object,
      default: () => {}
    },
    btnStyle: {
      type: Object,
      default: () => {}
    }
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
@import '~/assets/css/_typography'

.nav-group
  @media (min-width: 576px)
    margin: 14px 0
  .btn-group
    background-color: $color-white-19
    border-radius: 20px
    padding-top: 5px
    padding-bottom: 5px
    .btn
      @include body-6-regular
      background-color: $color-white-19
      border: 0 !important
      border-radius: 20px !important
      color: $color-black-1 !important
      height: auto
      font-size: 13px
      @media (min-width: 576px)
        font-size: 15px
        
      &.active
        background-color: $color-white-1
        font-weight: $medium
      &::before
        display: block
        content: attr(title)
        font-weight: $normal
        height: 0
        overflow: hidden
        visibility: hidden

  @media (max-width: 576px)
    .btn-group
      width: 100%
      .btn
        white-space: nowrap
</style>
