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
            :min="minValue"
            :max="maxValue"
            :value="from"
            :placeholder="minValue / multiplier"
            class="form-control bg-white"
            name="min"
            type="text"
            @input="handleInputChange"
            @blur="handleInputBlur"
          />
        </div>
      </b-col>

      <b-col cols="6">
        <label class="form-label">{{ maxLabel }}</label>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text from-to  bg-white text-gray-24">{{ toLabel }}</span>
          <input
            :min="minValue"
            :max="maxValue"
            :value="to"
            :placeholder="maxValue / multiplier"
            class="form-control  bg-white"
            name="max"
            type="text"
            @input="handleInputChange"
            @blur="handleInputBlur"
          />
        </div>
      </b-col>

      <b-col cols="12">
        <!-- Price Range -->
        <vue-slider
          v-model="selectedRange"
          :drag-on-click="false"
          :enable-cross="false"
          :max="maxValue"
          :min="minValue"
          :min-range="minRange"
          tooltip="none"
          class="vue-slider-ltr-shop"
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

  computed: {
    selectedRange: {
      get() {
        if (this.value) {
          const min =
            this.value[0] == null ? this.minValue : Number(this.value[0])
          const max =
            this.value[1] == null ? this.maxValue : Number(this.value[1])
          if (
            min < this.minValue ||
            min > this.maxValue ||
            max > this.maxValue ||
            max < this.minValue ||
            min > max
          ) {
            return null
          }
          return [min, max]
        } else {
          return [this.minValue, this.maxValue]
        }
      },

      set(newVal) {
        this.$emit('input', newVal)
      },
    },

    from() {
      return this.value && this.value[0] != null
        ? Number(this.value[0]) / this.multiplier
        : ''
    },

    to() {
      return this.value && this.value[1] != null
        ? Number(this.value[1]) / this.multiplier
        : ''
    },
  },

  methods: {
    // Update selected prices and pass to parent component
    handleInputChange(e) {
      const index = { min: 0, max: 1 }[e.target.name]
      const sliderFilters = this.value
        ? JSON.parse(JSON.stringify(this.value))
        : [null, null]
      const value =
        e.target.value === '' || isNaN(e.target.value)
          ? null
          : Math.abs(e.target.value) * this.multiplier

      sliderFilters[index] = value
      this.$emit('input', sliderFilters)
    },

    handleInputBlur(e) {
      const index = { min: 0, max: 1 }[e.target.name]
      const sliderFilters = this.value
        ? JSON.parse(JSON.stringify(this.value))
        : [null, null]
      let value =
        e.target.value === '' || isNaN(e.target.value)
          ? null
          : Math.abs(e.target.value) * this.multiplier

      if (value === null) return

      if (value < this.minValue) {
        value = this.minValue
      } else if (value > this.maxValue) {
        value = this.maxValue
      }

      if (value > this.maxValue - this.minRange && index === 0) {
        value = this.maxValue - this.minRange
        sliderFilters[1] = this.maxValue
      } else if (value < this.minValue + this.minRange && index === 1) {
        value = this.minValue + this.minRange
        sliderFilters[0] = this.minValue
      }

      if (index === 0 && value >= sliderFilters[1]) {
        sliderFilters[1] = value + this.minRange
      } else if (index === 1 && value <= sliderFilters[0]) {
        sliderFilters[0] = value - this.minRange
      }

      sliderFilters[index] = value
      this.$emit('input', sliderFilters)
    },
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
