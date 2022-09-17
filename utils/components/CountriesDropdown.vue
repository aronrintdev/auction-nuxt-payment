<template>
  <b-form-select v-model="value" class="settings-addresses-input">
    <b-form-select-option v-for="country in countries" :key="country.name" :value="country.name">{{
        country.name
      }}
    </b-form-select-option>
  </b-form-select>
</template>

<script>
import { COUNTRIES } from '~/static/constants';

export default {
  name: 'CountriesDropdown',
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      value: this.modelValue,
      countries: COUNTRIES
    }
  },
  watch: {
    modelValue() {
      this.value = this.modelValue
    },
    value(val) {
      this.$emit('update:modelValue', val)
      this.$emit('updatedDialCode', this.displayCallingCode())
      this.$emit('input', val)
    }
  },

  methods : {
    displayCallingCode() {
      if(this.value) {
        const select = this.countries.find((item) => {return (item.name === this.value )})
        if(select) {
          return select.dial_code;
        }
      }
      return ''
    },
  },
}
</script>

<style scoped>

</style>
