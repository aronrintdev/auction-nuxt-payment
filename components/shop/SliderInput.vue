<template>
  <div class="slider-input">
    <b-row>
      <b-col cols="12">
        <span class="filter-text">{{ title }}</span>
      </b-col>

      <b-col cols="6">
        <label class="form-label">{{ minLabel }}</label>
        <div class="input-group input-group-sm">
          <span class="input-group-text from-to bg-white text-gray-24">{{ fromLabel }}</span>
          <input
            :value="selectedValues[0]"
            placeholder="0"
            class="form-control bg-white"
            name="min"
            type="text"
            @input="onValueChange"
          />
        </div>
      </b-col>

      <b-col cols="6">
        <label class="form-label">{{ maxLabel }}</label>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text from-to  bg-white text-gray-24">{{ toLabel }}</span>
          <input
            :value="selectedValues[1]"
            placeholder="0"
            class="form-control  bg-white"
            name="max"
            type="text"
            @input="onValueChange"
          />
        </div>
      </b-col>

      <b-col cols="12">
        <!-- Price Range -->
        <vue-slider
          :drag-on-click="false"
          :enable-cross="false"
          :value="selectedValues"
          :max="maxValue"
          :min="minValue"
          :min-range="minRange"
          tooltip="none"
          class="vue-slider-ltr-shop"
          @change="onSliderChange"
        ></vue-slider>
        <!-- Price Range -->
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    minLabel: {
      type: String,
      default: 'Min',
    },
    maxLabel: {
      type: String,
      default: 'Max',
    },
    fromLabel: {
      type: String,
      default: 'From',
    },
    toLabel: {
      type: String,
      default: 'To',
    },
    value: {
      type: Array,
      default: null,
    },
    multiplier: {
      type: Number,
      default: 1,
    },
    maxValue: {
      type: Number,
      default: 1,
    },
    minValue: {
      type: Number,
      default: 1,
    },
    minRange: {
      type: Number,
      default: 1,
    },
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
    this.selectedValues = this.value
  },
  methods: {
    // Update selected prices and pass to parent component
    onValueChange(e) {
      const value = e.target.value ? Math.abs(e.target.value) : 0
      this.selectedValues[e.target.name === 'min' ? 0 : 1] = value
      this.$emit('change', this.selectedValues)
    },
    onSliderChange(value){
      this.$emit('change', value)

    }
  },
}
</script>
<style scoped lang="sass">
@import '~/assets/css/_variables'

.slider-input
  label
    @include body-9-normal
    color: $color-gray-41
    margin-bottom: 6px

  .input-group
    margin-bottom: 12px

    .from-to
      @include body-9-normal
      color: $color-gray-4
      background-color: $color-white-3
      border: none
      padding: 6px 0 6px 8px

    input
      @include body-9-normal
      background-color: $color-white-3
      border: none
      padding: 6px

      &::-webkit-input-placeholder
        color: $color-gray-23

      &:-moz-placeholder
        color: $color-gray-23

      &::-moz-placeholder
        color: $color-gray-23

      &:-ms-input-placeholder
        color: $color-gray-23

      &::-ms-input-placeholder
        color: $color-gray-23

      &::placeholder
        color: $color-gray-23

    input:focus
      background-color: $color-white-3

  .filter-text
    @include body-4-bold
    color: $color-black-1

  .vue-slider-ltr-shop
    padding: 7px 6px !important
</style>
