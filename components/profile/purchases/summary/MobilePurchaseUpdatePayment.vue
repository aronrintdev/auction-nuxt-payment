<template>
  <div>
    <ValidationObserver ref="observer">
      <form ref="paymentForm">
        <b-row class="update-payment-information">
          <b-col class="purchase-summary-details" cols="12">
          <span class="title-text">{{
              $t('vendor_purchase.add_new_billing_address')
            }}
          </span>
            <div class="subtitle-text body-21-regular mt-1">
              {{ $t('vendor_purchase.update_billing') }}
            </div>
            <b-row class="payment-row">
              <b-col md="4">
                <ValidationProvider
                    :name="$t('vendor_purchase.billing_address')"
                    rules="required"
                >
                  <b-form-group
                      id="input-billing-address-group"
                      slot-scope="{ valid, errors }"
                      :label="$t('vendor_purchase.billing_address')"
                      class="profile-label"
                  >
                    <b-form-input
                        id="input-billing-address"
                        v-model="address.address_line_1"
                        :state="errors[0] ? false : valid ? true : null"
                        class="profile-input"
                        type="text"
                    ></b-form-input>
                    <b-form-invalid-feedback id="inputLiveFeedback">
                      {{ errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>
              </b-col>
              <b-col md="4">
                <b-form-group
                    id="input-apt-suite"
                    :label="$t('vendor_purchase.apt_suite')"
                    class="profile-label"
                    label-for="input-apt-suite"
                >
                  <b-form-input
                      id="input-apt-suite"
                      v-model="address.address_line_2"
                      class="profile-input"
                      type="text"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <ValidationProvider
                    :name="$t('vendor_purchase.city')"
                    rules="required"
                >
                  <b-form-group
                      id="input-city"
                      slot-scope="{ valid, errors }"
                      :label="$t('vendor_purchase.city')"
                      class="profile-label"
                      label-for="input-city"
                  >
                    <b-form-input
                        id="input-city"
                        v-model="address.city"
                        :state="errors[0] ? false : valid ? true : null"
                        class="profile-input"
                        type="text"
                    ></b-form-input>
                    <b-form-invalid-feedback id="inputLiveFeedback">
                      {{ errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="6">
                <ValidationProvider
                    :name="$t('vendor_purchase.state')"
                    rules="required"
                >
                  <b-form-group
                      id="input-group"
                      slot-scope="{ valid, errors }"
                      :label="$t('vendor_purchase.state')"
                      class="profile-label text-left"
                      label-for="input"
                  >
                    <b-form-input
                        id="input"
                        v-model="address.state"
                        :state="errors[0] ? false : valid ? true : null"
                        class="profile-input"
                        type="text"
                    ></b-form-input>
                    <b-form-invalid-feedback id="inputLiveFeedback">
                      {{ errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>
              </b-col>

              <b-col cols="6">
                <ValidationProvider
                    :name="$t('vendor_purchase.zip_postalcode')"
                    rules="required|numeric"
                >
                  <b-form-group
                      id="input-zip-postal-code"
                      slot-scope="{ valid, errors }"
                      :label="$t('vendor_purchase.zip_postalcode')"
                      class="profile-label"
                      label-for="input-zip-postal-code"
                  >
                    <b-form-input
                        id="input-zip-postal-code"
                        v-model="address.zip"
                        :state="errors[0] ? false : valid ? true : null"
                        class="profile-input"
                        type="text"
                    ></b-form-input>
                    <b-form-invalid-feedback id="inputLiveFeedback">
                      {{ errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="4">
                <ValidationProvider
                    :name="$t('vendor_purchase.country')"
                    rules="required"
                >
                  <b-form-group
                      id="input-group"
                      slot-scope="{ valid, errors }"
                      :label="$t('vendor_purchase.country')"
                      class="profile-label text-left"
                      label-for="input"
                  >
                    <b-form-select
                        v-model="address.country"
                        :state="errors[0] ? false : valid ? true : null"
                        class="profile-input"
                    >
                      <b-form-select-option
                          v-for="country in countries"
                          :key="country.val"
                          :value="country.value"
                          class="profile-input"
                      >
                        {{ country.text }}
                      </b-form-select-option>
                    </b-form-select>
                    <b-form-invalid-feedback id="inputLiveFeedback">
                      {{ errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>
              </b-col>
            </b-row>

            <div class="title-text mt-4">
              {{ $t('vendor_purchase.add_new_card_info') }}
            </div>

            <div class="subtitle-text body-21-regular mt-1">
              {{ $t('vendor_purchase.enter_card') }}
            </div>

            <b-row>
              <b-col md="6">
                <label class="profile-label">{{ $t('preferences.payments.card_number') }}</label>
                <div id="card-number" class="payment-details">
                  <b-row v-if="loading">
                    <b-col class="text-center" md="12">
                      <b-spinner small></b-spinner>
                    </b-col>
                  </b-row>
                </div>
                <span
                    v-if="formErrors.ccnumber.message"
                    :class="formErrors.ccnumber.textClass"
                    class="p-2"
                >
                  <small>{{ formErrors.ccnumber.message }} </small>
                </span>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <label class="profile-label">{{ $t('preferences.payments.cardholder_name') }}</label>
                <div id="card-holder-name" class="payment-details">
                  <b-row v-if="loading">
                    <b-col class="text-center" md="12">
                      <b-spinner small></b-spinner>
                    </b-col>
                  </b-row>
                </div>
                <span
                    v-if="formErrors.checkname.message"
                    :class="formErrors.checkname.textClass"
                    class="p-2"
                >
                  <small>{{ formErrors.checkname.message }}</small>
                </span>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="6">
                <label class="profile-label">{{ $t('vendor_purchase.exp_date') }}</label>
                <div id="exp-date" class="payment-details">
                  <b-row v-if="loading">
                    <b-col class="text-center" md="12">
                      <b-spinner small></b-spinner>
                    </b-col>
                  </b-row>
                </div>
                <span
                    v-if="formErrors.ccexp.message"
                    :class="formErrors.ccexp.textClass"
                    class="p-2"
                >
                  <small>{{ formErrors.ccexp.message }}</small></span
                >
              </b-col>
              <b-col cols="6">
                <label class="profile-label">{{ $t('payments.cvv') }}</label>
                <div id="security-code" class="payment-details">
                  <b-row v-if="loading">
                    <b-col class="text-center" md="12">
                      <b-spinner small></b-spinner>
                    </b-col>
                  </b-row>
                </div>
                <span
                    v-if="formErrors.cvv.message"
                    :class="formErrors.cvv.textClass"
                    class="p-2"
                >
                  <small>{{ formErrors.cvv.message }}</small></span
                >
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <Button
            id="update-information"
            ref="update-information"
            :disabled="loading"
            :variant="`outline-dark-blue`"
            block
            class="mt-4"
            pill
            type="submit"
        >
          {{ $t('vendor_purchase.update_payment_info') }}
        </Button>

      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import {ValidationObserver, ValidationProvider} from 'vee-validate'
import {countries} from '~/static/location'
import {CARD_LAST_DIGITS_OFFSET} from '~/static/constants'
import {Button} from '~/components/common'
import {GOOGLE_MAPS_BASE_URL} from '~/static/constants/environments'
import {countryRestriction} from '~/static/constants/address'

export default {
  name: 'MobilePurchaseUpdatePayment',
  components: {
    ValidationObserver,
    ValidationProvider,
    Button,
  },
  props: {
    orderDetails: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      countries,
      address: {
        address_line_1: '',
        address_line_2: '',
        city: '',
        zip: '',
        state: '',
        country: '',
      },
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
      validInfoError: false,
      form: {
        card_holder_name: '',
        card_last_digits: '',
        card_expiry_date: '',
        card_cvv: '',
        card_brand: '',
        payment_token: '',
        amount: this.orderDetails.total,
      },
      saveForNextTime: true,
      paymentInfoUpdate: false,
      billingAddress: this.orderDetails.billing_address,
    }
  },


  mounted() {
    // Integrate collectJS on component mount
    this.injectCollectJS()

    this.injectGoogleMapsApi()

    // Create the autocomplete object, restricting the search predictions.
    const autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById('input-billing-address'),
        {
          componentRestrictions: {country: countryRestriction},
        }
    )
    // When the user selects an address from the drop-down,
    // populate the address fields in the form.
    autocomplete.addListener('place_changed', () => {
      // Get the place details from the autocomplete object.
      const place = autocomplete.getPlace()
      let component = {}

      // Get each component of the address from the place details,
      // and then fill-in the corresponding field on the form.
      // place.address_components are google.maps.GeocoderAddressComponent objects
      // which are documented at http://goo.gle/3l5i5Mr
      for (component of place.address_components) {
        const componentType = component.types[0]
        // Update the variables based on the address components.
        switch (componentType) {
          case 'street_number': {
            this.address.address_line_1 = component.long_name
            break
          }
          case 'route': {
            this.address.address_line_1 =
                this.address.address_line_1 + ' ' + component.short_name
            break
          }
          case 'locality': {
            this.address.city = component.long_name
            break
          }
          case 'administrative_area_level_1': {
            this.address.state = component.short_name
            break
          }
          case 'postal_code': {
            this.address.zip = component.short_name
            break
          }
          case 'country': {
            this.address.country = component.short_name
            break
          }
        }
      }
    })
  },

  unmounted() {
    this.removeCollectJS()
  },

  created() {
    const addr = this.billingAddress
    this.address = {...addr}
  },

  methods: {
    // UpdateInformation
    updateInformation() {
      this.$axios
          .put(`/purchases/${this.orderDetails.id}/payment-information`, {
            address: this.address,
            payment: this.form,
            savefor_next_time: this.saveForNextTime,
          })
          .then((res) => {
            this.paymentInfoUpdate = true
            this.$root.$emit('updatePaymentInfo', this.paymentInfoUpdate)
            this.$emit('update')
            this.$nuxt.refresh()
          })
          .catch((err) => {
            this.$nuxt.refresh()
            this.$toasted.error(this.$t(err.response.data.message))
          })
    },

    injectGoogleMapsApi() {
      if (window.google) {
        return false
      }

      const scriptTag = this.createScriptTag()
      scriptTag.src = GOOGLE_MAPS_BASE_URL

      this.insertScript(scriptTag)
    },
    // Create a new script tag without the src attribute.
    createScriptTag() {
      const scriptTag = document.createElement('script')
      scriptTag.type = 'text/javascript'
      scriptTag.async = true

      return scriptTag
    },
    // Insert a new script tag before the first found script tag.
    insertScript(scriptTag) {
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag)
    },

    // Remove Collect JS
    removeCollectJS() {
      let el = document.querySelector(
          'script[src="https://secure.networkmerchants.com/token/Collect.js"]'
      )
      if (el) document.head.removeChild(el)
      el = document.querySelector('iframe[id="CollectJSInlinecheckaba"]')
      if (el) el.parentNode.removeChild(el)
      el = document.querySelector('iframe[id="CollectJSInlinecheckaccount"]')
      if (el) el.parentNode.removeChild(el)
      el = document.querySelector('iframe[id="CollectJSInlinecheckname"]')
      if (el) el.parentNode.removeChild(el)
    },

    // Inject Collect.js into document head
    // Do not use head property here because collect.js raises error if script tag has extra attrs like `data-n-head`
    // TODO: Find a way to simplify this process.
    injectCollectJS() {
      const el = document.createElement('script')
      el.setAttribute(
          'src',
          'https://secure.networkmerchants.com/token/Collect.js'
      )
      el.setAttribute('data-tokenization-key', process.env.NMI_PUBLIC_KEY)
      el.async = true
      el.addEventListener('load', () => {
        /* Global CollectJS */
        // eslint-disable-next-line no-undef
        CollectJS.configure({
          paymentSelector: '#update-information',
          customCss: {
            width: '100%',
            'border-radius': '10px',
            'background-color': '#FFF',
            border: '1px solid #E8E8E8',
            height: '49px',
            padding: '14px 17px'
          },
          fields: {
            checkname: {
              selector: '#card-holder-name',
              title: this.$t('preferences.payments.cardholder_name'),
              placeholder: '',
            },
            ccnumber: {
              selector: '#card-number',
              title: this.$t('preferences.payments.card_number'),
              placeholder: '',
            },
            ccexp: {
              selector: '#exp-date',
              title: this.$t('preferences.payments.exp_date'),
              placeholder: '',
            },
            cvv: {
              selector: '#security-code',
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
          },
          fieldsAvailableCallback: () => {
            this.loading = false
          },
          callback: (response) => {
            // If token exists
            if (response.token) {
              this.validInfoError = false
              this.form.card_brand = response.card.type
              this.form.payment_token = response.token
              this.form.card_holder_name = response.check.name
              this.form.card_last_digits = response.card.number.slice(
                  response.card.number.length - CARD_LAST_DIGITS_OFFSET
              )
              this.form.card_expiry_date =
                  response.card.exp.substring(0, 2) +
                  '/' +
                  response.card.exp.substring(2)
              this.updateInformation()
            } else {
              this.validInfoError = true
            }
          },
        })
      })
      document.head.appendChild(el)
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/variables'

.update-payment-information
  background: $color-white-1
  box-shadow: 0 1px 4px rgba($color-black-1, 0.25)
  border-radius: 24px
  padding: 19px 22px

  .title-text
    color: $color-blue-20

  .subtitle-text
    color: $color-gray-5

  .profile-label
    @include body-6-medium
    font-family: $font-montserrat
    color: $color-gray-79c
    margin-top: 17px

  ::v-deep.form-group
    margin-bottom: 0

  .profile-input
    background: $color-white-1
    border: 1px solid $color-gray-3
    border-radius: 10px
    height: 49px

.col-form-label
  font-weight: $bold
</style>
