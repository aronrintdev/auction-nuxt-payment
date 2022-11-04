<template>
  <b-row class="address-form-wrapper">
    <b-col cols="12" sm="12" class="px-0">
      <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
        <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
          <!-- Use as Shipping CheckBox -->
          <b-row v-if="useAsShipping">
            <b-col cols="12" sm="12">
              <b-form-checkbox
                v-model="form.inputForShipping"
              >
                <template #default>
                  <span class="body-5-normal text-gray-5 ml-3">
                    {{ $t('shopping_cart.same_as_shipping_address') }}
                  </span>
                </template>
              </b-form-checkbox>
            </b-col>
          </b-row>
          <!-- End of Use as Shipping CheckBox -->

          <!-- First Name Field -->
          <b-row>
            <b-col cols="12" sm="12">
              <ValidationProvider
                v-slot="validationContext"
                :name="$t('shopping_cart.first_name')"
                :rules="{ required: true, alphaNum: true, min: 3, max: 128 }"
              >
                <b-form-group>
                  <b-form-input
                    v-model="form.inputFirstName"
                    :placeholder="$t('shopping_cart.first_name')"
                    :state="getValidationState(validationContext)"
                  ></b-form-input>
                  <b-form-invalid-feedback class="body-18-normal text-red-3">{{
                      validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>
          <!-- End of First Name Field -->

          <!-- Last Name Field -->
          <b-row>
            <b-col cols="12" sm="12">
              <ValidationProvider
                v-slot="validationContext"
                :name="$t('shopping_cart.last_name')"
                :rules="{ required: true, alphaNum: true, min: 3, max: 128 }"
              >
                <b-form-group>
                  <b-form-input
                    v-model="form.inputLastName"
                    :placeholder="$t('shopping_cart.last_name')"
                    :state="getValidationState(validationContext)"
                  ></b-form-input>
                  <b-form-invalid-feedback class="body-18-normal text-red-3">{{
                      validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>
          <!-- End of Last Name Field -->

          <!-- Email Field -->
          <b-row>
            <b-col md="12">
              <ValidationProvider
                v-slot="validationContext"
                :name="$t('shopping_cart.email')"
                :rules="{ required: true, validEmail:true, email: true, min: 3, max: 128 }"
              >
                <b-form-group label-for="email">
                  <b-form-input
                    v-model="form.inputEmail"
                    type="email"
                    :placeholder="$t('shopping_cart.email')"
                    :state="getValidationState(validationContext)"
                  ></b-form-input>
                  <b-form-invalid-feedback class="body-18-normal text-red-3">{{
                      validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>
          <!-- End of Email Field -->

          <!-- Address Line 1 Field -->
          <b-row>
            <b-col cols="12" sm="12">
              <ValidationProvider
                v-slot="validationContext"
                :name="$t('shopping_cart.address_line_1')"
                :rules="{ required: true, min: 3, max: 255 }"
              >
                <b-form-group>
                  <b-form-input
                    id="address-line-1"
                    v-model="form.inputAddressLine"
                    :placeholder="$t('shopping_cart.address_line_1')"
                    :state="getValidationState(validationContext)"
                  ></b-form-input>
                  <b-form-invalid-feedback class="body-18-normal text-red-3">{{
                      validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>
          <!-- End of Address Line 1 Field -->

          <!-- Address Line 2 Field -->
          <b-row>
            <b-col cols="12" sm="12">
              <ValidationProvider
                v-slot="validationContext"
                :name="$t('shopping_cart.address_line_2')"
                :rules="{ required: false, min: 3, max: 255 }"
              >
                <b-form-group>
                  <b-form-input
                    id="address-line-2"
                    v-model="form.inputAddressLine2"
                    :placeholder="$t('shopping_cart.address_line_2')"
                    :state="getValidationState(validationContext)"
                  ></b-form-input>
                  <b-form-invalid-feedback class="body-18-normal text-red-3">{{
                      validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>
          <!-- End of Address Line 2 Field -->

          <!-- Zip Code Field -->
          <b-row>
            <b-col cols="12" sm="12">
              <ValidationProvider
                v-slot="validationContext"
                :name="$t('shopping_cart.zip')"
                :rules="{ required: true, min: 5, max: 10 }"
              >
                <b-form-group>
                  <b-form-input
                    id="zip-code"
                    v-model="form.inputZipCode"
                    :placeholder="$t('shopping_cart.zip')"
                    :state="getValidationState(validationContext)"
                  ></b-form-input>
                  <b-form-invalid-feedback class="body-18-normal text-red-3">{{
                      validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>
          <!-- End of Zip Code Field -->

          <!-- City & State Fields -->
          <b-row>
            <b-col cols="6" sm="6">
              <ValidationProvider
                v-slot="validationContext"
                :name="$t('shopping_cart.city')"
                :rules="{ required: true, min: 3, max: 64 }"
              >
                <b-form-group>
                  <b-form-input
                    v-model="form.inputCity"
                    :placeholder="$t('shopping_cart.city')"
                    :state="getValidationState(validationContext)"
                  ></b-form-input>
                  <b-form-invalid-feedback class="body-18-normal text-red-3">{{
                      validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col cols="6" sm="6">
              <ValidationProvider
                v-slot="validationContext"
                :name="$t('shopping_cart.state')"
                :rules="{ required: true, min: 3, max: 64 }"
              >
                <b-form-group>
                  <b-form-input
                    v-model="form.inputState"
                    :placeholder="$t('shopping_cart.state')"
                    :state="getValidationState(validationContext)"
                  ></b-form-input>
                  <b-form-invalid-feedback class="body-18-normal text-red-3">{{
                      validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>
          <!-- End of City & State Fields -->

          <!-- Phone Field -->
          <b-row>
            <b-col cols="12" sm="12">
              <ValidationProvider
                v-slot="validationContext"
                :name="$t('shopping_cart.phone')"
                :rules="{ required: false, numeric: true }"
              >
                <b-form-group>
                  <b-form-input
                    v-model="form.inputPhone"
                    :placeholder="$t('shopping_cart.phone')"
                    :state="getValidationState(validationContext)"
                  ></b-form-input>
                  <b-form-invalid-feedback class="body-18-normal text-red-3">{{
                      validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>
          <!-- End of Phone Field -->

          <!-- Country Field -->
          <b-row>
            <b-col cols="12" sm="12">
              <ValidationProvider
                v-slot="validationContext"
                :name="$t('shopping_cart.country')"
                :rules="{ required: true }"
              >
                <b-form-group>
                  <b-form-input
                    v-model="form.inputCountry"
                    :placeholder="$t('shopping_cart.country')"
                    :state="getValidationState(validationContext)"
                  ></b-form-input>
                  <b-form-invalid-feedback class="body-18-normal text-red-3">{{
                      validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>
          <!-- End of Country Field -->

          <!-- Save For Next Time CheckBox -->
          <b-row v-if="saveForNextTime">
            <b-col cols="12" sm="12">
              <b-form-checkbox
                v-model="form.inputSaveForNextTime"
              >
                <template #default>
                  <span class="body-5-normal text-gray-5 ml-3">
                  {{ $t('shopping_cart.save_payment_information_for_next_time') }}
                </span>
                </template>
              </b-form-checkbox>
            </b-col>
          </b-row>
          <!-- End of Save For Next Time CheckBox -->

          <!-- Confirm Button -->
          <b-row class="confirm-btn-wrapper">
            <b-col cols="12" sm="12">
              <Button type="submit" variant="dark-blue" pill block>
                {{ actionText }}
              </Button>
            </b-col>
          </b-row>
          <!-- End of Confirm Button -->
        </b-form>
      </ValidationObserver>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from 'vuex'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Button from '~/components/common/Button'
import { countries } from '~/static/location'
import { countryRestriction } from '~/static/constants/address'

export default {
  name: 'AddressForm',
  components: { ValidationObserver, ValidationProvider, Button },
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
    saveForNextTime: {
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
        inputAddressLine: this.address.addressLine,
        inputAddressLine2: '',
        inputCity: this.address.city,
        inputState: this.address.state,
        inputZipCode: this.address.zipCode,
        inputPhone: this.address.phone,
        inputCountry: this.address.country,
        inputForShipping: false,
        inputSaveForNextTime: false,
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
      document.getElementById('address-line-1'),
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
            this.form.inputAddressLine1 = component.long_name

            break
          }
          case 'route': {
            this.form.inputAddressLine1 =
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

.address-form-wrapper
  margin: 18px 18px 0
  overflow-y: auto
  overflow-x: hidden
  height: 100%

  .custom-checkbox
    &:first-child
      margin-bottom: 18px

  input
    background: $color-white-5
    border-radius: 3rem
    color: $black-1
    @include body-8-normal

    &::placeholder,
    &:-ms-input-placeholder,
    &::-ms-input-placeholder
      @include body-8-normal
      color: $color-gray-24

    &:active, &:focus
      border: 1px solid $black-1

    &.is-invalid
      border: 1px solid $color-red-3

      &:active, &:focus
        border: 1px solid $color-red-3

.confirm-btn-wrapper
  margin: 30px 0 0

  div
    padding: 0

    button
      min-height: 40px
</style>
