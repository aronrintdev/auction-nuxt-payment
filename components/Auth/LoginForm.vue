<template>
  <b-row>
    <b-col md="12">
      <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
        <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
          <ValidationProvider
            v-slot="validationContext"
            :name="$t('auth.email_address')"
            :rules="{ required: true, min: 3, max: 128 }"
          >
            <b-form-group>
              <b-form-input
                id="email-address"
                v-model="form.login"
                class="rounded-pill input-login"
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
              >
                <span>{{ $t('auth.login') }}</span>
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
          if (response.status === NO_CONTENT) {
            this.$emit('verify', this.form)
          } else {
            this.$auth.strategy.token.set(response.data.access_token)
            this.getUserDetails(this.$store.state.auth.user.id)
            this.getUserRedeemedReward()
            this.$auth.$storage.removeCookie('rememberExpires')
            this.$toasted.success(this.$t('login.success_message.login_successfull').toString())
            this.$router.push('/?lang=' + this.getLang.locale)
          }
        })
        .catch((error) => {
          this.$toasted.error(this.$t(error.response.data.message).toString())
        })
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
