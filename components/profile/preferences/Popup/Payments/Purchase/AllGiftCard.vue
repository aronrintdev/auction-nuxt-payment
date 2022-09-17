<template>
  <b-card-text class="gift-card-purchase px-5 pb-5">
    <!-- Back button -->
    <b-row>
      <b-col md="12">
        <span
          id="backto-btn"
          role="button"
          class="text-muted text-bold d-flex justify-content-start"
          @click="backtoPurchaseGiftCard"
        >
          &#60; {{ $t('preferences.payments.back_to_giftcard') }}
        </span>
      </b-col>
    </b-row>
    <!-- ./Back button -->
    <b-row class="mt-4">
      <h5 class="text-capitalize">
        {{ $t('preferences.payments.view_all_cards_type', { type: selectedGiftCardDetails.type, }) }}&#40;{{ giftCard.length }}&#41;
      </h5>
    </b-row>
    <!-- Cards -->

    <!-- Gift Card Type/ View-all/ Image -->
    <b-row class="giftcard-purchase-row mt-2">
      <b-col
        v-for="(type, index) in giftCard"
        :id="`card-${index}`"
        :key="index"
        role="button"
        md="3"
        class="mb-4 text-center p-2"
        :class="[selectedCard.id === type.id ? 'border shadow rounded' : '']"
        @click="selectCard(type)"
      >
        <div class="img-wrapper">
          <img
            :src="
              require(`~/assets/img/preferences/giftcard/${type.image_name}`)
            "
            class="img-fluid w-100 rounded-3"
            alt="giftcard"
          />
        </div>
        <small class="text-bold">{{ type.name }}</small>
      </b-col>
    </b-row>
    <p
      v-if="cardSelectError"
      class="text-danger text-bold d-flex justify-content-start"
    >
      {{ $t('preferences.payments.please_select_a_card') }}
    </p>
    <b-button
      variant="light"
      pill
      class="save-cards-button float-right px-3"
      @click="updateSelectedGiftCard"
    >
      {{ $t('preferences.payments.select_gift_card') }}
    </b-button>
    <!-- ./Cards -->
  </b-card-text>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import emitEvent from '~/plugins/mixins/emit-event'
export default {
  name: 'AllGiftCard',

  mixins: [emitEvent],

  data() {
    return {
      selectedCard: '',
      cardSelectError: false,
    }
  },

  computed: {
    ...mapGetters({
      selectedGiftCardDetails: 'preferences/selectedGiftCardDetails',
      getGiftCards: 'preferences/getAvailableGiftCards',
    }),
    
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    giftCard: (vm) => {
      return vm.selectedGiftCardDetails.type === 'featured'
        ? vm.getGiftCards.featured
        : vm.getGiftCards.seasonal
    },
  },
  
  created() {
    // Update the modal header
    this.updateModalHeader({
      title: this.$t('preferences.payments.purchase_gift_card'),
      showTabs: false,
      size: 'lg',
    })
  },

  methods: {
    ...mapActions({
      selectGiftCard: 'preferences/selectGiftCard',
      updateModalHeader: 'preferences/updateModalHeader',
    }),
    // Back to Purchase Gift Card payment screen.
    backtoPurchaseGiftCard() {
      this.emitRenderComponentEvent(
        this.$parent.$options.components.GiftCardPurchase.name
      )
    },
    // select a gift card
    selectCard(card) {
      this.selectedCard = card
    },
    // Update Gift card ID
    updateSelectedGiftCard() {
      if (this.selectedCard === '') {
        this.cardSelectError = true
      } else {
        this.cardSelectError = true
        this.selectGiftCard({
          giftCard: this.selectedCard,
        })
        this.backtoPurchaseGiftCard()
      }
    },
  },
}
</script>
