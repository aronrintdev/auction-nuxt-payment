<template>
  <div class="phone-number">
    {{ $t('manage_text_message.update_phone_number') }}
    <div class="d-flex justify-content-center my-2">
      <input v-model="phoneNumber" type="text" class="form-control"/>
      <button :class="`btn ml-1 ${btnStyle}`" @click="handleUpdate">{{ $t('manage_text_message.update') }}</button>
    </div>
    <div class="msg">{{ $t('manage_text_message.action_required') }}</div>
    <div v-if="showVerificationCodeForm" class="my-5">
      <resend-code-component ref="resend_code" :duration="duration" @submit="handleCodeSubmission"/>
    </div>
  </div>
</template>

<script>
import ResendCodeComponent from '~/components/profile/security/ResendCodeComponent';

export default {
  name: 'PhoneNumberComponent',
  components: {
    ResendCodeComponent
  },
  data() {
    return {
      phoneNumber: '',
      duration: '5:00',
      timer: null,
      btnStyle: '',
      showVerificationCodeForm: false
    }
  },
  watch: {
    phoneNumber(val) {
      this.btnStyle = (val.length > 2) ? 'active' : ''
    }
  },
  methods: {
    handleUpdate() {
      this.$emit('submit', this.phoneNumber)
      this.showVerificationCodeForm = true
      this.countdown()
    },
    handleCodeSubmission(code) {
      this.$emit('codeSubmit', code)
      this.showVerificationCodeForm = false
      this.phoneNumber = ''
      this.resetTimer()
    },
    countdown() {
      const duration = this.duration.split(':')
      let minutes = parseInt(duration[0]) - 1
      let seconds = 60
      this.timer = setInterval(() => {
        seconds = seconds - 1

        if (seconds === 0) {
          seconds = 60
          minutes = minutes - 1
        }

        if (minutes === 0 && seconds === 0) {
          this.resetTimer()
          this.countdownFinished()
        }
        this.duration = `${minutes}:${seconds}`
      }, 1000)
    },
    countdownFinished() {
      // todo write code to execute after countdown
    },
    resetTimer() {
      clearInterval(this.timer)
      this.duration = '5:00'
    },
    clearVerificationCode() {
      this.$refs.resend_code.clearVerificationCode()
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'
.phone-number
  font-family: $font-montserrat
  @include body-5-regular

  .form-control
    background: $color-white-5
    border: 1px solid $color-red-3
    border-radius: 20px

  .btn
    background: $color-gray-47
    border-radius: 4px
    color: $color-white-1

  .btn.active
    background: $color-blue-20

  .msg
    color: $color-red-3

</style>
