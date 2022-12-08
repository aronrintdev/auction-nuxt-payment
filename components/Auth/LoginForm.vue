<template>
  <b-row>
    <b-col md="12">
      <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
        <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
          <ValidationProvider
            v-slot="validationContext"
            :name="$t('auth.login')"
            :rules="{ required: true, min: 3, max: 128 }"
          >
            <b-form-group class="px-md-1 pr-md-3">
              <b-form-input
                id="login"
                v-model="form.login"
                class="rounded-pill input-login input-username"
                :placeholder="$t('auth.email_address_or_username')"
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
              <b-input-group class="px-md-1 pr-md-3">
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

          <b-row
            class="mt-5 login-btn mx-0 row w-100 d-flex justify-content-center"
          >
            <b-col
              md="4"
              class="d-flex justify-content-center px-0 text-center w-100"
            >
              <Button
                :disabled="!isFormFilled"
                block
                pill
                variant="confirm"
                type="submit"
                :class="{ 'btn-disabled': !isFormFilled }"
              >
                <span>{{ $t('auth.login') }}</span>
              </Button>
            </b-col>
          </b-row>
        </b-form>
      </ValidationObserver>
    </b-col>
  </b-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import Button from '~/components/common/Button'
import { NO_CONTENT } from '~/static/constants'

export default {
  name: 'LoginForm',
  components: { ValidationProvider, ValidationObserver, Button },
  data() {
    return {
      isPasswordShown: false,
      form: {
        login: '',
        password: '',
        rememberMe: false,
        verification_code: '',
      },
    }
  },
  computed: {
    ...mapGetters({
      isVendor: 'auth/isVendor',
    }),
    passwordFieldType(vm) {
      return vm.isPasswordShown ? 'text' : 'password'
    },
    isFormFilled(vm) {
      return !!(vm.form.login && vm.form.password)
    },
  },
  methods: {
    ...mapActions({
      getUserDetails: 'auth/getUserDetails',
      getUserRedeemedReward: 'redeemed-reward/getUserRedeemedReward',
    }),
    ...mapGetters({
      getLoginRedirectUrl: 'auth/getLoginRedirectUrl',
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
          if (response.status === NO_CONTENT) {
            this.$emit('verify', this.form)
          } else {
            this.$auth.strategy.token.set(response.data.access_token)
            this.getUserDetails(this.$store.state.auth.user.id)
            this.getUserRedeemedReward()
            this.$auth.$storage.removeCookie('rememberExpires')
            this.$store.dispatch('notifications/getNotifications')
            this.$store.dispatch('notifications/getUnreadCount')
            this.$toasted.success(
              this.$t('login.success_message.login_successfull').toString()
            )

            // redirect if redirect url is set in state
            const redirectUrl = this.getLoginRedirectUrl()
            if (redirectUrl) {
              if (redirectUrl.includes('trades') && !this.isVendor) {
                this.$router.push({
                  path: '/profile/vendor-hub/apply',
                })
              } else {
                this.$store.commit('auth/setLoginRedirectUrl', null)
                this.$router.push(redirectUrl)
              }
            } else if (this.isVendor) {
              this.$router.push({
                path: '/profile/vendor-dashboard',
              })
            } else {
              this.$router.push({
                path: '/profile/buyer-dashboard',
              })
            }
          }
        })
        .catch((error) => {
          this.$toasted.error(this.$t(error.response.data.message).toString())
        })
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

/* Override bootstrap-vue 'b-form-input' styles */
.input-login
  @include body-5-normal
  color: $black-1
  background-color: $color-white-1
  border: 1px solid $color-gray-3
  border-radius: 10px !important
  padding: 19px 15px !important
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
  &:focus
    background-color: $color-white-5
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
  background: $color-white-1
  border: 1px solid $color-gray-3
  border-radius: 10px !important
  border-left: transparent
  border-bottom-right-radius: 10px !important
  border-top-right-radius: 10px !important
  border-bottom-left-radius: 0px !important
  border-top-left-radius: 0px !important

::v-deep .btn
  &.btn-confirm
    &.btn-disabled
      background: $color-blue-20
      opacity: 1
      cursor: not-allowed
      &:hover
        box-shadow: none

@media (min-width: 992px)

  .input-login
    background-color: $color-white-5
    border: 1px solid $color-white-5
    color: $color-black-1

    &.input-username
      border-radius: 20px !important

    &.input-append
      border-radius: 20px  0 0 20px !important

  .append-icon
    background-color: $color-white-5
    border: 1px solid $color-white-5
    border-radius: 0 20px 20px 0 !important


@media (max-width: 768px)
  .input-append
    border-right: none

  .btn.btn-confirm.btn-disabled
    background: $color-black-1
  .login-btn
    button
      width: 171px !important
      height: 42px !important
      font-weight: $normal
</style>
