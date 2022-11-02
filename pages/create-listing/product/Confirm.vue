<template>
  <b-container fluid class="container-auction-details h-100">
    <div class="d-flex flex-column flex-md-row h-md-100">
      <div class="d-none d-md-block items-list pt-4 px-3 flex-grow-1">
        <div class="d-flex justify-content-between align-items-center">
          <h2 class="title">{{ $t('create_listing.product.confirm_auction.title') }}</h2>
        </div>
        <b-table
          class="mt-4 mb-3 auction-details-table"
          :items="auctionItems"
          :fields="tableColumns"
        >
          <template #head(reserve)>
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
      <div v-for="(item, index) in auctionItems" :key="index" class="auction-item d-md-none">
        <div class="auction-item-title">{{$t('create_listing.confirm.auction_number')}}{{index+1}}</div>
        <div class="item d-flex flex-column bg-white h-md-100 w-100 rounded-md">
          <div class="position-relative d-flex flex-column justify-content-between">
            <b-dropdown id="dropdown-right" right variant="link" no-caret class="d-md-none position-absolute more-btn">
              <template #button-content >
                <img src="~/assets/img/icons/vertical-three-dots-icon.svg" />
              </template>
              <b-dropdown-item @click="deleteItem(item.id)">{{ $t('common.delete') }}</b-dropdown-item>
            </b-dropdown>
            <div class="detail-section d-flex flex-grow-1">
              <b-row>
                <b-col sm="3" md="2">
                  <ProductThumb :product="item.product" />
                </b-col>
                <b-col sm="9" md="10" class="pl-2">
                  <b-row class="mb-2 d-block">
                    <div class="body-4-bold mb-2 product-name">{{ item.product.name }}</div>
                    <div class="body-4-normal mb-2 text-gray-6 text-uppercase product-sku">
                      {{ $t('shopping_cart.sku') }}&colon;&nbsp;{{ item.product.sku }}
                    </div>
                    <div class="body-4-normal mb-2 text-gray-6 product-color">
                      {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{ item.product.colorway }}, {{ $t('shopping_cart.size') }}&colon;&nbsp;{{item.size.size }}
                    </div>
                    <div class="body-4-normal mb-2 text-gray-6 product-condition">
                      {{ $t('products.box_condition') }}&colon;&nbsp;{{item.packaging_condition.name}}
                    </div>
                  </b-row>
                </b-col>
              </b-row>
            </div>
            <div class="d-flex align-items-center justify-content-between px-3 py-2">
              <div class="label">{{ $t('create_listing.details.table_columns.status') }}:</div>
              <div class="value">{{ item.status }}</div>
            </div>
            <div class="d-flex align-items-center justify-content-between px-3 background-gray py-2">
              <div class="label">{{ $t('create_listing.details.table_columns.duration') }}:</div>
              <div class="value">{{ item.time_limit }} {{ $t('create_listing.details.days') }}</div>
            </div>
            <div class="d-flex align-items-center justify-content-between px-3 py-2">
              <div class="label">{{ $t('create_listing.details.table_columns.reserve') }}:</div>
              <div class="value">{{ item.is_reserved ? `$${item.reserve_price}` :  $t('create_listing.confirm.no_reserve') }}</div>
            </div>
            <div class="d-flex align-items-center justify-content-between px-3 background-gray py-2">
              <div class="label">{{ $t('create_listing.details.table_columns.starting_bid') }}:</div>
              <div class="value">${{ item.start_bid_price }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Add Button -->
    <div class="d-md-none text-right mt-3">
      <img
        src="~/assets/img/icons/plus-icon-gray.svg"
        class="add-more-mobile-btn"
        role="button"
        @click="addMore"
      />
    </div>

    <div class="d-none d-md-flex align-items-center justify-content-between mt-4">
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
    <div class="mt-5 mx-auto text-center w-100 w-md-75 body-4-normal bottom-text">
      <div>{{ $t('create_listing.confirm.bottom_text', [SELLER_FEE, TRANSACTION_FEE]) }}</div>
    </div>

    <div class="d-flex d-md-none py-4">
      <Button
        variant="primary"
        pill
        class="flex-grow-1 mr-4 text-nowrap mobile-btns save-as-draft"
        @click="saveAsDraft"
      >
        {{ $t('create_listing.confirm.save_as_draft') }}
      </Button>
      <Button
        variant="dark"
        class="flex-grow-1 text-nowrap mobile-btns"
        pill
        @click="postAuctions"
      >
        {{ $t('create_listing.confirm.post_listings') }}
      </Button>
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
      setAuctionItems: 'create-listing/setAuctionItemsAction',
    }),
    postAuctions() {
      this.processing = true
      Promise.all(this.auctionItems.map(item => this.$axios.post('/inventories', {
          product_id: item.product.id,
          size_id: item.size_id,
          packaging_condition_id: item.packaging_condition_id,
          sale_price: item.product.retail_price < 5001 ? 5001 : item.product.retail_price,
          stock: item.quantity,
          color_id: item.color_id,
        })
      )).then(values => {
          const auctions = this.auctionItems.map((item, idx) => ({
            ...item,
            items: [{ inventory_id: values[idx].data.id, quantity: 1 }],
            item: {
              inventory_id: values[idx].data.id,
              product: item.product,
              packaging_condition: item.packaging_condition,
              size: item.size,
              quantity: 1
            },
            type: 'single',
            reserve_price: item.reserve_price ? item.reserve_price * 100 : null,
            scheduled_date: new Date(item.scheduled_date).toISOString().slice(0, 19).replace('T', ' '),
          }))
          this.setAuctionItems(auctions)
          this.$router.push('/create-listing/details')
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
          sale_price: item.product.retail_price < 5001 ? 5001 : item.product.retail_price,
          stock: item.quantity,
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

.container-auction-details
  @media (max-width: 576px)
    padding: 0 16px
    background: transparent
      
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
                font-weight: $medium
              &-sku,
              &-size,
              &-color,
              &-condition
                font-weight: $regular
                font-size: 13px
                line-height: 16px
                color: $color-gray-6
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
    .add-more-mobile-btn.btn
      width: 42px
      height: 42px
    .bottom-text
      font-weight: $normal
      font-size: 12px
      line-height: 140%
      background: $color-white-5
      padding: 6px 12px
    .mobile-btns
      font-weight: $medium
      font-size: 13px
      line-height: 16px
      &.save-as-draft
        background: $color-blue-20
        border-color: $color-blue-20
</style>
