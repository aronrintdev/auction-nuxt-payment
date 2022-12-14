<template>
  <div>
    <ValidationObserver ref="observer">
      <form @submit.prevent="onSubmit">
        <div class="d-block text-center">
          <b-row>
            <!-- Shipping/ Billing Address -->
            <b-col>
              <ValidationProvider
                :rules="{ validAddress: true, required: true }"
                :name="
                  addressType === 'shipping'
                    ? $t('preferences.profile.shipping_address')
                    : $t('preferences.profile.billing_address')
                "
              >
                <b-form-group
                  id="input-group-shipping"
                  slot-scope="{ valid, errors }"
                  class="profile-label text-left"
                  :label="
                    addressType === 'shipping'
                      ? $t('preferences.profile.shipping_address')
                      : $t('preferences.profile.billing_address')
                  "
                >
                  <b-form-input
                    id="input-group-shipping-autocomplete"
                    v-model="address.shippingBillingAddress"
                    class="profile-input mt-4"
                    :state="errors[0] ? false : valid ? true : null"
                    type="text"
                  ></b-form-input>
                  <b-form-invalid-feedback id="inputLiveFeedback">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <!-- ./Shipping/ Billing Address -->
            <!-- Apt-suite-unit-building -->
            <b-col>
              <ValidationProvider
                rules="alphaNum"
                :name="$t('preferences.profile.apt_suite_unit_building')"
              >
              <b-form-group
                id="input-group-opt"
                slot-scope="{ valid, errors }"
                class="profile-label text-left"
                :label="$t('preferences.profile.apt_suite_unit_building')"
                label-for="input-opt"
              >
                <b-form-input
                  id="input-opt"
                  v-model="address.aptSuiteBuilding"
                  class="profile-input"
                  :state="errors[0] ? false : valid ? true : null"
                  type="text"
                ></b-form-input>
                <b-form-invalid-feedback id="inputLiveFeedback">
                    {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
              </ValidationProvider>
            </b-col>
            <!-- Apt-suite-unit-building -->
          </b-row>

          <b-row>
            <!-- City -->
            <b-col>
              <ValidationProvider
                rules="required|alphaSpaces"
                :name="$t('preferences.profile.city')"
              >
                <b-form-group
                  id="input-group-city"
                  slot-scope="{ valid, errors }"
                  class="profile-label text-left"
                  :label="$t('preferences.profile.city')"
                  label-for="input-city"
                >
                  <b-form-input
                    id="input-city"
                    v-model="address.city"
                    class="profile-input"
                    :state="errors[0] ? false : valid ? true : null"
                    type="text"
                  ></b-form-input>
                  <b-form-invalid-feedback id="inputLiveFeedback">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <!-- ./City -->
            <!-- Zip -->
            <b-col>
              <ValidationProvider
                rules="required|alphaNum"
                :name="$t('preferences.profile.zip')"
              >
                <b-form-group
                  id="input-group"
                  slot-scope="{ valid, errors }"
                  class="profile-label text-left"
                  :label="$t('preferences.profile.zip')"
                  label-for="input"
                >
                  <b-form-input
                    id="input"
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
            <!-- ./Zip -->
          </b-row>

          <b-row>
            <!-- State -->
            <b-col>
              <ValidationProvider
                rules="required|alphaSpaces"
                :name="$t('preferences.profile.state')"
              >
                <b-form-group
                  id="input-group"
                  slot-scope="{ valid, errors }"
                  class="profile-label text-left"
                  :label="$t('preferences.profile.state')"
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
            <!-- State -->
            <!-- Country -->
            <b-col>
              <ValidationProvider
                :name="$t('preferences.profile.country')"
                rules="required|alphaSpaces"
              >
                <b-form-group
                  id="input-group"
                  slot-scope="{ valid, errors }"
                  class="profile-label text-left"
                  :label="$t('preferences.profile.state')"
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
                <b-form-group
                  id="input-group"
                  slot-scope="{ valid, errors }"
                  class="profile-label text-left"
                  :label="$t('preferences.profile.country')"
                  label-for="input"
                >
                  <b-form-select
                    v-model="address.country"
                    class="profile-input"
                    :state="errors[0] ? false : valid ? true : null"
                  >
                    <b-form-select-option
                      v-for="country in countries"
                      :key="country.val"
                      :value="country.value"
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
            <!-- Country -->
          </b-row>
          <b-row>
            <!-- Checkbox -->
            <b-col class="use-as-shipping">
              <b-form-checkbox
                v-if="addressType === 'shipping'"
                id="checkbox-1"
                v-model="address.addAsBilling"
                name="checkbox-1"
              >
                {{ $t('preferences.profile.add_as_billing') }}
              </b-form-checkbox>
            </b-col>
            <!-- ./Checkbox -->
            <b-col class="address-button-col">
              <b-button
                type="submit"
                variant="outline-primary"
                pill
                class="mt-3 float-right address-add-button"
              >
                {{ $t('preferences.profile.add_address') }}
              </b-button>
            </b-col>
          </b-row>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>

import { ValidationObserver, ValidationProvider } from 'vee-validate'
import _ from 'lodash';
import { countryRestriction } from '~/static/constants/address'

export default {
  name: 'AddressForm',

  components: {
    ValidationObserver,
    ValidationProvider,
  },

  // Type of Address (Shipping/ Billing)
  props: {
    addressType: {
      type: String,
      default: '',
    },
    countries: {
      type: Array,
      default: () => {
        return []
      },
    },
  },

  data() {
    return {
      address: {
        firstName: this.$store.state.auth.user.first_name,
        lastName: this.$store.state.auth.user.last_name,
        type: this.addressType,
        shippingBillingAddress: '',
        aptSuiteBuilding: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        addAsBilling: false,
      }
    }
  },

  mounted() {
    // Create the autocomplete object, restricting the search predictions.
    const autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById('input-group-shipping-autocomplete'),
      {
        componentRestrictions: { country: countryRestriction },
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
            this.address.shippingBillingAddress = component.long_name
            break
          }
          case 'route': {
            this.address.shippingBillingAddress =
              this.address.shippingBillingAddress + ' ' + component.short_name
            break
          }
          case 'locality': {
            this.address.city = component.long_name
            break
          }
          case 'administrative_area_level_1': {
            this.address.state = component.long_name
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

  methods: {
    // Submit Form. Emit theaddresses datas to parent
    onSubmit: _.debounce(function() {
      this.$refs.observer.validate().then((success) => {
        if (success) {
          this.addAddress(this.address)
        }
      })
    },1000),
    // Add Shipping/ Billing Address
    addAddress(address) {
      this.$axios
        .post('/preferences/profile/add-address', address)
        .then((res) => {
          this.$toasted.success(this.$t(res.data.message))
          this.$bvModal.hide('address-type-modal')
          this.$emit('reload')
        })
        .catch((err) => {
          this.$bvModal.hide('address-type-modal')
          this.$logger.logToServer(
            'Preferences Section - Add Address:',
            err.response.data
          )
          this.$toasted.error(err.response.data.message)
          this.$emit('reload')
        })
    },
    clearAddresField() {
      // Clear form values
      this.address.shippingBillingAddress = ''
      this.address.aptSuiteBuilding = ''
      this.address.city = ''
      this.address.state = ''
      this.address.zip = ''
      this.address.country = ''
      this.address.addAsBilling = false
    },
  },
}
</script>
