<template>
  <b-row class="vh-100">
    <b-col md="8">
      <b-row class="mt-3 ml-2 back-to-login">
        <b-col md="12" class="d-flex align-items-center">
          <b-img :src="require('~/assets/img/auth/back_arrow_blue_1.svg')"></b-img>
          <NuxtLink
            class="custom-link pl-0"
            to="login"
          ><span class="text-color-blue-1">{{
              $t('auth.back_to_log_in')
            }}</span>
          </NuxtLink>
        </b-col>
      </b-row>

      <b-row class="h-100">
        <b-col md="6" offset-md="3" class="d-flex flex-column align-items-center justify-content-center">
          <nuxt-link class="d-lg-none mb-5" to="/">
            <Logo class="mb-3"/>
          </nuxt-link>
          <b-row>
            <b-col md="12">
              <div class="right-heading-bold text-center">{{ $t('auth.forgot_password') }}</div>
              <div class="body-5-normal text-color-gray-38 text-center text-pre-line mt-3">{{ $t('auth.enter_your_email_and') }}</div>
            </b-col>
          </b-row>
          <b-row class="mt-4 w-100">
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
                        v-model="email"
                        class="rounded-pill input-forgot-password"
                        :placeholder="$t('auth.email_address')"
                        :state="getValidationState(validationContext)"
                      ></b-form-input>
                      <b-form-invalid-feedback>{{
                          validationContext.errors[0]
                        }}</b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>

                  <b-row class="mt-5 w-100 link-btn">
                    <b-col md="4" offset-md="4" class="text-center">
                      <Button :disabled="! isEmailFilled" block pill variant="confirm" type="submit" :class=" { 'btn-disabled': ! isEmailFilled }">{{ $t('auth.send_link') }}</Button>
                    </b-col>
                  </b-row>
                </b-form>
              </ValidationObserver>
              <div class="back-to-login-btn d-lg-none">
                <b-img :src="require('~/assets/img/auth/back_arrow_blue_1.svg')"></b-img>
                <NuxtLink
                  class="custom-link pl-0"
                  to="login"
                ><span class="text-color-blue-1">{{
                    $t('auth.back_to_log_in')
                  }}</span>
                </NuxtLink>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-col>
    <b-col md="4" class="d-flex flex-column align-items-center justify-content-center bg-color-white-5 new-to-deadstock-main">
      <b-row class="mt-5">
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
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import Button from '~/components/common/Button'
import { UNPROCESSABLE_ENTITY } from '~/static/constants'
import Logo from '~/components/header/Logo.vue'
export default {
  name: 'ForgotPassword',
  components: { ValidationProvider, ValidationObserver, Button, Logo },
  layout: 'Auth',
  data() {
    return {
      email: '',
    }
  },
  computed: {
    isEmailFilled (vm) {
      return vm.email.length
    }
  },
  methods: {
    getValidationState({dirty, validated, valid = null}) {
      // Returns the contextual state (validation style) of the element being validated (false for invalid, true for valid, or null for no validation state)
      return dirty || validated ? valid : null
    },
    onSubmit() {
      this.$axios.get('forgot-password/?email=' + this.email, {
        handleError: false,
        headers: {
          'Accept': 'application/json'
        }
      }).then(() => {
        this.$toasted.success(this.$t('auth.a_recovery_email_has_been_sent') + ' ' + this.email)
        this.$router.push('/login')
      }).catch((error) => {
        if (error.response.status === UNPROCESSABLE_ENTITY) {
          this.$toasted.error(this.$t('auth.error.unauthorized').toString());
        } else {
          this.$toasted.error(this.$t('auth.error.something_went_wrong_please_try_later').toString());
        }
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
.text-color-blue-1
  color: $color-blue-1
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
@media (min-width: 320px) and (max-width: 556px)
  .right-heading-bold
    font-size: 17px
  .input-forgot-password
    margin-left: 5px
  .new-to-deadstock-main
    display: none !important
  .link-btn
    width: 200px !important
    margin: 0 auto
  .back-to-login
    display: none !important
  .back-to-login-btn
    margin: 0 auto
    border: 1px solid $color-blue-1
    border-radius: 25px
    padding: 6px 10px
    width: 185px !important
    margin-top: 80px
/* Override bootstrap-vue 'b-form-input' styles */
.input-forgot-password
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
.btn
  &.btn-confirm
    &.btn-disabled
      background: $color-gray-47
      opacity: 1
      cursor: not-allowed
      &:hover
        box-shadow: none
@media (max-width: 992px)
  .btn.btn-confirm.btn-disabled
    background: $color-black-1
  .text-color-gray-38
    color: $color-gray-47
  .back-to-login-btn
    margin-top: 160px
</style>