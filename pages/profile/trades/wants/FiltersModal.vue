<template>
  <MobileBottomSheet
    :max-height="'50%'"
    :open="isOpen"
    @closed="$emit('closed')"
    @opened="$emit('opened')"
    :headerStyle="{
      display: 'none !important'
    }"
  >
    <div class="">
      <div class="header">
        {{ $t('common.filter_by') }}
        <img 
          @click="$emit('closed')" 
          :src="require('assets/img/icons/close-gray.svg')"
          class="close-icon" 
        />
      </div>

      <div class="content">

        <div class="d-flex flex-column">
          <div class="mt-3 mb-2 label">{{ $t('offers_received.sort') }}</div>
          <div
            v-for="sort in sortOptions"
            :key="sort.value"
            class="mt-1 d-flex align-items-center"
          >
            <input 
              type="radio" 
              class="radio-button" 
            />
            <span class="sort-option">{{ sort.text }}</span>
          </div>
        </div>

        <div class="separator"></div>

        <FilterAccordion :title="$tc('common.size_type', 1)">
          <ButtonSelector 
            :options="sizeTypesOptions" 
            :contentStyle="{
              display: 'flex',
              justifyContent: 'space-between',
              rowGap: '15px',
              marginTop: '20px'
            }"
            @change="sizeTypeChange"
          />
        </FilterAccordion>

        <div class="separator"></div>

        <FilterAccordion :title="$tc('home_page.categories', 1)">
          <ButtonSelector 
            :options="categoriesOptions" 
            :contentStyle="{
              display: 'flex',
              justifyContent: 'space-between',
              rowGap: '15px',
              marginTop: '15px',
              marginLeft: '-7.5px'
            }"
            @change="categoryChange"
          />
        </FilterAccordion>

        <div class="separator"></div>

        <FilterAccordion :title="$tc('trades.index.browse.product_type', 1)">
          <ButtonSelector 
            :options="productTypeOptions"
            :contentStyle="{
              display: 'flex',
              justifyContent: 'space-between',
              rowGap: '15px',
              marginTop: '15px',
              marginLeft: '-7.5px'
            }"
            @change="productTypeChange"
          />
        </FilterAccordion>

        <div class="separator"></div>

        <FilterAccordion :title="$tc('product_page.sizes', 1)">
          <ButtonSelector 
            :options="sizesOptions"
            :contentStyle="{
              display: 'flex',
              justifyContent: 'space-between',
              rowGap: '15px',
              marginTop: '15px',
              marginLeft: '-7.5px'
            }"
            @change="sizesChange"
          />
        </FilterAccordion>

        <div class="separator"></div>

        <FilterAccordion :title="$tc('home_page.size', 1)">
          <ButtonSelector 
            :options="sizeOptions"
            :contentStyle="{
              display: 'flex',
              justifyContent: 'space-between',
              rowGap: '15px',
              marginLeft: '-7.5px'
            }"
            @change="sizeChange"
          />
        </FilterAccordion>

        <div class="separator"></div>

        <div class="d-flex justify-content-between">
          <Button
            class="filter-button"
            pill
            variant="outline-dark"
            @click="resetForm"
          >
            {{ $t('notifications.reset') }}
          </Button>

          <Button
            :disabled="filterChangeCount === 0"
            class="filter-button apply-filters"
            pill
            variant="blue"
          >
            {{ applyLabel }}
          </Button>
        </div>
      </div>
    </div>
  </MobileBottomSheet>
</template>

<script>
import MobileBottomSheet from '~/components/mobile/MobileBottomSheet'
import FilterAccordion from '~/components/mobile/FilterAccordion';
import Button from '~/components/common/Button';
import ButtonSelector from '~/components/mobile/ButtonSelector';
import { SORT_BY, SIZE_TYPES, PRODUCT_TYPES } from '~/static/constants/trades'
import { SNEAKER_SIZES, APPAREL_SIZES } from '~/static/constants/sizes'


export default {
  name: 'FiltersModal',

  components: {
    MobileBottomSheet,
    FilterAccordion,
    Button,
    ButtonSelector
  },

  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },

  data() {
    console.log('SNEAKER_SIZES', SNEAKER_SIZES);
    console.log('APPAREL_SIZES', APPAREL_SIZES);
    return {
      sortBy: 'trending',
      sizeTypesOptions: SIZE_TYPES.map(item => ({ text: this.$t(item.text), value: item.value })),
      categoriesOptions: [
        { text: this.$t('common.footwear'), value: 'sneakers' },
        { text: this.$t('common.apparel'), value: 'apparel' },
        { text: this.$t('common.categories.accessories'), value: 'accessories' },
      ],
      sortOptions: SORT_BY.map(item => ({ text: this.$t(item.text), value: item.value })),
      productTypeOptions: PRODUCT_TYPES.map(item => ({ text: this.$t(item.text), value: item.value })),
      sizesOptions: SNEAKER_SIZES.map(item => ({ text: item, value: item })),
      sizeOptions: APPAREL_SIZES.map(item => ({ text: item, value: item })),
      filters: {
        types: [],
        years: null,
        search: null,
        status: ''
      },
    };
  },

  computed: {
    applyLabel() {
      const count = this.filterChangeCount
      return this.$t('notifications.apply_filters') + (count > 0 ? ` (${count})` : '')
    },
    filterChangeCount() {
      return Object.values(this.filters).filter(a => a && a.length !== 0).length
    }
  },

  mounted() {
    console.log('MOUNS OP', this.isOpen);
  },

  methods: {
    resetForm() {
      this.filters = {
        types: [],
        years: null,
        search: null,
        status: ''
      }
      this.$emit('filter', this.filters)
    },

    sizeTypeChange() {

    },

    categoryChange() {

    },

    productTypeChange() {

    },

    sizeChange() {

    },

    sizesChange() {

    }

  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.header
  color: #000
  font-family: $font-family-sf-pro-display
  font-weight: 700
  font-size: 17px
  border-bottom: 1px solid $color-gray-4
  padding: 0 30px 18px 30px
  display: flex
  flex-direction: column
  align-items: center

.close-icon
  width: 14px
  height: 14px
  align-self: end
  margin-top: -20px

.content
  padding-left: 29px
  padding-right: 29px

.label
  font-family: $font-family-sf-pro-display
  font-weight: 700
  font-size: 16px
  color: $color-blue-20

.sort-option
  font-family: $font-family-sf-pro-display
  font-weight: 500
  font-size: 14px
  margin-left: 10px

.radio-button[type="radio"]
  accent-color: #000

.separator
  width: 100%
  height: 1px
  background: $color-gray-62
  margin-top: 20px
  margin-bottom: 20px

</style>