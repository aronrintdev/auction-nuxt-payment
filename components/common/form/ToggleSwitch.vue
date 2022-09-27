<template>
  <div>
    <b-form-checkbox
      name="check-button"
      switch
      class="switchtoggle d-flex justify-content-center fs-14 fw-5 font-weight-lighter"
    >
      <p class="w-100 ml-4 mt-2 fs-15 fw-5 font-primary">{{ title }}</p>
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
  .custom-control-label
    &:before
      background: rgba(120, 120, 128, 0.16)
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
      box-shadow: 0px 0px 5px 0px rgb(0 0 0 / 4%)
  .custom-control-input
    &:checked~.custom-control-label
      &:after
        background-color: $color-white-1
        transform: translateX(1.24rem)
      &:before
        background-color: $color-green-16
</style>
