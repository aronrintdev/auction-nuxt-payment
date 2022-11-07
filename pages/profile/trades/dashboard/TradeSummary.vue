<template>
  <div>
    <div v-if="width <= 500">
      <div class="main-container-small ml-2">
        <div class="justify-content-between">
          <div class="pt-4 pl-4">
            <div class="expire-trade-id-small d-flex">{{$t('trades.trade_id')}} #{{ trade.id }}  <ul class="offer-status"><li>{{$t(trade.status_translation)}}</li></ul></div>
            <div class="offer-time-small d-flex align-items-center pb-1">{{$t('trades.listed_on')}} {{ trade.created_at | formatDateTimeString }}</div>
            <div class="offer-time-small d-flex align-items-center">{{$t('trades.expires_on')}} {{ trade.expiry_date | formatDateTimeString }}</div>
          </div>
          <div>
            <offer-items :offerItems="trade.offers"/>
          </div>
          <div class="d-flex mt-4">
            <b-btn v-if="!isDelistedTrade(trade) && !blockTrade(trade)" class="mt-3 list-btn"  @click="$bvModal.show('delist-offer')">{{$t('trades.delist')}}</b-btn>
            <b-btn v-if="isDelistedTrade(trade)" class="mt-3 list-btn"  @click="$bvModal.show('relist-trade')">Relist</b-btn>
            <b-btn  v-if="!isDelistedTrade(trade) && !blockTrade(trade)"  class="mt-3 edit-btn" @click="$bvModal.show('edit-trade')">{{$t('common.edit')}}</b-btn>
          </div>
        </div>

      </div>
    </div>
    <div v-else>
      <div class="main-container m-4">
        <b-row class="justify-content-between">
          <b-col class="pt-4 pl-4">
            <b-col class="expire-trade-id d-flex">{{$t('trades.trade_id')}} #{{ trade.id }}  <ul class="offer-status"><li>{{$t(trade.status_translation)}}</li></ul></b-col>
            <b-col class="offer-time d-flex align-items-center pb-1">{{$t('trades.listed_on')}} {{ trade.created_at | formatDateTimeString }}</b-col>
            <b-col class="offer-time d-flex align-items-center">{{$t('trades.expires_on')}} {{ trade.expiry_date | formatDateTimeString }}</b-col>
          </b-col>
          <b-col class="d-flex flex-column pr-4 pt-4">
            <Button v-if="!isDelistedTrade(trade) && !blockTrade(trade)" variant="blue" class="expired-btn ml-auto mr-4" @click="$bvModal.show('edit-trade')">{{$t('trades.edit_listing')}}</Button>
            <Button v-if="!isDelistedTrade(trade) && !blockTrade(trade)" class="mt-3 expired-btn ml-auto mr-4" variant="outline-primary" @click="$bvModal.show('delist-offer')">{{$t('trades.delist')}}</Button>
            <Button v-if="isDelistedTrade(trade)" class="mt-3 expired-btn ml-auto mr-4" variant="outline-primary" @click="$bvModal.show('relist-trade')">{{$t('trades.relist')}}</Button>
          </b-col>
        </b-row>
        <b-row class="justify-content-center mt-3">
          <offer-items :offerItems="trade.offers"/>
        </b-row>
      </div>
      <delist-modal :tradeId="trade.id" @delist="delistTrade"></delist-modal>
      <relist-modal :tradeId="trade.id" @relist="relistMyTrade"></relist-modal>
      <edit-trade-confirmation-modal :tradeId="trade.id" @edit="editTradeConfirmed"></edit-trade-confirmation-modal>
    </div>

  </div>
</template>

<script>
  import {mapActions} from 'vuex'
import Button from '~/components/common/Button'
import OfferItems from '~/pages/profile/trades/dashboard/OfferItems'
import DelistModal from '~/pages/profile/trades/dashboard/_id/offers/DelistModal'
import RelistModal from '~/pages/profile/trades/dashboard/_id/offers/RelistModal'
import EditTradeConfirmationModal from '~/pages/profile/trades/dashboard/_id/offers/EditTradeConfirmationModal'
import {
  DELIST_STATUS,
  COMPLETED_STATUS
} from '~/static/constants/trades'
export default {
  name: 'TradeSummary',
  components: {
    OfferItems,
    Button,
    DelistModal,
    RelistModal,
    EditTradeConfirmationModal
  },
  props: {
    trade: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      COMPLETED_STATUS,
      width:'',
    }
  },
  mounted() {
      this.$store.commit('trades/setEditTradePageReferrer', null)
      this.$store.commit('trades/setTradeForEditing', null)
    this.width = window.innerWidth
  },
  methods: {
    ...mapActions('trades', ['relistTrade']),
    blockTrade(trade){
      return (trade.status === COMPLETED_STATUS)
    },
    isDelistedTrade(trade){
      return (trade.status === DELIST_STATUS)
    },
    delistTrade(tradeId){
      this.$axios.put(`/trades/${tradeId}/status`, {
          status: DELIST_STATUS
        })
        .then(() => {
          this.$router.push('/profile/trades/dashboard/alltradelistings')
        })
        .catch((error) => {
          this.$toasted.error(this.$t(error.response.data.error))
        })
    },
    relistMyTrade(tradeId){
      this.relistTrade(tradeId)
        .then((response) => {
          this.$router.push('/profile/trades/dashboard/' + response.data.data.trade_id + '/offers')
        })
        .catch((error) => {
          this.$toasted.error(this.$t(error.response.data.error))
        })
    },
    editTradeConfirmed(tradeId){
      this.$store.commit('trades/setEditTradePageReferrer', `/profile/trades/dashboard/${tradeId}/offers`)
      this.$store.commit('trades/setTradeForEditing', tradeId)
      this.$router.push(`/profile/trades/dashboard/${tradeId}/edit`)
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.main-container
  background: $color-white-1
  box-shadow: 0 1px 4px $drop-shadow1
  border-radius: 10px
  height: 371px
.main-container-small
  background: $color-gray-56
  border-radius: 4px
  height: 370px
  width: 343px
.expire-trade-id
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-2-bold
  color: $color-black-1
.expire-trade-id-small
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-size: 14px
  color: $color-blue-20

.offer-status
  font-family: $font-family-montserrat
  font-style: normal
  @include body-4-regular
  color: $color-green-3

.offer-time
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-13-normal
  color: $color-black-1
.offer-time-small
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-size: 12px
  color: $color-gray-47
.expired-btn
  border-radius: 10px
  width: 174px
.list-btn
  height: 16px
  width: 39px
  color: $color-blue-5
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $medium
  font-size: 13px
  border: none
  background-color: transparent
  margin-left: 2rem
.edit-btn
  width: 121px
  height: 30px
  background: $color-blue-20
  border-radius: 5px
  font-family: $font-family-montserrat
  font-style: normal
  @include body-21-medium
  color: $color-white-1
  margin-left: 5rem

</style>
