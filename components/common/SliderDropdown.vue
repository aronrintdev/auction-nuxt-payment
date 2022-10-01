<template>
  <div
    v-click-outside="hideMenu"
    class="position-relative accordion-filter-item"
    :class="{ 'collapsed': !menuVisible }"
    :style="{ width: `${width}px` }"
  >
    <div class="d-flex align-center justify-between accordion-filter-header">
      <div role="button" class="accordion-filter-button" @click="menuVisible = !menuVisible">
        {{ title }}
      </div>
    </div>

    <div v-show="menuVisible" class="accordion-filter-body">
      <div class="mr-2">
        <b-row class="filter-price">
          <b-col cols="6">
            <label for="formFileSm" class="form-label">{{ startLabel }}</label>
            <div class="input-group input-group-sm mb-3">
              <span
                id="inputGroup-sizing-sm"
                class="input-group-text from-to"
              >
                {{ startPlaceholder }}
              </span>
              <!-- Dividing by 100 to convert cents into dollars -->
              <input
                :value="selectedValues[0]"
                aria-describedby="inputGroup-sizing-sm"
                aria-label="Sizing example input"
                class="form-control"
                name="min"
                placeholder="$0"
                type="text"
                @input="onValueChange"
              />
            </div>
          </b-col>
          <b-col cols="6">
            <label for="formFileSm" class="form-label">{{ endLabel }}</label>
            <div class="input-group input-group-sm mb-3">
              <span
                id="inputGroup-sizing-sm"
                class="input-group-text from-to"
              >
                {{ endPlaceholder }}
              </span>
              <!-- Dividing by 100 to convert cents into dollars -->
              <input
                :value="selectedValues[1]"
                aria-describedby="inputGroup-sizing-sm"
                aria-label="Sizing example input"
                class="form-control"
                name="max"
                placeholder="$0"
                type="text"
                @input="onValueChange"
              />
            </div>
          </b-col>
          <b-col cols="12" class="pb-2">
            <div class="mx-1">
              <vue-slider
                v-model="selectedValues"
                :drag-on-click="false"
                :enable-cross="false"
                :max="maxValue"
                :min="minValue"
                :min-range="step"
                tooltip="none"
                :height="6"
                :dotStyle="{ background: '#667799', border: '1px solid #F7F7F7' }"
                :railStyle="{ background: '#E8E8E8', borderRadius: '2px' }"
                :processStyle="{ background: '#667799' }"
                class="vue-slider-ltr-browse"
              ></vue-slider>
            </div>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
  name: 'SliderDropdown',
  directives: {
    ClickOutside
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    value: {
      type: Array,
      default: () => [],
    },
    width: {
      type: Number,
      default: null,
    },
    minValue: {
      type: Number,
      default: 0,
    },
    maxValue: {
      type: Number,
      default: 0,
    },
    step: {
      type: Number,
      default: 0,
    },
    startLabel: {
      type: String,
      default: '',
    },
    startPlaceholder: {
      type: String,
      default: '',
    },
    endLabel: {
      type: String,
      default: '',
    },
    endPlaceholder: {
      type: String,
      default: '',
    }
  },
  data: () => {
    return {
      menuVisible: false,
      selectedValues: [],
    }
  },
  watch: {
    value(newV) {
      this.selectedValues = newV
    }
  },
  mounted() {
    this.selectedValues = [this.minValue, this.maxValue]
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string[0].toUpperCase() + string.slice(1)
    },

    onValueChange(e) {
      const value = e.target.value ? Math.abs(e.target.value) : 0
      this.selectedValues[e.target.name === 'min' ? 0 : 1] = value
      this.$emit('change', this.selectedValues)
    },

    hideMenu() {
      this.menuVisible = false
    }
  },
}
</script>
<style scoped lang="sass">
@import '~/assets/css/_variables'

.accordion-filter-item
  border: none
  background: #F7F7F7
  border-radius: 8px
  padding: 12px 14px 12px 20px
  width: max-content

  &:not(.collapsed)
    border-bottom-left-radius: 0
    border-bottom-right-radius: 0

    .accordion-filter-button
      &::after
        transform: rotate(-180deg)


  .accordion-filter-header
    margin: 0

  .accordion-filter-button
    @include body-4-normal
    font-family: $font-sp-pro
    position: relative
    display: flex
    align-items: center
    width: 100%
    padding: 0
    color: $color-black-1
    overflow-anchor: none
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, border-radius 0.15s ease
    background: none
    border: none

    @media (prefers-reduced-motion: reduce)
      transition: none

    &::after
      flex-shrink: 0
      width: 20px
      height: 20px
      margin-left: auto
      content: ''
      background-image: url('~/assets/img/icons/arrow-down-black.svg')
      background-repeat: no-repeat
      background-size: 20px
      transition: transform 0.2s ease-in-out
      transform: rotate(0deg)

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

  .accordion-filter-body
    position: absolute
    z-index: 1000
    left: 0
    top: 100%
    margin: 0
    width: 100%
    background: #F7F7F7
    border-bottom-left-radius: 8px
    border-bottom-right-radius: 8px
    padding-bottom: 10px

    & > div
      max-height: 150px
      overflow: auto
      scroll-behavior: smooth
      padding-left: 20px
      padding-right: 8px

    .filter-price
      label
        @include body-9-normal
        color: $color-black-9
        font-family: $font-sp-pro
        margin-bottom: 6px
      .input-group
        background: $color-white-1
        border-radius: 2px
        flex-wrap: nowrap
        &-text
          @include body-9-normal
          background: transparent
          border: none
          color: $color-gray-47
          padding: 6px
        input
          @include body-9-normal
          background: transparent
          color: $color-black-9
          min-width: 50px
          padding: 0
</style>
