<template>
  <b-container fluid class="container-auction-confirm-details h-100">
    <div class="d-none d-md-flex justify-content-between align-items-center">
      <h2 class="title">{{ $t('create_listing.collection.collection_details') }}</h2>
      <FormStepper :steps="steps" :selected="getCollectionState"/>

    </div>
    <div class="d-flex flex-column justify-content-around h-50">
      <b-row class="mt-md-0">
        <b-col cols="12" sm="12" md="2">
          <span class="font-weight-bold">{{ $t('common.collection_name') }}*</span>
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
        <b-col cols="12" sm="12" md="3">
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
      </b-row>
      <b-row>
        <b-col cols="12" sm="12" md="2">
          <span class="font-weight-bold">{{ $t('create_listing.confirm.reserve') }} <img :src="infoIcon" class="icon-info mt-n1 ml-1" alt="Info icon" /></span>
        </b-col>
        <b-col cols="12" sm="12" md="10">
          <div class="d-flex align-items-center reserve-switch">
            <CheckboxSwitch
              class="mr-2"
              :value="form.is_reserved"
              @change="form.is_reserved = !form.is_reserved; form.reserve_price = null"
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
        <div v-if="form.is_reserved" class="p-2 mt-3 mt-md-5 ml-2 rounded reserve-info d-flex align-items-start" >
          <img :src="infoIcon" class="icon-info scale-2 mt-1 mr-2" alt="Info icon" />
          {{ $tc('create_listing.confirm.reserve_text_info', 1) }} ${{calculateFee(form.reserve_price).toFixed(2)}} {{ $tc('create_listing.confirm.reserve_text_info', 2) }}
        </div>
      </b-row>
      <b-row class="mt-4">
        <b-col cols="12" sm="12" md="2">
          <span class="font-weight-bold">{{ $t('create_listing.confirm.starting_bid') }}</span>
        </b-col>
        <b-col cols="12" sm="12" md="3">
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
        </b-col>
      </b-row>
      <b-row class="mt-4">
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
        >{{ $t('create_listing.collection.save_next') }}</Button>
      </b-row>
    </div>

  </b-container>
</template>

<script>
import _ from 'lodash';
import {mapGetters} from 'vuex';
import {FormDropdown, FormInput, CheckboxSwitch, Button} from '~/components/common'
import infoIcon from '~/assets/img/icons/info-blue.svg';
import createListingAuction from '~/plugins/mixins/create-listing-auction';
import FormStepper from '~/components/createListing/FormStepper';
import arrowUpIcon from '~/assets/img/icons/arrow-up-blue.svg'
import arrowDownIcon from '~/assets/img/icons/arrow-down-blue.svg'

export default {
  name: 'ConfirmDetails',
  components: {FormDropdown, FormInput, CheckboxSwitch, Button, FormStepper},
  mixins: [createListingAuction],
  layout: 'Profile',
  data() {
    return {
      errorArray: [],
      infoIcon,
      form: {
        time_limit: null,
        start_bid_price :null,
        status : 'scheduled',
        isLive: false,
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
    }
  },
  computed: {
    ...mapGetters({
      getAuctionItems: 'create-listing/getAuctionItems'
    }),
    selectedAuction(){
      return _.cloneDeep(this.getAuctionItems)
    },
  },
  watch: {
    form: {
      deep: true,
      handler(val) {
        this.$store.commit('create-listing/setSingleAuctionItem', val)
      }
    }
  },
  mounted() {
    this.form = {...this.selectedAuction[0], isLive: this.form.isLive}
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
    }
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
      font-size: 12px
      line-height: 15px
    .form-dropdown-wrapper::v-deep
      .btn-dropdown
        border: 1px solid $white-5
        border-radius: 10px
        font-size: 12px
        line-height: 15px
        padding: 17px 14px
        font-weight: $normal
        height: auto
    .form-input-wrapper::v-deep
      .form-input
        font-weight: $medium
        font-size: 12px
        line-height: 15px
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
    .next-button.btn
      background-color: $color-blue-20
      border-color: $color-blue-20
      font-size: 13px
      line-height: 16px
      padding: 12px 40px
      height: auto
.reserve-info
  @include body-5-bold
  background-color: $color-blue-10
</style>
