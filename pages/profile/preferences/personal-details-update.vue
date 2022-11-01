<template>
  <div v-if="isScreenXS" class="profile-component-wrapper">
    <!-- heading -->

    <MobileHeader id="mobile-update-header" :title="$t('preferences.profile.profile')" @back="moveBack"></MobileHeader>

    <b-card id="mobile-personal-details-update" class="mt-3">
      <span class="personal-details-heading">
        <span class="d-flex col-sx-8">
          {{ $t('preferences.profile.personal_details') }}
        </span>
      </span>
      <p class="personal-details-sub-heading mt-2 d-flex">
        {{ $t('preferences.profile.update_your_profile') }}
      </p>

      <ValidationObserver ref="observer">
        <form>
          <!-- First Name -->
          <ValidationProvider
            rules="required"
            :name="$t('preferences.profile.first_name')"
          >
            <b-form-group
              slot-scope="{ valid, errors }"
              class="input-labels"
              :label="$t('preferences.profile.first_name')"
              label-for="input"
            >
              <b-form-input
                id="input"
                v-model="personalDetails.firstName"
                class="input-box"
                :state="errors[0] ? false : valid ? true : null"
                type="text"
              ></b-form-input>

              <span class="input-not-valid"> </span>
            </b-form-group>
          </ValidationProvider>
          <!-- First Name -->

          <!-- Last Name -->
          <ValidationProvider
            rules="required"
            :name="$t('preferences.profile.last_name')"
          >
            <b-form-group
              slot-scope="{ valid, errors }"
              class="input-labels"
              :label="$t('preferences.profile.last_name')"
              label-for="input"
            >
              <b-form-input
                id="input"
                v-model="personalDetails.lastName"
                class="input-box"
                :state="errors[0] ? false : valid ? true : null"
                type="text"
              ></b-form-input>
            </b-form-group>
          </ValidationProvider>
          <!-- Last Name -->

          <!-- Birth day NEED TO CHANGE -->
          <ValidationProvider
            rules="required"
            :name="$t('preferences.profile.birthday')"
          >
            <b-form-group
              slot-scope="{ valid, errors }"
              class="input-labels"
              :label="$t('preferences.profile.birthday')"
              label-for="input"
            >
              <b-form-input
                id="input"
                v-model="personalDetails.dateOfBirth"
                class="input-box"
                :state="errors[0] ? false : valid ? true : null"
                type="date"
              ></b-form-input>
              <!-- @input="inputDate($event)"   -->
            </b-form-group>
          </ValidationProvider>
          <!-- Birth day -->

          <!-- EMAIL -->
          <ValidationProvider
            rules="required"
            :name="$t('preferences.profile.email')"
          >
            <b-form-group
              slot-scope="{ valid, errors }"
              class="input-labels"
              :label="$t('preferences.profile.email')"
              label-for="input"
            >
              <b-form-input
                id="input"
                v-model="personalDetails.email"
                class="input-box"
                :state="errors[0] ? false : valid ? true : null"
                type="email"
              ></b-form-input>
            </b-form-group>
          </ValidationProvider>
          <!-- EMAIL -->

          <!-- Phone -->
          <ValidationProvider
            rules="required"
            :name="$t('preferences.profile.phone_number')"
          >
            <b-form-group
              slot-scope="{ valid, errors }"
              class="input-labels"
              :label="$t('preferences.profile.phone_number')"
              label-for="input"
            >
              <b-form-input
                id="input"
                v-model="personalDetails.phoneNumber"
                class="input-box"
                :state="errors[0] ? false : valid ? true : null"
                type="number"
              ></b-form-input>
            </b-form-group>
          </ValidationProvider>
          <!-- Phone -->
        </form>
      </ValidationObserver>
    </b-card>

    <div :class="isFormValid ? 'hide-error d-none' : 'validation-error'" class="ml-3">
      {{ $t('preferences.profile.form_validation_error') }}
    </div>

    <div class="d-flex justify-content-center mt-4 mb-1">
      <b-button
        variant="update-profile w-100"
        :disabled="!isFormValid"
        class="
          align-items-center
          text-align-center
          d-flex
          justify-content-center
          mt-2
        "
        :class="isFormValid ? 'enabled-class' : 'disabled-class'"
        @click="onSubmit()"
      >
        {{ $t('preferences.common.save_changes') }}
      </b-button>
    </div>

    <TransparentAlertModal
      id="update-profile-success"
      :text="$t('preferences.profile.your_changes_have_been_saved')"
      :show="showAlert"
      @hide="listenModalClose"
    />
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import TransparentAlertModal from '~/components/common/TransparentAlertModal.vue'
import screenSize from '~/plugins/mixins/screenSize'
import MobileHeader from '~/components/mobile/MobileHeader.vue'

export default {
  name: 'PersonalDetailsUpdate',
  components: {
    TransparentAlertModal,
    ValidationObserver,
    ValidationProvider,
    MobileHeader
  },
  mixins: [screenSize],

  layout: 'Profile',

  middleware: 'auth',

  data() {
    return {
      userID: this.$store.state.auth.user.id,
      personalDetails: {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        email: '',
        phoneNumber: '',
      },
      validationEroor: false,
      formFilled: false,
      showAlert: false
    }
  },

  computed: {
    // checking all the input fields are updated or not
    isFormValid() {
      return (
        this.personalDetails.firstName &&
        this.personalDetails.lastName &&
        this.personalDetails.dateOfBirth &&
        this.personalDetails.email &&
        this.personalDetails.phoneNumber
      )
    },
  },

  mounted() {
    this.setPersonalDetails()
  },

  methods: {
    onSubmit() {
      this.$refs.observer.validate().then((success) => {
        if (success) {
          // Update the personal details.
          this.updatePersonalDetails()
        }
      })
    },

    listenModalClose(){
      this.showAlert = false
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

    moveBack() {
      this.$router.push('/profile/preferences')
    },

    // Profile details
    setProfileDetails(val) {
      this.personalDetails.firstName = val.first_name
      this.personalDetails.lastName = val.last_name
      this.personalDetails.email = val.email
      this.personalDetails.phoneNumber = val.phoneNumber

      // Set the selected value for date of birth selected box
      const structuredDOB = val.dob ? val.dob.split('-') : ''
      // Current date is shown if dob is null
      const date = parseInt(structuredDOB[0]) // To remove leading 0 if date is between 1-9
      const month = parseInt(structuredDOB[1]) // To remove leading 0 if month is between 1-9
      const year = parseInt(structuredDOB[2])
      this.personalDetails.dateOfBirth = `${date}/${month}/${year}`
    },

    // Update the personal profiledetails
    updatePersonalDetails() {
      this.personalDetails.dateOfBirth = this.$options.filters.formatDate(
        this.personalDetails.dateOfBirth,
        'DD-MM-YYYY'
      )
      this.$axios
        .put(`/preferences/profile/${this.userID}/update-personal-details`, {
          personal: this.personalDetails,
        })
        .then((res) => {
          this.showAlert = true
          this.$nuxt.refresh()
        })
        .catch((err) => {
          this.$logger.logToServer(
            'Preferences Profile Update error:',
            err.response.data
          )
          this.$toasted.error(this.$t(err.response.data.message))
        })
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.profile-component-wrapper
  padding: 4%

.responsive-heading
  font-family: $font-montserrat
  font-style: normal
  @include body-3-medium
  letter-spacing: -0.02em
  color: $color-black-1
  background-color: $color-white-1

.personal-details-heading
  font-family: $font-sp-pro
  font-style: normal
  @include body-4-medium
  color: $color-blue-20

.personal-details-sub-heading
  font-family: $font-sp-pro
  font-style: normal
  @include body-10-regular
  color: $color-black-16

.input-labels
  font-family: $font-montserrat
  font-style: normal
  @include body-6-medium
  color: $color-black-16

.input-box
  height: 49px
  background: $color-white-1
  border: 1px solid $color-gray-3
  border-radius: 10px
  &.is-invalid
    border: 1px solid $color-red-3

.btn-update-profile
  border-radius: 21px
  width: 216px
  height: 40px
  font-family: $font-sp-pro
  font-style: normal
  @include body-4-medium

.enabled-class
  background: $color-blue-20
  color: $color-white-1

.disabled-class
  background: $color-gray-21
  color: $color-gray-47

.mobile-filter
  right: 10px

.validation-error
  font-family: $font-montserrat
  font-style: normal
  @include body-18-medium
  color: $color-red-3
#mobile-update-header::v-deep
  .title
    font-family: $font-montserrat
    font-style: normal
    @include body-3-medium
    display: flex
    align-items: center
    text-align: center
    letter-spacing: -0.02em
    color: $color-black-1
#mobile-personal-details-update::v-deep
  input
    font-family: $font-montserrat
    font-style: normal
    @include body-9-normal
    display: flex
    align-items: center
    color: $color-black-1
</style>
