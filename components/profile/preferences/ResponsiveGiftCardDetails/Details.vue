<template>
  <div v-if="isScreenXS" class="container details-card-wrapper">
    <div class="row ">
      <div class="col-12 card-details-box px-0">
        <card-details
          v-if="isScreenXS"
          :card-details="getSelectedGiftCard"
        />
      </div>
      <div class="col-12 transaction-heading-col px-0 mt-46 mb-12">
        <div class="transaction-history-heading mx-16">
          {{ $t('giftcard_section.transaction_history') }}
        </div>
      </div>
      <div class="col-12 transaction-history-card-wrapper">
        <responsive-transaction-history v-if="isScreenXS" />
      </div>

      <div class="col-12 how-to-use-section">
        <div class="how-to-use">
          {{ $t('giftcard_section.how_to_use.heading') }}
        </div>
        <div class="how-to-use-desc">
          {{ $t('giftcard_section.how_to_use.main_text') }}
        </div>
      </div>

      <div class="col-12 more-info-icon">
        <img :src="require('~/assets/img/icons/more-ques.svg')" alt="more-icon" class="position-fixed">
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ResponsiveTransactionHistory from './ResponsiveTransactionHistory.vue'
import CardDetails from './CardDetails.vue'
import screenSize from '~/plugins/mixins/screenSize'
export default {
  name: 'GiftCardDetails',

  components: {
    CardDetails,
    ResponsiveTransactionHistory
  },

  mixins: [screenSize],

  computed: {
    ...mapGetters({
      getSelectedGiftCard: 'preferences/getSelectedGiftCard',
    }),
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.details-card-wrapper
  .mx-16
    margin-right: 16px
    margin-left: 16px
  .card-details-box
    padding-top: 32px
  .transaction-heading-col
    font-family: $font-montserrat
    font-style: normal
    @include body-5-medium
    color: $color-black-1
    &.mt-46
      margin-top: 46px
    &.mb-12
      margin-bottom: 12px
    .mx-16
      margin-right: 16px
      margin-left: 16px
  .how-to-use-section
    padding-right: 16px
    padding-left: 16px
    margin-top: 10px
    .how-to-use
      font-family: $font-sf-pro-text
      font-style: normal
      @include body-6-medium
      color: $color-black-1
    .how-to-use-desc
      font-family: $font-sf-pro-text
      font-style: normal
      @include body-6-regular
      color: $color-black-1
  .more-info-icon
    img
      bottom: 15vh
      right: 0
      margin-right: 16px
</style>