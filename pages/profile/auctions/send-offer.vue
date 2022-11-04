<template>
  <b-container fluid class="container-profile-auctions h-100">
    <div class="d-flex justify-content-start align-items-center body-4-normal back-btn" role="button" @click="goBackAuction">
      <img :src="ArrowLeft" :alt="$t('auction.go_back_alt_text')" class="mr-2">
      {{$t('auction.back_to_summary')}}
    </div>

    <div class="d-flex align-items-center justify-content-around w-100 mt-5">
      <div class="d-flex flex-column align-items-center ">
        <div class="title ">
          <h2>{{$t('auction.send_final_offers')}}</h2>
        </div>
        <div class="subtitle text-gray-24">
          <h5>{{$t('auction.send_final_offers_subtitle')}}</h5>
        </div>
      </div>
    </div>
    <div  class="mt-5 d-flex flex-column align-items-center">
      <div v-for="(bid, index) in selectedBids" :key="index" class="w-100">
        <BidOffer
          :bid="bid"
          :index="index"
          :has-error="validationErrors[bid.id]"
          @remove="removeBid"
          @select="handleDurationSelect"
        />
      </div>
    </div>
    <div class="d-flex justify-content-center  mt-5">
      <Button
        v-if="selectedBids.length"
        class="bg-blue-2 border-0"
        pill
        :disabled="modalActionLoading"
        @click="sendOffers"
      >
        <span class="px-4"> {{ $t('auction.send_offers') }}</span>
      </Button>
    </div>

    <Modal
      id="final-offer-modal"
      centered
      no-header-border
      no-footer-border
      hide-footer
    >
      <template #default>
        <div class="px-md-5 mt-n3 mt-md-0 px-0">
          <b-row class="mb-4">
            <b-col md="12">
              {{modalBody}}
            </b-col>
          </b-row>
          <b-row class="d-flex justify-content-around">
            <Button
              variant="primary"
              class="bg-blue-2 border-0"
              :disabled="modalActionLoading"
              pill
              @click="modalOkAction"
            >{{ modalOkText }}
            </Button
            >
            <Button
              variant="outline-dark"
              pill
              :disabled="modalActionLoading"
              @click="$bvModal.hide('final-offer-modal')">{{ $t('common.cancel') }}
            </Button
            >
          </b-row>
        </div>

      </template>
    </Modal>

  </b-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import {Modal, Button} from '~/components/common';
import ArrowLeft from '~/assets/img/icons/arrow-left-gray.svg'
import BidOffer from '~/components/profile/auctions/BidOffer';
import {FINAL_OFFER, FINAL_OFFER_GO_BACK} from '~/static/constants';
export default {
  name: 'SendOffer',
  components: {BidOffer, Button, Modal},
  layout: 'Profile',
  data(){
    return{
      ArrowLeft,
      durationForm: {},
      modalActionLoading: false,
      validationErrors: {},
      action: FINAL_OFFER
    }
  },
  computed:{
    ...mapGetters({
      selectedBids: 'profile-auction/getSelectedBids',
      selectedAuction: 'profile-auction/getSelectedAuction',
    }),
    /**
     *  computed property that returns the body of the modal.
     * @return {VueI18n.TranslateResult}
     */
    modalBody(){
      return this.$t('auction.offer_bodies.' + this.action)
    },
    /**
     *  computed property that returns the text for the modal's ok button.
     * @return {VueI18n.TranslateResult}
     */
    modalOkText(){
      return this.$t('auction.offer_modal_ok.' + this.action)
    }
  },
  mounted() {
    // reset durationForm for bid array
    this.selectedBids.map(bid => {
      this.durationForm[bid.id] = null
      return bid
    })
  },
  methods: {
    ...mapActions({
      sendFinalOffers: 'profile-auction/sendFinalOffers'
    }),
    /**
     * A method that is called when the user clicks on the modal's ok button.
     * Modal is generic modal that shows actions and description depending on caller.
     * This method checks selected action and proceeds according to that.
     */
    modalOkAction(){
      // when selected action is go back from offers page, it resets selected bids and goes details page/
      if (this.action === FINAL_OFFER_GO_BACK) {
          this.$store.commit('profile-auction/setSelectedBids', [])
        this.$router.push({
          path: '/profile/auctions/'+this.selectedAuction.id,
          params: {
            selected: this.selectedAuction
          }
        })
      }
      // if action is to send Final Offers
      else if (this.action === FINAL_OFFER){
        this.modalActionLoading = true
        const payload = {
          id: this.selectedAuction.id,
          items: this.selectedBids.map(bid => {
            return {
              bid_id: bid.id,
              duration: this.durationForm[bid.id]
            }
          })
        }
        this.sendFinalOffers(payload).then(res => {
          this.$bvModal.hide('final-offer-modal')
          this.$toasted.success(res.data.message)
          this.$router.push({
            path: '/profile/auctions'
          })
        }).catch(err => {
          this.$toasted.error(err.message || err.data.error)
        }).finally(()=> {
          this.modalActionLoading = false
        })
      }
    },
    cancelAction(){
      this.selectAction = false
    },
    /**
     *  Validating the form items.
     * @return {boolean}
     */
    validateFormItems(){
      const errors = {}
      for (let i = 0; i <this.selectedBids.length ; i++) {
        const bid = this.selectedBids[i].id
        const val = this.durationForm[bid]
        errors[this.selectedBids[i].id] = val? null : this.$t('auction.errors.duration')
      }
      this.validationErrors = errors
      // check if validationErrors includes non null values, if yes then there is error
      return Object.values(this.validationErrors).filter(error => error).length === 0
    },
    /**
     * Setting action and showing modal
     */
    goBackAuction(){
      this.action = FINAL_OFFER_GO_BACK
      this.$bvModal.show('final-offer-modal')
    },
    /**
     * Removing the bid from the selected bids.
     * @param bid
     */
    removeBid(bid){
      this.durationForm[bid.id] = undefined
    },
    /**
     *  Validating the form items and if there is no error, it sets the action to FINAL_OFFER and shows the modal.
     */
    sendOffers(){
      const res = this.validateFormItems()
      if (!res){
        return false
      }
      this.action = FINAL_OFFER
      this.$bvModal.show('final-offer-modal')
    },
    /**
     *  method that is called when the user selects a duration from the dropdown. It sets the durationForm object with the
     *  bid id and the selected duration.
     * @param data
     */
    handleDurationSelect(data){
      this.durationForm[data.bid.id] = data.value
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.bg-blue-2.btn.btn-primary
  background-color: $color-blue-2

.w-650
  width: 650px

.mw-734
  max-width: 734px


.title
  @include heading-1-bold
  color: $color-black-1

.container-profile-auctions
  padding: 47px 54px
  background-color: $color-white-5

  @media (max-width: 576px)
    padding: 16px
    min-height: calc(100vh - 270px)
    background: $white
    h2
      @include body-3-bold
    h5
      @include body-5
      font-weight: $normal
    .back-btn
      @include body-5
      margin-left: -4px
      img
        width: 16px
    
</style>
