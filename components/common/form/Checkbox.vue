<template>
  <div class="d-flex align-items-center deadstock-checkbox">
    <label
      :for="`checkbox-${uniqueKey}-${val}`"
      class="font-secondary fw-5 fs-14 text-dark mb-0 d-flex align-items-center w-100 cursor-pointer"
      :class="{ checkboxButton: button }"
    >
      <input
        :id="`checkbox-${uniqueKey}-${val}`"
        v-model="model"
        type="checkbox"
        class="mr-2"
        :value="val"
        :style="`--accent-color: ${color}`"
      />
      <div class="checkbox-title text-capitalize">
        {{ label }}
      </div>
    </label>
  </div>
</template>
<script>
export default {
  name: 'Checkbox',
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
input[type="checkbox"]
  width: 15px
  height: 15px
  accent-color: var(--accent-color)
.checkboxButton
  .checkbox-title
    border: 1px solid #999
    padding: 12px 0
    border-radius: 3px
    color: #999
    font-size: 14px
    font-weight: 500
    text-align: center
    width: 100%
  input
    display: none
    &:checked~.checkbox-title
      background: #F2F2F2
      border: 1px solid #000
      color: #000
</style>
