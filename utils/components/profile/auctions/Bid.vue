<template>
  <b-row v-if="bid" class="mt-3 text-center px-5 py-5 ml-n1 table-text w-100 bg-white single-item" >
    <b-col sm="12" md="5" class="text-left">
      <b-row class="align-items-center">
        <b-col sm="2">
          <b-form-checkbox
            v-if="selectable"
            :id="'checkbox-bid-'+ bid.id"
            :checked="selected"
            class="position-absolute ml-n3 px-1"
            @change="bidSelected"
          >&nbsp;</b-form-checkbox>
          <img :src="HandIcon" :alt="$t('bids.bid_hand')">
        </b-col>
        <b-col sm="4">
          <div v-if="isHighest" class="highest-bid-text">{{ $t('auction.highest_bid') }}</div>
        </b-col>
        <b-col sm="6">
          <div v-if="isHighest && acceptable" class="px-5">
            <Button
              pill
              block
              class="accept-button border-0"
              @click="$emit('accept', bid)"
            >
              {{$t('auction.accept')}}
            </Button>
          </div>
        </b-col>
      </b-row>
    </b-col>
    <b-col sm="12" md="4" class="d-flex flex-column align-items-center justify-content-center">
      <div>&dollar;{{ bid.price| formatPrice}}</div>
    </b-col>
    <b-col sm="12" md="3" class="d-flex flex-column align-items-center justify-content-center">
      <div class="date-text">{{ getDateAndTime[0] }}</div>
      <div class="time-text">{{ getDateAndTime[1] }}</div>
    </b-col>
  </b-row>
</template>

<script>
import HandIcon  from '~/assets/img/icons/bid-hand.svg'
import Button from '~/components/common/Button';
export default {
  name: 'Bid',
  components: {Button},
  props: {
    bid: {
      type: Object,
      required: true
    },
    isHighest: {
      type: Boolean,
      default: false
    },
    acceptable: {
      type: Boolean,
      default: true
    },
    selectable: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      HandIcon
    }
  },
  computed:{
    /**
     * Splitting the date and time into two separate strings.
     * @return {string[]}
     */
    getDateAndTime(){
      return this.bid.created_at.split('.')[0].split('T')
    },
  },
  methods: {
    bidSelected(val){
      this.$emit('selected', this.bid.id)
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

::v-deep
  .accept-button
    background-color: $secondary !important


.highest-bid-text
  color: $secondary

.table-text
  @include body-4-medium

.time-text
  color: $color-gray-59

.single-item
  border-radius: 10px
  border: 1px solid $color-gray-58
  padding: 15px 10px
</style>
