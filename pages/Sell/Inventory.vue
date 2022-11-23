<template>
  <div class="inventory mb-5">
    <!-- Toolbar -->
    <inventory-toolbar
      @typeChange="listingTypeChanged"
      @search="searchTermChanged"
    />
    <div class="bulk-delete">
      <button
        type="button"
        class="btn btn-dark my-4"
        @click="onBulkDeleteClick"
      >
        {{ $t('sell.inventory.bulk_delete') }}
      </button>
    </div>
    <!-- ListingItems Table -->
    <b-table
      :busy="loading"
      class="inventory-table"
      :items="listingItems"
      :fields="tableColumns"
    >
      <template #table-busy>
        <div class="text-center text-dark my-2">
          <b-spinner class="align-middle"></b-spinner>
        </div>
      </template>
      <template #cell(visible)="row">
        <input
          v-if="row.item.visible"
          type="checkbox"
          class="form-check-input"
          :checked="isSelected(row.item.id)"
          :data-id="row.item.id"
          @click="onBulkDeleteCheckboxChange(row.item.id)"
        />
      </template>
      <template #cell(details)="row">
        <div class="d-flex align-items-center text-left">
          <img
            :src="getProductImageURL(row.item.inventory)"
            alt="product image"
            class="product-image"
          />
          <div class="ml-4">
            <span class="product-name">{{ row.item.inventory.name }}</span
            ><br />
            <span class="product-sku"
              >{{ $t('sell.inventory.sku') }}:
              {{ row.item.inventory.sku }}</span
            >
          </div>
        </div>
      </template>
      <template #cell(colorway)="row">
        {{ row.item.inventory.product.colorway }}
      </template>
      <template #cell(sale_price)="row">
        ${{ row.item.inventory.sale_price | formatPrice }}
      </template>
      <template #cell(size)="row">
        {{ row.item.inventory.size.size }}
      </template>
      <template #cell(listing_type)="row">
        {{ row.item.inventory.type }}
      </template>
      <template #cell(bid_price)="row">
        ${{ row.item.bid_price | formatPrice }}
      </template>
      <template #cell(offers_made)="row">
        <span>{{ row.item.offers }}</span>
        <NuxtLink to="#" class="view-offers">{{
          $t('sell.inventory.view_offers')
        }}</NuxtLink>
      </template>
      <template #cell(created_at)="row">
        {{ getFormattedDate(row.item.created_at) }}
      </template>
      <template #cell(actions)="row">
        <img
          :src="redCrossIcon"
          class="delete-listing-product"
          @click="showDeleteModal(row.item.id)"
        />
      </template>
    </b-table>
    <!-- ListingItems Table Pagination -->
    <b-pagination
      v-if="totalRows"
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      class="inventory-pagination"
      @change="paginationChanged"
    ></b-pagination>
    <!-- Delete ListingItem Modal -->
    <b-modal
      id="delete-modal"
      body-class="p-0"
      no-close-on-backdrop
      hide-footer
      :title="$t('sell.inventory.delete_modal.title')"
    >
      <div class="modal-body py-4">
        {{ $t('sell.inventory.delete_modal.content') }}
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          @click="hideDeleteModal"
        >
          {{ $t('sell.inventory.delete_modal.cancel_btn') }}
        </button>
        <button
          type="button"
          class="btn btn-danger confirm-delete-btn"
          @click="deleteItem"
        >
          {{ $t('sell.inventory.delete_modal.ok_btn') }}
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import { mapGetters } from 'vuex'

import InventoryToolbar from '~/components/Sell/InventoryToolbar.vue'
import redCrossIcon from '~/assets/img/icons/red-cross.svg'
import { getProductImageURL } from '~/utils/image.js'

/*
  Inventory tab of Sell page
 */
export default {
  name: 'SellInventory',
  components: {
    InventoryToolbar,
  },
  data: () => ({
    listingItems: [],
    tableColumns: [],
    totalRows: null,
    perPage: null,
    currentPage: 1,
    selectedListingType: null,
    searchText: '',
    bulkDelete: false,
    selectedItems: [], // items selected for bulk deleting.
    redCrossIcon,
    API_URL: process.env.API_URL,
    loading: false,
  }),
  // get current language
  computed: {
    ...mapGetters(['getLang']),
  },
  mounted() {
    // Get a page of ListingItems without any filters
    this.loadPage()
  },
  methods: {
    getProductImageURL,
    // Get date with "mm/dd/yyyy" format
    getFormattedDate(dateStr) {
      const date = new Date(dateStr)
      return (
        (date.getMonth() > 8
          ? date.getMonth() + 1
          : '0' + (date.getMonth() + 1)) +
        '/' +
        (date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) +
        '/' +
        date.getFullYear()
      )
    },
    // Check if current item is in Bulk Delete list
    isSelected(itemId) {
      return this.selectedItems.includes(itemId)
    },
    // Call ListingItem DELETE API
    deleteItem() {
      if (this.deletingItem) {
        this.$axios.delete(`/listing-items/${this.deletingItem}`).then(() => {
          this.currentPage = 1
          this.loadPage()
          this.hideDeleteModal()
        })
      }
    },
    // Call ListingItems GET API
    loadPage() {
      this.loading = true
      this.$axios
        .get('/listing-items', {
          params: {
            listing_type: this.selectedListingType,
            search: this.searchText,
            page: this.currentPage,
            vendor_id: this.$store.state.auth?.user?.id,
          },
        })
        .then((response) => {
          this.loading = false
          if (response.data) {
            this.totalRows = response.data.total
            this.perPage = response.data.per_page
            this.renderTable(this.selectedListingType, response.data.data)
          }
        })
    },
    // ListingType Selectbox "Change" event Listener
    listingTypeChanged(type) {
      this.selectedListingType = type
      this.currentPage = 1
      this.loadPage()
    },
    // Search form "Input" event listener
    searchTermChanged(val) {
      this.searchText = val
      this.showSearchResult()
    },
    showSearchResult: debounce(function () {
      this.loadPage()
    }, 300),
    // Bulk Delete button "Click" event listener
    onBulkDeleteClick() {
      if (this.bulkDelete) {
        const promises = []
        this.selectedItems.forEach((item) => {
          const promise = this.$axios.delete(`/listing-items/${item}`)
          promises.push(promise)
        })
        Promise.all(promises).then(() => {
          this.loadPage()
        })
      }
      this.bulkDelete = !this.bulkDelete
      this.selectedItems = []
      // Render table with current state data
      this.renderTable(this.selectedListingType, this.listingItems)
    },
    // Show/hide checkboxes for Bulk Delete
    changeBulkSelectBoxVisible() {
      if (this.bulkDelete) {
        this.listingItems = this.listingItems.map((item) => {
          item.visible = true
          return item
        })
      } else {
        this.listingItems = this.listingItems.map((item) => {
          item.visible = false
          return item
        })
      }
    },
    // Bulk Delete checkbox "Change" event listener
    onBulkDeleteCheckboxChange(id) {
      const index = this.selectedItems.findIndex((item) => item === id)
      if (index < 0) {
        this.selectedItems.push(id)
      } else {
        this.selectedItems.splice(index, 1)
      }
    },
    // Show Delete ListingItem modal
    showDeleteModal(id) {
      this.deletingItem = id
      this.$bvModal.show('delete-modal')
    },
    // Hide Delete ListingItem modal
    hideDeleteModal() {
      this.deletingItem = null
      this.$bvModal.hide('delete-modal')
    },
    // Pagination "Change" event listener
    paginationChanged(page) {
      this.currentPage = page
      this.loadPage()
    },
    // Render inventory table
    renderTable(type, data) {
      if (data && data.length > 0) {
        this.listingItems = data
      } else {
        this.listingItems = []
      }
      this.changeBulkSelectBoxVisible()
      switch (type) {
        case 'bid':
          this.tableColumns = [
            {
              key: 'details',
              label: this.$t('sell.inventory.table_columns.details'),
              class: 'text-left',
            },
            {
              key: 'size',
              label: this.$t('sell.inventory.table_columns.size'),
            },
            {
              key: 'colorway',
              label: this.$t('sell.inventory.table_columns.colorway'),
            },
            {
              key: 'status',
              label: this.$t('sell.inventory.table_columns.status'),
            },
            {
              key: 'amount',
              label: this.$t('sell.inventory.table_columns.amount'),
            },
            {
              key: 'sale_price',
              label: this.$t('sell.inventory.table_columns.listed_price'),
            },
            {
              key: 'bid_price',
              label: this.$t('sell.inventory.table_columns.current_bid'),
            },
            {
              key: 'actions',
              label: ' ',
            },
          ]
          break
        case 'trade':
          this.tableColumns = [
            {
              key: 'details',
              label: this.$t('sell.inventory.table_columns.details'),
              class: 'text-left',
            },
            {
              key: 'size',
              label: this.$t('sell.inventory.table_columns.size'),
            },
            {
              key: 'colorway',
              label: this.$t('sell.inventory.table_columns.colorway'),
            },
            {
              key: 'status',
              label: this.$t('sell.inventory.table_columns.status'),
            },
            {
              key: 'offers_made',
              label: this.$t('sell.inventory.table_columns.offers_made'),
            },
            {
              key: 'actions',
              label: ' ',
            },
          ]
          break
        case 'sell':
          this.tableColumns = [
            {
              key: 'details',
              label: this.$t('sell.inventory.table_columns.details'),
              class: 'text-left',
            },
            {
              key: 'size',
              label: this.$t('sell.inventory.table_columns.size'),
            },
            {
              key: 'colorway',
              label: this.$t('sell.inventory.table_columns.colorway'),
            },
            {
              key: 'status',
              label: this.$t('sell.inventory.table_columns.status'),
            },
            {
              key: 'amount',
              label: this.$t('sell.inventory.table_columns.amount'),
            },
            {
              key: 'created_at',
              label: this.$t('sell.inventory.table_columns.date_posted'),
            },
            {
              key: 'sale_price',
              label: this.$t('sell.inventory.table_columns.sale_price'),
            },
            {
              key: 'actions',
              label: ' ',
            },
          ]
          break
        default:
          this.tableColumns = [
            {
              key: 'details',
              label: this.$t('sell.inventory.table_columns.details'),
              class: 'text-left',
            },
            {
              key: 'size',
              label: this.$t('sell.inventory.table_columns.size'),
            },
            {
              key: 'colorway',
              label: this.$t('sell.inventory.table_columns.colorway'),
            },
            {
              key: 'status',
              label: this.$t('sell.inventory.table_columns.status'),
            },
            {
              key: 'listing_type',
              label: this.$t('sell.inventory.table_columns.listing_type'),
            },
            {
              key: 'amount',
              label: this.$t('sell.inventory.table_columns.amount'),
            },
            {
              key: 'created_at',
              label: this.$t('sell.inventory.table_columns.date_posted'),
            },
            {
              key: 'bid_price',
              label: this.$t('sell.inventory.table_columns.bid_price'),
            },
            {
              key: 'actions',
              label: ' ',
            },
          ]
      }
      if (this.bulkDelete) {
        this.tableColumns.unshift({
          key: 'visible',
          label: '#',
        })
      }
    },
  },
}
</script>
