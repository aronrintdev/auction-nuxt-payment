<template>
  <b-row>
    <b-col md="12">
      <!-- Gift Card Amount Title -->
      <b-row>
        <b-col md="12">
          <span class="body-5-normal text-gray-24">{{ $t('shopping_cart.select_amount') }}</span>
        </b-col>
      </b-row><!-- End of Gift Card Amount Title -->

      <!-- Gift Card Details Form -->
      <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
        <b-form class="custom-form" @submit.stop.prevent="handleSubmit(onSubmit)">
          <b-row class="mt-2">
            <b-col md="12">
              <b-card class="custom-card">
                <!-- Gift Card Amount Input Label -->
                <b-row>
                  <b-col md="12">
                    <label for="gift-card-amount">{{ $t('shopping_cart.remaining_amount') }}&colon;&nbsp;&dollar;{{ appliedGiftCard.amount | formatPrice }}</label>
                  </b-col>
                </b-row><!-- End of Gift Card Amount Input Label -->

                <!-- Gift Card Amount Radio Option -->
                <b-row>
                  <b-col>
                    <b-form-radio-group
                      stacked
                    >
                      <b-form-radio v-model="partialAmount" class="mt-3" :value="false"><span class="body-5-normal">{{ $t('shopping_cart.pay_full_amount') }}</span></b-form-radio>
                      <b-form-radio v-model="partialAmount" class="mt-3" :value="true"><span class="body-5-normal">{{ $t('shopping_cart.partial_payment') }}</span></b-form-radio>
                    </b-form-radio-group>
                  </b-col>
                </b-row><!-- End of Gift Card Amount Radio Option -->

                <!-- Gift Card Amount Field -->
                <b-row v-if="partialAmount" class="mt-4">
                  <b-col md="12">
                    <ValidationProvider
                      v-slot="validationContext"
                      :name="$t('shopping_cart.amount_to_apply')"
                      :rules="{ required: true, price: true, min_value: 0, max_value: $options.filters.formatPrice(appliedGiftCard.amount) }"
                    >
                      <b-form-group
                        class="payment-details"
                      >
                        <b-form-input
                          id="gift-card-amount"
                          v-model="inputGiftCardAmount"
                          :placeholder="$t('shopping_cart.amount_to_apply')"
                          :state="getValidationState(validationContext)"
                        />
                        <b-form-invalid-feedback>{{
                            validationContext.errors[0]
                          }}</b-form-invalid-feedback>
                      </b-form-group>
                    </ValidationProvider>
                  </b-col>
                </b-row><!-- End of Gift Card Amount Field -->
              </b-card>
            </b-col>
          </b-row>

          <!-- Continue Button -->
          <b-row class="mt-3">
            <b-col md="12" class="text-center">
              <b-button
                pill
                type="submit"
                class="px-5"
                variant="confirm"
              >{{ $t('shopping_cart.continue') }}</b-button
              >
            </b-col>
          </b-row><!-- End of Continue Button -->
        </b-form>
      </ValidationObserver><!-- End of Card Details Form-->
    </b-col>
  </b-row>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  name: 'SelectGiftCardAmountForm',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  props: {
    appliedGiftCard: {
      type: Object,
      required: true,
      validator(value) {
        return value.number !== undefined && value.amount !== undefined
      },
      default() {}
    }
  },
  data() {
    return {
      partialAmount: false,
      inputGiftCardAmount: null,
      giftCard: {
        number: null,
        amount: null,
        pin: null,
        image: null,
      }
    }
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      // Returns the contextual state (validation style) of the element being validated (false for invalid, true for valid, or null for no validation state)
      return dirty || validated ? valid : null
    },
    onSubmit() {
      this.giftCard.number = this.appliedGiftCard.number
      this.giftCard.pin = this.appliedGiftCard.pin
      this.giftCard.image = this.appliedGiftCard.image

      if (this.partialAmount) {
        this.giftCard.amount = this.inputGiftCardAmount * 100
      } else {
        this.giftCard.amount = this.appliedGiftCard.amount
      }

      this.$emit('gift-card-selected', this.giftCard)
    }
  }
}
</script>
