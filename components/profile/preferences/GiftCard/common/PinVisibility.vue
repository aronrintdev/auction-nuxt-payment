<template>
  <div class="pin-hide-show">
    <span class="text">{{ text }}&colon;</span>

    <!-- Spinner Loading -->
    <span v-if="detailsLoading">
      <b-spinner variant="color-blue-2" small></b-spinner>
    </span>
    <!-- ./Spinner Loading -->

    <!-- Values -->
    <template v-else>
      <span v-if="!hide" class="text-result">{{ itemValue }}</span>
      <span v-if="hide">&#x2022;&#x2022;&#x2022;&#x2022;<span class="text-result">{{ getValue }}</span></span>
    </template>
    <!-- ./Values -->

    <!-- Eye icon -->
    <span role="button" class="ml-4 eye-icon" @click="toggleValue">
      <img :src="require('~/assets/img/icons/eye2.svg')" alt="eye-icon" />
    </span>
    <!-- ./Eye icon -->
  </div>
</template>

<script>
export default {
  name: 'PinVisibility',

  props: {
    text: {
      type: String,
      required: true,
    },

    itemValue: {
      type: [String, Number],
      required: true,
    },

    lastDigitCount: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      hide: true,
      detailsLoading: true,
      showHiddenValue: '',
    }
  },

  computed: {
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getValue: (vm) => {
      if (Number(vm.showHiddenValue)) {
        vm.detailsLoading = false
        return vm.showHiddenValue
      }
    },
  },

  created() {
    // Get the pin to be shown
    this.calculateValue()
  },

  mounted() {
    // Stop loading
    this.detailsLoading = false
  },

  methods: {
    // On eye icon click
    toggleValue() {
      this.hide = !this.hide
    },

    // Show the hidden value
    calculateValue() {
      if (this.lastDigitCount) {
        const value = String(this.itemValue).slice(-this.lastDigitCount)
        this.showHiddenValue = value
      }
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.pin-hide-show
  .text
    font-style: normal
    @include body-3-medium
    text-align: center
    color: $color-black-1
</style>