<template>
  <b-row class="form-wrapper">
    <b-col cols="12" sm="12" class="px-0">
      <!-- Gift Card Details Form -->
      <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
        <b-form class="gift-card-form" @submit.stop.prevent="handleSubmit(onSubmit)">
          <!-- Gift Card Number Field -->
          <b-row>
            <b-col cols="12" sm="12">
              <ValidationProvider
                v-slot="validationContext"
                :name="$t('shopping_cart.gift_card_number').toString()"
                :rules="{ required: true, min: 3, max: 128 }"
              >
                <b-form-group>
                  <b-form-input
                    v-model="giftCard.number"
                    :placeholder="$t('shopping_cart.enter_gift_card_number')"
                    :state="getValidationState(validationContext)"
                  />
                  <b-form-invalid-feedback class="body-18-normal text-red-3">{{
                      validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>
          <!-- End of Gift Card Number Field -->

          <!-- Gift Card Pin Field -->
          <b-row>
            <b-col cols="12" sm="12">
              <ValidationProvider
                v-slot="validationContext"
                :name="$t('shopping_cart.gift_card_pin').toString()"
                :rules="{ required: true, numeric: true, min: 4, max: 4 }"
              >
                <b-form-group>
                  <b-form-input
                    v-model="giftCard.pin"
                    :placeholder="$t('shopping_cart.enter_gift_card_pin')"
                    :state="getValidationState(validationContext)"
                  />
                  <b-form-invalid-feedback class="body-18-normal text-red-3">{{
                      validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                </b-form-group>

                <!-- Add Gift Card Button -->
                <b-row class="add-gift-card-wrapper">
                  <b-col cols="12" sm="12" class="text-center px-0">
                    <Button :disabled="! isFormFilled || ! getValidationState(validationContext)" type="submit" block variant="dark-blue" pill>{{
                        $t('shopping_cart.add_gift_card')}}
                    </Button>
                  </b-col>
                </b-row>
                <!-- End of Add Gift Card Button -->
              </ValidationProvider>
            </b-col>
          </b-row><!-- End of Gift Card Pin Field -->
          <!-- End of Gift Card Details Form -->
        </b-form>
      </ValidationObserver><!-- End of Card Details Form-->
    </b-col>
  </b-row>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import emitEventMixin from '~/plugins/mixins/emit-event'
import Button from '~/components/common/Button'
import { BAD_REQUEST, NOT_FOUND } from '~/static/constants'

export default {
  name: 'GiftCardDetailsForm',
  components: { ValidationObserver, ValidationProvider, Button },
  mixins: [ emitEventMixin ],
  data() {
    return {
      giftCard: {
        number: null,
        pin: null,
        amount: null,
        image: null,
      }
    }
  },
  computed: {
    isFormFilled(vm) {
      return !!(vm.giftCard.number && vm.giftCard.pin)
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
        this.$emit('gift-card-found', this.giftCard)
      }).catch(error => {
        if (error.response.status === NOT_FOUND || error.response.status === BAD_REQUEST) {
          this.$toasted.error(this.$t(error.response.data.message).toString())
        } else {
          this.$toasted.error(error)
        }
      })
    },
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.form-wrapper
  margin: 34px 18px 0

  .gift-card-form
    input
      border-radius: 0.5rem
      background: $color-white-5
      color: $black-1
      @include body-5-regular

      &::placeholder,
      &:-ms-input-placeholder,
      &::-ms-input-placeholder
        @include body-5-regular
        color: $color-gray-47

.add-gift-card-wrapper
  margin: 18px 0 34px

  .btn
    min-height: 40px

    &:disabled
      border: none
      background: $color-gray-1
      color: $color-gray-47
</style>
