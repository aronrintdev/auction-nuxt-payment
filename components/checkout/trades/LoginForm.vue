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
              :name="$t('shopping_cart.email')"
              :rules="{ required: true, email: true }"
            >
              <b-form-group label-for="email">
                <template #label>
                  {{ $t('shopping_cart.email') }}&ast;
                </template>
                <b-form-input
                  id="email"
                  v-model="auth.email"
                  type="email"
                  :placeholder="$t('shopping_cart.email')"
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
        <b-row class="mt-3">
          <b-col md="3" class="text-center">
            <NuxtLink to="#">
              <img :src="require('~/assets/img/shopping-cart/google-ellipse.png')" alt="..." @click="socialLogin('google')">
            </NuxtLink>
          </b-col>
          <b-col md="3" class="text-center">
            <NuxtLink to="#">
              <img :src="require('~/assets/img/shopping-cart/facebook-ellipse.png')" alt="..." @click="socialLogin('facebook')">
            </NuxtLink>
          </b-col>
          <b-col md="3" class="text-center">
            <NuxtLink to="#">
              <!-- TODO: Add social login once Apple is supported -->
              <img :src="require('~/assets/img/shopping-cart/apple-ellipse.png')" alt="...">
            </NuxtLink>
          </b-col>
          <b-col md="3" class="text-center">
            <NuxtLink to="#">
              <img :src="require('~/assets/img/shopping-cart/twitter-ellipse.png')" alt="..." @click="socialLogin('twitter')">
            </NuxtLink>
          </b-col>
        </b-row><!-- End of Social Login Links -->

        <!-- Login Button -->
        <b-row class="mt-5">
          <b-col md="6" offset-md="3" class="text-center">
            <slot name="action">
              <b-button
                pill
                :disabled="! auth.email || ! auth.password"
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
import { mapActions, mapGetters } from 'vuex'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import OrderTitle from '~/components/checkout/common/OrderTitle'
import emitEvent from '~/plugins/mixins/emit-event'

export default {
  name: 'LoginForm',
  components: {
    OrderTitle,
    ValidationObserver,
    ValidationProvider,
  },
  mixins: [ emitEvent ],
  data() {
    return {
      auth: {
        email: '',
        password: '',
        rememberMe: false,
        redirect_uri: null,
        redirect: {
          login: false
        },
      },
    }
  },
  computed: {
    ...mapGetters({
      auction: 'trade/getActiveTrade',
    }),
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
            this.$router.push('/trade/' + this.$store.state.trade.activeTrade.trade.id)
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
    socialLogin(service){
      this.$axios.get(`login/${service}`
      ).then((res) => {
          window.location.href = res.data
      })
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
