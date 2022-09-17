<template>
  <b-row class="gift-cards">
    <!-- Card Payment -->
    <b-col sm md="6" class="gift-cards-col p-3">
      <b-row class="card-row" align-v="center">
        <b-col md="2" class="payments-giftcard-image">
          <img
            :src="
              require(`~/assets/img/preferences/giftcard/${giftcard.card.image_name}`)
            "
            alt="card-image"
            class="w-100"
          />
        </b-col>
        <b-col md="7" class="payments-giftcard-description">
          <div class="text-capitalize fw-400">
            <div class="card-normal-text d-flex align-item-center">
              {{ $t('preferences.payments.giftcard_ending_in') }}&nbsp;{{
                giftCardEnding
              }}
            </div>
            <div class="exp-date mt-1 d-flex align-item-center">
              {{ $t('preferences.payments.expiry') }}&colon;&nbsp;{{
                giftcard.delivery_date | formatDate
              }}
            </div>
            <div class="exp-date mt-1 d-flex align-item-center">
              <span
                role="button"
                class="mr-2"
                @click="showPassword = !showPassword"
              >
                <img
                  :src="require('~/assets/img/icons/eye2.svg')"
                  alt="eye-icon"
                />
              </span>
              <!-- Show/ Hide Pin -->
              <span class="text-capitalize">{{ $t('common.pin') }}</span
              >&colon;<span v-if="showPassword" type="password" class="ml-2">{{
                giftcard.pin
              }}</span>
              <span v-if="!showPassword" type="password" class="ml-2"
                >&#42;&#42;&#42;&#42;&#42;</span
              >
              <!-- End of Show/ Hide Pin -->
            </div>

            <span class="remaining-amount mt-1 d-flex align-item-center"
              >{{ $t('preferences.payments.remaining_amount') }} &colon;
              {{ giftcard.remaining_amount | toCurrency('USD', 'N/A') }}</span
            >
          </div>
        </b-col>
        <b-col
          md="3"
          class="d-flex align-items-baseline justify-content-end payments-giftcard-actionrow"
        >
          <span
            class="m-auto text-success text-capitalize"
            :class="cardStatus === 'expired' ? 'text-danger' : 'text-success'"
          >
            {{ cardStatus }}
          </span>
          &nbsp;
          <!-- TODO: View gift cards -->
          <b-button variant="outline-primary" class="edit-card-button ml-2" @click="viewGiftCard">
            {{ $t('preferences.payments.view') }}
          </b-button>
          <!-- TODO -->
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import { CARD_LAST_DIGITS_OFFSET } from '~/static/constants'
export default {
  name: 'GiftCards',

  props: {
    giftcard: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      showPassword: false,
      cardLastDigitOffset: CARD_LAST_DIGITS_OFFSET,
    }
  },

  computed: {
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    // To get the card status.
    cardStatus: (vm) => {
      return vm.giftcard.giftcard_status
    },

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    giftCardEnding: (vm) => {
      return vm.giftcard.giftcard_number.slice(vm.giftcard.giftcard_number.length - vm.cardLastDigitOffset)
    }
  },

  methods: {
    // View giftcard
    viewGiftCard(){
      this.$router.push(`/profile/preferences/giftcard/view-giftcard/${this.giftcard.id}`)
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.card-normal-text
  font-style: normal
  @include body-4-normal
  color: $color-black-1
.exp-date
  font-style: normal
  @include body-5-normal
  color: $color-black-1
.remaining-amount
  font-style: normal
  @include body-4-medium
  color: $color-black-1
@media (min-width: 768px) and (max-width: 929px)
  .gift-cards-col
    .card-row
      width: 30rem
@media (min-width: 993px) and (max-width: 1130px)
  .gift-cards-col
    .card-row
      width: 30rem
</style>
