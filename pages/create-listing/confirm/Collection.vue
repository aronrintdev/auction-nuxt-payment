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
        <b-row v-for="(item, index) in selectedAuctionItems" :key="index"  class="w-100 p-2" >
          <AuctionItemHorizontal :item="item" :disable-quantity="!stateAddProduct" :item-error="itemError()" @clone="cloneItem(item)" @delete="deleteSingleItem(item, index)" @edit="editItem(item)"
          @quantityChanged="quantityChanged"/>
        </b-row>
      </div>
    </div>
    <div v-if="stateConfirmCollection" class="mt-4 w-100 h-25" >
      <AuctionDetailsCard :item="selectedAuction[0]" @edit="editClicked" />
    </div>
    <div class="d-flex align-items-center justify-content-between mt-4">
      <div></div>
      <Button
        v-if="stateAddProduct"
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
        :disabled="processing"
        pill
        @click="postAuctions"
      >
        {{ (stateAddProduct || stateConfirmCollection)? $t('create_listing.confirm.post_auction'): $t('create_listing.collection.proceed_details') }}
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
import _ from 'lodash';
import {mapActions, mapGetters} from 'vuex';
import {Button, Modal} from '~/components/common';
import AuctionItemHorizontal from '~/components/createListing/AuctionItemHorizontal';
import DeleteSvg from '~/assets/img/icons/delete-icon-white.png';
import createListingAuction from '~/plugins/mixins/create-listing-auction';
import AuctionDetailsCard from '~/components/createListing/AuctionDetailsCard';
import FormStepper from '~/components/createListing/FormStepper';
import { MAX_COLLECTION_AUCTION_ITEMS } from '~/static/constants';

export default {
  name: 'Collection',
  components: {AuctionDetailsCard, AuctionItemHorizontal, Button, Modal, FormStepper},
  mixins: [createListingAuction],
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
      this.$bvModal.show('deleted-auction-item-modal')
      this.$store.commit('create-listing/deleteFromCollection', this.deletableItem.index)
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
          this.$router.push({path: '/create-listing'})
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
