<template>
  <div class="nav-group" :class="navGroupClass">
    <b-button-group :style="btnGroupStyle" :class="btnGroupClass">
      <b-button
        v-for="(item, index) in data"
        :key="`nav-group-${navKey}-${index}`"
        :class="[item.value === value ? 'active' : '', btnClass]"
        :title="item.label"
        :style="btnStyle"
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
    navGroupClass: {
      type: String,
      default: '',
    },
    btnClass: {
      type: String,
      default: '',
    },
    btnGroupStyle: {
      type: Object,
      default: () => {},
    },
    btnGroupClass: {
      type: String,
      default: '',
    },
    btnStyle: {
      type: Object,
      default: () => {},
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
@import '~/assets/css/_typography'

.nav-group
  @media (min-width: 576px)
    margin: 32px 0
  .mx-19
    margin-left: 19px
    margin-right: 19px
  .btn-group
    background-color: $color-white-19
    border-radius: 20px
    padding: 4px 6px
    height: 40px
    @media (max-width: 576px)
      height: 35px
    .btn, .btn-lg
      @include body-6-regular
      background-color: $color-white-19
      border: 0 !important
      border-radius: 20px !important
      color: $color-black-1 !important
      height: auto
      font-size: 14px
      font-family: $font-family-montserrat
      line-height: 17px
      padding: 6px 17px
      .w-98
        width: 98px
      .h-30
        height: 30px
      .px-25-py-7
        padding: 7px 25px

      @media (min-width: 576px)

      &.active
        background-color: $color-white-1
        font-weight: $medium
        @include body-6
      &::before
        display: block
        content: attr(title)
        font-weight: $medium
        height: 0
        overflow: hidden
        visibility: hidden
    .btn-lg
      @include body-5-regular

  @media (max-width: 576px)
    .btn-group
      width: 100%
      max-width: 343px
      .btn
        padding: 6px 10px
        white-space: nowrap
        @include body-6

  @media (max-width: 375px)
    .btn-group
      width: 100%
      .btn
        padding: 6px 5px
        white-space: nowrap
        @include body-6
</style>
