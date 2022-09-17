<template>
  <form
    id="register-form"
    method="post"
    role="form"
    @submit.prevent="loginuser"
  >
    <!--Social Login-->
    <SocialLogin />
    <!--Social Login-->
    <h2>
      <span>{{ $t('login.or') }}</span>
    </h2>
    <div class="form-group">
      <input
        id="username"
        v-model="auth.email"
        name="firstname"
        tabindex="2"
        class="form-control signupfeilds"
        :placeholder="$t('login.username_email')"
      />
    </div>
    <div class="form-group">
      <div id="show_hide_password" class="input-group">
        <input
          v-model="auth.password"
          class="form-control signupfeilds"
          :placeholder="$t('login.password')"
          :type="[showPassword ? 'text' : 'password']"
        />
        <div class="input-group-addon">
          <nuxt-link to="#" class="show-password">
            <span @click="showPassword = !showPassword"
              ><i class="fa fa-eye-slash" aria-hidden="true"> </i>
            </span>
          </nuxt-link>
        </div>
      </div>
      <p class="feildtxt2">{{ $t('login.forgot_password') }}</p>
    </div>
    <div class="form-group">
      <b-form-checkbox
        id="remember-me"
        v-model="auth.rememberMe"
        name="checkbox"
      >
        {{ $t('login.remember_me') }}
      </b-form-checkbox>
      <br />
    </div>
    <div class="form-group">
      <div class="row">
        <div class="col-sm-12 col-sm-offset-3">
          <input
            id="login-submit"
            type="submit"
            name="login-submit"
            tabindex="4"
            class="form-control createac-b"
            :value="
              processing === true ? $t('login.loading') : $t('login.login')
            "
          />
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="row">
        <div class="col-lg-12">
          <div class="text-center terms">
            By Logging in, you agree to the
            <NuxtLink to="#">{{ $t('login.terms_of_service') }}</NuxtLink>
            {{ $t('login.and') }}
            <NuxtLink to="#">{{ $t('login.private_policy') }}</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import SocialLogin from '~/components/Auth/SocialLogin.vue'
export default {
  name: 'LoginComponent',
  components: {
    // Social Login Component
    SocialLogin,
  },
  props: {
    inlineMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      errors: [], // to store errors
      error: false, // errors- false by default
      showPassword: false, // toggle between password hide/show
      auth: {
        email: '',
        password: '',
        rememberMe: false,
      },
      processing: false,
    }
  },
  computed: {
    ...mapGetters({
      getCheckoutStatus: 'heat-check/getCheckoutStatus',
      getSku: 'heat-check/getSku',
    }),
  },
  methods: {
    ...mapActions({
      getUserDetails: 'auth/getUserDetails',
    }),
    /* eslint-disable no-console */
    // User login
    async loginuser() {
      this.processing = true
      this.errors = [] // errors is empty by default
      // If Username / Email not exist.
      if (!this.auth.email) {
        this.processing = false
        this.errors.push(this.$t('login.error_message.username_email_required')) // add the error to array given
        this.$toasted.error(this.errors) // show error message
        return false
      } else if (!this.auth.password) {
        // If password doesnot exist.
        this.processing = false
        this.errors.push(this.$t('login.error_message.password_required')) // Add the error to array given
        this.$toasted.error(this.errors) // show error message
        return false
      }
      // If no errors do Login
      if (!this.errors.length) {
        // Login functionality goes here.
        try {
          if (this.inlineMode) {
            const response = await this.$axios.post('/login', this.auth)
            this.$auth.strategy.token.set(response.data.access_token)
            const profile = await this.$axios.get('/user')
            this.$emit('complete', profile.data)
          } else {
            const response = await this.$auth.login({ data: this.auth })
            // If success
            if (response.status === 200) {
              // universally set access token
              this.$auth.strategy.token.set(response.data.access_token)
              this.getUserDetails(this.$store.state.auth.user.id)
              if (this.auth.rememberMe) {
                // Store a cookie for rememebr me flag , expiry time is set for 2 weeks
                this.$auth.$storage.setCookie('rememberExpires', 14, {
                  expires: 14,
                })
                // Store a cookie for token,  expiry time is set for 2 weeks
                this.$auth.$storage.setCookie(
                  'rememberToken',
                  response.data.access_token,
                  { expires: 14 }
                )
              } else {
                // Remove cookie if exist
                this.$auth.$storage.removeCookie('rememberExpires')
              }

              // Redirect to home page
              this.$router.push('/?lang=' + this.getLang.locale)
              // Show Login success message
              this.$toasted.success(
                this.$t('login.success_message.login_successfull')
              )
            }

            if (this.getCheckoutStatus === 'true') {
              this.$root.$emit('bv::hide::modal', 'loginModal', '#modal-3')
              // redirect to heatcheck
              this.$emit('isLoginLogin', 'true')
              this.$router.push('/heat-check/product?sku=' + this.getSku)
            } else {
              // Redirect to home page
              this.$router.push('/?lang=' + this.getLang.locale)
            }

            // Show Login success message
            this.$toasted.success(
              this.$t('login.success_message.login_successfull')
            )
          }
        } catch (error) {
          // If error or credentials  donot match
          if (error.response.status === 401) {
            this.processing = false
            // Show unauthorized message on error
            this.$toasted.error(this.$t('login.error_message.unauthorized'))
            return false
          }
        }
      }
    },
    // Email validation
    validEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
  },
}
</script>
