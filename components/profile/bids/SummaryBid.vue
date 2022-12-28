<template>
  <b-row v-if="bid" class="mx-0 bg-white align-items-center single-item position-relative">
    <div v-if="isMine" class="d-none position-absolute tag-bid d-md-flex align-items-center justify-content-center text-white your-tag">
      {{ $t('bids.yours') }}
    </div>
    <b-col cols="6" md="5" class="text-left">
      <b-row class="align-items-center">
        <img :src="HandIcon" class="hand" alt="Bid hand">
        <div v-if="isHighest" class="highest-bid-text ">{{ $t('bids.bid_status.highest_bid') }}</div>
      </b-row>
    </b-col>
    <b-col cols="3" md="5" class="d-flex flex-column align-items-center justify-content-center">
      <div class="price-text">&dollar;{{ bid.price | formatPrice }}</div>
    </b-col>
    <b-col cols="3" md="2" class="d-flex flex-column align-items-center justify-content-center text-center">
      <div class="date-text">{{ getDateAndTime[0] }}</div>
      <div class="time-text">{{ getDateAndTime[1] }}</div>
    </b-col>
  </b-row>
</template>

<script>
import HandIcon from '~/assets/img/icons/bid-hand.svg'

export default {
  name: 'SummaryBid',
  props: {
    bid: {
      type: Object,
      required: true
    },
    isMine: {
      type: Boolean,
      default: false
    },
    isHighest: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      HandIcon
    }
  },
  computed: {
    /**
     * Splitting the date and time into two different variables.
     */
    getDateAndTime() {
      return this.bid.created_at.split('.')[0].split('T')
    },
  },
  methods: {
    bidSelected() {
      this.$emit('selected', this.bid.id)
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.your-tag
  background-color: $color-blue-1

.tag-bid
  @include body-4
  font-weight: $regular
  height: 30px
  width: 70px
  left: 0
  top: 0
  z-index: 10
  border-top-left-radius: 10px
  border-bottom-right-radius: 10px

:deep(.accept-button.btn)
  background-color: $secondary
  border: none


.highest-bid-text
  font-family: $font-sp-pro
  font-weight: $normal
  @include body-13
  color: $color-green-26
.time-text
  font-family: $font-sp-pro
  font-weight: $normal
  @include body-5
  color: $color-gray-47
.date-text
  font-family: $font-sp-pro
  font-weight: $normal
  @include body-13
  color: $black
.price-text
  font-family: $font-sp-pro
  font-weight: $normal
  @include body-13
  color: $black

.single-item
  border-radius: 10px
  border: 1px solid $color-gray-60
  padding: 38px 47px
  margin-bottom: 11px

img.hand
  width: 63px
  margin-right: 38px

@media (max-width: 576px)
  .tag-bid
    display: none
  
  .single-item
    padding: 8px 6.5px 11px 15px
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25)
    border-radius: 10px
    border: none
    height: 64px
    margin-bottom: 22px

  img.hand
    width: 54px
    margin-right: 30px

  .highest-bid-text,
  .price-text,
  .time-text,
  .date-text
    font-family: $font-montserrat
    font-weight: $medium
    @include body-9
  
</style>
