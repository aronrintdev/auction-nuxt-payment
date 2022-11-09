<template>
  <div :class="{'store-details p-4' : !mobileClass}">

    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
        <div :class="{'mobile-form-box px-3 py-2 mb-4' : mobileClass}">
          <div class="d-flex justify-content-between align-items-center">
            <div class="title"
                 :class="mobileClass.length ? 'body-10-bold font-weight-bold text-blue-20' : 'heading-3-normal'">
              {{ $t('vendor_hub.store_details') }}
            </div>
            <Button
              v-if="!isEditModeActive"
              :tooltip-text="$t('common.edit')"
              class="btn-edit-inventory ml-5 mr-2"
              variant="link"
              @click="editActivation"
            ></Button>
          </div>
          <b-row class="mt-4 flex justify-content-between">
            <b-col sm="12" md="3">
            <ValidationProvider
              v-slot="validationContext"
              :name="$t('vendor_hub.form.store_name')"
              :rules="{ required: true }"
              class="w-100"
            >
              <b-form-group
                label-for="storeName"
                class="w-100 mr-sm-5"
                :label="$t('vendor_hub.form.store_name')"
              >
                <b-input-group>
                  <b-form-input
                    id="storeName"
                    v-model="applyForm.store"
                    :disabled="!isEditModeActive"
                    :placeholder="$t('vendor_hub.form.store_name')"
                    :state="getValidationState(validationContext)"
                    class="rounded-pill field-input"
                    :class="mobileClass"
                    type="text">
                  </b-form-input>

                  <b-form-invalid-feedback>{{
                      validationContext.errors[0]
                    }}
                  </b-form-invalid-feedback>
                </b-input-group>
              </b-form-group>
            </ValidationProvider>
          </b-col>
          <b-col sm="12" md="3">
            <ValidationProvider
              v-slot="validationContext"
              :name="$t('vendor_hub.form.phone_number')"
              :rules="{ required: true, min: 7 }"
              class="w-100"
            >
              <b-form-group label-for="phoneNumber" class="w-100" :label="$t('vendor_hub.form.phone_number')">
                <b-input-group>
                  <b-form-input
                    id="phoneNumber"
                    v-validate="'alpha'"
                    :disabled="!isEditModeActive"
                    :placeholder="$t('vendor_hub.form.phone_number')"
                    :state="getValidationState(validationContext)"
                    :value="applyForm.phone"
                    class="rounded-pill field-input"
                    :class="mobileClass"
                    @input="phoneChanged"></b-form-input>
                  <span
                    v-if="isEditModeActive && !isVerified && codeSent && codeTry===0"
                    class="verify-button text-right ml-auto my-1 mr-1"
                    role="button" 
                    @click="resendCode"
                  >
                    {{ $t('vendor_hub.form.resend_code') }}
                  </span>
                </b-input-group>
                <b-form-invalid-feedback>{{
                    validationContext.errors[0]
                  }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
          </b-col>
            <b-col sm="12" md="3">
            <b-form-group
            v-if="codeSent && !mobileClass"
            class="d-flex flex-column w-100"
            label-for="verificationCode"
          >
            <template #label>
              <div class="d-flex justify-content-between">
                <span>{{ $t('vendor_hub.store_details_tab.verification_code') }}</span>
                <span v-if="!isVerified" class="d-flex align-items-center">
                <ClockIcon :stroke-color="secondsLeft<=60? '#de0100' : '#32BD40'" style="height: 14px"></ClockIcon>
                <vue-countdown
                  v-if="codeSent"
                  v-slot="{minutes, seconds, totalSeconds}"
                  :auto-start="true"
                  :time="VERIFICATION_TIMER"
                  :transform="transformSlotProps"
                  @end="onCountdownEnd"
                  @progress="onTimerProgress">
                   <span :class="totalSeconds<=60? 'less-minute' : ''" class="ml-2 countdown-text">
                    {{ minutes }}: {{ seconds }}
                  </span>
                </vue-countdown>

              </span>
              </div>
            </template>
            <b-input-group>
              <b-form-input
                id="verificationCode"
                v-model="applyForm.code"
                :class="[isVerified? 'verified-input border-right-0' : 'rounded-pill field-input', mobileClass]"
                :placeholder="$t('vendor_hub.form.enter_code')"
                :state="showCodeFailError"

                type="text">
              </b-form-input>
              <b-form-invalid-feedback>
                {{ $tc('vendor_hub.invalid_code', codeTry) }}
              </b-form-invalid-feedback>
              <b-input-group-append v-if="isVerified"
                                    class="verified-input border-left-0 d-flex align-items-center px-2">
                <span class="mr-1">{{ $t('vendor_hub.verified') }}</span> <img
                :src="require('~/assets/img/profile/vendor-hub/check-outline.svg')">
              </b-input-group-append>
            </b-input-group>

            <div v-if="!isVerified" class="d-flex flex-column align-items-end">
              <span v-if="showCodeFailError !== false" class="enter-vrf-code ml-auto ">
                {{ $t('vendor_hub.store_details_tab.enter_code') }}
              </span>
            </div>

          </b-form-group>
          </b-col>
          </b-row>

        </div>

        <hr v-if="!mobileClass" class="mt-4 mb-4" />

        <div :class="{'mobile-form-box px-3 py-2' : mobileClass}">
          <div class="d-flex flex-column flex-sm-row justify-content-between">
          <div class="title"
               :class="mobileClass.length ? 'body-10-bold font-weight-bold text-blue-20 pt-2' : 'heading-3-normal'">
            {{ $t('vendor_hub.store_address') }}
          </div>
          <span v-if="isAddressValid === false"
                class="invalid-header ml-3">{{ $t('vendor_hub.error_messages.enter_valid_address') }}</span>
        </div>

          <b-row class="mt-4 flex justify-content-between">
            <b-col sm="12" md="3">
              <ValidationProvider
                v-slot="validationContext"
                :name="$t('vendor_hub.store_details_tab.shipping_address')"
                :rules="{ required: true, min: 5 }"
                class="w-100"
              >
                <b-form-group
                  label-for="shippingAddress"
                  class="w-100"
                  :label="$t('vendor_hub.store_details_tab.shipping_address')"
                >
                  <b-input-group>
                    <b-form-input
                      id="shippingAddress"
                      v-model="applyForm.address"
                      :disabled="!isEditModeActive"
                      :placeholder="$t('vendor_hub.store_details_tab.shipping_address')"
                      :state="getValidationState(validationContext)"
                      class="rounded-pill field-input"
                      :class="mobileClass"
                      type="text"
                      @input="isAddressValid=false"></b-form-input>
                    <b-form-invalid-feedback>{{
                        validationContext.errors[0]
                      }}
                    </b-form-invalid-feedback>
                  </b-input-group>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col sm="12" md="3">
              <ValidationProvider
                v-slot="validationContext"
                :name="$t('vendor_hub.store_details_tab.apt_suite')"
                :rules="{ required: true, min: 5 }"
                class="w-100"
              >
                <b-form-group
                  class="w-100"
                  label-for="aptSuite"
                  :label="$t('vendor_hub.store_details_tab.apt_suite')"
                >
                  <b-input-group>
                    <b-form-input
                      id="aptSuite"
                      v-model="applyForm.suiteno"
                      :disabled="!isEditModeActive"
                      :placeholder="$t('vendor_hub.store_details_tab.apt_suite')"
                      :state="getValidationState(validationContext)"
                      class="rounded-pill field-input"
                      :class="mobileClass"
                      type="text"></b-form-input>
                      <b-form-invalid-feedback>{{
                        validationContext.errors[0]
                      }}
                    </b-form-invalid-feedback>
                  </b-input-group>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col sm="12" md="3">
              <ValidationProvider
                v-slot="validationContext"
                :name="$t('vendor_hub.form.city')"
                :rules="{ required: true }"
                class="w-100"
              >
                <b-form-group
                  label-for="city"
                  :label="$t('vendor_hub.form.city')"
                >
                  <b-input-group>
                    <b-form-input
                      id="city"
                      v-model="applyForm.city"
                      :disabled="!isEditModeActive"
                      :placeholder="$t('vendor_hub.form.city')"
                      :state="getValidationState(validationContext)"
                      class="rounded-pill field-input"
                      :class="mobileClass"
                      type="text"></b-form-input>
                    <b-form-invalid-feedback>{{
                        validationContext.errors[0]
                      }}
                    </b-form-invalid-feedback>
                  </b-input-group>
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>

          <b-row class="mt-4 flex justify-content-between">
            <b-col sm="12" md="3">
              <ValidationProvider
                v-slot="validationContext"
                :name="$t('vendor_hub.form.state')"
                :rules="{ required: true,min: 2 }"
                class="w-100"
              >
                <b-form-group
                  label-for="state"
                  class="w-100"
                  :label="$t('vendor_hub.form.state')"
                >
                  <b-input-group>
                    <b-form-input
                      id="state"
                      v-model="applyForm.state"
                      :disabled="!isEditModeActive"
                      :placeholder="$t('vendor_hub.form.state')"
                      :state="getValidationState(validationContext)"
                      class="rounded-pill field-input"
                      :class="mobileClass"
                      type="text"></b-form-input>
                    <b-form-invalid-feedback>{{
                        validationContext.errors[0]
                      }}
                    </b-form-invalid-feedback>
                  </b-input-group>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col sm="12" md="3">
              <ValidationProvider
                v-slot="validationContext"
                :name="$t('vendor_hub.form.zip_code')"
                :rules="{ required: true,min: 5 }"
                class="w-100"
              >
                <b-form-group
                  class="w-100"
                  label-for="zipCode"
                  :label="$t('vendor_hub.form.zip_code')"
                >
                  <b-input-group>
                    <b-form-input
                      id="zipCode"
                      v-model="applyForm.zipcode"
                      :disabled="!isEditModeActive"
                      :placeholder="$t('vendor_hub.form.zip_code')"
                      :state="getValidationState(validationContext)"
                      class="rounded-pill field-input"
                      :class="mobileClass"
                      type="number"></b-form-input>
                    <b-form-invalid-feedback>{{
                        validationContext.errors[0]
                      }}
                    </b-form-invalid-feedback>
                  </b-input-group>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col sm="12" md="3">
              <ValidationProvider
                v-slot="validationContext"
                :name="$t('vendor_hub.form.country')"
                :rules="{ required: true }"
                class="w-100"
              >
                <b-form-group
                  class="w-100"
                  label-for="phoneNumber"
                  :label="$t('vendor_hub.form.country')"
                >
                  <b-input-group id="countryField">
                    <b-form-select
                      v-model="applyForm.country"
                      :disabled="!isEditModeActive" :options="countries"
                      :state="getValidationState(validationContext)"
                      class="rounded-pill field-input form-control"
                      :class="mobileClass"
                      size="sm"
                    >
                      <template #first>
                        <b-form-select-option :value="null" disabled>{{
                            $t('vendor_hub.form.country')
                          }}
                        </b-form-select-option>
                      </template>
                    </b-form-select>
                  </b-input-group>
                  <b-form-invalid-feedback>{{
                      validationContext.errors[0]
                    }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>
        </div>

        <div v-if="isEditModeActive" class="d-flex justify-content-center flex-sm-row-reverse pr-1">
          <Button pill type="button" variant="outline-dark" class="mt-4 mt-md-0 mx-1 mx-md-3" @click="discardClick">
           <span :class="{'body-9-medium px-1': mobileClass}">{{ $t('vendor_hub.payout_method.discard_changes') }}</span>
          </Button>
          <Button :disabled="codeTry<=0 || isAddressValid || updateLoading"
                  class="bg-blue-2 mt-4 mt-md-0 mx-1 mx-md-3"
                  pill type="submit">
           <span :class="{'body-9-medium px-1': mobileClass}">{{ $t('vendor_hub.payout_method.save_changes') }}</span>
          </Button>
        </div>
      </b-form>
    </ValidationObserver>

    <div v-if="!isEditModeActive"
         class="d-flex align-items-center justify-content-between faq-card mt-4 mx-auto"
         :class="mobileClass ? 'body-5-medium' : ''"
         role="button"
         @click="$router.push({path: '/faqs/vendor-hub'})">
      <span class="faq-title" :class="mobileClass ? 'body-5' : 'body-7'">
        {{ $t('vendor_hub.faq') }}
      </span>
      <img :src="require('~/assets/img/profile/vendor-hub/arrow-circle-right.svg')">
    </div>

    <vue-bottom-sheet
      ref="mobileVerification"
      class="responsive-filter"
      max-width="auto"
      max-height="100vh"
    >
      <MobileVerificationCode :codeSent="codeSent"
                              :isVerified="isVerified"
                              :codeTry="codeTry"
                              :showCodeFailError="showCodeFailError"
                              @resendCode="resendCode"
                              @ended="onCountdownEnd"
                              @submit="verifySentCode"
                              @close="closeMobileVerificationPopup" />
    </vue-bottom-sheet>

    <ConfirmModal
        :confirm-text="confirmButtonText"
        :save-modal-body="confirmModalBody"
        :show-confirm="confirmModal"
        @confirm-hidden="confirmModal = false"
        @confirm-accept="actionOk"
    />
    <SuccessModal
        :show-success="finishedModal"
        :success-modal-body="$t('vendor_hub.payout_method.changes_saved')"
        @success-hidden="finishedModal = false"
    />
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import VueCountdown from '@chenfengyuan/vue-countdown'
import {ValidationObserver, ValidationProvider} from 'vee-validate'
import {countries} from '~/static/location'
import {Button} from '~/components/common';
import {
  COUNTRIES,
  countryRestriction,
  UNPROCESSABLE_ENTITY,
  VERIFICATION_CODE_TRY_COUNT,
  VERIFICATION_TIMER,
  VERIFICATION_TIMER_SECONDS
} from '~/static/constants';
import {GOOGLE_MAPS_BASE_URL} from '~/static/constants/environments';
import ClockIcon from '~/components/profile/vendor-hub/ClockIcon';
import SuccessModal from '~/components/profile/vendor-hub/SuccessModal';
import ConfirmModal from '~/components/profile/vendor-hub/ConfirmModal';
import screenSize from '~/plugins/mixins/screenSize';
import MobileVerificationCode from '~/components/profile/vendor-hub/MobileVerificationCode';

export default {
  name: 'StoreDetails',
  components: {
    MobileVerificationCode,
    ClockIcon, Button, VueCountdown, SuccessModal, ConfirmModal, ValidationObserver, ValidationProvider},
  mixins:[screenSize],
  data() {
    return {
      VERIFICATION_TIMER,
      confirmModal: false,
      finishedModal: false,
      countries,
      isEditModeActive: false,
      isVerified: false,
      codeSent: false,
      isAddressValid: null,
      isStoreNameValid: null,
      codeTry: VERIFICATION_CODE_TRY_COUNT,
      applyForm: {
        country: null,
        store: null,
        address: '',
        city: '',
        state: '',
        zipcode: '',
        phone: '',
        suiteno: '',
        certified_reseller: false,
        code: ''
      },
      applyFormOld: {
        country: null,
        store: null,
        address: '',
        city: '',
        state: '',
        zipcode: '',
        phone: '',
        suiteno: '',
        certified_reseller: false,
        code: ''
      },
      updateLoading: false,
      showCodeFailError: null,
      isDiscard: false,
      secondsLeft: VERIFICATION_TIMER_SECONDS
    }
  },
  computed: {
    confirmModalBody() {
      return this.isDiscard ? this.$t('vendor_hub.discard_body') : this.$t('vendor_hub.payout_method.save_changes_body')
    },
    confirmButtonText() {
      return this.isDiscard ? this.$t('vendor_hub.discard') : this.$t('common.save')
    },
    selectedCountryDialCode() {
      const country = COUNTRIES.filter(country => country.code === this.applyForm.country)
      return country.length > 0 ? country[0].dial_code : '+1'
    }
  },
  watch: {
    codeSent(v) {
      if (v && this.mobileClass) {
        const { mobileVerification } = this.$refs
        mobileVerification.open()
      }
    }
  },
  mounted() {
    this.initData()
    this.injectGoogleMapsApi()
    setTimeout(() => {
      this.initGoogleAutoComplete()
    }, 2000)
  },
  methods: {
    ...mapActions({
      updateVendor: 'vendor-hub/updateVendor',
      sendVerificationCode: 'vendor-hub/sendVerificationCode',
      verifyCode: 'vendor-hub/verifyCode',
      fetchVendorData: 'vendor-hub/fetchVendorData',
    }),
    /**
     * Formatting the props to be used in the timer template.
     * @param {Object} props
     * @param {number} props.days
     * @param {number} props.hours
     * @param {number} props.minutes
     * @param {number} props.seconds
     * @param {number} props.milliseconds
     * @param {number} props.totalDays
     * @param {number} props.totalHours
     * @param {number} props.totalMinutes
     * @param {number} props.totalSeconds
     * @param {number} props.totalMilliseconds
     * @return {Object}
     */
    transformSlotProps(props) {
      const formattedProps = {};
      // it checks if seconds or minute value less then 10 then it adds 0
      Object.entries(props).forEach(([key, value]) => {
        formattedProps[key] = value < 10 ? `0${value}` : String(value);
      });

      return formattedProps;
    },
    phoneChanged(p) {
      if (!p.startsWith(this.selectedCountryDialCode)) {
        this.applyForm.phone = this.selectedCountryDialCode + p
      } else {
        this.applyForm.phone = p
      }
    },
    clearAddress() {
      this.applyForm = {
        ...{
          country: null,
          store: null,
          city: '',
          state: '',
          zipcode: '',
          phone: '',
          suiteno: '',
          certified_reseller: false,
          code: ''
        }, address: this.applyForm.address, store: this.applyFormOld.store, phone: this.applyFormOld.phone
      }
    },
    onTimerProgress(data) {
      this.secondsLeft = data.totalSeconds
    },
    /**
     * Called when countdown ends
     */
    onCountdownEnd() {
      this.codeSent = false
    },
    /**
     * Fetching data from the api and then setting the data to the form.
     */
    initData() {
      this.fetchVendorData().then(res => {
        const info = res.data.data
        this.isEditModeActive = true
        const data = {
          country: info.address.country,
          store: info.store_name,
          address: info.address.address_line_2,
          city: info.address.city,
          state: info.address.state,
          zipcode: info.address.zip,
          phone: info.address.phone,
          suiteno: info.address.address_line_1,
          certified_reseller: info.certified_reseller,
          code: ''
        }
        this.applyForm = data
        this.applyFormOld = JSON.parse(JSON.stringify(data))
        this.isEditModeActive = false
      })
    },
    discardClick() {
      this.isDiscard = true
      this.confirmModal = true
    },
    changeClick() {
      this.isDiscard = false
      if (this.isFormValid()) {
        this.confirmModal = true
      }
    },
    /**
     * Method that is called when user clock modal confirmation button
     * If modal is discard modal then it resets form else updates vendor info
     */
    actionOk() {
      if (this.isDiscard) {
        this.applyForm = JSON.parse(JSON.stringify(this.applyFormOld))
        this.isEditModeActive = false
        this.isDiscard = false
        this.confirmModal = false
        this.codeSent = false
      } else {
        this.patchVendor()
      }
    },
    /**
     * Checking if the form is valid.
     * @return {boolean}
     */
    isFormValid() {
      this.isStoreNameValid = !this.applyForm.store ? false : null
      this.isAddressValid =
          (!this.applyForm.address || !this.applyForm.state || !this.applyForm.state || !this.applyForm.city || !this.applyForm.country || !this.applyForm.zipcode)
              ? false : null

      return this.isStoreNameValid === null && this.isAddressValid === null
    },
    editActivation() {
      this.codeSent = false
      this.isEditModeActive = true
    },
    onSubmit() {
      this.changeClick()
    },
    getValidationState({dirty, validated, valid = null}) {
      // Returns the contextual state (validation style) of the element being validated (false for invalid, true for valid, or null for no validation state)
      return dirty || validated ? valid : null
    },
    /**
     * A method that is called when the user clicks the confirm button in the modal. It is verifying the code that the user
     * has entered.
     */
    verifySentCode(mobileFormCode = null) {
      this.codeTry--;
      if (this.codeTry > 0) {
        this.verifyCode({
          code:  mobileFormCode !== null ? mobileFormCode : this.applyForm.code,
          phone: this.applyForm.phone,
        }).then(res => {
          this.isVerified = true
          this.applyFormOld.phone = this.applyForm.phone
        }).catch(err => {
          this.$toasted.error(err)
          this.showCodeFailError = false
        }).finally(() => {
          this.confirmModal = false
        })
      }
    },
    /**
     * Update vendor with checking if phone changed, if yes then verify phone first
     */
    patchVendor() {
      this.confirmModal = false
      if (this.applyFormOld.phone !== this.applyForm.phone && !this.codeSent) {
        this.sendCode()
      } else {
        this.updateLoading = false
        this.updateVendor(
            {
              ...this.applyForm,
              store_name: this.applyForm.store,
              store_address: this.applyForm.address,
              apt_number: this.applyForm.suiteno,
              zip_code: this.applyForm.zipcode,
            }).then(res => {
          this.showCodeFailError = null
          this.isVerified = true
          this.finishedModal = true
          this.isEditModeActive = false
          this.$toasted.show(this.$t(res.data.message).toString())
        }).catch(err => {
          if (err.response.status === UNPROCESSABLE_ENTITY) {
            if (Object.keys(err.response.data.errors).includes('code')) {
              this.showCodeFailError = false
              this.codeTry--
            }
          } else {
            this.$toasted.error(this.$t(err.response.data.message).toString())
          }
        }).finally(() => {
          this.updateLoading = false
        })
      }
    },
    /**
     * Resend a verification code to the user's phone number.
     */
    resendCode() {
      this.codeTry = VERIFICATION_CODE_TRY_COUNT
      this.showCodeFailError = null
      this.codeSent = false
      this.sendCode()
    },
    /**
     * Sending a verification code to the user's phone number.
     */
    sendCode() {
      this.sendVerificationCode({phone: this.applyForm.phone}).then(res => {
        this.codeSent = true
        this.codeTry = VERIFICATION_CODE_TRY_COUNT
      }).catch(err => {
        this.$toasted.error(err.message)
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
    /**
     * Initializing the Google Autocomplete API.
     */
    initGoogleAutoComplete() {
      // Google Places Autocomplete API
      const autocomplete = new window.google.maps.places.Autocomplete(
          document.getElementById('shippingAddress'),
          {
            componentRestrictions: {country: countryRestriction},
          }
      )

      autocomplete.addListener('place_changed', () => {
        this.isAddressValid = null
        this.clearAddress()
        const place = autocomplete.getPlace()
        let component = {}
        for (component of place.address_components) {
          const componentType = component.types[0]

          switch (componentType) {
            case 'street_number': {
              this.applyForm.suiteno = component.long_name
              break
            }
            case 'route': {
              this.applyForm.address =
                  this.applyForm.suiteno + ' ' + component.short_name
              break
            }
            case 'locality': {
              this.applyForm.city = component.long_name
              break
            }
            case 'administrative_area_level_1': {
              this.applyForm.state = component.short_name

              break
            }
            case 'postal_code': {
              this.applyForm.zipcode = component.short_name

              break
            }
            case 'country': {
              this.applyForm.country = component.short_name
              break
            }
          }
        }
        if (!this.applyForm.address) {
          this.applyForm.address = place.formatted_address
        }
      })
    },
    closeMobileVerificationPopup() {
      const { mobileVerification } = this.$refs
      if (mobileVerification) {
        mobileVerification.close()
        this.codeSent = false
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.faq-title
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $medium
  color: $color-blue-20

.faq-card
  max-width: 800px
  padding: 1rem
  border: 0.5px solid $color-gray-14
  border-radius: 8px

.countdown-text
  @include body-8
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $regular
  color: $color-green-15
  min-width: 55px

  &.less-minute
    color: $color-red-3


.invalid-header
  @include body-9
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $regular
  color: $color-red-3

.form-control.verified-input
  border-radius: 50rem 0 0 50rem
  border: 1px solid $color-green-15

.input-group-append.verified-input
  @include body-5
  background-color: $color-gray-1
  border-radius: 0 50rem 50rem 0
  color: $color-green-15
  border: 1px solid $color-green-15
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $normal

.enter-vrf-code
  @include body-6
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $regular
  color: $color-blue-2

.verify-button
  @include body-5
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $normal
  text-decoration-line: underline

.field-input
  @include body-5
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $normal
  background-color: $color-gray-1
  border-radius: 20px
  border: none
  padding: 10px 20px
  height: 42px
  width: 100%

  &.is-invalid
    border: 1px solid $color-red-3

  &:focus
    outline: none
    background-color: $color-gray-1

  &.mobile
    @include body-5
    font-family: $font-family-montserrat
    font-style: normal
    font-weight: $normal
    background-color: $color-white-1 !important
    padding: 10px 20px
    width: 100%
    height: 59px
    border: 1px solid $input-mobile-border-color
    border-radius: 10px !important

.title
  font-family: $font-family-montserrat
  font-style: normal

.store-details
  border: 1px solid $color-gray-29
  border-radius: 4px
  height: max-content

::v-deep label.d-block
  @include body-5
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $normal

.btn-edit-inventory.btn
  width: 30px
  height: 30px
  background-image: url('~/assets/img/product/actions.png')
  background-position: center
  border: none
  border-radius: 4px

::v-deep.form-control:disabled
  @include body-5
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $normal
  background: $color-white-5

.bg-blue-2.btn
  background: $color-blue-2
  border: 1px solid $color-blue-2

.m-40
  margin-left: 40px

.mobile-form-box
  box-shadow: 0px 1px 4px rgba($color-black-1, 0.25)
  border-radius: 10px
  padding-bottom: 3px

.text-blue-20
  color: $color-blue-20
</style>
