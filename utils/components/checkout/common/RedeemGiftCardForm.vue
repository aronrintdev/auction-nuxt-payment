<template>
  <b-row>
    <b-col md="12">
      <!-- Gift Card Redeem Title -->
      <b-row>
        <b-col md="12">
          <span class="body-5-normal text-gray-24">{{ $t('shopping_cart.redeem_gift_card') }}</span>
        </b-col>
      </b-row><!-- End of Gift Card Redeem Title -->

      <!-- Gift Card Details Form -->
      <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
        <b-form class="custom-form" @submit.stop.prevent="handleSubmit(onSubmit)">
          <b-row class="mt-2">
            <b-col md="12">
              <b-card class="custom-card">
                <!-- Gift Card Number Input Label -->
                <b-row>
                  <b-col md="12">
                    <label for="gift-card-number">{{ $t('shopping_cart.enter_gift_card_details') }}</label>
                  </b-col>
                </b-row><!-- End of Gift Card Number Input Label -->

                <!-- Gift Card Number Field -->
                <b-row class="mt-2">
                  <b-col md="12">
                    <ValidationProvider
                      v-slot="validationContext"
                      :name="$t('shopping_cart.gift_card_number')"
                      :rules="{ required: true, min: 3, max: 128 }"
                    >
                      <b-form-group
                        class="payment-details"
                      >
                        <b-form-input
                          id="gift-card-number"
                          v-model="giftCard.number"
                          :placeholder="$t('shopping_cart.gift_card_number')"
                          :state="getValidationState(validationContext)"
                        />
                        <b-form-invalid-feedback>{{
                            validationContext.errors[0]
                          }}</b-form-invalid-feedback>
                      </b-form-group>
                    </ValidationProvider>
                  </b-col>
                </b-row><!-- End of Gift Card Number Field -->

                <!-- Gift Card Pin Field -->
                <b-row class="mt-2">
                  <b-col md="12">
                    <ValidationProvider
                      v-slot="validationContext"
                      :name="$t('shopping_cart.gift_card_pin')"
                      :rules="{ required: true, numeric: true, min: 4, max: 4 }"
                    >
                      <b-form-group
                        class="payment-details"
                      >
                        <b-form-input
                          id="gift-card-pin"
                          v-model="giftCard.pin"
                          :placeholder="$t('shopping_cart.gift_card_pin')"
                          :state="getValidationState(validationContext)"
                        />
                        <b-form-invalid-feedback>{{
                            validationContext.errors[0]
                          }}</b-form-invalid-feedback>
                      </b-form-group>
                    </ValidationProvider>
                  </b-col>
                </b-row><!-- End of Gift Card Pin Field -->
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
import emitEvent from '~/plugins/mixins/emit-event'
import { NOT_FOUND } from '~/static/constants'

export default {
  name: 'RedeemGiftCardForm',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  mixins: [ emitEvent ],
  data() {
    return {
      giftCardOption: {
        name: 'payment-option',
        value: 'PaymentGiftCard',
        checked: 'PaymentGiftCard',
        imageUrls: 'deadstock-logo.png',
        text: this.$t('shopping_cart.gift_card')
      },
      giftCard: {
        number: null,
        pin: null,
        amount: null,
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
      this.$axios.post('gift-cards/details', {
        gift_card_number: this.giftCard.number,
        gift_card_pin: this.giftCard.pin,
      }, { handleError: false }).then(response => {
        this.giftCard.amount = response.data.data.remaining_amount
        this.giftCard.pin = response.data.data.pin
        this.giftCard.image = response.data.data.image
        this.$emit('gift-card-applied', this.giftCard)
      }).catch(error => {
        if (error.response.status === NOT_FOUND) {
          this.$toasted.error(this.$t(error.response.data.message).toString())
        } else {
          this.$toasted.error(error)
        }
      })
    },
  }
}
</script>
