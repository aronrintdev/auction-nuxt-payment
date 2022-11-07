<template>
  <b-row class="h-100 d-flex flex-column align-items-center justify-content-center">
    <b-col
      md="6"
      class="verification-container  d-flex flex-column align-items-center justify-content-center mb-5"
      >
        <b-row>
          <b-col md="12" class="d-lg-none d-flex flex-column align-items-center justify-content-center">
            <span class="align-items-center justify-content-center text-center mb-5">
              <img :src="require('~/assets/img/home/logo-mb.png')" alt="Deadstock Logo" />
            </span>
          </b-col>
          <b-col md="12" class="d-flex flex-column align-items-center justify-content-center">
            <span class="align-items-center justify-content-center text-center mb-5">
              <img class="p-img" :src="require('~/assets/img/auth/padlock.svg')" alt="padloack" />
            </span>
          </b-col>
          <b-col md="12">
            <h4 class="text-center fw-600">
              {{$t('auth.2fa_text_1')}}
            </h4>
            <p class="text-center fw-400 body-3">
              {{$t('auth.2fa_text_2')}}
              <br/>
              <br/>
              {{$t('auth.2fa_text_3')}}
            </p>
            <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
              <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
                <b-row class="mt-3" align-v="end">
                  <b-col md="9">
                    <OtpInputVue :default="'00000'" :digit-count="5" @setOtp="onSetOtp($event)" />
                  </b-col>
                  <b-col md="3">
                    <div v-if="timer"  class="d-flex bg-dark justify-content-end align-items-center rounded mb-1">
                      <ClockIcon :stroke-color="'#fff'" style="height: 14px" class="mx-2"></ClockIcon>
                      <vue-countdown
                        v-if="codeSent"
                        v-slot="{minutes, seconds}"
                        :auto-start="true"
                        :time="VERIFICATION_TIMER"
                        :transform="transformSlotProps"
                        @end="onCountdownEnd"
                        @progress="onTimerProgress">
                          <div class="text-white pr-2 py-1 text-center">
                            {{ minutes }}: {{ seconds }}
                          </div>
                      </vue-countdown>
                    </div>
                  </b-col>
                </b-row>

                <b-row v-if="isVerifyButtonActive" class="mt-5 w-100 align-items-center justify-content-center">
                  <p class="text-center">
                    {{$t('auth.2fa_have_not_recieved')}}
                    <span class="resend-text" @click.prevent="sendVerificationCode">
                      {{$t('auth.2fa_resend_code')}}
                    </span>
                  </p>
                </b-row>

                <b-row class="mt-5 w-100 align-items-center justify-content-center">
                  <p class="text-center">
                    <span class="otp-cancel" @click.prevent="cancel">
                      {{$t('common.cancel')}}
                    </span>
                  </p>
                </b-row>
              </b-form>
            </ValidationObserver>
          </b-col>
        </b-row>
      </b-col>
  </b-row>

</template>

<script>
import { mapActions } from 'vuex'
import { ValidationObserver } from 'vee-validate'
import VueCountdown from '@chenfengyuan/vue-countdown'
import OtpInputVue from '../common/form/OtpInput.vue'
import {VERIFICATION_TIMER} from '~/static/constants'
import ClockIcon from '~/components/profile/vendor-hub/ClockIcon'


export default {
  name: 'TwoFaVerificationCodeForm',
  components: { ValidationObserver, VueCountdown, OtpInputVue, ClockIcon },
  props: {
    credentials: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      VERIFICATION_TIMER,
      verificationCode: '',
      timer: 0,
      isVerifyButtonActive: true,
      codeSent: 0,
    }
  },
  computed: {
    isFormFilled(vm) {
      return !!(vm.verificationCode)
    },
  },
  mounted() {
    this.sendVerificationCode()
  },
  methods: {
    ...mapActions({
      getUserDetails: 'auth/getUserDetails',
      getUserRedeemedReward: 'redeemed-reward/getUserRedeemedReward'
    }),
    getValidationState({ dirty, validated, valid = null }) {
      // Returns the contextual state (validation style) of the element being validated (false for invalid, true for valid, or null for no validation state)
      return dirty || validated ? valid : null
    },
    resetTimer() {
      this.isVerifyButtonActive = false
      this.timer = 120000
    },
    sendVerificationCode() {
      if(this.isVerifyButtonActive){
        this.resetTimer()
        this.codeSent = 1
        this.$axios.post('/send-code', {
          login: this.credentials.login
        }, { handleError: false}).then(() => {
          this.resetTimer()
          this.codeSent = 1
          this.$toasted.success(this.$t('auth.verification_code_has_been_sent').toString())
        }).catch(error => {
          this.$toasted.error(this.$t(error.response.data.message).toString())
        })
      }

    },
    onSubmit() {
      // Do the login process
      this.$auth
        .login({
          data: {
            login: this.credentials.login,
            password: this.credentials.password,
            rememberMe: this.credentials.rememberMe,
            verification_code: this.verificationCode,
          }, handleError: false
        })
        .then((response) => {
          this.$auth.strategy.token.set(response.data.access_token)
          this.getUserDetails(this.$store.state.auth.user.id)
          this.getUserRedeemedReward()
          this.$auth.$storage.removeCookie('rememberExpires')
          this.$toasted.success(this.$t('login.success_message.login_successfull').toString())
          this.$router.push('/?lang=' + this.getLang.locale)
        })
        .catch((error) => {
          this.$toasted.error(this.$t(error.response.data.message).toString())
        })
    },
    onTimerProgress(data) {
      this.secondsLeft = data.totalSeconds
    },
    onCountdownEnd() {
      this.isVerifyButtonActive = true
      this.timer = 0
    },
    onSetOtp(otp){
      this.verificationCode = otp
      this.onSubmit()
    },
    cancel(){
      this.$router.push({
        path: '/login',
      })
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

/* Override bootstrap-vue 'b-form-input' styles */
.input-login
  @include body-5-normal
  color: $black-1
  background-color: $color-white-5
  border: 0
  transition: border-color 0.01s ease-in-out, box-shadow 0.01s ease-in-out
  &::placeholder,
  &:-ms-input-placeholder,
  &::-ms-input-placeholder
    @include body-5-normal
    color: $color-gray-24
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active
    -webkit-box-shadow: 0 0 0 30px $color-white-5 inset !important
  &.is-invalid,
  &.is-invalid:active,
  &.is-invalid:focus
    background-image: none
    border: $color-red-1 1px solid !important
  &.is-valid
    border: none
    background-image: none
  &:focus
    background-color: $color-white-5
    border: 0

/* Override bootstrap-vue 'b-form-input' styles for prepending icons */
.input-append
  border-bottom-right-radius: 0 !important
  border-top-right-radius: 0 !important
  &.is-invalid,
  &.is-invalid:active,
  &.is-invalid:focus
    background-image: none
    border: $color-red-1 1px solid !important
    border-right: none !important
    + .append-icon
      border: $color-red-1 1px solid !important
      border-left: none !important

.append-icon
  background: $color-white-5
  border-bottom-right-radius: 3rem !important
  border-top-right-radius: 3rem !important

.btn
  &.btn-confirm
    &.btn-disabled
      background: $color-gray-47
      opacity: 1
      cursor: not-allowed
      &:hover
        box-shadow: none
.fw-600
  font-weight: $medium
.fw-400
  font-weight: $regular
.resend-text
  color: $color-blue-1
  font-weight: $medium
  font-size: 16px
  line-height: 20px
.verification-container
  padding: 50px
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25)
  max-width: 500px
  max-height: 600px
  .p-img
    width: 91.33px
    height: 102.75px
.otp-cancel
  @include body-4-normal
  color: $color-blue-20

@media (max-width: 768px)
  .verification-container
    box-shadow: none
    .p-img
      width: 68px
      height: 68px
</style>
