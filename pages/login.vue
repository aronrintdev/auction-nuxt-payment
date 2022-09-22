<template>
  <b-row class="vh-100">
    <b-col md="8">
      <b-row class="h-100">
        <b-col
          md="6"
          offset-md="3"
          class="d-flex flex-column align-items-center justify-content-center"
        >
          <b-row>
            <b-col md="12">
              <div class="right-heading-bold text-center">
                {{ $t('auth.login_to_your_account') }}
              </div>
              <div class="body-5-normal text-color-gray-38 text-center mt-3">
                {{ $t('auth.login_via_social_media') }}
              </div>
            </b-col>
          </b-row>

          <b-row class="mt-4">
            <b-col
              md="12"
              class="d-flex align-items-center justify-content-center"
            >
              <b-img
                :src="require('~/assets/img/auth/social_login_google.svg')"
                class="mx-3"
                role="button"
                alt="..."
                @click="socialLogin('google')"
              />
              <b-img
                :src="require('~/assets/img/auth/social_login_facebook.svg')"
                class="mx-3"
                role="button"
                alt="..."
                @click="socialLogin('facebook')"
              />
              <b-img
                :src="require('~/assets/img/auth/social_login_apple.svg')"
                class="mx-3"
                role="button"
                alt="..."
                @click="socialLogin('apple')"
              />
              <b-img
                :src="require('~/assets/img/auth/social_login_twitter.svg')"
                class="mx-3"
                role="button"
                alt="..."
                @click="socialLogin('twitter')"
              />
            </b-col>
          </b-row>

          <b-row class="mt-4 w-100">
            <b-col md="12">
              <div class="text-line-middle">
                <span
                  class="body-4-bold text-color-gray-22 text-uppercase mx-5"
                  >{{ $t('auth.or') }}</span
                >
              </div>
            </b-col>
          </b-row>

          <b-row class="mt-5 w-100">
            <b-col md="12">
              <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
                <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
                  <ValidationProvider
                    v-slot="validationContext"
                    :name="$t('auth.email_address')"
                    :rules="{ required: true, email: true, min: 3, max: 128 }"
                  >
                    <b-form-group>
                      <b-form-input
                        id="email-address"
                        v-model="form.email"
                        class="rounded-pill input-login"
                        :placeholder="$t('auth.email_address')"
                        :state="getValidationState(validationContext)"
                      ></b-form-input>
                      <b-form-invalid-feedback>{{
                        validationContext.errors[0]
                      }}</b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>
                  <ValidationProvider
                    v-slot="validationContext"
                    :name="$t('auth.password')"
                    :rules="{ required: true }"
                  >
                    <b-form-group>
                      <b-input-group>
                        <b-form-input
                          id="password"
                          v-model="form.password"
                          class="rounded-pill input-login input-append"
                          :placeholder="$t('auth.password')"
                          :state="getValidationState(validationContext)"
                          :type="passwordFieldType"
                        ></b-form-input>
                        <b-input-group-append
                          class="d-flex align-items-center px-3 append-icon"
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
                        </b-input-group-append>
                        <b-form-invalid-feedback>{{
                          validationContext.errors[0]
                        }}</b-form-invalid-feedback>
                      </b-input-group>
                    </b-form-group>
                  </ValidationProvider>

                  <b-row class="mt-5 w-100">
                    <b-col md="4" offset-md="4" class="text-center">
                      <Button
                        :disabled="!isFormFilled"
                        block
                        pill
                        variant="confirm"
                        type="submit"
                        :class="{ 'btn-disabled': !isFormFilled }"
                        >{{ $t('auth.login') }}</Button
                      >
                    </b-col>
                  </b-row>

                  <b-row class="mt-5 w-100">
                    <b-col md="12" class="text-center">
                      <b-link
                        class="text-color-black-1 text-decoration-underline"
                        to="/forgot-password"
                        >{{ $t('auth.forgot_password') }}&quest;</b-link
                      >
                    </b-col>
                  </b-row>

                  <b-row class="mt-4 mb-5">
                    <b-col md="12">
                      <div class="body-5-normal text-color-gray-38 text-center">
                        {{ $t('auth.secure_login_with_recaptcha') }}
                      </div>
                      <div
                        class="body-5-normal text-color-gray-38 text-center mt-2"
                      >
                        <span class="text-decoration-underline" role="button" @click="$router.push('/terms-and-conditions')">{{
                          $t('auth.terms')
                        }}</span
                        >&nbsp;&amp;&nbsp;<span
                          class="text-decoration-underline"
                          role="button"
                          @click="$router.push('/privacy-policy')"
                          >{{ $t('auth.privacy') }}</span
                        >
                      </div>
                    </b-col>
                  </b-row>
                </b-form>
              </ValidationObserver>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-col>
    <b-col
      md="4"
      class="d-flex flex-column align-items-center justify-content-center bg-color-white-5"
    >
      <b-row>
        <b-col md="12">
          <div class="left-heading-bold text-center">
            {{ $t('auth.new_to_deadstock') }}&quest;
          </div>
          <div
            class="body-1-normal text-color-black-1 text-pre-line text-center mt-4"
          >
            {{ $t('auth.signup_and_buy') }}
          </div>
        </b-col>
      </b-row>

      <b-row class="mt-5 w-100">
        <b-col md="4" offset-md="4">
          <Button pill block variant="dark" to="/signup">{{
            $t('auth.signup')
          }}</Button>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
import { mapActions } from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import Button from '~/components/common/Button'
import { UNAUTHORIZED } from '~/static/constants'

export default {
  name: 'Login',
  components: { ValidationProvider, ValidationObserver, Button },
  layout: 'Auth',
  data() {
    return {
      isPasswordShown: false,
      form: {
        email: '',
        password: '',
        rememberMe: false,
      },
    }
  },
  computed: {
    passwordFieldType(vm) {
      return vm.isPasswordShown ? 'text' : 'password'
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
  methods: {
    ...mapActions({
      getUserDetails: 'auth/getUserDetails',
      getUserRedeemedReward: 'redeemed-reward/getUserRedeemedReward'
    }),
    getValidationState({ dirty, validated, valid = null }) {
      // Returns the contextual state (validation style) of the element being validated (false for invalid, true for valid, or null for no validation state)
      return dirty || validated ? valid : null
    },
    onSubmit() {
      // Do the login process
      this.$auth
        .login({ data: this.form, handleError: false })
        .then((response) => {
          this.$auth.strategy.token.set(response.data.access_token)
          this.getUserDetails(this.$store.state.auth.user.id)
          this.getUserRedeemedReward()
          this.$auth.$storage.removeCookie('rememberExpires')
          this.$toasted.success(
            this.$t('login.success_message.login_successfull').toString()
          )
          this.$store.dispatch('notifications/getNotifications')
          this.$store.dispatch('notifications/getUnreadCount')
          this.$router.push('/?lang=' + this.getLang.locale)
        })
        .catch((error) => {
          // If there's an error or the provided credentials don't match
          if (error.response.status === UNAUTHORIZED) {
            this.$toasted.error(this.$t('auth.error.unauthorized').toString())
          } else {
            this.$toasted.error(
              this.$t(
                'auth.error.something_went_wrong_please_try_later'
              ).toString()
            )
          }
        })
    },
    socialLogin(service) {
      this.$axios.get(`login/${service}`).then((res) => {
        window.open(res.data, '_blank')
      })
    },
  },
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

.text-color-black-1
  color: $color-black-1

.text-color-gray-22
  color: $color-gray-22

.text-color-gray-38
  color: $color-gray-38

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

.bg-color-white-5
  background: $color-white-5

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
