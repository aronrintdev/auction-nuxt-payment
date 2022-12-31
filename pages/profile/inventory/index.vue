<template>
  <client-only>
    <b-container :class="mobileClass" class="container-profile-inventory h-100" fluid>
      <div v-if="!isScreenXS" class="d-flex justify-content-between align-items-end">
        <h2 class="title mb-0">{{ $tc('common.inventory', 1) }}</h2>
        <Button
            :disabled="!csvDrafts.length"
            class="btn-draft"
            to="/profile/inventory/csv-drafts"
            underlinedText
            variant="link"
        >{{ $t('inventory.csv_drafts') }} ({{ csvDrafts.length }})
        </Button
        >
      </div>

      <div v-if="isScreenXS" class="d-flex align-items-center justify-content-between">
        <MobileSearchInput
            :value="search"
            class="w-100"
            @input="handleSearch"
        />
        <filter-svg class="ml-3" role="button"
                    @click="mobileFiltersOpen = !mobileFiltersOpen"></filter-svg>
      </div>
      <div class="mt-8px d-xl-flex align-items-center justify-content-between">
        <div v-if="!isScreenXS" class="products-count">
          {{ $tc('common.product', totalCount) }} ({{ totalCount }})
        </div>
        <div class="d-flex align-items-center justify-content-between col-xl-9 px-0 nav-container">
          <NavGroup
            :class="`${isScreenXS && 'w-100'} my-2 text-center`"
            :data="TYPES"
            :value="inventoryType"
            :btnGroupStyle="{
              margin: 0
            }"
            nav-key="list-type"
            @change="handleTypeChange"
          />

          <Button
            v-if="!isScreenXS"
            class="btn-add"
            variant="dark"
            @click="moveToCreateInventory"
          >
            {{ $t('inventory.create_inventory') }}
          </Button>
        </div>
      </div>

      <div v-if="!isScreenXS" class="row justify-content-between align-items-center mt-4">
        <div class="col-12 col-xl-7 col-xxl-8">
          <SearchInput
            :debounce="1000"
            :placeholder="$t('inventory.search_placeholder')"
            :value="search"
            :inputStyle="{
              height: '46px'
            }"
            class="flex-grow-1 mr-xl-4"
            @change="handleSearch"
          />
        </div>

        <div class="mt-3 mt-xl-0 col-6 col-xl-3 col-xxl-2 d-flex align-items-center justify-content-xl-center">
          <CustomDropdown
            class="category-dropdown"
            v-model="category"
            :options="FILTERS"
            :label="categoryFilterLabel"
            type="single-select"
            maxWidth="156px"
            optionsWidth="custom"
            dropDownHeight="46px"
            variant="white"
            borderRadius="4px"
            paddingX="10px"
            :dropdownStyle="{
              border: '1px solid #cbcbcb',
              borderTop: 0,
              borderRadius: '0 0 4px 4px'
            }"
            borderRadiusClose="4px 4px 0 0"
            labelStyle="font-size: 14px; color: #626262;"
            :arrowStyle="{
              color: '#000',
              marginTop: '0 !important'
            }"
            @change="handleFilterSelect"
          />
        </div>

        <div class="mt-3 mt-xl-0 col-6 col-xl-2 d-flex justify-content-end">
          <FormDropdown
            id="inventory-actions"
            :icon-arrow-down="require('~/assets/img/icons/arrow-up-blue.svg')"
            :icon-arrow-up="require('~/assets/img/icons/arrow-down-blue.svg')"
            :items="ACTIONS"
            :value="action"
            :placeholder="$tc('common.action', 2)"
            class="dropdown-actions"
            @select="handleActionSelect"
          />
        </div>
      </div>

      <div v-if="isScreenXS" class="d-flex align-items-center justify-content-between my-20">
        <div class="products-count">
          {{ $tc('home.inventory', totalCount) }} ({{ totalCount }})
        </div>
        <div class="d-flex align-items-center" @click="moveToCreateInventory">
          <add-svg class="add-svg mr-2" height="13" width="13"/>
          <span class="add-text">
          {{ $t('inventory.add_inventory') }}
        </span>
        </div>
      </div>

      <BulkSelectToolbar
          ref="bulkSelectToolbar"
          :action-label="$tc(`inventory.${action}_selected`)"
          :active="!!action"
          :selected="selected"
          :total="inventories.length"
          :unit-label="$tc('common.product', selected.length)"
          class="mt-3"
          @close="cancelAction()"
          @deselectAll="handleDeselectAll()"
          @selectAll="handleSelectAll()"
          @submit="handleBulkAction()"
      />

      <Loader v-if="loading" :loading="loading"/>
      <div v-else>
        <div
          v-if="inventories.length > 0"
          :class="(!action && !isScreenXS && 'mt-5 ') + mobileClass"
          class="items-wrapper bg-white d-flex flex-wrap"
        >
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
              @list="selectList"
              @delist="delistItem"
              @select="selectItem"
            />
          </b-col>
        </div>

        <infinite-loading ref="InfiniteLoading" :identifier="infiniteId" @infinite="handleLoading" >
          <div slot="no-more"></div>
        </infinite-loading>
        <!--
        <Pagination
            v-if="inventories.length > 0"
            v-model="page"
            :per-page="perPage"
            :per-page-options="perPageOptions"
            :total="totalCount"
            class="mt-2"
            @page-click="handlePageClick"
            @per-page-change="handlePerPageChange"
        />
        -->
      </div>

      <ConfirmModal
          id="confirm-delete-modal"
          :confirmLabel="$t('common.delete')"
          :message="$t('inventory.message.confirm_delete')"
          @confirm="onConfirmDelete"
      />

      <AlertModal
          id="deleted-message-modal"
          :message="$t('inventory.message.deleted')"
          auto-hide
          icon="trash"
          @hidden="onDeletedModalHidden"
      />

      <AlertModal
          id="exported-message-modal"
          :message="$t('inventory.message.exported')"
          auto-hide
          icon="tick"
          @hidden="onExportedModalHidden"
      />

      <MobileBottomSheet
          :max-height="'464px'"
          :height="'464px'"
          :open="mobileFiltersOpen"
          :title="$t('notifications.filter_by')"
          @closed="mobileFiltersOpen = false"
          @opened="mobileFiltersOpen = true">

        <div class="filter-content py-2 px-4 d-flex flex-column justify-content-between">
          <div class="my-2 flex-grow-1">
            <FilterAccordion :open="true" :title="$tc('common.category', 1)">
              <div class="mt-2">
                <ButtonSelector :options="mobileFilters" :single="false" :values="category"
                                @change="handeMobileFilterSelect"/>
              </div>
            </FilterAccordion>
          </div>
          <div class="d-flex align-items-center justify-content-between mb-3">
            <Button
                class="filter-button reset-btn px-0"
                pill
                variant="outline-dark"
                @click="resetFilter"
            >
              {{ $t('notifications.reset') }}
            </Button>

            <Button
                :disabled="loading"
                class="filter-button apply-filters px-0"
                pill
                variant="dark-blue"
                @click="getInventories"
            >
              {{ $t('notifications.apply_filters') }}
            </Button>
          </div>
        </div>
      </MobileBottomSheet>

      <client-only v-if="isScreenXS">
        <Portal to="page-title">{{ $t('home.inventory') }}</Portal>
      </client-only>

    </b-container>
  </client-only>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import debounce from 'lodash.debounce'
import {
  Button,
  NavGroup,
  SearchInput,
  FormDropdown,
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
import CustomDropdown from '~/components/common/CustomDropdown'

export default {
  name: 'ProfileInventory',

  components: {
    CustomDropdown,
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
    return {
      mobileFiltersOpen: false,
      action: null,
      selected: [],
      inventoryType: 'available',
      category: null,
      search: '',
      page: 1,
      perPage: null,
      totalCount: 0,
      loading: false,
      inventories: [],
      categoryFilterLabel: this.$t('trades.create_listing.vendor.wants.category'),
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
          label: this.$t('home.trades'),
          value: 'trade',
        },
        {
          label: this.$t('home.auctions'),
          value: 'auction',
        },
      ],
      ACTIONS: [
        {
          label: this.$t('inventory.export_to_csv'),
          value: 'export',
        },
        {
          label: this.$t('sell.inventory.bulk_delist'),
          value: 'delete',
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
      infiniteId: +new Date(),
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
    },
  },

  created() {
    this.removeDraftListing()
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
    resetFilter() {
      this.category = null
      this.getInventories()
    },
    handleLoading($state) {
      this.getInventories($state);
    },
    getInventories($state) {
      // this.loading = true
      this.fetchInventories({
        search: this.search,
        page: this.page,
        per_page: this.perPage,
        category: this.category,
        type: this.inventoryType,
      }).then((res) => {

        if (res.current_page === 1) {
          this.inventories = [...res.data]
        } else {
          this.inventories.push(...res.data);
        }

        $state.loaded()
        if (!res.next_page_url) {
          $state.complete()
        }else{
          this.page += 1
        }

        // this.inventories = res.data
        this.totalCount = parseInt(res.total)
        // this.perPage = parseInt(res.per_page)
      }).finally(() => {
        this.loading = false
        this.mobileFiltersOpen = false
      })
    },

    handleSearch: debounce(function (value) {
      this.search = value
      this.page = 1
      this.infiniteId += 1
      this.$refs.InfiniteLoading.stateChanger.reset();
      this.getInventories()
    }, 500),

    handleTypeChange(type) {
      if (type !== this.inventoryType) {
        this.inventoryType = type
        this.infiniteId += 1
        this.page = 1
        this.$refs.InfiniteLoading.stateChanger.reset();
        this.getInventories()
      }
    },
    handeMobileFilterSelect(item) {
      this.category = item
    },
    handleFilterSelect(item) {
      if (!item) {
        this.category = null
        this.categoryFilterLabel = this.$t('trades.create_listing.vendor.wants.category')
      } else {
        this.category = item
        this.categoryFilterLabel = this.FILTERS.find(f => f.value === this.category).label
      }
      this.page = 1
      this.infiniteId += 1
      this.$refs.InfiniteLoading.stateChanger.reset();
      this.getInventories()
    },

    handleActionSelect(item) {
      this.action = item?.value
    },

    handlePageClick(bvEvent, page) {
      if (this.page !== page) {
        this.page = page
        this.infiniteId += 1
        this.getInventories()
      }
    },

    handlePerPageChange(value) {
      if (this.perPage !== value) {
        this.perPage = value
        this.page = 1
        this.infiniteId += 1
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

    async delistItem(id) {
      await this.$axios.put(`/listing-items/${id}/delist`)
      this.page = 1
      this.infiniteId += 1
      this.$refs.InfiniteLoading.stateChanger.reset();
      this.getInventories()
    },

    handleBulkAction() {
      if (!this.selected?.length) return

      if (this.action === 'list') {
        if (this.inventoryType === 'selling') {
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
            query: {path: 'from-inventory'},
          })
        } else {
          this.$router.push({
            path: '/sell/create-listing',
            query: {id: this.selected},
          })
        }
      } else if (this.action === 'delete') {
        this.$bvModal.show('confirm-delete-modal')
      } else if (this.action === 'export') {
        this.exportToCSV()
      }
    },

    onConfirmDelete() {
      this.deleteInventories({ids: this.selected}).then((res) => {
        this.$bvModal.show('deleted-message-modal')
      })
    },

    onDeletedModalHidden() {
      this.action = null
      this.selected = []
      this.infiniteId += 1
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

    selectList({inventory, checked}) {
      if (this.inventoryType === 'selling') {
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
          query: {path: 'from-inventory'},
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
  padding: 47px 55px 16px 30px
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
    font-weight: $bold
    color: $color-black-1

  .btn-draft::v-deep
    @include body-5-bold
    color: $color-gray-4
    width: 168px
    display: flex
    justify-content: end
    @media (min-width: 1200px)
      justify-content: center

  .products-count
    font-family: $font-sp-pro
    font-weight: $bold
    @include body-12
    color: $black

  .btn-add::v-deep
    @include body-4-medium
    width: 157px
    height: 40px
    padding: 0
    display: flex
    align-items: center
    justify-content: center
    font-family: $font-sp-pro
    font-weight: $medium
    @include body-13
    color: $white

  .nav-group::v-deep
    .btn-group
      height: 36px
      background: $color-gray-3
      border-radius: 20px
      .btn
        font-weight: $regular
        @include body-6
        background: transparent
        &.active
          background: $white
          font-weight: $medium

  .dropdown-actions::v-deep
    .dropdown_wrapper
      height: auto !important
      .dropdownItem
        padding: 17px 0px 17px 10px
        font-family: $font-family-montserrat
        height: 46px
    .btn-dropdown
      border: 1px solid $color-blue-20
      border-radius: 4px
      height: 46px
      width: 156px
      justify-content: center !important

      div
        @include body-5-normal
        font-family: $font-family-montserrat
        color: $color-gray-5

      .icon-arrow
        color: $color-blue-20

      &.opened
        border-bottom-left-radius: 0
        border-bottom-right-radius: 0

    .search-results
      .popover-body
        > div
          @include body-5-regular
          font-family: $font-family-montserrat
          color: $color-gray-5
          height: 42px
          border-bottom: 1px solid $color-gray-23
          border-left: 1px solid $color-blue-1
          border-right: 1px solid $color-blue-1
          border-top: 0px
          z-index: 9999

          &:hover
            color: $color-black-1

          &:last-child
            border-bottom-left-radius: 4px
            border-bottom-right-radius: 4px
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
        > div
          @include body-4-normal
          font-family: $font-family-base
          color: $color-black-1
          height: 98px
          border: 1px solid $color-white-1
          border-bottom: 1px solid $color-gray-23
          padding: 0 23px
          background-color: $color-transparent

          &:hover
            color: $color-gray-5

          &:last-child
            border-bottom-left-radius: 8px
            border-bottom-right-radius: 8px
            border-bottom: none

  .inventory-card
    flex: 0 0 50%
    max-width: 50%
    &.col-xs-6:nth-child(even)
     padding-right: 0px
    &.col-xs-6:nth-child(odd)
      padding-left: 0px

    @media (min-width: 1030px)
      flex: 0 0 50%
      max-width: 50%

    @media (min-width: 1280px)
      flex: 0 0 33.33%
      max-width: 33.33%

    @media (min-width: 1400px)
      flex: 0 0 25%
      max-width: 25%

::v-deep.mobile-bottom-sheet
  .bottom-sheet__card.stripe
    padding-bottom: 0


.filter-content
  height: 88%

.items-wrapper
  &.mobile
    margin-top: 20px

.w-156
  width: 156px

.col-xxl-2
  @media (min-width: 1400px)
    flex: 0 0 16.666667
    max-width: 16.666667%

.col-xxl-8
  @media (min-width: 1400px)
    flex: 0 0 66.666667%
    max-width: 66.666667%

.mt-8px
  margin-top: 8px

.filter-button
  font-family: $font-family-sf-pro-display
  height: 40px
  width: 135px
.reset-btn
  font-family: $font-family-sf-pro-display

::v-deep.category-dropdown
  ul.custom-dropdown-options li
    padding-left: 10px
    padding-top: 10px
    padding-bottom: 10px

.my-20
  margin-top: 20px
  margin-bottom: 20px

</style>
