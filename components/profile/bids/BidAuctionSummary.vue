<template>
  <div v-if="auction" class="mt-3 px-5 py-4 ml-n1 w-100 bg-white card-summary position-relative">
    <div class="position-absolute tag-bid d-flex align-items-center justify-content-center text-white"
         :class="selectedBid.place">
      {{ $t('bids.bid_status.' + selectedBid.place) }}
    </div>

    <div v-if="isAutoBidVisible"
         class="position-absolute tag-auto-bid d-flex align-items-center justify-content-center autobid-to">
      &bull; &nbsp; {{ $t('bids.auto_bid_to') }} ${{ selectedBid.auction.auto_bid_setting.price / 100 }}
    </div>
    <b-row class="mt-2">
      <b-col sm="12" md="9">
        <div class="d-flex flex-column">
          <b-row>
            <b-col sm="3" class="body-4-bold text-color-blue-1">
              {{ $t('bids.auction_id') }} #{{ auction.id }}
            </b-col>
            <b-col sm="3">
              <span v-if="auction.status === 'live'" class="text-success body-4-medium">&bull; &nbsp; {{
                  $t('bids.live')
                }}</span>
              <span v-else
                    class="text-gray-24 body-4-medium">&bull; &nbsp;{{ $t('bids.expired') }}</span>
            </b-col>
            <b-col sm="6" class="text-danger body-4-medium">
              {{ $t('bids.headers.time_remaining') }}&colon;
              {{
                auction.remaining_time
              }}
            </b-col>
          </b-row>
        </div>

        <b-row class="mt-3 mx-5 body-4-medium text-gray-25">
          <b-col sm="3">
            <span>{{ $t('bids.listed_on') }}</span>
          </b-col>
          <b-col sm="3">
            <span>{{ auction.status === 'live' ? $t('bids.expires_on') : $t('bids.expired_on') }}</span>
          </b-col>
          <b-col sm="3">
            {{ $t('bids.auction_type') }}
          </b-col>
          <b-col sm="3">
            {{ $t('bids.bid_status.highest_bid') }}
          </b-col>
        </b-row>

        <b-row class="mt-3 mx-5 body-4-normal">
          <b-col sm="3">
            <span> {{
                formattedDate(auction.listed_at)
              }}</span>
          </b-col>
          <b-col sm="3">
            <span>  {{
                formattedDate(auction.end_date)
              }}</span>

          </b-col>
          <b-col sm="3">
            {{ $t('bids.auction_types.' + auction.type) }}
          </b-col>
          <b-col sm="3">
            &dollar;
            {{
              auction.highest_bid / 100
            }}
          </b-col>
        </b-row>

        <div>
          <BidAuctionSummarySingle v-if="auction.type === BID_AUCTION_TYPE_SINGLE" :auctionItem="getProducts"/>
        </div>
      </b-col>

      <b-col sm="12" md="3" class="d-flex flex-column justify-content-between">
        <div class="d-flex flex-column">
          <div class="d-flex editable-bid">
            <div class="d-flex" :class="hasReserveError? 'error-border': ''">
                <span v-if="auctionIsLive" class="mt-1 mr-2">
                 {{ $t('bids.increase_bid') }}
               </span>
              <input
                v-if="auctionIsLive"
                :value="auctionReserveValue"
                type="number"
                class="py-1"
                :class="editReserve? 'custom-reserve-input' : 'non-edit'"
                :readonly="!editReserve"
                @input="reserveChange"
              >
              <span v-else>
                  {{ auctionReserveValue }}
              </span>
            </div>

            <Button
              v-if="auctionIsLive"
              variant="link"
              class=" ml-3"
              :class="editReserve? 'btn-send': 'btn-edit-inventory'"
              :tooltip-text="$t('common.edit')"
              @click="editBidPrice"
            ></Button>
            <Button
              v-if="editReserve"
              variant="link"
              class="btn-revert ml-3"
              :tooltip-text="$t('common.revert')"
              @click="reverseBidValue"
            ></Button>
          </div>
          <div v-if="hasReserveError" class="mt-1 reserve-error position-absolute mt-4 pt-2">
            {{ $t('auction.reserve_error') }}
          </div>
        </div>
        <Button
          v-if="isCancelable"
          variant="outline-danger"
          class="my-5 cancel-modal-button"
          outlined
          @click="cancelModal"
        >
          {{ $t('bids.cancel_bid') }}
        </Button>
      </b-col>
    </b-row>

    <BidAuctionSummaryCollection v-if="auction.type === BID_AUCTION_TYPE_COLLECTION" :products="getProducts"/>

    <Modal
      id="cancel-modal"
      centered
      no-header-border
      no-footer-border
      hide-footer
    >
      <template #default>
        <div class="px-5">
          <b-row class="mb-5 mx-auto">
            {{ $t('bids.cancel_bid_body') }}
          </b-row>
          <b-row class="d-flex justify-content-around">
            <Button
              variant="primary"
              class="bg-blue-2"
              :disabled="modalActionLoading"
              pill
              @click="cancelModalOk"
            >{{ $t('common.cancel') }}
            </Button>
            <Button
              variant="outline-dark"
              pill
              :disabled="modalActionLoading"
              @click="$bvModal.hide('cancel-modal')">{{ $t('bids.go_back') }}
            </Button>
          </b-row>
        </div>

      </template>
    </Modal>

    <Modal
      id="no-less-amount-modal"
      centered
      no-header-border
      no-footer-border
      hide-footer
    >
      <template #default>
        <div class="px-5">
          <b-row class="mb-5 mx-auto">
            {{ $t('bids.less_bid_amount_body') }}
          </b-row>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import {Button, Modal} from '~/components/common';
import BidAuctionSummarySingle from '~/components/profile/bids/BidAuctionSummarySingle';
import BidAuctionSummaryCollection from '~/components/profile/bids/BidAuctionSummaryCollection';
import {
  BID_ACCEPTED,
  BID_AUCTION_TYPE_COLLECTION, BID_AUCTION_TYPE_SINGLE,
  HIGHEST_BID_STATUS,
  OUTBID_BID_STATUS,
  WINNING_BID_STATUS
} from '~/static/constants';

export default {
  name: 'BidAuctionSummary',
  components: {BidAuctionSummaryCollection, BidAuctionSummarySingle, Button, Modal},
  data() {
    return {
      editReserve: false,
      oldBidValue: null,
      newBidValue: null,
      hasReserveError: false,
      modalActionLoading: false,
      BID_AUCTION_TYPE_COLLECTION,
      BID_AUCTION_TYPE_SINGLE
    }
  },
  /**
   *
   * @type {{auctionIsLive(): boolean, selectedBid: Computed, isBidPlacedWithinHour(): boolean, isHighest(): boolean, auctionReserveValue(): (number | string), getProducts(): any, isCancelable(): any, moreThan12(): boolean, isAutoBidVisible(): (any | boolean), auction(): (function(): (function(): (function(): ...) | null | string | (function(): ...) | any | (function(): ...)) | null | string | (function(): any) | any | (function(): any)) | null | string | (function(): any) | any | (function(): any)}}
   */
  computed: {
    ...mapGetters({
      selectedBid: 'profile-bids/getSelectedBid'
    }),
    /**
     * A computed property that returns the value of the bid. If the auction is live, it returns the bid price divided by 100.
     * If the auction is not live, it returns the bid price divided by 100 with the text 'Your bid' in front of it.
     * @returns {number|string}
     */
    auctionReserveValue() {
      return this.auctionIsLive ? this.selectedBid.price / 100 : (this.$t('bids.your_bid') + ' $' + this.selectedBid.price / 100)
    },
    /**
     * Checking if the auto bid is visible.
     * @returns {*|boolean}
     */
    isAutoBidVisible() {
      return this.selectedBid.auction.auto_bid_setting && this.isHighest && !this.selectedBid.auction.auto_bid_setting.is_disabled
    },
    auction() {
      return this.selectedBid.auction
    },
    isHighest() {
      return this.auction.highest_bid === this.selectedBid.price
    },
    auctionIsLive() {
      return this.auction.status === 'live'
    },
    /**
     * Returning the first item in the array if the auction type is single, otherwise it returns the entire array.
     * @returns {*}
     */
    getProducts() {
      return this.auction.type === 'single' ? this.auction.auction_items[0] : this.auction.auction_items
    },
    /**
     * Checking if the bid was placed within the last hour.
     * @returns {boolean}
     */
    isBidPlacedWithinHour() {
      const hourAgo = new Date(new Date().getTime() - (1000 * 60 * 60)).toISOString();
      return this.selectedBid.created_at >= hourAgo
    },
    isCancelable() {
      return this.moreThan12 && this.isBidPlacedWithinHour
    },
    /**
     * A method that returns true if the remaining_hrs is greater than 12.
     * @returns {boolean}
     */
    moreThan12() {
      return this.auction.remaining_hrs > 12
    },
  },
  /**
   *
   */
  methods: {
    ...mapActions({
      cancelBid: 'profile-bids/cancelBid',
      setActiveAuction: 'auction/setActiveAuction',
    }),
    /**
     * A function that returns a string based on the status of the bid.
     * @param bid
     * @returns {string}
     */
    bidTagStatus(bid) {
      if (bid.status === BID_ACCEPTED) {
        return WINNING_BID_STATUS
      } else if (bid.price === bid.auction.highest_bid) {
        return HIGHEST_BID_STATUS
      } else {
        return OUTBID_BID_STATUS
      }
    },
    cancelModal() {
      this.$bvModal.show('cancel-modal')
    },
    /**
     * The below code is a method that is called when the user clicks the "OK" button on the modal. It is sending a request
     * to the backend to cancel the bid.
     */
    cancelModalOk() {
      this.modalActionLoading = true
      const payload = {
        id: this.selectedBid.id
      }
      this.cancelBid(payload).then(res => {
        this.$bvModal.hide('cancel-modal')
        this.$toasted.success(res.data.message)
        this.$router.push({
          path: '/profile/bids'
        })
      }).catch(err => {
        this.$toasted.error(this.$t('auctions.errors.can_not_cancel_bid') || err.data.message)
      }).finally(() => {
        this.modalActionLoading = false
      })
      this.$emit('update-auction')

    },
    reserveChange(val) {
      this.newBidValue = val.target.value
    },
    reverseBidValue() {
      this.editReserve = false
      this.newBidValue = this.oldBidValue
      this.hasReserveError = false
    },
    editBidPrice() {
      if (!this.editReserve) {
        this.oldBidValue = this.selectedBid.price
        this.newBidValue = this.oldBidValue / 100
        this.editReserve = true
      } else {
        if (this.newBidValue * 100 <= this.auction.highest_bid) {
          this.$bvModal.show('no-less-amount-modal')
          return
        }
        this.setActiveAuction(this.selectedBid.auction)
        this.$router.push({
          path: '/checkout/auction'
        })
      }
    },
    /**
     * The above code is formatting the date to a more readable format.
     * @param dateString
     * @returns {string}
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

.cancel-modal-button
  max-width: 200px

.highest_bid
  background-color: $color-green-15

.outbid
  background-color: $color-red-15

.winner
  background-color: $color-blue-1

.autobid-to
  @include body-4
  font-family: $font-family-base
  font-style: normal
  font-weight: $normal
  color: $color-blue-1

.tag-bid
  @include body-4
  font-weight: $regular
  height: 30px
  width: 110px
  left: 0
  top: 0
  z-index: 10
  border-top-left-radius: 10px
  border-bottom-right-radius: 10px

.tag-auto-bid
  height: 30px
  width: 200px
  left: 140px
  top: 0
  z-index: 10

.editable-bid
  @include body-4
  font-weight: $normal
  font-family: 'SF Pro Display'

.remove-button
  text-decoration: underline
  color: $color-blue-2

.reserve-error
  color: $color-red-1
  width: 450px

.error-border
  border: 1px solid $color-red-1

.non-edit
  border: none
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

.text-color-blue-1
  @include body-2
  font-weight: $bold
  color: $color-blue-1

.bg-blue-2.btn.btn-primary
  background-color: $color-blue-2
  border: none

.card-summary
  border-radius: 10px
  border: 1px solid $color-gray-60
  padding: 15px 10px
</style>

