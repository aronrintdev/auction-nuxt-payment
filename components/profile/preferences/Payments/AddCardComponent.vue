<template>
  <div class="card-component-wrapper responsive-add-card-component">
    <b-card class="mt-3">
      <!-- card heading -->
      <div class="card-text">
        <span class="add-card-heading">
          <span v-if="!cardEditStatus" class="d-flex">
            {{ $t('preferences.payments.add_card_payments') }}
          </span>
          <span v-else class="d-flex">
            {{ $t('preferences.payments.edit_card_information') }}
          </span>
        </span>
        <p class="card-sub-heading d-flex">
          {{ $t('preferences.payments.enter_card_info') }}
        </p>
      </div>
      <card-component id="dynamic-card-component" :valuefields="valueFields" class="mb-4" />

      <!-- Card Number -->
      <b-row class="add-edit-card-form">
        <b-col>
          <b-form-group
            id="input-group-add-cards"
            class="card-details-label"
            label-for="ccnumber"
            :label="$t('preferences.payments.card_number')"
          >
            <div class="d-flex cc-number-field">
              <div class="card-brand m-auto">
                <img :src="cardImage" class="img-fluid" />
              </div>
              <div
                id="ccnumber"
                class="payment-details d-flex w-100"
                :class="!ccnumberValid ? 'exp-status' : ''"
              ></div>
            </div>
            <small
              v-if="formErrors.ccnumber.message"
              :class="formErrors.ccnumber.textClass"
              class="p-2"
            >
              {{ formErrors.ccnumber.message }}
            </small>
          </b-form-group>
        </b-col>
      </b-row>
      <!-- ./Card Number -->

      <!-- Card holder name -->
      <b-row class="add-edit-card-form">
        <b-col>
          <b-form-group
            id="input-group-add-cards"
            class="card-details-label"
            label-for="checkname"
            :label="$t('preferences.payments.cardholder_name')"
          >
            <div
              id="checkname"
              class="payment-details d-flex w-100"
              :class="!checknameValid ? 'exp-status' : ''"
            ></div>
            <small
              v-if="formErrors.checkname.message"
              :class="formErrors.checkname.textClass"
              class="p-2"
            >
              {{ formErrors.checkname.message }}
            </small>
          </b-form-group>
        </b-col>
      </b-row>
      <!-- Card holder name -->

      <div class="row">
        <!-- Expiration Date -->
        <b-row class="add-edit-card-form col">
          <b-col>
            <b-form-group
              id="input-group-add-cards"
              class="card-details-label"
              label-for="ccexp"
              :label="$t('preferences.payments.card_expiration_date')"
            >
              <div
                id="ccexp"
                class="payment-details d-flex w-100"
                :class="
                  cardExpStatus === true || !ccexpValid ? 'exp-status' : ''
                "
              ></div>
              <small
                v-if="formErrors.ccexp.message"
                :class="formErrors.ccexp.textClass"
                class="p-2"
              >
                {{ formErrors.ccexp.message }}
              </small>
            </b-form-group>
          </b-col>
        </b-row>
        <!-- Expiration Date -->

        <!-- cvv -->
        <b-row class="add-edit-card-form col">
          <b-col>
            <b-form-group
              id="input-group-add-cards"
              class="card-details-label"
              label-for="securitycode"
              :label="$t('preferences.payments.cvv')"
            >
              <div
                id="securitycode"
                class="payment-details d-flex w-100"
                :class="[
                  cardExpStatus == true || !cvvValid ? 'exp-status' : '',
                ]"
              ></div>
              <small
                v-if="formErrors.cvv.message"
                :class="formErrors.cvv.textClass"
                class="p-2"
                >{{ formErrors.cvv.message }}</small
              >
            </b-form-group>
          </b-col>
        </b-row>
        <!-- cvv -->
      </div>

      <!-- Default CheckBox -->
      <b-form-checkbox
        id="checkbox-default-payment"
        v-model="form.isDefault"
        name="checkbox-default-payment"
        class="use-as-default-card"
      >
        <span>{{ $t('preferences.payments.save_card_as_default') }}</span>
      </b-form-checkbox>
      <!-- Default CheckBox -->
    </b-card>

    <div v-if="cardExpStatus">
      <p :class="cardExpStatus == true ? 'update-exp-message' : 'd-none'">
        {{ $t('preferences.payments.update_exp_cvv') }}
      </p>
    </div>

    <div v-if="showValidateMessage">
      <p class="update-exp-message d-flex align-items-center">
        {{ $t('preferences.payments.form_not_valid_message') }}
      </p>
    </div>

    <!-- save button -->
    <div v-if="isSaving" class="d-flex justify-content-center">
      <b-spinner variant="color-blue-2"></b-spinner>
    </div>
    <div v-else class="d-flex justify-content-center button-slot mx-3 position-fixed">
      <b-button
        v-if="!formValidated"
        id="saveCards"
        ref="saveCards"
        variant="save-cards-button w-100"
        class="
          align-items-center
          text-align-center
          d-flex
          justify-content-center
        "
      >
        <span v-if="!cardEditStatus" class="btn-txt">{{
          $t('preferences.payments.add_card_payments')
        }}</span>
        <span v-else class="btn-txt">{{ $t('common.save_changes') }}</span>
      </b-button>
      <b-button
        v-if="formValidated"
        id="saveCards"
        ref="saveCards"
        variant="save-cards-button-active w-100"
        class="
          align-items-center
          text-align-center
          d-flex
          justify-content-center
        "
        @click="isSaving = true"
      >
        <span v-if="!cardEditStatus" class="btn-txt-active">{{
          $t('preferences.payments.add_card_payments')
        }}</span>
        <span v-else class="btn-txt-active">{{
          $t('common.save_changes')
        }}</span>
      </b-button>
    </div>

    <!--alert to make any card as Default card-->
    <MobileBottomSheet
      :height="`238px`"
      :hasHeaderDivider="false"
      :open="defaultAlert"
      :title="''"
    >
      <DefaultCardAlert
        @dismissAddDefault="dismissDefaultConfirmation"
        @addCardDefault="addAsCardDefault"
      />
    </MobileBottomSheet>
    <!--alert to make any card as Default card-->

    <!--alert to show while change a Default card-->
    <MobileBottomSheet
      :height="'30%'"
      :hasHeaderDivider="false"
      :open="defaultCardChangeAlert"
      :title="''"
      @closed="$emit('closed')"
      @opened="$emit('opened')"
    >
      <ChangeDefaultCardAlert
        @dismissAddDefault="cancelCardDefault"
        @addCardDefault="switchCardDefault"
      />
    </MobileBottomSheet>
    <!--alert to show while change a Default card-->

    <!--show success alert after saving the card-->
    <TransparentAlertModal
      id="update-profile-success"
      :text="$t('preferences.payments.card_save_success_alert')"
      :show="showAlert"
      @hide="listenModalClose"
    />
    <!--show success alert after saving the card-->

    <client-only>
      <Portal to="page-title"> {{ $t('payments.payment_method') }}</Portal>
      <Portal to="back-icon-slot">
        <img
          :src="require('~/assets/img/icons/back.svg')"
          alt="back-arrow"
          class="float-left"
          @click="moveBack"
        />
      </Portal>
    </client-only>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import DefaultCardAlert from './DefaultCardAlert.vue'
import ChangeDefaultCardAlert from './ChangeDefaultCardAlert.vue'
import emitEvent from '~/plugins/mixins/emit-event'
import CardComponent from '~/components/profile/preferences/Popup/Payments/CardComponent.vue'
import MobileBottomSheet from '~/components/mobile/MobileBottomSheet.vue'
import TransparentAlertModal from '~/components/common/TransparentAlertModal.vue'
import {
  CARD_LAST_DIGITS_OFFSET,
  PAYMENT_METHOD_TYPE_CARD,
  NMI_COLLECTJS_URL,
} from '~/static/constants'

export default {
  name: 'AddCardComponent',
  components: {
    CardComponent,
    MobileBottomSheet,
    DefaultCardAlert,
    ChangeDefaultCardAlert,
    TransparentAlertModal,
  },

  mixins: [emitEvent],

  data() {
    return {
      defaultAlert: false,
      defaultCardChangeAlert: false,
      cardDetailsInserted: false,
      loading: true,
      isSaving: false,
      showSuccess: false,
      cardImage: '',
      formErrors: {
        checkname: {
          message: '',
          textClass: '',
        },
        ccnumber: {
          message: '',
          textClass: '',
        },
        ccexp: {
          message: '',
          textClass: '',
        },
        cvv: {
          message: '',
          textClass: '',
        },
      },
      // Card Details
      form: {
        inputCardHolderName: '',
        inputCardNumber: '',
        inputCardExpiryDate: '',
        inputCardBrand: '',
        paymentToken: '',
        isDefault: false,
      },
      // Edit Card Details
      editCardDetails: {
        ccname: '',
        ccexp: '',
        ccnumber: '',
        cctype: '',
        payouttype: '',
      },
      // Value for card component
      valueFields: {
        cardName: '',
        cardNumber: '',
        cardMonth: '',
        cardYear: '',
        cardCvv: '',
        cardBrand: '',
      },
      // Payout method ID
      payoutID: '',
      checkboxClicked: false,
      formValidated: false,
      setDefault: true,
      setThisDefault: null,
      showAlert: false,
      showChangeAlert: false
    }
  },

  async fetch() {
    // If not edit inject collect JS
    if (!this.cardEditStatus) {
      // Inject Collect JS
      this.injectCollectJS(() => {
        // eslint-disable-next-line no-undef
        CollectJS.configure({
          paymentSelector: '#saveCards',
          fields: {
            ccnumber: {
              selector: '#ccnumber',
              title: this.$t('preferences.payments.card_number'),
              placeholder: '',
            },
            checkname: {
              selector: '#checkname',
              title: this.$t('preferences.payments.cardholder_name'),
              placeholder: '',
            },
            ccexp: {
              selector: '#ccexp',
              title: this.$t('preferences.payments.exp_date'),
              placeholder: this.$t('preferences.payments.mm/yyyy'),
            },
            cvv: {
              selector: '#securitycode',
              title: this.$t('preferences.payments.security_code'),
              placeholder: '',
            },
          },
          styleSniffer: 'true',
          variant: 'inline',
          validationCallback: (field, status, message) => {
            this.formErrors[field].message = message
            this.formErrors[field].textClass = status
              ? 'text-success'
              : 'text-danger'

            if (
              this.formErrors[field].message !== 'Field is empty' &&
              this.formErrors[field].message !== ''
            ) {
              this.formValidated = true
            } else {
              this.formValidated = false
            }
          },
          fieldsAvailableCallback: () => {
            this.loading = false
          },
          callback: (response) => {
            // If token exists
            if (response.token) {
              this.form.inputCardHolderName = response.check.name
              // Extract the last 4 digits of the card number.
              this.form.inputCardNumber = response.card.number.slice(
                response.card.number.length - CARD_LAST_DIGITS_OFFSET
              )
              // Format the date to MM / YYYY.
              this.form.inputCardExpiryDate =
                response.card.exp.substring(0, 2) +
                '/' +
                response.card.exp.substring(2)
              this.form.inputCardBrand = response.card.type
              this.form.paymentToken = response.token
              this.paymentToken = response.token
              this.savePaymentDetails()
            } else {
              this.isSaving = false
              this.$toasted.error(
                this.$t('payments.please_enter_valid_info').toString()
              )
            }
          },
        })
      })
    } else {
      // If the options is for edit get the card details from nmi.
      this.payoutID = this.cardEditID
      await this.$axios
        .get(`/preferences/payments/get-card-details/${this.cardEditID}`)
        .then((res) => {
          this.editCardDetails = res.data.data
          if (this.editCardDetails) {
            // Display the details on card
            this.form.isDefault = this.editCardDetails.is_default === 1
            this.displayCard('edit', this.editCardDetails)
          }
        })
        .catch((err) => {
          // this.$toasted.error(this.$t(err.response.data.message))
          this.$logger.logToServer(
            'Get Card Error in preferences',
            err.response
          )
          this.$nuxt.refresh()
        })
        .finally(() => {
          this.injectCollectJS(() => {
            // eslint-disable-next-line no-undef
            CollectJS.configure({
              paymentSelector: '#saveCards',
              fields: {
                // The value attributes is not supported.
                // On edit values are shown as placeholder.
                // Card number are taken from nmi and is masked (****).
                // CVV is not saved in nmi so the cvv is replace with ****.
                ccnumber: {
                  selector: '#ccnumber',
                  title: this.$t('preferences.payments.card_number'),
                  placeholder: this.editCardDetails.ccnumber,
                },
                checkname: {
                  selector: '#checkname',
                  title: this.$t('preferences.payments.cardholder_name'),
                  placeholder: this.editCardDetails.ccname,
                },
                ccexp: {
                  selector: '#ccexp',
                  title: this.$t('preferences.payments.exp_date'),
                  placeholder: this.editCardDetails.ccexp,
                },
                cvv: {
                  display: 'hide',
                  selector: '#securitycode',
                  title: this.$t('preferences.payments.security_code'),
                  placeholder: '****',
                },
              },
              styleSniffer: 'true',
              variant: 'inline',
              validationCallback: (field, status, message) => {
                this.formErrors[field].message = message
                this.formErrors[field].textClass = status
                  ? 'text-success'
                  : 'text-danger'

                if (
                  this.formErrors[field].message !== 'Field is empty' &&
                  this.formErrors[field].message !== ''
                ) {
                  this.formValidated = true
                } else {
                  this.formValidated = false
                }
              },
              fieldsAvailableCallback: () => {
                this.loading = false
              },
              callback: (response) => {
                this.isSaving = true
                // If token exists
                if (response.token) {
                  // Give the datas to display in card on submit
                  this.displayCard('add', response)
                  // this.$refs.saveCards.disabled = true
                  this.form.inputCardHolderName = response.check.name
                  // Extract the last 4 digits of the card number.
                  this.form.inputCardNumber = response.card.number.slice(
                    response.card.number.length - CARD_LAST_DIGITS_OFFSET
                  )
                  // Format the date to MM / YYYY
                  this.form.inputCardExpiryDate =
                    response.card.exp.substring(0, 2) +
                    '/' +
                    response.card.exp.substring(2)
                  this.form.inputCardBrand = response.card.type
                  this.form.paymentToken = response.token
                  // Update the card details
                  this.$axios
                    .put(
                      `/preferences/payments/update-payment-cards/${this.cardEditID}`,
                      this.form
                    )
                    .then((res) => {
                      if (this.isDefaultCardAvailable && this.form.isDefault) {
                        this.form.isDefault = false
                        this.defaultCardChangeAlert = true
                      } else {
                        this.isSaving = false
                        this.showAlert = true
                        this.moveBack()
                      }
                    })
                    .catch((err) => {
                      this.isSaving = false
                      // this.$refs.saveCards.disabled = false
                      this.$logger.logToServer(
                        'Card Payments update in preferences',
                        err.response.data
                      )
                      this.$toasted.error(this.$t(err.response.data.message))
                      this.$nuxt.refresh()
                    })
                }
              },
            })
          })
        })
    }
  },

  fetchOnServer: false,

  computed: {
    ...mapGetters({
      cardEditStatus: 'preferences/getCardEditStatus',
      cardEditID: 'preferences/getCardEditID',
      isDefaultCardAvailable: 'preferences/isCardDefault',
      cardExpStatus: 'preferences/getcardExpStatus',
    }),

    ccnumberValid() {
      return this.formErrors.ccnumber.message !== 'Field is empty'
    },
    checknameValid() {
      return this.formErrors.checkname.message !== 'Field is empty'
    },
    ccexpValid() {
      return this.formErrors.ccexp.message !== 'Field is empty'
    },
    cvvValid() {
      return this.formErrors.cvv.message !== 'Field is empty'
    },

    showValidateMessage() {
      return (
        this.formErrors.ccnumber.message === 'Field is empty' ||
        this.formErrors.checkname.message === 'Field is empty' ||
        this.formErrors.ccexp.message === 'Field is empty' ||
        this.formErrors.cvv.message === 'Field is empty'
      )
    },
  },

  unmounted() {
    // On modal close remove collectJS.
    this.removeCollectJS()
    this.cardChangeAlert()
  },

  methods: {
    ...mapActions({
      addPaymentMethod: 'auth/addPaymentMethod',
      addPaymentToken: 'order-details/addPaymentToken',
      updateCardToDefault: 'preferences/updateCardToDefault',
    }),

    // Back to previous page
    moveBack() {
      this.$store.dispatch('preferences/changeHeaderVisibility', false)
      this.emitRenderComponentEvent(
        this.$parent.$options.components.CardPayments.name
      )
    },

    // Inject Collect.js into document head
    // ! Do not use head property here because collect.js raises error if script tag has extra attrs like
    // `data-n-head`
    injectCollectJS(callback) {
      this.removeCollectJS()
      const el = document.querySelector(
        'script[src="' + NMI_COLLECTJS_URL + '"]'
      )
      if (el) {
        callback()
      } else {
        const el = document.createElement('script')
        el.setAttribute('src', NMI_COLLECTJS_URL)
        el.setAttribute('data-tokenization-key', process.env.NMI_PUBLIC_KEY)
        el.async = true
        el.addEventListener('load', () => callback())
        document.head.appendChild(el)
      }
    },

    // Add the details to cards
    displayCard(type, details) {
      const currentYear = new Date().getFullYear().toString().substring(0, 2)
      if (type === 'add') {
        this.valueFields.cardNumber = details.card.number
        this.valueFields.cardName = details.check.name
        this.valueFields.cardMonth = details.card.exp.substring(0, 2)
        this.valueFields.cardYear = currentYear + details.card.exp.substring(2)
        this.valueFields.cardCvv = '***' // Added *** because cvv is not available from collectjs.
        this.valueFields.cardBrand = details.card.type
        // Render the image
      } else {
        this.valueFields.cardNumber = details.ccnumber
        this.valueFields.cardName = details.ccname
        this.valueFields.cardMonth = details.ccexp.substring(0, 2)
        this.valueFields.cardYear = currentYear + details.ccexp.substring(3) // TODO: Added a random number 20.
        this.valueFields.cardCvv = '***' // Added *** because cvv is not available from collectjs.
        this.valueFields.cardBrand = details.cctype
        // // Render the image
      }
    },

    // Remove collectJS form elements and script tag
    removeCollectJS() {
      let el = document.querySelector('script[src="' + NMI_COLLECTJS_URL + '"]')
      if (el) document.head.removeChild(el)
      el = document.querySelector('iframe[id="CollectJSInlineccnumber"]')
      if (el) el.parentNode.removeChild(el)
      el = document.querySelector('iframe[id="CollectJSInlinecheckname"]')
      if (el) el.parentNode.removeChild(el)
      el = document.querySelector('iframe[id="CollectJSInlineccexp"]')
      if (el) el.parentNode.removeChild(el)
      el = document.querySelector('iframe[id="CollectJSInlinecvv"]')
      if (el) el.parentNode.removeChild(el)
    },

    // Save the Card
    savePaymentDetails() {
      // Save the payment method for future purchases, otherwise keep it temporarily.
      this.addPaymentMethod({
        paymentMethod: this.form,
        paymentMethodType: PAYMENT_METHOD_TYPE_CARD,
      })
      // Save the newly created payment token in order to be used for placing the order.
      if (!this.isDefaultCardAvailable) {
        this.form.isDefault = true
      }
      
      if (this.isDefaultCardAvailable && this.form.isDefault) {
        this.showChangeAlert = true
        this.form.isDefault = false
      }

      this.$axios
        .post('/preferences/payments/add-payment-cards', this.form)
        .then((res) => {
          this.payoutID = res.data.data.id
          this.isSaving = false

          if(this.showChangeAlert === true){
            this.defaultCardChangeAlert = true
          }else{
            this.isSaving = false
            this.showAlert = true
            this.moveBack()
          }
        })
        .catch((err) => {
          this.isSaving = false
          this.$logger.logToServer(
            'Preferences - Add Credit Cards',
            err.response
          )
        })
    },

    // show alert when user switch default card to another
    cardChangeAlert() {
      this.defaultCardChangeAlert = !this.defaultCardChangeAlert
    },

    addDefault() {
      if (this.payoutID) {
        this.$axios
          .put(`/preferences/payments/update-default-status/${this.payoutID}`)
          .then((res) => {
            this.setDefault = false
            this.showAlert = true
            this.defaultAlert = false
          })
          .catch((err) => {
            this.defaultAlert = false
            this.$logger.logToServer(
              'Perferences Default Status Update',
              err.response.data
            )
            this.$toasted.error(this.$t(err.response.data.message))
          })
      }
    },

    // make entered card as default
    addAsCardDefault() {
      if (this.defaultAlert) {
        this.addDefault()
      } else {
        this.defaultAlert = false
      }
    },

    listenModalClose() {
      this.showAlert = false
      this.$nextTick(() => {
        this.moveBack()
      })
    },

    // if already default card available this function work
    switchCardDefault() {
      this.updateCardToDefault({ cardId: this.payoutID, default: true })
        .then((res) => {
          this.moveBack()
        })
        .catch((err) => {
          this.$logger.logToServer('Update to Default', err.response)
          this.moveBack()
        })
    },

    cancelCardDefault() {
      this.updateCardToDefault({ cardId: this.payoutID, default: false })
        .then((res) => {
          this.defaultCardChangeAlert = false
          this.$nextTick(() => {
            this.moveBack()
          })
        })
        .catch((err) => {
          this.$logger.logToServer('Update to Default', err.response)
          this.moveBack()
        })
    },

    dismissDefaultConfirmation() {
      this.defaultAlert = false
      this.$nextTick(() => {
        this.moveBack()
      })
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.responsive-add-card-component
  height: 105vh
  .button-slot
    width: 340px
    bottom: 12vh
    background: $color-white
    left: 0.1rem
    #saveCards
      margin-top: 18px
      margin-bottom: 18px
  .responsive-heading
    font-family: $font-montserrat
    font-style: normal
    @include body-3-medium
    letter-spacing: -0.02em
    color: $color-black-1
    background-color: $color-white-1
  .card-body::v-deep
    padding: 19px 17px

  .add-card-heading
    font-family: $font-sp-pro
    font-style: normal
    @include body-4-medium
    color: $color-blue-20

  .card-sub-heading
    font-family: $font-sp-pro
    font-style: normal
    @include body-21-regular
    color: $color-black-17
    margin-top: 4px
    margin-bottom: 14px

  .use-as-default-card
    font-family: $font-sp-pro
    font-style: normal
    @include body-33-normal
    color: $color-black-1

  .card-details-label
    font-family: $font-montserrat
    font-style: normal
    @include body-6-medium
    color: $color-black-17

  .btn-save-cards-button
    background: $color-gray-21
    border-radius: 20px

  .btn-txt
    font-family: $font-sp-pro
    font-style: normal
    @include body-34-medium
    color: $color-gray-47

  .btn-save-cards-button-active
    background: $color-blue-20
    border-radius: 20px

  .btn-txt-active
    font-family: $font-sp-pro
    font-style: normal
    @include body-34-medium
    color: $color-white-1

  .update-exp-message
    font-family: $font-montserrat
    font-style: normal
    @include body-18-medium
    color: $color-red-3

  #input-group-add-cards::v-deep
    .exp-status
      font-family: $font-sp-pro
      border-color: $color-red-29
      border-width: 1px
      border-style: solid
      border-radius: 16px

  #checkbox-default-payment::v-deep
    &::after
      accent-color: $color-black-1
  
  #dynamic-card-component::v-deep
    .card-item
      max-width: 272px
      height: 173px
      width: 100%
      .card-item__wrapper
        .card-item__numberItem
          &.-active
            width: 5px
        .card-item__info
          padding: 0
          margin-bottom: 0
        .card-item__date,
        .card-item__holder
          display: none
        .card-item__name
          font-family: $font-montserrat
          font-style: normal
          @include body-4-normal
          display: flex
          align-items: center
          color: $color-white
          text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25)
        .card-item__content
          position: fixed
          width: 100%
          bottom: 0
          margin-bottom: 26px
        .card-item__number
          font-family: $font-montserrat
          font-style: normal
          @include body-4-normal
          display: flex
          align-items: center
          color: $color-white
          padding: 0
          position: fixed
          bottom: 0
          margin-bottom: 45px
</style>