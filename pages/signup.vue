<template>
  <b-row class="vh-100">
    <b-col md="4" class="d-flex flex-column align-items-center justify-content-center bg-color-white-5">
      <b-row>
        <b-col md="12">
          <div class="left-heading-bold text-pre-line text-center">{{ $t('auth.welcome_back') }}</div>
          <div class="body-1-normal text-color-black-1 text-pre-line text-center mt-3">{{ $t('auth.login_and_buy') }}</div>
        </b-col>
      </b-row>

      <b-row class="mt-5 w-100">
        <b-col md="4" offset-md="4">
          <Button pill block variant="white" class="border-gray" to="/login">{{ $t('auth.login') }}</Button>
        </b-col>
      </b-row>
    </b-col>
    <b-col md="8">
      <b-row class="h-100">
        <b-col md="6" offset-md="3" class="d-flex flex-column align-items-center justify-content-center">
          <b-row>
            <b-col md="12">
              <div class="right-heading-bold text-center">{{ $t('auth.create_an_account') }}</div>
              <div class="body-5-normal text-color-gray-38 text-center mt-3">{{ $t('auth.signup_up_via_social_media') }}</div>
            </b-col>
          </b-row>

          <b-row class="mt-4">
            <b-col md="12" class="d-flex align-items-center justify-content-center">
              <b-img :src="require('~/assets/img/auth/social_login_google.svg')" class="mx-3" role="button" alt="..." @click="socialLogin('google')" />
              <b-img :src="require('~/assets/img/auth/social_login_facebook.svg')" class="mx-3" role="button" alt="..." @click="socialLogin('facebook')" />
              <b-img :src="require('~/assets/img/auth/social_login_apple.svg')" class="mx-3" role="button" alt="..." @click="socialLogin('apple')" />
              <b-img :src="require('~/assets/img/auth/social_login_twitter.svg')" class="mx-3" role="button" alt="..." @click="socialLogin('twitter')" />
            </b-col>
          </b-row>

          <b-row class="mt-4 w-100">
            <b-col md="12">
              <div class="text-line-middle">
                <span class="body-4-bold text-color-gray-22 text-uppercase mx-5">{{ $t('auth.or') }}</span>
              </div>
            </b-col>
          </b-row>

          <b-row class="mt-4 w-100">
            <b-col md="12">
              <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
                <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
                  <ValidationProvider
                    v-slot="validationContext"
                    :name="$t('auth.first_name')"
                    :rules="{ required: true, alphaNum: true, min: 3, max: 128 }"
                  >
                    <b-form-group>
                      <b-input-group>
                        <b-form-input
                          id="first-name"
                          v-model="form.first_name"
                          class="rounded-pill input-signup"
                          :placeholder="$t('auth.first_name')"
                          :state="getValidationState(validationContext)"
                        ></b-form-input>
                        <b-form-invalid-feedback>{{
                            validationContext.errors[0]
                          }}</b-form-invalid-feedback>
                        <b-input-group-prepend v-if="getValidationState(validationContext)" class="d-flex align-items-center px-1">
                          <b-img width="20" height="20" :src="require('~/assets/img/auth/check.svg')" />
                        </b-input-group-prepend>
                      </b-input-group>
                    </b-form-group>
                  </ValidationProvider>
                  <ValidationProvider
                    v-slot="validationContext"
                    :name="$t('auth.last_name')"
                    :rules="{ required: true, alphaNum: true, min: 3, max: 128 }"
                  >
                    <b-form-group>
                      <b-input-group>
                        <b-form-input
                          id="last-name"
                          v-model="form.last_name"
                          class="rounded-pill input-signup"
                          :placeholder="$t('auth.last_name')"
                          :state="getValidationState(validationContext)"
                        ></b-form-input>
                        <b-form-invalid-feedback>{{
                            validationContext.errors[0]
                          }}</b-form-invalid-feedback>
                        <b-input-group-prepend v-if="getValidationState(validationContext)" class="d-flex align-items-center px-1">
                          <b-img width="20" height="20" :src="require('~/assets/img/auth/check.svg')" />
                        </b-input-group-prepend>
                      </b-input-group>
                    </b-form-group>
                  </ValidationProvider>
                  <ValidationProvider
                    v-slot="validationContext"
                    :name="$t('auth.username')"
                    :rules="{ required: true, alphaNum: true, min: 3, max: 128 }"
                  >
                    <b-form-group>
                      <b-input-group>
                        <b-form-input
                          id="username"
                          v-model="form.username"
                          class="rounded-pill input-signup"
                          :placeholder="$t('auth.username')"
                          :state="getValidationState(validationContext)"
                        ></b-form-input>
                        <b-form-invalid-feedback>{{
                            validationContext.errors[0]
                          }}</b-form-invalid-feedback>
                        <b-input-group-prepend v-if="getValidationState(validationContext)" class="d-flex align-items-center px-1">
                          <b-img width="20" height="20" :src="require('~/assets/img/auth/check.svg')" />
                        </b-input-group-prepend>
                      </b-input-group>
                    </b-form-group>
                  </ValidationProvider>
                  <ValidationProvider
                    v-slot="validationContext"
                    :name="$t('auth.email_address')"
                    :rules="{ required: true, validEmail: true, email: true, min: 3, max: 128 }"
                  >
                    <b-form-group>
                      <b-input-group>
                        <b-form-input
                          id="email-address"
                          v-model="form.email"
                          class="rounded-pill input-signup"
                          :placeholder="$t('auth.email_address')"
                          :state="getValidationState(validationContext)"
                        ></b-form-input>
                        <b-form-invalid-feedback>{{
                            validationContext.errors[0]
                          }}</b-form-invalid-feedback>
                        <b-input-group-prepend v-if="getValidationState(validationContext)" class="d-flex align-items-center px-1">
                          <b-img width="20" height="20" :src="require('~/assets/img/auth/check.svg')" />
                        </b-input-group-prepend>
                      </b-input-group>
                    </b-form-group>
                  </ValidationProvider>
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
                          class="rounded-pill input-signup input-append"
                          :placeholder="$t('auth.password')"
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
                          class="rounded-pill input-signup input-append"
                          :placeholder="$t('auth.confirm_password')"
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
                      <div
                        v-if="getValidationState(validationContext) || getValidationState(validationContext) === null"
                        class="body-5-normal text-color-gray-47 mt-2"
                      >{{ $t('auth.password_validation_rule') }}</div>
                    </b-form-group>

                    <b-row class="mt-4 w-100">
                      <b-col md="4" offset-md="4">
                        <Button :disabled="! isFormFilled" block pill variant="confirm" type="submit" :class="{ 'btn-disabled': ! isFormFilled }">{{ $t('auth.signup') }}</Button>
                      </b-col>
                    </b-row>

                    <b-row class="mt-4 mb-5">
                      <b-col md="12">
                        <div class="body-5-normal text-color-gray-38 text-center">{{ $t('auth.secure_login_with_recaptcha') }}</div>
                        <div class="body-5-normal text-color-gray-38 text-center mt-2">
                          <span class="text-decoration-underline" role="button" @click="$router.push('/terms-and-conditions')">{{ $t('auth.terms') }}</span>&nbsp;&amp;&nbsp;
                          <span class="text-decoration-underline" role="button" @click="$router.push('/privacy-policy')">{{ $t('auth.privacy') }}</span>
                        </div>
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
  </b-row>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import Button from '~/components/common/Button'
import { UNPROCESSABLE_ENTITY } from '~/static/constants'

export default {
  name: 'SignUp',
  components: {
    ValidationProvider,
    ValidationObserver,
    Button,
  },
  layout: 'Auth',
  data() {
    return {
      isPasswordShown: false,
      isConfirmPasswordShown: false,
      form: {
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
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
  async mounted() {
    try {
      await this.$recaptcha.init()
    } catch (error) {
      this.$toasted.error(error)
    }
  },
  beforeDestroy() {
    this.$recaptcha.destroy()
  },
  methods: {
    getValidationState({dirty, validated, valid = null}) {
      // Returns the contextual state (validation style) of the element being validated (false for invalid, true for valid, or null for no validation state)
      return dirty || validated ? valid : null
    },
    async onSubmit() {
      try {
        this.form.token = await this.$recaptcha.execute('login')
        // Do the registration process
        this.$axios.post('/register', this.form, { handleError: false }).then((response) => {
          this.$toasted.success(this.$t('signup.success_message.user_successfully_registered').toString())
          this.$emit('complete', response.data.user)
          this.$router.push('login')
        }).catch((error) => {
          if (error.response.status === UNPROCESSABLE_ENTITY){
            if (error.response.data.errors.email) {
              this.$toasted.error(this.$t('auth.error.the_email_has_already_been_taken').toString())
            }

            if (error.response.data.errors.username) {
              this.$toasted.error(this.$t('auth.error.username_already_taken').toString())
            }
          } else {
            this.$toasted.error(this.$t('auth.error.something_went_wrong_please_try_later').toString())
          }
        })
      } catch (error) {
        this.$toasted.error(error)
      }
    },
    socialLogin(service){
      this.$axios.get(`login/${service}`
      ).then((res) => {
        window.open(res.data, '_blank')
      })
    },
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

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

.bg-color-white-5
  background: $color-white-5

.text-color-black-1
  color: $color-black-1

.text-color-gray-22
  color: $color-gray-22

.text-color-gray-38
  color: $color-gray-38

.text-color-gray-47
  color: $color-gray-47

/* Override common Button component border color */
.border-gray
  border-color: $color-gray-40 !important

/* Override bootstrap-vue 'b-form-input' styles */
.input-signup
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

.text-pre-line
  white-space: pre-line

.text-line-middle
  display: flex
  align-items: center
  justify-content: center

.text-line-middle
  &::before, &::after
    background: $color-gray-22
    height: 1px
    flex: 1
    content: ''

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
