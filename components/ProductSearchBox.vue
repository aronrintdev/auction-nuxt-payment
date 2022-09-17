<template>
  <div class="form">
    <i class="fa fa-search"></i>
    <input
      type="text"
      :value="searchText"
      class="form-control form-input border-0"
      :placeholder="$t('navbar.search')"
      @input="onSearch"
      @keydown.enter="onSearch"
    />
  </div>
</template>

<script>
import debounce from 'lodash.debounce'

import searchIcon from '~/assets/img/icons/search.svg'

export default {
  name: 'ProductSearchBox',
  props: {
    text: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    searchIcon,
    searchText: null,
  }),
  watch: {
    text(newV) {
      this.searchText = newV
    },
  },
  mounted() {
    this.searchText = this.text
  },
  methods: {
    // Search box "Input" event listener
    onSearch(e) {
      this.searchText = e.target.value
      this.showSearchResult()
    },
    // Emit search function every 300ms
    showSearchResult: debounce(function () {
      this.$emit('search', this.searchText)
    }, 300),
  },
}
</script>
