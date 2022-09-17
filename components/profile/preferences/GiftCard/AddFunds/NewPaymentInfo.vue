<template>
  <div class="new-paymentInfo">

    <div class="add-new-heading  mt-4">
      {{ $t('giftcard_section.add_new_paymentInfo') }}
    </div>

    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <b-form
      class="custom-form mt-5"
      @submit.stop.prevent="handleSubmit(onSubmit)"
    >
      <!-- First Name & Last Name Fields -->
      <b-row>
        <b-col md="6">
          <ValidationProvider
            v-slot="validationContext"
            :name="$t('shopping_cart.first_name')"
            :rules="{ required: true, min: 3, max: 128 }"
          >
            <b-form-group label-for="first-name">
              <template #label
                >{{ $t('shopping_cart.first_name') }}&ast;</template
              >
              <b-form-input
                id="first-name"
                v-model="form.inputFirstName"
                :state="getValidationState(validationContext)"
              ></b-form-input>
              <b-form-invalid-feedback>{{
                validationContext.errors[0]
              }}</b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
        </b-col>
        <b-col md="6">
          <ValidationProvider
            v-slot="validationContext"
            :name="$t('shopping_cart.last_name')"
            :rules="{ required: true, min: 3, max: 128 }"
          >
            <b-form-group label-for="last-name">
              <template #label
                >{{ $t('shopping_cart.last_name') }}&ast;</template
              >
              <b-form-input
                id="last-name"
                v-model="form.inputLastName"
                :state="getValidationState(validationContext)"
              ></b-form-input>
              <b-form-invalid-feedback>{{
                validationContext.errors[0]
              }}</b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
        </b-col> </b-row
      ><!-- End of First Name & Last Name Fields -->

      <!-- Address Field -->
      <b-row>
        <b-col md="12">
          <ValidationProvider
            v-slot="validationContext"
            :name="$t('shopping_cart.address')"
            :rules="{ required: true, min: 3, max: 255 }"
          >
            <b-form-group label-for="address">
              <template #label>{{ $t('shopping_cart.address') }}&ast;</template>
              <b-form-input
                id="address"
                v-model="form.inputAddressLine"
                :state="getValidationState(validationContext)"
              ></b-form-input>
              <b-form-invalid-feedback>{{
                validationContext.errors[0]
              }}</b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
        </b-col> </b-row
      ><!-- End of Address Field -->

      <!-- City & State Fields -->
      <b-row>
        <b-col md="6">
          <b-form-group
            :label="$t('shopping_cart.apt_suite')"
            label-for="apt-suite"
          >
            <b-form-input
              id="apt-suite"
              v-model="form.inputAptSuite"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <ValidationProvider
            v-slot="validationContext"
            :name="$t('shopping_cart.city')"
            :rules="{ required: true, min: 3, max: 64 }"
          >
            <b-form-group label-for="city">
              <template #label>{{ $t('shopping_cart.city') }}&ast;</template>
              <b-form-input
                id="city"
                v-model="form.inputCity"
                :state="getValidationState(validationContext)"
              ></b-form-input>
              <b-form-invalid-feedback>{{
                validationContext.errors[0]
              }}</b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
        </b-col>
         </b-row
      ><!-- End of City & State Fields -->

      <!-- Apt/Suite & Zip Code Fields -->
      <b-row>
        <b-col md="6">
          <ValidationProvider
            v-slot="validationContext"
            :name="$t('shopping_cart.state')"
            :rules="{ required: true, min: 3, max: 64 }"
          >
            <b-form-group label-for="state">
              <template #label>{{ $t('shopping_cart.state') }}&ast;</template>
              <b-form-input
                id="state"
                v-model="form.inputState"
                :state="getValidationState(validationContext)"
              ></b-form-input>
              <b-form-invalid-feedback>{{
                validationContext.errors[0]
              }}</b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
        </b-col>
        <b-col md="6">
          <ValidationProvider
            v-slot="validationContext"
            :name="$t('shopping_cart.country')"
            :rules="{ required: true }"
          >
            <b-form-group label-for="country">
              <template #label>{{ $t('shopping_cart.country') }}&ast;</template>
              <b-form-select
                id="country"
                v-model="form.inputCountry"
                :options="countryOptions"
                :state="getValidationState(validationContext)"
              ></b-form-select>
              <b-form-invalid-feedback>{{
                validationContext.errors[0]
              }}</b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
        </b-col></b-row
      ><!-- End of Apt/Suite & Zip Code Fields -->

      <!-- Proceed Button -->
      <b-row class="mt-4">
        <b-col md="12" class="text-right">
          <slot name="action">
            <b-button type="submit" :disabled="!disabled" class="px-5" variant="confirm" pill>
              {{ $t('giftcard_section.next') }}
            </b-button>
          </slot>
        </b-col> </b-row
      ><!-- End of Proceed Button -->
    </b-form>
  </ValidationObserver>
    
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { countries } from '~/static/location'
import { countryRestriction } from '~/static/constants/address'
import emitEvent from '~/plugins/mixins/emit-event'
export default {
  name: 'NewPaymentInfo',

  components: { ValidationObserver, ValidationProvider },

  mixins: [emitEvent],

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
    // Disable/ Enable button
    disabled: (vm) => {
      const { inputFirstName, inputLastName, inputAddressLine, inputCity, inputState, inputZipCode, inputCountry } = vm.form
      if(inputFirstName && inputLastName && inputAddressLine && inputCity && inputState && inputZipCode && inputCountry) {
        return true
      }else{
        return false
      }
    }
  },

  mounted() {
    // Google Places Autocomplete API
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

  created() {
    // Update the page title
    this.updatePageTitle(this.$t('giftcard_section.add_funds'))
    // Set the contents
    this.toggleContent({
      transactionHistory: false,
      howToUse: false,
      backTo: 'SavedUserPayments'
    })
    
  },
  methods: {
    ...mapActions({
      addPaymentDetails: 'preferences/addPaymentDetails',
      updatePageTitle: 'preferences/viewPageTitle',
      toggleContent: 'preferences/toggleContent'
    }),
    getValidationState({ dirty, validated, valid = null }) {
      // Returns the contextual state (validation style) of the element being validated (false for invalid, true for valid, or null for no validation state)
      return dirty || validated ? valid : null
    },
    // On address submit
    onSubmit() {
      this.addPaymentDetails({
        payment: this.form
      })
      this.emitRenderComponentEvent(
        this.$parent.$options.components.AddFundPaymentCard.name
      )
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.new-paymentInfo
  .add-new-heading
    font-style: normal
    @include body-2-bold
    color: $color-black-1

  .form-control
    background: $color-white-5
    border-radius: 20px

  .custom-form
    flex: 0 0 67%
    max-width: 67%
    @media (min-width:1154px) and (max-width: 1674px)
      flex: 0 0 100% 
      max-width: 100%
    @media (max-width: 1104px)
      flex: 0 0 100%
      max-width: 100%
</style>