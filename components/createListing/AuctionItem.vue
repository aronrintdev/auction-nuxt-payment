<template>
  <div class="item d-flex flex-column bg-white h-md-100 w-100 rounded-md">
    <div class="position-relative d-flex flex-column justify-content-between">
      <div class="top-section d-none d-md-flex justify-content-between align-content-center">
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
          ></Button>
        </div>
      </div>
      <b-dropdown id="dropdown-right" right variant="link" no-caret class="d-md-none position-absolute more-btn">
        <template #button-content >
          <img src="~/assets/img/icons/vertical-three-dots-icon.svg" />
        </template>
        <b-dropdown-item @click="cloneItem">{{ $t('common.copy') }}</b-dropdown-item>
        <b-dropdown-item @click="editItem">{{ $t('common.edit') }}</b-dropdown-item>
        <b-dropdown-item @click="deleteItem">{{ $t('common.delete') }}</b-dropdown-item>
      </b-dropdown>
      <div class="detail-section d-flex mt-2 flex-grow-1">
        <b-row>
          <b-col sm="3" md="2">
            <Thumb :product="itemProduct.product" />
          </b-col>
          <b-col sm="9" md="10" class="pr-4">
            <b-row class="mb-2 d-block">
              <div class="body-4-bold mb-2 product-name">{{ itemProduct.product.name }}</div>
              <div class="body-4-normal mb-2 text-gray-6 text-uppercase product-sku">
                {{ $t('shopping_cart.sku') }}&colon;&nbsp;{{ itemProduct.product.sku }}
              </div>
              <div class="body-4-normal mb-2 text-gray-6 product-color">
                {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{ itemProduct.product.colorway }}, {{ $t('shopping_cart.size') }}&colon;&nbsp;{{itemProduct.size.size }}
              </div>
              <div class="body-4-normal mb-2 text-gray-6 product-condition">
                {{ $t('products.box_condition') }}&colon;&nbsp;{{itemProduct.packaging_condition.name}}
              </div>
            </b-row>
          </b-col>
        </b-row>
      </div>
    </div>

    <div class="d-md-none">
      <div class="mt-4 status">
        <div class="font-weight-bold mb-2">{{ $t('create_listing.confirm.status') }}*</div>
        <CheckboxSwitch
          class="full-width-switch"
          :labelOff="$t('create_listing.confirm.status_select.live')"
          :labelOn="$t('create_listing.confirm.status_select.scheduled')"
          :value="item.status === 'scheduled'"
          @change="handleStatusSwitch"
        />
        <div v-if="item.status === 'scheduled'" class="schedule-time mt-2">
          <span v-if="item.scheduled_date">{{ item.scheduled_date }}</span>
          <span v-else class="text-danger body-5-regular">* {{ $t('create_listing.confirm.schedule_date_required') }}</span>
        </div>
      </div>
      <div class="mt-4 d-flex">
        <div class="duration-section d-flex flex-column">
          <div class="font-weight-bold mb-2">{{ $t('create_listing.confirm.duration') }}</div>
          <FormDropdown
            :id="'durationSelector'+item.id"
            :value="item.time_limit"
            :placeholder="$tc('create_listing.confirm.select_duration_placeholder')"
            :items="DURATIONS"
            :icon-arrow-up="require('~/assets/img/icons/arrow-up-blue.svg')"
            :icon-arrow-down="require('~/assets/img/icons/arrow-down-blue.svg')"
            :class="{'is-invalid': itemError.includes('time_limit')}"
            class="d-none d-md-block"
            no-arrow
            @select="handleDurationSelect"
          />
          <button
            class="d-md-none text-left duration-box-btn position-relative d-flex align-items-center"
            :class="{'is-invalid': itemError.includes('time_limit')}"
            @click="openDurationSheet"
          >
            <span v-if="!item.time_limit" class="placeholder">{{ $t('create_listing.confirm.select_duration_placeholder') }}</span>
            <span v-else class="value">{{ item.time_limit }} {{ $tc('common.day', item.time_limit) }}</span>
          </button>
        </div>
        <div class="reserve-section d-flex flex-column ml-3">
          <div class="font-weight-bold">{{ $t('create_listing.confirm.reserve') }} <img :src="infoIcon" class="icon-info position-absolute ml-1 scale-2" alt="Info icon" /></div>
          <div class="mt-2 d-flex align-items-center">
            <CheckboxSwitch
              class="reserve-switch"
              :value="item.is_reserved"
              @change="handleReserveChange"
            />
            <FormInput
              placeholder="$"
              :class="{'is-invalid': itemError.includes('reserve_price')}"
              :disabled="!item.is_reserved"
              required
              number
              class="ml-2"
              :pill="false"
              type="number"
              :value="item.reserve_price"
              @input="(e) => handleChanges('reserve_price', e)"
            />
          </div>
        </div>
      </div>
      <div v-if="item.is_reserved" class="mt-2 p-2 d-flex align-items-start rounded reserve-info" >
        <img :src="infoIcon" class="icon-info mr-2" alt="Info icon" />
        <span>{{ $t('create_listing.confirm.reserve_info_short') }}</span>
      </div>
      <div class="bid-section d-flex flex-column mt-4 row">
        <div class="col-12 col-md-7">
          <span class="font-weight-bold">{{ $t('create_listing.confirm.starting_bid') }}</span>
          <FormInput
            :placeholder="$t('create_listing.confirm.enter_starting_bid')"
            class="mt-2"
            :class="{'is-invalid': itemError.includes('start_bid_price')}"
            required
            number
            :pill="false"
            :value="item.start_bid_price"
            @input="(e) => handleChanges('start_bid_price', e)"
          />
        </div>
      </div>
    </div>

    <div class="d-none d-md-flex flex-column justify-content-between h-100">
      <div class="duration-section d-flex flex-column mt-2">
        <span class="font-weight-bold mb-2">{{ $t('create_listing.confirm.duration') }}</span>
        <FormDropdown
          :id="'durationSelector-md-'+item.id"
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
        <span class="font-weight-bold">{{ $t('create_listing.confirm.reserve') }}&nbsp;
          <img
            v-b-tooltip.hover
            :src="infoIcon"
            :title="$tc('create_listing.confirm.reserve_info_short')"
            class="icon-info position-absolute mt-n2 mr-n5 scale-2"
          />
        </span>
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
    <!-- Duration Sheet -->
    <vue-bottom-sheet ref="durationSheet">
      <div class="d-flex flex-column h-100 filters-sheet">
        <div class="filters-sheet-title text-center">{{ $t('auction.select_duration') }}</div>
        <div class="flex-shrink-1 overflow-auto filters-sheet-content">
          <div v-for="duration in DURATIONS" :key="duration.value">
            <button class="w-100 border-0 text-left condition-option" @click="handleDurationSelect(duration);closeDurationSheet()">
              <div>{{ duration.value }} {{ $tc('common.day', duration.value) }}</div>
            </button>
          </div>
        </div>
      </div>
    </vue-bottom-sheet>
    <!-- Schedule date Sheet -->
    <vue-bottom-sheet ref="scheduleDateSheet" max-height="70%">
      <div class="d-flex flex-column h-100 filters-sheet">
        <div class="filters-sheet-title text-center">{{ $t('create_listing.product.select_box_condition') }}</div>
        <div class="flex-shrink-1 overflow-auto filters-sheet-content">
          <div class="pt-3 text-center">
            <v-date-picker v-model="tempScheduleDate" :min-date="new Date()" :model-config="{ type: 'string', mask: 'YYYY/MM/DD' }" />
          </div>
          <div class="py-3 d-flex align-items-center justify-content-around">
            <Button
              variant="outline-primary"
              pill
              @click="$refs.scheduleDateSheet.close()"
            >
              {{ $t('create_listing.product.cancel') }}
            </Button>
            <Button
              variant="primary"
              class="px-5"
              pill
              @click="setScheduleDate"
            >
              {{ $t('create_listing.product.next') }}
            </Button>
          </div>
        </div>
      </div>
    </vue-bottom-sheet>
  </div>
</template>

<script>
import Thumb from '~/components/product/Thumb';
import {FormDropdown, FormInput, CheckboxSwitch, Button} from '~/components/common'
import infoIcon from '~/assets/img/icons/info-dark-blue.svg';
import createListingAuction from '~/plugins/mixins/create-listing-auction';

export default {
  name: 'AuctionItem',
  components: { Thumb, FormDropdown, FormInput, CheckboxSwitch, Button},
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
      }),
      tempScheduleDate: null,
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
    },
    openDurationSheet() {
      this.$refs.durationSheet.open()
    },
    closeDurationSheet() {
      this.$refs.durationSheet.close()
    },
    handleStatusSwitch(value) {
      this.$emit('formChange', {...this.item, status: value ? 'scheduled' : 'live' })
      if (value) {
        this.tempScheduleDate = this.item.scheduled_date
        this.$refs.scheduleDateSheet.open()
      }
    },
    setScheduleDate() {
      this.$emit('formChange', {...this.item, scheduled_date: this.tempScheduleDate })
      this.$refs.scheduleDateSheet.close()
    },
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.is-invalid
  border: $color-red-1 2px solid
  border-radius: 100px

  @media (max-width: 576px)
    border-radius: 10px

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
.item::v-deep
  padding: 16px 24px

  @media (max-width: 576px)
    padding: 12px
    box-shadow: 0px 1px 4px rgba($black, 0.25)
    border-radius: 10px
    .more-btn
      top: 0
      right: 0
      z-index: 10
      .btn-link
        padding: 0
    .detail-section
      .col-sm-3
        flex: 3
      .col-sm-9
        flex: 9
        padding-right: 1em
        .product
          &-name
            font-size: 14px
            font-weight: $medium
          &-sku,
          &-size,
          &-color,
          &-condition
            font-weight: $regular
            font-size: 13px
            line-height: 16px
            color: $color-gray-6
    .font-weight-bold
      font-size: 12px
      line-height: 15px
    .full-width-switch
      background: $color-blue-20
      border-radius: 2px
      padding: 6px 12px
      display: flex
      .custom-control
        width: 0
        padding: 0
        visibility: hidden
      & > span
        flex: 1
        font-weight: $normal
        font-size: 15px
        line-height: 18px
        color: $white
        flex: 1
        padding: 4px
        text-align: center
        &.active
          background: $white
          color: $black
          box-shadow: 0px 2px 4px rgba($black, 0.15), 0px 3px 8px rgba($black, 0.15)
          border-radius: 2px
    .duration-section
      .form-dropdown-wrapper
        .btn-dropdown
          border: 1px solid $white-5
          border-radius: 10px
          font-size: 12px
          line-height: 15px
          white-space: nowrap
          padding: 16px 15px 16px 15px
          height: auto
          min-width: 128px
          &.opened
            border-bottom: none
            border-bottom-left-radius: 0
            border-bottom-right-radius: 0
      .search-results
        .popover-body
          & > div
            border: 1px solid $white-5
            font-size: 12px
            line-height: 15px
            &:last-child
              border-bottom-left-radius: 10px
              border-bottom-right-radius: 10px
    .reserve-section
      .form-input-wrapper
        .form-input
          border: 1px solid $white-5
          border-radius: 10px
          font-size: 12px
          line-height: 15px
          white-space: nowrap
          padding: 16px 15px 16px 15px
          height: auto
      
      .checkbox-switch
        .custom-switch
          margin: 0
          padding-left: 55px
          height: 30px
          .custom-control-input ~ .custom-control-label::before
            background: $white-5
            border-radius: 2px
            height: 30px
            width: 55px
            border: none
            top: 0
            left: -55px
          .custom-control-input ~ .custom-control-label::after
            width: 24px
            height: 24px
            background: $white
            box-shadow: 0px 2px 4px rgba($black, 0.15), 0px 3px 8px rgba($black, 0.15)
            border-radius: 2px
            top: 3px
            left: -51px
          .custom-control-input:checked ~ .custom-control-label::before
            background: $color-green-16
          .custom-control-input:checked ~ .custom-control-label::after
            transform: translateX(24px)
    .reserve-info
      font-size: 14px
      line-height: 17px
      font-weight: 400
      .icon-info
        width: 14px
        height: 14px
    .bid-section
      .form-input-wrapper .form-input
        border: 1px solid $white-5
        border-radius: 10px
        font-weight: 600
        font-size: 12px
        line-height: 15px
        height: 50px

    .duration-box-btn
      @include body-9
      border: 1px solid $color-gray-3
      border-radius: 10px
      background: transparent
      padding: 17px 14px
      font-family: $font-montserrat
      font-weight: $medium
      white-space: nowrap
      width: 128px
      &.is-invalid
        border: 2px solid $red-1
      .placeholder
        color: $color-gray-23
      .value
        color: $black
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
