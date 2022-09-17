<template>
  <!-- <div class="redeem-details-wrapper d-flex w-100"> -->
  <div class="redeem-details-wrapper">
    <!-- Image col -->
    <b-col class="card-image d-flex" cols>
      <img :src="getImage" alt="default-giftcard-image" />
    </b-col>
    <!-- ./Image col -->
    <!-- Input fields -->
    <b-col class="input-field-wrapper" cols>
      <div class="input-fields">
        <ValidationObserver ref="observer">
          <b-form inline @submit.prevent="onGiftCardRedeem">
            <!-- Giftcard code -->
            <ValidationProvider
              rules="required"
              :name="$t('preferences.payments.gift_card_number')"
            >
              <b-form-group
                slot-scope="{ valid, errors }"
                label-for="gift-cards"
                class="giftcard-group text-left text-dark"
                :label="$t('preferences.payments.gift_card_number')"
              >
                <b-form-input
                  id="inline-form-input-name"
                  v-model="form.giftCardNumber"
                  :state="errors[0] ? false : valid ? true : null"
                  class="mb-2 mr-sm-2 mb-sm-0 gift-card-input"
                  :placeholder="$t('redeem_giftcard.giftcard_code')"
                ></b-form-input>
                <b-form-invalid-feedback id="inputLiveFeedback" class="d-block">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
                <!-- Note -->
                <small
                  v-b-toggle="'collapse-note'"
                  class="form-text how-to-find"
                  >{{ $t('redeem_giftcard.how_to_find_my_code') }}&nbsp;<img
                    role="button"
                    :src="require(`~/assets/img/icons/arrow-down-black.svg`)"
                /></small>
                <b-collapse
                  id="collapse-note"
                  class="mt-2 position-absolute align-items-center"
                >
                  <b-card>
                    <p class="card-text">
                      {{ $t('redeem_giftcard.how_to_find_code_text') }}
                    </p>
                  </b-card>
                </b-collapse>
                <!-- Note ends -->
              </b-form-group>
            </ValidationProvider>
            <!-- ./Giftcard code -->

            <!-- pin -->
            <ValidationProvider
              rules="required|numeric|max:4"
              :name="$t('common.pin')"
            >
              <b-form-group
                slot-scope="{ valid, errors }"
                label-for="gift-cards"
                class="pin-group text-left text-dark"
                :label="$t('redeem_giftcard.pin')"
              >
                <b-input-group class="mb-2 mr-sm-2 mb-sm-0 append-icon">
                  <b-form-input
                    id="inline-form-input-username"
                    v-model="form.pin"
                    :type="showPin ? 'text' : 'password'"
                    :state="errors[0] ? false : valid ? true : null"
                    :placeholder="$t('redeem_giftcard.pin')"
                    class="pin-input"
                  ></b-form-input>
                  <b-input-group-append
                    class="d-flex align-items-center px-3 append-icon"
                  >
                    <i
                      v-if="!showPin"
                      class="fa fa-eye"
                      aria-hidden="true"
                      role="button"
                      @click="togglePin"
                    ></i>
                    <i
                      v-if="showPin"
                      class="fa fa-eye-slash"
                      aria-hidden="true"
                      role="button"
                      @click="togglePin"
                    ></i>
                  </b-input-group-append>
                </b-input-group>
                <b-form-invalid-feedback id="inputLiveFeedback" class="d-block">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <!-- ./pin -->

            <Button v-if="!redeemed" variant="redeem">{{
              $t('redeem_giftcard.redeem')
            }}</Button>
            <span v-if="redeemed" class="is-redeemed"
              >{{ $t('redeem_giftcard.redeemed') }} &nbsp;
              <img
                :src="require('~/assets/img/icons/green-check-mark.svg')"
                alt="redemeed-icon"
            /></span>
          </b-form>
          <small class="form-text giftcard-error">
            {{ showError }}
          </small>
        </ValidationObserver>
      </div>
    </b-col>
    <!-- ./Input fields -->
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { Button } from '~/components/common'
export default {
  name: 'RedeemCard',

  components: {
    Button,
    ValidationProvider,
    ValidationObserver,
  },

  data() {
    return {
      showPin: false,
      form: {
        giftCardNumber: null,
        pin: null,
      },
      redeemed: false,
      showError: '',
      giftCardImage: '',
    }
  },

  computed: {
    // Get the giftcard image
    getImage: (vm) => {
      if (!vm.giftCardImage) {
        return require('~/assets/img/preferences/giftcard/Black_Deadstock_Logo.png')
      }

      return require(`~/assets/img/preferences/giftcard/${vm.giftCardImage}`)
    },
  },

  methods: {
    // On redeem button click
    onGiftCardRedeem() {
      this.$refs.observer.validate().then((success) => {
        if (success) {
          this.$axios
            .get('/preferences/payments/validate-giftcard', {
              params: {
                giftcardNumber: this.form.giftCardNumber,
                pin: this.form.pin,
              },
            })
            .then((res) => {
              this.giftCardImage = res.data.data.card.image_name
              if (res.data.success) {
                this.showError = ''
                this.redeemed = true

                this.$router.push(
                  `/profile/preferences/giftcard/view-giftcard/${res.data.data.id}`
                )
              }
            })
            .catch((err) => {
              if (err.response.data.success === false) {
                this.showError = this.$t('redeem_giftcard.giftcard_error')
              }
              this.$logger.logToServer('Giftcard redeem error:', err.response)
            })
        }
      })
    },

    // On pin toggle
    togglePin() {
      this.showPin = !this.showPin
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.card-image
  img
    width: 291px
    height: 184px

  @media (min-width:1300px)
    flex: 0 0 40%
    max-width: 40%
.input-field-wrapper
  @media (min-width:1300px)
    flex: 0 0 60%
    max-width: 60%
    margin: auto 0

/* input-field */
.gift-card-input
  width: 277px
  height: 50px
  background: $color-white-1
  border: 1px solid $light-gray-2
  border-radius: 4px
.pin-input
  width: 110px
  height: 50px
  background: $color-white-1
  border: 1px solid $light-gray-2
  border-right: none
  border-radius: 4px
.input-group-append
  .input-group-text
    background: $color-white-1
.btn-redeem
  width: 128px
  height: 50px
  background: $color-blue-20
  border-radius: 4px
  color: $color-white-1
.input-group-append
  cursor: pointer
  border: 1px solid $light-gray-2
  border-radius: 4px
  border-left: none
.giftcard-group,
.pin-group
  display: block
  label
    @include body-3-medium
    justify-content: flex-start
    font-style: normal
    color: $color-black-1
.how-to-find
  @include body-5-medium
  font-style: normal
  color: $color-black-1
.pin-group
  margin-bottom: 24px

.form-control
  &.is-valid:focus
    border-color: $light-gray-2
  &.is-invalid:focus
    border-color: $light-gray-2

.pin-group
  width: 166px
.is-redeemed
  @include body-4-regular
  font-style: normal
  display: flex
  align-items: center
  color: $color-green-3
.giftcard-error
  @include body-10-regular
  font-style: normal
  display: flex
  align-items: center
  color: $color-red-17
  width: 50%
  float: right
.collapse
  z-index: 1
  width: 343px
  height: 161px
  font-style: normal
  @include body-11-normal
  display: flex
  color: $color-black-1

/* Media query */
.redeem-details-wrapper
  .card-image
    @media (max-width: 320px)
      flex: 0 0 100%
      max-width: 100%
  .input-field-wrapper
    @media (max-width: 320px)
      flex: 0 0 100%
      max-width: 100%
    @media (max-width: 647px)
      margin-top: 30px
.card-image
  img
    @media (max-width: 320px)
      width: 253px
.gift-card-input
  @media (max-width: 320px)
    width: 253px
  @media (min-width: 375px)
    width: 292px

.pin-group
  @media (min-width: 375px)
    margin-right: 7px
.redeem-details-wrapper
  @media (min-width: 648px)
    display: flex
    width: 100%
.collapse
  @media (max-width: 320px)
    width: 260px
  @media (min-width: 648px) and (max-width:768px)
    width: 250px
  @media (min-width:320px) and (max-width:375px)
    width: 253px
  @media (min-width:376px) and (max-width: 440px)
    width: 343px
/* Media query */
</style>