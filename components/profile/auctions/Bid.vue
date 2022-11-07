<template>
  <b-row v-if="bid" class="mt-3 text-center p-0 py-2 px-md-5 py-md-5 ml-0 ml-md-n1 table-text bg-white single-item" >
    <b-col cols="5" md="5" class="text-left">
      <b-row class="align-items-center">
        <b-col cols="6" sm="2" class="d-flex d-md-block align-items-center px-0">
          <b-form-checkbox
            v-if="selectable"
            :id="'checkbox-bid-'+ bid.id"
            :checked="selected"
            class="custom-checkbox"
            @change="bidSelected"
          >&nbsp;</b-form-checkbox>
          <img :src="HandIcon" :alt="$t('bids.bid_hand')">
        </b-col>
        <b-col cols="6" sm="4" class="px-0">
          <div v-if="isHighest" class="highest-bid-text">{{ $t('auction.highest_bid') }}</div>
        </b-col>
        <b-col cols="12" sm="6">
          <div v-if="isHighest && acceptable" class="px-0 px-md-5">
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
    <b-col cols="4" md="4" class="d-flex flex-column align-items-center justify-content-center">
      <div>&dollar;{{ bid.price| formatPrice}}</div>
    </b-col>
    <b-col cols="3" md="3" class="d-flex flex-column align-items-center justify-content-center">
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
  width: 100%

@media (max-width: 576px)
  .table-text
    @include body-9
  .single-item
    border: none
    width: auto
    img
      width: 40px
  .accept-button
    @include body-9
    height: 25px
    margin-top: 5px
  .highest-bid-text
    @include body-18
</style>
