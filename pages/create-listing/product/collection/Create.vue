<template>
  <b-container fluid class="container-auction-confirm-collection h-100">
    <div class="d-flex justify-content-between align-items-center">
      <h2 class="title">{{ $t('create_listing.collection.collection') }}</h2>
      <FormStepper :steps="steps" :selected="getCollectionState"/>
    </div>
    <b-row class="mt-3 px-5">
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

    <div class=" d-flex  align-items-center overflow-hidden " :class="selectedAuctionItems.length>0? ' justify-content-between ' : ' justify-content-around '">
      <div v-if="selectedAuctionItems.length===0" class="d-flex flex-column justify-content-between align-items-center my-4">
        <h3>{{ $t('create_listing.confirm.no_item_found') }}</h3>
        <Button
          variant="outline-primary"
          pill
          @click="$router.push({path: '/create-listing'})"
        >{{ $t('create_listing.confirm.create_auction') }}</Button
        >
      </div>
      <div v-else class="w-100 h-100 overflow-auto auction-items">
        <b-row v-for="(item, index) in selectedAuctionItems" :key="item.id"  class="w-100 p-2" >
          <AuctionItemHorizontal :item="item" :item-error="itemError()" showQuantityText @clone="cloneItem(item)" @delete="deleteSingleItem(item, index)"
           @edit="editItem(item)" />
        </b-row>
      </div>
    </div>
    <div class="mt-4 w-100 h-25" >
      <AuctionDetailsCard :item="selectedAuction" @edit="editClicked" />
    </div>
    <div class="d-flex align-items-center justify-content-between mt-4">
      <div></div>
      <Button
        variant="primary"
        pill
        :disabled="uploading"
        @click="saveAsDraft"
      >{{ $t('create_listing.confirm.save_draft') }}</Button
      >
      <Button
        variant="dark"
        :disabled="uploading"
        pill
        @click="postAuctions"
      >
        {{ $t('create_listing.confirm.post_auction') }}
      </Button
      >
      <div></div>
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
            <b-col md="12">
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
import AuctionItemHorizontal from '~/components/createListing/AuctionItemHorizontal';
import createListingAuction from '~/plugins/mixins/create-listing-auction';
import AuctionDetailsCard from '~/components/createListing/AuctionDetailsCard';
import TrashIcon from '~/assets/img/icons/trash-white.svg?inline'
import CloseIcon from '~/assets/img/icons/close.svg?inline'
import FormStepper from '~/components/createListing/FormStepper';

export default {
  name: 'NoInventoryCollectionCreate',
  components: {
    AuctionDetailsCard,
    AuctionItemHorizontal,
    Button,
    Modal,
    TrashIcon,
    CloseIcon,
    FormStepper,
  },
  mixins: [createListingAuction],
  layout: 'Profile',
  data(){
    return {
      selected: this.selectedAuction || {},
      uploading: false,
      errorArray: []
    }
  },
  computed:{
    ...mapGetters({
      collectionAuction: 'create-listing/getNonInventoryCollectionAuction',
      getCollectionState: 'create-listing/getCollectionState',
    }),
    selectedAuction(){
      return _.cloneDeep(this.collectionAuction)
    },
    selectedAuctionItems(){
      return this.collectionAuction && this.collectionAuction.items ? this.collectionAuction.items : []
    },
  },
  methods: {
    ...mapActions({
      saveDraft: 'create-listing/saveDraft',
      postAuction: 'create-listing/auctionCreate',
    }),
    deleteSingeItemModalOk(){
      this.$bvModal.hide('delete-auction-item-modal')
      this.$bvModal.show('deleted-auction-item-modal')
      this.$store.commit('create-listing/deleteItemFromNonInventoryCollectionAuction', this.deletableItem.id)
    },
    deleteSingleItem(item,index){
      this.deletableItem = {
        index,
        item
      }
      this.$bvModal.show('delete-auction-item-modal')
    },
    cloneItem(item){
      this.$store.commit('create-listing/addItemToNonInventoryAuctions', {...item, id: this.randomStringId()})
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
          stock: 1,
          color_id: item.item.color_id,
        })
      )).then(values => {
        return this.saveDraft({
          ...this.collectionAuction,
          items: values.map((data, idx) => ({ inventory_id: data.data.id, quantity: parseInt(this.selectedAuction.items[idx].quantity) })),
          type: 'collection',
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
    postAuctions() {
      // Create inventories
      Promise.all(this.selectedAuction.items.map(item => this.$axios.post('/inventories', {
          product_id: item.item.product.id,
          size_id: item.item.size_id,
          packaging_condition_id: item.item.packaging_condition_id,
          sale_price: item.item.product.retail_price,
          stock: 1,
          color_id: item.item.color_id,
        })
      )).then(responses => {
        const newAuctions = [{
          ...this.selectedAuction,
          items: responses.map((res, idx) => ({ id: res.data.id, inventory_id: res.data.id, item: res.data, quantity: parseInt(this.selectedAuction.items[idx].quantity) })),
        }]
        this.$store.commit('create-listing/setAuctionItems', newAuctions)
        this.$store.commit('create-listing/setNonInventoryCollectionAuction', {})
        this.$router.push({path: '/create-listing/details/collection'})
      })
    },
    editClicked() {
      this.$router.push({path: '/create-listing/product/collection/details'})
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
</style>
