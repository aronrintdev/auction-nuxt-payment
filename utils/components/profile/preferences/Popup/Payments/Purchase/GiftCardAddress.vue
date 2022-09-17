<template>
  <b-card-text class="gift-card-purchase px-5 pb-5">
    <b-row>
      <b-col md="12">
        <span
          id="backto-btn"
          role="button"
          class="text-muted text-bold d-flex justify-content-start"
          @click="backToPurchase"
        >
          &#60; {{ $t('preferences.payments.back_to_giftcard') }}
        </span>
      </b-col>
    </b-row>
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
        <b-row class="gift-cards-paymentmethods mt-3">
          <b-col md="12" class="selected-card-heading">
            <span class="text-bold"
              >{{ $t('preferences.payments.selected_card') }}&colon;</span
            >
          </b-col>
        </b-row>

        <!-- Selected card image -->
        <b-row class="gc-payments-card">
          <b-col class="col justify-content-center d-flex">
            <img
              id="selected-card-img"
              :src="
                require(`~/assets/img/preferences/giftcard/${giftCardImageName}`)
              "
              alt="selected-giftcard"
              class="justify-content-center d-flex"
            />
          </b-col>
        </b-row>
        <!-- End of Selected card image -->

        <!-- First Name/ Last Name -->
        <b-row class="mt-md-4 mt-4">
          <b-col md="6">
            <ValidationProvider
              v-slot="validationContext"
              :name="$t('shopping_cart.first_name')"
              :rules="{ required: true, min: 3, max: 128 }"
            >
              <b-form-group label-for="first-name">
                <label
                  class="d-flex justify-content-start font-weight-normal"
                  >{{ $t('shopping_cart.first_name') }}</label
                >
                <b-form-input
                  id="first-name"
                  v-model="form.inputFirstName"
                  class="rounded-pill"
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
              :rules="{ required: true, min: 3, max: 128 }"
            >
              <b-form-group label-for="last-name">
                <label
                  class="d-flex justify-content-start font-weight-normal"
                  >{{ $t('shopping_cart.last_name') }}</label
                >
                <b-form-input
                  id="last-name"
                  v-model="form.inputLastName"
                  class="rounded-pill"
                  :state="getValidationState(validationContext)"
                ></b-form-input>
                <b-form-invalid-feedback>{{
                  validationContext.errors[0]
                }}</b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
          </b-col>
        </b-row>
        <!-- ./First Name/ Last Name -->

        <!-- Billing Address -->
        <b-row>
          <b-col md="12">
            <ValidationProvider
              v-slot="validationContext"
              :name="$t('preferences.payments.billing_address')"
              :rules="{ required: true, min: 3, max: 128 }"
            >
              <b-form-group label-for="last-name">
                <label class="d-flex justify-content-start font-weight-normal">
                  {{ $t('preferences.payments.billing_address') }}
                </label>
                <b-form-input
                  id="billing-address"
                  v-model="form.billingAddress"
                  class="rounded-pill"
                  :state="getValidationState(validationContext)"
                ></b-form-input>
                <b-form-invalid-feedback>{{
                  validationContext.errors[0]
                }}</b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
          </b-col>
        </b-row>
        <!-- ./Billing Address -->

        <!-- City/ State -->
        <b-row>
          <b-col md="6">
            <ValidationProvider
              v-slot="validationContext"
              :name="$t('preferences.payments.city')"
              :rules="{ required: true, min: 3, max: 128 }"
            >
              <b-form-group label-for="last-name">
                <label class="d-flex justify-content-start font-weight-normal">
                  {{ $t('preferences.payments.city') }}
                </label>
                <b-form-input
                  id="last-name"
                  v-model="form.city"
                  class="rounded-pill"
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
              :name="$t('preferences.payments.state')"
              :rules="{ required: true, min: 3, max: 128 }"
            >
              <b-form-group label-for="last-name">
                <label class="d-flex justify-content-start font-weight-normal">
                  {{ $t('preferences.payments.state') }}
                </label>
                <b-form-input
                  id="last-name"
                  v-model="form.state"
                  class="rounded-pill"
                  :state="getValidationState(validationContext)"
                ></b-form-input>
                <b-form-invalid-feedback>{{
                  validationContext.errors[0]
                }}</b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
          </b-col>
        </b-row>
        <!-- ./City/ State -->

        <!-- Apt Suite/ Country -->
        <b-row>
          <b-col md="6">
            <ValidationProvider
              v-slot="validationContext"
              :name="$t('preferences.payments.apt_suite')"
              :rules="{ min: 3, max: 128 }"
            >
              <b-form-group label-for="last-name">
                <label class="d-flex justify-content-start font-weight-normal">
                  {{ $t('preferences.payments.apt_suite') }}
                </label>
                <b-form-input
                  id="last-name"
                  v-model="form.aptSuite"
                  class="rounded-pill"
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
              :name="$t('preferences.payments.country')"
              :rules="{ required: true, min: 2, max: 128 }"
            >
              <b-form-group label-for="last-name">
                <label class="d-flex justify-content-start font-weight-normal">
                  {{ $t('preferences.payments.country') }}
                </label>
                <b-form-input
                  id="last-name"
                  v-model="form.country"
                  class="rounded-pill"
                  :state="getValidationState(validationContext)"
                ></b-form-input>
                <b-form-invalid-feedback>{{
                  validationContext.errors[0]
                }}</b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
          </b-col>
        </b-row>
        <!-- ./Apt Suite/ Country -->

        <b-row class="mt-md-4 mt-4">
          <b-col md="12">
            <h3 class="text-bold float-right">
              {{ $t('common.total') }}&colon;
              {{ giftCardAmount | toCurrency('USD', 'N/A') }}
            </h3>
          </b-col>
        </b-row>
        <b-row class="mt-md-4 mt-4">
          <b-col md="12">
            <Button
              variant="continue"
              class="text-white float-right"
              pill
              type="submit"
              >{{ $t('shopping_cart.continue') }}</Button
            >
          </b-col>
        </b-row>
      </b-form>
    </ValidationObserver>
  </b-card-text>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import emitEvent from '~/plugins/mixins/emit-event'
import { Button } from '~/components/common'
import { countryRestriction } from '~/static/constants'
export default {
  name: 'GiftCardAddress',

  components: {
    ValidationObserver,
    ValidationProvider,
    Button,
  },

  mixins: [emitEvent],

  data() {
    return {
      form: {
        inputFirstName: '',
        inputLastName: '',
        billingAddress: '',
        email: this.$store.state.auth.user.email,
        city: '',
        state: '',
        aptSuite: '',
        country: '',
        zip: '',
        isDefault: false,
      },
      // TODO: Temporary dummy data
      // Since a virtual service there will be no shipping, value is given 0.
      shippingFee: 0,
      processingFee: 900, // TODO: Temporary dummy data
      tax: 100, // TODO: Temporary dummy data
    }
  },

  computed: {
    ...mapGetters({
      getSelectedGiftCard: 'preferences/giftCardSelected',
      getGiftCardDetails: 'preferences/getGiftCardDetails',
    }),

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    giftCardImageName: (vm) => {
      return vm.getSelectedGiftCard.giftCard.image_name
    },

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    giftCardAmount: (vm) => {
      const total =
        vm.shippingFee +
        vm.processingFee +
        vm.tax +
        vm.getGiftCardDetails.cardDetails.giftCardAmount
      return total
    },
  },

  created() {
    // Update the modal title
    this.updateModalHeader({
      title: this.$t('preferences.payments.add_billing_info'),
      showTabs: false,
      size: 'lg',
    })
  },

  mounted() {
    // Create the autocomplete object, restricting the search predictions.
    const autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById('billing-address'),
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
            this.form.billingAddress = component.long_name
            break
          }
          case 'route': {
            this.form.billingAddress =
              this.form.billingAddress + ' ' + component.short_name
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
      updateModalHeader: 'preferences/updateModalHeader',
      updateGiftCardDetails: 'preferences/updateGiftCardDetails',
    }),

    // Back to gift card purchase
    backToPurchase() {
      this.emitRenderComponentEvent(
        this.$parent.$options.components.GiftCardPurchase.name
      )
    },

    getValidationState({ dirty, validated, valid = null }) {
      // Returns the contextual state (validation style) of the element being validated (false for invalid, true for valid, or null for no validation state)
      return dirty || validated ? valid : null
    },

    // On billing info formation submit
    onSubmit() {
      // Store thr details.
      this.updateGiftCardDetails({
        TYPE: 'billingInfo',
        DETAILS: this.form,
      })
      // Show the select payment screen.
      this.emitRenderComponentEvent(
        this.$parent.$options.components.GiftCardPayment.name
      )
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
#selected-card-img
  width: 190px
  height: 130px
  left: 0px
  top: 0px
.btn-continue
  width: 203px
  height: 42px
  left: 919px
  top: 907px
  background: $color-blue-20
  border-radius: 20px
.selected-card-heading
  span
    width: 134px
    height: 22px
    left: 580px
    top: 265px
    font-family: $font-family-montserrat
    font-style: normal
    @include body-3-medium
    color: $color-black-1
    float: left
.spinner-wrapper
  width: 190px
  height: 130px
  text-align: center
</style>