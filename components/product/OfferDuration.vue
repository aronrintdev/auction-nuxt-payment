<template>
  <b-row class="offer-duration-wrapper">
    <b-col md="12">
      <div class="offer-duration-text body-4-regular text-center">
        <span class="float-left" role="button" @click="$emit('clear-offer')">
          <b-img :src="require('~/assets/img/product/arrow-left-gray.svg')"/>
          <span class="text-gray-22 body-8-medium">{{ $t('common.back') }}</span>
        </span>
        <span class="text-black">{{ $t('products.please_select_offer_duration') }}</span>
      </div>

      <b-row class="mt-3 offer-duration-items-wrapper">
        <b-col md="12" class="d-flex justify-content-between">
          <Button
            v-for="offerDuration in offerDurations"
            :key="offerDuration"
            :class="{ 'active': selectedOfferDuration === offerDuration }"
            class="px-0"
            variant="outline-dark-blue"
            @click="selectOfferDuration(offerDuration)"
          >
            {{ offerDuration }}&nbsp;{{ $tc('place_offer.days', offerDuration) }}
          </Button>
        </b-col>
      </b-row>

      <Button
        :disabled="! canPlaceOffer"
        class="place-offer-btn mt-3"
        variant="dark"
        block
        @click="$emit('place-offer', { offerAmount: offerAmount, offerDuration: selectedOfferDuration})"
      >
        {{ $t('products.place_offer_for', { amount: formatOfferAmount }) }}
      </Button>
    </b-col>
  </b-row>
</template>

<script>
import Button from '~/components/common/Button'
import { OFFER_DURATIONS, AMOUNT_OFFSET } from '~/static/constants'

export default {
  name: 'OfferDuration',
  components: { Button },
  props: {
    offerAmount: {
      type: Number,
      required: true,
      default: 0.00
    }
  },
  data() {
    return {
      offerDurations: OFFER_DURATIONS,
      selectedOfferDuration: null,
    }
  },
  computed: {
    canPlaceOffer(vm) {
      return !!(vm.selectedOfferDuration)
    },
    formatOfferAmount(vm) {
      return vm.$root.$options.filters.toCurrency(vm.offerAmount * AMOUNT_OFFSET)
    }
  },
  methods: {
    selectOfferDuration(offerDuration) {
      this.selectedOfferDuration = offerDuration
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.text-gray-22
  color: $color-gray-22

.offer-duration-wrapper
  .offer-duration-text
    padding: 2px 0

  .place-offer-btn
    min-height: 46px

  .offer-duration-items-wrapper
    button
      min-height: 46px
      min-width: 90px

      &.active
        background: $color-blue-20
        color: $white
</style>
