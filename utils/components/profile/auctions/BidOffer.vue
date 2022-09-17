<template>
  <div class="mt-3 d-flex justify-content-between align-items-end mx-auto body-3-bold w-650">
    <span>{{$t('auction.bid')}} {{ index+1 }}</span>
    <span>=</span>
    <span>&dollar;{{ bid.price | formatPrice }}</span>
    <div class="d-flex align-items-end">
      <FormDropdown
        :id="'durationSelector-'+bid.id"
        :value="duration"
        :placeholder="$tc('auction.select_duration', 2)"
        :items="DURATIONS"
        :label="$t('bids.duration')"
        :icon-arrow-up="arrowUpIcon"
        :icon-arrow-down="arrowDownIcon"
        class="dropdown-filters mr-4"
        :class="hasError? 'has-error' : ''"
        no-arrow
        @select="selectDuration"
      />
      <Button
        variant="link"
        class="btn-delete border-0"
        :tooltip-text="$t('common.delete')"
        @click="$emit('remove', bid)"
      ></Button>

    </div>
  </div>
</template>

<script>
import {FormDropdown, Button} from '~/components/common';
import arrowUpIcon from '~/assets/img/icons/arrow-up-blue.svg'
import arrowDownIcon from '~/assets/img/icons/arrow-down-blue.svg'

export default {
  name: 'BidOffer',
  components: {FormDropdown, Button},
  props:{
    bid: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    hasError: {
      type: String,
      default: null
    },
  },
  data(){
    return{
      duration: null,
      DURATIONS: Object.keys(this.$t('auction.select_durations')).map(key => {
        return {
          label: this.$t(`auction.select_durations.${key}`),
          value:key,
        }
      }),
      arrowUpIcon,
      arrowDownIcon,
    }
  },
  methods: {
    selectDuration(selected){
      this.duration = selected.value
      this.$emit('select', {value: selected.value, bid: this.bid})
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.dropdown-filters
  min-width: 200px

::v-deep
  .has-error
    .mt-2
      button
        border: 2px solid $color-red-3

.btn-delete.btn
  width: 30px
  height: 30px
  background-image: url('~/assets/img/product/actions.png')
  background-position: right
  border-radius: 4px

</style>
