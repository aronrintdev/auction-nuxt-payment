<template>
  <b-container fluid class="container-auction-confirm h-100">
    <div class="d-flex justify-content-between align-items-center">
      <h2 class="title">{{ $t('create_listing.confirm.title') }}</h2>
    </div>
    <div class="d-none d-md-flex justify-content-between align-items-center">
      <span class="title text-gray-25">{{ $t('create_listing.confirm.subtitle') }}</span>
    </div>

    <div class="auction-items d-flex  align-items-center " :class="selectedAuctionItems.length>0? ' justify-content-between ' : ' justify-content-around '">
      <div v-if="selectedAuctionItems.length===0" class="d-flex flex-column justify-content-between align-items-center">
          <h3>{{ $t('create_listing.confirm.no_item_found') }}</h3>
          <Button
            variant="outline-primary"
            pill
            @click="$router.push({path: '/create-listing'})"
          >{{ $t('create_listing.confirm.create_auction') }}</Button
          >
      </div>
      <b-row v-else class="w-100 h-100 p-0 p-md-5 m-0">
        <b-col v-for="(item, index) in selectedAuctionItems" :key="index" class="auction-item d-flex justify-content-around mt-3 mt-md-5" cols="12" sm="12"  lg="6">
          <div class="w-90 h-auto h-md-100">
            <div class="auction-item-title">{{$t('create_listing.confirm.auction_number')}}{{index+1}}</div>
            <AuctionItem :item="item" :itemError="itemError(item)" @clone="cloneItem(item)" @delete="deleteSingleItem(item, index)" @edit="editItem(item)" @formChange="formChanged"/>
          </div>
        </b-col>
      </b-row>
    </div>
    <!-- Add Button -->
    <div class="d-md-none text-right mt-3">
      <img
        src="~/assets/img/icons/plus-icon-gray.svg"
        class="add-more-mobile-btn"
        role="button"
        :disabled="processing"
        @click="addMore"
      />
    </div>
    <div class="d-flex d-md-none py-4">
      <Button
        variant="primary"
        pill
        :disabled="processing"
        class="flex-grow-1 mr-4 text-nowrap mobile-btns"
        @click="saveAsDraft"
      >
        {{ $t('create_listing.confirm.save_as_draft') }}
      </Button>
      <Button
        variant="dark"
        class="flex-grow-1 text-nowrap mobile-btns"
        :disabled="processing || postDisabled"
        pill
        @click="postAuctions"
      >
        {{ $t('create_listing.confirm.post_listings') }}
      </Button>
    </div>
    <div class="d-none d-md-flex align-items-center justify-content-between mt-4">
      <div></div>
      <Button
        class="d-none d-md-block"
        variant="outline-primary"
        pill
        :disabled="processing"
        @click="addMore"
      >{{ $t('create_listing.confirm.add_auction') }}</Button
      >
      <Button
        variant="primary"
        pill
        :disabled="processing"
        @click="saveAsDraft"
      >{{ $t('create_listing.confirm.save_draft') }}</Button
      >
      <Button
        variant="dark"
        :disabled="processing || postDisabled"
        pill
        @click="postAuctions"
      >{{ $t('create_listing.confirm.post_auction') }}</Button
      >
      <div></div>
    </div>
    <div class="d-none d-md-flex flex-column align-items-center mt-4">
      <span class="title text-black font-weight-normal small">{{ $t('create_listing.confirm.bottom_text', [SELLER_FEE, TRANSACTION_FEE]) }}</span>
    </div>

    <Modal
      id="delete-auction-item-modal"
      centered
      no-header-border
      no-footer-border
      hide-footer
    >
      <template  #default>
        <div class="px-5">
          <b-row class="mb-4">
            <b-col md="12" >
              {{ $t('create_listing.confirm.delete_text') }}
            </b-col>
          </b-row>
          <b-row class="d-flex justify-content-around">
            <Button
              variant="primary"
              pill
              @click="deleteSingeItemModalOk"
            >{{ $t('create_listing.confirm.delete') }}</Button
            >
            <Button
              variant="outline-dark"
              pill
              @click="$bvModal.hide('delete-auction-item-modal')"
            >{{ $t('create_listing.confirm.cancel') }}</Button
            >
          </b-row>
        </div>

      </template>
    </Modal>

    <Modal
      id="deleted-auction-item-modal"
      centered
      no-header-border
      no-footer-border
      hide-footer
    >
      <template  #default>
        <div class="px-5">
          <b-row class="mb-4">
            <b-col md="12" >
              {{ $t('create_listing.confirm.deleted_text') }}
            </b-col>
          </b-row>
          <b-row class="d-flex justify-content-around">
            <Button
              iconOnly
              variant="primary"
              pill
            >
              <img :src="DeleteSvg"/>
            </Button>
          </b-row>
        </div>

      </template>
    </Modal>
  </b-container>
</template>

<script>
import _ from 'lodash'
import {mapActions} from 'vuex';
import DeleteSvg from '~/assets/img/icons/delete-icon-white.png';
import auctionValidation from '~/plugins/mixins/create-listing-auction'
import {
  Modal,
  Button,
} from '~/components/common'
import AuctionItem from '~/components/createListing/AuctionItem';
import { SELLER_FEE, TRANSACTION_FEE } from '~/static/constants';

export default {
  name: 'CreateListingConfirm',
  components: {
    AuctionItem,
    Modal,
    Button
  },
  mixins: [auctionValidation],
  layout: 'Profile',
  data(){
    return {
      DeleteSvg,
      postDisabled: false,
      errorArray: {},
      processing: false,
      deletableItem: {
        item: null,
        index: -1
      },
      SELLER_FEE,
      TRANSACTION_FEE,
    }
  },
  computed:{
    selectedAuctionItems(){
      return _.cloneDeep(this.$store.state['create-listing'].auctionItems)
    }
  },
  methods: {
    ...mapActions({
      saveDraft: 'create-listing/saveDraft',
      postAuction: 'create-listing/auctionCreate',
    }),
    itemError( item ){
      return this.errorArray[item.id] || []
    },
    formChanged(form){
      this.$store.commit('create-listing/setSingleAuctionItem', form)
    },
    editItem(item){
      this.$store.commit('create-listing/setEditItem', item)
      this.$router.back()
    },
    deleteSingeItemModalOk(){
      this.$bvModal.hide('delete-auction-item-modal')
      this.$bvModal.show('deleted-auction-item-modal')
      this.$store.commit('create-listing/setAuctionItems', this.selectedAuctionItems.filter((a, ind) => ind !==this.deletableItem.index))
    },
    deleteSingleItem(item,index){
      this.deletableItem = {
        index,
        item
      }
      this.$bvModal.show('delete-auction-item-modal')
    },
    addMore(){
      this.$router.push({path: '/create-listing/search/inventory'})
    },
    cloneItem(item){
      this.$store.commit('create-listing/addItemToAuctions', { ...item, id: this.randomStringId(),})
    },
    saveAsDraft(){
      const verified = this.validateAuctions(this.selectedAuctionItems)
      if (_.isEmpty(verified)) {
        this.processing = true
        Promise.all(this.selectedAuctionItems.map(item => {
          // mysql does not accept us Date format.
          item.reserve_price = item.reserve_price * 100
          item.start_bid_price = item.start_bid_price * 100
          item.scheduled_date = new Date(item.scheduled_date).toISOString().slice(0, 19).replace('T', ' ');
          return this.saveDraft(item)
        })).then(res => {
          this.$router.push({path: '/create-listing'})
          this.$toasted.success(this.$t('create_listing.confirm.draft_saved'))
          this.processing = false
        }).catch(err => {
          this.$toasted.error(err.message)
          this.processing = false
        })
      } else {
        this.errorArray = verified
      }
    },

    postAuctions(){
      //  verify and redirect to details
      const verified = this.validateAuctions(this.selectedAuctionItems)
      if (_.isEmpty(verified)) {
        this.$router.push({path: '/create-listing/details'})
      }else {
        this.errorArray = verified
      }
    },
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.w-90
  width: 90%

.auction-items
  height: 75vh
  overflow: auto
  .auction-item
    &-title
      font-weight: $bold

.container-auction-confirm
  padding: 47px 54px
  background-color: $color-white-5

  h2.title
    @include heading-3
    color: $color-black-1

  @media (max-width: 576px)
    padding: 20px 16px
    background: transparent
    h2.title
      font-size: 18px
      line-height: 22px
      margin-bottom: 12px
    .auction-items
      height: auto
      overflow: visible
      .auction-item
        padding: 0
        &-title
          font-size: 14px
          line-height: 17px
          margin-bottom: 12px
          font-weight: $medium
        .w-90
          width: 100%
    .add-more-mobile-btn.btn
      width: 42px
      height: 42px
    .mobile-btns
      font-weight: $medium
      font-size: 13px
      line-height: 16px
</style>
