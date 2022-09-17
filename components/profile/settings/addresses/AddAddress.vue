<template>
  <div>
    <h3 style="border-bottom: 1px solid black">{{ addOrEditHeader }}</h3>
    <form @submit.prevent="onSubmit">
      <b-form-group
        id="fieldset-horizontal"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-sm
        content-cols-lg="7"
        :label="$t('settings.addresses.first_name')"
        label-for="first_name"
      >
        <b-form-input id="first_name" v-model="newAddress.first_name" class="settings-addresses-input"
                      type="text"></b-form-input>
      </b-form-group>
      <p v-if="hasErrors('first_name')" class="error-message">
        {{ $t(hasErrors('first_name')) }}
      </p>

      <b-form-group
        id="fieldset-horizontal"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-sm
        content-cols-lg="7"
        :label="$t('settings.addresses.last_name')"
        label-for="last_name"
      >
        <b-form-input id="last_name" v-model="newAddress.last_name" class="settings-addresses-input"
                      type="text"></b-form-input>
      </b-form-group>
      <p v-if="hasErrors('last_name')" class="error-message">
        {{ $t(hasErrors('last_name')) }}
      </p>

      <b-form-group
        id="fieldset-horizontal"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-sm
        content-cols-lg="7"
        description="ex. Street Address, P.O. Box, Company Name"
        :label="$t('settings.addresses.address_line_1')"
        label-for="address_line_1"
      >
        <b-form-input id="address_line_1" v-model="newAddress.address_line_1" class="settings-addresses-input"
                      type="text" placeholder=""></b-form-input>
      </b-form-group>
      <p v-if="hasErrors('address_line_1')" class="error-message">
        {{ $t(hasErrors('address_line_1')) }}
      </p>

      <b-form-group
        id="fieldset-horizontal"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-sm
        content-cols-lg="7"
        description="ex. Street Address, P.O. Box, Company Name, Apartment Number"
        :label="$t('settings.addresses.address_line_2')"
        label-for="address_line_2"
      >
        <b-form-input id="address_line_2" v-model="newAddress.address_line_2" class="settings-addresses-input"
                      type="text"></b-form-input>
      </b-form-group>
      <p v-if="hasErrors('address_line_2')" class="error-message">
        {{ $t(hasErrors('address_line_2')) }}
      </p>


      <b-form-group
        id="fieldset-horizontal"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-sm
        content-cols-lg="7"
        :label="$t('settings.addresses.city')"
        label-for="city"
      >
        <b-form-input id="city" v-model="newAddress.city" class="settings-addresses-input" type="text"></b-form-input>
      </b-form-group>
      <p v-if="hasErrors('city')" class="error-message">
        {{ $t(hasErrors('city')) }}
      </p>

      <b-form-group
        id="fieldset-horizontal"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-sm
        content-cols-lg="7"
        :label="$t('settings.addresses.state')"
        label-for="state"
      >
        <b-form-input id="state" v-model="newAddress.state" class="settings-addresses-input" type="text"></b-form-input>
      </b-form-group>
      <p v-if="hasErrors('state')" class="error-message">
        {{ $t(hasErrors('state')) }}
      </p>

      <b-form-group
        id="fieldset-horizontal"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-sm
        content-cols-lg="7"
        :label="$t('settings.addresses.zip')"
        label-for="zip"
      >
        <b-form-input id="zip" v-model="newAddress.zip" class="settings-addresses-input" type="text"></b-form-input>
      </b-form-group>
      <p v-if="hasErrors('zip')" class="error-message">
        {{ $t(hasErrors('zip')) }}
      </p>

      <b-form-group
        id="fieldset-horizontal"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-sm
        content-cols-lg="7"
        :label="$t('settings.addresses.phone')"
        label-for="phone"
      >
        <b-form-input id="phone" v-model="newAddress.phone" class="settings-addresses-input" type="text"
                      @keypress="phoneNumberFormatter"></b-form-input>
        <div v-if="showSendCodeButton" class="settings-address-phone-send-code" @click="createVerificationCode()">{{$t('settings.addresses.send_code')}}</div>
        <div v-show="showSendCodeTimeoutMessage" class="settings-address-phone-timeout-message">{{$t('settings.addresses.resend_code_message') + countDown + $t('settings.addresses.seconds') }}</div>
      </b-form-group>
      <p v-if="hasErrors('phone')" class="error-message">
        {{ $t(hasErrors('phone')) }}
      </p>

      <b-form-group
        v-if="showVerificationField"
        id="fieldset-horizontal"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-sm
        content-cols-lg="7"
        label-for="verifyPhoneCode"
      >
        <b-form-input id="verifyPhoneCode" v-model="verificationCode" class="settings-addresses-input" type="text"
                      placeholder="Enter Verification Code here"></b-form-input>
        <div class="settings-address-phone-send-code" @click="verifyCode()">{{$t('settings.addresses.verify')}}</div>
        <div v-show="showVerificationStatus">
          <div v-if="newAddress.phoneVerified" class="settings-address-phone-verification-status-verified">{{$t('settings.addresses.verified')}}</div>
          <div v-else class="settings-address-phone-verification-status-not-verified">{{$t('settings.addresses.verify')}}</div>
        </div>
      </b-form-group>
      <p v-if="hasErrors('phoneVerified')" class="error-message">
        {{ $t(hasErrors('phoneVerified')) }}
      </p>

      <div>{{displayDialCode}}</div>
      <b-form-group
        id="fieldset-horizontal"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-sm
        content-cols-lg="7"
        :label="$t('settings.addresses.country')"
        label-for="country"
      >
        <countries-dropdown :model-value="newAddress.country" @updatedDialCode="displayDialCode = $event" />
      </b-form-group>
      <p v-if="hasErrors('country')" class="error-message">
        {{ $t(hasErrors('country')) }}
      </p>

      <div class="settings-address-form-buttons">
        <button class="settings-addresses-button-continue" type="submit">{{$t('settings.addresses.continue')}}</button>
        <button type="button" class="settings-addresses-button-discard" @click="cleanForm">{{$t('settings.addresses.discard_changes')}}</button>
      </div>
    </form>

  </div>

</template>

<script>
import CountriesDropdown from '~/components/CountriesDropdown';
import { countryRestriction } from '~/static/constants/address';
export default {
  name: 'AddAddress',
  components : {
    CountriesDropdown
  },

  data() {
    return {
      displayDialCode : '',
      formErrors: [],
      verificationCode: '',
      showVerificationStatus: false,
      callingCode: '',
      addOrEditHeader: 'Add New Address',
      editID: '',
      showSendCodeButton: true,
      showSendCodeTimeoutMessage: false,
      showVerificationField: false,
      countDown: 30,
      newAddress: {
        first_name: '',
        last_name: '',
        address_line_1: '',
        address_line_2: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        phone: '',
        phoneVerified:''
      },
    }
  },

  mounted() {
    // Google Places Autocomplete API
    const autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById('address_line_1'), {
        componentRestrictions: {'country': countryRestriction },
      });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      let component = '';

      for (component of place.address_components) {
        const componentType = component.types[0];
        if (componentType === 'street_number') {
          this.newAddress.address_line_1 = component.long_name;
        } else if (componentType === 'route') {
          this.newAddress.address_line_1 = this.newAddress.address_line_1 + ' ' + component.short_name;
        } else if (componentType === 'locality') {
          this.newAddress.city = component.short_name;
        } else if (componentType === 'administrative_area_level_1') {
          this.newAddress.state = component.short_name;
        } else if (componentType === 'postal_code') {
          this.newAddress.zip = component.short_name;
        } else if (componentType === 'country') {
          this.newAddress.country = component.long_name;
        }
      }
    });
  },

  methods: {
    onSubmit() {
      // If the record is up for update
        if (this.editID !== '') {
          this.newAddress.user_id = this.$store.state.auth.user.id
          this.newAddress.id = this.editID;
          this.$axios.post('/addresses/' + this.editID, this.newAddress)
            .then(({data}) => {
              this.cleanForm();
            }).catch(({response}) => {
            this.formErrors = response.data.errors
          });
        } else {
          // if the record is up for save
          this.newAddress.user_id = this.$store.state.auth.user.id
          this.$axios.post('/addresses', this.newAddress)
            .then(({data}) => {
              this.$emit('newAddress', this.newAddress)
               this.$toasted.success(self.$t('settings.addresses.address_added'))
              this.cleanForm()
            }).catch(({response}) => {
            this.formErrors = response.data.errors
          });
        }
    },

    formatPhoneNumber(value) {
      if (!value) return value;
      const phoneNumber = value.replace(/\D/g, '', ' $1 ');
      const phoneNumberLength = phoneNumber.length;
      if (phoneNumberLength < 4) return phoneNumber;
      if (phoneNumberLength < 7) {
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
      }
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 9)}`;
    },

    phoneNumberFormatter() {
      const inputField = document.getElementById('phone');
      const formattedInputValue = this.formatPhoneNumber(inputField.value);
      inputField.value = formattedInputValue;
    },

    hasErrors(name) {
      if (this.formErrors) {
        const error = this.formErrors[name];
        if (error && error.length) {
          return error[0];
        }
      }
      return '';
    },

    createVerificationCode() {
      this.$axios.get('/create-verification-code?phone=' + this.displayDialCode + this.newAddress.phone)
        .then(({data}) => {
          this.showVerificationStatus = false
          this.showSendCodeButton = false
          this.showSendCodeTimeoutMessage = true
          this.showVerificationField = true
          this.countDownTimer()
        }).catch(({response}) => {
        this.formErrors = response.data.errors
      });
    },

    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1
          this.countDownTimer()
        }, 1000)
      } else {
        this.showSendCodeButton = true;
        this.showSendCodeTimeoutMessage = false
      }
    },

    verifyCode() {
      this.$axios.get('/verify-code?phone=' + this.newAddress.phone + '&code=' + this.verificationCode)
        .then(({data}) => {
          this.showVerificationStatus = true
          this.newAddress.phoneVerified = data;
        }).catch(({response}) => {
        this.formErrors = response.data.errors
      });
    },

    addOrEdit() {
      if(this.editID !== '') {
        this.addOrEditHeader = this.$t('settings.addresses.edit_address')
      } else {
        this.addOrEditHeader = this.$t('settings.addresses.add_new_address')
      }
    },

    cleanForm() {
      this.editID = ''
      this.newAddress = {}
      this.addOrEditHeader = this.$t('settings.addresses.add_new_address')
      this.showSendCodeButton = true;
      this.showSendCodeTimeoutMessage = false
      this.verificationCode = ''
      this.showVerificationField = false
      this.formErrors = {}
    },
  },
}
</script>

<style scoped>

</style>
