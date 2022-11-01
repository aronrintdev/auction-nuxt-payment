<template>
  <div class="mt-3 d-flex justify-content-between align-items-center align-items-md-end mx-auto body-3-bold w-650 bid-offer">
    <span>{{$t('auction.bid')}} {{ index+1 }}</span>
    <span>=</span>
    <span>&dollar;{{ bid.price | formatPrice }}</span>
    <div class="d-flex align-items-center align-items-md-end">
      <FormDropdown
        :id="'durationSelector-'+bid.id"
        :value="duration"
        :placeholder="$tc('auction.select_duration', 2)"
        :items="DURATIONS"
        :label="$t('bids.duration')"
        :icon-arrow-up="arrowUpIcon"
        :icon-arrow-down="arrowDownIcon"
        class="d-none d-md-block dropdown-filters mr-4"
        :class="hasError? 'has-error' : ''"
        no-arrow
        @select="selectDuration"
      />
      <button
        class="d-md-none text-left duration-box-btn mr-3 position-relative d-flex align-items-center"
        :class="hasError? 'has-error' : ''"
        @click="openDurationSheet"
      >
        <span v-if="!duration" class="placeholder">{{ $t('create_listing.confirm.select_duration_placeholder') }}</span>
        <span v-else class="value">{{ duration }} {{ $tc('common.day', duration) }}</span>
        <img src="~/assets/img/icons/arrow-down-gray.svg" class="position-absolute" />
      </button>
      <Button
        variant="link"
        class="btn-delete border-0"
        :tooltip-text="$t('common.delete')"
        @click="$emit('remove', bid)"
      ></Button>
      <!-- Duration Sheet -->
      <vue-bottom-sheet ref="durationSheet">
        <div class="d-flex flex-column h-100 filters-sheet">
          <div class="filters-sheet-title text-center">{{ $t('auction.select_duration') }}</div>
          <div class="flex-shrink-1 overflow-auto filters-sheet-content">
            <div v-for="item in DURATIONS" :key="item.value">
              <button class="w-100 border-0 text-left condition-option" @click="selectDuration(item);closeDurationSheet()">
                <div>{{ item.value }} {{ $tc('common.day', item.value) }}</div>
              </button>
            </div>
          </div>
        </div>
      </vue-bottom-sheet>
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
    },
    openDurationSheet() {
      this.$refs.durationSheet.open()
    },
    closeDurationSheet() {
      this.$refs.durationSheet.close()
    },
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

@media (max-width: 576px)
  .bid-offer.w-650
    width: 100%
    @include body-5
    .duration-box-btn
      @include body-9
      border: 1px solid $color-gray-3
      border-radius: 10px
      background: transparent
      padding: 17px 14px
      font-family: $font-montserrat
      font-weight: $medium
      &.has-error
        border: 2px solid $color-red-3
      .placeholder
        color: $color-gray-23
      .value
        color: $black
      img
        display: none

.bottom-sheet::v-deep
  .bottom-sheet__content
      overflow: hidden
.filters-sheet-content
  padding: 0
  .condition-option
    @include body-5
    font-family: $font-family-sf-pro-display
    font-weight: $regular
    color: $black
    padding: 0 14px
    background: transparent
    div
      padding: 17px 0
      border-bottom: 0.5px solid $color-white-12
    &:active
      background: $color-blue-20
      div
        border-color: $color-blue-20
        color: $white
</style>
