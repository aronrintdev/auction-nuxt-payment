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

          <SocialLoginButtons class="mt-4" />

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

          <VerificationCodeForm v-if="Object.keys(credentials).length" :credentials="credentials" class="mt-5 w-100" />
          <LoginForm v-else class="mt-5 w-100" @verify="handleVerify" />

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
import Button from '~/components/common/Button'
import LoginForm from '~/components/Auth/LoginForm'
import SocialLoginButtons from '~/components/Auth/SocialLoginButtons'
import VerificationCodeForm from '~/components/Auth/VerificationCodeForm'

export default {
  name: 'Login',
  components: { VerificationCodeForm, LoginForm, SocialLoginButtons, Button },
  layout: 'Auth',
  data() {
    return {
      credentials: {},
    }
  },
  methods: {
    handleVerify(payload) {
      this.credentials = payload
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
</style>
