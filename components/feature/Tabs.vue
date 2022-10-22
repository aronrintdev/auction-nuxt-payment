<template>
  <div class="feature-tabs-wrapper">
    <div class="d-flex btns-wrapper">
      <button
        v-for="(option, index) in options"
        :key="`feature-tab-${index}`"
        class="btn-feature-tab d-flex align-items-center justify-content-center flex-shrink-0 font-primary"
        :class="{ active: option.id === currentTab }"
        @click="handleTabClick(option)"
      >
        <img v-if="option.icon" :src="option.icon" />
        <div v-else>{{ option.label }}</div>
      </button>
    </div>

    <div class="tab-panel w-100">
      <slot :name="currentTab" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'FeatureTabs',

  props: {
    options: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      currentTab: null,
    }
  },

  mounted() {
    this.currentTab = this.options[0].id
  },

  methods: {
    handleTabClick(option) {
      if (this.currentTab !== option.id) {
        this.currentTab = option.id
      }
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
@import '~/assets/css/common/buttons'

.feature-tabs-wrapper
  .btn-feature-tab
    @include body-7-bold
    @include button-colors($background: $color-gray-29, $foreground: $color-black-1, $border: $color-gray-29, $background-hover: $color-white-1, $foreground-hover: $color-black-1, $border-hover: $color-white-1, $background-active: $color-white-1, $foreground-active: $color-black-1, $border-active: $color-gray-29, $background-disabled: $color-white-1, $foreground-disabled: $color-gray-29, $border-disabled: $color-white-1)
    height: 106px
    width: 221px
    color: $color-black-1
    margin-right: 75px
    margin-bottom: 37px
    border-radius: 24px
    border: none
    padding: 0
    box-shadow: 0px 1px 4px 0 rgba($color-black-1, 0.25)

    &:hover, &.hover, &:active, &.active, &:focus, &.focus, &:visited, &.visited
      box-shadow: 0px 1px 4px 0 rgba($color-black-1, 0.25)

  .tab-panel
    border-radius: 24px
    box-shadow: 0px 1px 4px 0 rgba($color-black-1, 0.25)


@media (max-width: 768px)
  .btn-feature-tab
    font-size: 12px !important
    &:active
      box-shadow: 0px 4px 4px rgb(0 0 0 / 25%)
</style>
