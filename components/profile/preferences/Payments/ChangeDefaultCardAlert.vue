<template>
  <div v-if="isScreenXS" class="alert-component-wrapper-default">
    <!-- popup heading -->
    <div class="w-100 d-flex alert-text justify-content-center">
      {{ $t('preferences.payments.change_default_card_alert') }}
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
        <span class="btn-default"> {{ $t('common.yes') }}</span>
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
        {{ $t('common.cancel') }}
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
  name: 'ChangeDefaultCardAlert',
  mixins: [screenSize],
  layout: 'Profile',

  middleware: 'auth',
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.alert-component-wrapper-default
  .alert-text
    width: 210px
    font-family: $font-sp-pro
    font-style: normal
    @include body-32-normal
    text-align: center
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