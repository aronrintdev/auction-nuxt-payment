<template>
  <div class="payment-component-wrapper">
    <!-- Personal Details Section -->
    <b-col cols="12" class="payment-methods">
      <b-card
        id="payment-methods-card"
        :title="$t('preferences.payments.payment_method')"
      >
        <!-- Payments Description -->
        <b-card-text class="payment-methods-heading">
          <b-row>
            <b-col md="6" class="mt-2 mt-md-2 updated-payment-info"
              >{{ $t('preferences.payments.update_your_payment_info') }}
            </b-col>
            <b-col md="5" class="add-new-payment-col mt-2 mt-md-2">
              <b-button
                variant="light"
                class="add-new-payments"
                pill
                @click="showPaymentModal('addCards')"
              >
                <span class="payment-button-text">{{
                  $t('preferences.payments.add_a_new_payment_method')
                }}</span>
              </b-button>
            </b-col>
            <b-col md="11">
              <b-button
                variant="light"
                class="purchase-gift-card-btn text-white mt-2"
                pill
                @click="showPaymentModal('purchaseGiftCard')"
              >
                <span class="payment-button-text">{{
                  $t('preferences.payments.purchase_gift_card')
                }}</span>
              </b-button>
            </b-col>
          </b-row>
        </b-card-text>
        <!-- ./Payments Description -->
        <!-- Card Payments -->

        <b-row
          v-if="userCardPayments.length !== 0"
          class="card-payments-heading"
        >
          <b-col md="12">
            <span id="card-payments-heading" class="text-bold">{{
              $t('preferences.payments.card_payments')
            }}</span>
          </b-col>
        </b-row>
        <template v-if="invalidCardOrGiftCard">
          <b-row>
            <b-col
              md="12"
              class="bg-light position-static shadow-none text-center"
            >
              <h5 class="text-muted">
                {{ $t('preferences.payments.no_payments_found') }}
              </h5>
            </b-col>
          </b-row>
        </template>

        <!-- Card Payments Section -->
        <template v-if="userCardPayments.length">
          <b-row
            v-for="cardPayments in userCardPayments"
            :key="`card-` + cardPayments.id"
          >
            <!-- Card Payment -->
            <b-col sm md="6" class="p-3">
              <b-row class="card-payments-radio-row">
                <!-- Make as Default Radio Button -->
                <b-form-group v-slot="{ ariaDescribedby }">
                  <b-form-radio
                    v-model="defaultCardPayment"
                    :aria-describedby="ariaDescribedby"
                    name="default-payment-radios"
                    class="text-normal default-payment-radios"
                    :value="cardPayments.id"
                    @change="onChangeOption(cardPayments.id, cardPayments.is_default)"
                  >
                    {{
                      cardPayments.id === defaultCardPayment
                        ? $t('preferences.common.default')
                        : $t('preferences.common.make_as_default')
                    }}
                  </b-form-radio>
                </b-form-group>
                <!-- ./ Make as Default Radio Button -->
              </b-row>
              <b-row class="card-row" align-v="center">
                <b-col md="2" class="payments-card-icon">
                  <img
                    :src="getCardsImage(cardPayments.card_brand)"
                    alt="card-image"
                    class="w-100"
                  />
                </b-col>
                <b-col md="7" class="payment-card-description">
                  <div class="text-capitalize fw-400">
                    <span
                      >{{ cardPayments.card_type }}&nbsp;{{
                        $t('preferences.payments.ending_in')
                      }}&nbsp;{{ cardPayments.card_last_digits }}</span
                    >
                    <br />
                    <span
                      >{{ $t('preferences.payments.expiry') }}&colon;&nbsp;{{
                        cardPayments.card_expiry_date
                      }}</span
                    >
                  </div>
                </b-col>
                <b-col
                  md="3"
                  class="d-flex align-items-baseline justify-content-end payments-card-actionrow"
                >
                  <span
                    class="m-auto text-capitalize"
                    :class="[
                      expiryStatus(cardPayments.card_expiry_date) ===
                      activeStatus
                        ? 'text-success'
                        : 'text-danger',
                    ]"
                  >
                    {{ expiryStatus(cardPayments.card_expiry_date) }}
                  </span>
                  &nbsp;
                  <b-button
                    variant="outline-primary"
                    class="ml-2 edit-card-button"
                    @click="showCardDetails(cardPayments.id)"
                  >
                    {{ $t('preferences.payments.edit') }}
                  </b-button>
                </b-col>
              </b-row>
            </b-col>
            <!-- CardPayments -->
          </b-row>
        </template>
        <!-- ./Card Payments Section -->

        <!-- Gift Card Section -->
        <template v-if="giftCardList && giftCardList.length">
          <span id="card-payments-heading" class="text-bold d-block mt-5">{{
            $t('preferences.payments.gift_card')
          }}</span>

          <GiftCards
            v-for="giftcard in giftCardList"
            :key="`giftcard` + giftcard.id"
            :giftcard="giftcard"
          />
        </template>
        <!-- Gift Card Section -->
      </b-card>
    </b-col>
    <!-- Payments Modal -->
    <PaymentMethodsModal :type="actionType" />
    <!-- Payments Modal -->
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import PaymentMethodsModal from './Popup/Payments/PaymentMethodsModal'
import GiftCards from './GiftCards.vue'
import { ACTIVE, EXPIRED } from '~/static/constants'
export default {
  name: 'PaymentComponent',

  components: { PaymentMethodsModal, GiftCards },
  data() {
    return {
      // List payment methods
      userCardPayments: [],
      defaultCardPayment: '',
      actionType: '',
      activeStatus: ACTIVE,
      expiredStatus: EXPIRED,
    }
  },
  // Fetch the card payment methods of user
  async fetch() {
    await this.$axios
      .get('/preferences/payments/get-payment-methods')
      .then((res) => {
        this.userCardPayments = res.data.cardPayments
        this.defaultCardPayment = res.data.defaultCardID
      })
      .catch((err) => {
        this.$logger.logToServer(
          'Preferences get payment methods error: ',
          err.response.data
        )
      })
  },
  fetchOnServer: false,

  computed: {
    ...mapGetters({
      giftCardList: 'preferences/userGiftCardList',
    }),

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    invalidCardOrGiftCard: (vm) => {
      return (
        (!vm.userCardPayments || !vm.userCardPayments.length) &&
        (!vm.giftCardList || !vm.giftCardList.length)
      )
    },
  },

  created() {
    // Get the user giftcards
    this.getUserGiftCards()

    this.$nuxt.$on('reloadPaymentMethods', () => {
      this.$fetch()
    })
  },

  methods: {
    ...mapActions({
      updateCardsStatus: 'preferences/updateCardStatus',
      getGiftCards: 'preferences/getAvailableGiftCards',
      userGiftCards: 'preferences/getUserGiftCards',
    }),

    // Get the user giftcards
    getUserGiftCards() {
      this.userGiftCards()
    },

    // Show the modal
    showPaymentModal(type) {
      this.updateCardsStatus({
        cardID: '',
        editStatus: false,
      })

      // Get the available gift cards
      this.getGiftCards()

      this.actionType = type
      this.$bvModal.show('payment-methods-modal')
    },
    // Get Card Image
    // TODO: add if any required.
    getCardsImage(type) {
      try {
        return require(`~/assets/img/preferences/${type}-logo.svg`)
      } catch (error) {
        return require('~/assets/img/preferences/visa-logo.svg')
      }
    },

    // Return the active or expired status for cards
    // Currently the expiry date is shown in mm/yy format. So we are appending current year first 2 digit to make yyyy format.
    // TODO: refractor this to show the status with mm/yy format or save expiry as in mm/yyyy format.
    expiryStatus(date) {
      const today = new Date()
      const currentDate = today.getDate()
      const currentYear = today.getFullYear().toString().slice(0, 2)
      const exp = date.split('/')

      const now = this.$options.filters.formatDate(today) // in dd/mm/yy format
      const expDate = this.$options.filters.formatDate(
        new Date(`${currentYear}${exp[1]}-${exp[0]}-${currentDate}`)
      )

      return new Date(expDate) > new Date(now)
        ? this.activeStatus
        : this.expiredStatus
    },

    showCardDetails(id) {
      this.actionType = 'addCards'
      this.updateCardsStatus({
        cardID: id,
        editStatus: true,
      })

      this.$bvModal.show('payment-methods-modal')
    },
    // Update the card payments default status
    onChangeOption(id, defaultVal) {
      this.$axios
        .put(`/preferences/payments/update-default-status/${id}`, { 
          default: defaultVal !== 1 
        })
        .then((res) => {
          this.defaultCardPayment = res.data.id
          this.$nuxt.refresh()
        })
        .catch((err) => {
          this.$logger.logToServer(
            'Preferences Payments make default: ',
            err.response.data
          )
          this.$toasted.error(this.$t(err.response.data.message))
          this.$nuxt.refresh()
        })
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.purchase-gift-card-btn
  background-color: $color-blue-20
@media (min-width: 630px)
  .add-new-payments,
  .purchase-gift-card-btn
    float: right
@media (min-width: 630px) and (max-width: 768px)
  .updated-payment-info,
  .add-new-payment-col
    width: 50%
</style>
