<template>
  <div v-if="isScreenXS" class="profile-component-wrapper">
    <!-- heading -->
    <div class="border-bottom">
      <span class="mb-2" role="button" @click="moveBack()">
        <img
          :src="require('~/assets/img/icons/back.svg')"
          alt="back-arrow"
          class="float-left"
        />
      </span>

      <span
        class="
          d-flex
          text-align-center
          align-items-center
          justify-content-center
          mt-3
          responsive-heading
          text-capitalize
          mb-3
        "
      >
        {{ $t('preferences.profile.profile') }}

        <span class="mobile-filter postition-absolute mb-3">
          <img
            class="mobile-filter postition-absolute"
            :src="require('~/assets/img/icons/filter-icon.svg')"
            alt="filter-icon"
          />
        </span>
      </span>
    </div>

    <b-card class="mt-3">
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

    <AlertModal
      id="update-profile-success"
      :message="$t('preferences.profile.update_success_content_your')"
      icon="success-tick"
      auto-hide
    />
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { AlertModal } from '~/components/modal'
import screenSize from '~/plugins/mixins/screenSize'

export default {
  name: 'PersonalDetailsUpdate',
  components: {
    AlertModal,
    ValidationObserver,
    ValidationProvider,
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
      this.personalDetails.dateOfBirth = this.$options.filters.formatDate(
        val.dob,
        'YYYY-MM-DD'
      )
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
          this.$toasted.success(this.$t(res.data.message))
        })
        .catch((err) => {
          this.$logger.logToServer(
            'Preferences Profile Update error:',
            err.response.data
          )
          this.$toasted.error(this.$t(err.response.data.message))
        })
      this.$bvModal.show('update-profile-success')
      this.$nuxt.refresh()
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
</style>
