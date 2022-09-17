<template>
  <div>
    <div class="main-container m-4">
      <b-row class="justify-content-between">
        <b-col class="pt-4 pl-4">
          <b-col class="expire-trade-id d-flex">{{$t('trades.trade_id')}} #{{ trade.id }}  <ul class="offer-status"><li>{{$t(trade.status_translation)}}</li></ul></b-col>
          <b-col class="offer-time d-flex align-items-center pb-1">{{$t('trades.listed_on')}} {{ trade.created_at | formatDateTimeString }}</b-col>
          <b-col class="offer-time d-flex align-items-center">{{$t('trades.expires_on')}} {{ trade.expiry_date | formatDateTimeString }}</b-col>
        </b-col>
        <b-col class="d-flex flex-column pr-4 pt-4">
          <Button v-if="!blockTrade(trade)" variant="blue" class="expired-btn ml-auto mr-4" @click="$bvModal.show('edit-trade')">{{$t('trades.edit_listing')}}</Button>
          <Button v-if="!blockTrade(trade)" class="mt-3 expired-btn ml-auto mr-4" variant="outline-primary" @click="$bvModal.show('delist-offer')">{{$t('trades.delist')}}</Button>
        </b-col>
      </b-row>
      <b-row class="justify-content-center mt-3">
        <offer-items :offerItems="trade.offers"/>
      </b-row>
    </div>
    <delist-modal :tradeId="trade.id" @delist="delistTrade"></delist-modal>
    <edit-trade-confirmation-modal :tradeId="trade.id" @edit="editTradeConfirmed"></edit-trade-confirmation-modal>
  </div>
</template>

<script>
import Button from '~/components/common/Button';
import OfferItems from '~/pages/profile/trades/dashboard/OfferItems';
import DelistModal from '~/pages/profile/trades/dashboard/_id/offers/DelistModal'
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
      COMPLETED_STATUS
    }
  },
  mounted() {
      this.$store.commit('trades/setEditTradePageReferrer', null)
      this.$store.commit('trades/setTradeForEditing', null)
  },
  methods: {
    blockTrade(trade){
      return (trade.status === COMPLETED_STATUS)
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

.expire-trade-id
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-2-bold
  color: $color-black-1

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

.expired-btn
  border-radius: 10px
  width: 174px

</style>
