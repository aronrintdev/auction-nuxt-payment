<template>
  <div v-if="isScreenXS" class="gift-card-component-wrapper">
    <client-only>
      <Portal to="page-title"> {{ $t('payments.payment_method') }}</Portal>
      <!-- If back icons needed -->
      <Portal to="back-icon-slot">
        <img
          :src="require('~/assets/img/icons/back.svg')"
          alt="back-arrow"
          class="float-left"
          @click="backTo"
        />
      </Portal>
    </client-only>
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <b-form   @submit.stop.prevent="handleSubmit(onSubmit)">
        <b-card id="redeem-giftcard" class="mt-3">
          <!-- card heading -->
          <div class="card-text border-underline">
            <span class="gift-card-heading">
              <span class="d-flex card-heading align-items-center">
                {{ $t('preferences.payments.redeem_a_gift_card') }}
              </span>
            </span>
            <p class="gift-card-sub-heading mt-2 d-flex align-items-center">
              {{ $t('preferences.payments.enter_card_info') }}
            </p>
          </div>
          <!-- card heading -->

          <!-- Input fields -->

          <b-row class="input-fields-wrapper">
            <b-col cols="12">
              <ValidationProvider rules="required" :name="$t('preferences.payments.gift_card_number')">
                <b-form-group id="input-group" slot-scope="{ valid, errors }" label-for="gift-cards" class="add-cards-label text-left text-dark mb-0 d-flex align-items-center">
                  <label id="gift-card-code-label" for="gift-card-code" class="d-flex align-items-center">
                    {{ $t('preferences.payments.giftcard_code') }}
                  </label>
                  <b-form-input id="gift-card-code-input" v-model="form.code" :state="errors[0] ? false : valid ? true : null" :class="errors[0] && 'border-danger'"/>
                </b-form-group>
              </ValidationProvider>
            </b-col>

            <b-col cols="12 mt-18">
              <ValidationProvider rules="required|numeric|max:4" :name="$t('common.pin')">
                <b-form-group id="pin-label" slot-scope="{ valid, errors }" label-for="gift-cards" class="pin-group text-left text-dark mb-0" :label="$t('redeem_giftcard.pin')">
                  <b-input-group id="gift-card-code-input" class="append-icon" :class="errors[0] && 'border-danger'">
                    <b-form-input id="pin-input-field" v-model="form.pin" :state="errors[0] ? false : valid ? true : null" :type="passwordFieldType" class="pin-input"></b-form-input>
                    <b-input-group-append class="d-flex align-items-center append-icon px-2">
                      <ShowPassword v-if="!isPasswordShown" @click="[(isPasswordShown = !isPasswordShown), (passwordFieldType = 'text'),]"/>
                      <HidePassword v-if="isPasswordShown" @click="[(isPasswordShown = !isPasswordShown), (passwordFieldType = 'password'),]"/>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
              </ValidationProvider>
            </b-col>

            <b-col v-if="successMsg || errorMsg" cols="12">
              <div v-if="successMsg" class="success-message d-flex align-items-center">
                {{ $t('redeem_giftcard.redeemed') }}&nbsp; &check;
              </div>
              <div v-if="errorMsg" class="error-message d-flex align-items-center">
                {{ $t('redeem_giftcard.invalid_data') }}
              </div>
            </b-col>
          </b-row>
          <!-- ./Input fields -->

          <!-- Help Text -->
          <b-row class="help-text-row">
            <b-col cols="12" class="help-text-col mt-15">
              <div class="help-text-heading text-decoration-underline">
                {{ $t('redeem_giftcard.how_to_find_my_code') }}
              </div>
            </b-col>

            <b-col class="help-text-desc-col w-100">
              <div class="desc-one">
                1.{{ $t('redeem_giftcard.help_text_one') }}
              </div>
              <div class="desc-one mt-2">
                2.{{ $t('redeem_giftcard.help_text_two') }}
              </div>
            </b-col>
          </b-row>
          <!-- ./Help Text -->
        </b-card>
      

        <!-- Redeem Button -->
        <b-row class="redeem-btn-row">
          <b-col cols="12" class="redeem-btn-col text-center">
            <b-spinner v-if="buttonSpinnerLoading" variant="color-blue-2"></b-spinner>
            <Button v-else type="submit" :disabled="!btnDisabled" variant="redeem" class="d-flex align-items-center text-align-center">
              {{ $t('redeem_giftcard.redeem') }}
            </Button>
          </b-col>
        </b-row>
        <!-- ./Redeem Button -->
      </b-form>
    </ValidationObserver>

    <div class="row float-right add-new-button position-fixed">
      <div class="col-12 add-new-button-col">
        <div class="add-new-button-wrapper mr-4">
          <img :src="require('~/assets/img/icons/more-ques.svg')" alt="add-new-icon" />
        </div>
      </div>
    </div>

    <!-- Success bottomsheet -->
    <MobileBottomSheet id="success-notification" :height="'199px'" :open="openSheet" :hasHeaderDivider="false" @closed="openSheet = false" @opened="openSheet = true">
      <b-row class="success-popup">
        <b-col cols="12">
          <div class="popup-text mx-auto text-align-center">{{ $t('redeem_giftcard.redeem_success') }}</div>
        </b-col>
        <b-col cols="12" class="btn-col">
          <div class="text-center ok-text text-uppercase d-flex justify-content-center text-align-center">
            {{ $t('common.ok') }}
          </div>
        </b-col>
        <b-col cols="12" class="d-flex justify-content-center">
          <span class="bottom-indicator" role="button" @click="backToDetails">
            <img :src="require('~/assets/img/icons/home_indicator.svg')" alt="bottom-indicator">
          </span>
        </b-col>
      </b-row>
    </MobileBottomSheet>
    <!-- ./Success bottom sheet -->
  </div>
</template>
<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import screenSize from '~/plugins/mixins/screenSize'
import emitEvent from '~/plugins/mixins/emit-event'
import ShowPassword from '~/assets/img/icons/show-pwd.svg?inline'
import HidePassword from '~/assets/img/icons/hide-pwd.svg?inline'
import Button from '~/components/common/Button'
import MobileBottomSheet from '~/components/mobile/MobileBottomSheet.vue'

export default {
  name: 'ResponsiveRedeemGiftCardEmail',

  components: {
    ShowPassword,
    HidePassword,
    Button,
    ValidationObserver,
    ValidationProvider,
    MobileBottomSheet
  },

  mixins: [screenSize, emitEvent],

  layout: 'Profile',

  middleware: 'auth',

  data() {
    return {
      passwordFieldType: 'password',
      form: {
        code: '',
        pin: '',
      },
      isPasswordShown: false,
      buttonSpinnerLoading: false,
      successMsg: false,
      errorMsg: false,
      openSheet: false,
      cardId: ''
    }
  },

  computed: {
    btnDisabled: (vm) => {
      return vm.form.code && vm.form.pin
    },
  },

 
  methods: {
    // back to previous page
    backTo() {
      this.openSheet = false

      this.$nextTick(() => {
        this.$store.dispatch('preferences/changeHeaderVisibility', false)
        this.$router.push('/profile/preferences')
        this.$auth.$storage.setState('showGiftCardMethod', true)
      })
      
    },

    backToDetails(){
      this.openSheet = false
      this.$nextTick(() => {
        this.$router.push(`/profile/preferences/giftcard/view-giftcard/${this.cardId}`)
      })
    },

    onSubmit(){
      this.buttonSpinnerLoading = true
      this.$refs.observer.validate().then((success) => {
        if (success) {
          this.$axios
          .get('/preferences/payments/validate-giftcard', {
            params: { giftcardNumber: this.form.code, pin: this.form.pin },
          })
          .then((res) => {
            this.cardId = res.data.data.id
            this.successMsg = true
            this.errorMsg = false
            this.buttonSpinnerLoading = false
            this.openSheet = true
          })
          .catch((err) => {
            this.errorMsg = true
            this.successMsg = false
            this.buttonSpinnerLoading = false
            this.$logger.logToServer('Giftcard redeem error:', err.response)
          })
        }
      })
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.gift-card-component-wrapper
  .add-new-button
    right: 1vw
    bottom: 16vh
  .gift-card-heading
    font-family: $font-sp-pro
    font-style: normal
    @include body-4-medium
    color: $color-blue-20

  .gift-card-sub-heading
    font-family: $font-sp-pro
    font-style: normal
    @include body-21-regular
    color: $color-black-17

  .btn-redeem-cards-button
    width: 340px
    background: $color-gray-21
    border-radius: 20px
  .btn-txt
    font-family: $font-sp-pro
    font-style: normal
    @include body-34-medium
    color: $color-gray-47

  .add-cards-label
    font-family: $font-montserrat
    font-style: normal
    @include body-6-medium
    color: $color-black-17

  .gift-cards-input
    box-sizing: border-box
    background: $color-white
    border: 1px solid $color-gray-3
    border-radius: 10px

  .redeem-btn-row::v-deep
    .btn-redeem
      background: $color-blue-20
      border-radius: 20px
      width: 340px
      height: 40px
      font-family: $font-sp-pro
      font-style: normal
      @include body-34-medium
      color: $color-white
  #redeem-giftcard
    margin-bottom: 30px
    .help-text-row
      .mt-15
        margin-top: 15px
      .help-text-heading
        font-family: $font-sf-pro-text
        font-style: normal
        @include body-6-medium
        color: $color-black-1
      .help-text-desc-col
        font-family: $font-sf-pro-text
        font-style: normal
        @include body-6-regular
        color: $color-black-1
        max-width: 307px
        height: 75px
        margin-top: 15px
    .card-body
      padding: 19px 17px
    .input-fields-wrapper
      .success-message
        height: 20px
        font-family: $font-sf-pro-text
        font-style: normal
        @include body-6-regular
        color: $color-green-33
      .error-message
        height: 20px
        font-family: $font-sf-pro-text
        font-style: normal
        @include body-6-regular
        color: $color-red-17
      .mt-18
        margin-top: 18px
      #input-group::v-deep
        div:first-child
          width: 100%
      #gift-card-code-label
        width: 83px
        height: 13px
        left: 33px
        top: 191px
        font-family: $font-montserrat
        font-style: normal
        @include body-6-medium
        color: $color-black-17
      #gift-card-code-input
        width: 100%
        max-width: 310px
        height: 49px
        background: $color-white
        border: 1px solid $white-5
        border-radius: 10px
        font-family: $font-sf-pro-text
        font-style: normal
        @include body-6-normal
        color: $color-black-1
      #pin-input-field
        height: 46px
        background: $color-white
        border-radius: 10px
        font-family: $font-sf-pro-text
        font-style: normal
        @include body-6-normal
        color: $color-black-1
      #pin-label::v-deep
        label
          font-family: $font-montserrat
          font-style: normal
          @include body-6-medium
          display: flex
          align-items: center
          color: $color-black-17
    .gift-card-sub-heading
      font-family: $font-sp-pro
      font-style: normal
      @include body-21-regular
      color: $color-gray-5
      margin-top: 4px
      margin-bottom: 18px
    .gift-card-heading
      .card-heading
        font-family: $font-sp-pro
        font-style: normal
        @include body-13-medium
        letter-spacing: 0.02em
        color: $color-grey-101

  #success-notification::v-deep
    .bottom-sheet__bar
      width: 36px
      height: 5px
      left: calc(50% - 36px/2 - 0.5px)
      bottom: 183px
      background: $color-gray-23
      border-radius: 5px
    .success-popup
      .popup-text
        font-family: $font-sp-pro
        font-style: normal
        @include body-32-normal
        color: $color-black-1
        width: 335px
        height: 71px
      .ok-text
        font-family: $font-sp-pro
        font-style: normal
        @include body-34-medium
        color: $color-grey-101
        margin-top: 28px
      .bottom-indicator
        margin-top: 8px
  
@media only screen and (max-width: 375px)
  .gift-card-component-wrapper
    #redeem-giftcard
      width: 100%
      max-width: 343px
      height: 405px

</style>