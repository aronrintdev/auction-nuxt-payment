<template>
  <div :class="(isScreenXS? 'm-3': '') + mobileClass" class="apply-vendor-page">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 p-0">
          <div class="mt-3">
            <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
              <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
                <div :class="{'bg-white pt-3 px-3 mb-4 rounded-lg mobile-form-box' : mobileClass }">

                  <component :is="mobileClass ? 'div' : 'h1'"
                             class="mt-sm-5 text-bold text-sm-center"
                             :class="{'body-14-medium text-color-blue' : mobileClass}">
                    {{ $t('vendor_hub.apply_title') }}
                  </component>

                  <component :is="mobileClass ? 'div' : 'h3'" class="text-sm-center mt-sm-5 mb-3 mb-sm-0">
                    {{ $t('vendor_hub.store_details') }}
                  </component>

                <ValidationProvider
                    v-slot="validationContext"
                    :name="$t('vendor_hub.form.store_name')"
                    :rules="{ required: true}"
                >
                  <b-form-group>
                    <b-input-group>
                      <label v-if="mobileClass" class="body-8-medium">{{  $t('vendor_hub.form.store_name') }}</label>
                      <b-form-input
                          id="storeField"
                          v-model="applyForm.store_name"
                          :class="mobileClass"
                          :placeholder="$t('vendor_hub.form.store_name')"
                          :state="getValidationState(validationContext)"
                          class="apply_form_input rounded-pill"
                          type="text"></b-form-input>
                      <b-form-invalid-feedback>{{
                          validationContext.errors[0]
                        }}
                      </b-form-invalid-feedback>
                    </b-input-group>
                  </b-form-group>
                </ValidationProvider>
                <ValidationProvider
                    v-slot="validationContext"
                    :name="$t('vendor_hub.form.store_address')"
                    :rules="{ required: true }"
                >
                  <b-form-group>
                    <b-input-group>
                      <label v-if="mobileClass" class="body-8-medium">{{  $t('vendor_hub.form.store_address') }}</label>
                      <b-form-input
                          id="addressField"
                          v-model="applyForm.store_address"
                          :class="mobileClass"
                          :placeholder="$t('vendor_hub.form.store_address')"
                          :state="getValidationState(validationContext)"
                          class="apply_form_input rounded-pill"
                          type="text"></b-form-input>
                      <b-form-invalid-feedback>{{
                          validationContext.errors[0]
                        }}
                      </b-form-invalid-feedback>
                    </b-input-group>
                  </b-form-group>
                </ValidationProvider>
                <div>
                  <div class="form-row">
                    <div class="col">
                      <ValidationProvider
                          v-slot="validationContext"
                          :name="$t('vendor_hub.form.city')"
                          :rules="{ required: true }"
                      >
                        <b-form-group>
                          <b-input-group>
                            <label v-if="mobileClass" class="body-8-medium">{{  $t('vendor_hub.form.city') }}</label>
                            <b-form-input
                                id="cityField"
                                v-model="applyForm.city"
                                :class="mobileClass"
                                :placeholder="$t('vendor_hub.form.city')"
                                :state="getValidationState(validationContext)"
                                class="apply_form_input rounded-pill"
                                type="text"></b-form-input>
                            <b-form-invalid-feedback>{{
                                validationContext.errors[0]
                              }}
                            </b-form-invalid-feedback>
                          </b-input-group>
                        </b-form-group>
                      </ValidationProvider>
                    </div>
                    <div class="col">
                      <ValidationProvider
                          v-slot="validationContext"
                          :name="$t('vendor_hub.form.state')"
                          :rules="{ required: true }"
                      >
                        <b-form-group>
                          <b-input-group>
                            <label v-if="mobileClass" class="body-8-medium">{{  $t('vendor_hub.form.state') }}</label>
                            <b-form-input
                                id="stateField"
                                v-model="applyForm.state"
                                :class="mobileClass"
                                :placeholder="$t('vendor_hub.form.state')"
                                :state="getValidationState(validationContext)"
                                class="apply_form_input rounded-pill"
                                type="text"></b-form-input>
                            <b-form-invalid-feedback>{{
                                validationContext.errors[0]
                              }}
                            </b-form-invalid-feedback>
                          </b-input-group>
                        </b-form-group>
                      </ValidationProvider>
                    </div>
                  </div>
                </div>

                <div>
                  <div class="form-row">
                    <div class="col">
                      <ValidationProvider
                          v-slot="validationContext"
                          :name="$t('vendor_hub.form.apt_suite')"
                      >
                        <b-form-group>
                          <b-input-group>
                            <label v-if="mobileClass" class="body-8-medium">{{  $t('vendor_hub.form.apt_suite') }}</label>
                            <b-form-input
                                id="suitenoField"
                                v-model="applyForm.apt_number"
                                :class="mobileClass"
                                :placeholder="$t('vendor_hub.form.apt_suite')"
                                :state="getValidationState(validationContext)"
                                class="apply_form_input rounded-pill"
                                type="text"></b-form-input>
                            <b-form-invalid-feedback>{{
                                validationContext.errors[0]
                              }}
                            </b-form-invalid-feedback>
                          </b-input-group>
                        </b-form-group>
                      </ValidationProvider>
                    </div>
                    <div class="col">
                      <ValidationProvider
                          v-slot="validationContext"
                          :name="$t('vendor_hub.form.zip_code')"
                          :rules="{ required: true }"
                      >
                        <b-form-group>
                          <b-input-group>
                            <label v-if="mobileClass" class="body-8-medium">{{  $t('vendor_hub.form.zip_code') }}</label>
                            <b-form-input
                                id="zipcodeField"
                                v-model="applyForm.zip_code"
                                :class="mobileClass"
                                :placeholder="$t('vendor_hub.form.zip_code')"
                                :state="getValidationState(validationContext)"
                                class="apply_form_input rounded-pill"
                                type="text"></b-form-input>
                            <b-form-invalid-feedback>{{
                                validationContext.errors[0]
                              }}
                            </b-form-invalid-feedback>
                          </b-input-group>
                        </b-form-group>
                      </ValidationProvider>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label v-if="mobileClass" class="body-8-medium">{{  $t('vendor_hub.form.country') }}</label>
                  <b-form-select id="countryField" v-model="applyForm.country"
                                 :class="mobileClass"
                                 :options="COUNTRIES" class="apply_form_input"
                                 size="sm"
                                 @change="countryChanged">
                    <template #first>
                      <b-form-select-option :value="null" disabled>{{
                          $t('vendor_hub.form.country')
                        }}
                      </b-form-select-option>
                    </template>
                  </b-form-select>
                </div>

                <div class="form-group">
                  <div class=" ">
                    <b-form-checkbox v-model="applyForm.certified_reseller" class="form-check-input ml-2"
                                     type="checkbox"
                                     @change="checkReseller">
                      <div class="consent-label position-relative">
                        <div v-b-popover.hover.top="$t('vendor_hub.form.info_popover')"
                             class="position-absolute mt-n2 mr-n3 pt-2 info-icon" role="button">
                          <img :src="require('~/assets/img/icons/info-blue.svg')" alt="">
                        </div>
                        {{ $t('vendor_hub.consent') }}
                      </div>
                    </b-form-checkbox>

                    <div v-if="fileForm.file" class="px-3">
                      <selectedFile :delete-action="false" :disabled="false" :file="fileForm.file" variant="white"
                                    @view="viewFile"/>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <ValidationProvider
                      v-slot="validationContext"
                      :name="$t('vendor_hub.form.phone_number')"
                      :rules="{ required: true }"
                  >
                    <b-form-group>
                      <b-input-group>
                        <label v-if="mobileClass" class="body-8-medium">{{  $t('vendor_hub.form.phone_number') }}</label>
                        <b-form-input
                            id="phoneField"
                            :class="mobileClass"
                            :placeholder="$t('vendor_hub.form.phone_number')"
                            :state="getValidationState(validationContext)"
                            :value="applyForm.phone"
                            class="apply_form_input rounded-pill"
                            type="text"
                            @input="phoneChanged"></b-form-input>

                        <b-form-invalid-feedback>{{
                            validationContext.errors[0]
                          }}
                        </b-form-invalid-feedback>
                      </b-input-group>
                    </b-form-group>
                  </ValidationProvider>
                </div>
                </div>
                <div v-if="!apply" class="text-center">
                  <Button :block="isScreenXS" :disabled="isSendCodeDisabled" class="submit-button" pill type="submit"
                          variant="primary">
                    {{ $t('vendor_hub.send_code') }}
                  </Button>
                </div>

                <!--Code sent form-->
                <div v-if="apply">
                  <p class=" text-center mt-2 mb-2">{{ $t('vendor_hub.form.code_sent') }}</p>
                  <div class="d-flex justify-content-center align-items-start ml-5">
                    <b-form-group>
                      <b-input-group class="d-flex flex-column">
                        <b-form-input
                            id="phoneField"
                            v-model="applyForm.code"
                            :class="applyForm.code.length>0?'focus':'' + mobileClass"
                            :placeholder="$t('vendor_hub.form.enter_code')"
                            :state="showCodeFailError"
                            autocomplete="off"
                            class="apply_form_input rounded-pill code-field"
                            maxlength="6"
                            pattern="\d*"
                            type="text"></b-form-input>
                        <b-form-invalid-feedback>
                          {{ $tc('vendor_hub.invalid_code', codeTry) }}
                        </b-form-invalid-feedback>
                      </b-input-group>
                    </b-form-group>
                    <div class="d-flex flex-column justify-content-center ml-3">
                      <div class="bg-black rounded d-flex align-items-center justify-content-center py-2 px-1">
                        <img :src="require('~/assets/img/profile/vendor-hub/white-clock.svg')" alt="">
                        <vue-countdown v-if="timerStarted" v-slot="{minutes, seconds}" :auto-start="true"
                                       :time="VERIFICATION_TIMER" :transform="transformSlotProps" @end="onCountdownEnd">
                          <span class="ml-2 clock-text">{{ minutes }}:{{ seconds }}</span>
                        </vue-countdown>
                      </div>
                      <span v-if="!timerStarted || codeTry<0" class="mt-2 resend-code" role="button"
                            @click="sendCode">{{ $t('vendor_hub.form.resend_code') }}</span>
                    </div>
                  </div>

                  <div class="form-check text-center mb-3 mt-3">
                    <b-form-checkbox v-model="applyForm.agree" class="form-check-input ml-2"
                                     maxlength="6" pattern="\d*" type="text">
                      <div class="consent-label position-relative">
                        <div v-b-popover.hover.top="$t('vendor_hub.form.info_popover')"
                             class="position-absolute mt-n2 mr-n3 info-icon" role="button"></div>
                        {{ $tc('vendor_hub.form.terms_conditions', 1) }} <a
                          href="#">{{ $tc('vendor_hub.form.terms_conditions', 2) }}</a>
                      </div>
                    </b-form-checkbox>
                  </div>
                  <div class="text-center">
                    <Button :disabled="codeTry<0 || formSubmitting" class="submit-button" pill variant="secondary"
                            @click.prevent="applyVendorForm">
                      {{ $t('vendor_hub.form.apply') }}
                    </Button>
                  </div>
                </div>
              </b-form>
            </ValidationObserver>
          </div>
        </div>
      </div>

      <!-- Modal Area For Certified Reseller Document Upload -->
      <SellerDocumentUploadModal :form="fileForm" :requirement="fileRequirement" :show="showDocModal2"
                                 @closed="modalClosed" @uploaded="fileUploaded"/>

      <SellerDocumentUploadMobile :form="fileForm" :requirement="fileRequirement" :show="showDocModal"
      @closed="modalClosed" @uploaded="fileUploaded"/>

    </div>
  </div>
</template>

<script>
import {ValidationObserver, ValidationProvider} from 'vee-validate'
import {mapActions, mapGetters} from 'vuex';
import VueCountdown from '@chenfengyuan/vue-countdown'
import {Button} from '~/components/common';
import {countries} from '~/static/location'
import SellerDocumentUploadModal from '~/components/profile/vendor-hub/SellerDocumentUploadModal';
import SellerDocumentUploadMobile from '~/components/profile/vendor-hub/SellerDocumentUploadMobile';
import SelectedFile from '~/components/profile/vendor-hub/SelectedFile';
import screenSize from '~/plugins/mixins/screenSize';
import {
  countryRestriction,
  UNPROCESSABLE_ENTITY,
  USER_STATUS_APPROVED,
  USER_STATUS_PENDING,
  VERIFICATION_TIMER
} from '~/static/constants';
import {GOOGLE_MAPS_BASE_URL} from '~/static/constants/environments';

export default {
  name: 'Apply',
  components: {
    ValidationProvider, VueCountdown,
    ValidationObserver, SelectedFile, SellerDocumentUploadModal, Button, SellerDocumentUploadMobile
  },
  mixins: [screenSize],
  layout: 'Profile',
  data() {
    return {
      VERIFICATION_TIMER,
      isAllInputDisabled: false,
      apply: false,
      COUNTRIES: countries,
      isSendCodeDisabled: false,
      applyForm: {
        country: null,
        store_name: null,
        store_address: '',
        city: '',
        state: '',
        zip_code: '',
        phone: '',
        apt_number: null,
        certified_reseller: false,
        agree: false,
        code: ''
      },
      fileForm: {
        file: null,
        permitNumber: '',
        date: ''
      },
      showDocModal: false,
      showDocModal2: false,
      codeTry: 3,
      showCodeFailError: null,
      timerStarted: false,
      formSubmitting: false
    }
  },
  computed: {
    ...mapGetters({
      vendorDocRequirements: 'vendor-hub/vendorDocRequirements',
      user: 'auth/user'
    }),
    fileRequirement() {
      return this.vendorDocRequirements.filter(req => req.name === 'Retail Certification')[0]
    },
    selectedCountryDialCode() {
      const country = this.COUNTRIES.filter(country => country.code === this.applyForm.country)
      return country.length > 0 ? country[0].dial_code : '+1'
    }
  },
  mounted() {
    this.routeUser()
    this.injectGoogleMapsApi()
    setTimeout(() => {
      this.initGoogleAutoComplete()
    }, 2000)

  },
  methods: {
    ...mapActions({
      sendVerificationCode: 'vendor-hub/sendVerificationCode',
      applyVendor: 'vendor-hub/applyVendor',
      verifyCode: 'vendor-hub/verifyCode'
    }),
    countryChanged(c) {
     this.applyForm.country = c
    },
    phoneChanged(p) {
      if (!p.startsWith(this.selectedCountryDialCode)) {
        this.applyForm.phone = this.selectedCountryDialCode + p
      } else {
        this.applyForm.phone = p
      }
    },
    transformSlotProps(props) {
      const formattedProps = {};

      Object.entries(props).forEach(([key, value]) => {
        formattedProps[key] = value < 10 ? `0${value}` : String(value);
      });

      return formattedProps;
    },
    onCountdownEnd() {
      this.timerStarted = false
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
    initGoogleAutoComplete() {
      // Google Places Autocomplete API
      const autocomplete = new window.google.maps.places.Autocomplete(
          document.getElementById('addressField'),
          {
            componentRestrictions: {country: countryRestriction},
          }
      )

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace()
        let component = {}
        for (component of place.address_components) {
          const componentType = component.types[0]

          switch (componentType) {
            case 'street_number': {
              this.applyForm.store_address = component.long_name

              break
            }
            case 'route': {
              this.applyForm.store_address =
                  this.applyForm.store_address + ' ' + component.short_name

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
              this.applyForm.zip_code = component.short_name

              break
            }
            case 'country': {
              this.applyForm.country = component.short_name
              break
            }
          }
        }
      })
    },
    getValidationState({dirty, validated, valid = null}) {
      // Returns the contextual state (validation style) of the element being validated (false for invalid, true for valid, or null for no validation state)
      return dirty || validated ? valid : null
    },
    checkReseller(val) {
      this.showDocModal = true
      this.$nextTick(() => {
        this.applyForm.certified_reseller = false
      })
    },
    /**
     * Reverts "showDocModal" to false when certification modal is closed
     */
    modalClosed() {
      this.showDocModal = false
    },
    fileUploaded(form) {
      this.fileForm = form
      this.applyForm.certified_reseller = true
    },
    sendCode() {
      this.sendVerificationCode({phone: this.applyForm.phone}).then(res => {
        this.timerStarted = true
        this.codeTry = 3
      }).catch(err => {
        this.$toasted.error(this.$t(err.response.data.message).toString())
      })
    },
    applyVendorForm() {
      this.showCodeFailError = null
      if (this.codeTry > 0 && this.applyForm.agree) {
        this.applyVendor(this.applyForm).then(res => {
          this.$auth.fetchUser()
          this.$router.push({path: '/profile/vendor-hub/application-received'})
        }).catch(err => {
          if (err.response.status === UNPROCESSABLE_ENTITY) {
            if (Object.keys(err.response.data.errors).includes('code')) {
              this.showCodeFailError = false
              this.codeTry--
            }
          }else{
            this.$toasted.error(this.$t(err.response.data.message).toString())
          }
        })
      }
    },
    onSubmit() {
      this.formSubmitting = true
      this.isSendCodeDisabled = true
      this.sendVerificationCode({phone: this.applyForm.phone}).then(res => {
        this.timerStarted = true
        this.codeTry = 3
        this.apply = true
      }).catch(err => {
        this.$toasted.error(err.message)
      }).finally(() => {
        this.isSendCodeDisabled = false
        this.formSubmitting = false
      })
    },
    viewFile() {
      this.showDocModal = true
    },
    routeUser() {
      return USER_STATUS_PENDING + USER_STATUS_APPROVED
      /*
      switch (this.user.vendor_status) {
        case USER_STATUS_PENDING:
          this.$router.push({
            path: '/profile/vendor-hub/application-received'
          })
          break;
        case USER_STATUS_APPROVED:
          this.$router.push({
            path: '/profile/vendor-hub'
          })
          break;
        default:
          break;
      }
       */
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.invalid-feedback
  width: max-content

.resend-code
  @include body-5
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $normal
  text-decoration-line: underline

.clock-text
  @include body-5
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $normal
  min-width: 45px


input.code-field
  width: 220px !important
  -moz-appearance: textfield

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button
    -webkit-appearance: none

  &.focus
    letter-spacing: 1.5em


.submit-button.btn
  min-width: 200px
  font-weight: $normal
  background-color: $color-blue-2
  border: none

  &[disabled="disabled"]
    background-color: $color-gray-4

.consent-label
  @include body-5
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $normal
  padding-top: 4px

.info-icon
  right: 0

.apply-vendor-page
  background-color: $color-gray-1
  height: 100%

  &.mobile
    background: $color-white-1

  .mobile-form-box
    box-shadow: 0px 1px 4px rgba($color-black-1, 0.25)
    border-radius: 10px
    padding-bottom: 3px

.apply_form_input
  @include body-5
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $normal
  background-color: $color-white-1
  border-radius: 20px
  border: none
  padding: 10px 20px
  height: 42px
  width: 100%

  &:focus
    outline: none

  &.is-invalid
    border: 1px solid $color-red-3

  &.mobile
    @include body-5
    font-family: $font-family-montserrat
    font-style: normal
    font-weight: $normal
    background-color: $color-white-1
    padding: 10px 20px
    width: 100%
    height: 59px
    border: 1px solid $input-mobile-border-color
    border-radius: 10px !important

.text-color-blue
  color: $color-blue-20

:deep()
  .custom-control-input:checked
    ~ .custom-control-label::before
      color: $white
      background-color: $black
      box-shadow: none
      border-radius: 2px
      border: 1px solid $black

:deep()
  .custom-control-input
    ~ .custom-control-label::before
      color: $white
      background-color: $white
      box-shadow: none
      border-radius: 2px
      border: 1px solid $black
</style>
