<template>
  <div class="form browse-search border rounded">
    <div class="form-group selling-search-input">
      <img
        :src="require('~/assets/img/icons/search.svg')"
        class="icon-search"
        alt="Search"
      />
      <input
        id="selling-search-input"
        type="text"
        :placeholder="placeholder"
        :value="searchText"
        @input="onSearch"
        @keydown.enter="onSearch"
      />
    </div>
  </div>
</template>
<script>
import debounce from 'lodash.debounce'
export default {
  name: 'SearchBar',
  
  data() {
    return {
      apiUrl: process.env.API_URL,
      searchText: '',
      placeholder: this.$t('selling_page.filter_details_placeholder'),
      hideSearch: false,
    }
  },
  methods: {
    // On input
    onSearch(e) {
      if (e.target.value) {
        this.hideSearch = false
        this.searchText = e.target.value
        this.showSearchResult()
      } else {
        this.hideSearch = true
        this.searchText = ''
        this.showSearchResult()
      }
    },
    // Emit search text for product list
    showSearchResult: debounce(function () {
      this.$emit('search', this.searchText)
    }, 300),
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
#selling-search-input::v-deep
  &::placeholder
    font-family: $font-montserrat
    font-style: normal
    @include body-5-regular
    letter-spacing: 0.06em
    text-transform: capitalize
    color: $color-gray-5
</style>