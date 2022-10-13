<template>
    <div class="accordion-filter-item w-100">
      <div id="panelsStayOpen-headingOne" class="accordion-filter-header mb-0">
        <div
          v-b-toggle="`collapse-${uniqueKey}`"
          aria-controls="panelsStayOpen-collapseOne"
          aria-expanded="false"
          class="accordion-filter-button collapsed position-relative d-flex align-items-center w-100 p-0 background-transparent botder-0"
          data-bs-target="#panelsStayOpen-collapseOne"
          data-bs-toggle="collapse"
          type="button"
        >
          <div class="row w-100 mr-1">
            <div class="panel-title fs-16 fw-7 font-secondary col-8">
              {{ title }}
            </div>
            <h6
              class="col-4 mb-0 text-black fs-16 fw-5 font-secondary text-capitalize text-truncate"
            >
              {{ localSelectedValue }}
            </h6>
          </div>
        </div>
      </div>
  
      <b-collapse
        :id="`collapse-${uniqueKey}`"
        :accordion="`accordion-${title}`"
        role="tabpanel"
        class="accordion-filter-collapse"
        aria-labelledby="panelsStayOpen-headingOne"
      >
        <div class="accordion-filter-body p-0">
          <slot> </slot>
        </div>
      </b-collapse>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        default: '',
      },
      defaultOpen: {
        type: Boolean, // to open accordion by default
        default: false,
      },
      selectedValue: {
        type: [String, Array],
        default: '',
      },
    },
    data() {
      return {
        uniqueKey: null,
        localSelectedValue: this.selectedValue,
      }
    },
    watch: {
      selectedValue(newValue) {
        this.localSelectedValue = newValue
      },
    },
    mounted() {
      if (this.defaultOpen)
        this.$root.$emit('bv::toggle::collapse', `collapse-${this.uniqueKey}`)
      this.uniqueKey = Math.random().toString(36).substring(2)
    },
  }
  </script>
  <style scoped lang="sass">
  @import '~/assets/css/_variables'
  .accordion-filter-item
    background: none
    border: none
    .accordion-filter-button
      color: $color-blue-20
      overflow-anchor: none
      transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, border-radius 0.15s ease
      @media (prefers-reduced-motion: reduce)
        transition: none
      &::after
        flex-shrink: 0
        width: 20px
        height: 20px
        content: ''
        background-image: url('~/assets/img/icons/arrow-down-black.svg')
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
      // max-height: 150px
      overflow-y: auto
      overflow-x: hidden
      scroll-behavior: smooth
      margin: 20px 0 0 0
    ::-webkit-scrollbar
      width: 6px !important
    ::-webkit-scrollbar-thumb
      background-color: $color-blue-2
      border: none !important
    ::-webkit-scrollbar-track
      background-color: $color-gray-3
  </style>