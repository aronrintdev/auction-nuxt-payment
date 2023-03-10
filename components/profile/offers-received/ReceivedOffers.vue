<template>
  <div class="offer-placed-table vendor-dashboard-body">
    <!-- Offers -->
    <b-table
      borderless
      responsive
      :fields="fields"
      :items="offers"
      :busy="isBusy"
      show-empty
      class="offer-table"
      tbody-class="offers-table-head"
      tbody-tr-class="bg-white vd-selling-bt border-bottom-solid"
    >
      <template #head()="scope">
        <div class="text-nowrap" role="button" @click="orderBy(scope)">
          <span class="mr-1">{{ scope.label }}</span>
          <img v-if="isSortActive(scope.field)"
               :src="require('~/assets/img/icons/down-arrow-solid.svg')"
               :alt="scope.label"
               class="sort-icon" :class="reverseDirection(scope.column)">
        </div>
      </template>

      <!-- Table Busy -->
      <template #table-busy>
        <div class="text-center my-2">
          <b-spinner class="align-middle"></b-spinner>
        </div>
      </template>
      <!-- ./Table busy -->

      <template #cell(checkbox)="row" class="check-box">
        <div v-if="showCheckBox" class="checkbox-col">
          <b-form-checkbox
            :id="`checkbox-${row.item.id}`"
            v-model="selectedVal"
            :value="row.item.id"
            :checked="selected"
            class="vd-checkbox"
            name="checkbox-move-items"
            @change="toggleSelect(row.item.id)"
          >
          </b-form-checkbox>
        </div>
      </template>

      <!-- Image -->
      <template #cell(products)="row">
        <div class="img-col">
          <div class="d-flex align-items-start flex-column">
            <img
              :src="row.item.product.image || fallbackImage"
              alt="Product Picture"
              width="auto"
              class="img-fluid h-100"
              @error="imageLoadError"
            />

            <span
              role="button"
              class="listing-id text-decoration-underline"
              @click="
                $router.push(
                  `/profile/vendor-selling/details/${getListingID(row.item)}`
                )
              "
              >{{
                $t('placed_offers.listing_id', {
                  listingID: getListingID(row.item),
                })
              }}</span
            >
          </div>
        </div>
      </template>
      <!-- Image -->

      <!-- Product Details -->
      <template #cell(product_details)="row">
        <div class="vd-product-title">
          {{ row.item.product.name }}
        </div>

        <div class="vd-sku text-uppercase">
          {{ $t('shopping_cart.sku') }}&colon;
          <span>{{ row.item.product.sku }}</span>
        </div>

        <div class="vd-color">
          {{ $t('shopping_cart.color_way') }}&colon;
          <span>{{ row.item.product.colorway }}</span>
        </div>

        <div class="vd-size">
          {{ $t('selling_page.size') }}&colon;
          <span>{{ row.item.size.size }}</span>
        </div>
      </template>
      <!-- ./Product Details -->

      <!-- Offer Amount -->
      <template #cell(offer_amount)="row">
        <div class="offer-amount">
          <span>{{ row.item.bid_price | toCurrency('USD', 'N/A') }} </span>
        </div>
      </template>
      <!-- ./Offer Amount -->

      <template #cell(expires)="row">
        <div class="expire-date">
          <span>{{ row.item.created_at | formatDate('DD/MM/YYYY') }}</span>
        </div>
      </template>

      <template #cell(actions)="row" class="text-center">
        <div class="action-col">
          <div
            v-if="row.item.status === PENDING_OFFER"
            class="d-flex justify-content-center"
          >
            <Button
              variant="outline-success mr-4"
              class="br-10"
              @click="acceptOrDeclineOffer(row.item, ACCEPT)"
            >
              {{ $t('common.accept') }}
            </Button>
            <Button
              variant="outline-danger"
              class="br-10"
              @click="acceptOrDeclineOffer(row.item, DECLINE)"
            >
              {{ $t('common.decline') }}
            </Button>
          </div>
          <div v-else>
            <div
              :class="`offer-status-${getStatus(row.item.status)}`"
              class="text-center mx-auto d-flex"
            >
              <span class="text-capitalize m-auto text-center">{{
                getStatus(row.item.status)
              }}</span>
            </div>
          </div>
        </div>
      </template>
    </b-table>

    <!-- Accept Offer -->
    <ConfirmModal
      id="accept-offer-modal"
      :message="
        $t('selling_page.offer.content', {
          type: acceptOrDecline,
          price: amount,
        })
      "
      :confirmLabel="$t('selling_page.confirm')"
      @confirm="onConfirm"
      @cancel="onConfirmDiscard"
    />
    <!-- Accept Offer -->

    <!-- Reject Offer -->
    <ConfirmModal
      id="reject-offer-modal"
      :message="
        $t('selling_page.offer.reject_content', {
          type: acceptOrDecline,
          price: amount,
        })
      "
      :confirmLabel="$t('selling_page.confirm')"
      @confirm="onConfirm"
      @cancel="onConfirmDiscard"
    />
    <!-- ./Reject Offer -->
  </div>
</template>

<script>
import {
  PRODUCT_IMG_WIDTH,
  PRODUCT_FALLBACK_URL,
  PENDING_OFFER,
  AWAITING_RESPONSE,
  ACCEPTED_OFFER,
  DECLINED_OFFER,
  ACCEPT,
  DECLINE,
} from '~/static/constants'
import { ConfirmModal } from '~/components/modal'
import { Button } from '~/components/common'
export default {
  name: 'PlacedOffers',
  components: {
    Button,
    ConfirmModal,
  },

  props: {
    offers: {
      type: Array,
      default: () => [],
    },

    isBusy: {
      type: Boolean,
      default: false,
    },

    showCheckBox: {
      type: Boolean,
      required: true,
    },

    selected: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      acceptOrDecline: null,
      amount: null,
      offerId: null,
      ACCEPTED_OFFER,
      DECLINED_OFFER,
      PENDING_OFFER,
      ACCEPT,
      DECLINE,
      selectedVal: [],
      edit: null,
      fields: [
        {
          key: 'checkbox',
          label: '',
          sortable: false,
        },
        {
          key: 'products',
          label: this.$tc('common.product', 1),
          sortable: true,
          thClass: 'active-row',
        },
        {
          key: 'product_details',
          label: '',
          sortable: false,
        },
        {
          key: 'offer_amount',
          label: this.$t('placed_offers.table.offer_amount'),
          sortable: true,
          thClass: 'text-center active-row',
          tdClass: 'text-center',
        },
        {
          key: 'expires',
          label: this.$t('placed_offers.table.expires'),
          sortable: true,
          thClass: 'text-center active-row',
          tdClass: 'text-center',
        },
        {
          key: 'actions',
          label: this.$t('placed_offers.table.actions'),
          sortable: true,
          thClass: 'text-center active-row',
          tdClass: 'text-center action-width',
        },
      ],
      productImageWidth: PRODUCT_IMG_WIDTH,
      fallbackUrl: PRODUCT_FALLBACK_URL,
      selectedId: '',
      inputAmount: '',
      actionType: '',
      orderByField: 'id',
      orderByDirection: 'asc',
    }
  },

  computed: {
    fallbackImage: (vm) => {
      return `${vm.fallbackUrl}${vm.productImageWidth}`
    },
  },

  watch: {
    showCheckBox(value) {
      if (value === false) {
        this.selectedVal = []
      }
    },

    selected() {
      this.selectedVal = this.selected
    },
  },

  methods: {
    // Image on load error
    imageLoadError(event) {
      event.target.src = `${this.fallbackUrl}${this.productImageWidth}`
    },

    // Get the status of item.
    getStatus(status) {
      if (status === PENDING_OFFER) {
        return AWAITING_RESPONSE
      }
      return status
    },

    getValidationState({ dirty, validated, valid = null }) {
      // Returns the contextual state (validation style) of the element being validated (false for invalid, true for valid, or null for no validation state)
      return dirty || validated ? valid : null
    },

    // on accept offer emit.
    acceptOrDeclineOffer(val, type) {
      this.selectedId = val.id
      this.actionType = type
      this.amount = this.$root.$options.filters.formatPrice(val.bid_price)
      type === 'accept'
        ? this.$bvModal.show('accept-offer-modal')
        : this.$bvModal.show('reject-offer-modal')
    },

    // On accept offer confirm.
    onConfirm() {
      this.$axios
        .put(`/listing-items/offers/${this.actionType}/${this.selectedId}`)
        .then((res) => {
          this.$toasted.success(this.$t(res.data.message))
          this.$emit('reloadOffers')
          this.$nuxt.refresh()
        })
        .catch((err) => {
          this.$toasted.error(this.$t(err.response.data))
        })
    },

    // On discard
    onConfirmDiscard() {
      this.selectedId = null
      this.amount = null
    },

    // Update the amount
    updateAmount(id) {
      this.$axios
        .patch(`/offers/${id}`, {
          amount: this.inputAmount * 100,
        })
        .then((res) => {
          this.inputAmount = ''
          this.$toasted.success(this.$t(res.data.message))
          this.$emit('reloadOffers')
        })
        .catch((err) => {
          this.inputAmount = ''
          this.$logger.logToServer('Update offers:', err.response)
        })
    },

    // On item check box click, emit the id.
    toggleSelect(checked) {
      this.$emit('selectedItem', checked)
    },

    // Get the listing ID.
    getListingID(value) {
      const productId = value.product_id
      const sizeId = value.size_id
      const conditionId = value.packaging_condition_id

      const result = value.product.inventories.find(
        (i) =>
          i.size_id === sizeId &&
          i.product_id === productId &&
          i.packaging_condition_id === conditionId
      )
      if (result && result.listing_items.length) {
        return result.listing_items[0].id
      } else {
        return '--'
      }
    },

    isSortActive(field){
      return field.sortable
    },
    orderBy(field){
      if (this.isSortActive(field.field)){
        this.orderByDirection = this.reverseDirection(field.column)
        this.orderByField = field.column
        this.$emit('sort', {
          orderByField: this.orderByField,
          orderByDirection: this.orderByDirection,
        })
      }
    },
    reverseDirection(column){
      return column === this.orderByField? (this.orderByDirection === 'asc'? 'desc' : 'asc'): 'desc'
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.offer-placed-table
  font-family: $font-sp-pro
  font-style: normal
.img-col
  img
    width: 113.1px
:deep(.btn-outline-danger)
  font-family: $font-sp-pro
  font-style: normal
  @include body-4-normal
  color: $color-red-3
.vd-product-title
  font-family: $font-sp-pro
  font-style: normal
  @include body-8-medium
  color: $color-black-1
.vd-sku,
.vd-color,
.vd-size
  font-style: normal
  font-family: $font-sp-pro
  @include body-5-normal
  color: $color-gray-6
.offer-status-awaiting,
.offer-status-pending
  width: 157px
  height: 34px
  background: $color-gray-70
  border-radius: 4px
  .text-capitalize
    font-style: normal
    @include body-5-normal
    color: $color-gray-25

.btn-outline-success
  font-family: $font-sp-pro
.btn-outline-danger
  font-family: $font-sp-pro
.offer-amount
  font-family: $font-sf-pro-text
  font-style: normal
  @include body-13-normal
  color: $color-black-1

.remove-from-list
  font-style: normal
  @include body-4-normal
  color: $color-red-3
:deep(.offers-table-head > th)
  display: none
.listing-id
  font-family: $font-sf-pro-text
  font-style: normal
  @include body-5-bold
  color: $color-blue-1

#validator-field
  @media (min-width: 1330px)
    max-width: 70%
.action-col
  .offer-status-accepted
    width: 141px
    height: 34px
    color: $color-green-3
    background: $color-green-25
    border-radius: 4px
    .text-capitalize
      font-family: $font-sp-pro
      font-style: normal
      @include body-13-normal
      color: $color-green-3
  .offer-status-declined
    width: 141px
    height: 34px
    background: $color-red-23
    border-radius: 4px
    .text-capitalize
      font-family: $font-sp-pro
      font-style: normal
      @include body-13-normal
      color: $color-red-3
.offer-placed-table::v-deep
  .offer-table
    .vd-selling-bt
      border-top: 10px $color-white-4 solid
    .table td, .table th
      padding-bottom: 0px
    .table.b-table > thead > tr > [aria-sort=none]
      background-size: 0px
      padding-right: 0px
    .table.b-table > thead > tr > [aria-sort=ascending]
      background-size: 0px
      padding-right: 0px
    .table.b-table > thead > tr > [aria-sort=descending]
      background-size: 0px
      padding-right: 0px
    .expire-date
      font-family: $font-sp-pro
      font-style: normal
      @include body-13-normal
      color: $color-black-1

    .active-row
      div
        width: 116px
        height: 20px
        left: 769px
        top: 453px
        font-family: $font-montserrat
        font-style: normal
        @include body-4-bold
        display: inline
        align-items: center
        color: $color-black-1
  .action-col
    .btn-outline-success
      width: 115px
      left: calc(50% - 115px/2 + 463.5px)
      top: 57.08%
      bottom: 41.07%
      border: 1px solid $color-green-2
      border-radius: 10px
      font-family: $font-sp-pro
      font-style: normal
      @include body-13-normal
      display: flex
      align-items: center
      text-align: center
      color: $color-green-2

    .btn-outline-danger
      width: 115px
      left: calc(50% - 115px/2 + 602.5px)
      top: 57.14%
      bottom: 41.02%
      border: 1px solid $color-red-3
      border-radius: 10px
      font-family: $font-sp-pro
      font-style: normal
      @include body-13-normal
      display: flex
      align-items: center
      text-align: center
      color: $color-red-3
.sort-icon
  &.asc
    transform: rotate(180deg)
</style>
