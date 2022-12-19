<template>
  <div class="d-flex align-items-center deadstock-checkbox">
    <label
      :for="`checkbox-${uniqueKey}-${val}`"
      class="font-secondary fw-5 fs-14 text-dark mb-0 d-flex align-items-center w-100 cursor-pointer"
      :class="{ checkboxButton: button, 'list-type': list }"
    >
      <input
        :id="`checkbox-${uniqueKey}-${val}`"
        v-model="model"
        type="checkbox"
        class="mr-2"
        :value="val"
        :style="`--accent-color: ${color}`"
      />
      <div class="checkbox-title w-100 text-capitalize">
        <div>
          {{ label }}
        </div>
        <div class="checkedIcon" :class="{ 'd-none': !list }">
          <CheckedIcon />
        </div>
      </div>
    </label>
  </div>
</template>
<script>
import CheckedIcon from '~/assets/icons/Checked'
export default {
  name: 'Checkbox',
  components: { CheckedIcon },
  props: {
    label: {
      type: [String, Number],
      default: null,
    },
    value: {
      type: Array,
      default() {
        return []
      },
    },
    val: {
      type: [String, Number],
      default: undefined,
    },
    color: {
      type: String,
      default: '#000',
    },
    button: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      uniqueKey: null,
    }
  },
  computed: {
    model: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
  mounted() {
    this.uniqueKey = Math.random().toString(36).substring(2)
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
input[type="checkbox"]
  width: 15px
  height: 15px
  accent-color: var(--accent-color)
.checkboxButton
  .checkbox-title
    border: 1px solid $color-gray-4
    padding: 12px 0
    border-radius: 3px
    color: $color-gray-4
    font-size: 14px
    font-weight: 500
    text-align: center
  input
    display: none
    &:checked~.checkbox-title
      background: $color-gray-21
      border: 1px solid $color-black-1
      color: $color-black-1
.list-type
  .checkbox-title
    border: 0
    border-bottom: 1px solid $color-gray-62
    border-radius: 0
    color: $color-black-1
    padding: 10px 0
    font-size: 14px
    font-weight: $normal
    display: flex
    justify-content: space-between
    &:active
      background-color: $color-gray-21
    .checkedIcon
      display: none
  input
    display: none
    &:checked~.checkbox-title
      .checkedIcon
        display: inline
</style>
