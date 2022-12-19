<template>
  <div v-if="options && options.length" class="accordion-filter-item background-transparent border-0 w-100">
    <h2 id="panelsStayO pen-headingOne" class="accordion-filter-header mb-0">
      <button
        v-b-toggle="`collapse-${collapseKey}`"
        aria-controls="panelsStayOpen-collapseOne"
        aria-expanded="false"
        class="accordion-filter-button mb-0 w-100 p-0 collapsed position-relative d-flex align-items-center bg-none border-0"
        data-bs-target="#panelsStayOpen-collapseOne"
        data-bs-toggle="collapse"
        type="button"
      >
        <div class="row w-100">
          <div class="col text-left">
            {{ title }}
          </div>
          <div class="col text-right">
            <span v-if="value" class="filters overflow-hidden d-inline-block text-nowrap">{{ value.label }}</span>
          </div>
        </div>

      </button>
    </h2>

    <b-collapse
      :id="`collapse-${collapseKey}`"
      :accordion="`accordion-${title}`"
      role="tabpanel"
      class="accordion-filter-collapse"
      aria-labelledby="panelsStayOpen-headingOne"
    >
      <div class="accordion-filter-body d-flex p-0">
        <div
          v-for="(option, index) in options"
          id="amount-list-button"
          :key="index"
          class="denomination mr-2"
          :class="selectedStatus === option.value ? 'active d-flex align-items-center text-align-center' : ''"
          role="button"
        >
          <div class="add-amount-item d-flex align-items-center text-align-center justify-content-center" @click="activeStatus(option)">
            {{ option.label }}
          </div>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: 'CollapseStatus',

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
    multiSelect: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      active: ''
    }
  },

  computed: {
    selectedStatus: (vm) => {
      if(vm.value && vm.value.value){
        return vm.value.value
      }
    }
  },

  methods: {
    // Update the selected status
    activeStatus (value) {
      if (this.multiSelect) {
        this.active = [...this.active, value.value]
      } else {
        this.active = value.value
      }

      this.$emit('selected', this.active)
    }
  },
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.accordion-filter-item

  .accordion-filter-button
    color: $color-black-1
    overflow-anchor: none
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, border-radius 0.15s ease
    overflow-anchor: none
    font-family: $font-sp-pro
    font-style: normal
    @include body-4-bold
    color: $color-blue-20
    .filters
      width: 93px
      height: 19px
      left: 209px
      top: 7px
      font-family: $font-sp-pro
      font-style: normal
      @include body-4-normal
      color: $color-black-1
      text-overflow: ellipsis

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
    justify-content: space-evenly
    scroll-behavior: smooth
    margin: 20px 0 0 0

  ::-webkit-scrollbar
    width: 6px !important

  ::-webkit-scrollbar-thumb
    background-color: $color-blue-2
    border: none !important

  ::-webkit-scrollbar-track
    background-color: $color-gray-3

.add-amount-item
  background: $color-white-1
  color: $color-white-1
  border: 1px solid $color-gray-7
  color: $color-gray-7
  padding: 1rem
  width: 99px
  height: 45px
  font-family: $font-sp-pro
  font-style: normal
  @include body-5-normal
  color: $color-gray-28

.denomination
  &.active
    background: $color-gray-21
    border: 1px solid $color-black-1
    border-radius: 3px
    .add-amount-item
      font-style: normal
      @include body-5-normal
      color: $color-black-1
@media (min-width: 320px) and (max-width:330px)
  .add-amount-item
    width: 82px
  .accordian-filter-collapse
    width: fit-content
    block-size: fit-content
@media (max-width: 320px)
  .add-amount-item
    width: 82px
  .accordian-filter-collapse
    width: fit-content
    block-size: fit-content
</style>
