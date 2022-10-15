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


    <!--    Filters mobile -->
    <MobileBottomSheet
        :height="'90%'"
        :open="mobileFiltersOpen"
        :title="$t('rewards.sneaker_page.filter_by').toString()"
        @closed="mobileFiltersOpen = false"
        @opened="mobileFiltersOpen = true"
    >
      <template #default>
        <div class="d-flex flex-column align-items-center justify-content-between h-88 w-100 filters">
          <div class="d-flex flex-column w-100 ">
            <FilterAccordion :open="true" :title="$t('rewards.sneaker_page.sort')">
              <b-form-radio-group
                  v-model="sortBy"
                  :options="sortOptions"
                  class="d-flex flex-column  mt-2 sort-filters"
              >

              </b-form-radio-group>
            </FilterAccordion>
            <ItemDivider/>

            <FilterAccordion :title="$tc('common.size_type', 1)">
              <ButtonSelector :options="sizeTypeOptions" :values="searchFilters.sizeTypes" @change="sizeTypeChange"/>
            </FilterAccordion>

            <ItemDivider/>
            <FilterAccordion :title="$t('filter_sidebar.sizes')">
              <ButtonSelector :options="sizeOptions" :values="searchFilters.sizes" @change="sizeChange"/>
            </FilterAccordion>

            <ItemDivider/>
            <FilterAccordion :title="$t('filter_sidebar.price')">
              <SliderInput
                  v-model="searchFilters.prices"
                  :fromLabel="$t('filter_sidebar.price_items.from')"
                  :maxLabel="$t('filter_sidebar.price_items.max')"
                  :maxValue="maxPrice"
                  :minLabel="$t('filter_sidebar.price_items.min')"
                  :minRange="MIN_PRICE_RANGE_WINDOW"
                  :minValue="minPrice"
                  :multiplier="100"
                  :title="''"
                  :toLabel="$t('filter_sidebar.price_items.to')"
                  class=""
              />
            </FilterAccordion>

            <ItemDivider/>
            <FilterAccordion :title="$t('filter_sidebar.brands')">
              <ButtonSelector :options="brandOptions" :values="searchFilters.brands" @change="brandChange"/>
            </FilterAccordion>
            <ItemDivider/>
            <FilterAccordion :title="$t('filter_sidebar.year')">
              <div class="sliders">
                <SliderInput
                    v-model="searchFilters.years"
                    :fromLabel="$t('filter_sidebar.year_items.from')"
                    :maxLabel="$t('filter_sidebar.year_items.end')"
                    :maxValue="maxYear"
                    :minLabel="$t('filter_sidebar.year_items.start')"
                    :minRange="MIN_YEAR_RANGE_WINDOW"
                    :minValue="minYear"
                    :title="''"
                    :toLabel="$t('filter_sidebar.year_items.to')"
                    class=""
                />
              </div>
            </FilterAccordion>
          </div>
          <div class="w-100 d-flex justify-content-between buttons">
            <Button
                :disabled="loading"
                class="filter-button"
                pill
                variant="outline-dark"
                @click="reset"
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
import {mapActions, mapGetters} from 'vuex';
import MobileSearchInput from '~/components/mobile/MobileSearchInput';
import filterSvg from '~/assets/img/profile/notifications/filters.svg?inline'
import MobileBottomSheet from '~/components/mobile/MobileBottomSheet';
import Button from '~/components/common/Button';
import ProductThumb from '~/components/product/Thumb';
import Loader from '~/components/common/Loader';
import FilterAccordion from '~/components/mobile/FilterAccordion';
import ItemDivider from '~/components/profile/notifications/ItemDivider';
import SliderInput from '~/components/common/SliderInput';
import {
  MIN_PRICE_RANGE_WINDOW,
  MIN_YEAR_RANGE_WINDOW,
  MIN_YEAR,
  MAX_YEAR,
  MIN_PRICE,
  MAX_PRICE,
} from '~/static/constants'
import ButtonSelector from '~/components/mobile/ButtonSelector';

export default {
  name: 'SneakerReward',
  components: {
    ButtonSelector,
    SliderInput,
    ItemDivider,
    FilterAccordion, Loader, ProductThumb, Button, MobileBottomSheet, MobileSearchInput, filterSvg
  },
  layout: 'Profile',
  data() {
    return {
      MIN_PRICE_RANGE_WINDOW,
      MIN_YEAR_RANGE_WINDOW,
      MIN_YEAR,
      MAX_YEAR,
      MIN_PRICE,
      MAX_PRICE,
      loading: false,
      mobileFiltersOpen: false,
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
      CATEGORIES: [
        {label: this.$t('common.all'), value: null},
        {label: this.$t('common.footwear'), value: 'sneakers'},
        {label: this.$t('common.apparel'), value: 'apparel'},
        {label: this.$tc('common.accessory', 2), value: 'accessories'},
      ],
      sortBy: 'trending',
      search: '',
      searchFilters: {
        years: null,
        prices: null,
        brands: null,
        sizes: null,
        sizeTypes: null,
      },
      products: [],
      loadingFilter: true,
      page: 1,
      perPage: 6,
    }
  },
  computed: {
    ...mapGetters('browse', [
      'filters'
    ]),
    minYear() {
      if (this.filters?.year_range?.min == null) {
        return MIN_YEAR
      } else {
        return Number(this.filters?.year_range?.min)
      }
    },

    maxYear() {
      if (this.filters?.year_range?.max == null) {
        return MAX_YEAR
      } else {
        return Number(this.filters?.year_range?.max)
      }
    },

    minPrice() {
      if (this.filters?.price_range?.min == null) {
        return MIN_PRICE
      } else {
        return Number(this.filters?.price_range?.min)
      }
    },

    maxPrice() {
      if (this.filters?.price_range?.max == null) {
        return MAX_PRICE
      } else {
        return Number(this.filters?.price_range?.max)
      }
    },
    sizeOptions() {
      let options = this.filters?.sizes
      if (options && this.sizeTypes && this.sizeTypes.length > 0) {
        options = options.filter(({type}) => this.sizeTypes.includes(type))
      }
      return (
          options?.map(({id, size, type}) => {
            return {
              text: `${type} - ${size}`,
              value: id,
            }
          }) || []
      )
    },

    brandOptions() {
      return this.filters?.brands?.map(({name}) => {
        return {text: name, value: name}
      })
    },

    sortOptions() {
      return Object.keys(this.$t('rewards.sneaker_page.sort_options')).map(key => {
        return {
          text: this.$t(`rewards.sneaker_page.sort_options.${key}`),
          value: key
        }
      })
    },

    sizeTypeOptions() {
      return this.filters?.size_types?.map((type) => {
        return {text: type, value: type}
      })
    }
  },
  mounted() {
    this.fetchFilters()
    this.fetchProducts()
  },
  methods: {
    ...mapActions('browse', ['fetchFilters']),
    reset() {
      this.sortBy = 'trending'
      this.searchFilters = {
        years: null,
        prices: null,
        brands: null,
        sizes: null,
        sizeTypes: null,
      }
      this.fetchProducts()
    },
    sizeTypeChange(data) {
      this.searchFilters.sizeTypes = data
    },
    sizeChange(data) {
      this.searchFilters.sizes = data
    },
    brandChange(data) {
      this.searchFilters.brands = data
    },
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
      const filters = {...this.searchFilters}
      if (this.sortBy) {
        filters.sort_by = this.sortBy
      }
      if (this.search) {
        filters.search = this.search
      }
      if (this.searchFilters.prices) {
        filters.prices = this.searchFilters.prices.join('-')
      }
      if (this.searchFilters.brands) {
        filters.brands = this.searchFilters.brands.join(',')
      }
      if (this.searchFilters.sizes) {
        filters.sizes = this.searchFilters.sizes.join(',')
      }
      if (this.searchFilters.sizeTypes) {
        filters.size_types = this.searchFilters.sizeTypes.join(',')
      }
      if (this.searchFilters.years) {
        filters.years = this.searchFilters.years.join('-')
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

.buttons
  margin-top: 10px

::v-deep.divider
  border-top: 1px solid $color-gray-62
  margin-inline: 0
  margin-block: 20px

::v-deep.sort-filters
  .custom-control
    display: flex
    align-items: center

    label
      @include body-5-normal
      padding-top: 3px
      font-family: $font-family-sf-pro-display
      font-style: normal
      color: $color-black-9

      &:before
        color: $color-black-1
        border-color: $color-black-1
        background-color: $color-white-1
        box-shadow: none

::v-deep.sort-filters
  .custom-control-input
    &:checked ~ .custom-control-label::after
      background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3E%3Ccircle r='4' fill='%23000'/%3E%3C/svg%3E")

</style>
