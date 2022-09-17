<template>
  <b-card-text>
    <b-col md="12">
      <b-row class="justify-content-center d-flex">
        <img
          :src="giftCardImage"
          alt="Demo Debit Card"
          class="w-50 justify-content-center"
        />
      </b-row>

      <ValidationObserver ref="observer">
        <form @submit.prevent="onGiftCardRedeem">
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
                  class="add-cards-label text-left text-dark"
                  :label="$t('preferences.payments.gift_card_number')"
                >
                  <b-form-input
                    id="gift-cards"
                    v-model="giftCardNumber"
                    :state="errors[0] ? false : valid ? true : null"
                    class="gift-cards-input d-flex"
                    type="text"
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
                  :label="$t('common.pin')"
                >
                  <b-form-input
                    id="gift-cards"
                    v-model="pin"
                    :state="errors[0] ? false : valid ? true : null"
                    class="gift-cards-input d-flex"
                    type="text"
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
          <span v-if="errorMessage" class="error-message"
            >&#42;{{ errorMessage }}</span
          >
          <b-row>
            <b-col>
              <b-button type="submit" pill class="float-right px-3">
                {{ $t('preferences.payments.save_card') }}
              </b-button>
            </b-col>
          </b-row>
        </form>
      </ValidationObserver>
    </b-col>
  </b-card-text>
</template>
<script>
import { mapActions } from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import emitEvent from '~/plugins/mixins/emit-event'
export default {
  name: 'RedeemGiftCard',

  components: {
    ValidationObserver,
    ValidationProvider,
  },

  mixins: [emitEvent],

  data() {
    return {
      giftCardNumber: '',
      pin: '',
      errorMessage: '',
      giftCardData: {},
    }
  },

  computed: {
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    giftCardImage: (vm) => {
      if (vm.giftCardData.card) {
        return require(`assets/img/preferences/giftcard/${vm.giftCardData.card.image_name}`)
      }
      return require('~/assets/img/preferences/gift-card-2.png')
    },
  },

  created() {
    // Update the modal header
    this.updateModalHeader({
      title: this.$t('preferences.payments.add_payment_method'),
      showTabs: true,
    })
  },

  methods: {
    ...mapActions({
      updateModalHeader: 'preferences/updateModalHeader',
      saveRedeemedResponse: 'preferences/saveRedeemedResponse',
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
              // Store the success message to view in success screen.
              this.saveRedeemedResponse({ response: res.data.data })
              setTimeout(() => {
                // Show the success screen.
                this.emitRenderComponentEvent(
                  this.$parent.$options.components.GiftCardRedeemSuccess.name
                )
              }, 1000)
            })
            .catch((err) => {
              this.errorMessage = this.$t(err.response.data.message)
              this.$logger.logToServer('Giftcard redeem error:', err.response)
            })
        }
      })
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.error-message
  font-style: normal
  @include body-10-regular
  display: flex
  align-items: center
  color: $color-red-17
.btn
  background: $color-white-1
  border: 1px solid $color-blue-20
  border-radius: 20px
  color: $color-blue-20
</style>
