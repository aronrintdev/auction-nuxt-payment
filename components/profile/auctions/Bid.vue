<template>
  <b-row v-if="bid" class="mx-0 table-text single-item" >
    <b-col cols="5" md="5" class="d-flex text-left align-items-center">
      <div class="d-flex align-items-center">
        <b-form-checkbox
          v-if="selectable"
          :id="'checkbox-bid-'+ bid.id"
          :checked="selected"
          class="custom-checkbox"
          @change="bidSelected"
        >&nbsp;</b-form-checkbox>
        <img :src="HandIcon" :alt="$t('bids.bid_hand')">
        <div v-if="isHighest" class="highest-bid-text text-center">{{ $t('auction.highest_bid') }}</div>
        <div v-if="isHighest && acceptable">
          <Button
            pill
            block
            variant="dark-grey"
            class="accept-button border-0"
            @click="$emit('accept', bid)"
          >
            {{$t('auction.accept')}}
          </Button>
        </div>
      </div>
    </b-col>
    <b-col cols="4" md="4" class="d-flex flex-column align-items-center justify-content-center price-text">
      <div>&dollar;{{ bid.price| formatPrice}}</div>
    </b-col>
    <b-col cols="3" md="3" class="d-flex flex-column align-items-center justify-content-center">
      <div class="date-text">{{ getDateAndTime[0] }}</div>
      <div class="time-text">{{ getDateAndTime[1] }}</div>
    </b-col>
  </b-row>
</template>

<script>
import HandIcon  from '~/assets/img/icons/bid-hand.png'
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
  .accept-button.btn
    background-color: $secondary
    font-family: $font-sp-pro
    font-weight: $normal
    @include body-4b
    color: $white
    border: 1px solid $white
    border-radius: 21px
    width: 191px

.highest-bid-text
  font-family: $font-sp-pro
  font-weight: $normal
  @include body-4b
  color: $color-green-26
  color: $secondary
  width: 141px
  margin-left: 14px
  margin-right: 45px

.table-text
  @include body-4-medium

.date-text
  font-family: $font-sp-pro
  font-weight: $normal
  @include body-5
  color: $black
  margin-bottom: 3px

.time-text
  color: $color-gray-59
  font-family: $font-sp-pro
  font-weight: $normal
  @include body-5

.price-text
  font-family: $font-sp-pro
  font-weight: $normal
  @include body-4b
  color: $black

.single-item
  border-radius: 10px
  border: 1px solid $color-gray-58
  padding: 15px 10px
  background: white
  margin-bottom: 11px
  height: 116px
  img
    width: 63px
    margin-left: 30px
  .custom-control::v-deep
    .custom-control-label::before,
    .custom-control-label::after
      width: 16px
      height: 16px

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
