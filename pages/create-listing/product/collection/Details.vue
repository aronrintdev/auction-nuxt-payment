<template>
  <b-container fluid class="container-auction-confirm-details h-100">
    <div class="d-none d-md-flex justify-content-between align-items-center">
      <h2 class="title">{{ $t('create_listing.collection.collection_details') }}</h2>
      <FormStepper :steps="steps" :selected="getCollectionState"/>
    </div>
    <!-- Status Box -->
    <div class="d-md-none mb-4 statusbox">
      <div class="font-weight-bold mb-2">{{ $t('create_listing.confirm.status') }}*</div>
      <CheckboxSwitch
        class="full-width-switch"
        :labelOff="$t('create_listing.confirm.status_select.live')"
        :labelOn="$t('create_listing.confirm.status_select.scheduled')"
        :value="form.status === 'scheduled'"
        @change="handleStatusSwitch"
      />
      <div v-if="form.status === 'scheduled'" class="schedule-time mt-2">
        <span v-if="form.scheduled_date">{{ form.scheduled_date }}</span>
        <span v-else class="text-danger body-5-regular">* {{ $t('create_listing.confirm.schedule_date_required') }}</span>
      </div>
    </div>

    <div class="d-flex flex-column justify-content-around h-50">
      <b-row  class="mt-md-0">
        <b-col cols="12" sm="12" md="2">
          <span class="font-weight-bold ">{{ $t('common.name') }}*</span>
        </b-col>
        <b-col cols="12" sm="12" md="3">
          <FormInput
            :placeholder="$t('common.collection_name')"
            class=""
            :class="{'is-invalid': errorArray.includes('name')}"
            required
            :pill="false"
            :value="form.name"
            @input="(e) => form.name = e"
          />
        </b-col>
      </b-row>
      <b-row class="mt-4 mt-md-0">
        <b-col cols="12" sm="12" md="2">
          <span class="font-weight-bold">{{ $t('create_listing.confirm.duration') }}</span>
        </b-col>
        <b-col class="d-none d-md-block" cols="12" sm="12" md="3">
          <FormDropdown
            :id="'durationSelector'"
            :value="form.time_limit"
            :placeholder="$tc('create_listing.confirm.select_duration_placeholder')"
            :items="DURATIONS"
            :icon-arrow-up="arrowUpIcon"
            :icon-arrow-down="arrowDownIcon"
            class="mb-3 mw-40"
            :class="{'is-invalid': errorArray.includes('time_limit')}"
            no-arrow
            @select="handleDurationSelect"
          />
        </b-col>
        <b-col class="d-md-none" cols="12">
          <button
            class="text-left duration-box-btn w-100 position-relative d-flex align-items-center"
            :class="{'is-invalid': errorArray.includes('time_limit')}"
            @click="openDurationSheet"
          >
            <span v-if="!form.time_limit" class="placeholder">{{ $t('create_listing.confirm.select_duration_placeholder') }}</span>
            <span v-else class="value">{{ form.time_limit }} {{ $tc('common.day', form.time_limit) }}</span>
            <img src="~/assets/img/icons/arrow-down-gray.svg" class="position-absolute" />
          </button>
        </b-col>
      </b-row>
      <b-row class="mt-4 mt-md-0">

        <b-col cols="12" sm="12" md="2">
          <span class="font-weight-bold">{{ $t('create_listing.confirm.reserve') }} <img :src="infoIcon" class="icon-info mt-n1 ml-1" alt="Info icon" /></span>
        </b-col>
        <b-col cols="12" sm="12" md="10">
          <div class="d-flex align-items-center reserve-switch">
            <CheckboxSwitch
              class="mr-2"
              :value="!!form.is_reserved"
              @change="reserveChanged"
            />
            <FormInput
              :placeholder="$t('create_listing.confirm.reserve_price')"
              class="flex-grow-1"
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
        </b-col>
        <div v-if="form.is_reserved" class="p-2 mt-3 mt-md-5 mx-2 rounded reserve-info d-flex align-items-start" >
          <img :src="infoIcon" class="icon-info scale-2 mt-1 mr-2" alt="Info icon" />
          {{ $t('create_listing.confirm.reserve_info_short') }}
        </div>
      </b-row>
      <b-row class="mt-4">
        <b-col cols="12" sm="12" md="2">
          <span class="font-weight-bold">{{ $t('create_listing.confirm.starting_bid') }}</span>
        </b-col>
        <b-col cols="12" sm="12" md="3">
          <FormInput
            v-model="form.start_bid_price"
            :placeholder="$t('create_listing.confirm.enter_starting_bid')"
            class="mw-40 "
            :class="{'is-invalid': errorArray.includes('start_bid_price')}"
            required
            number
            :pill="false"
          />
        </b-col>
      </b-row>
      <b-row class="d-none d-md-flex mt-4">
        <b-col cols="12" sm="12" md="2">
          <span class="font-weight-bold">{{ $t('create_listing.confirm.status') }}</span>
        </b-col>
        <b-col cols="12" sm="12" md="2">
          <CheckboxSwitch
            class="full-width-switch"
            :value="form.isLive"
            :label-off="$t('create_listing.confirm.status_select.scheduled')"
            :label-on="$t('create_listing.confirm.status_select.live')"
            @change="liveStatusChange"
          />
        </b-col>
        <b-col v-if="!form.isLive"  class="mt-4">
          <span
            class="ml-2"
            :class="{'is-invalid': errorArray.includes('scheduled_date')}"
          >{{(form.scheduled_date || $tc('create_listing.confirm.date_text'))}}</span>
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
        </b-col>
      </b-row>
      <b-row class="justify-content-center pt-5 pb-4">
        <Button
          variant="primary"
          pill
          class="next-button"
          @click="validateAndNext"
        >{{ $t('create_listing.collection.save_next') }}</Button
        >
      </b-row>
    </div>
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
import FormStepper from '~/components/createListing/FormStepper';
import arrowUpIcon from '~/assets/img/icons/arrow-up-blue.svg'
import arrowDownIcon from '~/assets/img/icons/arrow-down-blue.svg'

export default {
  name: 'NoInventoryCollectionDetails',
  components: {
    FormDropdown,
    FormInput,
    CheckboxSwitch,
    Button,
    FormStepper,
  },

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
        name : null,
      },
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
      arrowUpIcon,
      arrowDownIcon,
      tempScheduleDate: null,
    }
  },
  computed:{
    ...mapGetters({
      collectionAuction: 'create-listing/getNonInventoryCollectionAuction',
    }),
  },
  watch: {
    form: {
      deep: true,
      handler() {
        this.errorArray = []
      }
    }
  },
  mounted() {
    this.form = {...this.form, ...this.collectionAuction}
  },
  methods: {
    validateAndNext(){
      this.errorArray= this.validateAuctions()
      if (_.isEmpty(this.errorArray)){
        this.$store.commit('create-listing/setCollectionState', 'confirm')
        this.$store.commit('create-listing/setNonInventoryCollectionAuction', {
          ...this.collectionAuction,
          ...this.form,
          type : 'collection',
        })
        this.$router.push({path: '/create-listing/product/collection/create'})
      }
    },
    validateAuctions() {
      const errors = []
      _.keys(this.form).forEach(key => {
        if (key === 'reserve_price') {
          if (!this.form.reserve_price && this.form.is_reserved) {
            errors.push('reserve_price')
          }
        } else if (key === 'start_bid_price') {
          if (this.form.start_bid_price === null) {
            errors.push('start_bid_price')
          } else if (this.form.start_bid_price < 50) {
            errors.push('start_bid_price')
          }
        } else if (key === 'scheduled_date') {
          if (!this.form.scheduled_date && this.form.status === 'scheduled') {
            errors.push('scheduled_date')
          }
        } else if (this.form[key] === null) {
          errors.push(key)
        }
      })
      return errors
    },
    liveStatusChange(){
      this.form = {
        ...this.form,
        isLive: !this.form.isLive,
        status: !this.form.isLive? 'live' : 'scheduled',
        scheduled_date: null,
      }
    },
    handleDurationSelect(item) {
      this.form = {
        ...this.form,
        time_limit: item.value,
      }
    },
    reserveChanged() {
      this.form = {
        ...this.form,
        is_reserved: !this.form.is_reserved,
        reserve_price: null,
      }
    },
    onContext(ctx) {
      if (ctx.selectedFormatted!=='No date selected') {
        this.form = {
          ...this.form,
          scheduled_date: ctx.selectedFormatted,
        }
      }
    },
    handleStatusSwitch(value) {
      this.showError = false
      this.form = {
        ...this.form,
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
  border-radius: 100px
  @media (max-width: 576px)
    border-radius: 10px
.container-auction-confirm-details
  padding: 47px 54px
  background-color: $color-white-5

  h2.title
    @include heading-3
    color: $color-black-1


  @media (max-width: 576px)
    padding: 20px 16px
    background: transparent
    .font-weight-bold
      @include body-9
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
    .next-button.btn
      @include body-21
      background-color: $color-blue-20
      border-color: $color-blue-20
      padding: 12px 40px
      height: auto

.reserve-info
  @include body-5-regular
  background-color: $color-blue-10

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
</style>
