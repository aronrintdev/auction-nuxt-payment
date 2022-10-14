<template>
  <div class="sneaker-reward-page ">
    <div class="d-flex align-items-center ">
      <MobileSearchInput class="flex-grow-1" @input="searchChanged"/>
      <filter-svg class="ml-3" role="button"
                  @click="mobileFiltersOpen = !mobileFiltersOpen"></filter-svg>
    </div>

    <div class="d-flex flex-column">
      <div class="title">
        {{ $t('rewards.sneaker_page.claim') }}
      </div>
      <div class="desc">
        {{ $t('rewards.sneaker_page.select') }}
      </div>
    </div>

    <b-row v-if="!loading && products.length" class="products">
      <b-col v-for="product in products" :key="product.id" class="item col-xs-6" cols="6" @click="itemClick(product)">
        <div class="d-flex flex-column">
          <ProductThumb :product="product" :src="product.image" class="product-thumb"/>
          <div class="product-name">
            {{ product.name }}
          </div>
          <div class="product-color">
            {{ product.colorway }}
          </div>
        </div>
      </b-col>
    </b-row>

    <h5 v-if="!products.length && !loading" class="text-center text-bold w-100">
      {{ $t('message.no_products_found') }}
    </h5>

    <div class="d-flex align-items-center justify-content-center">
      <Loader :loading="loading"></Loader>
    </div>

    <MobileBottomSheet
        :height="'90%'"
        :open="mobileFiltersOpen"
        :title="$t('rewards.sneaker_page.filter_by').toString()"
        @closed="mobileFiltersOpen = false"
        @opened="mobileFiltersOpen = true"
    >
      <template #default>
        <div class="d-flex flex-column align-items-center justify-content-between h-88 w-100 filters">
          <div class="d-flex flex-column w-100">
            <FilterAccordion :open="true" :title="$t('rewards.sneaker_page.sort')">

            </FilterAccordion>
            <ItemDivider/>
            <FilterAccordion :title="$tc('common.size_type', 1)">

            </FilterAccordion>
            <ItemDivider/>
            <FilterAccordion :title="$t('filter_sidebar.sizes')">

            </FilterAccordion>
            <ItemDivider/>
            <FilterAccordion :title="$t('filter_sidebar.price')">

            </FilterAccordion>
            <ItemDivider/>
            <FilterAccordion :title="$t('filter_sidebar.brands')">

            </FilterAccordion>
            <ItemDivider/>
            <FilterAccordion :title="$t('filter_sidebar.year')">

            </FilterAccordion>
          </div>
          <div class="w-100 d-flex justify-content-between">
            <Button
                class="filter-button"
                pill
                variant="outline-dark"
                @click="mobileFiltersOpen = false"
            >
              {{ $t('notifications.reset') }}
            </Button>

            <Button
                :disabled="loading"
                class="filter-button apply-filters"
                pill
                variant="dark-blue"
                @click="fetchProducts"
            >
              {{ $t('notifications.apply_filters') }}
            </Button>
          </div>
        </div>
      </template>
    </MobileBottomSheet>
  </div>
</template>

<script>
import debounce from 'lodash.debounce';
import MobileSearchInput from '~/components/mobile/MobileSearchInput';
import filterSvg from '~/assets/img/profile/notifications/filters.svg?inline'
import MobileBottomSheet from '~/components/mobile/MobileBottomSheet';
import Button from '~/components/common/Button';
import ProductThumb from '~/components/product/Thumb';
import Loader from '~/components/common/Loader';
import FilterAccordion from '~/components/mobile/FilterAccordion';
import ItemDivider from '~/components/profile/notifications/ItemDivider';

export default {
  name: 'SneakerReward',
  components: {
    ItemDivider,
    FilterAccordion, Loader, ProductThumb, Button, MobileBottomSheet, MobileSearchInput, filterSvg
  },
  layout: 'Profile',
  data() {
    return {
      loading: false,
      mobileFiltersOpen: false,
      search: '',
      SORT_OPTIONS: [
        {
          label: this.$t('shop.sort_by.featured'),
          value: 'featured',
        },
        {
          label: this.$t('shop.sort_by.price_low_first'),
          value: 'price_asc',
        },
        {
          label: this.$t('shop.sort_by.price_high_first'),
          value: 'price_desc',
        },
        {
          label: this.$t('shop.sort_by.most_viewed'),
          value: 'most_viewed',
        },
        {
          label: this.$t('shop.sort_by.best_sellers'),
          value: 'best_sellers',
        },
      ],
      sortBy: null,
      CATEGORIES: [
        {label: this.$t('common.all'), value: null},
        {label: this.$t('common.footwear'), value: 'sneakers'},
        {label: this.$t('common.apparel'), value: 'apparel'},
        {label: this.$tc('common.accessory', 2), value: 'accessories'},
      ],
      category: null,
      products: [],
      loadingFilter: true,
      page: 1,
      perPage: 6,
    }
  },
  mounted() {
    this.fetchProducts()
  },
  methods: {
    itemClick(product) {
      this.$store.commit('rewards/setSelectedSneaker', product)
      this.$nextTick(() => {
        this.$router.push('/profile/rewards/sneaker-reward-size')
      })
    },
    searchChanged(s) {
      this.search = s
    },
    fetchProducts: debounce(function () {
      if (!this.perPage || !this.page) return

      this.loading = true
      const filters = {}
      if (this.sortBy) {
        filters.sort_by = this.sortBy
      }
      if (this.search) {
        filters.search = this.search
      }
      if (this.category) {
        filters.category = this.category
      }
      if (this.selectedPrices) {
        filters.prices = this.selectedPrices.join('-')
      }
      if (this.selectedBrands) {
        filters.brands = this.selectedBrands.join(',')
      }
      if (this.selectedSizes) {
        filters.sizes = this.selectedSizes.join(',')
      }
      if (this.selectedSizeTypes) {
        filters.size_types = this.selectedSizeTypes.join(',')
      }
      if (this.selectedYears) {
        filters.years = this.selectedYears.join('-')
      }

      this.$axios
          .get('/list-all-products', {
            params: {filters, page: this.page, per_page: this.perPage},
          })
          .then((res) => {
            this.products = res.data.data
            console.log(this.products);
          })
          .finally(() => {
            this.loading = false
            this.mobileFiltersOpen = false
          })
    }, 500)
  }
}
</script>

<style lang="sass" scoped>
@import "~/assets/css/variables"
.sneaker-reward-page
  background-color: $color-white-1
  padding: 7px 16px

  .title
    margin-top: 32px
    @include body-17-bold
    font-family: $font-montserrat

  .desc
    margin-top: 2px
    @include body-1424
    font-weight: $regular
    font-family: $font-family-sf-pro-display
    color: $color-gray-4

  .products
    .item
      margin-top: 14px

  .product-thumb
    padding: 10px
    height: 185px
    width: 164px

  .product-name
    @include body-21
    font-family: $font-family-sf-pro-display
    font-style: normal
    font-weight: $medium

  .product-color
    @include body-9
    font-family: $font-family-sf-pro-display
    font-style: normal
    font-weight: $normal
    color: $color-gray-5

.filters
  padding: 28px 21px

.h-88
  height: 92%

::v-deep.divider
  border-top: 1px solid $color-gray-62
  margin-inline: 0
  margin-block: 20px
</style>
