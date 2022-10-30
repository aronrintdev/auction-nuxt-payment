<template>
  <div class="your-address-form">
    <MobileHeader :title="$t('navbar.profile')" @back="moveBack"></MobileHeader>
    <div class="address-form p-4">
      <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
        <form @submit.stop.prevent="handleSubmit(onSubmit)">
          <b-card class="mt-3 address-card">
            <span
              v-if="getActionType === add"
              class="address-heading d-flex align-items-center"
            >
              {{
                selectedAddressType === shipping
                  ? $t('preferences.profile.add_shippingaddress')
                  : $t('preferences.profile.add_billingaddress')
              }}
            </span>
            <span
              v-if="getActionType === edit"
              class="address-heading justify-content-between"
            >
              {{
                selectedAddressType === shipping
                  ? $t('preferences.profile.edit_shipping_address')
                  : $t('preferences.profile.edit_billing_address')
              }}

              <span
                v-if="!checkDefault"
                role="button"
                class="float-right"
                @click="deleteAddress"
              >
                <img
                  :src="require('~/assets/img/icons/delete-rounded.svg')"
                  alt="delete-round-icon"
                />
              </span>
            </span>
            <p class="sub-text mt-2 d-flex align-items-center">
              {{
                selectedAddressType === shipping
                  ? $t('preferences.profile.update_shipping_address')
                  : $t('preferences.profile.update_billing_address')
              }}
            </p>

            <div class="row">
              <div class="col-12">
                <!-- Shipping/ Billing Address -->
                <ValidationProvider
                  :rules="{
                    validAddress: true,
                    required: true,
                    min: 3,
                    max: 255,
                  }"
                  :name="
                    selectedAddressType === shipping
                      ? $t('preferences.profile.shipping_address')
                      : $t('preferences.profile.billing_address')
                  "
                >
                  <b-form-group
                    id="input-address"
                    slot-scope="{ valid, errors }"
                    class="input-labels"
                    :label="
                      selectedAddressType === shipping
                        ? $t('preferences.profile.shipping_address')
                        : $t('preferences.profile.billing_address')
                    "
                    label-for="input-first-name"
                  >
                    <b-form-input
                      id="input-group-shipping-autocomplete"
                      v-model="form.address"
                      class="input-box"
                      :state="errors[0] ? false : valid ? true : null"
                      type="text"
                    ></b-form-input>
                    <b-form-invalid-feedback id="inputLiveFeedback">{{
                      errors[0]
                    }}</b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>
                <!-- Shipping/ Billing Address ends -->
              </div>
            </div>

            <div class="row">
              <div class="col-12">
                <!-- Apt, Suite, Unit, Building  -->
                <ValidationProvider
                  rules="alphaNum"
                  :name="$t('preferences.profile.apt_suite_unit_building')"
                >
                  <b-form-group
                    id="input-apt"
                    slot-scope="{ valid, errors }"
                    class="input-labels"
                    :label="$t('preferences.profile.apt_suite_unit_building')"
                    label-for="input-first-name"
                  >
                    <b-form-input
                      id="input-apt"
                      v-model="form.apt"
                      class="input-box"
                      :state="errors[0] ? false : valid ? true : null"
                      type="text"
                    ></b-form-input>
                    <b-form-invalid-feedback id="inputLiveFeedback">{{
                      errors[0]
                    }}</b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>
                <!-- Apt, Suite, Unit, Building  ends -->
              </div>
            </div>

            <div class="row">
              <div class="col-12">
                <!-- City -->
                <ValidationProvider
                  :rules="{ required: true, min: 3, max: 64 }"
                  :name="$t('preferences.profile.city')"
                >
                  <b-form-group
                    id="input-city"
                    slot-scope="{ valid, errors }"
                    class="input-labels"
                    :label="$t('preferences.profile.city')"
                    label-for="input-first-name"
                  >
                    <b-form-input
                      id="input-city"
                      v-model="form.city"
                      class="input-box"
                      :state="errors[0] ? false : valid ? true : null"
                      type="text"
                    ></b-form-input>
                    <b-form-invalid-feedback id="inputLiveFeedback">{{
                      errors[0]
                    }}</b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>
                <!-- City ends -->
              </div>
            </div>

            <div class="row">
              <div class="col">
                <!-- State -->
                <ValidationProvider
                  :rules="{ required: true, min: 3, max: 64 }"
                  :name="$t('preferences.profile.state')"
                >
                  <b-form-group
                    id="input-apt"
                    slot-scope="{ valid, errors }"
                    class="input-labels"
                    :label="$t('preferences.profile.state')"
                    label-for="input-first-name"
                  >
                    <b-form-input
                      id="input-apt"
                      v-model="form.state"
                      class="input-box"
                      :state="errors[0] ? false : valid ? true : null"
                      type="text"
                    ></b-form-input>
                    <b-form-invalid-feedback id="inputLiveFeedback">{{
                      errors[0]
                    }}</b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>
                <!-- State ends -->
              </div>
              <div class="col">
                <!-- Zip/ Postal Code -->
                <ValidationProvider
                  :rules="{ required: true, min: 5, max: 10 }"
                  :name="$t('preferences.profile.zip')"
                >
                  <b-form-group
                    id="input-apt"
                    slot-scope="{ valid, errors }"
                    class="input-labels"
                    :label="$t('preferences.profile.zip')"
                    label-for="input-first-name"
                  >
                    <b-form-input
                      id="input-apt"
                      v-model="form.zip"
                      class="input-box"
                      :state="errors[0] ? false : valid ? true : null"
                      type="text"
                    ></b-form-input>
                    <b-form-invalid-feedback id="inputLiveFeedback">{{
                      errors[0]
                    }}</b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>
                <!-- Zip/ Postal code ends -->
              </div>
            </div>

            <div class="row">
              <div class="col-12">
                <!-- Country -->
                <ValidationProvider
                  :rules="{ required: true }"
                  :name="$t('preferences.profile.country')"
                >
                  <b-form-group
                    id="input-country"
                    slot-scope="{ valid, errors }"
                    class="input-labels"
                    :label="$t('preferences.profile.country')"
                    label-for="input-first-name"
                  >
                    <b-form-input
                      id="input-country"
                      v-model="form.country"
                      class="input-box"
                      :state="errors[0] ? false : valid ? true : null"
                      type="text"
                    ></b-form-input>
                    <b-form-invalid-feedback id="inputLiveFeedback">{{
                      errors[0]
                    }}</b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>
                <!-- Country ends -->
              </div>
            </div>
            <div v-if="showDefaultCheckBox" class="row">
              <div class="col-12">
                <b-form-checkbox
                  id="default-checkbox"
                  v-model="form.default"
                  name="checkbox-default"
                >
                  {{ $t('preferences.common.make_as_default') }}
                </b-form-checkbox>
              </div>
            </div>
          </b-card>

          <div class="row">
            <b-col v-if="buttonSpinnerLoading" md="12" class="text-center">
              <b-spinner variant="color-blue-2"></b-spinner>
            </b-col>
            <div v-else class="col-12">
              <b-button
                class="
                  btn-block
                  d-flex
                  align-items-center
                  text-center
                  border-0
                  justify-content-center
                "
                :class="isFormValid && 'active'"
                variant="add"
                type="submit"
              >
                {{
                  getActionType === add
                    ? $t('preferences.profile.add_address')
                    : $t('common.save_changes')
                }}
              </b-button>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>

    <!-- Delete Address Bottom Sheet -->
    <MobileBottomSheet
      id="delete-confirmation-sheet"
      :has-header-divider="false"
      :height="'27%'"
      :open="deleteConfirmation"
      :title="''"
      @closed="deleteConfirmation = false"
      @opened="deleteConfirmation = true"
    >
      <div class="delete-confirmation">
        <div class="row">
          <div class="col-12 px-5">
            <div class="confirmation-text text-center">
              {{
                $t('preferences.profile.delete_address', {
                  type: selectedAddressType,
                })
              }}
            </div>
          </div>
          <div class="col-12 mt-4">
            <b-button
              variant="outline w-50"
              class="
                confirm-btn
                d-flex
                align-items-center
                text-align-center
                justify-content-center
                mx-auto
                text-center
              "
              @click="deleteConfirm"
            >
              {{ $t('common.yes') }}
            </b-button>
          </div>
          <div class="col-12">
            <b-button
              variant="outline w-50"
              class="
                d-flex
                bg-white
                align-items-center
                text-align-center
                cancel-button
                justify-content-center
                mx-auto
              "
              @click="deleteCancel"
            >
              {{ $t('common.no') }}
            </b-button>
          </div>
          <div class="col-12 d-flex justify-content-center">
            <img
              :src="require('~/assets/img/icons/home_indicator.svg')"
              alt="home-indicator"
            />
          </div>
        </div>
      </div>
    </MobileBottomSheet>
    <!-- Delete address bottom sheet confirmation -->

    <!-- Make as default Bottom Sheet -->
    <MobileBottomSheet
      id="make-as-default-sheet"
      :has-header-divider="false"
      :height="'27%'"
      :open="makeDefault"
      :title="''"
      @closed="makeDefault = false"
      @opened="makeDefault = true"
    >
      <div class="delete-confirmation">
        <div class="row">
          <div class="col-12 px-5">
            <div class="confirmation-text text-center">
              {{
                $t('preferences.profile.make_as_default', {
                  type: selectedAddressType,
                })
              }}
            </div>
          </div>
          <div class="col-12 mt-4">
            <b-button
              variant="outline w-50"
              class="
                confirm-btn
                d-flex
                align-items-center
                text-align-center
                justify-content-center
                mx-auto
                text-center
              "
              @click="confirmDefault"
            >
              {{ $t('common.yes') }}
            </b-button>
          </div>
          <div class="col-12">
            <b-button
              variant="outline w-50"
              class="
                d-flex
                bg-white
                align-items-center
                text-align-center
                cancel-button
                justify-content-center
                mx-auto
              "
              @click="cancelDefault"
            >
              {{ $t('common.no') }}
            </b-button>
          </div>
          <div class="col-12 d-flex justify-content-center">
            <img
              :src="require('~/assets/img/icons/home_indicator.svg')"
              alt="home-indicator"
            />
          </div>
        </div>
      </div>
    </MobileBottomSheet>
    <!-- Make as default Bottom Sheet confirmation -->

    <!-- Default Address Bottom Sheet -->
    <MobileBottomSheet
      id="default-address"
      :has-header-divider="false"
      :height="'27%'"
      :open="oneDefaultAddress"
      :title="''"
      @closed="oneDefaultAddress = false"
      @opened="oneDefaultAddress = true"
    >
      <div class="delete-confirmation">
        <div class="row">
          <div class="col-12 px-5">
            <div class="confirmation-text text-center">
              {{
                $t('preferences.profile.atleast_one_address', {
                  type: selectedAddressType,
                })
              }}
            </div>
          </div>
          <div class="col-12 mt-4">
            <b-button
              variant="outline w-50"
              class="
                confirm-btn
                d-flex
                text-center
                align-items-center
                text-align-center
                justify-content-center
                mx-auto
              "
              @click="onDefaultAddressConfirm"
            >
              {{ $t('giftcard_section.add_new_default') }}
            </b-button>
          </div>
          <div class="col-12">
            <b-button
              variant="outline w-50"
              class="
                d-flex
                bg-white
                align-items-center
                text-align-center
                cancel-button
                justify-content-center
                mx-auto
              "
              @click="onDefaultAddressClose"
            >
              {{ $t('common.dismiss') }}
            </b-button>
          </div>
          <div class="col-12 d-flex justify-content-center home">
            <img
              :src="require('~/assets/img/icons/home_indicator.svg')"
              alt="home-indicator"
            />
          </div>
        </div>
      </div>
    </MobileBottomSheet>
    <!-- Default address bottom sheet confirmation -->

    <!-- Discard changes -->
    <MobileBottomSheet
      id="discard-changes"
      :has-header-divider="false"
      :height="'27%'"
      :open="discardchanges"
      :title="''"
      @closed="discardchanges = false"
      @opened="discardchanges = true"
    >
      <div class="delete-confirmation">
        <div class="row">
          <div class="col-12 px-5">
            <div class="confirmation-text text-center">
              <span>{{ $t('preferences.profile.unsaved_changes') }}</span
              ><br />
              <span>{{ $t('preferences.profile.need_to_leave') }}</span>
            </div>
          </div>
          <div class="col-12 mt-4">
            <b-button
              variant="outline w-50"
              class="
                confirm-btn
                d-flex
                text-center
                align-items-center
                text-align-center
                justify-content-center
                mx-auto
              "
              @click="onDiscardConfirm"
            >
              {{ $t('common.yes') }}
            </b-button>
          </div>
          <div class="col-12">
            <b-button
              variant="outline w-50"
              class="
                d-flex
                bg-white
                align-items-center
                text-align-center
                cancel-button
                justify-content-center
                mx-auto
              "
              @click="onDiscardCancel"
            >
              {{ $t('common.no') }}
            </b-button>
          </div>
          <div class="col-12 d-flex justify-content-center home">
            <img
              :src="require('~/assets/img/icons/home_indicator.svg')"
              alt="home-indicator"
            />
          </div>
        </div>
      </div>
    </MobileBottomSheet>
    <!-- ./Discard changes sheet -->
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { mapGetters, mapActions } from 'vuex'
import emitEvent from '~/plugins/mixins/emit-event'
import { countryRestriction } from '~/static/constants/address'
import MobileBottomSheet from '~/components/mobile/MobileBottomSheet.vue'
import {
  ADD, EDIT, SHIPPING, BILLING
} from '~/static/constants'
export default {
  name: 'AddressForm',

  components: {
    ValidationObserver,
    ValidationProvider,
    MobileBottomSheet,
  },

  mixins: [emitEvent],

  data() {
    return {
      status: false,

      form: {
        address: '',
        apt: '',
        city: '',
        state: '',
        country: '',
        zip: '',
        default: false,
      },
      id: '',
      add: ADD,
      edit: EDIT,
      shipping: SHIPPING,
      billing: BILLING,
      buttonSpinnerLoading: false,
      deleteConfirmation: false,
      makeDefault: false,
      oneDefaultAddress: false,
      discardchanges: false,
      updateConfirmed: false,
    }
  },

  computed: {
    ...mapGetters({
      getShippingAddress: 'auth/getShippingAddress',
      getBillingAddress: 'auth/getBillingAddress',
      selectedAddressType: 'preferences/getSelectedAddressType',
      defaultShipping: 'auth/getShippingAddress',
      defaultBilling: 'auth/getBillingAddress',
      getActionType: 'preferences/getActionType',
      editAddressID: 'preferences/editAddressID',
    }),

    checkDefault: (vm) => {
      if (vm.selectedAddressType === vm.shipping) {
        if (vm.defaultShipping && vm.defaultShipping.id === vm.id) {
          return true
        } else {
          return false
        }
      }

      if (vm.selectedAddressType === vm.billing) {
        if (vm.defaultBilling && vm.defaultBilling.id === vm.id) {
          return true
        } else {
          return false
        }
      }
    },
    shippingAddress: (vm) => {
      return vm.getShippingAddress
    },
    isFormValid: (vm) => {
      return vm.form.address && vm.form.city && vm.form.state && vm.form.country
    },

    showDefaultCheckBox: (vm) => {
      if (vm.getActionType === vm.add) {
          if (vm.selectedAddressType === vm.shipping && vm.defaultShipping) {
            vm.form.default = false
            return true
          } else {
            vm.form.default = true
          }
          if (vm.selectedAddressType === vm.billing && vm.defaultBilling) {
            vm.form.default = false
            return true
          } else {
            vm.form.default = true
          }
        
      } else {
        return true
      }
    },

    defaultValue: (vm) => {
      return vm.form.default
    },
  },

  watch: {
    defaultValue(newValue, oldValue) {
      if (this.getActionType === this.edit) {
        if (
          (this.selectedAddressType === this.shipping &&
            this.defaultShipping.id === this.id) ||
          (this.selectedAddressType === this.billing &&
            this.defaultBilling.id === this.id)
        ) {
          if (oldValue) {
            this.oneDefaultAddress = true
          } else {
            this.oneDefaultAddress = false
          }
        } else if (newValue) {
          this.makeDefault = true
        } else {
          this.makeDefault = false
        }
      }
    },
  },

  created() {
    this.$auth.fetchUser()
    this.getUserDetails()
    this.loadAddress()
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
            this.form.address = component.long_name
            break
          }
          case 'route': {
            this.form.address = this.form.address + ' ' + component.short_name
            break
          }
          case 'locality': {
            this.form.city = component.long_name
            break
          }
          case 'administrative_area_level_1': {
            this.form.state = component.long_name
            break
          }
          case 'postal_code': {
            this.form.zip = component.short_name
            break
          }
          case 'country': {
            this.form.country = component.short_name
            break
          }
        }
      }
    })
  },

  methods: {
    ...mapActions({
      getUserDetails: 'auth/getUserDetails',
      updateDefaultAddress: 'preferences/updateDefaultAddress',
      addressDelete: 'preferences/addressDelete',
    }),

    // move back
    moveBack() {
      if (this.getActionType === this.add) {
        if (this.defaultShipping || this.defaultBilling) {
          this.$auth.$storage.removeState('showDefault')
          this.emitRenderComponentEvent(
            this.$parent.$options.components.AddressList.name
          )
        } else {
          this.emitRenderComponentEvent(
            this.$parent.$options.components.YourAddress.name
          )
        }
      }

      if (this.getActionType === this.edit) {
        this.discardchanges = true
      }
    },

    // delete address
    deleteAddress() {
      if (this.getActionType === this.edit && this.editAddressID) {
        this.deleteConfirmation = true
      }
    },

    // load address on eidt
    loadAddress() {
      if (this.getActionType === this.edit) {
        this.$axios
          .get(`address/${this.editAddressID}`, {
            handleError: false,
          })
          .then((res) => {
            const address = res.data.data
            this.form.address = address.address_line_1
            this.form.apt = address.address_line_2
            this.form.city = address.city
            this.form.state = address.state
            this.form.country = address.country
            this.form.zip = address.zip
            this.form.default = address.is_default === 1
            this.id = address.id
          })
          .catch((err) => {
            this.$logger.logToServer('Address error', err.response)
          })
      }
    },

    // On default address close
    onDefaultAddressClose() {
      this.form.default = true
      this.oneDefaultAddress = false
    },

    // on change default address
    onDefaultAddressConfirm() {
      this.$store.dispatch('preferences/actionType', this.add)
      this.$auth.$storage.setState('updateConfirm', true)
      this.$auth.$storage.setState('loadAddressForm', true)
      this.emitRenderComponentEvent(
        this.$parent.$options.components.YourAddress.name
      )
      
    },

    onSubmit() {
      this.$refs.observer.validate().then((success) => {
        if (success) {
          this.onSubmitForm()
        }
      })
    },

    // on form submit
    onSubmitForm() {
      this.buttonSpinnerLoading = true
      if (
        this.getActionType === this.add &&
        this.selectedAddressType === this.shipping &&
        !this.getShippingAddress
      ) {
        this.form.default = true
      }
      if (
        this.getActionType === this.add &&
        this.selectedAddressType === this.billing &&
        !this.getBillingAddress
      ) {
        this.form.default = true
      }
      // if type is add
      if (this.getActionType === this.add) {
        this.$axios
          .post('/preferences/profile/add-address', {
            type: this.selectedAddressType,
            firstName: this.$auth.user.first_name,
            lastName: this.$auth.user.last_name,
            shippingBillingAddress: this.form.address,
            aptSuiteBuilding: this.form.apt,
            city: this.form.city,
            state: this.form.state,
            zip: this.form.zip,
            country: this.form.country,
            isDefault: this.form.default,
          })
          .then((res) => {
            if (this.form.default || this.$auth.$storage.getState('updateConfirm')) {
              this.updateDefaultAddress({
                id: res.data.data.id,
                type: this.selectedAddressType,
              })

              this.$auth.$storage.removeState('updateConfirm')
            }
            
            this.getUserDetails()
            this.$auth.$storage.setState('showSuccessModal', true)
            this.emitRenderComponentEvent(
              this.$parent.$options.components.AddressList.name
            )
            return true
          })
          .catch((err) => {
            this.buttonSpinnerLoading = false
            this.$logger.logToServer(
              'Preferences Section - Add Address:',
              err.response
            )
            return true
          })
      }

      // if type is edit
      if (this.getActionType === this.edit) {
        this.$axios
          .put(`preferences/profile/address/${this.editAddressID}`, {
            type: this.selectedAddressType,
            first_name: this.$auth.user.first_name,
            last_name: this.$auth.user.last_name,
            address_line_1: this.form.address,
            address_line_2: this.form.apt,
            city: this.form.city,
            state: this.form.state,
            zip: this.form.zip,
            country: this.form.country,
            isDefault: this.form.default,
          })
          .then((res) => {
            this.buttonSpinnerLoading = false
            this.$auth.$storage.setState('showEditModal', true)
            this.emitRenderComponentEvent(
              this.$parent.$options.components.AddressList.name
            )
          })
          .catch((err) => {
            this.$logger.logToServer('Update address error', err.response)
          })
      }
    },

    // clear form
    clearForm() {
      this.form.address = ''
      this.form.apt = ''
      this.form.city = ''
      this.form.state = ''
      this.form.country = ''
      this.form.zip = ''
    },

    // on delete confirm
    deleteConfirm() {
      this.addressDelete(this.editAddressID)
        .then((res) => {
          this.deleteConfirmation = false
          this.emitRenderComponentEvent(
            this.$parent.$options.components.AddressList.name
          )
        })
        .catch((err) => {
          this.$logger.logToServer('Delete address error:', err.response)
        })
    },

    // On delete cancel
    deleteCancel() {
      this.deleteConfirmation = false
    },

    // on cancel default
    cancelDefault() {
      this.form.default = false
      this.makeDefault = false
    },

    // on confirm default
    confirmDefault() {
      this.updateDefaultAddress({
        id: this.editAddressID,
        type: this.selectedAddressType,
      })
        .then((res) => {
          this.$auth.$storage.setState('showDefault', true)
          this.emitRenderComponentEvent(
            this.$parent.$options.components.AddressList.name
          )
          this.cancelDefault()
        })
        .catch((err) => {
          this.$logger.logToServer('Update default: ', err.response)
        })
    },
    // On discard sheet
    onDiscardCancel() {
      this.discardchanges = false
    },

    // on confirm sheet
    onDiscardConfirm() {
      this.emitRenderComponentEvent(
        this.$parent.$options.components.AddressList.name
      )
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
#delete-confirmation-sheet::v-deep,
#make-as-default-sheet::v-deep,
#default-address,
#discard-changes
  .confirmation-text
    font-family: $font-sp-pro
    font-style: normal
    @include body-32-normal
    color: $color-black-1
  .confirm-btn
    background: $color-blue-20
    border-radius: 21px
    font-family: $font-sp-pro
    font-style: normal
    @include body-13-medium
    color: $color-white-1
  .cancel-button
    font-family: $font-sp-pro
    font-style: normal
    @include body-17-medium
    color: $color-blue-20
.your-address-form::v-deep
  .address-form
    .btn-add
      height: 40px
      left: 18px
      bottom: 96px
      background: $color-gray-21
      border-radius: 20px
      font-family: $font-sp-pro
      font-style: normal
      @include body-17-medium
      color: $color-gray-47
      &.active
        background: $color-blue-20
        color: $color-white-1
    .fill-missing-fields
      font-family: $font-montserrat
      font-style: normal
      @include body-18-medium
      color: $color-red-3
    .address-card
      .address-heading
        font-family: $font-sp-pro
        font-style: normal
        @include body-13-medium
        letter-spacing: 0.02em
        color: $color-blue-20
      .sub-text
        font-family: $font-sp-pro
        font-style: normal
        @include body-21-regular
        color: $color-gray-5
      #default-checkbox::v-deep
        label
          font-family: $font-sf-pro-text
          font-style: normal
          @include body-6-normal
          color: $color-black-1

      #input-address,
      #input-apt,
      #input-city,
      #input-country
        label
          font-family: $font-montserrat
          font-style: normal
          // font-weight: 600
          // font-size: 11px
          // line-height: 13px
          @include body-6-medium
          display: flex // Used for bootstrap input label
          align-items: center // Used for bootstrap input label
          color: $color-black-17
        input
          // width: 310px
          height: 49px
          left: 33px
          top: 211px
          background: $color-white-1
          border: 1px solid $white-5
          border-radius: 10px
          &.is-invalid
            border: 1px solid $color-red-3
      #input-group-shipping-autocomplete
        &::placeholder
          font-family: $font-montserrat
          font-style: normal
          // font-weight: 500
          // font-size: 12px
          // line-height: 15px
          @include body-9-normal
          display: flex
          align-items: center
          color: $color-black-17
</style>