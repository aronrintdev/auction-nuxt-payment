<template>
  <b-col md="3">
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <!-- Order Title -->
      <OrderTitle
        back-link
        :title="$t('shopping_cart.forgot_password')"
        @click="emitRenderComponentEvent($parent.$options.components.OrderSummary.name)"
      /><!-- End of Order Title -->

      <b-form class="custom-form mt-4" @submit.stop.prevent="handleSubmit(onSubmit)">
        <!-- Email Field -->
        <b-row>
          <b-col md="12">
            <ValidationProvider
              v-slot="validationContext"
              :name="$t('shopping_cart.email')"
              :rules="{ required: true, email: true, min: 3, max: 128 }"
            >
              <b-form-group label-for="email">
                <template #label>
                  {{ $t('shopping_cart.email') }}&ast;
                </template>
                <b-form-input
                  id="email"
                  v-model="email"
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

        <!-- Login Button -->
        <b-row class="mt-5">
          <b-col md="6" offset-md="3" class="text-center">
            <slot name="action">
              <b-button
                pill
                :disabled="! email"
                type="submit"
                block
                size="lg"
                variant="confirm"
              >{{ $t('shopping_cart.send_link') }}</b-button
              >
            </slot>
          </b-col>
        </b-row><!-- End of Login Button -->
      </b-form>
    </ValidationObserver>
  </b-col>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import emitEvent from '~/plugins/mixins/emit-event'
import OrderTitle from '~/components/checkout/common/OrderTitle'

export default {
  name: 'ForgotPassword',
  components: { ValidationObserver, ValidationProvider, OrderTitle },
  mixins: [ emitEvent ],
  data() {
    return {
      email: ''
    }
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      // Returns the contextual state (validation style) of the element being validated (false for invalid, true for valid, or null for no validation state)
      return dirty || validated ? valid : null
    },
    onSubmit() {
      this.$toasted.success(this.$t('shopping_cart.password_reset_link', { email: this.email }).toString())
      this.emitRenderComponentEvent(this.$parent.$options.components.OrderSummary.name)
    }
  }
}
</script>
