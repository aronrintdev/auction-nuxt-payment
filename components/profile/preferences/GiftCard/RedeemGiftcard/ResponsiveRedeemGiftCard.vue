<template>
  <div v-if="isScreenXS" class="gift-card-component-wrapper">
    <client-only>
      <Portal to="page-title"> {{ $t('purchases.gift_cards') }}</Portal>
      <!-- If back icons needed -->
      <Portal to="back-icon-slot"> 
        <img
          :src="require('~/assets/img/icons/back.svg')"
          alt="back-arrow"
          class="float-left"
          @click="backTo"
        />
      </Portal>
    </client-only>

    <b-card class="mt-3">
      <!-- card heading -->
      <div class="card-text border-underline">
        <span class="gift-card-heading">
          <span class="d-flex">
            {{ $t('preferences.payments.redeem_a_gift_card') }}
          </span>
        </span>
        <p class="gift-card-sub-heading mt-2 d-flex">
          {{ $t('preferences.payments.enter_card_info') }}
        </p>
      </div>
      <!-- card heading -->

      <ValidationObserver ref="observer">
        <form>
          <b-row class="pt-3 add-edit-card-form">
            <!-- Gift card number -->
            <b-col md="12" sm="12">
              <ValidationProvider
                rules="required"
                :name="$t('preferences.payments.gift_card_number')"
              >
                <b-form-group
                  slot-scope="{ valid, errors }"
                  label-for="gift-cards"
                  class="add-cards-label text-left text-dark w-100 d-flex"
                >
                  <label for="gift-cards">{{
                    $t('preferences.payments.gift_card_number')
                  }}</label>
                  <b-form-input
                    id="gift-cards"
                    v-model="giftCardNumber"
                    :state="errors[0] ? false : valid ? true : null"
                    class="d-flex"
                    type="text"
                    :class="
                      giftCardNotValid
                        ? 'valid-card-error-form'
                        : 'gift-cards-input'
                    "
                  >
                  </b-form-input>
                  <b-form-invalid-feedback
                    id="inputLiveFeedback"
                    class="d-block"
                  >
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <!-- ./Giftcard number -->
            <!-- Pin -->
            <b-col md="5" class="col-xs-6">
              <ValidationProvider
                rules="required|numeric|max:4"
                :name="$t('common.pin')"
              >
                <b-form-group
                  slot-scope="{ valid, errors }"
                  label-for="gift-cards"
                  class="add-cards-label text-left text-dark"
                >
                  <label for="gift-cards">{{ $tc('common.pin', 2) }}</label>
                  <b-form-input
                    id="gift-cards"
                    v-model="pin"
                    :state="errors[0] ? false : valid ? true : null"
                    class="d-flex"
                    type="text"
                    :class="
                      giftCardNotValid
                        ? 'valid-card-error-form'
                        : 'gift-cards-input'
                    "
                  >
                  </b-form-input>
                  <b-form-invalid-feedback
                    id="inputLiveFeedback"
                    class="d-block"
                  >
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <!-- Pin -->
          </b-row>
        </form>
      </ValidationObserver>
    </b-card>
    <p
      v-if="giftCardNotValid"
      class="valid-card-error d-flex text-align-center"
    >
      {{ $tc('preferences.payments.enter_valid_giftcard_number', 2) }}
    </p>

    <!-- button -->
    <div class="d-flex justify-content-center align_items-center w-100">
      <b-button
        variant="redeem-cards-button w-100"
        class="
          redeem-buttons
          align-items-center
          text-align-center
          d-flex
          position-fixed
          justify-content-center
          mt-2
        "
        :class="
          formValidated
            ? 'redeem-cards-button-active'
            : 'redeem-cards-button-non-active disabled'
        "
        @click="onGiftCardRedeem"
      >
        <span :class="formValidated ? 'btn-txt-active' : 'btn-txt'">
          {{ $t('preferences.payments.redeem_gift_card') }}</span
        >
      </b-button>
    </div>
    <!-- button -->
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import screenSize from '~/plugins/mixins/screenSize'
import emitEvent from '~/plugins/mixins/emit-event'

export default {
  name: 'ResponsiveRedeemGiftCard',

  components: {
    ValidationObserver,
    ValidationProvider,
  },

  mixins: [screenSize, emitEvent],
  layout: 'Profile',

  middleware: 'auth',

  data() {
    return {
      giftCardNumber: '',
      pin: '',
      errorMessage: '',
      giftCardData: {},
      giftCardNotValid: false,
    }
  },

  computed: {
    formValidated() {
      return this.giftCardNumber && this.pin
    },
  },

  created() {
    this.giftCardRedeemStatus({
      cardRedeemStatus: false,
      giftCardSuccessAlert: false,
    })
  },

  methods: {
    ...mapActions({
      giftCardRedeemStatus: 'preferences/giftCardRedeemStatus',
      saveRedeemedResponse: 'preferences/saveRedeemedResponse',
      giftCardSuccessAlert: 'preferences/giftCardSuccessAlert',
    }),

    // When the gift card redeemed form submit
    onGiftCardRedeem() {
      // On validation success.
      this.$refs.observer.validate().then((success) => {
        if (success) {
          this.errorMessage = ''
          this.$axios
            .get('/preferences/payments/validate-giftcard', {
              params: { giftcardNumber: this.giftCardNumber, pin: this.pin },
            })
            .then((res) => {
              this.giftCardData = res.data.data
              this.saveRedeemedResponse({ response: res.data.data })
              // After success redirect to previous page and show variable for success alert true
              this.giftCardRedeemStatus({
                cardRedeemStatus: true,
                giftCardSuccessAlert: true,
              })
              this.giftCardSuccessAlert({
                giftCardSuccessAlert: true,
              })
              this.backTo()
            })
            .catch((err) => {
              this.errorMessage = this.$t(err.response.data.message)
              this.giftCardNotValid = true
              this.$logger.logToServer('Giftcard redeem error:', err.response)
            })
        }
      })
    },
    // back to previous page
    backTo() {
      this.$store.dispatch('preferences/changeHeaderVisibility', false)
      this.emitRenderComponentEvent(
        this.$parent.$options.components.GiftCardMethod.name
      )
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.gift-card-component-wrapper

  .gift-card-heading
    font-family: $font-sp-pro
    font-style: normal
    @include body-4-medium
    color: $color-blue-20

  .gift-card-sub-heading
    font-family: $font-sp-pro
    font-style: normal
    @include body-21-regular
    color: $color-black-17
  .btn-redeem-cards-button
    border-radius: 20px
    width: 340px

  .redeem-cards-button-active
    background: $color-blue-20

  .redeem-cards-button-non-active
    background: $color-gray-21

  .btn-txt
    font-family: $font-sp-pro
    font-style: normal
    @include body-34-medium
    color: $color-gray-47

  .btn-txt-active
    font-family: $font-sp-pro
    font-style: normal
    @include body-34-medium
    color: $color-white-1

  .add-cards-label
    font-family: $font-montserrat
    font-style: normal
    @include body-6-medium
    color: $color-black-17

  .valid-card-error
    width: 186px
    height: 12px
    left: 22px
    top: 377px
    font-family: $font-montserrat
    font-style: normal
    @include body-18-medium
    color: $color-red-3

  .valid-card-error-form
    box-sizing: border-box
    background: $color-white
    border: 1px solid $color-red-3
    border-radius: 10px

  .gift-cards-input
    box-sizing: border-box
    background: $color-white
    border: 1px solid $color-gray-3
    border-radius: 10px

  .redeem-buttons
    width: 340px
    bottom: 15vh
</style>