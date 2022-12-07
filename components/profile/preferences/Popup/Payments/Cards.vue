<template>
  <b-card-text>
    <b-col md="12">
      <!-- UserCard -->
      <card-component :valuefields="valueFields" />
      <!-- ./UserCard -->
      <!-- Show the success on card adding -->
      <template v-if="showSuccess">
        <b-row class="mt-5 justify-content-center">
          <!-- Use card for purchase heading -->
          <div class="text-bold text-center">
            {{ $t('preferences.payments.use_card_for_deadstock') }}
          </div>
          <!-- ./Use card for purchase heading -->
          <!-- Default CheckBox -->
          <div class="text-center">
            <b-form-checkbox
              id="checkbox-default-payment"
              v-model="defaultCardStatus"
              name="checkbox-default-payment"
              value="true"
              unchecked-value="false"
              class="use-as-default-card"
            >
              {{ $t('preferences.payments.save_card_as_default') }}
            </b-form-checkbox>
          </div>
          <!-- Default CheckBox -->
        </b-row>
        <b-row :class="`mt-5 d-flex ${isInlineMode ? 'justify-content-center' : 'justify-content-end'}`">
          <!-- Finish Button -->
          <div class="finish-button">
            <b-button variant="light" class="px-3" pill @click="addDefault()">
              {{ ctaLabel? ctaLabel : $t('preferences.payments.finish') }}
            </b-button>
          </div>
          <!-- ./Finish Button -->
        </b-row>
      </template>
      <!-- ./Show the success on card adding -->
      <!-- Credit card add/ edit form -->
      <template v-else>
        <b-row class="pt-3 add-edit-card-form">
          <!-- Card Number -->
          <b-col>
            <b-form-group
              id="input-group-add-cards"
              class="add-cards-label text-left text-dark"
              label-for="ccnumber"
              :label="$t('preferences.payments.card_number')"
            >
              <div class="d-flex cc-number-field">
                <div class="card-brand m-auto">
                  <img :src="cardImage" class="img-fluid" />
                </div>
                <div id="ccnumber" class="payment-details d-flex w-100">
                  <b-row v-if="loading">
                    <b-col md="12" class="text-center">
                      <b-spinner small></b-spinner>
                    </b-col>
                  </b-row>
                </div>
              </div>
              <small
                v-if="formErrors.ccnumber.message"
                :class="formErrors.ccnumber.textClass"
                class="p-2"
                >{{ formErrors.ccnumber.message }}</small
              >
            </b-form-group>
          </b-col>
          <!-- ./Card Number -->
        </b-row>
        <b-row class="add-edit-card-form">
          <!-- Card Holder Name -->
          <b-col>
            <b-form-group
              id="input-group-add-cards"
              class="add-cards-label text-left text-dark"
              label-for="checkname"
              :label="$t('preferences.payments.cardholder_name')"
            >
              <div id="checkname" class="payment-details">
                <b-row v-if="loading">
                  <b-col md="12" class="text-center">
                    <b-spinner small></b-spinner>
                  </b-col>
                </b-row>
              </div>
              <small
                v-if="formErrors.checkname.message"
                :class="formErrors.checkname.textClass"
                class="p-2"
                >{{ formErrors.checkname.message }}</small
              >
            </b-form-group>
          </b-col>
          <!-- ./Card Holder Name -->
        </b-row>
        <b-row class="add-edit-card-form">
          <!-- Expiration Date -->
          <b-col>
            <b-form-group
              label-for="ccexp"
              class="add-cards-label text-left text-dark"
              :label="$t('preferences.payments.exp_date')"
            >
              <div id="ccexp" class="payment-details">
                <b-row v-if="loading">
                  <b-col md="12" class="text-center">
                    <b-spinner small></b-spinner>
                  </b-col>
                </b-row>
              </div>
              <small
                v-if="formErrors.ccexp.message"
                :class="formErrors.ccexp.textClass"
                class="p-2"
                >{{ formErrors.ccexp.message }}</small
              >
            </b-form-group>
          </b-col>
          <!-- ./ Expiration Date -->
          <!-- Security Code -->
          <b-col>
            <b-form-group
              id="input-group-add-cards"
              class="add-cards-label text-left text-dark"
              label-for="securitycode"
              :label="$t('preferences.payments.security_code')"
            >
              <div id="securitycode" class="payment-details">
                <b-row v-if="loading">
                  <b-col md="12" class="text-center">
                    <b-spinner small></b-spinner>
                  </b-col>
                </b-row>
              </div>
              <small
                v-if="formErrors.cvv.message"
                :class="formErrors.cvv.textClass"
                class="p-2"
                >{{ formErrors.cvv.message }}</small
              >
            </b-form-group>
          </b-col>
          <!-- ./Security Code -->
        </b-row>
        <b-row :class="`d-flex ${isInlineMode ? 'justify-content-center' : 'justify-content-end'}`">
          <!-- Card Number -->
          <b-spinner v-if="isSaving" variant="color-blue-2" class="mr-2" small></b-spinner>
          <b-button
            v-else
            id="saveCards"
            ref="saveCards"
            variant="light"
            :disabled="loading"
            pill
            class="d-flex align-items-center save-cards-button px-5"
            @click="isSaving = true"
          >
            
            {{ ctaLabel ? ctaLabel : $t('preferences.payments.save_card') }}
          </b-button>
          <!-- Card Number -->
        </b-row>
      </template>
      <!-- ./Credit card add/ edit form -->
    </b-col>
  </b-card-text>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import CardComponent from './CardComponent.vue'
import { CARD_LAST_DIGITS_OFFSET, PAYMENT_METHOD_TYPE_CARD, NMI_COLLECTJS_URL } from '~/static/constants'
import emitEvent from '~/plugins/mixins/emit-event'
export default {
  name: 'Cards',

  components: {
    CardComponent
  },

  mixins: [emitEvent],

  props: {
    isInlineMode: {
      type: Boolean,
      default: false,
    },
    ctaLabel: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      loading: true,
      isSaving: false,
      showSuccess: false,
      cardImage: '',
      formErrors: {
        checkname: {
          message: '',
          textClass: ''
        },
        ccnumber: {
          message: '',
          textClass: ''
        },
        ccexp: {
          message: '',
          textClass: ''
        },
        cvv: {
          message: '',
          textClass: ''
        }
      },
      // Card Details
      form: {
        inputCardHolderName: '',
        inputCardNumber: '',
        inputCardExpiryDate: '',
        inputCardBrand: '',
        paymentToken: '',
        isDefault: false
      },
      // Edit Card Details
      editCardDetails: {
        ccname: '',
        ccexp: '',
        ccnumber: '',
        cctype: '',
        payouttype: ''
      },
      // Value for card component
      valueFields: {
        cardName: '',
        cardNumber: '',
        cardMonth: '',
        cardYear: '',
        cardCvv: '',
        cardBrand: ''
      },
      // Payout method ID
      payoutID: '',
      // Checkbox value
      defaultCardStatus: false
    }
  },

  async fetch() {
    // If not edit inject collect JS
    if (!this.cardEditStatus) {
      // Update the Modal Header content
      this.updateModalHeader({
        title: this.$t('preferences.payments.add_payment_method'),
        showTabs: true,
      })
      // Inject Collect JS
      this.injectCollectJS(() => {
        // eslint-disable-next-line no-undef
        CollectJS.configure({
          paymentSelector: '#saveCards',
          fields: {
            ccnumber: {
              selector: '#ccnumber',
              title: this.$t('preferences.payments.card_number'),
              placeholder: ''
            },
            checkname: {
              selector: '#checkname',
              title: this.$t('preferences.payments.cardholder_name'),
              placeholder: ''
            },
            ccexp: {
              selector: '#ccexp',
              title: this.$t('preferences.payments.exp_date'),
              placeholder: this.$t('preferences.payments.mm/yyyy')
            },
            cvv: {
              selector: '#securitycode',
              title: this.$t('preferences.payments.security_code'),
              placeholder: ''
            }
          },
          styleSniffer: 'true',
          variant: 'inline',
          validationCallback: (field, status, message) => {
            this.formErrors[field].message = message
            this.formErrors[field].textClass = status
              ? 'text-success'
              : 'text-danger'
          },
          fieldsAvailableCallback: () => {
            this.loading = false
          },
          callback: (response) => {
            // If token exists
            if (response.token) {
              this.form.inputCardHolderName = response.check.name
              // Extract the last 4 digits of the card number.
              this.form.inputCardNumber = response.card.number.slice(response.card.number.length - CARD_LAST_DIGITS_OFFSET)
              // Format the date to MM / YYYY.
              this.form.inputCardExpiryDate = response.card.exp.substring(0, 2) + '/' + response.card.exp.substring(2)
              this.form.inputCardBrand = response.card.type
              this.form.paymentToken = response.token
              this.paymentToken = response.token
              this.savePaymentDetails()
            } else {
              this.isSaving = false
              this.$toasted.error(this.$t('payments.please_enter_valid_info').toString())
            }
          },
        })
      })
    } else {
      // Update the Modal Header content
      this.updateModalHeader({
        title: this.$t('preferences.payments.edit_card_information'),
        showTabs: false,
      })
      // If the options is for edit get the card details from nmi.
      await this.$axios
        .get(`/preferences/payments/get-card-details/${this.cardEditID}`)
        .then((res) => {
          this.editCardDetails = res.data.data
          if (this.editCardDetails) {
            // Display the details on card
            this.displayCard('edit', this.editCardDetails)
          }
        })
        .catch((err) => {
          this.$toasted.error(this.$t(err.response.data.message))
          this.$logger.logToServer(
            'Get Card Error in preferences',
            err.response.data
          )
          this.$bvModal.hide('payment-methods-modal')
          this.$nuxt.refresh()
        })
      // Inject collectJS with edit
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
              placeholder: this.editCardDetails.ccnumber
            },
            checkname: {
              selector: '#checkname',
              title: this.$t('preferences.payments.cardholder_name'),
              placeholder: this.editCardDetails.ccname
            },
            ccexp: {
              selector: '#ccexp',
              title: this.$t('preferences.payments.exp_date'),
              placeholder: this.editCardDetails.ccexp
            },
            cvv: {
              display: 'hide',
              selector: '#securitycode',
              title: this.$t('preferences.payments.security_code'),
              placeholder: '****'
            }
          },
          styleSniffer: 'true',
          variant: 'inline',
          validationCallback: (field, status, message) => {
            this.formErrors[field].message = message
            this.formErrors[field].textClass = status
              ? 'text-success'
              : 'text-danger'
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
                  this.$bvModal.hide('payment-methods-modal')
                  this.$nuxt.refresh()
                })
                .catch((err) => {
                  this.isSaving = false
                  this.$logger.logToServer(
                    'Card Payments update in preferences',
                    err.response.data
                  )
                  this.$toasted.error(this.$t(err.response.data.message))
                  this.$bvModal.hide('payment-methods-modal')
                  this.$nuxt.refresh()
                })
            }
          }
        })
      })
    }
  },
  fetchOnServer: false,

  computed: {
    ...mapGetters({
      cardEditStatus: 'preferences/getCardEditStatus',
      cardEditID: 'preferences/getCardEditID'
    })
  },

  created() {
    // Check the title and content of modal
    this.checkModalContent()
  },

  unmounted() {
    // On modal close remove collectJS.
    this.removeCollectJS()
  },

  methods: {
    ...mapActions({
      updateModalHeader: 'preferences/updateModalHeader',
      addPaymentMethod: 'auth/addPaymentMethod',
      addPaymentToken: 'order-details/addPaymentToken',
    }),
    // Update the modal content
    checkModalContent() {
      if (this.showSuccess) {
        this.updateModalHeader({
          title: this.$t('preferences.payments.card_added_successfully'),
          showTabs: false,
        })
      }
    },

    // Inject Collect.js into document head
    // ! Do not use head property here because collect.js raises error if script tag has extra attrs like `data-n-head`
    injectCollectJS(callback) {
      this.removeCollectJS()
      const el = document.querySelector(
        'script[src="' + NMI_COLLECTJS_URL + '"]'
      )
      if (el) {
        callback()
      } else {
        const el = document.createElement('script')
        el.setAttribute(
          'src',
          NMI_COLLECTJS_URL,
        )
        el.setAttribute('data-tokenization-key', process.env.NMI_PUBLIC_KEY)
        el.async = true
        el.addEventListener('load', () => callback())
        document.head.appendChild(el)
      }
    },

    // Remove collectJS form elements and script tag
    removeCollectJS() {
      let el = document.querySelector(
        'script[src="' + NMI_COLLECTJS_URL + '"]'
      )
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
      this.addPaymentToken({
        paymentToken: this.paymentToken,
        amount: this.getTotal,
      })
      this.$axios
        .post('/preferences/payments/add-payment-cards', this.form)
        .then((res) => {

          // Render the success component
          if(!this.ctaLabel){
            this.showSuccess = true
          }
          this.payoutID = res.data.data.id
          this.checkModalContent()
          if(this.ctaLabel){
            this.payoutID = res.data.data.id
            this.defaultCardStatus = true
            this.addDefault()
          }
        })
        .catch((err) => {
          this.$logger.logToServer(
            'Preferences - Add Credit Cards',
            err.response.data.error
          )
          this.$toasted.error(this.$t('server.error'))
        })
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
        this.renderCardImage(details.card.type)
      } else {
        this.valueFields.cardNumber = details.ccnumber
        this.valueFields.cardName = details.ccname
        this.valueFields.cardMonth = details.ccexp.substring(0, 2)
        this.valueFields.cardYear = currentYear + details.ccexp.substring(3) // TODO: Added a random number 20.
        this.valueFields.cardCvv = '***' // Added *** because cvv is not available from collectjs.
        this.valueFields.cardBrand = details.cctype
        // // Render the image
        this.renderCardImage(details.cctype)
      }
    },
    // Update the status to default
    addDefault() {
      // If the checkbox is checked
      if (this.defaultCardStatus) {
        this.$axios
          .put(`/preferences/payments/update-default-status/${this.payoutID}`)
          .then((res) => {
            this.closeAndReload()
          })
          .catch((err) => {
            this.$logger.logToServer(
              'Perferences Default Status Update',
              err.response.data
            )
            this.$toasted.error(this.$t(err.response.data.message))
            this.closeAndReload()
          })
      } else {
        this.closeAndReload()
      }
    },
    // Close the modal , clear the stored ids and reload
    closeAndReload() {
      this.isSaving = false
      if (!this.isInlineMode) {
        this.payoutID = ''
      } 
      this.$bvModal.hide('payment-methods-modal')
      this.$emit('complete')      
    },
    // Render the card brand image
    renderCardImage(type) {
      try {
         this.cardImage = require(`~/assets/img/preferences/${type.toLowerCase()}-logo.svg`)
      } catch (error) {
         this.cardImage = require('~/assets/img/preferences/visa-logo.svg')
      }
    }
  }
}
</script>
