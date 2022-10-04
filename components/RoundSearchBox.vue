<template>
  <div class="form-group rounded-search-input">
    <img :src="searchIcon" class="icon-search" alt="search" />
    <input id="product-search-input" type="text" :placeholder="placeholder" :value="text" @input="onSearch" @focus="onFocus">
    <Icon
      v-if="text"
      src="close-gray.svg"
      hover-src="close.svg"
      width="15"
      height="15"
      class="btn-clear"
      @click="handleClearClick"
    />
  </div>
</template>

<script>
import debounce from 'lodash.debounce';
import searchIcon from '~/assets/img/icons/search.svg';
import { Icon } from '~/components/common'

/* Round Search Box Component */
export default {
  name: 'RoundSearchBox',
  components: {
    Icon,
  },
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    searchText: {
      type: String,
      default: null,
    },
  },
  data: () => ({
    searchIcon,
    text: null,
  }),
  watch: {
    searchText(newVal) {
      this.text = newVal;
    }
  },
  mounted() {
    this.text = this.searchText;
  },
  methods: {
    // Listen text changes
    onSearch(e) {
      this.text = e.target.value;
      this.showSearchResult();
    },
    // Emit 'search' event to parent
    showSearchResult: debounce(function() {
      this.$emit('search', this.text);
    }, 300),
    handleClearClick() {
      this.text = null
      this.$emit('search', null)
    },
    onFocus() {
      this.$emit('focus')
    }
  }
};
</script>
