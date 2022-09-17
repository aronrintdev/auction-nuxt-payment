<template>
  <b-row class="vh-100">
    <b-col md="8">
      <b-row class="h-100">
        <b-col md="6" offset-md="3" class="d-flex flex-column align-items-center justify-content-center">
          <b-row>
            <b-col md="12">
              <div class="right-heading-bold text-center">{{ $t('auth.reset_password') }}</div>
              <div class="body-5-normal text-color-gray-38 text-center text-pre-line mt-3">{{ $t('auth.please_choose_your_new_password') }}</div>
            </b-col>
          </b-row>

          <b-row class="mt-5 w-100">
            <b-col md="12">

              <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
                <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
                  <ValidationProvider
                    v-slot="validationContext"
                    :name="$t('auth.password')"
                    :rules="{ required: true, min: 8, oneUppercase: true, oneDigit: true, oneSymbol: true }"
                    vid="password"
                  >
                    <b-form-group>
                      <b-input-group>
                        <b-form-input
                          id="password"
                          v-model="form.password"
                          class="rounded-pill input-reset-password input-append"
                          :placeholder="$t('auth.enter_new_password')"
                          :state="getValidationState(validationContext)"
                          :type="passwordFieldType"
                        ></b-form-input>
                        <b-input-group-append class="d-flex align-items-center px-3 append-icon">
                          <i v-if="isPasswordShown" class="fa fa-eye" aria-hidden="true" role="button" @click="isPasswordShown = ! isPasswordShown"></i>
                          <i v-else class="fa fa-eye-slash" aria-hidden="true" role="button" @click="isPasswordShown = ! isPasswordShown"></i>
                        </b-input-group-append>
                        <b-input-group-prepend v-if="getValidationState(validationContext)" class="d-flex align-items-center px-1">
                          <b-img width="20" height="20" :src="require('~/assets/img/auth/check.svg')" />
                        </b-input-group-prepend>
                        <b-form-invalid-feedback>{{
                            validationContext.errors[0]
                          }}</b-form-invalid-feedback>
                      </b-input-group>
                    </b-form-group>
                  </ValidationProvider>
                  <ValidationProvider
                    v-slot="validationContext"
                    :name="$t('auth.confirm_password')"
                    :rules="{ required: true, min: 8, oneUppercase: true, oneDigit: true, oneSymbol: true, confirmed: 'password' }"
                  >
                    <b-form-group>
                      <b-input-group>
                        <b-form-input
                          id="password-confirmation"
                          v-model="form.password_confirmation"
                          class="rounded-pill input-reset-password input-append"
                          :placeholder="$t('auth.confirm_new_password')"
                          :state="getValidationState(validationContext)"
                          :type="confirmPasswordFieldType"
                        ></b-form-input>
                        <b-input-group-append class="d-flex align-items-center px-3 append-icon">
                          <i v-if="isConfirmPasswordShown" class="fa fa-eye" aria-hidden="true" role="button" @click="isConfirmPasswordShown = ! isConfirmPasswordShown"></i>
                          <i v-else class="fa fa-eye-slash" aria-hidden="true" role="button" @click="isConfirmPasswordShown = ! isConfirmPasswordShown"></i>
                        </b-input-group-append>
                        <b-input-group-prepend v-if="getValidationState(validationContext)" class="d-flex align-items-center px-1">
                          <b-img width="20" height="20" :src="require('~/assets/img/auth/check.svg')" />
                        </b-input-group-prepend>
                        <b-form-invalid-feedback>{{
                            validationContext.errors[0]
                          }}</b-form-invalid-feedback>
                      </b-input-group>
                    </b-form-group>

                    <b-row class="mt-5 w-100">
                      <b-col md="4" offset-md="4">
                        <Button :disabled="! isFormFilled" block pill variant="confirm" type="submit" :class="{ 'btn-disabled': ! isFormFilled }">{{ $t('auth.save_password') }}</Button>
                      </b-col>
                    </b-row>
                  </ValidationProvider>
                </b-form>
              </ValidationObserver>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-col>
    <b-col md="4" class="d-flex flex-column align-items-center justify-content-center bg-color-white-5">
      <b-row>
        <b-col md="12">
          <div class="left-heading-bold text-center">{{ $t('auth.new_to_deadstock') }}&quest;</div>
          <div class="body-1-normal text-color-black-1 text-pre-line text-center mt-4">{{ $t('auth.signup_and_buy') }}</div>
        </b-col>
      </b-row>

      <b-row class="mt-5 w-100">
        <b-col md="4" offset-md="4">
          <Button pill block variant="dark" to="/signup">{{ $t('auth.signup') }}</Button>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Button from '~/components/common/Button'
import { UNPROCESSABLE_ENTITY } from '~/static/constants'

export default {
  name: 'ResetPassword',
  components: { ValidationObserver, ValidationProvider, Button },
  layout: 'Auth',
  data () {
    return {
      isPasswordShown: false,
      isConfirmPasswordShown: false,
      token: '',
      email: '',
      form: {
        password: '',
        password_confirmation: ''
      }
    }
  },
  computed: {
    passwordFieldType (vm) {
      return vm.isPasswordShown ? 'text' : 'password'
    },
    confirmPasswordFieldType (vm) {
      return vm.isConfirmPasswordShown ? 'text' : 'password'
    },
    isFormFilled (vm) {
      let isFormFilled = true

      Object.values(vm.form).forEach(value => {
        if (value === '') {
          isFormFilled = false

          return false
        }

        return true
      })

      return isFormFilled
    }
  },
  mounted() {
    if (this.$router.currentRoute.query.token && this.$router.currentRoute.query.email) {
      const data = {
        token: this.$router.currentRoute.query.token,
        email: this.$router.currentRoute.query.email
      }
      const searchParams = new URLSearchParams(data)

      this.$axios.get('reset-password/?' + searchParams).then((response) => {
        this.token = response.data.token
        this.email = response.data.email
      }).catch((error) => {
        if (error.response.status === UNPROCESSABLE_ENTITY) {
          this.$toasted.error(this.$t('auth.error.invalid_token').toString())
        } else {
          this.$toasted.error(this.$t('auth.error.something_went_wrong_please_try_later').toString())
        }

        this.$router.push('/signup')
      })
    } else {
      this.$router.push('/signup')
    }
  },
  methods: {
    getValidationState({dirty, validated, valid = null}) {
      // Returns the contextual state (validation style) of the element being validated (false for invalid, true for valid, or null for no validation state)
      return dirty || validated ? valid : null
    },
    onSubmit() {
      this.$axios.post('reset-password', {
        email: this.email,
        token: this.token,
        password: this.form.password,
        password_confirmation: this.form.password_confirmation,
      }, {
        headers: {
          'Accept': 'application/json'
        },
      }).then(() => {
        this.$toasted.success(this.$t('auth.your_account_password_has_been_reset').toString())
        this.$router.push('/login')
      }).catch(() => {
        this.$toasted.error(this.$t('auth.error.something_went_wrong_please_try_later').toString());
      })
    },
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.bg-color-white-5
  background: $color-white-5

.text-color-black-1
  color: $color-black-1

.text-pre-line
  white-space: pre-line

.left-heading-bold
  color: black
  font-style: normal
  font-weight: $bold
  font-size: 36px
  line-height: 44px

.right-heading-bold
  color: black
  font-style: normal
  font-weight: $bold
  font-size: 42px
  line-height: 51px

/* Override bootstrap-vue 'b-form-input' styles */
.input-reset-password
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
