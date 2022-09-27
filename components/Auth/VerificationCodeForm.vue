<template>
  <b-row>
    <b-col md="12">
      <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
        <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
          <ValidationProvider
            v-slot="validationContext"
            :name="$t('auth.verification_code')"
            :rules="{ required: true, numeric: true, min: 0 }"
          >
            <b-form-group>
              <b-form-input
                id="verification-code"
                v-model="verificationCode"
                class="rounded-pill input-login"
                :placeholder="$t('auth.verification_code')"
                :state="getValidationState(validationContext)"
              ></b-form-input>
              <b-form-invalid-feedback>{{
                  validationContext.errors[0]
                }}</b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

          <b-row v-if="timer" class="mt-3">
            <b-col md="12">
              <VueCountdown :time="timer" emit-events @end="onCountdownEnd">
                <template slot-scope="props">
                  {{ $t('auth.resend_code') }}&colon;&nbsp;{{ props.minutes }}m&nbsp;{{ props.seconds }}s
                </template>
              </VueCountdown>
            </b-col>
          </b-row>

          <b-row class="mt-5 w-100">
            <b-col md="4" offset-md="2" class="text-center">
              <Button
                :disabled="!isVerifyButtonActive"
                block
                pill
                variant="confirm"
                type="button"
                :class="{ 'btn-disabled': !isVerifyButtonActive }"
                @click.prevent="sendVerificationCode"
              >
                <span>{{ $t('auth.resend') }}</span>
              </Button
              >
            </b-col>
            <b-col md="4" class="text-center">
              <Button
                :disabled="!isFormFilled"
                block
                pill
                variant="confirm"
                type="submit"
                :class="{ 'btn-disabled': !isFormFilled }"
              >
                <span>{{ $t('auth.verify') }}</span>
              </Button
              >
            </b-col>
          </b-row>
        </b-form>
      </ValidationObserver>
    </b-col>
  </b-row>
</template>

<script>
import { mapActions } from 'vuex'
import VueCountdown from '@chenfengyuan/vue-countdown'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Button from '~/components/common/Button'

export default {
  name: 'VerificationCodeForm',
  components: { ValidationProvider, ValidationObserver, Button, VueCountdown },
  props: {
    credentials: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      verificationCode: '',
      timer: 0,
      isVerifyButtonActive: false,
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
      this.$axios.post('/send-code', {
        email: this.credentials.email
      }, { handleError: false}).then(() => {
        this.resetTimer()
        this.$toasted.success(this.$t('auth.verification_code_has_been_sent').toString())
      }).catch(error => {
        this.$toasted.error(this.$t(error.response.data.message).toString())
      })
    },
    onSubmit() {
      // Do the login process
      this.$auth
        .login({
          data: {
            email: this.credentials.email,
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
    onCountdownEnd() {
      this.isVerifyButtonActive = true
      this.timer = 0
    },
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
</style>
