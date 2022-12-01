<template>
  <b-container fluid class="container-auction-confirm h-100">
    <div class="d-none d-md-flex justify-content-between align-items-center">
      <h2 class="title">{{ $t('create_listing.confirm.title') }}</h2>
    </div>
    <div class="d-none d-md-flex justify-content-between align-items-center">
      <span class="subtitle text-gray-25">{{ $t('create_listing.confirm.subtitle') }}</span>
    </div>

    <div class="auction-items d-flex  align-items-center " :class="selectedAuctionItems.length>0? ' justify-content-between ' : ' justify-content-around '">
      <div v-if="selectedAuctionItems.length===0" class="py-5 d-flex flex-column justify-content-between align-items-center">
          <h4 class="d-none d-md-block">{{ $t('create_listing.confirm.no_item_found') }}</h4>
          <h6 class="d-md-none">{{ $t('create_listing.confirm.no_item_found') }}</h6>
      </div>
      <b-row v-else class="w-100 h-100 p-0 m-0">
        <b-col v-for="(item, index) in selectedAuctionItems" :key="index" class="auction-item d-flex justify-content-around mb-3 mb-md-4" cols="12" sm="12"  lg="6">
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
    <div class="d-md-none mt-5 text-center confirm-description">{{ $t('create_listing.confirm.confirm_page_description') }}</div>
    <div class="d-flex d-md-none bottom-control-bar">
      <Button
        variant="primary"
        pill
        :disabled="processing"
        class="flex-grow-1 mr-4 text-nowrap mobile-btns save-as-draft"
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
    <div class="d-none d-md-flex align-items-center justify-content-center">
      <Button
        variant="outline-primary"
        class="desktop-btns add-auction-btn"
        :disabled="processing"
        @click="addMore"
      >{{ $t('create_listing.confirm.add_auction') }}</Button
      >
      <Button
        variant="primary"
        class="desktop-btns save-as-draft"
        :disabled="processing"
        @click="saveAsDraft"
      >{{ $t('create_listing.confirm.save_draft') }}</Button
      >
      <Button
        variant="dark"
        class="desktop-btns post-auction-btn"
        :disabled="processing || postDisabled"
        @click="postAuctions"
      >{{ $t('create_listing.confirm.post_auction') }}</Button
      >
    </div>
    <div class="d-none d-md-flex flex-column align-items-center">
      <span class="description text-black font-weight-normal small">{{ $t('create_listing.confirm.bottom_text', [SELLER_FEE, TRANSACTION_FEE]) }}</span>
    </div>

    <Modal
      id="delete-auction-item-modal"
      centered
      no-header-border
      no-footer-border
      noBorder
      rounded
      hide-footer
    >
      <template  #default>
        <div class="px-5 mx-3 mt-n3 mb-2">
          <b-row class="mb-4">
            <b-col md="12" >
              {{ $t('create_listing.confirm.delete_text') }}
            </b-col>
          </b-row>
          <b-row class="d-flex justify-content-between">
            <Button
              variant="primary"
              pill
              class="dark-blue-fill-btn mr-4 flex-grow-1"
              @click="deleteSingeItemModalOk"
            >{{ $t('create_listing.confirm.delete') }}</Button
            >
            <Button
              variant="outline-dark"
              pill
              class="flex-grow-1"
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
    <vue-bottom-sheet ref="deleteItemSheet">
      <div class="d-flex flex-column h-100 filters-sheet">
        <div class="flex-shrink-1 overflow-auto filters-sheet-content">
          <div class="text-center mb-4">{{ $t('create_listing.confirm.delete_text') }}</div>
          <div class="text-center mb-3">
            <Button
              variant="primary"
              pill
              class="dark-blue-fill-btn px-5"
              @click="deleteSingeItemModalOk"
            >
            {{ $t('create_listing.confirm.delete') }}
            </Button>
          </div>
          <div class="text-center mb-3">
            <Button
              variant="link"
              pill
              @click="$refs.deleteItemSheet.close()"
            >
              {{ $t('create_listing.confirm.cancel') }}
            </Button>
          </div>
        </div>
      </div>
    </vue-bottom-sheet>
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
import screenSize from '~/plugins/mixins/screenSize';

export default {
  name: 'CreateListingConfirm',
  components: {
    AuctionItem,
    Modal,
    Button
  },
  mixins: [auctionValidation, screenSize],
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
    },
    isMobileSize() {
      return this.isScreenXS || this.isScreenSM
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
      this.errorArray[form.id] = []
      this.$store.commit('create-listing/setSingleAuctionItem', form)
    },
    editItem(item){
      this.$store.commit('create-listing/setEditItem', item)
      this.$router.back()
    },
    deleteSingeItemModalOk(){
      this.$bvModal.hide('delete-auction-item-modal')
      this.$refs.deleteItemSheet.close()
      this.$store.commit('create-listing/setAuctionItems', this.selectedAuctionItems.filter((a, ind) => ind !==this.deletableItem.index))
    },
    deleteSingleItem(item,index){
      this.deletableItem = {
        index,
        item
      }
      if (this.isMobileSize) {
        this.$refs.deleteItemSheet.open()
      } else {
        this.$bvModal.show('delete-auction-item-modal')
      }
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
          this.$router.push({path: '/profile/create-listing'})
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
  padding: 26px 72px 0
  overflow: auto
  .auction-item
    &-title
      font-family: $font-sp-pro
      font-weight: $medium
      @include body-12
      color: $black
      margin-bottom: 15px
  @media (max-width: 576px)
    padding: 0

.container-auction-confirm
  padding: 61px 20px
  background-color: $color-white-5

  h2.title
    font-family: $font-sp-pro
    font-weight: $bold
    @include body-1
    color: $black
    margin-bottom: 4px
  span.subtitle
    font-family: $font-sp-pro
    font-style: $regular
    @include body-5
    color: $color-gray-5

  @media (max-width: 576px)
    padding: 20px 16px
    background: transparent
    h2.title
      font-family: $font-montserrat
      @include body-3
      margin-bottom: 12px
    .auction-items
      height: auto
      overflow: visible
      .auction-item
        padding: 0
        &-title
          @include body-5
          margin-bottom: 12px
          font-weight: $medium
        .w-90
          width: 100%
    .add-more-mobile-btn.btn
      width: 42px
      height: 42px
    .mobile-btns
      @include body-21
      font-weight: $medium
  .save-as-draft
    background: $color-blue-20
    border-color: $color-blue-20
  .desktop-btns
    font-family: $font-sp-pro
    font-weight: $medium
    margin: 28px 22px 27px
    width: 200px
    padding: 0
    height: 38px
    @include body-8
    &.add-auction-btn
      color: $color-blue-19
      border-color: $color-blue-19
  .bottom-control-bar
    position: fixed
    bottom: 94px
    left: 0
    width: 100%
    padding: 18px 16px
    background: $white
    z-index: 100
  .confirm-description
    background: $color-white-5
    padding: 6px 16px
    font-weight: $normal
    @include body-31
    color: $black
  .description
    font-family: $font-sp-pro
    font-weight: $normal
    @include body-13
    text-align: center
    width: 660px
    color: $black
.dark-blue-fill-btn.btn
  background: $color-blue-20
  border-color: $color-blue-20
  &:hover
    background: $color-blue-19
    border-color: $color-blue-19
</style>
