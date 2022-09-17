<template>
  <div
    class="support-search-box-wrapper position-relative"
    :class="{ 'mx-auto': centered }"
  >
    <b-form-input
      type="search"
      :placeholder="$t('preferences.profile.support.searchPlaceholer')"
      class="border bg-white py-4 pl-5 search-input br-8"
    ></b-form-input>
    <img
      :src="require('~/assets/img/icons/search.svg')"
      class="position-absolute search-icon fs-20"
    />
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
.support-search-box-wrapper
  width: 700px
  .search-input
    font-family: $font-montserrat
    padding: 30px 70px !important
  .search-icon
    top: 21px
    left: 30px
    color: $color-gray-68
</style>
