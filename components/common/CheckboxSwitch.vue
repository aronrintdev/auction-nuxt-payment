<template>
  <div class="d-flex align-items-center checkbox-switch" :class="customClass">
    <span role="button" :class="{ active: !value }" @click="onChange(false)">{{ labelOff }}</span>
    <b-form-checkbox
      :checked="value"
      name="check-button"
      switch
      size="lg"
      @input="toggle"
      @change="onChange"
    />
    <span role="button" :class="{ active: value }" @click="onChange(true)">{{ labelOn }}</span>
  </div>
</template>
<script>
export default {
  name: 'CheckboxSwitch',

  props: {
    value: {
      type: Boolean,
      required: true,
    },
    labelOn: {
      type: String,
      default: '',
    },
    labelOff: {
      type: String,
      default: '',
    },
    customClass: {
      type: String,
      default: '',
    }
  },

  methods: {
    toggle() {
      this.$emit('input', !this.value)
    },

    onChange(checked) {
      this.$emit('change', checked)
    },
  },
}
</script>
