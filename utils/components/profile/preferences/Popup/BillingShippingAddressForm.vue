<template>
  <form @submit.prevent="onSubmit">
    <div class="d-block text-center">
      <b-row>
        <!-- Shipping/ Billing Address -->
        <b-col class="address-1">
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
              label-for="input-shipping"
            >
              <b-form-input
                id="input-shipping"
                v-model="address.shippingBillingAddress"
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
        <!-- ./Shipping/ Billing Address -->
        <!-- Apt-suite-unit-building -->
        <b-col class="address-2">
          <b-form-group
            id="input-group-opt"
            class="profile-label text-left"
            :label="$t('preferences.profile.apt_suite_unit_building')"
            label-for="input-opt"
          >
            <b-form-input
              id="input-opt"
              v-model="address.aptSuiteBuilding"
              class="profile-input"
              type="text"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <!-- Apt-suite-unit-building -->
      </b-row>

      <b-row>
        <!-- City -->
        <b-col class="city">
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
            rules="required"
          >
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
            class="mt-3 address-add-button"
            :class="`float-${ctaAlignment}`"
          >
            {{ $t('preferences.profile.add_address') }}
          </b-button>
        </b-col>
      </b-row>
    </div>
  </form>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import { countries } from '~/static/location'

export default {
  name: 'BillingShippingAddressForm',
  components: {
    ValidationProvider,
  },
  props: {
    addressType: {
      type: String,
      default: ''
    },
    ctaAlignment: {
      type: String,
      default: 'right',
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
        addAsBilling: false
      },
      countries,
    }
  },

  watch: {
    addressType() {
      this.address.type = this.addressType
    }
  },

  methods: {
    onSubmit() {
      this.$emit('submit', this.address);
    }
  }
}
</script>
