<template>
    <div v-if="options && options.length" class="accordion-filter-item background-transparent w-100">
      <h2 id="panelsStayO pen-headingOne" class="accordion-filter-header mb-0">
        <button
          v-b-toggle="`collapse-${collapseKey}`"
          aria-controls="panelsStayOpen-collapseOne"
          aria-expanded="false"
          class="accordion-filter-button collapsed position-relative d-flex align-items-center w-100 pa-0 background-transparent border-0"
          data-bs-target="#panelsStayOpen-collapseOne"
          data-bs-toggle="collapse"
          type="button"
        >
          {{ title }}
        </button>
      </h2>
  
      <b-collapse
        :id="`collapse-${collapseKey}`"
        :accordion="`accordion-${title}`"
        role="tabpanel"
        class="accordion-filter-collapse"
        aria-labelledby="panelsStayOpen-headingOne"
      >
        <SearchInput
            :value="search"
            :placeholder="$t('common.search_brands')"
            variant="light"
            class="flex-grow-1 search-input brands-search border border-success rounded"
            :debounce="1000"
            styles="brands-search"
            @change="handleSearchChange"
        />
        <div class="accordion-filter-body">
          <div v-for="(item, index) in options" :key="index" class="form-check">
            <input
              :id="`${title}-flexCheckDefault-${index}`"
              :checked="value && value.includes(item.value)"
              class="form-check-input border-0"
              type="checkbox"
              @click="updateFilter(item.value)"
            />
            <label
              :for="`${title}-flexCheckDefault-${index}`"
              class="form-check-label"
            >
              {{ capitalizeFirstLetter(item.label) }}
            </label>
          </div>
        </div>
      </b-collapse>
    </div>
  </template>
  
  <script>
  import {SearchInput} from '~/components/common'

  export default {
    components: {
        SearchInput
    },
    props: {
      collapseKey: {
        type: String,
        default: '',
      },
      title: {
        type: String,
        default: '',
      },
      options: {
        type: Array,
        default: () => [],
      },
      value: {
        type: Array,
        default: () => [],
      },
      multiSelect: {
        type: Boolean,
        default: true,
      },
    },
  
    mounted() {
      if (this.value && this.value.length > 0) {
        this.$root.$emit('bv::toggle::collapse', `collapse-${this.collapseKey}`)
      }
    },
  
    methods: {
      capitalizeFirstLetter(string) {
        return string[0].toUpperCase() + string.slice(1)
      },
  
      updateFilter(value) {
        if (!this.multiSelect) {
          this.$emit('input', [value])
        } else if (this.value?.includes(value)) {
          this.$emit('input', this.removeItem(this.value, value))
        } else if (this.value) {
          this.$emit('input', [...this.value, value])
        } else {
          this.$emit('input', [value])
        }
      },
  
      removeItem(arr, value) {
        return arr?.filter((i) => i !== value)
      },

      handleSearchChange(value) {
        this.$emit('searchBrands', value)
      }
    },
  }
  </script>
  <style scoped lang="sass">
  @import '~/assets/css/_variables'
  .brands-search 
    img
        width: 14px
  .accordion-filter-item
  
    .accordion-filter-button
      @include body-4-bold
      color: $color-black-1
      overflow-anchor: none
      transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, border-radius 0.15s ease
  
      @media (prefers-reduced-motion: reduce)
        transition: none
  
      &::after
        flex-shrink: 0
        width: 20px
        height: 20px
        margin-left: auto
        content: ''
        background-image: url('~/assets/img/icons/arrow-down-gray2.svg')
        background-repeat: no-repeat
        background-size: 20px
        transition: transform 0.2s ease-in-out
  
      @media (prefers-reduced-motion: reduce)
        &::after
          transition: none
  
      &:hover
        z-index: 2
  
      &:focus
        z-index: 3
        border-color: $color-blue-14
        outline: 0
        box-shadow: 0 0 0 0.25rem $color-blue-15
  
      &:focus
        box-shadow: none
  
      &:not(.collapsed)
        &::after
          transform: rotate(-180deg)
  
    .accordion-filter-body
      max-height: 150px
      overflow: auto
      scroll-behavior: smooth
      margin: 20px 0 0 0
      padding: 0
  
      .form-check
        margin-bottom: 7px
  
        & > *
          cursor: pointer !important
  
        .form-check-input
          box-shadow: none
  
          &::after
            content: ' '
            background-color: $color-gray-3
            position: absolute
            left: 0
            top: 50%
            width: 16px
            height: 16px
            transform: translateY(-7px)
            border-radius: 2px
  
          &:checked
            &::after
              background-color: $color-blue-2
              border-color: $color-blue-2
              box-shadow: none
  
        label
          @include body-5-normal
          text-align: left
          color: $color-gray-41
          padding-left: 6px
          width: 100%
  
    ::-webkit-scrollbar
      width: 6px !important
  
    ::-webkit-scrollbar-thumb
      background-color: $color-blue-2
      border: none !important
  
    ::-webkit-scrollbar-track
      background-color: $color-gray-3
  </style>
  