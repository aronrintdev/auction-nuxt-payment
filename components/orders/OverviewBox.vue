<template>
  <div class="overview-box col align-middle mx-1">
    <div class="d-flex flex-md-row flex-column align-items-stretch h-100">
      <div class="box-icon text-center"><img :src="icon" alt=""></div>
      <div
        class="text-md-left text-center d-flex d-md-block flex-column justify-content-between align-items-stretch h-100">
        <div class="box-title">{{ label }}</div>
        <div class="box-value">{{ value }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OverviewBox',
  props: {
    value: {
      type: String,
      default: ''
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
  height: 81px
  background: $white
  border-radius: 10px
  padding: 20px

.box-icon
  margin-right: 20px

.box-title
  font-family: $font-family-sf-pro-display
  font-weight: $regular
  white-space: nowrap
  letter-spacing: 0px
  word-spacing: 0px
  @include body-8

.box-value
  font-family: $font-montserrat
  @include body-1-bold

@media (max-width: 992px)
  .box-icon
    margin-right: 0
  .overview-box
    box-shadow: inset 0px 1px 4px #FFFFFF
    filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.31))
    border-radius: 8px
    height: 119px
    padding: 5px

  .box-title
    font-family: $font-montserrat
    color: $color-gray-69
    @include body-9-regular
    height: 100%
    display: flex
    flex-direction: column
    justify-content: flex-end

  .box-value
    @include body-8-medium
    color: $color-black-4
    height: 100%
    display: flex
    flex-direction: column
    justify-content: center

  .col
    flex-basis: auto
    flex-grow: 0
</style>
