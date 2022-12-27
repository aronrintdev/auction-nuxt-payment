<template>
  <b-container fluid class="container-profile-inventory-confirm h-100">
    <h2 v-if="!isScreenXS" class="title mt-5">
      {{ $t('createlisting.confirm_listing') }}
    </h2>
    <!-- No Listing -->
    <template v-if="showEmpty">
      <EmptyListing />
    </template>
    <!-- ./ No Listing -->
    <!-- Show Listing -->
    <template v-else>
      <b-table-simple
        v-if="!isScreenXS"
        class="mt-5 w-100 table-inventory"
        responsive="sm"
        borderless
      >
        <b-thead>
          <b-tr>
            <b-th class="p-3">{{ $t('common.details') }}</b-th>
            <b-th class="text-center p-3" colspan="5"></b-th>
            <b-th class="text-center p-3">{{ $t('common.quantity') }}</b-th>
            <b-th class="text-center p-3">{{ $t('common.min_offer') }}</b-th>
            <b-th class="text-center p-3">{{ $t('common.price') }}</b-th>
            <b-th class="text-center p-3">{{ $tc('common.action', 2) }}</b-th>
          </b-tr>
        </b-thead>
        <b-tbody v-if="confirmData || confirmData.length">
          <b-tr
            v-for="(listingItem, index) in confirmData"
            :key="index"
            class="inventory-row"
          >
            <!-- Image and product details -->
            <b-td class="d-flex align-items-center p-3">
              <ProductThumb
                :product="listingItem.product"
                width="63"
                height="63"
                class="mr-4"
              />
            </b-td>
            <!-- ./Image and product details -->
            <b-td colspan="5">
              <div>
                <div class="title mb-3">{{ listingItem.product.name }}</div>
                <div class="info mb-1">
                  {{ $t('common.sku') + ': ' + listingItem.product.sku }}
                </div>
                <div class="info mb-3">
                  {{
                    $t('common.colorway') + ': ' + listingItem.product.colorway
                  }}
                </div>
                <div class="info mb-3">
                  {{ $tc('common.size', 1) + ': ' + getSize(listingItem) }}
                </div>
                <div class="info">
                  {{
                    $t('common.box_condition') +
                    ': ' +
                    getPackagingCondition(listingItem)
                  }}
                </div>
              </div>
            </b-td>
            <!-- Quantity -->
            <b-td
              v-if="$route.query.path !== 'from-inventory'"
              class="p-3 text-center"
            >
            </b-td>
            <b-td v-else>
              <b-form-group
                id="input-group-1"
                class="text-center"
                :class="
                  (listingItem.quantity < quantityMinVal ||
                    listingItem.quantity > listingItem.stock) &&
                  'error'
                "
              >
                <span class="text-danger error-text">
                  {{
                    !listingItem.quantity ||
                    listingItem.quantity > listingItem.stock
                      ? $t('createlisting.error.field', {
                          field: $t('common.quantity').toLowerCase(),
                        })
                      : ''
                  }}
                </span>
                <FormInput
                  :value="listingItem.quantity"
                  :placeholder="$t('createlisting.enter_quantity')"
                  class="input-error custom-input"
                  required
                  integer
                  :pill="false"
                  :bordered="false"
                  :backgroundColor="`background-muted`"
                  @input="handleQuantityChange($event, index)"
                />
                <template #description>
                  {{
                    $t('createlisting.out_of_', { count: listingItem.stock })
                  }}
                </template>
              </b-form-group>
            </b-td>
            <!-- ./Quantity -->

            <!-- Min Offer Amount -->
            <b-td
              v-if="$route.query.path !== 'from-inventory'"
              class="p-3 text-center"
            >
              {{ listingItem.minOfferAmount | toCurrency }}
            </b-td>
            <b-td v-else>
              <b-form-group
                id="input-group-1"
                class="text-center minOfferInput"
                :class="listingItem.minOfferAmount <= 0 && 'error'"
              >
                <span class="text-danger error-text">{{
                  listingItem.minOfferAmount &&
                  listingItem.minOfferAmount > minOfferMinVal
                    ? ''
                    : $t('createlisting.error.field', {
                        field: $t('createlisting.minOfferAmount'),
                      })
                }}</span>
                <FormInput
                  :value="listingItem.minOfferAmount"
                  :placeholder="$t('createlisting.enter_min_offer_amount')"
                  class="input-error custom-input"
                  prefix="$"
                  required
                  integer
                  :pill="false"
                  :bordered="false"
                  :backgroundColor="`background-muted`"
                  @input="handleMinOfferPriceChange($event, index)"
                />

                <template #description>
                  <span class="h-20"></span>
                </template>
              </b-form-group>
            </b-td>
            <!-- ./Min Offer Amount -->

            <!-- Price -->
            <b-td class="p-3 text-center price-text">
              {{
                listingItem.price
                  ? listingItem.price
                  : listingItem.sale_price | toCurrency
              }}
            </b-td>
            <!-- Price -->

            <!-- Actions -->
            <b-td class="p-3">
              <div class="d-flex justify-content-center align-items-center">
                <Button
                  variant="link"
                  class="btn-copy mr-2"
                  :tooltip-text="$t('common.copy')"
                  @click="handleCopy(listingItem)"
                ></Button>
                <Button
                  variant="link"
                  class="btn-edit-inventory mr-2"
                  :tooltip-text="$t('common.edit')"
                  @click="handleEdit(listingItem)"
                ></Button>
                <Button
                  variant="link"
                  class="btn-delete"
                  :tooltip-text="$t('common.delete')"
                  @click="handleDelete(listingItem)"
                ></Button>
              </div>
            </b-td>
            <!-- ./Actions -->
          </b-tr>
        </b-tbody>
      </b-table-simple>

      <div v-if="!isScreenXS" class="mt-4 d-flex row px-5 action-row">
        <b-col
          sm="12"
          lg="4"
          md="4"
          class="text-center text-md-right mt-md-2 mt-2"
        >
          <Button
            to="/profile/create-listing/selling"
            variant="outline-primary"
            pill
            ><span>{{ $t('createlisting.add_another_listing') }}</span></Button
          >
        </b-col>
        <b-col sm="12" lg="4" md="4" class="text-center mt-md-2 mt-2">
          <Button variant="info" pill @click="saveasDraft">
            <span>{{ $t('createlisting.save_as_draft') }}</span></Button
          >
        </b-col>
        <b-col
          sm="12"
          lg="4"
          md="4"
          class="text-center text-md-left mt-md-2 mt-2"
        >
          <Button
            v-show="showPostListing"
            variant="dark"
            pill
            type="button"
            @click="postListings"
          >
            <span>{{ $t('createlisting.post_listing') }}</span>
          </Button>
        </b-col>
      </div>

      <div
        v-if="!isScreenXS"
        class="mt-4 d-flex justify-content-center confirm-text"
      >
        <span v-if="showPostListing" class="text-center"
          ><span class="text-bold">{{
            $t('createlisting.on_post_listing_click')
          }}</span
          ><br />
          <span v-if="showPostListing" class="text-bold">{{
            $t('createlisting.no_auth_fee')
          }}</span></span
        >
      </div>

      <!-- For mobile screen -->
      <div v-if="isScreenXS" class="row responsive product-confirm-page">
        <div class="col-12 listing-data-responsive-col">
          <template v-if="confirmData && confirmData.length">
            <template v-for="(listData, index) in confirmData">
              <div v-if="showInputs" :key="`count-${index}`" class="row product-off-row p-2">
                <div class="product-off d-flex align-items-center text-center">
                  {{ $tc('common.product', 1) }}
                  <span class="product-count ml-1">
                    {{
                      `${index + 1} ${$t('common.of')} ${confirmData.length}`
                    }}
                  </span>
                </div>
              </div>
              <details-card
                id="selling-details-card"
                :key="`data-${index}`"
                class="mb-2"
                :totalCount="confirmData.length"
                :product="listData.product"
                :item="listData"
                @edit="handleEdit(listData)"
              />
              
              <details-input
                v-if="showInputs"
                :key="`input-${index}`"
                :index="index"
                :quantity="listData.quantity"
                :min-offer="listData.minOfferAmount"
                :stock="listData.stock"
                @minOffer="handleMinOfferPriceChange"
                @quantity="handleQuantityChange"
              />
            </template>
          </template>
        </div>

        <div
          v-if="isScreenXS && !showInputs"
          class="col-12 listing-data-add-icon-col mt-3"
        >
          <span
            class="add-icon-responsive float-right"
            @click="$router.push('/profile/create-listing/selling')"
          >
            <img
              :src="require('~/assets/img/icons/plus-bg-dark-blue.svg')"
              alt="add-more-listing"
            />
          </span>
        </div>

        <div
          v-if="isScreenXS && !showInputs"
          class="col-12 confirm-text-responsive mx-auto mt-5"
        >
          <div class="confirm-text-box w-100">
            <div class="on-pressing-text">
              {{ $t('createlisting.on_post_pressing')
              }}{{ $t('createlisting.no_auth_fee') }}
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="isScreenXS"
        class="col-12 mt-5 action-buttons d-flex justify-content-between"
      >
        <Button variant="save-as-draft-resp" @click="saveasDraft">
          {{ $t('createlisting.save_as_draft') }}
        </Button>
        <Button v-if="!showInputs" variant="post-listing" @click="postListings">
          {{ $t('createlisting.post_listing') }}
        </Button>
        <Button
          v-if="showInputs"
          variant="add-listing"
          :class="!showPostListing && 'disabled'"
          :disabled="!showPostListing"
          @click="postListings"
        >
          {{ $t('createlisting.add_listings') }}
        </Button>
      </div>

      <!-- For mobile screen ends -->

      <!-- Delete Confirm Modal -->
      <ConfirmModal
        id="confirm-listing-delete"
        :message="$t('createlisting.delete_message')"
        :confirmLabel="$t('common.delete')"
        @confirm="onConfirmDelete"
      />
      <!-- ./Delete Confirm Modal -->

      <!-- Post Listing Success -->
      <AlertModal
        id="post-listing-success"
        :message="$t('createlisting.posted_message')"
        icon="tick"
        auto-hide
        @hidden="onPostListingSucess"
      />
      <!-- ./Post Listing Success -->
    </template>
    <!-- ./Show Listing -->
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Button, FormInput } from '~/components/common'
import { ConfirmModal, AlertModal } from '~/components/modal'
import EmptyListing from '~/components/profile/create-listing/EmptyListing.vue'
import {
  QUANTITY_MIN_VAL,
  QUANTITY_MAX_VAL,
  MINOFFER_MIN_VAL,
} from '~/static/constants'
import DetailsInput from '~/components/profile/create-listing/selling/DetailsInput.vue'
import screenSize from '~/plugins/mixins/screenSize'
import DetailsCard from '~/components/profile/create-listing/product/DetailsCard.vue'

export default {
  name: 'CreateListingConfirm',

  components: {
    Button,
    ConfirmModal,
    EmptyListing,
    AlertModal,
    FormInput,
    DetailsCard,
    DetailsInput,
  },

  mixins: [screenSize],

  layout: 'Profile',

  data() {
    return {
      itemToDelete: null,
      showEmpty: false,
      quantityMinVal: QUANTITY_MIN_VAL,
      quantityMaxVal: QUANTITY_MAX_VAL,
      minOfferMinVal: MINOFFER_MIN_VAL,
      tableFields: [
        {
          key: 'details',
          label: this.$t('common.details'),
          sortable: false,
        },
        {
          key: 'product_details',
          label: '',
          sortable: false,
        },
        {
          key: 'quantity',
          label: this.$t('common.quantity'),
          sortable: false,
          class: 'text-center',
        },
        {
          key: 'minOffer',
          label: this.$t('common.min_offer'),
          sortable: false,
          class: 'text-center',
        },
        {
          key: 'price',
          label: this.$t('common.price'),
          sortable: false,
        },
        {
          key: 'action',
          label: this.$t('common.actions'),
          sortable: false,
        },
      ],
      confirmData: this.confirmListData,
      itemToList: [],
    }
  },

  computed: {
    ...mapGetters({
      listing: 'listingItems/getListingDrafts',
    }),
    // Show the post listing button with min, max {Amount, Val}
    showPostListing: (vm) => {
      if (vm.$route.query.path === 'from-inventory') {
        let result = false
        for (let i = 0; i < vm.listing.length; i++) {
          if (
            vm.listing[i].minOfferAmount <= vm.minOfferMinVal ||
            vm.listing[i].quantity < vm.quantityMinVal ||
            vm.listing[i].quantity > vm.listing[i].stock
          ) {
            result = false
            break
          } else {
            result = true
          }
        }
        return result
      } else {
        return true
      }
    },

    showInputs: (vm) => {
      return vm.$route.query.path === 'from-inventory'
    },
  },

  created() {
    this.confirmData = this.listing
  },

  methods: {
    ...mapActions({
      addListingToDraft: 'listingItems/addListingToDraft',
      deleteListing: 'listingItems/deleteListingFromDraft',
      saveListingAsDraft: 'listingItems/saveAsDraft',
      updateDraft: 'listingItems/updateDraftListing',
      removeDraftListing: 'listingItems/removeDraftListing',
      updateValue: 'listingItems/updateQuantityOrOffer',
      createInventoryWithListings: 'listingItems/createInventoryWithListings',
      createListingItems: 'listingItems/createBulkListingItems',
    }),

    /**
     * Get the size of the inventory from products sizes array.
     */
    getSize(inventory) {
      if (inventory.sizeId && inventory.product) {
        return inventory.product.sizes.find(
          (size) => size.id === inventory.sizeId
        )?.size
      }
      if (inventory.size_id) {
        return inventory.product.sizes.find(
          (size) => size.id === inventory.size_id
        )?.size
      }
    },
    /**
     * Get the packaging condition of the inventory from products packagingCondition array.
     */
    getPackagingCondition(inventory) {
      if (inventory.packagingConditionId && inventory.product) {
        return inventory.product.packaging_conditions.find(
          (packagingCondition) =>
            packagingCondition.id === inventory.packagingConditionId
        )?.name
      }
      if (inventory.packaging_condition_id && inventory.product) {
        return inventory.product.packaging_conditions.find(
          (packagingCondition) =>
            packagingCondition.id === inventory.packaging_condition_id
        )?.name
      }
    },
    // On copy button click.
    handleCopy(value) {
      this.addListingToDraft({ ...value })
    },

    // On delete button click in confirm page.
    handleDelete(value) {
      this.itemToDelete = value
      this.$bvModal.show('confirm-listing-delete')
    },

    // On Delete Confirm
    onConfirmDelete() {
      this.$bvModal.hide('confirm-listing-delete')
      this.deleteListing(this.itemToDelete)
      if (this.listing.length === 0) {
        this.showEmpty = true
      }
    },

    // On edit button click
    handleEdit(value) {
      this.$router.push({
        path: `/profile/create-listing/selling/product/edit/${this.listing.indexOf(
          value
        )}`,
        query: {
          id: this.listing.indexOf(value),
          path:
            this.$route.query.path === 'from-inventory' ? 'from-inventory' : '',
        },
      })
    },
    // Save as draft.
    saveasDraft() {
      const data = this.listing
      this.saveListingAsDraft({ data }).then(
        this.$toasted.success(this.$t('createlisting.saved_as_draft'))
      )

      this.removeDraftListing()
      this.$router.push('/profile/create-listing/selling')
    },

    // Post listing.
    postListings() {
      if (this.$route.query.path === 'from-inventory') {
        // Add listing items.
        this.createListingItems(this.listing).then((res) => {
          if (res.success === true) {
            this.$bvModal.show('post-listing-success')
            this.removeDraftListing()
          } else {
            this.$toasted.error(this.$t(res.message))
          }
        })
      } else {
        // Add listing_items wrt. inventories.
        this.createInventoryWithListings(this.listing).then((res) => {
          if (res.success === true) {
            this.showEmpty = false
            this.$bvModal.show('post-listing-success')
            this.removeDraftListing()
          }
        })
      }
    },

    // On success.
    onPostListingSucess() {
      this.$router.push('/profile/vendor-selling')
    },

    /**
     * Handle minimum offer price on change
     * @param value - Value to be changed
     * @param index - index of the item
     */
    handleMinOfferPriceChange(value, index) {
      this.updateValue({
        index,
        colname: 'minOfferAmount',
        minOfferAmount: value,
      })
    },

    /**
     * Handle quantity on change
     * @param value - Value to be changed
     * @param index - index of the item
     */
    handleQuantityChange(value, index) {
      this.updateValue({
        index,
        colname: 'quantity',
        quantity: value,
      })
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.container-profile-inventory-confirm
  min-height: 37rem
  .product-off-row
    .product-off
      font-family: $font-montserrat
      font-style: normal
      @include body-5-medium
      color: $color-black-1
      .product-count
        color: $color-gray-5

  .btn-back
    @include body-5-regular
    color: $color-gray-40

    img
      margin-right: 9px

  h2.title
    @include heading-1
    color: $color-black-1
    font-family: $font-family-sf-pro-display
    @include text-24

  .table-inventory
    thead
      tr
        th
          font-family: $font-family-sf-pro-display
          font-weight: $medium
          font-size: 18px
    .inventory-row
      @include body-4-regular
      color: $color-black-1
      background-color: $color-white-1
      border-bottom: 10px solid $color-white-5
      .price-text
        font-family: $font-family-sf-pro-display
        font-weight: $regular
        font-size: 16px

      .title
        @include body-5-bold
        color: $color-black-1
        font-family: $font-family-sf-pro-display
        font-weight: $medium
        font-size: 15px

      .info
        @include body-5-normal
        color: $color-gray-6
        font-family: $font-family-sf-pro-display
        font-weight: $medium
        font-size: 13px

      td
        .btn-copy
          width: 30px
          height: 30px
          background-image: url('~/assets/img/product/actions.png')
          background-position: left
          border: none

        .btn-edit-inventory
          width: 30px
          height: 30px
          background-image: url('~/assets/img/product/actions.png')
          background-position: center
          border: none

        .btn-delete
          width: 30px
          height: 30px
          background-image: url('~/assets/img/product/actions.png')
          background-position: right
          border: none
    .vd-product-title
      @include body-4-bold
      font-style: normal
      letter-spacing: 0em
      text-align: left
    .info
      @include body-4-normal
      font-style: normal
      letter-spacing: 0em
      color: $color-gray-6
.error-text
  @include body-5-regular
.error
  border: none
  .input-error
    :deep(.form-input)
      border: 1px solid $color-red-3
.confirm-text
  font-family: $font-family-sf-pro-display
  font-weight: $regular
  font-size: 16px
@media (min-width: 576px)
  .container-profile-inventory-confirm
    padding: 47px 54px
    background-color: $color-white-5

@media (max-width: 576px)
  .container-profile-inventory-confirm
    padding: 1.5rem
    background-color: $color-white-1
    .title,
    .action-row,
    .confirm-text
      display: none
    .confirm-text-responsive
      .confirm-text-box
        width: 340px
        height: 63px
        background: $color-white-5
        font-family: $font-montserrat
        font-style: normal
        @include body-9-normal
        text-align: center
        color: $color-black-1
    .on-pressing-text
      padding: 10px
    .btn-save-as-draft-resp
      border: 1px solid $color-blue-19
      border-radius: 20px
      font-family: $font-montserrat
      font-style: normal
      @include body-21-medium
      display: flex
      align-items: center
      text-align: center
      color: $color-blue-19
    .btn-post-listing
      background: $color-blue-20
      border-radius: 20px
      font-family: $font-montserrat
      font-style: normal
      @include body-21-medium
      display: flex
      align-items: center
      text-align: center
      color: $color-white-1
    .btn-add-listing
      background: $color-black-1
      border-radius: 20px
      font-family: $font-montserrat
      font-style: normal
      @include body-21-medium
      display: flex
      align-items: center
      text-align: center
      color: $color-white-1
</style>
