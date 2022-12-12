<template>
  <div v-if="isScreenXS" class="options-component-wrapper">
    <!-- popup heading -->
    <div class="ml-3 w-100 d-flex card-options-title">
      {{ $tc('common.option', 2) }}
    </div>
    <hr class="title-underline" />
    <!-- popup heading -->

    <!-- edit -->
    <div class="w-100 d-flex justify-content-between" @click="editCard">
      <span class="ml-3 card-options-sub d-flex align-items-center text-center">
        {{ $t('common.edit') }}
      </span>
      <span
        class="header-cancel mr-3 d-flex align-items-center text-center"
        role="button"
      >
        <img
          :src="require('~/assets/img/icons/right-arrow.svg')"
          class="float-right d-flex"
          alt="right arrow"
        />
      </span>
    </div>
    <hr class="title-underline" />
    <!-- edit-->

    <!-- delete -->
    <div
      class="ml-3 w-100 d-flex card-options-sub"
      @click="$emit('deleteCard')"
    >
      {{ $t('common.delete') }}
    </div>
    <hr class="title-underline" />
    <!-- delete -->

    <!-- cancel -->
    <div class="w-100 d-flex" @click="$emit('closed')">
      <span class="ml-3 card-options-sub d-flex" role="button">
        {{ $t('common.cancel') }}
      </span>
    </div>
    <!-- cancel -->

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
  name: 'CardOptions',
  mixins: [screenSize],
  layout: 'Profile',

  middleware: 'auth',

  methods: {
    editCard() {
      this.$emit('editCard')
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.options-component-wrapper
  .card-options-title
    font-family: $font-sp-pro
    font-style: normal
    @include body-34-medium
    letter-spacing: -0.02em
    color: $color-black-1

  .card-options-sub
    font-family: $font-sp-pro
    font-style: normal
    @include body-34-normal
    letter-spacing: -0.02em
    color: $color-black-1
</style>