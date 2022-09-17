<template>
  <div class="overview-box d-flex align-middle">
    <div class="box-icon"><img :src="icon" alt=""></div>
    <div>
      <div class="box-title">{{ label }}</div>
      <div class="box-value">${{ value.toFixed(2) }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OverviewBox',
  props: {
    value: {
      type: Number,
      default: 0
    },
    label: {
      type: String,
      default: '---'
    },
    icon: {
      type: String,
      default: require('~/assets/img/orders/total-sales.svg')
    }
  }
}
</script>

<style scoped lang="sass">
@import '/assets/css/variables'

.overview-box
  min-width: 256.42px
  width: 100%
  height: 81px
  background: $white
  border-radius: 10px
  padding: 20px

.box-icon
  margin-right: 20px

.box-title
  font-family: $font-family-sf-pro-display
  font-weight: $regular
  @include body-8

.box-value
  font-family: $font-montserrat
  @include body-1-bold
</style>
