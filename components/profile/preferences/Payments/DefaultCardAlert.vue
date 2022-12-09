<template>
  <div v-if="isScreenXS" class="alert-component-wrapper">
    <!-- popup heading -->
    <div class="mx-auto d-flex alert-text text-center justify-content-center">
      {{ $t('preferences.payments.add_new_default_alert') }}
    </div>
    <!-- popup heading -->

    <!-- add new -->
    <div class="d-flex justify-content-center mt-3">
      <b-button
        variant="add-default-button"
        class="
          align-items-center
          text-align-center
          d-flex
          justify-content-center
          mt-2
        "
        role="button"
        @click="$emit('addCardDefault')"
      >
        <span class="btn-default">
          {{ $t('preferences.payments.add_new_default') }}
        </span>
      </b-button>
    </div>
    <!-- add new -->

    <!-- dismiss -->
    <div class="d-flex justify-content-center pt-2">
      <p
        class="
          dismiss-button
          align-items-center
          text-align-center
          d-flex
          justify-content-center
          mt-2
        "
        role="button"
        @click="$emit('dismissAddDefault')"
      >
        {{ $t('common.dismiss') }}
      </p>
    </div>
    <!-- dismiss -->

    <div class="text-center position-absolute bottom-indicator w-100">
      <img
        :src="require('~/assets/img/icons/home_indicator.svg')"
        alt="footer-icon"
      />
    </div>
  </div>
</template>

<script>
import screenSize from '~/plugins/mixins/screenSize'
export default {
  name: 'DefaultCardAlert',
  mixins: [screenSize],
  layout: 'Profile',

  middleware: 'auth',
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.alert-component-wrapper
  .alert-text
    width: 335px
    height: 48px
    left: 20px
    top: 626px
    font-family: $font-sp-pro
    font-style: normal
    @include body-32-normal
    color: $color-black-1

  .btn-add-default-button
    width: 216px
    height: 40px
    background: $color-blue-20
    border-radius: 21px
  .btn-default
    font-family: $font-sp-pro
    font-style: normal
    @include body-13-medium
    color: $color-white-1
    background: $color-blue-20

  .dismiss-button
    font-family: $font-sp-pro
    font-style: normal
    @include body-34-medium
    color: $color-blue-20
</style>