<template>
  <b-container fluid class="container-auction-confirm-details h-100">
    <div class="d-none d-md-flex justify-content-between align-items-center">
      <h2 class="title">{{ $t('create_listing.collection.collection_details') }}</h2>
    </div>
    <!-- Status Box -->
    <div class="d-md-none statusbox">
      <div class="auction-form-label">{{ $t('create_listing.confirm.status') }}*</div>
      <CheckboxSwitch
        class="full-width-switch"
        :labelOff="$t('create_listing.confirm.status_select.live')"
        :labelOn="$t('create_listing.confirm.status_select.scheduled')"
        :value="form.status === 'scheduled'"
        @change="handleStatusSwitch"
      />
      <div v-if="form.status === 'scheduled'" class="schedule-time">
        <span v-if="form.scheduled_date">{{ form.scheduled_date }}</span>
        <span v-else class="text-danger body-5-regular">* {{ $t('create_listing.confirm.schedule_date_required') }}</span>
      </div>
    </div>

    <div>
      <div class="d-flex align-items-start align-items-md-center flex-column flex-md-row auction-form-row">
        <div class="d-md-none auction-form-label">{{ $t('common.collection_name') }}*</div>
        <div class="d-none d-md-block auction-form-label">{{ $t('common.name') }}*</div>
        <div class="auction-form-field">
          <FormInput
            :placeholder="$t('common.collection_name')"
            class=""
            :class="{'is-invalid': errorArray.includes('name')}"
            required
            :pill="false"
            :value="form.name"
            @input="(e) => form.name = e"
          />
        </div>
      </div>
      <div class="d-flex align-items-start align-items-md-center flex-column flex-md-row auction-form-row">
        <div class="auction-form-label">{{ $t('create_listing.confirm.duration') }}</div>
        <div class="d-none d-md-block auction-form-field">
          <FormDropdown
            :id="'durationSelector'"
            :value="form.time_limit"
            :placeholder="$tc('create_listing.confirm.select_duration_placeholder')"
            :items="DURATIONS"
            :icon-arrow-up="arrowUpIcon"
            :icon-arrow-down="arrowDownIcon"
            class="mw-40 duration-selectbox"
            :class="{'is-invalid': errorArray.includes('time_limit')}"
            @select="handleDurationSelect"
          />
        </div>
        <div class="d-md-none w-100">
          <button
            class="text-left duration-box-btn w-100 position-relative d-flex align-items-center"
            :class="{'is-invalid': errorArray.includes('time_limit')}"
            @click="openDurationSheet"
          >
            <span v-if="!form.time_limit" class="placeholder">{{ $t('create_listing.confirm.select_duration_placeholder') }}</span>
            <span v-else class="value">{{ form.time_limit }} {{ $tc('common.day', form.time_limit) }}</span>
            <img src="~/assets/img/icons/arrow-down-gray.svg" class="position-absolute" />
          </button>
        </div>
      </div>

      <div class="d-flex align-items-start align-items-md-center flex-column flex-md-row auction-form-row">
        <div class="d-flex align-items-center auction-form-label">
          <span class="mr-2">{{ $t('create_listing.confirm.reserve') }}*</span>
          <img
            v-b-tooltip.hover
            :src="infoIcon"
            :title="$tc('create_listing.confirm.reserve_info_short')"
            class="icon-info"
          />
        </div>
        <div class="auction-form-field position-relative">
          <div class="d-flex align-items-center reserve-switch">
            <CheckboxSwitch
              :value="!!form.is_reserved"
              @change="form.is_reserved = !form.is_reserved; form.reserve_price = null"
            />
            <FormInput
              :placeholder="$t('create_listing.confirm.reserve_price')"
              class="flex-grow-1 flex-md-grow-0"
              :class="{'is-invalid': errorArray.includes('reserve_price')}"
              :disabled="!form.is_reserved"
              required
              :pill="false"
              number
              type="number"
              :value="form.reserve_price"
              @input="(e) => form.reserve_price = e"
            />
          </div>
          <div v-if="form.is_reserved" class="rounded reserve-info d-flex align-items-start" >
            <img :src="infoIcon" class="icon-info" alt="Info icon" />
            {{ $t('create_listing.confirm.reserve_info_short') }}
          </div>
        </div>
      </div>
      <div class="d-flex align-items-start align-items-md-center flex-column flex-md-row auction-form-row">
        <div class="auction-form-label">{{ $t('create_listing.confirm.starting_bid') }}</div>
        <div class="auction-form-field">
          <FormInput
            :placeholder="$t('create_listing.confirm.enter_starting_bid')"
            class="mw-40 "
            :class="{'is-invalid': errorArray.includes('start_bid_price')}"
            required
            number
            :pill="false"
            :value="form.start_bid_price"
            @input="(e) => form.start_bid_price = e"
          />
        </div>
      </div>
      <div class="d-none d-md-flex align-items-start align-items-md-center flex-column flex-md-row auction-form-row">
        <div class="auction-form-label">{{ $t('create_listing.confirm.status') }}*</div>
        <div class="auction-form-field position-relative">
          <CheckboxSwitch
            class="full-width-switch"
            :value="form.status === 'scheduled'"
            :label-off="$t('create_listing.confirm.status_select.live')"
            :label-on="$t('create_listing.confirm.status_select.scheduled')"
            @change="liveStatusChange"
          />
          <div v-if="form.status === 'scheduled'" class="mt-3 position-absolute">
            <span
              :class="{'is-invalid': errorArray.includes('scheduled_date')}"
            >{{(form.scheduled_date || $tc('create_listing.confirm.date_text'))}}</span>
            <b-form-datepicker
              size="xs"
              class=""
              button-only
              hide-header
              :min="tomorrowDate"
              :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
              locale="en"
              @context="onContext">
              default
            </b-form-datepicker>
          </div>
        </div>
      </div>
      <div class="d-flex align-items-center action-btn-row justify-content-end">
        <Button
          variant="primary"
          class="next-button"
          @click="validateAndNext"
        >
          {{ $t('create_listing.collection.save_next') }}
        </Button>
      </div>
    </div>
    <!-- Schedule date Sheet -->
    <vue-bottom-sheet ref="scheduleDateSheet" max-height="70%">
      <div class="d-flex flex-column h-100 filters-sheet">
        <div class="filters-sheet-title text-center">{{ $t('create_listing.product.select_box_condition') }}</div>
        <div class="flex-shrink-1 overflow-auto filters-sheet-content">
          <div class="pt-3 text-center">
            <v-date-picker v-model="tempScheduleDate" :min-date="tomorrowDate" :model-config="{ type: 'string', mask: 'YYYY/MM/DD' }" />
          </div>
          <div class="py-3 d-flex align-items-center justify-content-around">
            <Button
              variant="outline-primary"
              pill
              class="close-sheet-btn"
              @click="$refs.scheduleDateSheet.close()"
            >
              {{ $t('create_listing.product.cancel') }}
            </Button>
            <Button
              variant="primary"
              class="move-next-btn"
              pill
              @click="setScheduleDate"
            >
              {{ $t('create_listing.product.next') }}
            </Button>
          </div>
        </div>
      </div>
    </vue-bottom-sheet>
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
  </b-container>
</template>

<script>
import _ from 'lodash';
import {mapGetters} from 'vuex';
import {FormDropdown, FormInput, CheckboxSwitch, Button} from '~/components/common'
import infoIcon from '~/assets/img/icons/info-dark-blue.svg';
import createListingAuction from '~/plugins/mixins/create-listing-auction';
import arrowUpIcon from '~/assets/img/icons/arrow-up-black.svg'
import arrowDownIcon from '~/assets/img/icons/arrow-down-black.svg'

export default {
  name: 'ConfirmDetails',
  components: {FormDropdown, FormInput, CheckboxSwitch, Button},
  mixins: [createListingAuction],
  layout: 'Profile',
  data() {
    return {
      errorArray: [],
      infoIcon,
      form: {
        time_limit: null,
        start_bid_price :null,
        status : 'live',
        isLive: true,
        is_reserved : false,
        reserve_price: null,
        scheduled_date : null,
        type : 'collection',
        name : null,
        items: [{
          inventory_id: this.itemProduct?.id,
          quantity: 1
        }]
      },
      DURATIONS: Object.keys(this.$t('create_listing.confirm.select_duration')).map(a => {
        return {
          label: this.$t(`create_listing.confirm.select_duration.${a}`),
          value: a,
        }
      }),
      STATUSES: Object.keys(this.$t('create_listing.confirm.status_select')).map(a => {
        return {
          label: this.$t(`create_listing.confirm.status_select.${a}`),
          value:a,
        }
      }),
      arrowUpIcon,
      arrowDownIcon,
      tempScheduleDate: null,
    }
  },
  computed: {
    ...mapGetters({
      getAuctionItems: 'create-listing/getAuctionItems'
    }),
    selectedAuction(){
      return _.cloneDeep(this.getAuctionItems)
    },
    tomorrowDate() {
      const date = new Date()
      return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    }
  },
  watch: {
    form: {
      deep: true,
      handler(val) {
        this.errorArray = []
        this.$store.commit('create-listing/setSingleAuctionItem', val)
      }
    }
  },
  mounted() {
    this.form = {...this.selectedAuction[0], isLive: true, status: 'live' }
  },
  methods: {
    validateAndNext(){
      this.errorArray= this.validateAuctions(this.selectedAuction)[this.selectedAuction[0].id] || []
      if (_.isEmpty(this.errorArray)){
        this.$store.commit('create-listing/setCollectionState', 'confirm')
        this.$router.push({path: '/create-listing/confirm/collection'})
      }
    },
    liveStatusChange(){
      this.form.isLive = !this.form.isLive;
      this.form.status = this.form.isLive? 'live' : 'scheduled'
      if (!this.form.isLive)
        this.form.scheduled_date = null

    },
    handleDurationSelect(item) {
      this.form.time_limit = item.value
    },
    onContext(ctx) {
      if (ctx.selectedFormatted!=='No date selected'){
        this.form.scheduled_date = ctx.selectedFormatted;
      }
    },
    handleStatusSwitch(value) {
      this.showError = false
      this.form = {
        ...this.form,
        isLive: !value,
        status: value ? 'scheduled' : 'live',
      }
      if (value) {
        this.tempScheduleDate = this.form.scheduled_date
        this.$refs.scheduleDateSheet.open()
      }
    },
    setScheduleDate() {
      this.showError = false
      this.form = {
        ...this.form,
        scheduled_date: this.tempScheduleDate
      }
      this.$refs.scheduleDateSheet.close()
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

.is-invalid
  border: $color-red-1 2px solid
  border-radius: 5px
  @media (max-width: 576px)
    border-radius: 10px

.container-auction-confirm-details
  padding: 36px 60px
  background-color: $color-white-5

  h2.title
    font-family: $font-sp-pro
    font-weight: $bold
    @include body-1
    color: $black
    margin-bottom: 75px
  
  .auction-form-label
    font-family: $font-sp-pro
    font-weight: $medium
    @include body-12
    color: $black
    width: 200px

  .auction-form-row
    margin-bottom: 67px
    @media (max-width: 576px)
      margin-top: 25px
      margin-bottom: 0

  .auction-form-field
    width: 470px
    .reserve-info
      width: 470px
      left: 0
      top: 45px
      position: absolute
      padding: 4px 10px
      font-family: $font-sp-pro
      font-weight: $regular
      @include body-5
      color: $black
      img
        margin-top: 2px
        margin-right: 8px
  .form-input-wrapper::v-deep
    .form-input
      border: 1px solid $color-blue-20
      border-radius: 4px
      font-family: $font-sp-pro
      font-weight: $regular
      @include body-8
      height: 40px
    &.is-invalid
      .form-input
        border: none
  .form-dropdown-wrapper::v-deep
    width: 225px
    &.is-invalid
      .btn-dropdown
        border: none
    .search-results
      .popover-body 
        & > div
          border: 1px solid $color-blue-20
          border-top: none
        .dropdownItem
          border-top: 1px solid $color-blue-20
  
  .reserve-switch
    .checkbox-switch::v-deep
      margin-right: 20px
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
  .full-width-switch::v-deep
    background: $color-blue-20
    border-radius: 2px
    padding: 6px 12px
    display: flex
    .custom-control
      width: 0
      padding: 0
      visibility: hidden
    & > span
      @include body-8
      font-weight: $normal
      color: $white
      flex: 1
      padding: 4px
      text-align: center
      &.active
        background: $white
        color: $black
        box-shadow: 0px 2px 4px rgba($black, 0.15), 0px 3px 8px rgba($black, 0.15)
        border-radius: 2px

  @media (max-width: 576px)
    padding: 20px 16px
    background: transparent
    .auction-form-label
      @include body-9
      font-family: $font-montserrat
      margin-bottom: 8px
    .auction-form-field
      width: 100%
      .reserve-info
        width: 100%
        margin-top: 4px
        position: relative
    .form-dropdown-wrapper::v-deep
      .btn-dropdown
        @include body-9
        border: 1px solid $white-5
        border-radius: 10px
        padding: 17px 14px
        font-weight: $normal
        height: auto
    .form-input-wrapper::v-deep
      .form-input
        @include body-9
        font-weight: $medium
        padding: 17px 14px
        height: auto
        border-radius: 10px
        border: 1px solid $white-5
    .reserve-switch
      .checkbox-switch::v-deep
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

    .next-button.btn
      @include body-21
      background-color: $color-blue-20
      border-color: $color-blue-20
      padding: 12px 40px
      width: 100%
      height: auto
.next-button.btn
  @include body-8
  font-weight: $medium
  background-color: $black
  border-color: $black
  width: 200px
  height: 38px
  padding: 0
  font-family: $font-sp-pro
  border-radius: 4px
.reserve-info
  @include body-5-regular
  background-color: $color-blue-10

.form-dropdown-wrapper::v-deep
  .btn-dropdown
    border: 1px solid $color-blue-20
    border-radius: 4px
    @include body-13
    white-space: nowrap
    padding: 10px 15px 9px
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

.duration-box-btn
  @include body-9
  border: 1px solid $color-gray-3
  border-radius: 10px
  background: transparent
  padding: 17px 14px
  font-family: $font-montserrat
  font-weight: $medium
  &.is-invalid
    border: 2px solid $red-1
  .placeholder
    color: $color-gray-23
  .value
    color: $black
  img
    top: 22px
    right: 14px
    width: 10px

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
.action-btn-row
  width: 670px
  @media (max-width: 576px)
    width: 100%
    margin-top: 70px

.move-next-btn.btn
  width: 162px
  height: 40px
  background: $color-blue-20
  border-color: $color-blue-20
.close-sheet-btn.btn
  width: 162px
  height: 40px
  color: $color-blue-20
  border-color: $color-blue-20
</style>
