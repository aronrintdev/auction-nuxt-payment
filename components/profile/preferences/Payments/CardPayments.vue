<template>
  <div class="card-payments-responsive-component">
    <div class="row">
      <!-- Card payment div -->
      <div class="col-12 mt-3 d-flex justify-content-center">
        <div class="card-container">
          <div class="card-container-heading border-bottom align-items-center">
            {{ $t('shopping_cart.card_payment') }}
          </div>
          <div class="card-details-container">
            <div class="ds-wallet-title d-flex align-items-center justify-content-center">
              {{ $t('preferences.payments.ds_wallet') }}
            </div>
            <div class="dynamic-card-wrappper">
              <card-component
                v-if="showCard || defaultCard"
                id="dynamic-card"
                :valuefields="valueFields"
                class="card-image"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Card payment div ends -->
    </div>

    <div
      v-if="cardPaymentsExist"
      class="back-button d-flex justify-content-center align-items-center"
      type="button"
      @click="backTo"
    >
      <img
        :src="require('~/assets/img/icons/back.svg')"
        alt="back-arrow"
        class="float-left ml-1"
      />
      <span
        class="
          back-to-text
          ml-2
          d-flex
          justify-content-center
          align-items-center
          text-align-center
        "
      >
        {{ $t('preferences.payments.back_to_paymentmethods') }}
      </span>
    </div>

    <div class="mt-5">
      <CardItem
        v-for="(card, index) in cardPayments"
        :key="index"
        :data="card"
        class="card-payment-list px-2 py-3"
        @showOptions="showOptions"
        @newDefaultCard="showNewDefaultCardConfirmation"
      />
    </div>

    <div class="row float-right add-new-button position-fixed">
      <div class="col-12 add-new-button-col">
        <div class="add-new-button-wrapper mr-4">
          <img
            :src="require('~/assets/img/icons/plus-icon-gray.svg')"
            alt="add-new-icon"
            @click="showCardAdd"
          />
        </div>
      </div>
    </div>

    <!-- show selected card edit delete option -->
    <MobileBottomSheet
      id="card-options"
      :hasHeaderDivider="false"
      :height="'33%'"
      :open="cardOptions"
      :title="''"
      @closed="$emit('closed')"
      @opened="$emit('opened')"
    >
      <CardOptions
        @closed="cardOptions = false"
        @deleteCard="deleteCardConfirmation"
        @editCard="editCard"
      />
    </MobileBottomSheet>
    <!-- show selected card edit delete option -->

    <!-- Add new default card bottoms sheet -->
    <mobile-bottom-sheet
      :height="'238px'"
      :hasHeaderDivider="false"
      :open="defaultAlert"
      :title="''"
      @closed="$emit('closed')"
      @opened="$emit('opened')"
    >
      <default-card-alert
        @addCardDefault="addNewDefaultCard"
        @dismissAddDefault="dismissAddDefault"
      />
    </mobile-bottom-sheet>
    <!-- ./Add new default card bottoms sheet -->
    <client-only>
      <Portal to="page-title"> {{ $t('payments.payment_method') }}</Portal>
      <Portal to="back-icon-slot">
        <img
          :src="require('~/assets/img/icons/back.svg')"
          alt="back-arrow"
          class="float-left"
          @click="backTo"
        />
      </Portal>
    </client-only>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import DefaultCardAlert from '../Payments/DefaultCardAlert.vue'
import CardItem from './CardItem.vue'
import CardOptions from './CardOptions.vue'
import MobileBottomSheet from '~/components/mobile/MobileBottomSheet.vue'
import CardComponent from '~/components/profile/preferences/Popup/Payments/CardComponent.vue'
import emitEvent from '~/plugins/mixins/emit-event'
export default {
  name: 'CardPayments',

  components: {
    CardItem,
    CardOptions,
    MobileBottomSheet,
    CardComponent,
    DefaultCardAlert,
  },

  mixins: [emitEvent],

  data() {
    return {
      showCard: true,
      cardPayments: [],
      cardOptions: false,
      cardId: '',
      valueFields: {
        cardName: '',
        cardNumber: '',
        cardMonth: '',
        cardYear: '',
        cardCvv: '',
        cardBrand: '',
      },
      cardExpired: false,
      defaultAlert: false,
      isDefault: 0,
    }
  },

  // Fetch the card payment methods of user
  async fetch() {
    await this.$axios
      .get('/preferences/payments/get-payment-methods')
      .then((res) => {
        this.cardPayments = res.data.cardPayments
        this.defaultCardPayment = res.data.defaultCardID
        this.defaultCardStatus({
          defaultCard: this.defaultCardPayment !== 0,
        })

        this.$nuxt.refresh()
        this.populateCard()
      })
      .catch((err) => {
        this.$logger.logToServer(
          'Preferences get payment methods error: ',
          err.response.data
        )
      })
  },
  fetchOnServer: false,

  computed: {
    cardPaymentsExist: (vm) => {
      return vm.cardPayments && vm.cardPayments.length
    },

    defaultCard: (vm) => {
      if(vm.cardPayments && vm.cardPayments.length) {
        return vm.cardPayments.find(item => item.is_default === 1)
      }
    }
  },

  unmounted() {
    // On modal close remove collectJS.
    this.removeCollectJS()
    this.cardChangeAlert()
  },

  mounted() {
    this.populateCard()
    this.updateCardsStatus({
      cardID: '',
      editStatus: false,
      cardExpStatus: false,
    })
    this.defaultCardStatus({ defaultCard: false })
  },
  methods: {
    ...mapActions({
      updateCardsStatus: 'preferences/updateCardStatus',
      defaultCardStatus: 'preferences/defaultCardStatus',
    }),

    populateCard() {
      if(this.defaultCard){
        this.valueFields.cardName = this.defaultCard.card_holder_name
        this.valueFields.cardNumber = this.defaultCard.card_last_digits
        this.valueFields.cardBrand = this.defaultCard.card_brand
      }
    },

    // show card options
    showOptions(id, cardExp, isDefault) {
      this.cardOptions = !this.cardOptions
      this.cardId = id
      this.cardExpired = cardExp
      this.isDefault = isDefault
    },

    // back to previous page
    backTo() {
      this.$nuxt.refresh()
      this.$store.dispatch('preferences/changeHeaderVisibility', true)
      this.emitRenderComponentEvent(
        this.$parent.$options.components.PaymentComponent.name
      )
    },

    // show add new card
    showCardAdd() {
      this.$nuxt.refresh()
      this.$store.dispatch('preferences/changeHeaderVisibility', false)
      this.emitRenderComponentEvent(
        this.$parent.$options.components.AddCardComponent.name
      )
    },

    // go to selected card edit
    editCard() {
      this.cardOptions = false
      this.$nextTick(() => {
        this.updateCardsStatus({
          cardID: this.cardId,
          editStatus: true,
          cardExpStatus: this.cardExpired,
        })
        this.emitRenderComponentEvent(
          this.$parent.$options.components.AddCardComponent.name
        )
      })
    },

    // delete card
    deleteCardConfirmation() {
      this.$axios
        .delete('payment-method', {
          params: { id: this.cardId },
        })
        .then((res) => {
          this.cardOptions = false
          this.$nuxt.refresh()
          this.$fetch()
          if (this.isDefault) {
            this.defaultAlert = true
          }
        })
        .catch((err) => {
          this.$logger.logToServer('Delete Card Error:', err.response)
        })
    },

    addNewDefaultCard() {
      this.$fetch()
      this.defaultAlert = false
      this.$nextTick(() => {
        this.emitRenderComponentEvent(
          this.$parent.$options.components.AddCardComponent.name
        )
      })
    },
    dismissAddDefault() {
      this.defaultAlert = false
      this.$fetch()
    },

    // Render the card brand image
    renderCardImage(type) {
      try {
        this.cardImage = require(`~/assets/img/preferences/${type.toLowerCase()}-logo.svg`)
      } catch (error) {
        this.cardImage = require('~/assets/img/preferences/visa-logo.svg')
      }
    },

    showNewDefaultCardConfirmation() {
      this.defaultAlert = true
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.card-payments-responsive-component
  padding: 2%
  .card-container
    height: 380px
    left: 16px
    top: 115px
    background: $color-white-1
    box-shadow: 0px 1px 4px $color-black-rgb2
    border-radius: 10px
    @media (max-width: 375px)
      width: 343px
    @media (min-width: 375px)
      width: 100%
  .card-container-heading
    font-family: $font-sp-pro
    font-style: normal
    @include body-13-medium
    letter-spacing: 0.02em
    color: $color-blue-20
    padding: 20px 219px 17px 12px
  .card-details-container
    .ds-wallet-title
    font-family: $font-family-sf-pro-display
      font-style: normal
      font-weight: $bold
      @include body-17
      @include body-34-medium
      letter-spacing: -0.02em
      color: $color-black-1
      margin-top: 16px
      margin-bottom: 19px
      text-transform: uppercase

    .dynamic-card-wrappper
      #dynamic-card::v-deep
        padding-top: 40px
        padding-bottom: 26px
        .card-item
          width: 272px
          height: 173px
        .card-item__wrapper
          .card-item__numberItem
            &.-active
              width: 5px
          .card-item__info
            padding: 0
            margin-bottom: 0
          .card-item__date,
          .card-item__holder
            display: none
          .card-item__name
            font-family: $font-montserrat
            font-style: normal
            @include body-4-normal
            display: flex
            align-items: center
            color: $color-white
            text-shadow: 0px 2px 2px $color-black-rgb2
          .card-item__content
            position: fixed
            width: 100%
            bottom: 0
            margin-bottom: 26px

          .card-item__number
            font-family: $font-montserrat
            font-style: normal
            @include body-4-normal
            display: flex
            align-items: center
            color: $color-white
            padding: 0
            position: fixed
            bottom: 0
            margin-bottom: 45px

#card-options::v-deep
  .header-title
    align-items: left
    justify-content: left
  .bottom-sheet__bar
    width: 36px
    height: 4px
  .bottom_sheet_pan
    padding-bottom: 18px
    padding-top: 10px

.add-new-button
  right: 1vw
  bottom: 16vh

.back-button
  width: 217px
  height: 31px
  left: 16px
  top: 477px
  background: $color-white-5
  border-radius: 4px
  margin-top: 28px
.back-to-text
  font-family: $font-sp-pro
  font-style: normal
  @include body-21-normal
  letter-spacing: 0.02em
  color: $color-gray-5

.card-image
  padding-bottom: 30px
</style>
