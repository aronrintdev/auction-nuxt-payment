<template>
  <div class="profile-component-wrapper">
    <!-- Personal Details Section -->
    <b-col cols="12" class="personal-details">
      <ValidationObserver ref="observer">
        <form @submit.prevent="onSubmit">
          <!-- Profile Section -->
          <b-card :title="$t('preferences.profile.personal_details')">
            <!-- Profile - Description -->
            <div class="card-text">
              {{ $t('preferences.profile.update_your_profile') }}
              <b-button
                class="preferences-logout-btn float-right px-3"
                size="sm"
                variant="light"
                pill
                @click="profileReadOnly = !profileReadOnly"
              >
                <i class="fa fa-edit"></i>
              </b-button>
            </div>

            <!-- Profile - Description -->
            <div class="card-text pt-3">
              <b-row>
                <!-- First Name -->
                <b-col md="3">
                  <ValidationProvider
                    rules="required"
                    :name="$t('preferences.profile.first_name')"
                  >
                    <b-form-group
                      id="input-first-name"
                      slot-scope="{ valid, errors }"
                      class="profile-label"
                      :label="$t('preferences.profile.first_name')"
                      label-for="input-first-name"
                    >
                      <b-form-input
                        id="input-first-name"
                        v-model="personalDetails.firstName"
                        class="profile-input disable"
                        :state="errors[0] ? false : valid ? true : null"
                        type="text"
                        :readonly="profileReadOnly"
                      ></b-form-input>
                      <b-form-invalid-feedback id="inputLiveFeedback">{{
                        errors[0]
                      }}</b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>
                </b-col>

                <!-- ./ First Name -->
                <!-- Last Name -->
                <b-col md="3">
                  <ValidationProvider
                    rules="required"
                    :name="$t('preferences.profile.last_name')"
                  >
                    <b-form-group
                      id="input-group"
                      slot-scope="{ valid, errors }"
                      class="profile-label"
                      :label="$t('preferences.profile.last_name')"
                      label-for="input-last-name"
                    >
                      <b-form-input
                        id="input-last-name"
                        v-model="personalDetails.lastName"
                        class="profile-input"
                        :state="errors[0] ? false : valid ? true : null"
                        type="text"
                        :readonly="profileReadOnly"
                      ></b-form-input>
                      <b-form-invalid-feedback id="inputLiveFeedback">{{
                        errors[0]
                      }}</b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>
                </b-col>
                <!-- ./Last Name -->
                <!-- Birthday -->
                <b-col md="4">
                  <b-form-group
                    id="input-group"
                    class="profile-label"
                    :label="$t('preferences.profile.birthday')"
                    label-for="input"
                  >
                    <!-- Dropdown for date - month - year -->
                    <b-row>
                      <!-- Year -->
                      <b-col
                        md="4"
                        sm="12"
                        class="dob-selector d-flex shadow-none rounded-pill"
                      >
                        <b-form-select
                          v-model="selectedYear"
                          class="profile-input year-select shadow-none"
                          required
                          :disabled="profileReadOnly"
                          @change="updateDays()"
                        >
                          <b-form-select-option
                            v-for="year in years"
                            :key="year.year"
                            :value="year.year"
                            >{{ year.year }}</b-form-select-option
                          >
                        </b-form-select>
                        <div class="date-icon m-auto">
                          <img :src="dateIcon" alt="date-icon" />
                        </div>
                      </b-col>
                      <!-- ./Year -->
                      <!-- Months -->
                      <b-col
                        md="4"
                        sm="12"
                        class="dob-selector d-flex rounded-pill"
                      >
                        <b-form-select
                          v-model="selectedMonth"
                          class="profile-input month-select shadow-none"
                          required
                          :disabled="profileReadOnly"
                          @change="updateDays()"
                        >
                          <b-form-select-option
                            v-for="(month, index) in months"
                            :key="month.month"
                            :value="index + 1"
                            >{{ month.month }}</b-form-select-option
                          >
                        </b-form-select>
                        <div class="date-icon m-auto">
                          <img :src="dateIcon" alt="date-icon" />
                        </div>
                      </b-col>
                      <!-- ./Months -->
                      <!-- Date -->
                      <b-col
                        md="3"
                        sm="12"
                        class="dob-selector d-flex rounded-pill"
                      >
                        <b-form-select
                          v-model="selectedDate"
                          class="profile-input date-select shadow-none"
                          required
                          :disabled="profileReadOnly"
                        >
                          <b-form-select-option
                            v-for="day in days"
                            :key="day.day"
                            :value="day.day"
                            >{{ day.day }}</b-form-select-option
                          >
                        </b-form-select>
                        <div class="date-icon m-auto">
                          <img :src="dateIcon" alt="date-icon" />
                        </div>
                      </b-col>
                      <!-- ./Date -->
                    </b-row>
                    <!-- Dropdown for date - month - year -->
                  </b-form-group>
                </b-col>
                <!-- ./BIRTHDAY -->
              </b-row>
              <b-row>
                <!-- Email -->
                <b-col md="3">
                  <ValidationProvider
                    rules="required|email"
                    :name="$t('preferences.profile.email')"
                  >
                    <b-form-group
                      id="input-group"
                      slot-scope="{ valid, errors }"
                      class="profile-label"
                      :label="$t('preferences.profile.email')"
                      label-for="input-email"
                    >
                      <b-form-input
                        id="input-email"
                        v-model="personalDetails.email"
                        :state="errors[0] ? false : valid ? true : null"
                        class="profile-input"
                        type="email"
                        :readonly="profileReadOnly"
                      ></b-form-input>
                      <b-form-invalid-feedback id="inputLiveFeedback">{{
                        errors[0]
                      }}</b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>
                </b-col>
                <!-- ./EMAIL -->
                <!-- PHONE NUMBER -->
                <b-col md="3">
                  <ValidationProvider
                    rules="required|numeric"
                    :name="$t('preferences.profile.phone_number')"
                  >
                    <b-form-group
                      id="input-group"
                      slot-scope="{ valid, errors }"
                      class="profile-label"
                      :label="$t('preferences.profile.phone_number')"
                      label-for="input-phone-number"
                    >
                      <b-form-input
                        id="input-phone-number"
                        v-model="personalDetails.phoneNumber"
                        class="profile-input"
                        :state="errors[0] ? false : valid ? true : null"
                        type="text"
                        :readonly="profileReadOnly"
                      ></b-form-input>
                      <b-form-invalid-feedback id="inputLiveFeedback">{{
                        errors[0]
                      }}</b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>
                </b-col>
                <!-- ./PHONE NUMBER -->
              </b-row>
            </div>
            <div class="card-text">
              <b-button
                v-if="!profileReadOnly"
                variant="light"
                type="submit"
                pill
                class="float-right preferences-logout-btn px-3"
                >{{ $t('preferences.profile.update') }}</b-button
              >
            </div>
          </b-card>
          <!-- ./Profile Section -->
        </form>
      </ValidationObserver>
    </b-col>
    <!-- ./PERSONAL DETAILS SECTION -->

    <!-- YOUR ADDRESSES -->
    <b-col cols="12" class="your-addresses mt-5">
      <b-card :title="$t('preferences.profile.your_addresses')">
        <!-- YOUR ADDRESS DESCRIPTION -->
        <div class="card-text">
          {{ $t('preferences.profile.address_description') }}
        </div>
        <!-- ./YOUR ADDRESS DESCRIPTION -->
        <!-- SHIPPING-ADDRESS -->
        <div class="your-addresses-shipping-address">
          <div class="card-text">
            <b-row class="mt-md-4 mt-4">
              <b-col md="6" sm="6" class="shipping-address mt-2">
                <h5 class="text-bold">
                  {{ $t('preferences.profile.shipping_address') }}
                </h5>
              </b-col>
              <b-col md="6" sm="6" class="address-button-wrapper mt-2">
                <b-button
                  id="shipping-modal"
                  variant="outline-primary"
                  class="add-new-shipping"
                  pill
                  @click="showAddressModal('shipping')"
                >
                  <span class="address-button-text">
                    {{ $t('preferences.profile.add_shipping_address') }}
                  </span>
                </b-button>
              </b-col>
            </b-row>
            <!-- RADIO - MAKE AS DEFAULT -->
          </div>
          <div v-if="!shipping.length" class="card-text text-center mt-3">
            {{ $t('preferences.profile.no_shipping_address_found') }}
          </div>
          <AddressComponent
            v-for="(address, index) in shipping"
            :key="index"
            :addressType="`shipping`"
            :countries="countries"
            :shippingAddress="address"
            :defaultShippingID="defaultShippingAddressID"
            @updateDefaultAddress="updateDefaultAddress"
            @removeAddress="removeAddress"
          />
        </div>
        <!-- ./SHIPPING-ADDRESS -->
        <hr />
        <!-- Billing Address -->
        <div class="your-addresses-billing-address">
          <div class="card-text">
            <b-row class="mt-md-4 mt-4">
              <b-col md="6" sm="6" class="billing-address mt-2">
                <h5 class="text-bold">
                  {{ $t('preferences.profile.billing_address') }}
                </h5>
              </b-col>
              <b-col md="6" sm="6" class="address-button-wrapper mt-2">
                <b-button
                  id="billing-modal"
                  variant="outline-primary"
                  class="add-new-billing"
                  pill
                  @click="showAddressModal('billing')"
                >
                  <span class="address-button-text">
                    {{ $t('preferences.profile.add_billing_address') }}
                  </span>
                </b-button>
              </b-col>
            </b-row>

            <!-- RADIO - MAKE AS DEFAULT -->
          </div>
          <div v-if="!billing.length" class="card-text text-center mt-3">
            {{ $t('preferences.profile.no_billing_address_found') }}
          </div>
          <AddressComponent
            v-for="(address, index) in billing"
            :key="index"
            :addressType="`billing`"
            :countries="countries"
            :billingAddress="address"
            :defaultBillingID="defaultBillingAddressID"
            @updateDefaultAddress="updateDefaultAddress"
            @removeAddress="removeAddress"
          />
        </div>
        <!-- ./Billing Address -->
      </b-card>
    </b-col>
    <!-- ./YOUR ADDRESSES -->

    <!-- Social Links -->
    <SocialAccounts />
    <!-- ./Social Links -->
    <AddressModal
      :countries="countries"
      :addressType="activeAddressModal"
      @reload="reload"
    />
    <AddressConfirmModal
      :actionType="actionType"
      @actionConfirmed="actionConfirmed"
    />
    <AddressSuccessModal :actionType="actionType" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import SocialAccounts from './ProfileSection/SocialAccounts.vue'
import AddressComponent from './ProfileSection/AddressComponent.vue'
import { countries } from '~/static/location'
import AddressModal from '@/components/profile/preferences/Popup/AddAddressModal'
import AddressConfirmModal from '@/components/profile/preferences/Popup/AddressConfirmModal'
import AddressSuccessModal from '@/components/profile/preferences/Popup/AddressSuccessModal'
import { MONTHS } from '~/static/constants'
import DateIcon from '~/assets/img/icons/date-icon.svg'
export default {
  name: 'ProfileComponent',

  components: {
    AddressConfirmModal,
    AddressComponent,
    AddressSuccessModal,
    SocialAccounts,
    AddressModal,
    ValidationObserver,
    ValidationProvider,
  },

  middleware: 'auth',

  data() {
    return {
      userID: this.$store.state.auth.user.id,
      // Personal Details
      personalDetails: {
        firstName: '',
        lastName: '',
        // in year months date format
        dateOfBirth: '',
        email: '',
        phoneNumber: '',
      },
      countries, // Countries from constants
      // Billing Address
      billing: {},
      // Shipping Address
      shipping: {},
      activeAddressModal: '',
      update: {
        addressID: '',
        addressType: '',
      },
      profileReadOnly: true,
      // months: MONTHS,
      defaultBillingAddressID: '',
      defaultShippingAddressID: '',
      actionType: '',
      addressDeleteID: '',
      // For the date pick date should to converted to string
      monthNames: MONTHS,
      maxYear: new Date().getFullYear(),
      minYear: '1960',
      selectedDate: '',
      selectedMonth: '',
      selectedYear: '',
      days: [],
      dateIcon: DateIcon,
    }
  },


  computed: {
    // Get the user details from vuex
    ...mapGetters({
      personalUserDetails: 'auth/user',
    }),

    // For date picker select
    // Computes a list of month.
    months() {
      const months = []

      for (let i = 0; i < 12; i++) {
        if (this.monthNames) {
          months.push(this.$t(`monthNames.${this.monthNames[i].text}`))
        }
      }
      // until we have DoB limitation we prevent to choose date from future.
      const currentMonthIndex = new Date().getMonth()
      const currentYear = new Date().getFullYear()
      return months
        .map((month, index) => {
          return { month, selected: index + 1 === this.selectedMonth }
        })
        .filter((month, index) =>
          this.selectedYear === currentYear ? index < currentMonthIndex : true
        )
    },

    // Computes a list of years.
    years() {
      // Set the first year of the array.
      const max = this.maxYear
      const min = this.minYear

      const years = []

      for (let i = max; i >= min; i--) {
        years.push(i)
      }
      // return years
      return years.map((year) => {
        return { year, selected: year === this.selectedYear }
      })
    },
  },

  created() {
    this.updateDays()
  },

  updated() {
    this.sendDate()
  },

  mounted() {
    // Get the personal details
    this.setPersonalDetails()
  },

  methods: {
    onSubmit() {
      // validate all providers before submitting the form.
      // If success then update the personal details.
      // Else will show vee-validate errors.
      this.$refs.observer.validate().then((success) => {
        // If success then update the personal details.
        // In case of error, the vee-validate errors will be shown.
        if (success) {
          // Update the personal details.
          this.updatePersonalDetails()
        }
      })
    },

    // Get the user address
    setPersonalDetails() {
      this.$axios
        .get(`/preferences/profile/get-user-details/${this.userID}`)
        .then((res) => {
          if (res.data.result) {
            const addr = res.data.result
            if (addr.personalDetails) {
              this.setProfileDetails(addr.personalDetails)
            }
            this.shipping = addr.shipping
            this.billing = addr.billing
            this.defaultBillingAddressID = addr.defaultBillingID
            this.defaultShippingAddressID = addr.defaultShippingID
          }
        })
        .catch((err) => {
          this.$logger.logToServer(
            'Preferences Profile Error: ',
            err.response.data
          )
          this.$toasted.error(this.$t(err.response.data.message))
        })
    },

    // Profile details
    setProfileDetails(val) {
      this.personalDetails.firstName = val.first_name
      this.personalDetails.lastName = val.last_name
      this.personalDetails.email = val.email
      this.personalDetails.phoneNumber = val.phoneNumber
      this.personalDetails.dateOfBirth = val.dob
      // Set the selected value for date of birth selected box
      const structuredDOB = val.dob ? val.dob.split('-') : ''
      // Current date is shown if dob is null
      this.selectedDate = parseInt(structuredDOB[0]) // To remove leading 0 if date is between 1-9
      this.selectedMonth = parseInt(structuredDOB[1]) // To remove leading 0 if month is between 1-9
      this.selectedYear = structuredDOB[2]
    },

    // Show the Address Modal
    showAddressModal(type) {
      this.activeAddressModal = type
      this.$bvModal.show('address-type-modal')
    },

    // Update the default address
    updateDefaultAddress(val) {
      this.update = { ...val }
      // For modal
      this.actionType = 'edit'
      this.$bvModal.show('confirm-modal')
    },

    // On address update confirmation
    actionConfirmed(type) {
      // If update confirmed
      if (type === 'confirm') {
        this.$axios
          .put(
            `/preferences/profile/update-address-status/${this.update.addressID}`,
            {
              type: this.update.addressType,
            }
          )
          .then((res) => {
            this.update.addressID = ''
            this.update.addressType = ''
            this.$bvModal.show('preference-success-modal')
            this.reload()
          })
          .catch((err) => {
            // eslint-disable-next-line no-console
            this.update.addressType = ''
            this.$logger.logToServer(
              'Preferences Update Address:',
              err.response.data
            )
            this.$toasted.error(this.$t(err.response.data.message))
            this.reload()
          })
        this.$nuxt.refresh()
      } else if (type === 'delete') {
        // If type is for delete
        this.$axios
          .delete(`/preferences/profile/delete-address/${this.addressDeleteID}`)
          .then(() => {
            this.$bvModal.show('preference-success-modal')
            this.reload()
          })
          .catch((err) => {
            this.$logger.logToServer(
              'Preferences Remove Address:',
              err.response.data
            )
            this.$toasted.error(this.$t(err.response.data.message))
          })
      } else {
        // If canceled
        this.update.addressID = ''
        this.update.addressType = ''
        this.$nuxt.refresh()
      }
    },

    // Remove User address Address
    removeAddress(id) {
      this.addressDeleteID = id
      this.actionType = 'delete'
      this.$bvModal.show('confirm-modal')
    },

    // Update the personal profiledetails
    updatePersonalDetails() {
      this.$axios
        .put(`/preferences/profile/${this.userID}/update-personal-details`, {
          personal: this.personalDetails,
        })
        .then((res) => {
          this.$toasted.success(this.$t(res.data.message))
        })
        .catch((err) => {
          this.$logger.logToServer(
            'Preferences Profile Update error:',
            err.response.data
          )
          this.$toasted.error(this.$t(err.response.data.message))
        })
      this.profileReadOnly = true

      this.$nuxt.refresh()
    },
    // Reload the data
    reload() {
      this.setPersonalDetails()
    },

    // FOR DAte picker
    // Update the days
    updateDays() {
      this.days = this.getDays()
    },

    getDays() {
      const days = []
      const daysNumberOfMonth = new Date(
        this.selectedYear,
        this.selectedMonth,
        0
      ).getDate()
      for (let i = 1; i < daysNumberOfMonth + 1; i++) days.push(i)

      return days.map((day) => {
        return { day, selected: days === this.selectedDay }
      })
    },
    // For the date select box
    sendDate() {
      const date = this.calculatedDate()
      this.personalDetails.dateOfBirth = date
    },
    // For the date select box
    calculatedDate() {
      const day =
        this.selectedDate >= 10 ? this.selectedDate : `0${this.selectedDate}`
      const month =
        this.selectedMonth >= 10 ? this.selectedMonth : `0${this.selectedMonth}`

      return `${day}-${month}-${this.selectedYear}`
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
@media (max-width: 425px)
  .shipping-address,
  .billing-address,
  .address-button-wrapper
    margin-top: 1.5rem

@media (min-width: 768px)
  #shipping-modal,
  #billing-modal
    float: right
.custom-select:disabled
  color: $color-black-1
</style>
