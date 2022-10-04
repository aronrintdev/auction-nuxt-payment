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
          <div class="d-flex align-items-center flex-column">
            <img
              :src="row.item.product.image || fallbackImage"
              alt="Product Picture"
              width="auto"
              class="img-fluid h-100"
              @error="imageLoadError"
            />

            <span class="listing-id text-decoration-underline">{{
              $t('placed_offers.listing_id', {
                listingID: getListingID(row.item),
              })
            }}</span>
          </div>
        </div>
      </template>
      <!-- Image -->

      <!-- Product Details -->
      <template #cell(product_details)="row">
        <div class="vd-product-title">
          {{ row.item.product.name }}
        </div>

        <div class="vd-sku">
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
          <div v-if="row.item.status === PENDING_OFFER" class="d-flex justify-content-center">
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
          label: this.$t('placed_offers.table.products'),
          sortable: true,
        },
        {
          key: 'product_details',
          label: '',
          sortable: false,
        },
        {
          key: 'offer_amount',
          label: this.$t('placed_offers.table.offer_amount'),
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          key: 'expires',
          label: this.$t('placed_offers.table.expires'),
          sortable: true,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          key: 'actions',
          label: this.$t('placed_offers.table.actions'),
          sortable: true,
          thClass: 'text-center ',
          tdClass: 'text-center action-width',
        },
      ],
      productImageWidth: PRODUCT_IMG_WIDTH,
      fallbackUrl: PRODUCT_FALLBACK_URL,
      selectedId: '',
      inputAmount: '',
      actionType: '',
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
      const details = value
      let id = null
      details.product.inventories.forEach((element) => {
        if (value.size_id === element.size_id) {
          if (element.listing_items && element.listing_items.length) {
            id = element.listing_items[0].id
          }
        }
      })
      return id || null
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
  font-style: normal
  font-family: $font-sp-pro
  @include body-5-bold
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
  font-style: normal
  @include body-4-normal
  color: $color-black-1
.remove-from-list
  font-style: normal
  @include body-4-normal
  color: $color-red-3
:deep(.offers-table-head > th)
  display: none
.listing-id
  font-style: normal
  @include body-5-bold
  color: $color-blue-1

#validator-field
  @media (min-width: 1330px)
    max-width: 70%
</style>
