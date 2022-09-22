<template>
  <div>
    <b-form-checkbox :checked="value" class="notification-switch" switch @change="changed"></b-form-checkbox>
  </div>
</template>

<script>
export default {
  name: 'NotificationSwitch',
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    changed(e){
      console.log(e);
      this.$emit('change', e)
    }
  }
}
</script>

<style scoped lang="sass">
@import "~/assets/css/variables"
::v-deep.notification-switch
  .custom-control-label
    &:before
      height: 31px
      width: 51px
      border-radius: 25px
      border: none
      box-shadow: none
      background-color: rgba($color-gray-61, 0.16)

    &:after
      width: 27px
      height: 27px
      border-radius: 25px
      transform: translateX(-0.02rem)
      background-color: $color-white-1

::v-deep.notification-switch
  .custom-control-input:checked~.custom-control-label
    &:before
      background: $color-green-16
    &:after
      transform: translateX(1.2rem)
      background-color: $color-white-1
</style>