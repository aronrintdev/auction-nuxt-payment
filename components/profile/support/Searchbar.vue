<template>
  <div class="support-search-box" :class="{ 'mx-auto': centered }">
    <div class="border d-flex align-items-center br-8 bg-white p-md-2">
      <img
        :src="require('~/assets/img/icons/search.svg')"
        class="search-icon fs-20"
      />
      <div class="w-100">
        <input type="search" :placeholder="$t('preferences.profile.support.searchPlaceholer')"
               class="form-control no-border bg-white br-8"/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    centered: Boolean,
  },
}
</script>
<style lang="sass">
@import '~/assets/css/_variables'
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
