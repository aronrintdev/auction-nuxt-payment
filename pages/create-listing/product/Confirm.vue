<template>
  <b-container fluid class="container-auction-details h-100">
    <div class="d-flex">
      <div class="items-list w-100">
        <div class="d-flex justify-content-between align-items-center">
          <h2 class="title">{{ $t('create_listing.product.confirm_auction.title') }}</h2>
        </div>
        <b-table
          class="mt-4 mb-3 auction-details-table"
          :items="auctionItems"
          :fields="tableColumns"
        >
          <template #head(reserve)="">
            <div class="reserve-info">
              {{ $t('create_listing.details.reserve') }}
              <img :src="infoIcon" class="icon-info position-absolute mt-n2 mr-n5 scale-2" alt="Info icon" />
            </div>
          </template>
          <template #cell(details)="row">
            <div class="d-flex align-items-center text-left">
              <ProductThumb :product="row.item.product" />
              <div class="ml-4">
                <div class="product-name">{{ row.item.product.name }}</div>
                <div class="product-sku text-capitalize">
                  {{ $t('sell.confirm_listing.sku') }}: {{ row.item.product.sku }}
                </div>
                <div class="product-sku text-capitalize">
                  {{ $t('common.colorway') }}: {{ row.item.color }},
                  &nbsp;{{ $t('common.size') }}: {{ row.item.size.size }}
                </div>
                <div class="product-sku text-capitalize">
                  {{ $t('common.box_condition') }}: {{ row.item.packaging_condition.name }}
                </div>
              </div>
            </div>
          </template>
          <template #cell(status)="row">
            <div v-if="row.item.status === 'scheduled'">
              <span>{{ $t(`create_listing.details.status.scheduled`) }}</span>&nbsp;<span class="schedule-date">{{ row.item.scheduled_date }}</span>
            </div>
            <div v-else>{{ $t(`create_listing.details.status.${row.item.status}`) }}</div>
          </template>
          <template #cell(starting_bid)="row">
            <span>{{ `$${row.item.start_bid_price}` }}</span>
          </template>
          <template #cell(reserve)="row">
            <div v-if="row.item.is_reserved">
              <span>{{ `$${row.item.reserve_price}` }}</span>
            </div>
            <div v-else>{{ $t('create_listing.details.no_reserve') }}</div>
          </template>
          <template #cell(duration)="row">
            {{
              `${row.item.time_limit} ${$t(
                'trades.create_listing.days'
              )}`
            }}
          </template>
          <template #cell(reserve_notice)="row">
            <div v-if="row.item.is_reserved" class="position-absolute d-flex align-items-start reserve-notice" >
              <img :src="infoIcon" class="icon-info scale-2" alt="Info icon" />
              {{$t('create_listing.details.reserve_fee_desc1')}}&nbsp;${{ row.item.reserve_price * 7.99 | formatPrice }}&nbsp;{{$t('create_listing.details.reserve_fee_desc2')}}
            </div>
          </template>
          <template #cell(actions)="row">
            <div class="d-flex align-items-center justify-content-center">
              <Button
                variant="link"
                class="btn-copy mr-2"
                :tooltip-text="$t('common.copy')"
                @click="cloneItem(row.item)"
              ></Button>
              <Button
                variant="link"
                class="btn-edit-inventory mr-2"
                :tooltip-text="$t('common.edit')"
                @click="editItem(row.item)"
              ></Button>
              <Button
                variant="link"
                class="btn-delete"
                :tooltip-text="$t('common.delete')"
                @click="deleteItem(row.item.id)"
              ></Button>
            </div>
          </template>
        </b-table>
      </div>
    </div>
    <div class="d-flex align-items-center justify-content-between mt-4">
      <div></div>
      <Button
        variant="outline-primary"
        pill
        @click="addMore"
      >{{ $t('create_listing.confirm.add_auction') }}</Button>
      <Button
        variant="primary"
        pill
        @click="saveAsDraft"
      >{{ $t('create_listing.confirm.save_draft') }}</Button>
      <Button
        variant="dark"
        pill
        @click="postAuctions"
      >{{ $t('create_listing.confirm.post_auction') }}</Button>
      <div></div>
    </div>
    <div class="mt-4 pt-4 mx-auto text-center w-75 body-4-normal">
      <div>{{ $t('create_listing.confirm.bottom_text', [SELLER_FEE, TRANSACTION_FEE]) }}</div>
    </div>
    <!-- Post Auctions Confirm Modal -->
    <b-modal id="post-auctions-modal" centered hide-footer hide-header size="md">
      <div class="text-right">
        <close-icon role="button" class="close-icon" @click="$bvModal.hide('post-auctions-modal')"></close-icon>
      </div>
      <div>
        <h5 class="mt-3 mb-4 mx-auto w-75">{{ $t('create_listing.product.confirm_auction.post_auctions_modal_text') }}</h5>
        <div class="my-4 d-flex justify-content-between w-75 mx-auto">
          <b-button class="px-5" variant="primary" pill @click="postAuctions">{{ $t('create_listing.product.confirm_auction.post_btn') }}</b-button>
          <b-button class="px-5" variant="outline-dark" pill @click="$bvModal.hide('post-auctions-modal')">{{ $t('common.cancel') }}</b-button>
        </div>
      </div>
    </b-modal>
    <!-- Post Auctions Success Modal -->
     <b-modal id="post-auctions-success-modal" hide-footer hide-header size="md">
      <div class="text-right">
        <close-icon role="button" class="close-icon" @click="$bvModal.hide('post-auctions-success-modal')"></close-icon>
      </div>
      <div class="text-center w-75 mx-auto my-2">
        <div class="success-text">{{ $t('create_listing.product.confirm_auction.success_msg') }}</div>
        <div class="d-flex align-items-center justify-content-center mx-auto mt-3 checkmark-icon">
          <CheckmarkIcon />
        </div>
      </div>
    </b-modal>
  </b-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import { Button } from '~/components/common';
import auctionValidation from '~/plugins/mixins/create-listing-auction'

import infoIcon from '~/assets/img/icons/info-blue.svg';
import CheckmarkIcon from '~/assets/img/icons/checkmark.svg?inline'
import CloseIcon from '~/assets/img/icons/close.svg?inline'
import { SELLER_FEE, TRANSACTION_FEE } from '~/static/constants';

export default {
  name: 'CreateListingProductConfirm',
  components: {
    Button,
    CheckmarkIcon,
    CloseIcon,
  },
  mixins: [auctionValidation],
  layout: 'Profile',
  data(){
    return {
      infoIcon,
      uploading: false,
      tableColumns: [
        {
          key: 'details',
          label: this.$t('create_listing.details.table_columns.details'),
          class: 'text-left details',
        },
        {
          key: 'duration',
          label: this.$t('create_listing.details.table_columns.duration'),
          class: 'text-center',
        },
        {
          key: 'reserve',
          label: this.$t('create_listing.details.table_columns.reserve'),
          class: 'text-center',
        },
        {
          key: 'starting_bid',
          label: this.$t('create_listing.details.table_columns.starting_bid'),
          class: 'text-center',
        },
        {
          key: 'status',
          label: this.$t('create_listing.details.table_columns.status'),
          class: 'text-center',
        },
        {
          key: 'actions',
          label: this.$t('create_listing.details.table_columns.actions'),
          class: 'text-center',
        },
        {
          key: 'reserve_notice',
          label: '',
          class: 'reserve-notice-cell',
        }
      ],
      SELLER_FEE,
      TRANSACTION_FEE,
    }
  },
  computed:{
    ...mapGetters({
      auctionItems: 'create-listing/getNonInventoryAuctionItems',
    }),
  },
  methods: {
    ...mapActions({
      auctionCreate: 'create-listing/auctionCreate',
      saveDraft: 'create-listing/saveDraft',
    }),
    postAuctions() {
      this.processing = true
      Promise.all(this.auctionItems.map(item => this.$axios.post('/inventories', {
          product_id: item.product.id,
          size_id: item.size_id,
          packaging_condition_id: item.packaging_condition_id,
          sale_price: item.product.retail_price,
          stock: 1,
          color_id: item.color_id,
        })
      )).then(values => {
          return this.auctionItems.map((item, idx) => {
            return this.auctionCreate({
              ...item,
              items: [{ inventory_id: values[idx].data.id, quantity: 1 }],
              type: 'single',
              reserve_price: item.reserve_price ? item.reserve_price * 100 : null,
              scheduled_date: new Date(item.scheduled_date).toISOString().slice(0, 19).replace('T', ' '),
            })
          })
        }).then(res => {
          this.processing = false
          this.$bvModal.show('post-auctions-success-modal')
          setTimeout(() => {
            // Redirect to auctions page
            this.$bvModal.hide('post-auctions-success-modal')
            this.$router.push('/auctions')
            this.$store.commit('create-listing/setNonInventoryAuctionItems', [])
          }, 3000)
        }).catch(err=> {
          this.$toasted.error(err.message)
          this.processing = false
        })
      
    },
    saveAsDraft() {
      this.processing = true
      Promise.all(this.auctionItems.map(item => this.$axios.post('/inventories', {
          product_id: item.product.id,
          size_id: item.size_id,
          packaging_condition_id: item.packaging_condition_id,
          sale_price: item.product.retail_price,
          stock: 1,
          color_id: item.color_id,
        })
      )).then(values => {
        return this.auctionItems.map((item, idx) => {
          return this.saveDraft({
            ...item,
            items: [{ inventory_id: values[idx].data.id, quantity: 1 }],
            type: 'single',
            reserve_price: item.reserve_price ? item.reserve_price * 100 : null,
            scheduled_date: new Date(item.scheduled_date).toISOString().slice(0, 19).replace('T', ' '),
          })
        })
      }).then(res => {
        this.$router.push({path: '/create-listing'})
        this.$toasted.success(this.$t('create_listing.confirm.draft_saved'))
        this.$store.commit('create-listing/setNonInventoryAuctionItems', [])
        this.processing = false
      }).catch(err=> {
        this.$toasted.error(err.message)
        this.processing = false
      })
    },
    cloneItem(item) {
      this.$store.commit('create-listing/addItemToNonInventoryAuctions', { ...item, id: this.randomStringId()})
    },
    editItem(item) {
      this.$store.commit('create-listing/setEditProductInventory', item)
      this.$router.push('/create-listing/product/edit')
    },
    deleteItem(id) {
      this.$store.commit('create-listing/deleteItemFromNonInventoryAuctions', id)
    },
    addMore() {
      this.$router.push('/create-listing/product/search')
    }
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

.container-auction-details
  padding: 47px 20px
  background-color: $color-white-5

  h2.title
    @include heading-3
    color: $color-black-1

.btn.btn-copy
  width: 30px
  height: 30px
  background-image: url('~/assets/img/product/actions.png')
  background-position: left
  border: none
  border-radius: 4px

.btn.btn-edit-inventory
  width: 30px
  height: 30px
  background-image: url('~/assets/img/product/actions.png')
  background-position: center
  border: none
  border-radius: 4px

.btn.btn-delete
  width: 30px
  height: 30px
  background-image: url('~/assets/img/product/actions.png')
  background-position: right
  border: none
  border-radius: 4px

</style>
