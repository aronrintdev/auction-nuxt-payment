<template>
  <b-row class="mt-md-4 mt-4">
    <b-col md="12">
      <b-table-simple
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
            <b-th class="text-center p-3">{{
              $t('createlisting.last_updated')
            }}</b-th>

            <b-th class="text-center p-3">{{ $tc('common.action', 2) }}</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr
            v-for="(listingItem, index) in searchResult"
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
            <b-td class="p-3 text-center">
              {{ listingItem.quantity }}
            </b-td>
            <!-- ./Quantity -->

            <!-- Min Offer Amount -->
            <b-td class="p-3 text-center">
              {{ listingItem.minOfferAmount | toCurrency }}
            </b-td>
            <!-- ./Min Offer Amount -->

            <!-- Price -->
            <b-td class="p-3 text-center">
              {{
                listingItem.price
                  ? listingItem.price
                  : listingItem.sale_price | toCurrency
              }}
            </b-td>
            <!-- Price -->

            <!-- TODO: Last updated on -->
            <b-td class="p-3 text-center"> -- </b-td>
            <!-- TODO -->

            <!-- Actions -->
            <b-td class="p-3">
              <div class="d-flex justify-content-center align-items-center">
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
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'SellingDraft',

  props: {
    searchResult: {
      type: Array,
      default: () => {
        return []
      },
    },
  },

  computed: {
    ...mapGetters({
      draftListingItem: 'listingItems/getListingDrafts',
    }),
  },

  methods: {
    ...mapActions({
      addListingToDraft: 'listingItems/addListingToDraft',
      removeFromDrafts: 'listingItems/removeFromDrafts',
    }),
    // Get the packagind Condition
    getPackagingCondition(inventory) {
      if (inventory.packagingConditionId) {
        return inventory.product.packaging_conditions.find(
          (i) => i.id === inventory.packagingConditionId
        )?.name
      }
      if (inventory.packaging_condition_id) {
        return inventory.product.packaging_conditions.find(
          (i) => i.id === inventory.packaging_condition_id
        )?.name
      }
    },

    // On edit click
    handleEdit(value) {
      this.addListingToDraft(value)
      this.$router.push({
        path: `/profile/create-listing/selling/product/edit/${this.draftListingItem.indexOf(
          value
        )}`,
        query: {
          id: this.draftListingItem.indexOf(value),
          path: value.inventory_id ? 'from-inventory' : '',
        },
      })
    },

    // On Delete click
    handleDelete(value) {
      this.removeFromDrafts(value)
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.table-inventory
  .inventory-row
    @include body-4-regular
    color: $color-black-1
    background-color: $color-white-1
    border-bottom: 10px solid $color-white-5

    .title
      @include body-5-bold
      color: $color-black-1

    .info
      @include body-5-normal
      color: $color-gray-6

    td
      #input-field
        input
          width: 80%
          border: 0
          border-radius: 8px
          background: $color-white-5
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
</style>