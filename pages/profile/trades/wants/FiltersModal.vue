<template>
  <MobileBottomSheet
    :max-height="'80%'"
    :open="isOpen"
    :headerStyle="{
      display: 'none !important'
    }"
    :hasHeaderDivider="false"
    @closed="$emit('closed')"
    @opened="$emit('opened')"
  >
    <div class="">
      <div class="header">
        {{ $t('common.filter_by') }}
        <img 
          :src="require('assets/img/icons/close-gray.svg')" 
          class="close-icon"
          @click="$emit('closed')" 
        />
      </div>

      <div class="content">

        <div class="d-flex flex-column">
          <div class="mt-3 mb-2 label">{{ $t('offers_received.sort') }}</div>
          <div
            v-for="sort in sortOptions"
            :key="sort.value"
            class="mt-1 d-flex align-items-center"
            @click="filters.sortBy = sort.value"
          >
            <input 
              type="radio" 
              class="radio-button"
              :checked="sort.value === filters.sortBy"
            />
            <span class="sort-option">{{ sort.text }}</span>
          </div>
        </div>

        <div class="separator"></div>

        <FilterAccordion :title="$tc('home_page.categories', 1)" :data="filters.category.text">
          <ButtonSelector 
            :options="categoriesOptions" 
            :contentStyle="{
              display: 'flex',
              justifyContent: 'space-between',
              rowGap: '15px',
              marginTop: '15px',
              marginLeft: '-7.5px'
            }"
            :single="true"
            @change="categoryChange"
          />
        </FilterAccordion>

        <div class="separator"></div>

        <FilterAccordion 
          :title="$tc('common.size_type', 1)" 
          :data="sizeTypesLabel"
        >
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

        <FilterAccordion 
          :title="$t('home_page.size', 1)" 
          :data="sizeLabel"
        >
          <ButtonSelector 
            :options="sizeOptions"
            :contentStyle="{
              display: 'flex',
              justifyContent: 'space-between',
              rowGap: '15px',
              marginTop: '15px',
              marginLeft: '-7.5px'
            }"
            itemClass="size-45"
            @change="sizeChange"
          />
        </FilterAccordion>

        <div class="separator"></div>

        <div class="d-flex justify-content-between mb-3">
          <Button
            class="col-5 filter-button"
            pill
            variant="outline-dark"
            @click="resetForm"
          >
            {{ $t('notifications.reset') }}
          </Button>

          <Button
            class="col-5 filter-button apply-filters"
            pill
            variant="blue"
            @click="$emit('submit', filters)"
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
import { SIZE_TYPES, WANTS_SORT_OPTIONS } from '~/static/constants/trades'
import { APPAREL_SIZES } from '~/static/constants/sizes'


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
    return {
      sizeTypesOptions: SIZE_TYPES.map(item => ({ text: this.$t(item.text), value: item.value })),
      categoriesOptions: [
        { text: this.$t('common.footwear'), value: 'sneakers' },
        { text: this.$t('common.apparel'), value: 'apparel' },
        { text: this.$t('common.categories.accessories'), value: 'accessories' },
      ],
      sortOptions: WANTS_SORT_OPTIONS.map(item => ({ text: this.$t(item.text), value: item.value })),
      sizeOptions: APPAREL_SIZES.map(item => ({ text: item, value: item })),
      filters: {
        sortBy: 'price_asc',
        size_type: [],
        category: { text: '', value: '' },
        size: []
      },
    };
  },

  computed: {
    applyLabel() {
      const count = this.filterChangeCount
      return this.$t('notifications.apply_filters') + (count > 0 ? ` (${count})` : '')
    },
    filterChangeCount() {
      let count = 0
      if (this.filters.sortBy !== 'price_asc') {
        count++
      }
      if (this.filters.category.value.length > 0) {
        count++
      }
      if (this.filters.size_type.length > 0) {
        count++
      }
      if (this.filters.size.length > 0) {
        count++
      }
      return count
    },
    sizeTypesLabel() {
      const result = this.filters.size_type.reduce((acc, item, index) => {
        const found = this.sizeTypesOptions.find(v => v.value === item);
        if (index === 0) {
          return found.text
        } else {
          return `${acc}, ${found.text}`;
        }
      }, '')

      return result;
    },
    sizeLabel() {
      const result = this.filters.size.reduce((acc, item, index) => {
        const found = this.sizeOptions.find(v => v.value === item);
        if (index === 0) {
          return found.text
        } else {
          return `${acc}, ${found.text}`;
        }
      }, '')

      return result;
    }
  },

  mounted() {
  },

  methods: {
    resetForm() {
      this.filters = {
        sortBy: 'price_asc',
        size_type: [],
        category: { text: '', value: '' },
        size: []
      }
      this.$emit('filter', this.filters)
    },

    sizeTypeChange(value) {
      this.filters.size_type = value;
    },

    categoryChange(value) {
      this.filters.category = this.categoriesOptions.find(v => v.value === value);
    },

    sizeChange(value) {
      this.filters.size = value;
    },
    
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.header
  @include body-17-bold
  color: $color-black-1
  font-family: $font-family-sf-pro-display
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
  @include body-4-bold
  font-family: $font-family-sf-pro-display
  color: $color-blue-20

.sort-option
  @include body-5-normal
  font-family: $font-family-sf-pro-display
  margin-left: 10px

.radio-button[type="radio"]
  accent-color: $color-black-1

.separator
  width: 100%
  height: 1px
  background: $color-gray-62
  margin-top: 20px
  margin-bottom: 20px

</style>