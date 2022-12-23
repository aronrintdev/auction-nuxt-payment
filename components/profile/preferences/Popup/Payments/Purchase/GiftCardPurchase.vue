<template>
  <b-card-text class="gift-card-purchase px-5 pb-3">
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
        <!-- Feature Giftcard -->
        <GiftCardList
          v-if="
            giftCardsAvailable.featured || giftCardsAvailable.featured.length
          "
          :giftCards="giftCardsAvailable.featured"
          :cardType="$t('preferences.payments.featured')"
          :selectedID="form.selectedCardID"
          @showGiftCards="showAllGiftCards"
          @selectedCard="selectedCard"
        />
        <!-- ./ Feature Giftcard -->
        <!-- Seasonal Giftcard -->
        <GiftCardList
          v-if="
            giftCardsAvailable.seasonal || giftCardsAvailable.seasonal.length
          "
          :giftCards="giftCardsAvailable.seasonal"
          :cardType="$t('preferences.payments.seasonal')"
          :selectedID="form.selectedCardID"
          @showGiftCards="showAllGiftCards"
          @selectedCard="selectedCard"
        />
        <!-- Seasonal Giftcard -->

        <!--  Add Amount heading -->
        <b-row class="gift-card-addamount">
          <b-col md="12">
            <div class="addamount-heading d-flex justify-content-start">
              <h5 class="text-bold">
                {{ $t('preferences.payments.add_amount') }}
              </h5>
            </div>
          </b-col>
        </b-row>
        <!-- ./Add amount heading -->

        <!-- Denomination -->
        <b-row class="gift-card-amountlist mb-2">
          <b-col
            v-for="(amount, index) in denominations"
            id="amount-list-button"
            :key="index"
            md="2"
            class="col-xs-4 mt-2"
            role="button"
            :class="{ selectedgiftcard: selectedDenomination === amount.id }"
            @click="selectAmount(amount)"
          >
            <div class="add-amount-item">
              &dollar;{{ amount.val | formatPrice }}
            </div>
          </b-col>

          <!-- Input Amount -->
          <b-col md="4" class="mt-2">
            <b-form-group id="customAmount" class="text-left">
              <b-form-input
                id="custom-amount"
                v-model="form.giftCardAmount"
                type="text"
                :placeholder="$t('preferences.payments.custom_amount')"
                @input="handleInput"
              ></b-form-input>
              <template #description>
                {{
                  $t('preferences.payments.upto_limit', { limit: amountLimit })
                }}
              </template>
            </b-form-group>
          </b-col>
        </b-row>
        <!-- ./Denomination -->

        <!-- Delivery Date -->
        <b-row class="deliver-date-row">
          <b-col md="4" class="delivery-date-col">
            <label class="d-flex justify-content-start">{{
              $t('preferences.payments.delivery_date')
            }}</label>
            <b-form-datepicker
              id="example-datepicker"
              v-model="form.deliveryDate"
              class="mb-2"
              value-as-date
              :date-format-options="{
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              }"
              :initial-date="initialDate"
              locale="en-US"
              @context="onContext"
            ></b-form-datepicker>
          </b-col>

          <b-col md="8 text-left m-auto pt-4">
            <span class="text-muted">{{
              $t('preferences.payments.can_be_placed_upto_an_year')
            }}</span>
          </b-col>
        </b-row>
        <!-- ./Delivery Date -->

        <!-- To and From -->
        <b-row class="to-and-from-row">
          <b-col md="6" sm="6" class="col-xs-12">
            <b-form-group id="to-receipt" class="text-center">
              <label class="d-flex justify-content-start">{{
                $t('vendor_purchase.to')
              }}</label>
              <EmailInputTags
                v-model="form.to"
                :limit="limit"
                :placeholder="$t('preferences.payments.enter_email_recipient')"
                :read-only="readOnly"
                :add-tags-on-blur="true"
                :add-tags-on-space="true"
              />
            </b-form-group>
          </b-col>

          <b-col md="6" sm="6" class="col-xs-12">
            <b-form-group id="" class="text-center">
              <label class="d-flex justify-content-start">{{
                $t('vendor_purchase.from')
              }}</label>
              <b-form-input
                id="from-input"
                v-model="form.from"
                type="text"
                :placeholder="$t('preferences.payments.your_name')"
              ></b-form-input>
              <span class="text-danger mt-1">
                {{ error.from }}
              </span>
            </b-form-group>
          </b-col>
        </b-row>
        <!-- ./To and From -->

        <!-- Message -->
        <b-row>
          <b-col>
            <b-form-group>
              <label
                for="textarea-small"
                class="d-flex justify-content-start"
                >{{ $t('preferences.payments.message') }}</label
              >
              <b-form-textarea
                id="textarea-small"
                v-model="form.message"
                size="sm"
                :maxlength="charLength"
                :placeholder="$t('preferences.payments.optional_message')"
              ></b-form-textarea>
              <span class="text-dark d-flex justify-content-start">
                {{
                  $t('preferences.payments.remaining_char', {
                    charLength: remainingCharLength,
                  })
                }}
              </span>
            </b-form-group>
          </b-col>
        </b-row>
        <!-- ./Message -->
        <b-row>
          <b-col md="6" sm="12" class="col-xs-12 addToBag-col">
            <!-- Add to Bag Button -->
            <b-button
              variant="addToBag"
              type="submit"
              class="float-right"
              pill
              @click="updateSubmitType('addToBag')"
            >
              {{ $t('preferences.payments.add_to_cart') }}
            </b-button>
            <!-- ./Add to Bag Button -->
          </b-col>
          <b-col md="6" sm="12" class="col-xs-12 purchase-col">
            <!-- Purchase Gift Card Button -->
            <b-button
              :disabled="!isPurchaseGiftCardValid"
              type="submit"
              class="float-right"
              :class="isPurchaseGiftCardValid ? 'enable-btn' : 'disabled-btn'"
              pill
              @click="updateSubmitType('purchaseGiftCard')"
            >
              {{ $t('preferences.payments.purchase_gift_card') }}
            </b-button>
            <!-- Purchase Gift Card Button -->
          </b-col>
        </b-row>
      </b-form>
    </ValidationObserver>
  </b-card-text>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { ValidationObserver } from 'vee-validate'
import GiftCardList from './GiftCardList.vue'
import emitEvent from '~/plugins/mixins/emit-event'
import { PURCHASE_GIFTCARD_DENOMINATION } from '~/static/constants'
import { EmailInputTags } from '~/components/common'
export default {
  name: 'GiftCardPurchase',

  components: {
    EmailInputTags,
    GiftCardList,
    ValidationObserver,
  },

  mixins: [emitEvent],

  data() {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    return {
      denominations: PURCHASE_GIFTCARD_DENOMINATION,
      selectedDenomination: {},
      currentDate: new Date(),
      deliveryDate: '',
      charLength: 140,
      actionType: '',
      form: {
        selectedCardID: '',
        deliveryDate: '',
        to: [],
        from: '',
        message: '',
        giftCardAmount: 0,
      },
      error: {
        from: '',
      },
      limit: 10,
      readOnly: false,
      minDate: new Date(today),
      maxDate: new Date(
        new Date().setFullYear(new Date(today).getFullYear() + 1)
      ),
      initialDate: today,
      amountLimit: '2,000.00',
    }
  },

  computed: {
    ...mapGetters({
      giftCardSelected: 'preferences/giftCardSelected',
      giftCardsAvailable: 'preferences/getAvailableGiftCards',
    }),

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    remainingCharLength: (vm) => {
      return Number(parseInt(vm.charLength) - parseInt(vm.form.message.length))
    },

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    isPurchaseGiftCardValid: (vm) => {
      return (
        vm.form.from &&
        vm.form.deliveryDate &&
        vm.form.deliveryDate > vm.currentDate &&
        vm.form.to.length > 0 &&
        vm.form.giftCardAmount > 0 &&
        vm.form.giftCardAmount <= 2000 &&
        vm.form.selectedCardID > 0 &&
        vm.form.deliveryDate >= vm.minDate &&
        vm.form.deliveryDate <= vm.maxDate
      )
    },
  },

  mounted() {
    // If any gift card selected then get the amount
    this.giftCardAmount = this.giftCardSelected.giftCard
      ? this.giftCardSelected.giftCard.amount
      : 0
  },

  created() {
    // Update the selected card ID.
    this.form.selectedCardID = this.giftCardSelected.giftCard?.id

    // Update the modal header
    this.updateModalHeader({
      title: this.$t('preferences.payments.purchase_gift_card'),
      showTabs: false,
      size: 'lg',
    })

    // Show the current date in YYYY-MM-DD format
    this.deliveryDate = this.$options.filters
      .formatDate(new Date(), 'DD-MM-YYYY')
      .split('-')
      .reverse()
      .join('-')
  },

  methods: {
    ...mapActions({
      updateModalHeader: 'preferences/updateModalHeader',
      updateGiftCardType: 'preferences/updateSelectedGiftCardType',
      updateGiftCardDetails: 'preferences/updateGiftCardDetails',
      selectGiftCard: 'preferences/selectGiftCard',
    }),

    selectedCard(val) {
      if (val === this.form.id) {
        this.form.selectedCardID = ''
      } else {
        this.form.selectedCardID = val
      }
    },

    // On amount box select update the amount
    selectAmount(value) {
      this.form.giftCardAmount = this.$options.filters.formatPrice(value.val)
      this.selectedDenomination = value.id
    },
    // On amount input.
    handleInput(e) {
      this.selectedDenomination = {}
    },
    // On view all select
    showAllGiftCards(val) {
      // Update the selected gift card on view all click
      this.updateGiftCardType({
        type: val.type,
        totalCount: val.count,
      })
      // Render View all cards
      this.emitRenderComponentEvent(
        this.$parent.$options.components.AllGiftCard.name
      )
    },

    onContext(ctx) {
      // The following will be an empty string until a valid date is entered
      this.deliveryDate = ctx.selectedYMD
    },

    // On click, change the action to be done.
    updateSubmitType(type) {
      this.actionType = type
    },

    // On form submit
    onSubmit() {
      // If the action type is purchase giftcard.
      // TODO: Add to Bag
      if (this.actionType === 'purchaseGiftCard') {
        const {
          selectedCardID,
          deliveryDate,
          to,
          from,
          message,
          giftCardAmount,
        } = this.form
        // Store the giftcard details, and show billinginfo screen.
        this.updateGiftCardDetails({
          TYPE: 'cardDetails',
          DETAILS: {
            selectedCardID,
            deliveryDate,
            to,
            from,
            message,
            giftCardAmount: giftCardAmount * 100,
          },
        })
        // Render the billing Info screen.
        this.emitRenderComponentEvent(
          this.$parent.$options.components.GiftCardAddress.name
        )
      }
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
#custom-amount
  height: 57px
  left: 843px
  top: 574px
  border: 1px solid $light-gray-2
  border-radius: 4px
.delivery-date-col
  .input-group-append
    .b-form-datepicker
      .btn-secondary::v-deep
        color: $color-black-1
        background-color: $color-white-1
        border-color: $color-white-1
        box-shadow: none
.form-control
  border: 1px solid $light-gray-2
  background: none
.btn-addToBag
  background: $color-white-1
  border: 1px solid $color-gray-4
  border-radius: 20px
  width: 203px
  height: 42px
  left: 725px
  top: 1055px
.disabled-btn
  background: $color-gray-4
  border-radius: 20px
  width: 203px
  height: 42px
  left: 725px
  top: 1055px
.enable-btn
  background: $color-blue-20
  border-radius: 20px
  width: 203px
  height: 42px
  left: 725px
  top: 1055px
@media (max-width: 767px)
  .purchase-col
    margin-top: 5px
@media (min-width: 768px)
  .purchase-col
    display: flex
    justify-content: flex-start
  .addToBag-col
    display: flex
    justify-content: flex-end
</style>
