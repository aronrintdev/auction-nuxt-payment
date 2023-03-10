<template>
  <b-container fluid class="container-auction-confirm-collection h-100">
    <div class="d-none d-md-flex justify-content-between align-items-center">
      <h2 class="title">{{ $t('create_listing.product.confirm_collection_title') }}</h2>
    </div>
    <div v-if="stateConfirmCollection" class="d-none d-md-block mx-3" >
      <AuctionDetailsCard :item="selectedAuction[0]" @edit="editClicked" />
    </div>

    <div v-if="stateConfirmCollection" class="d-none d-md-block mx-3 add-products-row">
      <b-row class="align-items-center">
        <div class="add-products-row-title mr-5">{{ $t('create_listing.confirm.added_products') }}</div>
        <div class="add-more-btn" role="button" @click="addMore">+ {{ $t('create_listing.confirm.add_another_product') }}</div>
      </b-row>
    </div>

    <b-row class="d-none d-md-flex collection-details">
      <b-col cols="12" sm="12" md="8">
        <span class="table-header px-2">{{$t('create_listing.collection.details')}}</span>
      </b-col>
      <b-col cols="12" sm="12" md="2" class="text-center">
        <span class="table-header">{{$t('create_listing.collection.quantity')}}</span>
      </b-col>
      <b-col cols="12" sm="12" md="2" class="text-center">
        <span class="table-header">{{$t('create_listing.collection.actions')}}</span>
      </b-col>
    </b-row>
    <div v-if="stateConfirmCollection" class="d-md-none collection-details-info">
      <div class="d-flex justify-content-between">
        <span class="collection-details-info-label">{{ $t('common.name') }}</span>
        <span class="collection-details-info-value">{{ selectedAuction[0].name }}</span>
      </div>
      <div class="d-flex justify-content-between gray">
        <span class="collection-details-info-label">{{ $t('create_listing.confirm.duration') }}</span>
        <span class="collection-details-info-value">{{ selectedAuction[0].time_limit }} {{ $t('create_listing.details.days') }}</span>
      </div>
      <div class="d-flex justify-content-between">
        <span class="collection-details-info-label">{{ $t('create_listing.confirm.reserve') }}</span>
        <span class="collection-details-info-value">{{ selectedAuction[0].is_reserved ? '$' + selectedAuction[0].reserve_price : $t('create_listing.confirm.no_reserve') }}</span>
      </div>
      <div class="d-flex justify-content-between gray">
        <span class="collection-details-info-label">{{ $t('create_listing.details.table_columns.starting_bid') }}</span>
        <span class="collection-details-info-value">${{ selectedAuction[0].start_bid_price }}</span>
      </div>
      <div class="d-flex justify-content-center mt-3">
        <Button
          variant="primary"
          pill
          @click="editClicked"
        >
          {{ $t('create_listing.collection.edit_details') }}
        </Button>
      </div>
    </div>
    <div v-if="selectedAuctionItems.length===0" class="d-flex d-md-none flex-column justify-content-between align-items-center my-5 no_item_found">
      <h3>{{ $t('create_listing.confirm.no_item_found') }}</h3>
      <Button
        variant="dark"
        pill
        @click="$router.push({path: '/profile/create-listing'})"
      >{{ $t('create_listing.confirm.create_auction') }}</Button>
    </div>
    <div v-for="(item, index) in selectedAuctionItems" :key="index" class="auction-item d-md-none">
      <div class="auction-item-title">{{$t('create_listing.confirm.auction_number')}}{{index+1}}</div>
      <div class="item d-flex flex-column bg-white h-md-100 w-100 rounded-md">
        <div class="position-relative d-flex flex-column justify-content-between">
          <b-dropdown id="dropdown-right" right variant="link" no-caret class="d-md-none position-absolute more-btn">
            <template #button-content >
              <img src="~/assets/img/icons/vertical-three-dots-icon.svg" />
            </template>
            <b-dropdown-item @click="deleteSingleItem(item, index)">{{ $t('common.delete') }}</b-dropdown-item>
          </b-dropdown>
          <div class="detail-section d-flex flex-grow-1">
            <b-row>
              <b-col sm="3" md="2">
                <Thumb :product="item.item.product" />
              </b-col>
              <b-col sm="9" md="10" class="pl-2 pr-4">
                <b-row class="d-block">
                  <div class="body-4-bold mb-02 product-name">{{ item.item.product.name }}</div>
                  <div class="body-4-normal mb-02 text-gray-6 text-uppercase product-sku">
                    {{ $t('shopping_cart.sku') }}&colon;&nbsp;{{ item.item.product.sku }}
                  </div>
                  <div class="body-4-normal mb-02 text-gray-6 product-color">
                    {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{ item.item.product.colorway }}, {{ $t('shopping_cart.size') }}&colon;&nbsp;{{item.item.size.size }}
                  </div>
                  <div class="body-4-normal mb-02 text-gray-6 product-condition">
                    {{ $t('products.box_condition') }}&colon;&nbsp;{{item.item.packaging_condition.name}}
                  </div>
                </b-row>
              </b-col>
            </b-row>
          </div>
          <div v-if="!stateConfirmCollection" class="py-2 px-3 quantity-form">
            <div class="label">{{ $t('vendor_purchase.quantity') }}</div>
            <b-input
              :value="item.quantity"
              type="number"
              class="w-100"
              min="1"
              max="10"
              :placeholder="$t('create_listing.collection.enter_quantity')"
              @change="(value) => quantityChanged(item.id, value)"
            />
          </div>
          <div v-else class="px-3 d-flex align-items-center">
            <div class="label">{{ $t('vendor_purchase.quantity') }}:</div>
            <div class="value ml-2">{{ item.quantity }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="d-none d-md-flex  align-items-center overflow-hidden " :class="selectedAuctionItems.length>0? ' justify-content-between ' : ' justify-content-around '">
      <div v-if="selectedAuctionItems.length===0" class="d-flex flex-column justify-content-between align-items-center my-4 no_item_found">
        <h3>{{ $t('create_listing.confirm.no_item_found') }}</h3>
        <Button
          variant="outline-primary"
          pill
          @click="$router.push({path: '/profile/create-listing'})"
        >{{ $t('create_listing.confirm.create_auction') }}</Button
        >
      </div>
      <div v-else class="d-none d-md-block w-100 h-100 overflow-auto auction-items">
        <AuctionItemHorizontal
          v-for="(item, index) in selectedAuctionItems"
          :key="index"
          :item="item"
          :disable-quantity="!stateAddProduct"
          :item-error="itemError()"
          @clone="cloneItem(item)"
          @delete="deleteSingleItem(item, index)"
          @edit="editItem(item)"
          @quantityChanged="quantityChanged"
        />
      </div>
    </div>

    <div v-if="selectedAuctionItems.length > 0" class="d-md-none text-right mt-3">
      <img
        src="~/assets/img/icons/plus-icon-gray.svg"
        class="add-more-mobile-btn"
        role="button"
        :disabled="processing"
        @click="addMore"
      />
    </div>

    <div class="d-md-none mt-5 text-center confirm-description">{{ $t('create_listing.confirm.confirm_page_description') }}</div>

    <div
      v-if="selectedAuctionItems.length > 0"
      class="d-flex align-items-center justify-content-center"
      :class="{ 'bottom-control-bar' : isMobileSize }"
    >
      <Button
        v-if="stateAddProduct"
        variant="outline-primary"
        :pill="isMobileSize"
        :disabled="processing"
        class="d-none action-btns d-md-block add-auction-btn"
        @click="addMore"
      >{{ $t('create_listing.confirm.add_auction') }}</Button
      >
      <Button
        variant="primary"
        :pill="isMobileSize"
        class="action-btns save-as-draft"
        :disabled="processing"
        @click="saveAsDraft"
      >{{ $t('create_listing.confirm.save_draft') }}</Button
      >
      <Button
        variant="dark"
        :disabled="processing || selectedAuctionItems.length < 2"
        class="action-btns post-auction-btn"
        :pill="isMobileSize"
        @click="postAuctions"
      >
        {{ (stateAddProduct || stateConfirmCollection)? $t('create_listing.confirm.post_auction'): $t('create_listing.collection.proceed_details') }}
      </Button
      >
    </div>

    <Modal
      id="delete-auction-item-modal"
      centered
      no-header-border
      no-footer-border
      hide-footer
      rounded
    >
      <template  #default>
        <div class="px-5 mt-n3 mb-2">
          <b-row class="mb-4">
            <b-col md="12" >
              {{ $t('create_listing.confirm.delete_text') }}
            </b-col>
          </b-row>
          <b-row class="d-flex justify-content-around">
            <Button
              variant="primary"
              class="dark-blue-fill-btn mr-4 flex-grow-1"
              pill
              @click="deleteSingeItemModalOk"
            >{{ $t('create_listing.confirm.delete') }}</Button
            >
            <Button
              variant="outline-dark"
              class="flex-grow-1"
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
import _ from 'lodash';
import {mapActions, mapGetters} from 'vuex';
import {Button, Modal} from '~/components/common';
import AuctionItemHorizontal from '~/components/createListing/AuctionItemHorizontal';
import DeleteSvg from '~/assets/img/icons/delete-icon-white.png';
import createListingAuction from '~/plugins/mixins/create-listing-auction';
import AuctionDetailsCard from '~/components/createListing/AuctionDetailsCard';
import { MAX_COLLECTION_AUCTION_ITEMS } from '~/static/constants';
import Thumb from '~/components/product/Thumb'
import screenSize from '~/plugins/mixins/screenSize'

export default {
  name: 'Collection',
  components: {AuctionDetailsCard, AuctionItemHorizontal, Button, Modal, Thumb},
  mixins: [createListingAuction, screenSize],
  layout: 'Profile',
  data(){
    return {
      DeleteSvg,
      selected: this.selectedAuction || [],
      processing: false,
      errorArray: [],
    }
  },
  computed:{
    ...mapGetters({
      getAuctionItems: 'create-listing/getAuctionItems',
      getCollectionState: 'create-listing/getCollectionState',
    }),
    selectedAuction(){
      return _.cloneDeep(this.getAuctionItems)
    },
    selectedAuctionItems(){
      return this.selectedAuction.length> 0 ? this.selectedAuction[0].items : []
    },
    stateAddProduct(){
      return this.getCollectionState === 'add'
    },
    stateFillDetails(){
      return this.getCollectionState === 'detail'
    },
    stateConfirmCollection(){
      return this.getCollectionState === 'confirm'
    },
    isMobileSize() {
      return this.isScreenXS || this.isScreenSM
    }
  },
  mounted() {
    this.selected = this.selectedAuction
  },
  methods: {
    ...mapActions({
      saveDraft: 'create-listing/saveDraft',
      postAuction: 'create-listing/auctionCreate',
      setCollectionStateAction: 'create-listing/setCollectionStateAction',
    }),
    deleteSingeItemModalOk(){
      this.$bvModal.hide('delete-auction-item-modal')
      this.$store.commit('create-listing/deleteFromCollection', this.deletableItem.index)
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
    editItem(){
      this.setCollectionStateAction('add')
    },
    quantityChanged(id, quantity){
      this.$store.commit('create-listing/itemQuantityChange', {id, quantity})
    },
    cloneItem(item){
      if (this.selectedAuctionItems.length < MAX_COLLECTION_AUCTION_ITEMS) {
        this.$store.commit('create-listing/addItemToCollection', {...item, id: this.randomStringId()})
      } else {
        this.$toasted.error(this.$t('create_listing.confirm.can_not_add_more'))
      }
    },
    itemError(){
      return this.errorArray[this.selectedAuction[0].id] || []
    },
    saveAsDraft(){
      this.errorArray= this.validateAuctions(this.selectedAuction, true)
      if (_.isEmpty(this.errorArray)){
        this.processing = true
        Promise.all(this.selectedAuction.map(item => {
          // mysql does not accept us Date format.
          item.scheduled_date = new Date(item.scheduled_date).toISOString().slice(0, 19).replace('T', ' ');
          return this.saveDraft(item)
        })).then(res => {
          this.$router.push({path: '/profile/create-listing'})
          this.$toasted.success(this.$t('create_listing.confirm.draft_saved'))
          this.processing = false
        }).catch(err=> {
          this.$toasted.error(err.message)
          this.processing = false
        })
      }
    },

    postAuctions(){
      //  verify and redirect to details
      this.errorArray= this.validateAuctions(this.selectedAuction, true)
      if (_.isEmpty(this.errorArray)){
        if (this.stateAddProduct){
          this.setCollectionStateAction('details')
          this.$router.push({path: '/create-listing/confirm/details'})
        }else{
          this.$router.push({path: '/create-listing/details/collection'})
        }
      }
    },

    editClicked() {
      this.$router.push({path: '/create-listing/confirm/details'})
    }
  }

}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.auction-items
  max-height: 50vh
  overflow: auto
  padding: 0 8px 0 6px

.table-header
  font-family: $font-sp-pro
  font-weight: $normal
  @include body-12
  color: $black

.container-auction-confirm-collection
  padding: 61px 20px
  background-color: $color-white-5

  h2.title
    font-family: $font-sp-pro
    font-weight: $bold
    @include body-1
    color: $black
    margin-bottom: 50px

  .btn-draft::v-deep
    @include body-5-bold
    color: $color-gray-4
    width: 168px
    display: flex
    justify-content: center
  
  .next-post-btn
    min-width: 200px
  
  .collection-details
    margin-top: 0
    margin-bottom: 21px
    padding: 0 32px 0 29px
  
  @media (max-width: 576px)
    padding: 20px 16px
    background: transparent
    .no_item_found
      h3
        font-size: 15px
        margin-bottom: 20px
          
    .auction-item
      padding-top: 20px
      &-title
        font-weight: $medium
        font-size: 14px
        line-height: 17px
        color: $black
        margin-bottom: 12px
      .item
        box-shadow: 0px 1px 4px rgba($black, 0.25)
        border-radius: 10px
        padding-bottom: 10px
        .more-btn
          top: 0
          right: 0
          z-index: 10
          .btn-link
            padding: 0
        .detail-section
          padding: 12px
          .col-sm-3
            flex: 3
          .col-sm-9
            flex: 9
            padding-right: 1em
            .product
              &-name
                font-size: 14px
                font-family: $font-sp-pro
                font-weight: $medium
              &-sku,
              &-size,
              &-color,
              &-condition
                font-weight: $normal
                font-family: $font-sp-pro
                font-size: 11px
                line-height: 13px
                color: $color-gray-5
        .background-gray
          background: $color-white-5
        .label
          font-weight: $medium
          font-size: 12px
          line-height: 15px
          color: $black
        .value
          font-weight: $normal
          font-size: 12px
          line-height: 15px
          color: $color-gray-6
          text-transform: capitalize
        .quantity-form
          input
            margin-top: 4px
            border: 1px solid $white-5
            border-radius: 10px
            background: transparent
            font-weight: $medium
            font-size: 12px
            line-height: 15px
            padding: 20px
            height: auto
    .save-draft.btn
      background: $white
      border-color: $color-blue-20
      color: $color-blue-20
      width: 50%
    .next-post-btn.btn
      background: $color-blue-20
      border-color: $color-blue-20
      width: 50%
      min-width: unset
    .collection-details-info
      box-shadow: 0px 1px 4px rgba($black, 0.25)
      border-radius: 10px
      padding: 12px 0
      & > div
        padding: 4px 12px
      .gray
        background: $color-white-5
      &-label
        font-weight: $medium
        font-size: 12px
        line-height: 15px
        color: $black
      &-value
        font-weight: $normal
        font-size: 12px
        line-height: 15px
        color: $color-gray-6
        text-transform: capitalize
      .btn
        background: $color-blue-20
        border-color: $color-blue-20
        font-weight: $medium
        letter-spacing: -0.04em
        font-size: 13px
        line-height: 16px
        padding: 12px 40px
        height: auto
  .bottom-control-bar
    position: fixed
    bottom: 94px
    left: 0
    width: 100%
    z-index: 100
    padding: 18px 6px
    background: $white
  .confirm-description
    background: $color-white-5
    padding: 6px 16px
    font-weight: $normal
    @include body-31
    color: $black

  .mb-02
    margin-bottom: 2px

  .action-btns
    font-family: $font-sp-pro
    font-weight: $medium
    margin: 34px 22px 27px
    width: 200px
    padding: 0
    height: 38px
    @include body-8
    &.add-auction-btn
      color: $color-blue-19
      border-color: $color-blue-19
    &.save-as-draft
      background: $color-blue-20
      border-color: $color-blue-20
    @media (max-width: 576px)
      @include body-21
      font-weight: $medium
      margin: 0 10px
  .add-products-row
    margin: 50px 0 25px
    &-title
      font-family: $font-sp-pro
      font-weight: $bold
      @include body-12
      color: $black
    .add-more-btn
      font-family: $font-sp-pro
      font-weight: $medium
      @include body-13
      color: $color-blue-2
.dark-blue-fill-btn.btn
  background: $color-blue-20
  border-color: $color-blue-20
  &:hover
    background: $color-blue-19
    border-color: $color-blue-19
</style>
