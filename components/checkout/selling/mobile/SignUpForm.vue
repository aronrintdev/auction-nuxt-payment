<template>
  <b-row>
    <b-col cols="12" sm="12">
      <!-- Top Title -->
      <ShoppingBagTitle
        :title="$t('shopping_cart.create_an_account')"
        text-center
      />
      <!-- End of Top Title -->

      <b-row class="signup-form-wrapper">
        <b-col cols="12" sm="12" class="px-0">
          <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
            <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
              <!-- First Name Field -->
              <b-row>
                <b-col cols="12" sm="12">
                  <ValidationProvider
                    v-slot="validationContext"
                    :name="$t('shopping_cart.first_name')"
                    :rules="{ required: true, alphaNum: true, min: 3, max: 128 }"
                  >
                    <b-form-group>
                      <b-form-input
                        v-model="form.first_name"
                        :placeholder="$t('shopping_cart.first_name')"
                        :state="getValidationState(validationContext)"
                      ></b-form-input>
                      <b-form-invalid-feedback class="body-18-normal text-red-3">{{
                          validationContext.errors[0]
                        }}</b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>
                </b-col>
              </b-row>
              <!-- End of First Name Field -->

              <!-- Last Name Field -->
              <b-row>
                <b-col cols="12" sm="12">
                  <ValidationProvider
                    v-slot="validationContext"
                    :name="$t('shopping_cart.last_name')"
                    :rules="{ required: true, alphaNum: true, min: 3, max: 128 }"
                  >
                    <b-form-group>
                      <b-form-input
                        v-model="form.last_name"
                        :placeholder="$t('shopping_cart.last_name')"
                        :state="getValidationState(validationContext)"
                      ></b-form-input>
                      <b-form-invalid-feedback class="body-18-normal text-red-3">{{
                          validationContext.errors[0]
                        }}</b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>
                </b-col>
              </b-row>
              <!-- End of Last Name Field -->

              <!-- Username Field -->
              <b-row>
                <b-col md="12">
                  <ValidationProvider
                    v-slot="validationContext"
                    :name="$t('shopping_cart.username')"
                    :rules="{ required: true, alphaNum: true, min: 3, max: 128 }"
                  >
                    <b-form-group label-for="username">
                      <b-form-input
                        v-model="form.username"
                        :placeholder="$t('auth.username')"
                        :state="getValidationState(validationContext)"
                      ></b-form-input>
                      <b-form-invalid-feedback class="body-18-normal text-red-3">{{
                          validationContext.errors[0]
                        }}</b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>
                </b-col>
              </b-row>
              <!-- End of Username Field -->

              <!-- Email Field -->
              <b-row>
                <b-col md="12">
                  <ValidationProvider
                    v-slot="validationContext"
                    :name="$t('auth.email_address')"
                    :rules="{ required: true, validEmail:true, email: true, min: 3, max: 128 }"
                  >
                    <b-form-group label-for="email">
                      <b-form-input
                        v-model="form.email"
                        type="email"
                        :placeholder="$t('auth.email_address')"
                        :state="getValidationState(validationContext)"
                      ></b-form-input>
                      <b-form-invalid-feedback class="body-18-normal text-red-3">{{
                          validationContext.errors[0]
                        }}</b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>
                </b-col>
              </b-row>
              <!-- End of Email Field -->

              <!-- Password Field -->
              <b-row>
                <b-col cols="12" sm="12">
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
                    <b-form-group>
                      <b-input-group class="d-flex align-items-center">
                        <b-form-input
                          id="password"
                          v-model="form.password"
                          class="input-prepend"
                          :placeholder="$t('auth.password')"
                          :state="getValidationState(validationContext)"
                          :type="passwordFieldType"
                        />
                        <b-input-group-prepend class="prepend-icon">
                          <i
                            v-if="isPasswordShown"
                            class="fa fa-eye text-gray-47"
                            aria-hidden="true"
                            role="button"
                            @click="isPasswordShown = !isPasswordShown"
                          />
                          <i
                            v-else
                            class="fa fa-eye-slash text-gray-47"
                            aria-hidden="true"
                            role="button"
                            @click="isPasswordShown = !isPasswordShown"
                          />
                        </b-input-group-prepend>
                        <b-form-invalid-feedback class="body-18-normal text-red-3">
                          {{ validationContext.errors[0]  }}
                        </b-form-invalid-feedback>
                      </b-input-group>
                    </b-form-group>
                  </ValidationProvider>
                </b-col>
              </b-row>
              <!-- End of Password Field -->

              <!-- Password Confirmation Field -->
              <b-row>
                <b-col cols="12" sm="12">
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
                    <b-form-group>
                      <b-input-group  class="d-flex align-items-center">
                        <b-form-input
                          id="password-confirmation"
                          v-model="form.password_confirmation"
                          class="input-prepend"
                          :placeholder="$t('auth.confirm_password')"
                          :state="getValidationState(validationContext)"
                          :type="confirmPasswordFieldType"
                        />
                        <b-input-group-prepend class="prepend-icon">
                          <i
                            v-if="isConfirmPasswordShown"
                            class="fa fa-eye text-gray-47"
                            aria-hidden="true"
                            role="button"
                            @click="isConfirmPasswordShown = !isConfirmPasswordShown"
                          />
                          <i
                            v-else
                            class="fa fa-eye-slash text-gray-47"
                            aria-hidden="true"
                            role="button"
                            @click="isConfirmPasswordShown = !isConfirmPasswordShown"
                          />
                        </b-input-group-prepend>
                        <b-form-invalid-feedback class="body-18-normal text-red-3">
                          {{ validationContext.errors[0]  }}
                        </b-form-invalid-feedback>
                      </b-input-group>
                      <div
                        v-if="getValidationState(validationContext) || getValidationState(validationContext) === null"
                        class="body-18-normal text-color-gray-47 mt-2"
                      >
                        {{ $t('auth.password_validation_rule') }}
                      </div>
                    </b-form-group>
                    <!-- End of Password Confirmation Field -->

                    <!-- Confirm Button -->
                    <b-row class="proceed-btn-wrapper">
                      <b-col cols="12" sm="12" class="text-center">
                        <Button
                          :disabled="!isFormFilled"
                          type="submit"
                          variant="dark-blue"
                          pill
                        >
                          {{ $t('shopping_cart.proceed') }}
                        </Button>
                      </b-col>
                    </b-row>
                    <!-- End of Confirm Button -->
                  </ValidationProvider>
                </b-col>
              </b-row>
            </b-form>
          </ValidationObserver>
        </b-col>
      </b-row>

    </b-col>
  </b-row>
</template>

<script>
import { mapActions } from 'vuex'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import ShoppingBagTitle from '~/components/checkout/common/mobile/ShoppingBagTitle'
import Button from '~/components/common/Button'
import { UNPROCESSABLE_ENTITY} from '~/static/constants'

export default {
  name: 'SignUpForm',
  components: { ShoppingBagTitle, ValidationObserver, ValidationProvider, Button },
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
    } catch (error) {
      this.$toasted.error(error)
    }
  },
  beforeDestroy() {
    this.$recaptcha.destroy()
  },
  methods: {
    ...mapActions({
      getUserDetails: 'auth/getUserDetails',
    }),
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
          this.$parent.$parent.close()
          this.$router.push('/login')
        }).catch((error) => {
          if (error.response.status === UNPROCESSABLE_ENTITY){
            if (error.response.data.errors.email) {
              this.$toasted.error(this.$t('auth.error.the_email_has_already_been_taken').toString())
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
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.signup-form-wrapper
  margin: 28px 0 0
  padding: 20px 16px 0
  border-top: 1px solid $color-gray-47

  input
    border: 1px solid $white-5
    border-radius: 10px
    background: $white
    @include body-8-normal

    &::placeholder,
    &:-ms-input-placeholder,
    &::-ms-input-placeholder
      @include body-8-medium
      color: $color-gray-47

    &:active, &:focus
      border: 1px solid $white-5

    &.is-invalid
      border: 1px solid $color-red-3

      &:active, &:focus
        border: 1px solid $color-red-3

/* Override bootstrap-vue 'b-form-input' styles for prepending icons */
.input-prepend
  border-right: none !important

  &.is-invalid,
  &.is-invalid:active,
  &.is-invalid:focus
    background-image: none
    border: $color-red-3 1px solid !important
    border-right: none !important
    + .prepend-icon
      border: $color-red-3 1px solid !important
      border-left: none !important

.prepend-icon
  background: $white
  border-bottom-right-radius: 10px !important
  border-top-right-radius: 10px !important
  border: 1px solid $white-5
  border-left: none
  padding: 10px

.proceed-btn-wrapper
  margin: 20px 0 30px

  .btn
    @include body-13-medium
    width: 216px
    height: 40px

    &:disabled
      border: none
      background: $color-gray-1
      color: $color-gray-47
</style>
