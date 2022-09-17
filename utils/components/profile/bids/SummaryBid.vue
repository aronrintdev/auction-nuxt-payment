<template>
  <b-row v-if="bid" class="mt-3 text-center px-5 py-5 ml-n1 table-text w-100 bg-white single-item position-relative">
    <div v-if="isMine"
         class="position-absolute tag-bid d-flex align-items-center justify-content-center text-white your-tag">
      {{ $t('bids.yours') }}
    </div>
    <b-col sm="12" md="5" class="text-left">
      <b-row class="align-items-center">
        <b-col sm="2">
          <img :src="HandIcon" alt="Bid hand">
        </b-col>
        <b-col sm="4">
          <div v-if="isHighest" class="highest-bid-text ">{{ $t('bids.bid_status.highest_bid') }}</div>
        </b-col>
        <b-col sm="6">
        </b-col>
      </b-row>
    </b-col>
    <b-col sm="12" md="4" class="d-flex flex-column align-items-center justify-content-center">
      <div>&dollar;{{ bid.price / 100 }}</div>
    </b-col>
    <b-col sm="12" md="3" class="d-flex flex-column align-items-center justify-content-center">
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
  color: $secondary

.table-text
  @include body-4-medium

.time-text
  color: $color-gray-47

.single-item
  border-radius: 10px
  border: 1px solid $color-gray-60
  padding: 15px 10px
</style>
