<template>
  <b-row class="gift-card-wrapper">
    <b-col cols="12" sm="12" class="text-center">
      <!-- Gift Card Logo -->
      <b-row>
        <b-col cols="12" sm="12">
          <b-img :src="getGiftCardImage" width="250" height="158" />
        </b-col>
      </b-row>
      <!-- End of Gift Card Logo -->

      <!-- Gift Card Balance -->
      <b-row>
        <b-col cols="12" sm="12">
          <div class="text-balance mt-3">
            {{ $t('shopping_cart.gift_card_balance') }}&colon;&nbsp;{{ selectedGiftCard.amount | toCurrency }}
          </div>
        </b-col>
      </b-row>
      <!-- End of Gift Card Balance -->

      <!-- Gift Card Balance Options -->
      <b-row>
        <b-col cols="12" sm="12">
          <b-form-radio-group class="balance-options">
            <b-form-radio v-model="isPartialAmount" :value="false">
              <span class="body-5-regular">{{ $t('shopping_cart.pay_full_amount') }}</span>
            </b-form-radio>
            <b-form-radio v-model="isPartialAmount" :value="true">
              <span class="body-5-regular">{{ $t('shopping_cart.partial_payment') }}</span>
            </b-form-radio>
          </b-form-radio-group>
        </b-col>
      </b-row>
      <!-- End of Gift Card Balance Options -->

      <!-- Gift Card Balance Form -->
      <b-row v-if="isPartialAmount" class="balance-form-wrapper">
        <b-col cols="12" sm="12">
          <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
            <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
              <!-- Gift Card Balance Input -->
              <b-row>
                <b-col cols="12" sm="12">
                  <ValidationProvider
                    v-slot="validationContext"
                    :name="$t('shopping_cart.gift_card_balance').toString()"
                    :rules="{
                      required: true,
                      price: true,
                      min_value: 0,
                      max_value: $options.filters.formatPrice(selectedGiftCard.amount) }"
                  >
                    <b-input-group>
                      <b-form-input
                        v-model="partialAmount"
                        :placeholder="$t('shopping_cart.enter_amount')"
                        :state="getValidationState(validationContext)"
                      />
                      <b-button
                        v-if="! amountApplied"
                        type="button"
                        :disabled="! partialAmount || ! getValidationState(validationContext)"
                        variant="dark"
                        @click="handleAmountApplied"
                      >
                        {{ $t('shopping_cart.apply') }}
                      </b-button>
                      <b-button
                        v-else
                        type="button"
                        variant="dark"
                        @click="handleAmountRemoved"
                      >
                        {{ $t('shopping_cart.remove') }}
                      </b-button>
                      <b-form-invalid-feedback class="body-18-normal text-red-3 text-left">
                        {{ validationContext.errors[0] }}
                      </b-form-invalid-feedback>
                    </b-input-group>
                    <div v-if="amountApplied" class="body-18-normal text-green-29 mt-1 text-left">
                      {{ $t('shopping_cart.gift_card_amount_applied') }}
                    </div>
                  </ValidationProvider>
                </b-col>
              </b-row>
              <!-- Gift Card Balance Input -->
            </b-form>
          </ValidationObserver>
        </b-col>
      </b-row>
      <!-- End of Gift Card Balance Form -->

      <!-- Continue Button -->
      <b-row class="continue-btn-wrapper">
        <b-col cols="12" sm="12" class="text-center px-0">
          <Button :disabled="isButtonDisabled" type="button" variant="dark-blue" pill @click="onSubmit">
            {{ $t('shopping_cart.continue') }}
          </Button>
        </b-col>
      </b-row>
      <!-- End of Continue Button -->
    </b-col>
  </b-row>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Button from '~/components/common/Button'

export default {
  name: 'GiftCardAmountForm',
  components: { ValidationObserver, ValidationProvider, Button },
  props: {
    selectedGiftCard: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isPartialAmount: null,
      partialAmount: null,
      giftCard: {
        number: null,
        amount: null,
        pin: null,
        image: null,
      },
      amountApplied: false,
    }
  },
  computed: {
    // TODO - NP: To become dynamic once settled with the image names and location.
    getGiftCardImage() {
      return require('~/assets/img/preferences/giftcard/GiftCard_1.png')
    },
    isButtonDisabled(vm) {
      if (typeof vm.isPartialAmount !== 'boolean') {
        return true
      }

      return !!(vm.isPartialAmount && !vm.amountApplied);


    },
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      // Returns the contextual state (validation style) of the element being validated (false for invalid, true for valid, or null for no validation state)
      return dirty || validated ? valid : null
    },
    handleAmountApplied() {
      this.amountApplied = true
    },
    handleAmountRemoved() {
      this.amountApplied = false
      this.partialAmount = null
    },
    onSubmit() {
      this.giftCard.number = this.selectedGiftCard.number
      this.giftCard.pin = this.selectedGiftCard.pin
      this.giftCard.image = this.selectedGiftCard.image

      if (this.isPartialAmount) {
        this.giftCard.amount = this.partialAmount * 100
        this.giftCard.remainingAmount = this.selectedGiftCard.amount - this.partialAmount * 100
      } else {
        this.giftCard.amount = this.selectedGiftCard.amount
        this.giftCard.remainingAmount = 0
      }

      this.$emit('gift-card-applied', this.giftCard)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.gift-card-wrapper
  margin-top: 34px

.text-balance
  @include body-17-normal
  color: $black-1

.balance-options
  margin-top: 32px

.balance-form-wrapper
  margin: 34px 60px 0

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

.continue-btn-wrapper
  margin: 34px 0 34px

  .btn
    min-height: 40px
    min-width: 216px

    &:disabled
      border: none
      background: $color-gray-1
      color: $color-gray-47
</style>
