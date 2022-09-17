<template>
  <div class="d-flex flex-column  bg-white h-100 w-100 px-4 py-3 rounded-sm">
    <div class="d-flex flex-column justify-content-between">
      <div class="top-section d-flex justify-content-between align-content-center">
        <span class="font-weight-bold">{{ $t('create_listing.confirm.details') }}</span>
        <div class="d-flex align-items-center">
          <Button
            variant="link"
            class="btn-copy mr-2"
            :tooltip-text="$t('common.copy')"
            @click="cloneItem"
          ></Button>
          <Button
            variant="link"
            class="btn-edit-inventory mr-2"
            :tooltip-text="$t('common.edit')"
            @click="editItem"
          ></Button>
          <Button
            variant="link"
            class="btn-delete"
            :tooltip-text="$t('common.delete')"
            @click="deleteItem"
          ></Button></div>
      </div>
      <div class="detail-section d-flex mt-2 flex-grow-1">
        <b-row>
          <b-col md="2">
            <Thumb :product="itemProduct.product" />
          </b-col>
          <b-col md="10" class="pl-4">
            <b-row class="mb-2 d-block">
              <div class="body-4-bold mb-2">{{ itemProduct.product.name }}</div>
              <div class="body-4-normal mb-2 text-gray-6 text-uppercase">
                {{ $t('shopping_cart.sku') }}&colon;&nbsp;{{ itemProduct.product.sku }}
              </div>
              <div class="body-4-normal mb-2 text-gray-6">
                {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{ itemProduct.product.colorway }}, {{ $t('shopping_cart.size') }}&colon;&nbsp;{{itemProduct.size.size }}
              </div>
              <div class="body-4-normal mb-2 text-gray-6">
                {{ $t('products.box_condition') }}&colon;&nbsp;{{itemProduct.packaging_condition.name}}
              </div>
            </b-row>
          </b-col>
        </b-row>
      </div>
    </div>

    <div class="d-flex flex-column justify-content-between h-100">
      <div class="duration-section d-flex flex-column mt-2">
        <span class="font-weight-bold mb-2">{{ $t('create_listing.confirm.duration') }}</span>
        <FormDropdown
          :id="'durationSelector'+item.id"
          :value="item.time_limit"
          :placeholder="$tc('create_listing.confirm.select_duration_placeholder')"
          :items="DURATIONS"
          :icon-arrow-up="require('~/assets/img/icons/arrow-up-blue.svg')"
          :icon-arrow-down="require('~/assets/img/icons/arrow-down-blue.svg')"
          class="mb-3 mw-40 mt-2"
          :class="{'is-invalid': itemError.includes('time_limit')}"
          no-arrow
          @select="handleDurationSelect"
        />
      </div>
      <div class="reserve-section d-flex flex-column">
        <span class="font-weight-bold">{{ $t('create_listing.confirm.reserve') }} <img :src="infoIcon" class="icon-info position-absolute mt-n2 mr-n5 scale-2" alt="Info icon" /></span>
        <b-row class="mt-2 ">
          <b-col cols="2">
            <CheckboxSwitch
              class="scale-2 ml-n3"
              :value="item.is_reserved"
              @change="handleReserveChange"
            />
          </b-col>
          <b-col cols="5">
            <FormInput
              :placeholder="$t('create_listing.confirm.reserve_price')"
              class="ml-3"
              :class="{'is-invalid': itemError.includes('reserve_price')}"
              :disabled="!item.is_reserved"
              required
              number
              type="number"
              :value="item.reserve_price"
              @input="(e) => handleChanges('reserve_price', e)"
            />
          </b-col>
          <b-col cols="5">
            <div v-if="item.is_reserved" class="py-4 px-3 rounded reserve-info position-absolute" >
              <img :src="infoIcon" class="icon-info scale-2 position-absolute mt-n3 ml-n2" alt="Info icon" />
              {{ $tc('create_listing.confirm.reserve_text_info', 1) }} ${{calculateFee(item.reserve_price).toFixed(2)}} {{ $tc('create_listing.confirm.reserve_text_info', 2) }}
            </div>
          </b-col>
        </b-row>
      </div>
      <div class="bid-section d-flex flex-column mt-2 row">
        <div class="col-12 col-md-7">
          <span class="font-weight-bold">{{ $t('create_listing.confirm.starting_bid') }}</span>
          <FormInput
            :placeholder="$t('create_listing.confirm.enter_starting_bid')"
            class="mw-40 mt-2"
            :class="{'is-invalid': itemError.includes('start_bid_price')}"
            required
            number
            :value="item.start_bid_price"
            @input="(e) => handleChanges('start_bid_price', e)"
          />
        </div>
      </div>
      <div class="status-section d-flex flex-column mt-2">
        <span class="font-weight-bold">{{ $t('create_listing.confirm.status') }}</span>
        <div class="d-flex align-items-center w-100 row">
          <div class="col-7 d-flex align-items-center flex-wrap status-row">
            <FormDropdown
              :id="'statusSelector'+itemProduct.id"
              :value="item.status"
              :placeholder="$tc('create_listing.confirm.select_duration_placeholder')"
              :items="STATUSES"
              :class="{'is-invalid': itemError.includes('status')}"
              :value-filtered="true"
              class="mb-3 mw-40 mt-2 pr-2 dropdown-filters"
              @select="handleStatusSelect"
            />
            <div v-if="item.status === 'scheduled'" class="schedule-time">
              <span
                :class="{'is-invalid': itemError.includes('scheduled_date')}"
              >{{(item.scheduled_date || $tc('create_listing.confirm.date_text'))}}</span>
              <b-form-datepicker
                size="xs"
                class=""
                button-only
                hide-header
                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                locale="en"
                @context="onContext">
                default
              </b-form-datepicker>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Thumb from '~/components/product/Thumb';
import {FormDropdown, FormInput, CheckboxSwitch} from '~/components/common'
import infoIcon from '~/assets/img/icons/info-blue.svg';
import createListingAuction from '~/plugins/mixins/create-listing-auction';

export default {
  name: 'AuctionItem',
  components: { Thumb, FormDropdown, FormInput, CheckboxSwitch},
  mixins: [createListingAuction],
  props: {
    item: {
      type: Object,
      default: null,
    },
    itemError: {
      type: Array,
      default: () => ([]),
    }
  },
  data(){
    return {
      infoIcon,
      DURATIONS: Object.keys(this.$t('create_listing.confirm.select_duration')).map(a => {
        return {
          label: this.$t(`create_listing.confirm.select_duration.${a}`),
          value:a,
        }
      }),
      STATUSES: Object.keys(this.$t('create_listing.confirm.status_select')).map(a => {
        return {
          label: this.$t(`create_listing.confirm.status_select.${a}`),
          value:a,
        }
      })
    }
  },
  computed: {
    itemProduct(){
      return this.item.item
    }
  },
  methods: {
    onContext(ctx) {
      if (ctx.selectedFormatted!=='No date selected'){
        this.handleChanges('scheduled_date', ctx.selectedFormatted)
      }
    },
    handleDurationSelect(item) {
      this.handleChanges('time_limit', item.value)

    },
    handleReserveChange(item) {
      this.handleChanges('is_reserved', item)
      if (!item){
        this.$nextTick(() => {
          this.handleChanges('reserve_price', null)
        })
      }
    },
    handleStatusSelect(item) {
      if (item.value === 'live') {
        this.$emit('formChange', {...this.item, status: item.value, scheduled_date: null })
      } else {
        this.$emit('formChange', {...this.item, status: item.value })
      }
    },
    handleChanges(prop, val){
      this.$emit('formChange', {...this.item, [prop]: val})
    },
    cloneItem(){
      this.$emit('clone', this.item)
    },
    deleteItem(){
      this.$emit('delete', this.item)
    },
    editItem(){
      this.$emit('edit', this.item)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.is-invalid
  border: $color-red-1 2px solid
  border-radius: 100px

.reserve-info
  @include body-5-bold
  background-color: $color-blue-10
.scale-2
  transform: scale(1.1)

::v-deep
  .custom-switch
    .custom-control-input
      &:checked
        & ~ .custom-control-label
          &::before
            color: $white
            border-color: $color-green-17
            background-color: $color-green-17
            box-shadow: none
::v-deep
  .custom-switch
    .custom-control-input
      & ~ .custom-control-label
        &::before
          color: $white
          border-color: rgba($color-gray-61, 0.16)
          background-color: rgba($color-gray-61, 0.16)
          box-shadow: none
::v-deep
  .custom-switch
    .custom-control-input
      &:checked
        & ~ .custom-control-label
          &::after
            background-color: $white

::v-deep
  .custom-switch
    .custom-control-input
      & ~ .custom-control-label
        &::after
          background-color: $white

.custom-control-label
  &::after
    background-color: $white

.checkbox-switch
  align-items: center
  display: flex

  span
    @include body-5-bold
    color: $color-green-4

    &.active
      color: $color-green-1

.custom-switch
    margin-bottom: 5px
    margin-left: 10px


.mw-40
  max-width: 200px
.btn-copy
  width: 30px
  height: 30px
  background-image: url('~/assets/img/product/actions.png')
  background-position: left
  border: none
  border-radius: 4px

.btn-edit-inventory
  width: 30px
  height: 30px
  background-image: url('~/assets/img/product/actions.png')
  background-position: center
  border: none
  border-radius: 4px

.btn-delete
  width: 30px
  height: 30px
  background-image: url('~/assets/img/product/actions.png')
  background-position: right
  border: none
  border-radius: 4px

.dropdown-filters::v-deep
  .btn-dropdown
    @include body-4-normal
    color: $color-black-1
    border: 1px solid $color-gray-23
    border-radius: 6px
    height: 30px
    width: 100%
    padding: 0 20px
    min-width: 140px
    justify-content: space-between

    &.opened
      border-bottom-left-radius: 0
      border-bottom-right-radius: 0
      border-bottom: 1px solid $color-gray-23

  .search-results
    .popover-body
      > div
        @include body-4-normal
        font-family: $font-family-base
        color: $color-gray-5
        height: 30px
        border: 1px solid $color-gray-23
        padding: 0 23px

        &:hover
          color: $color-black-1

        &:last-child
          border-bottom-left-radius: 4px
          border-bottom-right-radius: 4px
  .status-row
    .schedule-time
      width: 120px
</style>
