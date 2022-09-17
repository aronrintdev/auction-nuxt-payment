<template>
  <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <b-form
      class="custom-form mt-3"
      @submit.stop.prevent="handleSubmit(onSubmit)"
    >
      <!-- First Name & Last Name Fields -->
      <b-row>
        <b-col md="6">
          <ValidationProvider
            v-slot="validationContext"
            :name="$t('shopping_cart.first_name')"
            :rules="{ required: true, alphaNum: true, min: 3, max: 128 }"
          >
            <b-form-group label-for="first-name">
              <template #label
                >{{ $t('shopping_cart.first_name') }}&ast;</template
              >
              <b-form-input
                id="first-name"
                v-model="form.inputFirstName"
                :placeholder="$t('shopping_cart.first_name')"
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
            :rules="{ required: true, alphaNum: true, min: 3, max: 128 }"
          >
            <b-form-group label-for="last-name">
              <template #label
                >{{ $t('shopping_cart.last_name') }}&ast;</template
              >
              <b-form-input
                id="last-name"
                v-model="form.inputLastName"
                :placeholder="$t('shopping_cart.last_name')"
                :state="getValidationState(validationContext)"
              ></b-form-input>
              <b-form-invalid-feedback>{{
                validationContext.errors[0]
              }}</b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
        </b-col> </b-row
      ><!-- End of First Name & Last Name Fields -->

      <!-- Email Field -->
      <b-row>
        <b-col md="12">
          <ValidationProvider
            v-slot="validationContext"
            :name="$t('shopping_cart.email')"
            :rules="{ required: true, validEmail:true, email: true, min: 3, max: 128 }"
          >
            <b-form-group label-for="email">
              <template #label>
                {{ $t('shopping_cart.email') }}&ast;
                <span v-if="!authenticated" class="ml-1 text-color-blue-1"
                  >{{ $t('shopping_cart.returning_user') }}&quest;
                  <NuxtLink
                    class="text-decoration-underline text-color-blue-1"
                    to="#"
                    @click.native="$emit('login')"
                  >
                    <span>{{ $t('shopping_cart.login') }}</span>
                  </NuxtLink>
                </span>
              </template>
              <b-form-input
                id="email"
                v-model="form.inputEmail"
                type="email"
                :placeholder="$t('shopping_cart.email')"
                :state="getValidationState(validationContext)"
              ></b-form-input>
              <b-form-invalid-feedback>{{
                validationContext.errors[0]
              }}</b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
        </b-col> </b-row
      ><!-- End of Email Field -->

      <!-- Password Field -->
      <b-row v-if="passwordField">
        <b-col md="12">
          <ValidationProvider
            v-slot="validationContext"
            :name="$t('shopping_cart.password')"
            :rules="{
              required: true,
              min: 8,
              oneUppercase: true,
              oneDigit: true,
              oneSymbol: true,
            }"
          >
            <b-form-group
              label-for="password"
              :description="$t('shopping_cart.password_validation_rule')"
            >
              <template #label
                >{{
                  $t('shopping_cart.create_account_password')
                }}&ast;</template
              >
              <b-form-input
                id="password"
                v-model="form.inputPassword"
                type="password"
                :placeholder="$t('shopping_cart.password')"
                :state="getValidationState(validationContext)"
              ></b-form-input>
              <b-form-invalid-feedback>{{
                validationContext.errors[0]
              }}</b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
        </b-col> </b-row
      ><!-- End of Password Field -->

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
                :placeholder="$t('shopping_cart.street_address')"
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
                :placeholder="$t('shopping_cart.city')"
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
            :name="$t('shopping_cart.state')"
            :rules="{ required: true, min: 3, max: 64 }"
          >
            <b-form-group label-for="state">
              <template #label>{{ $t('shopping_cart.state') }}&ast;</template>
              <b-form-input
                id="state"
                v-model="form.inputState"
                :placeholder="$t('shopping_cart.state')"
                :state="getValidationState(validationContext)"
              ></b-form-input>
              <b-form-invalid-feedback>{{
                validationContext.errors[0]
              }}</b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
        </b-col> </b-row
      ><!-- End of City & State Fields -->

      <!-- Apt/Suite & Zip Code Fields -->
      <b-row>
        <b-col md="6">
          <b-form-group
            :label="$t('shopping_cart.apt_suite')"
            label-for="apt-suite"
          >
            <b-form-input
              id="apt-suite"
              v-model="form.inputAptSuite"
              :placeholder="$t('shopping_cart.apt_suite_number')"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <ValidationProvider
            v-slot="validationContext"
            :name="$t('shopping_cart.zip_code')"
            :rules="{ required: true, min: 5, max: 10 }"
          >
            <b-form-group label-for="zip-code">
              <template #label
                >{{ $t('shopping_cart.zip_code') }}&ast;</template
              >
              <b-form-input
                id="zip-code"
                v-model="form.inputZipCode"
                :placeholder="$t('shopping_cart.zip_code')"
                :state="getValidationState(validationContext)"
              ></b-form-input>
              <b-form-invalid-feedback>{{
                validationContext.errors[0]
              }}</b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
        </b-col> </b-row
      ><!-- End of Apt/Suite & Zip Code Fields -->

      <!-- Country Field & Use as Shipping CheckBox -->
      <b-row>
        <b-col md="12">
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
        </b-col>
      </b-row><!-- End of Country Field -->

      <!-- Use as Shipping CheckBox -->
      <b-row>
        <b-col v-if="useAsShipping" md="6">
          <b-row>
            <b-col md="1" class="d-flex align-items-center ml-1">
              <b-form-checkbox
                v-model="form.inputForShipping"
              ></b-form-checkbox>
            </b-col>
            <b-col md="8" class="d-flex align-items-center ml-2">
              <div class="body-5-regular">
                {{ $t('shopping_cart.use_as_shipping') }}&ast;
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row><!-- End of Use as Shipping CheckBox -->

      <!-- Proceed Button -->
      <b-row class="mt-4">
        <b-col md="12" class="text-center">
          <slot name="action">
            <b-button type="submit" class="px-5" variant="confirm" pill>{{
              actionText
            }}</b-button>
          </slot>
        </b-col> </b-row
      ><!-- End of Proceed Button -->
    </b-form>
  </ValidationObserver>
</template>

<script>
import { mapGetters } from 'vuex'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { countries } from '~/static/location'
import { countryRestriction } from '~/static/constants/address'

export default {
  name: 'AddressForm',
  components: { ValidationObserver, ValidationProvider },
  props: {
    address: {
      type: [Object, Boolean],
      default: () => {
        return false
      },
    },
    actionText: {
      type: String,
      required: true,
      default: '',
    },
    passwordField: {
      type: Boolean,
      default: false,
    },
    useAsShipping: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      countryOptions: countries,
      form: {
        inputFirstName: this.address.firstName,
        inputLastName: this.address.lastName,
        inputEmail: this.address.email,
        inputPassword: '',
        inputAddressLine: this.address.addressLine,
        inputCity: this.address.city,
        inputState: this.address.state,
        inputAptSuite: '',
        inputZipCode: this.address.zipCode,
        inputCountry: this.address.country,
        inputForShipping: false,
      },
    }
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
    }),
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
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      // Returns the contextual state (validation style) of the element being validated (false for invalid, true for valid, or null for no validation state)
      return dirty || validated ? valid : null
    },
    onSubmit() {
      this.$emit('submit', this.form)
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.text-color-blue-1
  color: $color-blue-1
  @include body-5-regular
</style>
