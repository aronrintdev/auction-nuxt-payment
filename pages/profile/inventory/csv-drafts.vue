<template>
  <b-container fluid class="container-profile-inventory-csv-drafts h-100">
    <Button to="/profile/inventory" variant="link" class="btn-back">
      <img :src="require('~/assets/img/icons/back.svg')" alt="back" />
      {{ $t('common.back') }}
    </Button>

    <div class="d-flex align-items-center mt-3">
      <h2 class="title">
        {{ $t('inventory.csv_upload') }}
      </h2>
      <div class="text-count ml-2">
        {{ `(${drafts.length} items)` }}
      </div>
    </div>

    <NavGroup
      :value="type"
      nav-key="draft-type"
      :data="navGroupData"
      class="mt-3 text-center nav-group"
      @change="handleTypeChange"
    />

    <div class="d-flex align-items-center justify-content-between mt-4">
      <SearchInput
        v-model="search"
        :placeholder="$t('inventory.search_draft_placeholder')"
        class="search-input flex-grow-1 mr-4"
        :debounce="1000"
      />

      <Button
        v-if="type === 'available'"
        variant="dark"
        class="flex-shrink-0 btn-add-to-inventory"
        :disabled="selected.length === 0"
        @click="handleAddToInventoryClick"
        >{{
          `${$t('inventory.add_to_inventory')}${
            selected.length ? ' (' + selected.length + ')' : ''
          }`
        }}</Button
      >
    </div>

    {{ isScreenXS }}
    <div :class="{'scroll-container' : !isScreenXS && !isScreenSM}">
    <table v-if="type === 'available'" class="mt-2 w-100 table-inventory">
      <thead>
        <tr>
          <th class="p-3">
            <b-checkbox
              class="check-box"
              :checked="selectedAll"
              @change="toggleSelectAll"
            ></b-checkbox>
          </th>
          <th class="p-3 text-center">{{ $t('common.details') }}</th>
          <th class="p-3 text-center">{{ $tc('common.size', 1) }}</th>
          <th class="p-3 text-center">{{ $t('common.box_condition') }}</th>
          <th class="p-3 text-center">{{ $t('common.quantity') }}</th>
          <th class="p-3 text-center">{{ $t('common.price') }}</th>
          <th class="p-3 text-center">{{ $tc('common.action', 2) }}</th>
        </tr>
      </thead>
      <tbody class="inventory-rows">
        <tr v-if="!itemsByType.length" class="inventory-row">
          <td colspan="7" class="p-5 text-center">
            {{ $t('inventory.no_items') }}
          </td>
        </tr>
        <tr
          v-for="(item, index) in itemsByType"
          :key="`draft-${index}`"
          class="inventory-row"
        >
          <td class="p-3">
            <b-checkbox
              class="check-box"
              :checked="isSelected(item)"
              :disabled="!isItemValid(item)"
              @change="toggleSelect(item)"
            ></b-checkbox>
          </td>
          <td class="d-flex align-items-center p-3">
            <ProductThumb
              :product="item.product"
              class="mr-4 product-img"
            />
            <div class="text-left">
              <div class="title mb-1">{{ item.product.name }}</div>
              <div class="info mb-1">
                {{ $t('common.sku') + ': ' + item.product.sku }}
              </div>
              <div class="info mb-1">
                {{ $t('common.colorway') + ': ' + item.product.colorway }}
              </div>
            </div>
          </td>
          <td class="p-3 text-center">
            <b-form-select
              :value="item.sizeId"
              :options="getSizeOptions(item.product.sizes)"
              class="form-select mx-auto"
              :class="!item.sizeId && 'error'"
              @input="
                (value) =>
                  updateField({
                    inventory: item,
                    key: 'sizeId',
                    value,
                  })
              "
            ></b-form-select>
          </td>
          <td class="p-3 text-center">
            <b-form-select
              :value="item.packagingConditionId"
              :options="
                getPackagingConditionOptions(item.product.packaging_conditions)
              "
              class="form-select mx-auto"
              :class="!item.packagingConditionId && 'error'"
              @input="
                (value) =>
                  updateField({
                    inventory: item,
                    key: 'packagingConditionId',
                    value,
                  })
              "
            ></b-form-select>
          </td>
          <td class="p-3 text-center">
            <b-form-input
              :value="item.quantity"
              class="form-input mx-auto"
              :class="!item.quantity && 'error'"
              number
              @input="
                (value) =>
                  updateField({
                    inventory: item,
                    key: 'quantity',
                    value: Number(value),
                  })
              "
            ></b-form-input>
          </td>
          <td class="p-3 text-center">
            <b-form-input
              :value="item.price / 100"
              class="form-input mx-auto"
              :class="!item.price && 'error'"
              number
              @input="
                (value) =>
                  updateField({
                    inventory: item,
                    key: 'price',
                    value: Number(value) * 100,
                  })
              "
            ></b-form-input>
          </td>
          <td class="p-3 text-center">
            <div class="d-flex justify-content-center align-items-center">
              <Button
                variant="link"
                class="btn-save mr-2"
                :tooltip-text="$t('inventory.add_to_inventory')"
                :disabled="!isItemValid(item)"
                @click="handleSaveClick(item)"
              ></Button>
              <Button
                variant="link"
                class="btn-delete"
                :tooltip-text="$t('common.delete')"
                @click="handleDeleteClick(item)"
              ></Button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <table v-else class="mt-2 w-100 table-inventory">
      <thead>
        <tr>
          <th class="p-3">
            <b-checkbox
              class="check-box"
              :checked="selectedAll"
              @change="toggleSelectAll"
            ></b-checkbox>
          </th>
          <th class="p-3 text-left w-1 text-nowrap">
            <div style="width: 300px">{{ $t('common.sku') }}</div>
          </th>
          <th class="p-3 text-left">{{ $tc('common.product', 1) }}</th>
          <th class="p-3 text-center">{{ $tc('common.action', 2) }}</th>
        </tr>
      </thead>
      <tbody class="inventory-rows">
        <tr v-if="!itemsByType.length" class="inventory-row">
          <td colspan="4" class="p-5 text-center">
            {{ $t('inventory.no_items') }}
          </td>
        </tr>
        <tr
          v-for="(item, index) in itemsByType"
          :key="`draft-${index}`"
          class="inventory-row"
        >
          <td class="p-3 text-nowrap w-1 align-top">
            <b-checkbox
              class="check-box"
              :checked="isSelected(item)"
              @change="toggleSelect(item)"
            ></b-checkbox>
          </td>
          <td class="p-3 text-left" colspan="2">
            <div class="d-flex align-items-center">
              <b-form-input
                v-if="item.status === 'unrecognized'"
                :value="item.sku"
                class="form-input sku-input mr-3 flex-shrink-0"
                @input="(value) => handleSkuChange(item, value)"
              ></b-form-input>
              <div
                v-if="item.status === 'suggested'"
                class="sku-input mr-3 flex-shrink-0"
              >
                {{ item.sku }}
              </div>
              <div class="ml-3">
                {{ item.productName }}
              </div>
            </div>
            <div v-if="item.product && item.status === 'unrecognized'">
              <div class="mt-3">{{ $t('inventory.do_you_mean') }}</div>
              <div class="d-flex align-items-center ml-5">
                <ProductThumb
                  :product="item.product"
                  width="63"
                  height="63"
                  class="mr-4 flex-shrink-0"
                />
                <div class="text-left">
                  <div class="mb-1">{{ item.product.name }}</div>
                  <div class="info mb-1">
                    {{ $t('common.sku') + ': ' + item.product.sku }}
                  </div>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  pill
                  class="ml-4"
                  @click="handleRecommendYesClick(item)"
                  >{{ $t('common.yes') }}</Button
                >
                <Button
                  variant="outline-primary"
                  size="sm"
                  pill
                  class="ml-2"
                  @click="handleRecommendNoClick(item)"
                  >{{ $t('common.no') }}</Button
                >
              </div>
            </div>
          </td>
          <td class="p-3 text-center text-nowrap w-1 align-top">
            <div class="d-flex justify-content-center align-items-start">
              <Button
                variant="dark"
                class="mr-2 btn-suggest"
                size="sm"
                :disabled="item.status === 'suggested'"
                @click="handleSuggestClick(item)"
              >
                {{
                  item.status === 'suggested'
                    ? $t('inventory.already_suggested')
                    : $t('inventory.suggest_new_product')
                }}
              </Button>
              <Button
                variant="link"
                class="btn-delete"
                :tooltip-text="$t('common.delete')"
                @click="handleDeleteClick(item)"
              ></Button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    </div>

    <AlertModal
      id="added-message-modal"
      :message="addedMessage"
      icon="tick"
      auto-hide
    />

    <NewProductSuggestedModal
      id="new-product-suggested-modal"
      :name="suggestInfo.name"
      :sku="suggestInfo.sku"
      auto-hide
    />
  </b-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { Button, NavGroup, SearchInput } from '~/components/common'
import ProductThumb from '~/components/product/Thumb'
import { AlertModal, NewProductSuggestedModal } from '~/components/modal'
import screenSize from '~/plugins/mixins/screenSize'

export default {
  name: 'ProfileInventoryCsvDrafts',

  components: {
    Button,
    NavGroup,
    SearchInput,
    ProductThumb,
    AlertModal,
    NewProductSuggestedModal,
  },

  mixins:[screenSize],

  layout: 'Profile',

  data() {
    return {
      type: 'available',
      search: null,
      selectedAll: false,
      selected: [],
      addedMessage: '',
      suggestInfo: {},
    }
  },

  computed: {
    ...mapGetters({
      drafts: 'inventory/getCsvDrafts',
    }),

    availableItems() {
      return this.drafts.filter((i) => i.status === 'available')
    },

    unrecognizedItems() {
      return this.drafts.filter((i) => i.status !== 'available')
    },

    itemsByType() {
      const items =
        this.type === 'available' ? this.availableItems : this.unrecognizedItems
      if (this.search) {
        return items.filter(
          (i) =>
            i.product?.name
              ?.toLowerCase()
              ?.includes(this.search.toLowerCase()) ||
            i.product?.sku
              ?.toLowerCase()
              ?.includes(this.search.toLowerCase()) ||
            i.product?.brand
              ?.toLowerCase()
              ?.includes(this.search.toLowerCase()) ||
            i.productName?.toLowerCase().includes(this.search.toLowerCase()) ||
            i.sku?.toLowerCase().includes(this.search.toLowerCase())
        )
      } else {
        return items
      }
    },

    navGroupData() {
      return [
        {
          label: this.$t('inventory.recognized_items', {
            count: this.availableItems?.length,
          }),
          value: 'available',
        },
        {
          label: this.$t('inventory.unrecognized_items', {
            count: this.unrecognizedItems?.length,
          }),
          value: 'unrecognized',
        },
      ]
    },
  },

  methods: {
    ...mapActions({
      updateInventoryFieldInCsvDraft:
        'inventory/updateInventoryFieldInCsvDraft',
      createInventoriesFromCsvDraft: 'inventory/createInventoriesFromCsvDraft',
      deleteInventoryFromCsvDraft: 'inventory/deleteInventoryFromCsvDraft',
      fetchProductBySku: 'product/fetchProductBySku',
      updateInventoryInCsvDraft: 'inventory/updateInventoryInCsvDraft',
      suggestProduct: 'product/suggestProduct',
    }),

    isItemValid(item) {
      return (
        item.sizeId &&
        item.quantity &&
        item.price &&
        item.packagingConditionId &&
        item.quantity > 0 &&
        item.price > 0
      )
    },

    handleTypeChange(type) {
      if (type !== this.type) {
        this.type = type
        this.selected = []
        this.selectedAll = false
      }
    },

    getSizeOptions(sizes) {
      return sizes.map((i) => {
        return { text: i.size, value: i.id }
      })
    },

    getPackagingConditionOptions(conditions) {
      return conditions.map((i) => {
        return { text: i.name, value: i.id }
      })
    },

    toggleSelectAll() {
      this.selectedAll = !this.selectedAll
      if (this.selectedAll) {
        this.selected = []
        this.itemsByType.forEach((i) => {
          if (this.isItemValid(i)) {
            const index = this.drafts.indexOf(i)
            this.selected.push(index)
          }
        })
      } else {
        this.selected = []
      }
    },

    toggleSelect(item) {
      const index = this.drafts.indexOf(item)
      if (!index && index !== 0) return

      if (this.selected.includes(index)) {
        this.selected.splice(this.selected.indexOf(index), 1)
      } else {
        this.selected.push(index)
      }

      if (this.selected.length === this.itemsByType.length) {
        this.selectedAll = true
      } else if (this.selected.length === 0) {
        this.selectedAll = false
      }
    },

    isSelected(item) {
      const index = this.drafts.indexOf(item)
      return this.selected.includes(index)
    },

    handleAddToInventoryClick() {
      this.createInventoriesFromCsvDraft(this.selected).then(() => {
        this.addedMessage = this.$t('inventory.message.csv_draft_added', {
          count: this.selected.length,
        })
        this.selected = []
        this.$bvModal.show('added-message-modal')
      })
    },

    handleSaveClick(item) {
      const index = this.drafts.indexOf(item)
      this.createInventoriesFromCsvDraft([index]).then(() => {
        this.addedMessage = this.$t('inventory.message.csv_draft_added', {
          count: 1,
        })
        this.selected = []
        this.$bvModal.show('added-message-modal')
      })
    },

    handleDeleteClick(item) {
      const index = this.drafts.indexOf(item)
      this.deleteInventoryFromCsvDraft(index)
      this.selected = []
    },

    handleSkuChange(item, value) {
      this.updateInventoryFieldInCsvDraft({
        inventory: item,
        key: 'sku',
        value,
      })
      if (value) {
        this.fetchProductBySku(value)
          .then((product) => {
            if (product) {
              this.updateInventoryFieldInCsvDraft({
                inventory: item,
                key: 'product',
                value: product,
              })
            }
          })
          .catch(() => {
            this.updateInventoryFieldInCsvDraft({
              inventory: item,
              key: 'product',
              value: null,
            })
          })
      }
    },

    handleRecommendYesClick(item) {
      const sizeId = item.product.sizes.find((i) => i.size === item.size)?.id
      const packagingConditionId = item.product.packaging_conditions.find(
        (i) => i.name === item.packagingCondition
      )?.id
      this.updateInventoryInCsvDraft({
        inventory: item,
        value: { ...item, status: 'available', sizeId, packagingConditionId },
      })
      this.addedMessage = this.$t('inventory.message.added_to_available', {
        product: item.product.name,
      })
      this.$bvModal.show('added-message-modal')
      this.selected = []
    },

    handleRecommendNoClick(item) {
      this.updateInventoryFieldInCsvDraft({
        inventory: item,
        key: 'product',
        value: null,
      })
    },

    handleSuggestClick(item) {
      this.suggestProduct({ name: item.productName, sku: item.sku }).then(
        () => {
          this.updateInventoryFieldInCsvDraft({
            inventory: item,
            key: 'status',
            value: 'suggested',
          })
          this.suggestInfo = {
            name: item.productName,
            sku: item.sku,
          }
          this.$bvModal.show('new-product-suggested-modal')
        }
      )
    },

    updateField(payload) {
      this.updateInventoryFieldInCsvDraft(payload)
      if (!payload.value) {
        const index = this.drafts.indexOf(payload.inventory)
        if (this.selected.includes(index)) {
          this.selected.splice(this.selected.indexOf(index), 1)
        }
      }
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.container-profile-inventory-csv-drafts
  padding: 47px 54px
  background-color: $color-white-5

  h2.title
    @include heading-1
    color: $color-black-1
    margin: 0

  .btn-back
    @include body-5-regular
    color: $color-gray-40

    img
      margin-right: 9px

  .btn-add-to-inventory
    width: 240px

  .text-count
    @include body-4-regular

  .search-input
    width: 100%
    max-width: 688px

  .table-inventory
    .inventory-rows
      max-height: 35vh !important
      height: 35vh !important
      overflow-y: scroll !important

    .w-1
      width: 1%

    .inventory-row
      @include body-5-normal
      color: $color-black-4
      background-color: $color-white-1
      border-bottom: 10px solid $color-white-5

      .title
        @include body-5-bold
        color: $color-black-1

      .info
        @include body-5-normal
        color: $color-gray-6

      .btn-save
        width: 30px
        height: 30px
        background-image: url('~/assets/img/product/actions2.png')
        background-position: left
        border: none

      .btn-delete
        width: 30px
        height: 30px
        background-image: url('~/assets/img/product/actions2.png')
        background-position: right
        border: none

      .form-select
        @include body-5-regular
        color: $color-black-1
        border: 1px solid $color-black-1
        border-radius: 4px
        padding: 5px 23px 5px 8px
        height: 30px
        width: fit-content
        background-color: $color-white-1

      .form-input
        @include body-5-regular
        color: $color-black-1
        border: 1px solid $color-black-1
        border-radius: 4px
        padding: 5px 8px
        height: 30px
        max-width: 80px
        width: 100%
        background-color: $color-white-1

      .error
        border-color: $color-red-3

      .sku-input
        width: 300px
        max-width: 300px

      .w-1
        width: 1%

      .btn-suggest
        width: 220px
.product-img
  height: 64px
  width: 64px

.nav-group
  max-width: 506px
  margin: auto

.scroll-container
  position: relative
  height: 55vh
  overflow-y: scroll
  table
    thead
      position: sticky
      top: 0
      background-color: $color-white-5
      z-index: 9999
</style>
