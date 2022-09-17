<template>
  <b-container fluid class="container-heatcheck">
    <div v-if="loading" class="loading">
      <div class="spinner-border text-light" role="status">
        <span class="sr-only">{{ $t('heatcheck.Loading') }}</span>
      </div>
    </div>
    <div>
      <div class="d-flex justify-content-between header">
        <div class="title">
          <h2>{{ $t('heatcheck.heatcheck') }}</h2>
        </div>

        <b-button
          variant="danger"
          class="heatcheck-add-button"
          @click="handleBrowseClick"
        >
          {{ $t('heatcheck.listing.new_heat_check') }}
          <img src="~/assets/img/icons/profile/heatcheck-add.svg" />
        </b-button>
      </div>

      <div class="d-flex mb-4 mt-4 top-bar align-items-center">
        <div
          class="mr-5 mt-0 search-box-container position-relative"
          :class="{ 'show-results': hasSearchResult }"
        >
          <product-search-box :text="searchText" @search="onSearchProduct" />
          <i
            v-if="searchText != null"
            class="fa fa-times inlinestyle"
            aria-hidden="true"
            @click="clearSearch()"
          ></i>
          <div v-if="hasSearchResult" class="dropdown-options">
            <div
              v-for="product in products"
              :key="`${product.id}`"
              class="dropdown-option"
              @click="selectProduct(product)"
            >
              <div class="d-flex justify-content-start align-items-center">
                <img :src="product.image" />
                <div class="ml-3">
                  <div class="dropdown-option-title">{{ product.name }}</div>
                </div>
              </div>
            </div>
            <div
              v-if="products.length === 0"
              class="dropdown-option text-center"
            >
              {{ $t('sell.create_listing.no_result') }}
            </div>
          </div>
        </div>
        <div class="filters">
          <div>
            <form class="form-inline" role="form">
              <div class="form-group date-box position-relative">
                <input
                  id="input-edate"
                  type="date"
                  class="form-input"
                  :placeholder="$t('heatcheck.listing.start_date')"
                />
              </div>
            </form>
          </div>
          <div>
            <form class="form-inline" role="form">
              <div class="form-group date-box position-relative">
                <input
                  id="input-edate"
                  type="date"
                  class="form-input"
                  :placeholder="$t('heatcheck.listing.end_date')"
                />
              </div>
            </form>
          </div>
          <div class="display-block m-0">
            <b-button class="btn-apply" @click="getHeatChecks()">{{
              $t('heatcheck.listing.apply')
            }}</b-button>
            <div
              v-if="clearFilter"
              class="clear-filter pl-2 pt-2"
              @click="clearAllFilter()"
            >
              {{ $t('heatcheck.listing.clear_all_filter') }}
            </div>
          </div>
        </div>
      </div>

      <div class="category_row pull-right justify-content-end">
        <!-- // TODO: in future if needed categories just uncomment this code
        <div class="btn-categories">
          <NavGroup
            v-model="category"
            nav-key="category"
            :data="CATEGORIES"
            @change="getHeatChecks()"
          />
        </div> -->

        <FormDropdown
          id="inventory-filters"
          :value="filter_status"
          :placeholder="$tc('common.statuses')"
          :items="heatcheck_status"
          :icon="require('~/assets/img/icons/three-lines.svg')"
          class="dropdown-filters mr-1"
          no-arrow
          can-clear
          @select="filterHeatChecksByStatus"
        />
      </div>
      <div class="clearfix"></div>
      <div class="products_table">
        <label
          >({{ heatCheckCount }} {{ $t('heatcheck.listing.result') }})</label
        >
        <table class="table table-borderless">
          <thead>
            <tr>
              <th scope="col" class="width-17 center first-column">
                {{ $t('heatcheck.listing.heat_check_id') }}
              </th>
              <th scope="col" class="width-10 center">
                {{ $t('heatcheck.listing.product') }}
              </th>
              <th scope="col" class="center w-46"></th>
              <th scope="col" class="width-10 center">
                {{ $t('heatcheck.listing.date') }}
              </th>
              <th scope="col" class="width-17 center">
                {{ $t('heatcheck.listing.status') }}
              </th>
            </tr>
          </thead>
          <tbody class="table_body">
            <tr v-for="item in heatCheckData" :key="item.id" class="tbody_row">
              <th
                scope="row alignment"
                class="id"
                @click="productDetail(item.id, item.status)"
              >
                <p>#{{ item.id }}</p>
              </th>
              <td class="prod-img">
                <img :src="item.product_detail.image" alt="" />
              </td>
              <td class="product-decription">
                <tr class="w-80">
                  <h4 class="pro-heading">{{ item.product_detail.name }}</h4>
                  <p class="parah">
                    {{ $t('heatcheck.sku') }}: {{ item.product_detail.sku }}
                  </p>
                  <p class="pro-size-color">
                    {{ $t('heatcheck.color') }}:
                    {{ item.product_detail.colorway }}, Size:
                    {{ item.size_id }}
                  </p>
                </tr>
              </td>
              <td class="status-date">{{ item.created_at }}</td>
              <td :class="statusClass[item.status]">
                <div>
                  {{ item.status }}
                  <div
                    v-if="item.status === 'Draft'"
                    class="complete_draft"
                    @click="completeCheck(item.id)"
                  >
                    <label>{{ $t('heatcheck.heatcheck_complete') }}</label>
                    <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="totalRows <= 0" id="no-record-found">
          {{ $t('heatcheck.listing.no_result_found') }}
          <span class="suggest-product-link">{{
            $t('heatcheck.listing.suggest_product')
          }}</span>
        </div>

        <div v-if="totalRows" class="d-flex justify-content-center">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            class="users-pagination"
            last-number
            first-number
            @change="paginationChanged"
          >
          </b-pagination>
          <div class="filterByPage">
            <select v-model="perPage" @change="getHeatChecks()">
              <option value="4">
                {{ $t('heatcheck.listing.page.4_page') }}
              </option>
              <option value="8">
                {{ $t('heatcheck.listing.page.8_page') }}
              </option>
              <option value="12">
                {{ $t('heatcheck.listing.page.12_page') }}
              </option>
              <option value="16">
                {{ $t('heatcheck.listing.page.16_page') }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </b-container>
</template>
<script>
import { mapActions } from 'vuex'
import { FormDropdown } from '~/components/common'
// todo hide categories
// import NavGroup from '~/components/common/NavGroup.vue'

export default {
  name: 'HeatCheckListing',
  // todo hide categories
  components: {
    FormDropdown,
    // NavGroup,
  },
  layout: 'Profile',
  middleware: 'auth',
  data() {
    return {
      category: '',
      action: 'none',
      selectedSku: '',
      searchProductId: '',
      hasSearchResult: false,
      apiUrl: process.env.API_URL,
      clearFilter: false,
      searchText: null,
      startdate: '',
      enddate: '',
      heatcheck_status: [
        {
          label: 'Pending Payment',
          value: 'Pending Payment',
        },
        {
          label: 'Pending',
          value: 'Pending',
        },
        {
          label: 'Passed',
          value: 'Passed',
        },
        {
          label: 'Draft',
          value: 'Draft',
        },
        {
          label: 'Failed',
          value: 'Failed',
        },
        {
          label: 'Cannot Verify',
          value: 'Cannot Verify',
        },
        {
          label: 'Inconclusive',
          value: 'inconclusive',
        },
      ],
      filter_status: null,
      uploadedData: '',
      uploadedDataLength: '',
      CATEGORIES: [],
      newListType: null,
      newListName: '',
      listProducts: [],
      products: [],
      selected: [],
      loading: false,
      totalCount: 0,
      filterByStatus: [],
      heatCheckData: [],
      heatCheckCount: 0,
      statusClass: {
        'Pending Payment': 'static-color',
        Pending: 'static-color',
        Passed: 'static-color-green',
        Failed: 'static-color-red',
        Draft: 'static-color-purple',
        'Cannot Verify': 'static-color-red',
        Inconclusive: 'static-color-gray',
      },
      totalRows: 0,
      currentPage: 1,
      perPage: 8,
    }
  },
  beforeMount() {
    this.getHeatChecks()
    this.$emit('select', null)
    this.getAllCategories()
  },
  methods: {
    ...mapActions({
      resetData: 'heat-check/resetData',
    }),
    clearAllFilter() {
      this.clearFilter = false
      this.filter_status = null
      this.clearSearch()
    },
    // search heatcheck
    onSearchProduct(term) {
      this.$axios
        .get(`/products/?search=${term.toLowerCase()}`)
        .then((response) => {
          this.hasSearchResult = true
          this.products = response.data.data
        })
        .catch((error) => {
          this.$toasted.error(this.$t(error.response.data.error))
        })
    },

    // Open file input form
    openFileUploader() {
      this.$refs.input_file.click()
    },

    // Products dropdown "Click" event listener
    selectProduct(row) {
      this.clearFilter = true
      this.selectedSku = row.sku
      const index = this.products.findIndex((p) => p.sku === this.selectedSku)
      this.product = this.products[index]
      this.hasSearchResult = false
      this.searchText = row.name
      this.searchProductId = row.id
      this.getHeatChecks()
    },

    // redirect to page to add new heatcheck
    handleBrowseClick() {
      this.$router.push({
        path: '/heat-check/new',
      })
    },

    // Pagination "Change" event listener
    paginationChanged(page) {
      this.currentPage = page
      this.getHeatChecks()
    },

    // filter heatchecks by status
    filterHeatChecksByStatus(item) {
      if (item && item.value !== this.filter_status) {
        this.filter_status = item.value
        this.getHeatChecks()
      } else if (this.category !== null) {
        this.filter_status = null
        this.getHeatChecks()
      }
    },

    // Get heatchecks of users
    getHeatChecks() {
      this.loading = true
      if (this.filter_status !== null || this.searchProductId !== '') {
        this.clearFilter = true
      }
      this.$axios
        .get('/heatchecks', {
          params: {
            product_id: this.searchProductId,
            status: this.filter_status,
            category_id: this.category,
            page: this.currentPage,
            take: this.perPage,
          },
        })
        .then((response) => {
          this.heatCheckData = response.data.data
          this.heatCheckCount = response.data.total
          this.totalRows = response.data.total
          this.loading = false
        })
        .catch((error) => {
          this.loading = false
          this.$toasted.error(error.response.data.error)
        })
    },

    // For date picker format
    onContext(ctx) {
      // The date formatted in the locale, or the `label-no-date-selected` string
      this.formatted = ctx.selectedFormatted
      // The following will be an empty string until a valid date is entered
      this.selected = ctx.selectedYMD
    },

    // Get all categoires to show in nav bar
    getAllCategories() {
      this.loading = true
      this.$axios
        .get('/categories')
        .then((response) => {
          this.CATEGORIES.push({ label: 'All', value: '' })
          response.data.forEach((category) => {
            this.CATEGORIES.push({ label: category.name, value: category.id })
            this.loading = false
          })
        })
        .catch((error) => {
          this.loading = false
          this.$toasted.error(error.response.data.error)
        })
    },

    // Redirect to detail page
    productDetail(id, status) {
      if (status === 'Draft' || status === 'Pending Payment') {
        this.resetData()
        this.$router.push({
          path: `/heat-check/product?id=${id}&status=${status}`,
        })
      } else {
        this.$router.push({ path: `/heat-check/product-detail?id=${id}` })
      }
    },

    // Clear search
    clearSearch() {
      this.searchText = null
      this.searchProductId = ''
    },

    completeCheck(id) {
      this.$router.push({
        path: `/heat-check/product?id=${id}`,
      })
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.container-heatcheck td.prod-img img
  width: 100px
  height: 100%

.id
  padding-left: 30px
  padding-top: 50px

.id p:hover
  cursor: pointer
  color: $color-gray-6

.status-date
  padding-top: 50px
.width-17
  width: 17%

.width-10
  width: 10%

.center
  text-align: center


.static-color,
.static-color-green,
.static-color-gray,
.static-color-purple,
.static-color-red
  display: flex
  justify-content: center
  align-items: center
  text-align: center

.static-color-red
  color: $color-red-rgb1
  box-sizing: border-box

.static-color-gray
  font-family: $font-family-futura
  font-style: normal
  font-weight: $bold
  font-size: 32px
  line-height: 43px
  color: $color-gray-47

.product-decription
  display: flex
  justify-content: center
  align-items: center

.w-80
  width: 80%

.statuses_dorpdown select
  background: $color-white-1
  border: 1px solid $light-gray-2

.statuses_dorpdown select .statuses-option
  background: $color-white-1
  border-bottom: 0.2px solid $light-gray-2

.complete_draft :hover
  cursor: pointer

.filterByPage select:hover
  cursor: pointer
.dropdown-filters::v-deep
  .btn-dropdown
    @include body-4-normal
    color: $color-black-1
    border: 1px solid $color-white-1
    border-radius: 8px
    height: 46px
    width: 158px
    padding: 0 23px
    justify-content: start

    &.opened
      border-bottom-left-radius: 0
      border-bottom-right-radius: 0
      border-bottom: 1px solid $color-gray-23

#no-record-found
  text-align: center
  font-size: 16px
  font-weight: $regular

.suggest-product-link
  color: $color-blue-1
  text-decoration: underline
  font-size: 16px
  font-weight: $regular
.clear-filter
  color:$color-blue-1
  font-size: 12px
  font-weight: $regular
  text-decoration: underline
  text-align: center
  margin-bottom: 15px
  white-space: nowrap
.btn-apply
  border: 1px solid $color-blue-2
  display: grid
  padding: 7px 30px
  background: $color-blue-2
.first-column
  padding-left: 0px
  text-align: left

.inlinestyle
  position: absolute
  top: 17px
  right: 10px
  cursor: pointer

.w-46
  width: 46%
.datePicker
  background: $color-white-1
.datePicker
  button
    svg
      color: #cccccc
.bi-calendar
  color: #ccc
.b-icon
  color: #ccc
.datePicker button svg
  color: #ccc
</style>
