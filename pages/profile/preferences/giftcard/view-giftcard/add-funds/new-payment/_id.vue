<template>
  <div class="add-funds-section">
    <client-only v-if="isScreenXS">
      <Portal to="page-title"> {{ $t('giftcard_section.add_funds') }}</Portal>
      <Portal to="back-icon-slot">
        <img
          :src="require('~/assets/img/icons/back.svg')"
          alt="back-arrow"
          class="float-left"
          @click="
            $router.push(
              `/profile/preferences/giftcard/view-giftcard/add-funds/${getSelectedGiftCard.id}`
            )
          "
        />
      </Portal>
    </client-only>

    <ValidationObserver  v-if="isScreenXS" ref="observer" v-slot="{ handleSubmit }">
      <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
        <add-funds-component  v-if="isScreenXS" :details="getSelectedGiftCard">
          <!-- Add new payment information -->
          <b-col  v-if="isScreenXS" class="add-new-payment-flow" cols="12">
            <div class="add-payment-header">
              {{ $t('giftcard_section.add_new_paymentInfo') }}
            </div>

            <b-row class="add-address-form mt-24">
              <!-- First name -->
              <b-col class="input-row col-xs-12">
                <ValidationProvider
                  v-slot="validationContext"
                  :name="$t('shopping_cart.first_name')"
                  :rules="{ required: true, min: 3, max: 128 }"
                >
                  <b-form-group label-for="first-name">
                    <template id="form-label" #label
                      >{{ $t('shopping_cart.first_name') }}&ast;</template
                    >
                    <b-form-input
                      id="first-name"
                      v-model="form.inputFirstName"
                      class="w-100"
                      :state="getValidationState(validationContext)"
                    ></b-form-input>
                    <b-form-invalid-feedback>{{
                      validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>
              </b-col>
              <!-- ./First name -->

              <!-- Last name -->
              <b-col class="input-row">
                <ValidationProvider
                  v-slot="validationContext"
                  :name="$t('shopping_cart.last_name')"
                  :rules="{ required: true, min: 3, max: 128 }"
                >
                  <b-form-group label-for="last-name">
                    <template id="form-label" #label
                      >{{ $t('shopping_cart.last_name') }}&ast;</template
                    >
                    <b-form-input
                      id="last-name"
                      v-model="form.inputLastName"
                      class="w-100"
                      :state="getValidationState(validationContext)"
                    ></b-form-input>
                    <b-form-invalid-feedback>{{
                      validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>
              </b-col>
              <!-- ./ Last name -->
            </b-row>

            <!-- Billing Address -->
            <b-row class="add-address-form mt-15">
              <b-col cols="12" class="input-row">
                <ValidationProvider
                  v-slot="validationContext"
                  :name="$t('shopping_cart.address')"
                  :rules="{ required: true, min: 3, max: 255 }"
                >
                  <b-form-group label-for="address">
                    <template id="form-label" #label
                      >{{ $t('shopping_cart.address') }}&ast;</template
                    >
                    <b-form-input
                      id="address"
                      v-model="form.inputAddressLine"
                      class="w-100"
                      :state="getValidationState(validationContext)"
                    ></b-form-input>
                    <b-form-invalid-feedback>{{
                      validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>
              </b-col>
            </b-row>
            <!-- ./ Billing Address -->

            <b-row class="add-address-form mt-15">
              <!-- Apt Suite -->
              <b-col class="input-row">
                <b-form-group
                  :label="$t('shopping_cart.apt_suite')"
                  label-for="apt-suite"
                >
                  <b-form-input
                    id="apt-suite"
                    v-model="form.inputAptSuite"
                    class="w-100"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <!-- ./ Apt suite -->

              <!-- City -->
              <b-col class="input-row">
                <ValidationProvider
                  v-slot="validationContext"
                  :name="$t('shopping_cart.city')"
                  :rules="{ required: true, min: 3, max: 64 }"
                >
                  <b-form-group label-for="city">
                    <template #label
                      >{{ $t('shopping_cart.city') }}&ast;</template
                    >
                    <b-form-input
                      id="city"
                      v-model="form.inputCity"
                      class="w-100"
                      :state="getValidationState(validationContext)"
                    ></b-form-input>
                  </b-form-group>
                  <b-form-invalid-feedback>{{
                    validationContext.errors[0]
                  }}</b-form-invalid-feedback>
                </ValidationProvider>
              </b-col>
              <!-- ./City -->
            </b-row>

            <b-row class="add-address-form mt-15">
              <!-- State -->
              <b-col class="input-row">
                <ValidationProvider
                  v-slot="validationContext"
                  :name="$t('shopping_cart.state')"
                  :rules="{ required: true, min: 3, max: 64 }"
                >
                  <b-form-group label-for="state">
                    <template #label
                      >{{ $t('shopping_cart.state') }}&ast;</template
                    >
                    <b-form-input
                      id="state"
                      v-model="form.inputState"
                      class="w-100"
                      :state="getValidationState(validationContext)"
                    ></b-form-input>
                    <b-form-invalid-feedback>{{
                      validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>
              </b-col>
              <!-- ./State -->

              <!-- Country -->
              <b-col class="input-row">
                <ValidationProvider
                  v-slot="validationContext"
                  :name="$t('shopping_cart.country')"
                  :rules="{ required: true }"
                >
                  <b-form-group label-for="country">
                    <template #label
                      >{{ $t('shopping_cart.country') }}&ast;</template
                    >
                    <b-form-select
                      id="country"
                      v-model="form.inputCountry"
                      :options="countryOptions"
                      required
                      class="w-100"
                    ></b-form-select>
                    <b-form-invalid-feedback>{{
                      validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>
              </b-col>
              <!-- ./Country -->
            </b-row>
          </b-col>
        </add-funds-component>
      
        <div  v-if="isScreenXS" class="total-amount d-flex justify-content-end w-100 float-right text-align-center align-items-center">
          {{ $t('common.total') }}&colon; &dollar;{{ amount | formatPrice }}
        </div>

        <div  v-if="isScreenXS" class="bottom-button d-flex justify-content-center w-100 position-fixed">
          <Button variant="add" class="my-auto" type="submit" :disabled="!enableButton">
            {{ $t('giftcard_section.next') }}
          </Button>
        </div>
      </b-form>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { GOOGLE_MAPS_BASE_URL } from '~/static/constants'

import screenSize from '~/plugins/mixins/screenSize'
import AddFundsComponent from '~/components/profile/preferences/ResponsiveGiftCardDetails/AddFunds/AddFundsComponent.vue'
import Button from '~/components/common/Button'
import { countryRestriction } from '~/static/constants/address'
import { countries } from '~/static/location'

export default {
  name: 'AddFundsNewPayments',

  components: {
    AddFundsComponent,
    Button,
    ValidationObserver,
    ValidationProvider,
  },

  mixins: [screenSize],

  layout: 'Profile',

  middleware: 'auth',

  data() {
    return {
      countryOptions: countries,
      form: {
        inputFirstName: '',
        inputLastName: '',
        inputAddressLine: '',
        inputCity: '',
        inputState: '',
        inputAptSuite: '',
        inputZipCode: '',
        inputCountry: '',
      },
    }
  },

  computed: {
    ...mapGetters({
      amount: 'preferences/getSelectedAmount',
      getSelectedGiftCard: 'preferences/getSelectedGiftCard',
      billingDetails: 'preferences/billingDetails'
    }),

    enableButton: (vm) => {
      return (
        vm.form.inputFirstName &&
        vm.form.inputLastName &&
        vm.form.inputAddressLine &&
        vm.form.inputCity &&
        vm.form.inputState &&
        vm.form.inputZipCode &&
        vm.form.inputCountry
      )
    },

    getTax: (vm) => {
      return vm.getTaxRate * vm.amount
    },

    getProcessingFee: (vm) => {
      return vm.processingFee * vm.amount
    },

    total: (vm) => {
      return vm.getProcessingFee.toFixed(2) * 100 + vm.getTax * 100 + vm.amount
    },
  },

  mounted() {
    this.initialiseAddress()
    // Inject google maps api
    this.injectGoogleMapsApi()
    setTimeout(() => {
      // initiate google maps
      this.initGoogleAutoComplete()
    }, 2000)
  },

  methods: {
    ...mapActions({
      addPaymentDetails: 'preferences/addPaymentDetails',
    }),

    initialiseAddress(){
      if(this.billingDetails) {
        const { inputAddressLine, inputAptSuite, inputCity, inputCountry, inputFirstName, inputLastName, inputState, inputZipCode } = this.billingDetails
      
        this.form.inputFirstName = inputFirstName
        this.form.inputLastName = inputLastName
        this.form.inputAddressLine = inputAddressLine
        this.form.inputCity = inputCity
        this.form.inputState = inputState
        this.form.inputAptSuite = inputAptSuite
        this.form.inputZipCode = inputZipCode
        this.form.inputCountry = inputCountry
      }

    },
    getValidationState({ dirty, validated, valid = null }) {
      // Returns the contextual state (validation style) of the element being validated (false for invalid, true for valid, or null for no validation state)
      return dirty || validated ? valid : null
    },

    // initiate google maps
    initGoogleAutoComplete() {
      const autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById('address'),
        {
          componentRestrictions: { country: countryRestriction },
        }
      )

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace()
        let component = {}

        for (component of place.address_components) {
          const componentType = component.types[0]

          switch (componentType) {
            case 'street_number': {
              this.form.inputAddressLine = component.long_name

              break
            }
            case 'route': {
              this.form.inputAddressLine =
                this.form.inputAddressLine + ' ' + component.short_name

              break
            }
            case 'locality': {
              this.form.inputCity = component.long_name

              break
            }
            case 'administrative_area_level_1': {
              this.form.inputState = component.long_name

              break
            }
            case 'postal_code': {
              this.form.inputZipCode = component.short_name

              break
            }
            case 'country': {
              this.form.inputCountry = component.short_name

              break
            }
          }
        }
      })
    },

    // Inject google maps api
    injectGoogleMapsApi() {
      if (!window.google) {
        const scriptTag = this.createScriptTag()
        scriptTag.src = GOOGLE_MAPS_BASE_URL
        this.insertScript(scriptTag)
      }
      return false
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

    onSubmit() {
      this.addPaymentDetails({
        payment: this.form
      }).then(() => {
        this.$router.push(`/profile/preferences/giftcard/view-giftcard/add-funds/card-payment/${this.$route.params.id}`)
      })
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.add-funds-section
  .total-amount
    font-family: $font-sp-pro
    font-style: normal
    @include body-13-medium
    color: $color-black-1
    padding-right: 16px
  .bottom-button
    height: 76px
    background: $color-white
    bottom: 11.4vh
    .btn-add::v-deep
      width: 216px
      background: $color-grey-101
      border-radius: 21px
      height: 40px
      font-family: $font-sp-pro
      font-style: normal
      @include body-13-medium
      display: flex
      align-items: center
      text-align: center
      color: $color-white
  .add-new-payment-flow
    padding-left: 16px
    padding-right: 16px
    .add-payment-header
      font-family: $font-montserrat
      font-style: normal
      @include body-5-medium
      color: $color-black-1
      margin-top: 20px
    .add-address-form::v-deep
      &.mt-24
        margin-top: 24px
      &.mt-15
        margin-top: 15px
      .invalid-feedback
        font-family: $font-sp-pro
        font-style: normal
        @include body-1214-normal
      .input-row
        .form-group::v-deep
          label
            width: 108px
            height: 14px
            left: 16px
            top: 600px
            font-family: $font-sp-pro
            font-style: normal
            @include body-1214-normal
            display: flex
            align-items: center
            color: $color-gray-24
        #first-name,
        #last-name,
        #address,
        #apt-suite,
        #city,
        #state,
        #country
          font-family: $font-sp-pro
          font-style: normal
          @include body-6-regular
          color: $color-black-1
          background: $color-white-5
          height: 29px
          border-radius: 20px
</style>