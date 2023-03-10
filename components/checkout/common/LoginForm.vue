<template>
  <b-col md="3">
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <!-- Order Title -->
      <OrderTitle
        back-link
        :title="$t('shopping_cart.welcome_back')"
        @click="emitRenderComponentEvent($parent.$options.components.OrderSummary.name)"
      /><!-- End of Order Title -->

      <b-form class="custom-form mt-4" @submit.stop.prevent="handleSubmit(onSubmit)">
        <!-- Email Field -->
        <b-row>
          <b-col md="12">
            <ValidationProvider
              v-slot="validationContext"
              :name="$t('shopping_cart.login')"
              :rules="{ required: true, max: 128 }"
            >
              <b-form-group label-for="login">
                <template #label>
                  {{ $t('shopping_cart.email_or_username') }}&ast;
                </template>
                <b-form-input
                  id="login"
                  v-model="auth.login"
                  type="text"
                  :placeholder="$t('shopping_cart.email_or_username')"
                  :state="getValidationState(validationContext)"
                ></b-form-input>
                <b-form-invalid-feedback>{{
                    validationContext.errors[0]
                  }}</b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
          </b-col> </b-row
        ><!-- End of Email Field -->

        <!-- Password Field -->
        <b-row v-if="! authenticated">
          <b-col md="12">
            <ValidationProvider
              v-slot="validationContext"
              :name="$t('shopping_cart.password')"
              :rules="{ required: true }"
            >
              <b-form-group label-for="password">
                <template #label
                >{{
                    $t('shopping_cart.password')
                  }}&ast;</template
                >
                <b-form-input
                  id="password"
                  v-model="auth.password"
                  type="password"
                  :placeholder="$t('shopping_cart.password')"
                  :state="getValidationState(validationContext)"
                ></b-form-input>
                <b-form-invalid-feedback>{{
                    validationContext.errors[0]
                  }}</b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
          </b-col> </b-row
        ><!-- End of Password Field -->

        <!-- Social Login Links -->
        <b-row class="mt-2">
          <b-col md="12" class="text-center">
            <span class="text-color-gray-38">{{ $t('shopping_cart.login_via_social') }}</span>
          </b-col>
        </b-row>
        <SocialLoginButtons class="mt-4" /><!-- End of Social Login Links -->

        <!-- Login Button -->
        <b-row class="mt-5">
          <b-col md="6" offset-md="3" class="text-center">
            <slot name="action">
              <b-button
                pill
                :disabled="! auth.login || ! auth.password"
                type="submit"
                block
                size="lg"
                variant="confirm"
              >{{ $t('shopping_cart.login') }}</b-button
              >
            </slot>
          </b-col>
        </b-row><!-- End of Login Button -->

        <!-- Forgot Password Link -->
        <b-row class="mt-4">
          <b-col md="6" offset-md="3" class="text-center">
        <span>
          <NuxtLink
            class="text-decoration-underline text-color-gray-38"
            to="#"
          >
            <span @click="handleForgotPassword">{{ $t('shopping_cart.forgot_password') }}&quest;</span>
          </NuxtLink>
        </span>
          </b-col>
        </b-row><!-- End of Forgot Password Link -->
      </b-form>
    </ValidationObserver>
  </b-col>
</template>

<script>
import { mapActions } from 'vuex'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import OrderTitle from '~/components/checkout/common/OrderTitle'
import emitEvent from '~/plugins/mixins/emit-event'
import SocialLoginButtons from '~/components/Auth/SocialLoginButtons'

export default {
  name: 'LoginForm',
  components: {
    SocialLoginButtons,
    OrderTitle,
    ValidationObserver,
    ValidationProvider,
  },
  mixins: [ emitEvent ],
  data() {
    return {
      auth: {
        login: '',
        password: '',
        rememberMe: false,
        verification_code: '',
        redirect_uri: null,
        redirect: {
          login: false
        },
      },
    }
  },
  methods: {
    ...mapActions({
      getUserDetails: 'auth/getUserDetails'
    }),
    getValidationState({ dirty, validated, valid = null }) {
      // Returns the contextual state (validation style) of the element being validated (false for invalid, true for valid, or null for no validation state)
      return dirty || validated ? valid : null
    },
    onSubmit() {
      try {
        this.$auth.login({
          data: this.auth,
          redirect_uri: null,
          redirect: {
            login: false
          },
        }).then((response) => {
          // universally set access token and retrieve the user's details.
          this.$auth.strategy.token.set(response.data.access_token)
          this.getUserDetails(this.$store.state.auth.user.id
          ).then(() => {
            this.$toasted.success(this.$t('login.success_message.login_successfull').toString())
            this.emitRenderComponentEvent(this.$parent.$options.components.OrderSummary.name)
          })
        })
      } catch (error) {
        // If error or credentials don't match
        if (error.response.status === 401) {
          this.$toasted.error(this.$t('login.error_message.unauthorized').toString())

          return false;
        }
      }
    },
    handleForgotPassword() {
      this.emitRenderComponentEvent(this.$parent.$options.components.ForgotPassword.name)
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.text-color-gray-38
  color: $color-gray-38
  @include body-5-normal
</style>
