<template>
  <div class="resend-code">
    <div class="d-flex justify-content-between align-items-center">
      <div>
        <verification-code-component ref="verification_code" @change="listenCodeChange"/>
      </div>
      <div class="mx-3">
        <button class="btn btn-dark">
          <div class="d-flex align-items-center" @click="handleCodeSubmission">
            <img :src="require('/assets/img/icons/clock.svg')"/>
            <span class="ml-1">{{ duration }}</span>
          </div>
        </button>
      </div>
      <div class="link d-none d-md-block">
        <span v-if="showResend" class="link cursor-pointer" @click="resend">
          {{ $t('manage_text_message.resend_code') }}
        </span>
      </div>
    </div>
    <div class="py-3 note">{{ $t('manage_text_message.label_a_verification_code_will') }}</div>
    <div v-if="showResend" class="d-block d-md-none text-center" >
      {{ $t('manage_text_message.havent_received_it') }}
      <span class="link cursor-pointer" @click="resend">
        {{ $t('manage_text_message.resend_a_new_code') }}
      </span>
    </div>
  </div>
</template>

<script>
import VerificationCodeComponent from '~/components/profile/security/VerificationCodeComponent';

export default {
  name: 'ResendCodeComponent',
  components: {
    VerificationCodeComponent
  },
  props: {
    duration: {
      type: String,
      default: '5:00'
    },
    showResend:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      verificationCode: ''
    }
  },
  methods: {
    handleCodeSubmission() {
      this.$emit('submit', this.verificationCode)
    },
    listenCodeChange(code) {
      this.verificationCode = code
    },
    clearVerificationCode() {
      this.$refs.verification_code.clear()
    },
    resend() {
      this.$emit('resend')
    }
  }

}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'
.resend-code
  .btn
    vertical-align: bottom

  .link
    color: #3A71EA
    text-decoration: underline

  .note
    font-family: $font-family-sf-pro-display
    @include body-12-regular
    color: $color-gray-5

  @media (max-width: 767px)
    .note
      @include body-5-regular

</style>
