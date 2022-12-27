<template>
  <b-container fluid class="px-0 mx-0">
    <b-row class="w-100 mx-0">
      <b-col
        md="4"
        class="sign-upright-area flex-column align-items-center justify-content-center d-lg-flex d-none"
      >
        <b-row>
          <b-col md="12">
            <div class="left-heading-bold text-pre-line text-center">
              {{ $t('auth.welcome_back') }}
            </div>
          </b-col>
        </b-row>

        <b-row class="mt-5 w-100 d-flex justify-content-center">
          <b-col md="6" class="d-flex justify-content-center">
            <Button
              pill
              variant="white"
              class="text-white border-0 px-5"
              to="/login"
            >
              {{ $t('auth.login') }}
            </Button>
          </b-col>
        </b-row>
      </b-col>
      <b-col
        lg="8"
        cols="12"
        class="social-area pt-lg-5 px-2 d-flex justify-content-center"
      >
        <b-row class="h-100 justify-content-center w-100">
          <b-col
            md="6"
            class="d-flex flex-column align-items-center justify-content-center px-0"
          >
            <b-row
              class="testing flex-column align-items-center d-flex justify-content-center order-2 order-lg-1 mb-5 mb-lg-0"
            >
              <b-row class="order-2">
                <b-col md="12">
                  <div class="right-heading-bold text-center d-lg-block d-none">
                    {{ $t('auth.create_an_account') }}
                  </div>
                  <div
                    class="fs-15 fw-4 text-color-gray-38 text-center font-primary"
                  >
                    {{ $t('auth.signup_up_via_social_media') }}
                  </div>
                </b-col>
              </b-row>

              <b-row class="mt-3 order-3">
                <b-col
                  md="12"
                  class="d-flex align-items-center justify-content-center social-login"
                >
                  <b-img
                    :src="require('~/assets/img/auth/social_login_google.svg')"
                    class="mx-md-3 social-login"
                    role="button"
                    alt="..."
                    @click="socialLogin('google')"
                  />
                  <b-img
                    :src="
                      require('~/assets/img/auth/social_login_facebook.svg')
                    "
                    class="mx-md-3 social-login"
                    role="button"
                    alt="..."
                    @click="socialLogin('facebook')"
                  />
                  <b-img
                    :src="require('~/assets/img/auth/social_login_apple.svg')"
                    class="mx-md-3 social-login"
                    role="button"
                    alt="..."
                    @click="socialLogin('apple')"
                  />
                  <b-img
                    :src="require('~/assets/img/auth/social_login_twitter.svg')"
                    class="mx-md-3 social-login"
                    role="button"
                    alt="..."
                    @click="socialLogin('twitter')"
                  />
                </b-col>
              </b-row>

              <b-row class="or my-lg-4 w-100 order-1 order-lg-3">
                <b-col md="12">
                  <div class="text-line-middle">
                    <span
                      class="fs-16 fw-6 text-color-gray-22 font-primary text-uppercase mx-5"
                      >{{ $t('auth.or') }}</span
                    >
                  </div>
                </b-col>
              </b-row>
              <b-row class="order-4 skip-link d-lg-none d-flex">
                <b-col>
                  <u>
                    <b-link
                      class="fs-15 fw-4 font-primary text-black"
                      to="/login"
                    >
                      {{ $t('signup.skip') }}
                    </b-link>
                  </u>
                </b-col>
              </b-row>
            </b-row>
            <b-row class="form-area order-1 order-lg-2 w-100">
              <b-col md="12" class="px-0">
                <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
                  <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
                    <b-row class="d-lg-none d-flex">
                      <b-col
                        class="d-flex justify-content-center flex-column align-items-center"
                      >
                        <nuxt-link to="/">
                          <Logo class="img-main" />
                        </nuxt-link>
                        <span
                        class="signup-heading"
                        >
                          {{ $t('signup.create_your_account') }}
                        </span>
                      </b-col>
                    </b-row>
                    <div class="toggler-main d-lg-none d-flex justify-content-between">
                      <span class="signup-btn" role="button" >
                        {{$t('auth.create_an_account')}}
                      </span>
                      <button class="login-btn" @click="loginPage">
                        {{$t('auth.login')}}
                      </button>
                    </div>
                    <ValidationProvider
                      v-slot="validationContext"
                      :name="$t('auth.first_name')"
                      :rules="{
                        required: true,
                        alphaNum: true,
                        min: 3,
                        max: 128,
                      }"
                    >
                      <b-form-group class="px-1">
                        <b-input-group
                          class="d-flex align-items-end w-95 pull-left"
                        >
                          <b-form-input
                            id="first-name"
                            v-model="form.first_name"
                            class="rounded-pill rounded-md input-signup"
                            :placeholder="$t('auth.first_name')"
                            :state="getValidationState(validationContext)"
                          ></b-form-input>
                          <b-form-invalid-feedback>{{
                            validationContext.errors[0]
                          }}</b-form-invalid-feedback>
                        </b-input-group>
                        <b-input-group-prepend
                          v-if="getValidationState(validationContext)"
                          class="success-check d-flex align-items-center px-1 pl-2"
                        >
                          <b-img
                            width="20"
                            height="20"
                            :src="require('~/assets/img/auth/check.svg')"
                          />
                        </b-input-group-prepend>
                      </b-form-group>
                    </ValidationProvider>
                    <ValidationProvider
                      v-slot="validationContext"
                      :name="$t('auth.last_name')"
                      :rules="{
                        required: true,
                        alphaNum: true,
                        min: 3,
                        max: 128,
                      }"
                    >
                      <b-form-group class="px-1">
                        <b-input-group
                          class="d-flex align-items-end w-95 pull-left"
                        >
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
                        </b-input-group>
                        <b-input-group-prepend
                          v-if="getValidationState(validationContext)"
                          class="success-check d-flex align-items-center px-1 pl-2"
                        >
                          <b-img
                            width="20"
                            height="20"
                            :src="require('~/assets/img/auth/check.svg')"
                          />
                        </b-input-group-prepend>
                      </b-form-group>
                    </ValidationProvider>
                    <ValidationProvider
                      v-slot="validationContext"
                      :name="$t('auth.username')"
                      :rules="{
                        required: true,
                        alphaNum: true,
                        min: 3,
                        max: 128,
                      }"
                    >
                      <b-form-group class="px-1">
                        <b-input-group
                          class="d-flex align-items-end w-95 pull-left"
                        >
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
                        </b-input-group>
                        <b-input-group-prepend
                          v-if="getValidationState(validationContext)"
                          class="success-check d-flex align-items-center px-1 pl-2"
                        >
                          <b-img
                            width="20"
                            height="20"
                            :src="require('~/assets/img/auth/check.svg')"
                          />
                        </b-input-group-prepend>
                      </b-form-group>
                    </ValidationProvider>
                    <ValidationProvider
                      v-slot="validationContext"
                      :name="$t('auth.email_address')"
                      :rules="{
                        required: true,
                        email: true,
                        min: 3,
                        max: 128,
                      }"
                    >
                      <b-form-group class="px-1">
                        <b-input-group
                          class="d-flex align-items-end w-95 pull-left"
                        >
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
                        </b-input-group>
                        <b-input-group-prepend
                          v-if="getValidationState(validationContext)"
                          class="success-check d-flex align-items-center px-1 pl-2"
                        >
                          <b-img
                            width="20"
                            height="20"
                            :src="require('~/assets/img/auth/check.svg')"
                          />
                        </b-input-group-prepend>
                      </b-form-group>
                    </ValidationProvider>
                    <ValidationProvider
                      v-slot="validationContext"
                      :name="$t('auth.password')"
                      :rules="{
                        required: true,
                        min: 8,
                        oneUppercase: true,
                        oneDigit: true,
                        oneSymbol: true,
                      }"
                      vid="password"
                    >
                      <b-form-group class="px-1">
                        <b-input-group
                          class="d-flex align-items-end w-95 pull-left"
                        >
                          <b-form-input
                            id="password"
                            v-model="form.password"
                            class="rounded-pill input-signup input-append"
                            :placeholder="$t('auth.password')"
                            :state="getValidationState(validationContext)"
                            :type="passwordFieldType"
                          ></b-form-input>
                          <b-input-group-prepend
                            class="d-flex align-items-center px-1 append-icon"
                          >
                            <i
                              v-if="isPasswordShown"
                              class="fa fa-eye"
                              aria-hidden="true"
                              role="button"
                              @click="isPasswordShown = !isPasswordShown"
                            ></i>
                            <i
                              v-else
                              class="fa fa-eye-slash"
                              aria-hidden="true"
                              role="button"
                              @click="isPasswordShown = !isPasswordShown"
                            ></i>
                          </b-input-group-prepend>
                          <b-form-invalid-feedback>{{
                            validationContext.errors[0]
                          }}</b-form-invalid-feedback>
                        </b-input-group>
                        <b-input-group-prepend
                          v-if="getValidationState(validationContext)"
                          class="success-check d-flex align-items-center px-1"
                        >
                          <b-img
                            width="20"
                            height="20"
                            :src="require('~/assets/img/auth/check.svg')"
                          />
                        </b-input-group-prepend>
                      </b-form-group>
                    </ValidationProvider>
                    <ValidationProvider
                      v-slot="validationContext"
                      :name="$t('auth.confirm_password')"
                      :rules="{
                        required: true,
                        min: 8,
                        oneUppercase: true,
                        oneDigit: true,
                        oneSymbol: true,
                        confirmed: 'password',
                      }"
                    >
                      <b-form-group class="px-1">
                        <b-input-group
                          class="d-flex align-items-end w-95 pull-left"
                        >
                          <b-form-input
                            id="password-confirmation"
                            v-model="form.password_confirmation"
                            class="rounded-pill input-signup input-append"
                            :placeholder="$t('auth.confirm_password')"
                            :state="getValidationState(validationContext)"
                            :type="confirmPasswordFieldType"
                          ></b-form-input>
                          <b-input-group-prepend
                            class="d-flex align-items-center px-1 append-icon"
                          >
                            <i
                              v-if="isConfirmPasswordShown"
                              class="fa fa-eye text-black-50"
                              aria-hidden="true"
                              role="button"
                              @click="
                                isConfirmPasswordShown = !isConfirmPasswordShown
                              "
                            ></i>
                            <i
                              v-else
                              class="fa fa-eye-slash"
                              aria-hidden="true"
                              role="button"
                              @click="
                                isConfirmPasswordShown = !isConfirmPasswordShown
                              "
                            ></i>
                          </b-input-group-prepend>
                          <b-form-invalid-feedback>{{
                            validationContext.errors[0]
                          }}</b-form-invalid-feedback>
                        </b-input-group>
                        <b-input-group-prepend
                          v-if="getValidationState(validationContext)"
                          class="success-check d-flex align-items-center px-1"
                        >
                          <b-img
                            width="20"
                            height="20"
                            :src="require('~/assets/img/auth/check.svg')"
                          />
                        </b-input-group-prepend>
                        <div
                          v-if="
                            getValidationState(validationContext) ||
                            getValidationState(validationContext) === null
                          "
                          class="body-5-normal text-color-gray-47 mt-2 text-lg-center validation minimum ml-3"
                        >
                          {{ $t('auth.password_validation_rule') }}
                        </div>
                      </b-form-group>

                      <b-row
                        class="mt-3 w-100 mx-0 d-flex justify-content-center submit-btn-p"
                      >
                        <b-col md="8" class="text-center">
                          <Button
                            :disabled="!isFormFilled"
                            pill
                            variant="confirm"
                            type="submit"
                            class="border-0 px-5 submit-btn"
                            :class="{ 'btn-disabled': !isFormFilled }"
                            >{{ $t('auth.signup') }}</Button
                          >
                        </b-col>
                      </b-row>

                      <b-row class="mt-4 mb-5 d-none d-lg-flex">
                        <b-col md="12">
                          <div
                            class="body-5-normal text-color-gray-38 text-center"
                          >
                            {{ $t('auth.secure_login_with_recaptcha') }}
                          </div>
                          <div
                            class="body-5-normal text-color-gray-38 text-center mt-2"
                          >
                            <span
                              class="text-decoration-underline"
                              role="button"
                              @click="$router.push('/terms-and-conditions')"
                              >{{ $t('auth.terms') }}</span
                            >&nbsp;&amp;&nbsp;
                            <span
                              class="text-decoration-underline"
                              role="button"
                              @click="$router.push('/privacy-policy')"
                              >{{ $t('auth.privacy') }}</span
                            >
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
  </b-container>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import Button from '~/components/common/Button'
import { UNPROCESSABLE_ENTITY } from '~/static/constants'
import Logo from '~/components/header/Logo.vue'
import screenSize from '~/plugins/mixins/screenSize'
import { enquireScreenSizeHandler } from '~/utils/screenSizeHandler'

export default {
  name: 'SignUp',
  components: {
    ValidationProvider,
    ValidationObserver,
    Button,
    Logo,
  },
  mixins: [screenSize],
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
      },
    }
  },
  computed: {
    isResponsive(vm) {
      return vm.isScreenXS || vm.isScreenSM
    },
    passwordFieldType(vm) {
      return vm.isPasswordShown ? 'text' : 'password'
    },
    confirmPasswordFieldType(vm) {
      return vm.isConfirmPasswordShown ? 'text' : 'password'
    },
    isFormFilled(vm) {
      let isFormFilled = true

      Object.values(vm.form).forEach((value) => {
        if (value === '') {
          isFormFilled = false

          return false
        }

        return true
      })

      return isFormFilled
    },
  },
  async mounted() {
    try {
      await this.$recaptcha.init()
      await this.verify()
    } catch (error) {
      this.$toasted.error(error)
    }
  },
  beforeMount() {
    this.$root.$emit('hide-header', { hideHeader: true })
    this.$root.$emit('hide-footer', { hideFooter: true })

    enquireScreenSizeHandler((type) => {
      this.$store.commit('size/setScreenType', type)
    })
  },
  beforeDestroy() {
    this.$recaptcha.destroy()
    this.$root.$emit('hide-header', { hideHeader: false })
    this.$root.$emit('hide-footer', { hideFooter: false })
  },
  methods: {
    loginPage(){
      this.$router.push({
        path: '/login',
      })
    },
    getValidationState({ dirty, validated, valid = null }) {
      // Returns the contextual state (validation style) of the element being validated (false for invalid, true for valid, or null for no validation state)
      return dirty || validated ? valid : null
    },
    async onSubmit() {
      try {
        this.form.token = await this.$recaptcha.execute('login')
        // Do the registration process
        this.$axios
          .post('/register', this.form, { handleError: false })
          .then((response) => {
            this.$toasted.success(
              this.$t(
                'signup.success_message.user_successfully_registered'
              ).toString()
            )
            this.$emit('complete', response.data.user)
            this.$router.push('/login')
          })
          .catch((error) => {
            if (error.response.status === UNPROCESSABLE_ENTITY) {
              if (error.response.data.errors.email) {
                this.$toasted.error(
                  this.$t(
                    'auth.error.the_email_has_already_been_taken'
                  ).toString()
                )
              }

              if (error.response.data.errors.username) {
                this.$toasted.error(
                  this.$t('auth.error.username_already_taken').toString()
                )
              }
            } else {
              this.$toasted.error(
                this.$t(
                  'auth.error.something_went_wrong_please_try_later'
                ).toString()
              )
            }
          })
      } catch (error) {
        this.$toasted.error(error)
      }
    },
    socialLogin(service) {
      this.$axios.get(`login/${service}`).then((res) => {
        window.open(res.data, '_blank')
      })
    },
    verify() {
      if (
        this.$router.currentRoute.query.token &&
        this.$router.currentRoute.query.email
      ) {
        const data = {
          token: this.$router.currentRoute.query.token,
          email: this.$router.currentRoute.query.email,
        }
        const searchParams = new URLSearchParams(data)

        this.$axios
          .get('verify/?' + searchParams, { handleError: false })
          .then((response) => {
            this.$toasted.success(this.$t(response.data.message).toString())
          })
          .catch((error) => {
            this.$toasted.error(this.$t(error.response.data.message).toString())
          })
          .finally(() => {
            this.$router.push('/login')
          })
      }
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.sign-upright-area
  background-image: url('~/assets/img/sign-up/signupbackground.png')
  background-position: center center
  background-repeat: no-repeat
  background-size: cover

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

.text-color-grey-5
  color: $color-gray-5

.w-95
  width: 95%

.w-5
  width: 5%

.success-check
  padding: 0.5rem
  margin: 0px auto
  height: 100%

/* Override common Button component border color */
.border-gray
  border-color: $color-gray-40 !important

/* Override bootstrap-vue 'b-form-input' styles */
.input-signup
  @include body-5-normal
  color: $color-black-1
  background-color: $color-white-5
  border: 0
  transition: border-color 0.01s ease-in-out, box-shadow 0.01s ease-in-out
  &::placeholder,
  &:-ms-input-placeholder,
  &::-ms-input-placeholder
    @include body-5-normal
    color: $color-gray-47

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
  padding: 0.7rem
  .fa-eye-slash
    &:before
      color: $color-gray-47

.btn
  background: $color-blue-20 !important
  color: $color-white-1 !important
  font-size: 16px
  font-weight: 400 !important
  font-family: "Montserrat"

.btn
  &.btn-confirm
    &.btn-disabled
      background: $color-gray-47 !important
      opacity: 1
      cursor: not-allowed
      &:hover
        box-shadow: none
.invalid-feedback
  padding-left: 13px
// ------------------Responsive--------------------
@media only screen and (max-width: 768px)
  .input-signup
    font-size: 14px
    line-height: 18px

  .form-area::v-deep
    padding-top: 78px

    .form-group
      margin-bottom: 13px
    .minimum
      margin-bottom: 15px
    .submit-btn-p
      .btn
        width: 171px
        height: 42px
    input
      border-radius: 10px !important
      background-color: transparent
      border: 1px solid $color-gray-3 !important
      height: 40px !important
      &::placeholder
       color: $color-gray-47
       font-weight: 500
      &:focus
        font-size: 15px
        border: 1px solid $color-gray-3
    #password, #password-confirmation
      border-radius: 10px 0px 0px 10px !important
      border: 1px solid $color-gray-3
      border-right: 0px !important

    .append-icon
      background: transparent
      border: 1px solid $color-gray-3
      border-left: 0px
      border-radius: 0px 10px 10px 0px !important
      padding: 0.7rem
      &:focus
        border-radius: 0px 10px 10px 0px
    .signup-heading
      line-height: 18px
      color: $color-gray-5
      font-style: normal
      font-weight: $bolder
      margin-top: 22px
      margin-bottom: 31px
    .validation
      font-size: 10px !important
      font-weight: 500 !important
      font-family: $font-montserrat
    .switch-btn
      padding: 0px 64px 0px 70px
  .social-area
    .or
      padding: 26px 0px !important
    .skip-link
      margin-top: 32px

    .social-login
      width: 48px
      gap: 30px
    .text-line-middle
      span
        margin: 0px 15px !important
      &:before, &:after
        background: $color-gray-71
        flex: 1
        width: 50px !important
@media (max-width: 992px)
  ::v-deep .nav-group .btn-group
    margin-left: 0
    margin-right: 0

@media (min-width: 320px) and (max-width: 556px)
  .img-main
    margin: 0 auto

  .btn.btn-confirm.btn-disabled
    background: $color-black-1 !important

.toggler-main
  width: 335px
  height: 36px
  background-color: $color-gray-75
  border-radius: 20px
  display: inline
  text-align: center
  padding: 4px 4px
  margin-bottom: 20px
  margin-top: 2px
.signup-btn
  border: none
  padding: 5px 0px
  width: 171.5px
  background-color: $color-white-1
  border-radius: 20px
  font-weight: 600
  @include body-6
.login-btn
  padding: 4px 0px
  border: none
  width: 168px
  background-color: $color-gray-75
  border-radius: 20px
  font-weight: 500
  @include body-6
</style>
