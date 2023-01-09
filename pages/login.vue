<template>
  <div>
    <b-row v-if="Object.keys(credentials).length">
      <b-col lg="12" class="w-100 py-5 px-5 px-md-0">
        <TwoFaVerificationCodeForm
          v-if="Object.keys(credentials).length"
          :credentials="credentials"
          class="mt-1 w-100"
        />
      </b-col>
    </b-row>
    <b-row v-else class="w-100">
      <b-col lg="8" class="w-100 px-sm-1 px-md-5 px-lg-1 pt-lg-5">
        <b-row class="h-100">
          <b-col
            md="7"
            offset-md="3"
            class="d-flex flex-column align-items-center justify-content-center"
          >
            <b-row class="justify-content-center flex-column align-items-center"
              ><b-row class="mb-1">
                <b-col md="12">
                  <div class="right-heading-bold text-center d-none d-lg-flex">
                    {{ $t('auth.login_to_your_account') }}
                  </div>
                  <div
                    class="body-5-normal text-color-gray-38 text-center mt-3 d-none d-lg-block"
                  >
                    {{ $t('auth.login_via_social_media') }}
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="12">
                  <div class="text-center main-mobile-image d-block d-lg-none">
                    <nuxt-link to="/">
                      <Logo class="img-main" />
                    </nuxt-link>
                  </div>
                  <div class="welcome-back-text text-center d-block d-lg-none">
                    {{ $t('home.welcome_back') }}
                  </div>
                </b-col>
              </b-row>

              <div class="toggler-main d-lg-none">
                <span class="signup-btn" role="button" @click="singupPage">
                  {{ $t('auth.create_an_account') }}
                </span>
                <button class="login-btn">
                  {{ $t('auth.login') }}
                </button>
              </div>
              <SocialLoginButtons class="d-none d-lg-block mt-sm-3" />

              <b-row
                class="mb-3 w-100 order-1 order-lg-3 px-4 px-lg-0 mt-5 d-none d-lg-block"
              >
                <b-col md="12">
                  <div class="text-line-middle">
                    <span
                      class="body-4-bold text-color-gray-22 text-uppercase mx-5"
                    >
                      {{ $t('auth.or') }}
                    </span>
                  </div>
                </b-col>
              </b-row>
            </b-row>
            <LoginForm
              class="w-100 d-flex ml-3 mr-0 login-form-section"
              @verify="handleVerify"
            />

            <b-row class="mt-4 w-100">
              <b-col md="12" class="text-center py-md-4">
                <b-link
                  class="text-color-gray-47 text-decoration-underline forgot-pass-text ml-3"
                  to="/forgot-password"
                >
                  {{ $t('auth.forgot_password') }}&quest;
                </b-link>
              </b-col>
            </b-row>
            <b-col md="12 d-lg-none pb-3 ml-auto mt-4">
              <div class="text-line-middle pl-2">
                <span
                  class="body-4-bold text-color-gray-22 text-uppercase mx-3"
                >
                  {{ $t('auth.or') }}
                </span>
              </div>
            </b-col>
            <div
              class="body-5-normal text-color-gray-38 text-center mt-2 d-block d-lg-none mb-3"
            >
              {{ $t('auth.login_via_social_media') }}
            </div>

            <SocialLoginButtons
              class="d-block d-lg-none p-0 sociallogin-btn-mobile"
            />

            <b-row class="mt-4 mb-5 d-none d-lg-block">
              <b-col md="12 mb-5">
                <div class="body-5-normal text-color-gray-38 text-center">
                  {{ $t('auth.secure_login_with_recaptcha') }}
                </div>
                <div class="body-5-normal text-color-gray-38 text-center mt-2">
                  <span
                    class="text-decoration-underline"
                    role="button"
                    @click="$router.push('/terms-and-conditions')"
                    >{{ $t('auth.terms') }}</span
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
        class="flex-column align-items-center justify-content-center login-right-area d-none d-lg-flex"
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

        <b-row class="mt-5 w-100 d-flex justify-content-center">
          <b-col lg="6" md="12" class="d-flex justify-content-center">
            <Button
              pill
              block
              variant="black"
              class="w-75 fs-16 fw-5 font-primary bg-black sign-up-btn"
              to="/signup"
            >
              {{ $t('auth.signup') }}
            </Button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import Button from '~/components/common/Button'
import LoginForm from '~/components/Auth/LoginForm'
import SocialLoginButtons from '~/components/Auth/SocialLoginButtons'
import TwoFaVerificationCodeForm from '~/components/Auth/TwoFaVerificationCodeForm'
import screenSize from '~/plugins/mixins/screenSize'
import { enquireScreenSizeHandler } from '~/utils/screenSizeHandler'
import Logo from '~/components/header/Logo.vue'

export default {
  name: 'Login',
  components: {
    TwoFaVerificationCodeForm,
    LoginForm,
    SocialLoginButtons,
    Button,
    Logo
  },
  mixins: [screenSize],
  layout: 'Auth',
  data() {
    return {
      credentials: {},
    }
  },
  computed: {
    isResponsive(vm) {
      return vm.isScreenXS || vm.isScreenSM
    },
  },
  beforeMount() {
    this.$root.$emit('hide-header', { hideHeader: true })
    this.$root.$emit('hide-footer', { hideFooter: true })

    enquireScreenSizeHandler((type) => {
      this.$store.commit('size/setScreenType', type)
    })
  },
  beforeDestroy() {
    this.$root.$emit('hide-header', { hideHeader: false })
    this.$root.$emit('hide-footer', { hideFooter: false })
  },
  methods: {
    singupPage() {
      this.$router.push({
        path: '/signup',
      })
    },
    handleVerify(payload) {
      this.credentials = payload
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.login-right-area
  background-image: url('~/assets/img/sign-up/loginbackground.png')
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

.text-color-black-1
  color: $color-black-1
.text-color-gray-47
  color: $color-gray-47

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
.welcome-back-text
  color: $color-gray-5
  font-style: normal
  font-weight: $bold
  @include body-17
.toggler-main
  background-color: $color-gray-75
  border-radius: 20px
  display: flex
  justify-content: center
  align-items: center
  width: 346px
  height: 36px
  margin-left: 12px
  margin-top: -12.5px
.login-btn
  border: none
  background-color: $color-white-1
  border-radius: 20px
  font-weight: 600
  font-size: 11px
  height: 28.8px
  width: 168px
  padding: 0
.signup-btn
  border: none
  background-color: $color-gray-75
  border-radius: 20px
  font-weight: 500
  font-size: 11px
  height: 28.8px
  width: 168px
  display: inline-flex
  justify-content: center
  align-items: center
.main-mobile-image
  padding: 78px 0px 0px 1px

@media (min-width: 320px) and (max-width: 556px)
  .img-main
    margin: 0 auto
  .forgot-pass-text
    font-size: 14px
  .text-line-middle
    width: 50%
    padding-top: 30px
    margin: 0 auto
  .welcome-back-text
    margin: 0 auto
    line-height: 1.5
    margin-top: 22px
    margin-bottom: 31px
</style>
