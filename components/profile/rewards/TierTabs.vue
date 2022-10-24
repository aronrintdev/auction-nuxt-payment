<template>
  <div class="d-flex align-items-center justify-content-between">
    <div v-for="item in tiers" :key="item.stage" :class="{'active': current === item.stage}" class="tab"
         @click="$emit('change', item.stage)">
      {{ $t('rewards.tier') }} {{ item.stage }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TierTabs',
  props: {
    current: {
      type: Number,
      default: 1
    },
    tiers: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~/assets/css/variables"
.tab
  @include body-2
  font-family: $font-family-sf-pro-text
  font-style: normal
  font-weight: $medium
  color: $color-black-1
  padding-bottom: 5px

  &.active
    padding-bottom: 3px
    border-bottom: 2px solid $color-orange-11
</style>
