<template>
  <div>
    <ValidationObserver ref="observer">
      <form @submit.prevent="onSubmit">
        <b-card-text>
          <b-form-group v-slot="{ ariaDescribedby }">
            <!-- Billing Address Radio Button -->
            <b-form-radio
              v-if="addressType === 'billing'"
              v-model="defaultBilling"
              :aria-describedby="ariaDescribedby"
              name="some-radios-billing"
              class="preferences-make-as-default-billing"
              :value="billingAddress.id"
              @change="updateDefault(billingAddress.id, billingAddress.type)"
            >
              {{
                billingAddress.is_default
                  ? $t('preferences.common.default')
                  : $t('preferences.common.make_as_default')
              }}
            </b-form-radio>
            <!-- ./Billing Address Radio Button -->
            <!-- Shipping Address Radio Button -->
            <b-form-radio
              v-else
              v-model="defaultShipping"
              :aria-describedby="ariaDescribedby"
              name="some-radios-shipping"
              class="preferences-make-as-default-shipping"
              :value="shippingAddress.id"
              @change="updateDefault(shippingAddress.id, shippingAddress.type)"
            >
              {{
                shippingAddress.is_default
                  ? $t('preferences.common.default')
                  : $t('preferences.common.make_as_default')
              }}
            </b-form-radio>
            <!-- ./Shipping Address Radio Button -->
          </b-form-group>
          <!-- ./RADIO - MAKE AS DEFAULT -->
        </b-card-text>
        <b-card-text class="pt-3 pb-3">
          <b-row>
            <!-- Shipping/Billing Adress -->
            <b-col md="3">
              <ValidationProvider
                :rules="{
                  validAddress: true,
                  required: true,
                }"
                :name="
                  addressType === 'shipping'
                    ? $t('preferences.profile.shipping_address')
                    : $t('preferences.profile.billing_address')
                "
              >
                <b-form-group
                  v-if="addressType === 'billing'"
                  id="input-group"
                  slot-scope="{ valid, errors }"
                  class="profile-label"
                  :label="$t('preferences.profile.billing_address')"
                  label-for="input"
                >
                  <b-form-input
                    id="input"
                    v-model="address.address_line_1"
                    :value="billingAddress.address_line_1"
                    class="profile-input"
                    :state="errors[0] ? false : valid ? true : null"
                    type="text"
                    required
                  ></b-form-input>
                  <b-form-invalid-feedback id="inputLiveFeedback">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group
                  v-else
                  id="input-group"
                  slot-scope="{ valid, errors }"
                  class="profile-label"
                  :label="$t('preferences.profile.shipping_address')"
                  label-for="input"
                >
                  <b-form-input
                    id="input"
                    v-model="address.address_line_1"
                    :value="shippingAddress.address_line_1"
                    class="profile-input"
                    :state="errors[0] ? false : valid ? true : null"
                    type="text"
                    required
                  ></b-form-input>
                  <b-form-invalid-feedback id="inputLiveFeedback">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <!-- ./Billing Adress -->
            <!-- Apt-suite-unit-building(Optionals) -->
            <b-col md="3">
              <ValidationProvider
                rules="required|alphaNum"
                :name="$t('preferences.profile.apt_suite_unit_building')"
              >
                <b-form-group
                  id="input-group"
                  slot-scope="{ valid, errors }"
                  class="profile-label"
                  :label="$t('preferences.profile.apt_suite_unit_building')"
                  label-for="input"
                >
                  <b-form-input
                    id="input"
                    v-model="address.address_line_2"
                    :value="
                      addressType === 'billing'
                        ? billingAddress.address_line_2
                        : shippingAddress.address_line_2
                    "
                    class="profile-input"
                    :state="errors[0] ? false : valid ? true : null"
                    type="text"
                    required
                  ></b-form-input>
                  <b-form-invalid-feedback id="inputLiveFeedback">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <!-- ./Apt-suite-unit-building(Optionals) -->
            <!-- City -->
            <b-col md="4">
              <ValidationProvider
                rules="required|alphaSpaces"
                :name="$t('preferences.profile.city')"
              >
                <b-form-group
                  id="input-group"
                  slot-scope="{ valid, errors }"
                  class="profile-label"
                  :label="$t('preferences.profile.city')"
                  label-for="input"
                >
                  <b-form-input
                    id="input"
                    v-model="address.city"
                    :value="
                      addressType === 'billing'
                        ? billingAddress.city
                        : shippingAddress.city
                    "
                    class="profile-input"
                    type="email"
                    :state="errors[0] ? false : valid ? true : null"
                    required
                  ></b-form-input>
                  <b-form-invalid-feedback id="inputLiveFeedback">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <!-- ./City -->
            <b-col md="2">
              <div class="address-trash-button-wrapper">
                <b-button
                  class="profile-trash-icon"
                  pill
                  variant="light"
                  @click="
                    onSubmit(
                      addressType === 'billing'
                        ? billingAddress.id
                        : shippingAddress.id
                    )
                  "
                >
                  <img
                    :src="require('~/assets/img/icons/pencil.svg')"
                    :alt="$t('preferences.common.update_alt_text')"
                  />
                </b-button>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <!-- State -->
            <b-col md="3">
              <ValidationProvider
                rules="required|alphaSpaces"
                :name="$t('preferences.profile.state')"
              >
                <b-form-group
                  id="input-group"
                  slot-scope="{ valid, errors }"
                  class="profile-label"
                  :label="$t('preferences.profile.state')"
                  label-for="input"
                >
                  <b-form-input
                    id="input"
                    v-model="address.state"
                    :value="
                      addressType === 'billing'
                        ? billingAddress.state
                        : shippingAddress.state
                    "
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
            <!-- ./State -->
            <!-- Zip Code -->
            <b-col md="3">
              <b-form-group
                id="input-group"
                class="profile-label"
                rules="required|alphaNum"
                :label="$t('preferences.profile.zip')"
                label-for="input"
              >
                <b-form-input
                  id="input"
                  v-model="address.zip"
                  :value="
                    addressType === 'billing'
                      ? billingAddress.zip
                      : shippingAddress.zip
                  "
                  class="profile-input"
                  type="email"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <!-- Zip Code -->
            <!-- Country -->
            <b-col md="4">
              <b-form-group
                id="input-group"
                class="profile-label"
                :label="$t('preferences.profile.country')"
                label-for="input"
              >
                <b-form-select
                  v-model="address.country"
                  :value="
                    addressType === 'billing'
                      ? billingAddress.country
                      : shippingAddress.country
                  "
                  class="profile-input"
                >
                  <b-form-select-option
                    v-for="country in countries"
                    :key="country.value"
                    :value="country.value"
                  >
                    {{ country.text }}
                  </b-form-select-option>
                </b-form-select>
              </b-form-group>
            </b-col>
            <!-- ./Country -->

            <b-col md="2">
              <div class="address-trash-button-wrapper">
                <b-button
                  class="profile-trash-icon"
                  pill
                  variant="light"
                  @click="
                    removeAddress(
                      addressType === 'billing'
                        ? billingAddress.id
                        : shippingAddress.id
                    )
                  "
                >
                  <img
                    :src="require('~/assets/img/icons/delete.png')"
                    :alt="$t('preferences.common.delete_alt_text')"
                  />
                </b-button>
              </div>
            </b-col>
          </b-row>
        </b-card-text>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  name: 'AddressComponent',

  components: {
    ValidationObserver,
    ValidationProvider,
  },

  props: {
    countries: {
      type: Array,
      default: () => {
        return []
      },
    },
    // Billing Address Data
    billingAddress: {
      type: Object,
      default: () => {
        return {}
      },
    },
    // Shipping Address Data
    shippingAddress: {
      type: Object,
      default: () => {
        return {}
      },
    },
    addressType: {
      type: String,
      default: '',
    },
    defaultBillingID: {
      type: Number,
      default: 0,
    },
    defaultShippingID: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      selected: '',
      defaultShipping: '',
      defaultBilling: '',
      address: {
        first_name: this.$store.state.auth.user.first_name,
        last_name: this.$store.state.auth.user.last_name,
        type: this.addressType,
        address_line_1: this.getAddress('address_line_1'),
        address_line_2: this.getAddress('address_line_2'),
        city: this.getAddress('city'),
        state: this.getAddress('state'),
        zip: this.getAddress('zip'),
        country: this.getAddress('country'),
        add_as_billing: false,
      },
    }
  },

  mounted(){
    this.address.city = this.getAddress('city')
  },

  created() {
    this.defaultBilling = this.defaultBillingID
    this.defaultShipping = this.defaultShippingID
  },

  methods: {
    onSubmit(id, type) {
      this.$refs.observer.validate().then((success) => {
        if (success) {
          this.updateAddress(this.address, id, type)
        }
      })
    },
    getAddress (property)  {
      return this.addressType === 'billing'? this.billingAddress[property] : this.shippingAddress[property]
    },
    // Add Shipping/ Billing Address
    updateAddress(address, id, type) {
      this.$axios
        .put('/preferences/profile/address/'+id, address)
        .then((res) => {
          this.$toasted.success(this.$t(res.data.message))
        })
        .catch((err) => {
          this.$logger.logToServer(
            'Preferences Section - Update Address:',
            err.response.data
          )
          this.$toasted.error(err.response.data.message)
        })
        .finally(() => {
          this.$emit('reload')
        })
    },
    // On Radio button change event, emit to parent
    updateDefault(id, type) {
      this.$emit('updateDefaultAddress', {
        addressID: id,
        addressType: type,
        userID: this.$store.state.auth.user.id,
      })
    },
    // ID to delete
    removeAddress(id) {
      this.$emit('removeAddress', id)
    },
  },
}
</script>
