<template>
  <div class="nav-group">
    <b-button-group>
      <b-button
        v-for="(item, index) in data"
        :key="`nav-group-${navKey}-${index}`"
        :class="{ active: item.value === value }"
        :title="item.label"
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
    margin: 50px 0
  .btn-group
    background-color: $color-white-19
    border-radius: 20px
    padding: 4px 6px
    .btn
      @include body-6-regular
      background-color: $color-white-19
      border: 0 !important
      border-radius: 20px !important
      color: $color-black-1 !important
      padding: 6px 35px
      height: auto
      @media (min-width: 300px)  and (max-width: 500px)
        padding: 0px
      &.active
        background-color: $color-white-1
        font-weight: $medium
        @media (min-width: 300px)  and (max-width: 500px)
          width: 102px
          height: 24px
          border-radius: 14.5px !important
          font-size: 11px
      &::before
        display: block
        content: attr(title)
        font-weight: $normal
        height: 0
        overflow: hidden
        visibility: hidden
  @media (min-width: 300px)  and (max-width: 500px)
    padding: 0px
    font-size: 11px

    .btn-group
      flex-direction: row
      border-radius: 20px
      width: 343px
      height: 32px
      @media (min-width: 300px)  and (max-width: 330px)
        width: 280px
      .btn
        padding: 6px 10px
        white-space: nowrap
</style>
