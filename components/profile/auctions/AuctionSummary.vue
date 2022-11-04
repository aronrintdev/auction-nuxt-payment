<template>
  <div v-if="auction" class="mt-3 p-3 px-md-5 py-md-4 ml-n1 w-100 bg-white card-summary">
    <b-row>
      <b-col sm="11">
        <div class="d-flex flex-column card-summary-header">
          <b-row>
            <b-col cols="8" md="3" class="body-4-bold">
              {{ $t('auction.auction_id') }} #{{ auction.id }}
            </b-col>
            <b-col cols="4" md="3" class="text-right text-md-left">
              <span v-if="auction.status === LIVE_STATUS" class="text-success body-4-medium">&bull; {{
                  $t('auction.live')
                }}</span>
              <span v-if="auction.status === SCHEDULED_STATUS"
                    class="text-gray-24 body-4-medium">&bull; {{ $t('auction.scheduled') }}</span>
            </b-col>
            <b-col v-if="auction.status === LIVE_STATUS" cols="12" md="6" class="text-danger body-4-medium">
              {{$t('auction.time_remaining')}}&colon;
              {{
                auction.remaining_time
              }}
            </b-col>
          </b-row>
        </div>

        <div class="mt-3 d-md-none">
          <div class="mb-1 d-flex d-md-none justify-content-between">
            <span v-if="isScheduled" class="field-label">{{ $t('auction.scheduled') }}</span>
            <span v-else class="field-label">{{ $t('auction.listed_on') }}</span>
            <span v-if="isScheduled" class="field-value">{{ formattedDate(auction.scheduled_date) }}</span>
            <span v-else class="field-value">{{ formattedDate(auction.listed_at) }}</span>
          </div>
          <div class="mb-1 d-flex d-md-none justify-content-between">
            <span v-if="isScheduled" class="field-label">{{ $t('auction.duration') }}</span>
            <span v-else class="field-label">{{ $t('auction.expires_on') }}</span>
            <span v-if="isScheduled" class="field-value">{{ auction.remaining_time }}</span>
            <span v-else class="field-value">{{ formattedDate(auction.end_date) }}</span>
          </div>
          <div class="mb-1 d-flex d-md-none justify-content-between">
            <span class="field-label">{{ $t('auction.auction_type') }}</span>
            <span class="field-value">{{ $t('auction.auction_types.' + auction.type) }}</span>
          </div>
          <div class="mb-1 d-flex d-md-none justify-content-between">
            <span class="field-label">{{ $t('auction.reserve_price') }}</span>
            <div class="field-value">
              <div class="d-flex">
                <div class="d-flex" :class="hasReserveError? 'error-border': ''">
                  <span v-if="auction.is_reserved" class="mt-1">
                    &dollar;
                </span>
                  <input
                    v-if="auction.is_reserved"
                    :value="auctionReserveValue"
                    type="number"
                    class="py-1"
                    :class="editReserve? 'custom-reserve-input' : 'non-edit border-0'"
                    :readonly="!editReserve"
                    @input="reserveChange"
                  >
                  <span v-else>
                    {{auctionReserveValue}}
                  </span>
                </div>

                <Button
                  v-if="auction.is_reserved && moreThan12"
                  variant="link"
                  class=" ml-3"
                  :class="editReserve? 'btn-send': 'btn-edit-inventory'"
                  :tooltip-text="$t('common.edit')"
                  @click="editReserveAction"
                ></Button>
                <Button
                  v-if="auction.is_reserved && editReserve"
                  variant="link"
                  class="btn-revert ml-3"
                  :tooltip-text="$t('common.revert')"
                  @click="editReserveReverse"
                ></Button>
              </div>
              <div v-if="hasReserveError" class="mt-1 reserve-error position-absolute mt-4 pt-2">
                {{$t('auction.reserve_error')}}
              </div>
              <div v-if="editReserve" class="mt-4 remove-button" role="button" @click="removeReserve">
                {{$t('auction.remove_reserve')}}
              </div>
            </div>
          </div>
          <div class="mb-1 d-flex d-md-none justify-content-between">
            <span class="field-label">{{ $t('auction.starting_bid') }}</span>
            <span class="field-value">${{ auction.start_bid_price | formatPrice }}</span>
          </div>
        </div>

        <b-row class="d-none d-md-flex mt-3 mx-5 body-4-medium text-gray-25">
          <b-col sm="2">
            <span v-if="isScheduled">{{ $t('auction.scheduled') }}</span>
            <span v-else>{{ $t('auction.listed_on') }}</span>
          </b-col>
          <b-col sm="2">
            <span v-if="isScheduled">{{ $t('auction.duration') }}</span>
            <span v-else>{{ $t('auction.expires_on') }}</span>
          </b-col>
          <b-col sm="2">
            {{ $t('auction.auction_type') }}
          </b-col>
          <b-col sm="2">
            {{ $t('auction.reserve_price') }}
          </b-col>
          <b-col sm="2">
            {{ $t('auction.starting_bid') }}
          </b-col>
          <b-col sm="2">
          </b-col>
        </b-row>

        <b-row class="d-none d-md-flex mt-3 mx-5 body-4-normal">
          <b-col sm="2">
            <span v-if="isScheduled"> {{
                formattedDate(auction.scheduled_date)
              }}</span>
            <span v-else> {{
                formattedDate(auction.listed_at)
              }}</span>
          </b-col>
          <b-col sm="2">
            <span v-if="isScheduled">{{ auction.remaining_time }}</span>
            <span v-else>  {{
                formattedDate(auction.end_date)
              }}</span>

          </b-col>
          <b-col sm="2">
            {{ $t('auction.auction_types.' + auction.type) }}
          </b-col>
          <b-col sm="2" class="d-flex flex-column">
            <div class="d-flex">
              <div class="d-flex" :class="hasReserveError? 'error-border': ''">
                <span v-if="auction.is_reserved" class="mt-1">
                  &dollar;
               </span>
                <input
                  v-if="auction.is_reserved"
                  :value="auctionReserveValue"
                  type="number"
                  class="py-1"
                  :class="editReserve? 'custom-reserve-input' : 'non-edit border-0'"
                  :readonly="!editReserve"
                  @input="reserveChange"
                >
                <span v-else>
                  {{auctionReserveValue}}
                </span>
              </div>

              <Button
                v-if="auction.is_reserved && moreThan12"
                variant="link"
                class=" ml-3"
                :class="editReserve? 'btn-send': 'btn-edit-inventory'"
                :tooltip-text="$t('common.edit')"
                @click="editReserveAction"
              ></Button>
              <Button
                v-if="auction.is_reserved && editReserve"
                variant="link"
                class="btn-revert ml-3"
                :tooltip-text="$t('common.revert')"
                @click="editReserveReverse"
              ></Button>
            </div>
            <div v-if="hasReserveError" class="mt-1 reserve-error position-absolute mt-4 pt-2">
               {{$t('auction.reserve_error')}}
            </div>
            <div v-if="editReserve" class="mt-4 remove-button" role="button" @click="removeReserve">
              {{$t('auction.remove_reserve')}}
            </div>
          </b-col>
          <b-col sm="2">
            &dollar;
            {{
              auction.start_bid_price | formatPrice
            }}
          </b-col>
          <b-col sm="2">
          </b-col>
        </b-row>

        <div>
          <AuctionSummarySingleItem v-if="auction.type === AUCTION_TYPE_SINGLE" :auctionItem="getProducts"/>
          <AuctionSummaryCollection v-if="auction.type === AUCTION_TYPE_COLLECTION" :products="getProducts"/>
        </div>
      </b-col>
      <b-col sm="1" class="mt-3 mt-md-0 d-flex flex-row justify-content-between flex-md-column align-items-center">
        <Button
          v-if="moreThan12 && !isDelistedOrExpired"
          class="bg-blue-2"
          pill
          @click="delistAuction"
        >
          {{ $t('auction.delist') }}
        </Button>
        <Button
          v-if="isDelistedOrExpired"
          variant="primary"
          class="bg-blue-2"
          pill
          @click="relistAuction"
        >{{ $t('auction.relist') }}
        </Button
        >
        <div
          v-if="reserveMet && moreThan12 && bidCount===0"
          role="button"
          class="modify-button"
          @click="$emit('modify')"
        >
          {{ $t('auction.modify_listing') }}
        </div>
      </b-col>
    </b-row>


    <Modal
      id="delist-item-modal"
      centered
      no-header-border
      no-footer-border
      hide-footer
    >
      <template #default>
        <div class="px-5">
          <b-row class="mb-4">
            <b-col md="12">
              {{delistRelistText}}
            </b-col>
          </b-row>
          <b-row class="d-flex justify-content-around">
            <Button
              variant="primary"
              class="bg-blue-2"
              :disabled="isModalActionLoading"
              pill
              @click="delistModalOK"
            >{{isModalActionDelist?$t('auction.delist'): $t('auction.relist') }}
            </Button>
            <Button
              v-if="isModalActionDelist"
              variant="outline-dark"
              pill
              :disabled="isModalActionLoading"
              @click="$bvModal.hide('delist-item-modal')">{{ $t('common.cancel') }}
            </Button>
            <Button
              v-else
              variant="outline-dark"
              pill
              :disabled="isModalActionLoading"
              @click="editSingle">{{ $t('common.edit') }}
            </Button>
          </b-row>
        </div>

      </template>
    </Modal>

<!--   General Reserve Change Modal-->
    <Modal
      id="general-reserve-modal"
      centered
      no-header-border
      no-footer-border
      hide-footer
    >
      <template #default>
        <div class="px-5">
          <b-row class="mb-4">
            <b-col md="12">
              {{modalBodyText}}
            </b-col>
          </b-row>
          <b-row class="d-flex justify-content-around">
            <Button
              variant="primary"
              class="bg-blue-2"
              pill
              :disabled="isModalActionLoading"
              @click="generalModalOk"
            >{{ $t('auction.modal_reserve_ok.continue') }}
            </Button>

            <Button
              variant="outline-dark"
              pill
              :disabled="isModalActionLoading"
              @click="$bvModal.hide('general-reserve-modal')">{{ $t('common.cancel') }}
            </Button
            >
          </b-row>
        </div>

      </template>
    </Modal>


    <Modal
      id="success-modal"
      centered
      no-header-border
      no-footer-border
      hide-footer
    >
      <template  #default>
        <div class="px-5">
          <b-row class="mb-4">
            <b-col md="12" >
              {{successModalText}}
            </b-col>
          </b-row>
          <b-row class="d-flex justify-content-around">
            <Button
              iconOnly
              variant="primary"
              pill
            >
              <img :src="whiteCheck" alt="success check"/>
            </Button>
          </b-row>
        </div>

      </template>
    </Modal>

  </div>
</template>

<script>
import {mapActions} from 'vuex';
import {Button, Modal} from '~/components/common';
import AuctionSummarySingleItem from '~/components/profile/auctions/AuctionSummarySingleItem';
import AuctionSummaryCollection from '~/components/profile/auctions/AuctionSummaryCollection';
import {
  BODY_DELISTED_DONE,
  BODY_LOWER_UNDER_HIGHEST,
  BODY_NOT_LOWER_UNDER_HIGHEST, BODY_RELIST_EDIT,
  BODY_REMOVE, BODY_SUCCESS, DELISTED_STATUS, EXPIRED_STATUS,
  AUCTION_TYPE_SINGLE, AUCTION_TYPE_COLLECTION, LIVE_STATUS, SCHEDULED_STATUS
} from '~/static/constants';
import whiteCheck from '~/assets/img/icons/white-check.svg'

export default {
  name: 'AuctionSummary',
  components: {AuctionSummaryCollection, AuctionSummarySingleItem, Button, Modal},
  props: {
    auction: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      AUCTION_TYPE_COLLECTION,
      AUCTION_TYPE_SINGLE,
      SCHEDULED_STATUS,
      LIVE_STATUS,
      whiteCheck,
      hasReserveError: false,
      editReserve: false,
      newReserve: null,
      oldReserve: null,
      reserveType: BODY_REMOVE,
      isModalActionLoading: false,
      isModalActionDelist: true,
      successModalType: BODY_DELISTED_DONE
    }
  },
  computed: {
    /**
     * Using the vue-i18n plugin to translate the text in the modal body.
     * @return {VueI18n.TranslateResult}
     */
    modalBodyText(){
      return this.$t('auction.modal_bodies.' + this.reserveType)
    },
    /**
     *  computed property that returns a string based on the value of the successModalType property.
     * @return {VueI18n.TranslateResult}
     */
    successModalText(){
      return this.$t('auction.modal_bodies.' + this.successModalType)
    },
    /**
     * A method that returns a string based on modal action type.
     * @return {string|VueI18n.TranslateResult}
     */
    delistRelistText(){
      return this.isModalActionDelist?
        this.$tc('auction.delist_body', 1) + '\n' +
        this.$tc('auction.delist_body', 2) : this.$t('auction.modal_bodies.'+BODY_RELIST_EDIT)
    },
    /**
     *  Checking if the auction type is a collection, if it is, it returns the first item in the collection. If it is not,
     *  it returns the entire collection.
     * @return {*|[*]}
     */
    getProducts() {
      return this.auction.type === this.AUCTION_TYPE_SINGLE ? this.auction.auction_items[0] : this.auction.auction_items
    },
    bidCount() {
      return this.auction.bids.length
    },
    /**
     * Checking if the auction is delisted or expired.
     * @return {boolean}
     */
    isDelistedOrExpired() {
      return this.auction.status === DELISTED_STATUS || this.auction.status === EXPIRED_STATUS
    },
    /**
     * A method that returns true if the remaining_hrs is greater than 12.
     * @return {boolean}
     */
    moreThan12() {
      return this.auction.remaining_hrs>12
    },
    /**
     * Checking if the auction is reserved and if it is, it is checking if the reserve price is less than the highest bid.
     * @return {boolean}
     */
    reserveMet() {
      return this.auction.is_reserved ? this.auction.reserve_price / 100 <= this.auction.highest_bid / 100 : true
    },
    isScheduled() {
      return this.auction.status === SCHEDULED_STATUS
    },
    /**
     * A computed property that is used to display the reserve price of an auction.
     * @return {VueI18n.TranslateResult|number}
     */
    auctionReserveValue() {
      return !this.auction.is_reserved ? this.$t('auction.no_reserve') : (this.auction.reserve_price / 100)
    }
  },
  methods: {
    ...mapActions({
      changeAuctionStatus: 'profile-auction/changeAuctionStatus',
      removeReservePrice: 'profile-auction/removeReservePrice',
      editReservePrice: 'profile-auction/editReservePrice',
    }),
    reserveChange(val){
      this.newReserve = val.target.value
    },
    editSingle(){
    //  TODO add edit redirect after create listing merge
    },
    /**
     * method that is called when the user clicks on the OK button in the modal.
     */
    delistModalOK() {
      this.isModalActionLoading = true
      const payload = {
        status: this.isModalActionDelist? DELISTED_STATUS : LIVE_STATUS,
        id: this.auction.id
      }
      this.changeAuctionStatus(payload).then(res => {
        this.$bvModal.hide('delist-item-modal')
        this.successModalType = this.isModalActionDelist? BODY_DELISTED_DONE: BODY_SUCCESS
        this.$bvModal.show('success-modal')
      }).catch(err => {
        this.$toasted.error(err.message || err.data.error)
      }).finally(()=> {
        this.isModalActionLoading = false
      })
      this.$emit('update-auction')

    },
    /**
     * method that is called when the user clicks the "OK" button in the modal.
     * This modal is generic modal that changes actions and description based on show function
     * Code checks reserveType and proceeds flow upon that type.
     */
    generalModalOk(){
      const payload = {
        id: this.auction.id,
        price: this.newReserve * 100
      }
      this.isModalActionLoading = true
      if (this.reserveType === BODY_REMOVE){
        this.removeReservePrice(payload).then(res => {
          this.$bvModal.hide('delist-item-modal')
          this.successModalType = BODY_SUCCESS
          this.$bvModal.show('success-modal')
        }).catch(err => {
          this.$toasted.error(err.message || err.data.error)
        }).finally(() => {
          this.isModalActionLoading = false
          this.editReserve = false
        })
      }else if(this.reserveType === BODY_NOT_LOWER_UNDER_HIGHEST || this.reserveType === BODY_LOWER_UNDER_HIGHEST){
        this.editReservePrice(payload).then(res => {
          this.$bvModal.hide('delist-item-modal')
          this.successModalType = BODY_SUCCESS
          this.$bvModal.show('success-modal')
        }).catch(err => {
          this.$toasted.error(err.message || err.data.error)
        }).finally(() => {
          this.isModalActionLoading = false
          this.editReserve = false
        })
      }
      this.$emit('update-auction')
    },
    /**
     * method that is called when the user clicks the cancel button on the edit form. It sets the editReserve variable to
     * false, which hides the form. It then sets the newReserve variable to the oldReserve variable, which is the original
     * data. It then sets the hasReserveError variable to false, which hides the error message.
     */
    editReserveReverse() {
      this.editReserve = false
      this.newReserve = this.oldReserve
      this.hasReserveError = false
    },
    /**
     *  If editReserve is false it sets it and shows form with old data
     *  Showing a error if the reserve is not met.
     *  if met it sets reserve action type and shows modal according to that.
     */
    editReserveAction() {
      if (!this.editReserve){
        this.oldReserve = this.auctionReserveValue
        this.newReserve = this.oldReserve
        this.editReserve = true
        return null
      }else{
        if (!this.reserveMet)
        {
          this.hasReserveError = true
          return null
        }
        this.hasReserveError = false
        if (this.newReserve*100 > this.auction.highest_bid){
          this.reserveType = BODY_NOT_LOWER_UNDER_HIGHEST
        }else{
          this.reserveType = BODY_LOWER_UNDER_HIGHEST
        }
        this.$bvModal.show('general-reserve-modal')
      }
    },
    /**
     * Calling the generic modal to show the remove reserve modal.
     */
    removeReserve() {
      this.reserveType = BODY_REMOVE
      this.$bvModal.show('general-reserve-modal')
    },
    /**
     * set modal action to delist Showing a modal.
     */
    delistAuction() {
      this.isModalActionDelist = true
      this.$bvModal.show('delist-item-modal')
    },
    /**
     * set modal action to relist Showing a modal.
     */
    relistAuction() {
      this.isModalActionDelist = false
      this.$bvModal.show('delist-item-modal')
    },
    /**
     * The code is formatting the date to a more readable format.
     * @param dateString
     * @return {string}
     */
    formattedDate(dateString) {
      const options = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
      return new Date(dateString).toLocaleDateString('en-US', options)
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.remove-button
  text-decoration: underline
  color: $color-blue-2

.reserve-error
  color: $color-red-1
  width: 450px

.error-border
  border: 1px solid $color-red-1

.non-edit
  max-width: 70px
  &:focus
    outline: none
  &::-webkit-inner-spin-button
    -webkit-appearance: none
    margin: 0


.custom-reserve-input
  max-width: 70px
  border: none
  border-bottom: $black 1px solid
  padding-inline: 2px

  &:focus
    outline: none

  &::-webkit-inner-spin-button
    -webkit-appearance: none
    margin: 0


.btn-send
  width: 30px
  height: 30px
  background-image: url('~/assets/img/icons/send.png')
  background-repeat: no-repeat
  background-size: 30px
  background-position: center
  border: none
  border-radius: 4px

.btn-revert
  width: 30px
  height: 30px
  background-image: url('~/assets/img/icons/revert-reserve.png')
  background-repeat: no-repeat
  background-size: 30px
  background-position: center
  border: none
  border-radius: 4px

.btn-edit-inventory
  width: 30px
  height: 30px
  background-image: url('~/assets/img/product/actions.png')
  background-position: center
  border: none
  border-radius: 4px

.modify-button
  color: $color-blue-2
  position: absolute
  top: 45px
  width: 115px

  &:hover
    color: $color-blue-5

.bg-blue-2
  background-color: $color-blue-2 !important
  border: none !important

.card-summary
  border-radius: 10px
  border: 1px solid $color-gray-58
  padding: 15px 10px

@media (max-width: 576px)
  .card-summary-header
    .body-4-medium
      @include body-5
  .field-label
    @include body-5
    font-weight: $normal
  .field-value
    @include body-5
    font-weight: $regular
    color: $color-gray-5
  .modify-button
    position: static
    border: 1px solid $color-blue-2
    white-space: nowrap
    padding: 6px 20px
    width: auto
    border-radius: 40px
</style>
