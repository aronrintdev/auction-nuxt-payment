<template>
    <div ref="otpCont" class="digit  d-flex align-items-center justify-content-center">
      <input
        v-for="(el, ind) in digits"
        :key="el+ind"
        v-model="digits[ind]"
        type="text"
        class="digit-box"
        :autofocus="ind === 0"
        :placeholder="ind+1"
        maxlength="1"
        @keydown="handleKeyDown($event, ind)"
      >
    </div>
</template>
<script>
export default {
  name: 'OtpFormInput',

  props: {
    default: {
      type: String,
      default: '00000',
      required: true
    },
    digitCount: {
      type: Number,
      required: true
    },
  },

  data() {
    return {
      digits: [null, null, null, null, null]
    }
  },

  watch: {
    digits(newVal) {
      this.currentValue = this.prefixedValue(newVal)
    },
  },
  mounted() {
    // ok
  },

  methods: {
    prefixedValue(value) {
      return (value === 0 || value) && this.prefix ? this.prefix + value : value
    },

    handleValueChange(value) {
      let res
      if (this.prefix && value.length > 1) {
        res = value.substr(this.prefix.length) || ''
      } else if (value === this.prefix) {
        res = ''
      } else {
        res = value
      }
      if (this.number) {
        // Allows '-' and '13.'
        // Disallows all other non numeric strings like 12a and convert it
        if (`${Number(res)}.` !== res && isNaN(res) && res !== '-') {
          res = Number(res) || 0
        }
        // if input has more fraction digits than maxFractionDigits we should cut off
        else if (res?.split('.')[1]?.length > this.maxFractionDigits) {
          res = Number(res).toFixed(this.maxFractionDigits)
        }
      }
      if (this.integer) {
        res = Math.ceil(Number(res) || 0)
      }
      this.currentValue = ''
      this.$nextTick(() => {
        this.currentValue = this.prefixedValue(res)
        this.$emit('input', res)
      })
    },

    handleKeyDown(event, index) {
    if (event.key !== 'Tab' &&
        event.key !== 'ArrowRight' &&
        event.key !== 'ArrowLeft'
    ) {
      event.preventDefault()
    }

    if (event.key === 'Backspace') {
      this.digits[index] = null;

      if (index !== 0) {

        (this.$refs.otpCont.children)[index-1].focus()
      }

      return;
    }

    if ((/^([0-9])$/).test(event.key)) {
      this.digits[index] = event.key

      if (index !== this.digitCount - 1) {
        (this.$refs.otpCont.children)[index+1].focus();
      }
    }
  }
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.digit-box
  @include body-3-regular

  color: $color-black-1
  border-bottom: 1px  solid $color-gray-47
  border-left: 0
  border-right: 0
  border-top: 0
  height: 4rem
  width: 2rem
  display: inline-block
  margin: 5px
  padding: 0.4rem
  font-size: 2rem
  font-weight: $regular
  &:focus:before
    border-bottom: 1px  solid black
    border-left: 0
    border-right: 0
    border-top: 0
</style>
