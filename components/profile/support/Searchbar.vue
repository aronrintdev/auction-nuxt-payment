<template>
  <div class="support-search-box" :class="{ 'mx-auto': centered }">
    <div class="border d-flex align-items-center br-8 bg-white p-md-2">
      <img
          :src="require('~/assets/img/profile/mobile/mobile-search.svg')"
          class="search-icon fs-20"
      />
      <div class="w-100">
        <input type="search" :placeholder="$t('preferences.profile.support.searchPlaceholer')"
               :class="mobileClass" class="form-control no-border bg-white br-8"/>
      </div>
    </div>
  </div>
</template>
<script>
import screenSize from '~/plugins/mixins/screenSize';

export default {
  mixins: [screenSize],
  props: {
    centered: Boolean,
  }
}
</script>
<style lang="sass">
@import '~/assets/css/_variables'
.form-control
  &.mobile
    &::placeholder
      @include body-9-regular
      font-family: $font-montserrat
      font-style: normal
      letter-spacing: 0.06em
      color: $color-gray-5


.support-search-box
  width: 700px
  font-family: $font-montserrat
  color: $color-gray-5

  .search-icon
    margin-left: 10px
    color: $color-gray-68

@media (max-width: 767px)
  .support-search-box
    width: 100%
    height: 33px

    .border
      border: none !important
    .form-control
      font-size: 12px
      height: 33px
</style>
