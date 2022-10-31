<template>
  <b-container fluid class="container-auction-confirm-collection h-100">
    <div class="d-none d-md-flex justify-content-between align-items-center">
      <h2 class="title">{{ $t('create_listing.collection.collection') }}</h2>
      <FormStepper :steps="steps" :selected="getCollectionState"/>
    </div>
    <b-row class="d-none d-md-flex mt-3 px-5">
      <b-col cols="12" sm="12" md="8">
        <span class="table-header">{{$t('create_listing.collection.details')}}</span>
      </b-col>
      <b-col cols="12" sm="12" md="2" class="text-center">
        <span class="table-header">{{$t('create_listing.collection.quantity')}}</span>
      </b-col>
      <b-col cols="12" sm="12" md="2" class="text-center">
        <span class="table-header">{{$t('create_listing.collection.actions')}}</span>
      </b-col>
    </b-row>

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
                <b-row class="mb-2 d-block">
                  <div class="body-4-bold mb-2 product-name">{{ item.item.product.name }}</div>
                  <div class="body-4-normal mb-2 text-gray-6 text-uppercase product-sku">
                    {{ $t('shopping_cart.sku') }}&colon;&nbsp;{{ item.item.product.sku }}
                  </div>
                  <div class="body-4-normal mb-2 text-gray-6 product-color">
                    {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{ item.item.product.colorway }}, {{ $t('shopping_cart.size') }}&colon;&nbsp;{{item.item.size.size }}
                  </div>
                  <div class="body-4-normal mb-2 text-gray-6 product-condition">
                    {{ $t('products.box_condition') }}&colon;&nbsp;{{item.item.packaging_condition.name}}
                  </div>
                </b-row>
              </b-col>
            </b-row>
          </div>
          <div class="py-2 px-3 quantity-form">
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
        </div>
      </div>
    </div>

    <div class="d-none d-md-flex  align-items-center overflow-hidden" :class="selectedAuctionItems.length>0? ' justify-content-between ' : ' justify-content-around '">
      <div v-if="selectedAuctionItems.length===0" class="d-flex flex-column justify-content-between align-items-center my-4">
        <h3>{{ $t('create_listing.confirm.no_item_found') }}</h3>
        <Button
          variant="outline-primary"
          pill
          @click="$router.push({path: '/create-listing'})"
        >{{ $t('create_listing.confirm.create_auction') }}</Button
        >
      </div>
      <div v-else class="d-none d-md-block w-100 h-100 overflow-auto auction-items">
        <b-row v-for="(item, index) in selectedAuctionItems" :key="item.id"  class="w-100 p-2" >
          <AuctionItemHorizontal :item="item" :item-error="itemError()" showQuantityText @clone="cloneItem(item)" @delete="deleteSingleItem(item, index)"
           @edit="editItem(item)"  />
        </b-row>
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

    <div v-if="selectedAuctionItems.length > 0" class="d-flex align-items-center justify-content-between mt-4 py-4">
      <div class="d-none d-md-block flex-grow-1"></div>
      <Button
        variant="outline-primary"
        pill
        class="d-none d-md-block flex-grow-1 mr-2 px-0"
        :disabled="uploading"
        @click="addMore"
      >{{ $t('create_listing.confirm.add_another_product') }}</Button
      >
      <Button
        variant="dark"
        :disabled="uploading || selectedAuctionItems.length < 2"
        pill
        class="w-50 w-md-auto mx-auto ml-md-2 px-0 next-post-btn"
        @click="moveToCollectionDetails"
      >
        {{ $t('create_listing.collection.proceed_details') }}
      </Button
      >
      <div class="d-none d-md-block flex-grow-1"></div>
    </div>

    <Modal
      id="delete-auction-item-modal"
      centered
      no-header-border
      no-footer-border
      hide-footer
    >
      <template  #default>
        <div class="px-5 mt-n3 pb-3">
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

    <b-modal id="deleted-auction-item-modal" hide-footer hide-header centered size="md">
      <div class="text-right">
        <close-icon role="button" class="close-icon" @click="$bvModal.hide('deleted-auction-item-modal')"></close-icon>
      </div>
      <div class="text-center w-75 mx-auto my-2">
        <div class="success-text">{{ $t('create_listing.product.discard_success_msg') }}</div>
        <div class="d-flex align-items-center justify-content-center mx-auto mt-3 checkmark-icon">
          <TrashIcon />
        </div>
      </div>
    </b-modal>
  </b-container>
</template>

<script>
import _ from 'lodash';
import {mapActions, mapGetters} from 'vuex';
import {Button, Modal} from '~/components/common';
import FormStepper from '~/components/createListing/FormStepper';
import AuctionItemHorizontal from '~/components/createListing/AuctionItemHorizontal';
import DeleteSvg from '~/assets/img/icons/delete-icon-white.png';
import createListingAuction from '~/plugins/mixins/create-listing-auction';
import TrashIcon from '~/assets/img/icons/trash-white.svg?inline';
import CloseIcon from '~/assets/img/icons/close.svg?inline';
import Thumb from '~/components/product/Thumb'

export default {
  name: 'NoInventoryCollectionConfirm',
  components: {
    AuctionItemHorizontal,
    Button,
    Modal,
    TrashIcon,
    CloseIcon,
    FormStepper,
    Thumb,
  },
  mixins: [createListingAuction],
  layout: 'Profile',
  data(){
    return {
      DeleteSvg,
      uploading: false,
      processing: false,
      errorArray: []
    }
  },
  computed:{
    ...mapGetters({
      getCollectionAuction: 'create-listing/getNonInventoryCollectionAuction',
      getCollectionState: 'create-listing/getCollectionState',
    }),
    selectedAuction(){
      return _.cloneDeep(this.getCollectionAuction)
    },
    selectedAuctionItems(){
      return this.selectedAuction?.items || []
    },
  },
  methods: {
    ...mapActions({
      saveDraft: 'create-listing/saveDraft',
    }),
    deleteSingeItemModalOk(){
      this.$bvModal.hide('delete-auction-item-modal')
      this.$bvModal.show('deleted-auction-item-modal')
      this.$store.commit('create-listing/deleteItemFromNonInventoryCollectionAuction', this.deletableItem.item.id)
    },
    deleteSingleItem(item,index){
      this.deletableItem = {
        index,
        item
      }
      this.$bvModal.show('delete-auction-item-modal')
    },
    addMore() {
      this.$router.push({path: '/create-listing/product/search'})
    },
    cloneItem(item) {
      this.$store.commit('create-listing/addItemToNonInventoryCollectionAuction', {...item, id: this.randomStringId()})
    },
    editItem(item) {
      this.$store.commit('create-listing/setEditProductInventory', item)
      this.$router.push('/create-listing/product/collection/edit')
    },
    itemError(){
      return this.errorArray[this.selectedAuction.id] || []
    },
    saveAsDraft(){
      this.processing = true
      Promise.all(this.selectedAuction.items.map(item => this.$axios.post('/inventories', {
          product_id: item.item.product.id,
          size_id: item.item.size_id,
          packaging_condition_id: item.item.packaging_condition_id,
          sale_price: item.item.product.retail_price,
          stock: item.item.stock,
          color_id: item.item.color_id,
        })
      )).then(values => {
        return this.saveDraft({
          items: values.map((data, idx) => ({ inventory_id: data.data.id, quantity: parseInt(this.selectedAuction.items[idx].quantity) })),
          type: 'collection',
          status: 'live',
        })
      }).then(res => {
        this.$router.push({path: '/create-listing'})
        this.$toasted.success(this.$t('create_listing.confirm.draft_saved'))
        this.$store.commit('create-listing/setNonInventoryCollectionAuction', {})
        this.processing = false
      }).catch(err=> {
        this.$toasted.error(err.message)
        this.processing = false
      })
    },
    moveToCollectionDetails() {
      this.$store.commit('create-listing/setCollectionState', 'details')
      this.$router.push('/create-listing/product/collection/details')
    },
    quantityChanged(id, quantity){
      this.$store.commit('create-listing/setNonInventoryCollectionAuctionQuantity', {id, quantity})
    },
  }

}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.auction-items
  max-height: 50vh
  overflow: auto

.table-header
  @include body-4-bold

.container-auction-confirm-collection
  padding: 47px 54px
  background-color: $color-white-5

  h2.title
    @include heading-3
    color: $color-black-1

  .btn-draft::v-deep
    @include body-5-bold
    color: $color-gray-4
    width: 168px
    display: flex
    justify-content: center

    
  @media (max-width: 576px)
    padding: 20px 16px
    background: transparent
    .no_item_found
      h3
        @include body-8
        margin-bottom: 20px
          
    .auction-item
      padding-top: 20px
      &-title
        @include body-5
        font-weight: $medium
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
                @include body-5
                font-weight: $medium
              &-sku,
              &-size,
              &-color,
              &-condition
                @include body-21
                font-weight: $regular
                color: $color-gray-6
        .background-gray
          background: $color-white-5
        .label
          @include body-9
          font-weight: $medium
          color: $black
        .value
          @include body-9
          font-weight: $normal
          color: $color-gray-6
          text-transform: capitalize
        .quantity-form
          input
            @include body-9
            margin-top: 4px
            border: 1px solid $white-5
            border-radius: 10px
            background: transparent
            font-weight: $medium
            padding: 20px
            height: auto
    .save-draft.btn
      background: $white
      border-color: $color-blue-20
      color: $color-blue-20
    .next-post-btn.btn
      background: $color-blue-20
      border-color: $color-blue-20
    .collection-details-info
      box-shadow: 0px 1px 4px rgba($black, 0.25)
      border-radius: 10px
      padding: 12px 0
      & > div
        padding: 4px 12px
      .gray
        background: $color-white-5
      &-label
        @include body-9
        font-weight: $medium
        color: $black
      &-value
        @include body-9
        font-weight: $normal
        color: $color-gray-6
        text-transform: capitalize
      .btn
        @include body-21
        background: $color-blue-20
        border-color: $color-blue-20
        font-weight: $medium
        letter-spacing: -0.04em
        padding: 12px 40px
        height: auto
</style>
