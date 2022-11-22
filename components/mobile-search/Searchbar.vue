<template>
  <section class="auction-filters px-2 py-3 d-block">
    <div class="auction-filters-content">
      <div class="d-flex justify-content-between">
        <div class="searchbox">
          <search-box
            :searchText="searchText"
            :placeholder="`${$t('common.search')}`"
            @search="search"
          />
          <div v-if="hasSearchResult" class="dropdown-options">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ClickOutside from 'vue-click-outside'
import debounce from 'lodash.debounce'
import SearchBox from '../RoundSearchBox'
export default {
  name: 'ShopSearchbar',
  components: {
    SearchBox,
  },
  directives: {
    ClickOutside,
  },
  props: {
    searchKeyword: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      searchText: null,
      hasSearchResult: false,
    }
  },
  watch: {
    searchKeyword(newV) {
      this.searchText = newV
    },
    selectedFilters: {
      handler(newV) {
        this.emitChange(newV)
      },
      deep: true,
    },
  },
  mounted() {
    this.searchText = this.searchKeyword
    // Get categories li
  },
  methods: {
    // Search event listener
    search(value) {
      this.searchText = value
    },
    // Submit updated filters
    emitChange: debounce(function (filters) {
      this.$emit('change', filters)
    }, 300),
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.dropdown-sort::v-deep
  .btn-dropdown
    @include body-4-normal
    color: $color-black-1
    border: 1px solid transparent
    background-color: $color-white-4
    border-radius: 8px
    height: 48px
    width: 327px
    padding: 0 13px 0 23px

    .icon-main
      margin-right: 20px !important

    .icon-clear
      right: 23px

    &.opened
      border-bottom-left-radius: 0
      border-bottom-right-radius: 0
      border: 1px solid transparent

  .search-results
    .popover-body
      >div
        @include body-4-normal
        font-family: $font-family-base
        color: $color-black-1
        background-color: $color-white-4
        height: 46px
        border: none
        border-bottom: 0.2px solid $light-gray-2
        padding: 0 23px
        &:hover
          color: $color-gray-5

        &:last-child
          border-bottom-left-radius: 8px
          border-bottom-right-radius: 8px
          border: none
.overflow-x-hidden
  overflow-x: hidden
::v-deep .nav-group
  .btn-group
    background-color: $white-3
    .btn
      background-color: $white-3
.overlay
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: rgba($gray, 0.05)
.searchbox::v-deep .rounded-search-input
  padding: 13px
  padding-top: 8px
  padding-bottom: 8px
</style>
