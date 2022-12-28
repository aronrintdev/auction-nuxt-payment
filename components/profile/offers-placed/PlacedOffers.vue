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
      <template #empty="scope">
        <h4 class="text-center">{{ scope.emptyText }}</h4>
      </template>


      <!-- Table header col begin -->
      <template #head()="scope">
        <div class="text-nowrap" role="button" @click="orderBy(scope)">
          <span class="mr-1">{{ scope.label }}</span>
          <img
            v-if="scope.field.sortable"
            :src="require('~/assets/img/icons/down-arrow-solid.svg')"
            :alt="scope.label"
            class="sort-icon"
            :class="reverseDirection(scope.column)"
          />
        </div>
      </template>
      <!-- Table header col end -->

      <!-- Table Busy -->
      <template #table-busy>
        <div class="text-center my-2">
          <b-spinner class="align-middle"></b-spinner>
        </div>
      </template>
      <!-- ./Table busy -->

      <template #cell(checkbox)="row">
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
          <img
            :src="row.item.product.image || fallbackImage"
            alt="Product Picture"
            width="auto"
            class="img-fluid"
            @error="imageLoadError"
          />
        </div>
        <!-- TODO: Harcoded for now. -->
        <span class="listing-id">{{
          $t('placed_offers.listing_id', { listingID: getListingID(row.item) })
        }}</span>
        <!-- TODO: Harcoded for now. -->
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
        <div class="offer-amount text-center">
          <span v-if="!row.item.isEditing" @click="editAmount(row.item)"
            >{{ row.item.bid_price | toCurrency('USD', 'N/A') }}
            <Button
              variant="edit-offer"
              class="p-0 ml-2"
              :tooltip-text="$t('common.edit')"
            ></Button>
          </span>

          <span
            v-else
            id="editOffer"
            class="d-flex justify-content-center m-auto"
          >
            <ValidationObserver ref="observer">
              <form @submit.prevent="onSubmit(row.item)">
                <ValidationProvider
                  id="validator-field"
                  v-slot="{ errors }"
                  rules="required"
                  :name="$t('selling_page.offer_amount')"
                >
                  <span class="d-flex">
                    <b-form-input
                      id="offeramountInput"
                      v-model="inputAmount"
                      type="text"
                      class="form-control"
                    ></b-form-input>
                    <Button
                      type="submit"
                      variant="update-offer"
                      class="p-0 ml-3"
                      :tooltip-text="$t('common.edit')"
                    ></Button>
                  </span>
                  <div id="inputLiveFeedback" class="invalid-feedback d-block">
                    {{ errors[0] }}
                  </div>
                </ValidationProvider>
              </form>
            </ValidationObserver>
          </span>
        </div>
      </template>
      <!-- ./Offer Amount -->

      <!-- Expires -->
      <template #cell(expires)="row">
        <div class="expire-date">
          <span>{{ row.item.created_at | formatDate('DD/MM/YYYY') }}</span>
        </div>
      </template>
      <!-- ./Expires -->

      <!-- Status -->
      <template #cell(status)="row">
        <div
          :class="`offer-status-${getStatus(row.item.status)}`"
          class="text-center d-flex"
        >
          <span class="text-capitalize m-auto text-center">{{
            getStatus(row.item.status)
          }}</span>
        </div>
      </template>
      <!-- ./Status -->

      <template #head(actions)="data">
        <div class="d-flex">
          <span>{{ $t(data.field.label) }}</span>
        </div>
      </template>

      <template #cell(actions)="row" class="text-center">
        <div class="action-col">
          <Button
            v-if="row.item.status !== ACCEPTED_OFFER"
            id="delete-btn"
            variant="outline-danger"
            @click="deleteOffer(row.item.id, 'delete')"
          >
            {{ $t('common.delete') }}
          </Button>
          <div v-else>
            <span
              role="button"
              class="remove-from-list"
              @click="deleteOffer(row.item.id, 'remove')"
              >{{ $t('placed_offers.remove_from_list') }}</span
            >
          </div>
        </div>
      </template>
    </b-table>

    <!-- Confirm delete -->
    <ConfirmModal
      id="delete-modal"
      :message="
        actionType === 'delete'
          ? $t('placed_offers.delete_message')
          : $t('placed_offers.remove_from_list_message')
      "
      :confirmLabel="$t('selling_page.confirm')"
      @confirm="onConfirm"
      @cancel="onConfirmDiscard"
    />
    <!-- Confirm delete -->
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  PRODUCT_IMG_WIDTH,
  PRODUCT_FALLBACK_URL,
  PENDING_OFFER,
  AWAITING_RESPONSE,
  ACCEPTED_OFFER,
} from '~/static/constants'
import { ConfirmModal } from '~/components/modal'
import { Button } from '~/components/common'
export default {
  name: 'PlacedOffers',

  components: {
    Button,
    ConfirmModal,
    ValidationProvider,
    ValidationObserver,
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
      ACCEPTED_OFFER,
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
          sortable: false,
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
          thClass: 'text-center active-row',
          sortable: true,
        },
        {
          key: 'expires',
          label: this.$t('placed_offers.table.expires'),
          sortable: true,
          thClass: 'active-row',
        },
        {
          key: 'status',
          label: this.$t('placed_offers.table.status'),
          sortable: true,
          thClass: 'active-row',
        },
        {
          key: 'actions',
          label: this.$t('placed_offers.table.actions'),
          sortable: false,
          thClass: 'active-row',
        },
      ],
      productImageWidth: PRODUCT_IMG_WIDTH,
      fallbackUrl: PRODUCT_FALLBACK_URL,
      selectedId: '',
      inputAmount: '',
      actionType: '',
      orderByDirection: 'asc',
      orderByField: 'id'
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

    // Delete offer on clikc
    deleteOffer(id, type) {
      this.actionType = type
      this.selectedId = id
      this.$bvModal.show('delete-modal')
    },

    // On delete offer confirm.
    onConfirm() {
      this.$axios
        .delete(`/offers/${this.selectedId}`)
        .then((res) => {
          this.$toasted.success(this.$t(res.data.message))
          this.$emit('reloadOffers', {
            order_by_column: this.orderByField,
            order_by_direction: this.orderByDirection,
          })
          this.$nuxt.refresh()
        })
        .catch((err) => {
          this.$logger.logToServer('Delete Offers', err.response)
        })
    },

    // On discard
    onConfirmDiscard() {
      this.selectedId = ''
      this.$bvModal.hide('delete-modal')
    },

    // On edit icon click
    editAmount(item) {
      if (!this.selectedId || this.selectedId === item.id) {
        if (item.isEditing) {
          this.selectedId = ''
          item.isEditing = false
          if (this.inputAmount) {
            this.updateAmount(item.id)
          }
        } else {
          this.selectedId = item.id
          this.$set(item, 'isEditing', true)
        }
      }
    },

    // On edit submit.
    onSubmit(val) {
      this.$refs.observer.validate().then((success) => {
        if (success) {
          this.editAmount(val)
        }
      })
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
          this.$emit('reloadOffers', {
            order_by_column: this.orderByField,
            order_by_direction: this.orderByDirection,
          })
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

    orderBy(scope) {
      if(scope.column !== 'actions') {
        this.orderByDirection = this.reverseDirection(scope.column)
        this.orderByField = scope.column
        this.$emit('reloadOffers', {
          order_by_column: this.orderByField,
          order_by_direction: this.orderByDirection,
        })
      }
    },
    reverseDirection(column) {
      return column === this.orderByField
        ? this.orderByDirection === 'asc'
          ? 'desc'
          : 'asc'
        : 'desc'
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.img-col
  img
    height: 70px
:deep(.btn-outline-danger)
  font-family: $font-sp-pro
  font-style: normal
  @include body-4-normal
  color: $color-red-3
.vd-product-title
  font-family: $font-sp-pro
  font-style: normal
  @include body-5-normal
  color: $color-black-1
.vd-sku,
.vd-color,
.vd-size
  font-family: $font-sp-pro
  font-style: normal
  @include body-5-normal
  color: $color-gray-6
.offer-status-awaiting,
.offer-status-pending
  width: 157px
  height: 34px
  background: $color-gray-70
  border-radius: 4px
  .text-capitalize
    color: $color-gray-25
    font-family: $font-sp-pro
    font-style: normal
    @include body-13-normal

.offer-status-accepted
  width: 141px
  height: 34px
  color: $color-green-3
  border-radius: 4px
  background: $color-green-21
  .text-capitalize
    font-family: $font-sp-pro
    font-style: normal
    @include body-13-normal
    color: $color-white-1

.offer-amount
  font-style: normal
  @include body-4-normal
  color: $color-black-1
  font-family: $font-sf-pro-text
.remove-from-list
  font-family: $font-sp-pro
  font-style: normal
  @include body-13-normal
  color: $color-red-3
.btn-edit-offer
  width: 30px
  height: 30px
  background-image: url('~/assets/img/box-pencil.svg')
  background-position: center
  border: none
  border-radius: 4px
.btn-update-offer
  width: 45px
  height: 30px
  background-image: url('~/assets/img/icons/Circle-OK.png')
  background-repeat: no-repeat
  background-position: center
  border: none
  border-radius: 4px
:deep(.offers-table-head > th)
  display: none
.listing-id
  font-style: normal
  @include body-5-bold
  text-decoration-line: underline
  color: $color-blue-1
  font-family: $font-sf-pro-text

#validator-field
  @media (min-width: 1330px)
    max-width: 70%
#editOffer
  width: 18rem
.th-arrow
  width: 9px
  margin-left: 4px
.offer-placed-table::v-deep
  .offer-table
    .vd-selling-bt
      border-top: 10px $color-white-4 solid
    .table td, .table th
      padding-bottom: 0px
    .table.b-table > thead > tr > [aria-sort=none]
      background-size: 0px
    .table.b-table > thead > tr > [aria-sort=ascending]
      background-size: 0px
    .table.b-table > thead > tr > [aria-sort=descending]
      background-size: 0px
    .expire-date
      font-family: $font-sp-pro
      font-style: normal
      @include body-13-normal
      color: $color-black-1
    .active-row
      div
        width: 116px
        height: 20px
        font-family: $font-montserrat
        font-style: normal
        @include body-4-bold
        color: $color-black-1
    .table::v-deep
      .offers-table-head
        .vd-selling-bt
          width: 1121px
          height: 134px
          left: 291px
          top: 629px
  .action-col
    #delete-btn
      font-family: $font-sp-pro
      font-style: normal
      @include body-13-normal
      width: 141px
      height: 34px

.sort-icon
  &.asc
    transform: rotate(180deg)
</style>
