<template>
  <div>
    <b-form-checkbox
      name="check-button"
      switch
      class="switchtoggle d-flex justify-content-center fs-14 fw-4 font-weight-lighter"
    >
      <p class="w-100 mt-2 fs-15 fw-4 font-primary switchtoggle-data">
        {{ title }}
      </p>
    </b-form-checkbox>
  </div>
</template>
<script>
export default {
  name: 'ToggleSwitch',
  props: {
    title: {
      type: String,
      default: null,
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.custom-switch::v-deep
  .switchtoggle-data
    margin-left: 30px

  .custom-control-label
    &:before
      background: $color-grey-72
      border: none
      width: 51px
      height: 31px
      border-radius: 50px
      box-shadow: none
    &:after
      width: 27px
      height: 27px
      background-color: $color-white-1
      border-radius: 50%
      border: 0.5px solid $drop-shadow2
      box-shadow: 0px 3px 8px $drop-shadow, 0px 3px 1px $drop-shadow2
  .custom-control-input
    &:checked~.custom-control-label
      &:after
        background-color: $color-white-1
        transform: translateX(1.24rem)
      &:before
        background-color: $color-green-16
</style>
