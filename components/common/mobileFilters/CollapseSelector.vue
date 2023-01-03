<template>
  <div v-if="options && options.length" class="accordion-filter-item bg-transparent border-0 w-100">
    <h2 id="panelsStayOpen-headingOne" class="accordion-filter-header mb-0">
      <button
        v-b-toggle="`collapse-${collapseKey}`"
        aria-controls="panelsStayOpen-collapseOne"
        aria-expanded="false"
        class="
          accordion-filter-button
          w-100
          collapsed
          position-relative
          d-flex
          align-items-center
          bg-none
          border-0
          p-0
          bg-none
        "
        data-bs-target="#panelsStayOpen-collapseOne"
        data-bs-toggle="collapse"
        type="button"
      >
        <div class="row w-100">
          <div class="col text-left">
            {{ title }}
          </div>
          <div class="col text-right pr-3">
            <span v-if="value && value.length > 0" class="filters">
              <span v-for="(item, index) in value" :key="index">
                {{ item.text }}<span v-if="index < value.length-1">,</span>
              </span>
            </span>
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
          class="rounded denomination mr-2"
          :class="
            value.includes(option)
              ? 'active d-flex align-items-center text-align-center'
              : ''
          "
          role="button"
        >
          <div
            class="add-amount-item d-flex align-items-center justify-content-center"
            :class="value.includes(option) ? 'active' : ''"
            @click="activeStatus(option)"
          >
            {{ option.label || option.text }}
          </div>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: 'CollapseSelector',
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
      default: true,
    },
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      active: [],
    }
  },
  watch: {
    value(n) {
      if (!n.length  && this.active.length > 0) {
        this.active = []
      }
    }
  },
  mounted() {
    this.active = this.value
  },
  methods: {
    // Update the selected status
    activeStatus(value) {
      // checking array contain the id
      const isExist = this.active.includes(value)
      if(isExist) {
        this.active = this.active.filter((activeItem) => activeItem.value !== value.value)
      } else {
        this.active.push(value)
      }
      this.$emit('input', this.active)
      this.$emit('selected', this.active)
    },
  }
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
      overflow: hidden
      white-space: nowrap
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
    // justify-content: space-evenly
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
  border: 1px solid $color-gray-4
  color: $color-gray-7
  padding: 1rem
  width: 99px
  height: 45px
  font-family: $font-sp-pro
  font-style: $normal
  font-weight: $medium
  border-radius: 5px
  @include body-5
  color: $color-gray-28
  &.active
    border-color: $color-black-1
    background-color: $color-gray-2
    @include body-11-medium
    line-height: 18px

.denomination
  &.active
    // background: $color-gray-21
    // border: 1px solid $color-black-1
    .add-amount-item
      font-style: normal
      @include body-1118-medium
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
