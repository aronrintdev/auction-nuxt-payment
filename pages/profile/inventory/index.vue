<template>
  <b-container :class="mobileClass" class="container-profile-inventory h-100" fluid>
    <div v-if="!isScreenXS" class="d-flex justify-content-between align-items-center">
      <h2 class="title">{{ $tc('common.inventory', 1) }}</h2>
      <Button
          to="/profile/inventory/csv-drafts"
          variant="link"
          class="btn-draft"
          underlinedText
          :disabled="!csvDrafts.length"
      >{{ $t('inventory.csv_drafts') }} ({{ csvDrafts.length }})
      </Button
      >
    </div>

    <div v-if="isScreenXS" class="d-flex align-items-center justify-content-between">
      <MobileSearchInput
          class="w-100"
          @input="handleSearch"
      />
      <filter-svg class="ml-3" role="button"
                  @click="mobileFiltersOpen = !mobileFiltersOpen"></filter-svg>
    </div>
    <div :class="`d-flex justify-content-${!isScreenXS? 'between mt-3': 'center mt-4'}  align-items-center`">
      <div v-if="!isScreenXS" class="products-count">
        {{ $tc('common.product', totalCount) }}({{ totalCount }})
      </div>

      <NavGroup
          :value="type"
          nav-key="list-type"
          :data="TYPES"
          :class="`${isScreenXS && 'w-100'}`"
          @change="handleTypeChange"
      />

      <Button
          v-if="!isScreenXS"
          variant="dark"
          class="btn-add"
          @click="moveToCreateInventory"
        >{{ $t('inventory.add_inventory') }}</Button
      >
    </div>

    <div v-if="!isScreenXS" class="d-flex justify-content-between align-items-center mt-4">
      <SearchInput
          :value="search"
          :placeholder="$t('inventory.search_placeholder')"
          class="flex-grow-1 mr-4"
          :debounce="1000"
          @change="handleSearch"
      />

      <FormDropdown
          id="inventory-filters"
        :value="category"
        :placeholder="$tc('common.filter', 1)"
        :items="FILTERS"
        :icon="require('~/assets/img/icons/three-lines.svg')"
        class="dropdown-filters mr-4"
        no-arrow
        can-clear
        @select="handleFilterSelect"
      />

      <FormDropdown
          id="inventory-actions"
          :placeholder="$tc('common.action', 2)"
          :items="ACTIONS"
          class="dropdown-actions"
          :icon-arrow-up="require('~/assets/img/icons/arrow-up-blue.svg')"
          :icon-arrow-down="require('~/assets/img/icons/arrow-down-blue.svg')"
          @select="handleActionSelect"
      />
    </div>

    <div v-if="isScreenXS" class="d-flex align-items-center justify-content-between mt-4">
      <div class="products-count">
        {{ $tc('common.inventory', totalCount) }}({{ totalCount }})
      </div>
      <div class="d-flex align-items-center" @click="moveToCreateInventory">
        <add-svg class="add-svg mr-2" height="13" width="13"/>
        <span class="add-text">
          {{ $t('createlisting.create_new_inventory') }}
        </span>
      </div>
    </div>

    <BulkSelectToolbar
        ref="bulkSelectToolbar"
        :active="!!action"
        :selected="selected"
        :unit-label="$tc('common.product', selected.length)"
        :total="inventories.length"
        :action-label="$tc(`inventory.${action}_selected`)"
        class="mt-3"
        @close="cancelAction()"
      @selectAll="handleSelectAll()"
      @deselectAll="handleDeselectAll()"
      @submit="handleBulkAction()"
    />

    <Loader v-if="loading" :loading="loading"/>
    <div v-else>
      <b-row v-if="inventories.length > 0" :class="(!action && !isScreenXS && 'mt-3 ') + mobileClass"
             class=" items-wrapper ">
        <b-col
            v-for="inventory in inventories"
            :key="`inventory-${inventory.id}`"
            :class="`${isScreenXS && 'col-xs-6'}`"
            class="inventory-card col-sm-3"
        >
          <NewInventoryCard
              :inventory="inventory"
              :selectable="!!action"
              :selected="!!selected.find((id) => id == inventory.id)"

              class="my-3"
              @select="selectItem"
              @list="selectList"
          />
        </b-col>
      </b-row>

      <Pagination
        v-if="inventories.length > 0"
        v-model="page"
        :total="totalCount"
        :per-page="perPage"
        :per-page-options="perPageOptions"
        class="mt-2"
        @page-click="handlePageClick"
        @per-page-change="handlePerPageChange"
      />
    </div>

    <ConfirmModal
      id="confirm-delete-modal"
      :message="$t('inventory.message.confirm_delete')"
      :confirmLabel="$t('common.delete')"
      @confirm="onConfirmDelete"
    />

    <AlertModal
        id="deleted-message-modal"
        :message="$t('inventory.message.deleted')"
        icon="trash"
        auto-hide
        @hidden="onDeletedModalHidden"
    />

    <AlertModal
        id="exported-message-modal"
        :message="$t('inventory.message.exported')"
        icon="tick"
        auto-hide
        @hidden="onExportedModalHidden"
    />


    <MobileBottomSheet
        :max-height="'50%'"
        :open="mobileFiltersOpen"
        :title="$t('notifications.filter_by')"
        @closed="mobileFiltersOpen = false"
        @opened="mobileFiltersOpen = true">

      <div class="filter-content py-2 px-4 d-flex flex-column justify-content-between">
        <div class="my-2 flex-grow-1">
          <FilterAccordion :open="true" :title="$tc('common.category', 1)">
            <div class="mt-2">
              <ButtonSelector :options="mobileFilters" :single="true" :values="category"
                              @change="handeMobileFilterSelect"/>
            </div>
          </FilterAccordion>
        </div>
        <div class="d-flex align-items-center justify-content-between">
          <Button
              class="filter-button"
              pill
              variant="outline-dark"
              @click="category = null; mobileFiltersOpen = false"
          >
            {{ $t('notifications.reset') }}
          </Button>

          <Button
              :disabled="loading"
              class="filter-button apply-filters"
              pill
              variant="dark-blue"
              @click="getInventories"
          >
            {{ $t('notifications.apply_filters') }}
          </Button>
        </div>
      </div>
    </MobileBottomSheet>
  </b-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import {
  Button,
  NavGroup,
  SearchInput,
  FormDropdown,
  Pagination,
  Loader,
  BulkSelectToolbar,
} from '~/components/common'
import {AlertModal, ConfirmModal} from '~/components/modal'
import screenSize from '~/plugins/mixins/screenSize';
import MobileSearchInput from '~/components/mobile/MobileSearchInput';
import filterSvg from '~/assets/img/profile/notifications/filters.svg?inline'
import addSvg from '~/assets/img/icons/plus_blue.svg?inline'
import MobileBottomSheet from '~/components/mobile/MobileBottomSheet';
import FilterAccordion from '~/components/mobile/FilterAccordion';
import ButtonSelector from '~/components/mobile/ButtonSelector';
import NewInventoryCard from '~/components/inventory/NewInventoryCard';
// import InventoryCard from '~/components/inventory/Card';

export default {
  name: 'ProfileInventory',

  components: {
    // InventoryCard,
    NewInventoryCard,
    addSvg,
    ButtonSelector,
    FilterAccordion,
    MobileBottomSheet,
    filterSvg,
    MobileSearchInput,
    Button,
    NavGroup,
    SearchInput,
    FormDropdown,
    Pagination,
    Loader,
    BulkSelectToolbar,
    AlertModal,
    ConfirmModal,
  },

  mixins: [screenSize],
  layout: 'Profile',

  fetchOnServer: false,
  middleware: ['vendor'],
  data() {
    console.log('INVENTORY');
    return {
      mobileFiltersOpen: false,
      action: null,
      selected: [],
      type: 'available',
      category: null,
      search: null,
      page: 1,
      perPage: null,
      totalCount: 0,
      loading: false,
      inventories: [],
      TYPES: [
        {
          label: this.$t('inventory.available_to_list'),
          value: 'available',
        },
        {
          label: this.$t('common.all'),
          value: null,
        },
        {
          label: this.$t('home.selling'),
          value: 'selling',
        },
        {
          label: this.$t('home.auctions'),
          value: 'auction',
        },
        {
          label: this.$t('home.trades'),
          value: 'trade',
        },
      ],
      ACTIONS: [
        {
          label: this.$t('common.list'),
          value: 'list',
        },
        {
          label: this.$t('sell.inventory.bulk_delete'),
          value: 'delete',
        },
        {
          label: this.$t('inventory.export_to_csv'),
          value: 'export',
        },
      ],
      FILTERS: [
        {
          label: this.$t('common.footwear'),
          value: 'sneakers',
        },
        {
          label: this.$t('common.apparel'),
          value: 'apparel',
        },
        {
          label: this.$tc('common.accessory', 2),
          value: 'accessories',
        },
      ],
      perPageOptions: [8, 16, 32, 48],
      toList: [],
    }
  },

  fetch() {
    this.updatePerPageOptions()
  },

  computed: {
    ...mapGetters({
      csvDrafts: 'inventory/getCsvDrafts',
    }),
    mobileFilters() {
      return this.FILTERS.map(item => {
        return {...item, text: item.label}
      })
    }
  },

  beforeMount() {
    window.addEventListener('resize', this.updatePerPageOptions)
    this.updatePerPageOptions()
  },

  created() {
    this.removeDraftListing()
  },

  destroyed() {
    window.removeEventListener('resize', this.updatePerPageOptions)
  },

  mounted() {
    console.log('MOUNT INVENTORY');
  },

  methods: {
    ...mapActions({
      fetchInventories: 'inventory/fetchInventories',
      deleteInventories: 'inventory/deleteInventories',
      addReferrer: 'inventory/addReferrer',
      addListingToDraft: 'listingItems/addListingToDraft',
      removeDraftListing: 'listingItems/removeDraftListing',
    }),

    updatePerPageOptions() {
      const width = window.innerWidth
      if (width >= 1800) {
        this.perPageOptions = [10, 20, 40, 60]
      } else if (width >= 1525) {
        this.perPageOptions = [8, 16, 32, 48]
      } else if (width >= 1280) {
        this.perPageOptions = [6, 12, 24, 36]
      } else if (width >= 1030) {
        this.perPageOptions = [4, 8, 16, 24]
      } else {
        this.perPageOptions = [2, 4, 8, 12]
      }
      if (!this.perPageOptions.includes(this.perPage)) {
        this.perPage = this.perPageOptions[0]
        this.page = 1
        this.getInventories()
      }
    },

    getInventories() {
      this.loading = true
      this.fetchInventories({
        search: this.search,
        page: this.page,
        per_page: this.perPage,
        category: this.category,
        type: this.type,
      }).then((res) => {
        this.inventories = res.data
        this.totalCount = parseInt(res.total)
        this.perPage = parseInt(res.per_page)
        this.loading = false
      })
    },

    handleSearch(value) {
      this.search = value
      this.page = 1
      this.getInventories()
    },

    handleTypeChange(type) {
      if (type !== this.type) {
        this.type = type
        this.getInventories()
      }
    },
    handeMobileFilterSelect(item) {
      this.category = item.value
    },
    handleFilterSelect(item) {
      if (item && item.value !== this.category) {
        this.category = item.value
        this.page = 1
        this.getInventories()
      } else if (this.category !== null) {
        this.category = null
        this.page = 1
        this.getInventories()
      }
    },

    handleActionSelect(item) {
      this.action = item?.value
    },

    handlePageClick(bvEvent, page) {
      if (this.page !== page) {
        this.page = page
        this.getInventories()
      }
    },

    handlePerPageChange(value) {
      if (this.perPage !== value) {
        this.perPage = value
        this.page = 1
        this.getInventories()
      }
    },

    selectItem(id, checked) {
      if (checked) {
        this.selected.push(id)
      } else {
        this.selected.splice(this.selected.indexOf(id), 1)
      }
    },

    cancelAction() {
      this.action = null
      this.selected = []
    },

    handleSelectAll() {
      this.selected = this.inventories.map((p) => p.id)
    },

    handleDeselectAll() {
      this.selected = []
    },

    handleBulkAction() {
      if (!this.selected?.length) return

      if (this.action === 'list') {
        if (this.type === 'selling') {
          this.selected.forEach((value) => {
            this.$axios.get(`inventories/${value}`).then((res) => {
              const items = {
                product: res.data.product,
                sizeId: res.data.size_id,
                quantity: 0,
                price: res.data.sale_price,
                packagingConditionId: res.data.packaging_condition_id,
                minOfferAmount: 0,
                inventory_id: res.data.id,
                stock: res.data.stock,
              }
              this.addListingToDraft(items)
            })
          })

          this.$router.push({
            path: '/profile/create-listing/selling/confirm',
            query: { path: 'from-inventory' },
          })
        } else {
          this.$router.push({
            path: '/sell/create-listing',
            query: { id: this.selected },
          })
        }
      } else if (this.action === 'delete') {
        this.$bvModal.show('confirm-delete-modal')
      } else if (this.action === 'export') {
        this.exportToCSV()
      }
    },

    onConfirmDelete() {
      this.deleteInventories({ ids: this.selected }).then((res) => {
        this.$bvModal.show('deleted-message-modal')
      })
    },

    onDeletedModalHidden() {
      this.action = null
      this.selected = []
      this.getInventories()
    },

    onExportedModalHidden() {
      this.action = null
      this.selected = []
    },

    exportToCSV() {
      let csvContent = 'data:text/csv;charset=utf-8,'
      csvContent += [
        [
          'product',
          'sku',
          'size',
          'packaging condition',
          'quantity',
          'price',
        ].join(','),
        ...this.inventories
          .filter((i) => this.selected.includes(i.id))
          .map((i) =>
            [
              i.product.name,
              i.product.sku,
              i.size.size,
              i.packaging_condition.name,
              i.stock,
              i.sale_price / 100,
            ].join(',')
          ),
      ]
        .join('\n')
        .replace(/(^\[)|(\]$)/gm, '')

      const data = encodeURI(csvContent)
      const link = document.createElement('a')
      link.setAttribute('href', data)
      link.setAttribute('download', 'export.csv')
      link.click()

      this.$bvModal.show('exported-message-modal')
    },

    // On add inventory click
    moveToCreateInventory() {
      this.addReferrer('/profile/inventory')
      this.$router.push('/profile/inventory/search')
    },

    selectList({ inventory, checked }) {
      if (this.type === 'selling') {
        if (checked) {
          this.toList.push(inventory)
        } else {
          this.toList.splice(this.toList.indexOf(inventory), 1)
        }
        this.toList.forEach((value) => {
          const items = {
            product: value.product,
            sizeId: value.size_id,
            quantity: 0,
            price: value.sale_price,
            packagingConditionId: value.packaging_condition_id,
            minOfferAmount: 0,
            inventory_id: value.id,
            stock: value.stock,
          }
          this.addListingToDraft(items)
        })
        return this.$router.push({
          path: '/profile/create-listing/selling/confirm',
          query: { path: 'from-inventory' },
        })
      } else {
        this.$router.push('/profile/create-listing')
      }
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.container-profile-inventory
  padding: 47px 54px
  background-color: $color-white-5

  &.mobile
    background-color: $color-white-1
    padding: 11px 1rem 1rem

  .add-text
    @include body-5
    font-family: $font-family-sf-pro-display
    font-style: normal
    font-weight: $regular
    color: $color-gray-5

  .add-svg
    path, rect
      fill: $color-blue-20

  h2.title
    @include heading-3
    color: $color-black-1

  .btn-draft::v-deep
    @include body-5-bold
    color: $color-gray-4
    width: 168px
    display: flex
    justify-content: center

  .products-count
    @include body-3-medium
    color: $color-black-1

  .btn-add::v-deep
    @include body-4-medium
    width: 168px
    height: 40px
    padding: 0
    display: flex
    align-items: center
    justify-content: center

  .dropdown-actions::v-deep
    .btn-dropdown
      @include body-4-normal
      color: $color-blue-1
      border: 1px solid $color-blue-1
      border-radius: 34px
      height: 42px
      width: 168px
      justify-content: center !important

      &.opened
        border-top-left-radius: 10px
        border-top-right-radius: 10px
        border-bottom-left-radius: 0
        border-bottom-right-radius: 0
        // border-bottom: 1px solid $color-gray-23

    .search-results
      .popover-body
        >div
          @include body-4-normal
          font-family: $font-family-base
          color: $color-gray-5
          height: 42px
          display: flex
          justify-content: center
          align-items: center
          border-bottom: 1px solid $color-gray-23
          border-left: 1px solid $color-blue-1
          border-right: 1px solid $color-blue-1

          &:hover
            color: $color-black-1

          &:last-child
            border-bottom-left-radius: 10px
            border-bottom-right-radius: 10px
            border-bottom: 1px solid $color-blue-1

  .dropdown-filters::v-deep
    .btn-dropdown
      @include body-4-normal
      color: $color-black-1
      border: 1px solid $color-white-1
      border-radius: 8px
      height: 46px
      width: 158px
      padding: 0 23px
      justify-content: start !important

      &.opened
        border-bottom-left-radius: 0
        border-bottom-right-radius: 0
        border-bottom: 1px solid $color-gray-23

    .search-results
      .popover-body
        >div
          @include body-4-normal
          font-family: $font-family-base
          color: $color-black-1
          height: 46px
          border: 1px solid $color-white-1
          border-bottom: 1px solid $color-gray-23
          padding: 0 23px

          &:hover
            color: $color-gray-5

          &:last-child
            border-bottom-left-radius: 8px
            border-bottom-right-radius: 8px
            border-bottom: none

  .inventory-card
    flex: 0 0 50%
    max-width: 50%

    @media (min-width: 1030px)
      flex: 0 0 50%
      max-width: 50%

    @media (min-width: 1280px)
      flex: 0 0 33.33%
      max-width: 33.33%

    @media (min-width: 1525px)
      flex: 0 0 25%
      max-width: 25%

    @media (min-width: 1800px)
      flex: 0 0 20%
      max-width: 20%

::v-deep.mobile-bottom-sheet
  .bottom-sheet__card.stripe
    padding-bottom: 0


.filter-content
  height: 88%

.items-wrapper
  &.mobile
    margin-top: 20px

</style>
