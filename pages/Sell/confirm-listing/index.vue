<template>
  <div>
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-12"></div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <!-- Small boxes (Stat box) -->

        <!-- /.row -->
        <!-- Main row -->
        <div class="row">
          <!-- Left col -->
          <section class="col-lg-12 connectedSortable">
            <!-- Confirm Listing Page Content -->
            <div class="mt-5 mb-4 mx-3 confirm-listing">
              <h3>{{ $t('sell.confirm_listing.title') }}</h3>
              <div class="confirm-listing-table-container">
                <b-table
                  class="mt-3 confirm-listing-table"
                  :items="listingItems"
                  :fields="tableColumns"
                >
                  <template #cell(details)="row">
                    <div class="d-flex align-items-center text-left">
                      <img
                        :src="
                          getProductImageURL({
                            sku: row.item.product_sku,
                            category: row.item.product_category,
                          })
                        "
                        alt="product image"
                        class="product-image"
                      />
                      <div class="ml-4">
                        <span class="product-name">{{
                          row.item.product_name
                        }}</span
                        ><br />
                        <span class="product-sku"
                          >{{ $t('sell.confirm_listing.sku') }}:
                          {{ row.item.product_sku }}</span
                        >
                      </div>
                    </div>
                  </template>
                  <template #cell(colorway)="row">
                    {{ row.item.product_color }}
                  </template>
                  <template #cell(sale_price)="row">
                    ${{ row.item.sale_price | formatPrice }}
                  </template>
                  <template #cell(min_bid_price)="row">
                    ${{ row.item.min_bid_price | formatPrice }}
                  </template>
                  <template #cell(actions)="row">
                    <img
                      :src="redCrossIcon"
                      class="delete-listing-product"
                      @click="showDeleteModal(row.item.product_sku)"
                    />
                  </template>
                </b-table>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <button
                  class="btn w-100 btn-outline-dark edit-list-btn"
                  @click="onEditListClick"
                >
                  {{ $t('sell.confirm_listing.edit_listing_btn') }}
                </button>
                <button
                  class="btn w-100 btn-dark post-list-btn"
                  @click="onPostListClick"
                >
                  {{ $t('sell.confirm_listing.post_listing_btn') }}
                </button>
              </div>
            </div>
            <!-- /Confirm Listing Page Content -->
          </section>
        </div>
        <!-- /.row (main row) -->
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
    <b-modal
      id="delete-modal"
      body-class="p-0"
      no-close-on-backdrop
      hide-footer
      :title="$t('sell.confirm_listing.delete_modal.title')"
    >
      <div class="modal-body py-4">
        {{ $t('sell.confirm_listing.delete_modal.content') }}
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          @click="hideDeleteModal"
        >
          {{ $t('sell.confirm_listing.delete_modal.cancel_btn') }}
        </button>
        <button
          type="button"
          class="btn btn-danger confirm-delete-btn"
          @click="deleteListingItem"
        >
          {{ $t('sell.confirm_listing.delete_modal.ok_btn') }}
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import redCrossIcon from '~/assets/img/icons/red-cross.svg'
import { getProductImageURL } from '~/utils/image.js'

/*
  Confirm listing page
 */
export default {
  name: 'ConfirmListing',
  components: {},
  layout: 'Profile', // Layout
  middleware: 'auth', // only authenticated users
  data() {
    return {
      user_name: this.$store.state.auth.user.first_name, // Logged in user firstname,
      listingItems: [],
      deletingItem: null,
      apiUrl: process.env.API_URL,
      redCrossIcon,
      tableColumns: [
        {
          key: 'details',
          label: this.$t('sell.confirm_listing.table_columns.details'),
          class: 'text-left',
        },
        {
          key: 'size',
          label: this.$t('sell.confirm_listing.table_columns.size'),
        },
        {
          key: 'amount',
          label: this.$t('sell.confirm_listing.table_columns.amount'),
        },
        {
          key: 'status',
          label: this.$t('sell.confirm_listing.table_columns.status'),
        },
        {
          key: 'min_bid_price',
          label: this.$t('sell.confirm_listing.table_columns.min_bid_price'),
        },
        {
          key: 'sale_price',
          label: this.$t('sell.confirm_listing.table_columns.sale_price'),
        },
        {
          key: 'actions',
          label: ' ',
        },
      ],
    }
  },
  // get current language
  computed: {
    ...mapGetters(['getLang']),
  },
  // Reset sessionStorage's sku_of_edit_listingitems key used for "Edit listingItems" funtionality and get current listingItems from sessionStorage.
  mounted() {
    window.sessionStorage.removeItem('sku_of_edit_listingitems')
    window.sessionStorage.removeItem('cat_of_edit_listingitems')
    const data = window.sessionStorage.getItem('listing-items')
    this.listingItems = data ? JSON.parse(data) : []
  },
  methods: {
    getProductImageURL,
    // DeleteListing button "Click" event listener
    deleteListingItem() {
      const items = { ...this.listingItems }
      items.splice(this.deletingItem, 1)
      this.listingItems = items
      window.sessionStorage.setItem('listing-items', JSON.stringify(items))
      this.hideDeleteModal()
    },
    // EditListing "Click" event listener
    onEditListClick() {
      if (this.listingItems.length > 0) {
        const sku = this.listingItems[0].product_sku
        const category = this.listingItems[0].product_category
        window.sessionStorage.setItem('sku_of_edit_listingitems', sku)
        window.sessionStorage.setItem('cat_of_edit_listingitems', category)
        this.$router.push('/sell/create-listing')
      }
    },
    // PostListing button "Click" event listener. This calls SaveNewListingItems API to create new listingItems.
    onPostListClick() {
      const promises = []
      const self = this
      this.listingItems.forEach(function (item) {
        const promise = self.$axios.post('/listing-items', item)
        promises.push(promise)
      })
      Promise.all(promises).then(function () {
        window.sessionStorage.setItem('listing-items', JSON.stringify([]))
        self.$router.push('/sell')
      })
    },
    // Show Delete ListingItem modal
    showDeleteModal(idx) {
      this.deletingItem = idx
      this.$bvModal.show('delete-modal')
    },
    // Hide Delete ListingItem modal
    hideDeleteModal() {
      this.deletingItem = null
      this.$bvModal.hide('delete-modal')
    },
  },
}
</script>
