<template>
  <b-row v-if="giftCards.length" class="giftcard-purchase-row mb-2">
    <b-col md="12">
      <div class="giftcardpurchase-heading d-flex">
        <!-- Gift Card Type Heading -->
        <h5>{{ cardType }}</h5>
        <!-- End of Gift Card Type Heading -->

        <!-- View All Link -->
        <span role="button" class="view-all-link ml-auto" @click="showAllCard">
          {{ $t('preferences.payments.view_all') }} &#40;{{
            giftCards.length
          }}&#41;
        </span>
        <!-- View All Link -->
      </div>

      <!-- Feature Giftcard -->
      <div class="giftcardpurchase-content mt-2">
        <b-row class="purchase-gift-card-listing-row">
          <b-col
            v-for="(featureCard, index) in giftCards.slice(0, 4)"
            :key="index"
            class="giftcardimage-content"
          >
            <div
              class="img-wrapper"
              role="button"
              @click="selectCard(featureCard)"
            >
              <div
                :class="
                  selectedID === featureCard.id &&
                  'border rounded bg-white selected-card'
                "
              >
                <img
                  :src="
                    require(`~/assets/img/preferences/giftcard/${featureCard.image_name}`)
                  "
                  class="img-fluid w-100 rounded-3"
                  alt="giftcard"
                />
              </div>
            </div>
          </b-col>
        </b-row>
      </div>
      <!-- ./Feature Gift Card -->
    </b-col>
  </b-row>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'GiftCardList',

  props: {
    // Gift cards
    giftCards: {
      type: Array,
      default: () => [],
    },
    // Card type. (Seasonal/ Featured)
    cardType: {
      type: String,
      required: true,
    },
    selectedID: {
      type: Number,
      default: null,
    },
  },

  methods: {
    ...mapActions({
      selectGiftCard: 'preferences/selectGiftCard',
    }),
    // Emit type and length to show all cards.
    showAllCard() {
      this.$emit('showGiftCards', {
        type: this.cardType.toLowerCase(),
        length: this.giftCards.length,
      })
    },

    // Gift card on select
    selectCard(val) {
      if (this.selectedID === val.id) {
        this.selectGiftCard({
          giftCard: {},
        })
        this.$emit('selectedCard', null)
      } else {
        this.selectGiftCard({
          giftCard: val,
        })
        this.$emit('selectedCard', val.id)
      }
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.view-all-link
  color: $color-blue-20
  font-family: $font-family-montserrat
  font-style: normal
  @include body-5-medium
.selected-card
  -webkit-box-shadow: 10px 10px 14px 0px $color-black-1
  -moz-box-shadow: 10px 10px 14px 0px $color-black-1
  box-shadow: 10px 10px 14px 0px $color-black-1
</style>