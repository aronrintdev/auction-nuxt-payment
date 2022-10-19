<template>
  <div class="filter-wrapper d-flex align-items-center flex-column">
    <div class="header">{{ $tc('common.filter', 1) }}</div>

    <div class="main w-100">
      <div class="row">
        <div class="collapses col-sm-2 mb-4">
          <FilterCollapsible
            v-model="sizeTypeSelected"
            collapseKey="size-types"
            :title="$tc('common.size_type', 1)"
            :options="sizeTypeOptions"
            class="p-2 mb-1  border border-success rounded"
          />
        </div>
        <div class="offset-sm-1 col-sm-3 mb-4">
          <SearchFilterCollapsible
            v-model="brandsSelected"
            collapseKey="brands"
            :title="$t('filter_sidebar.brands')"
            :options="brands ? brands : brandOptions"
            class="p-2 mb-1  border border-success rounded"
            @searchBrands="handleSearchChange"
          />
        </div>
        <div class="col-sm-6">
          <div class="row w-fit-content">
            <div
              v-for="(option, index) in sizeTypeSelected"
              :key="index"
              class="p-1 br-5 d-flex align-items-center border border-success rounded ml-1 mt-1"
              @click.prevent
            >
              <span class="text-capitalize">{{ option }}</span>
              <span class="ml-3" @click.prevent="removeOption(index)">
                <Icon
                  src="close.svg"
                  width="10"
                  height="10"
                  class="btn-close"
                />
              </span>
            </div>
            <div
              v-for="(option, index) in brandsSelected"
              :key="index"
              class="p-1 br-5 d-flex align-items-center border border-success rounded ml-1 mt-1"
              @click.prevent
            >
              <span class="text-capitalize">{{ option }}</span>
              <span class="ml-3" @click.prevent="removeBrand(index)">
                <Icon
                  src="close.svg"
                  width="10"
                  height="10"
                  class="btn-close"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div
          class="offset-sm-9 col-sm-3 mt-3 d-flex align-items-baseline justify-content-end section-actions"
        >
          <Button
            v-if="filtersSelected"
            variant="link"
            class="btn-clear mx-5 flex-shrink-0"
            @click="resetFilter"
            >{{ $t('vendor_purchase.clear_all_filters') }}</Button
          >
          <Button
            variant="info"
            class="btn-apply flex-shrink-0"
            :disabled="!filtersUpdated"
            @click="handleApply"
            >{{ $t('filter_sidebar.apply_filters') }}</Button
          >
        </div>
      </div>
    </div>

    <div class="text-center">
      <Icon
        src="arrow-up-gray3.svg"
        width="20"
        height="20"
        class="mt-2 btn-close"
        @click="$emit('close')"
      />
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { capitalizeFirstLetter } from '~/utils/string'
import { Button, Icon } from '~/components/common'
import FilterCollapsible from '~/components/common/FilterCollapsible'
import SearchFilterCollapsible from '~/components/common/SearchFilterCollapsible.vue'

export default {
  name: 'ShopByStyleFilter',

  components: {
    Button,
    Icon,
    SearchFilterCollapsible,
    FilterCollapsible
  },

  data() {
    return {
      sizeTypeSelected: [],
      filtersApplied: {
        sizeTypeSelected: [],
        brandsSelected: []
      },
      brandsSelected: [],
      brands: null,
    }
  },

  computed: {
    ...mapGetters('browse', ['filters']),
    
    brandOptions() {
      return this.filters?.brands?.map(({ name }) => {
        return { label: name, value: name }
      })
    },

    sizeTypeOptions() {
      return this.filters?.size_types?.map((type) => {
        return { label: capitalizeFirstLetter(type), value: type }
      })
    },

    filtersSelected() {
      return this.sizeTypeSelected.length+this.brandsSelected.length
    },

    filtersUpdated() {
      return (
        _.xor(this.sizeTypeSelected, this.filtersApplied.sizeTypeSelected, this.brandsSelected)
          .length > 0
      )
    },
  },

  methods: {
    resetFilter() {
      this.sizeTypeSelected.splice(0, this.sizeTypeSelected.length)
      this.brandsSelected.splice(0, this.brandsSelected.length)
      this.handleApply()
    },

    handleApply() {
      const filters = {}
      if ((this.sizeTypeSelected && this.sizeTypeSelected.length > 0) || (this.brandsSelected && this.brandsSelected.length > 0)) {
        filters.sizeTypes = this.sizeTypeSelected
        filters.brandsSelected = this.brandsSelected
      }
      this.$emit('apply', filters)
      this.filtersApplied = _.cloneDeep({
        sizeTypeSelected: this.sizeTypeSelected,
        brandsSelected: this.brandsSelected,

      })
    },

    removeOption(index) {
      this.sizeTypeSelected.splice(index, 1)
    },
    removeBrand(index) {
      this.brandsSelected.splice(index, 1)
    },
    handleSearchChange(value) {
      if(value) {
        this.brands = this.brandOptions
        const result = [];
        this.brands.forEach((element,index) => {
            if (element.label.toLowerCase().includes(value.toLowerCase())) {
                  result.push(element);
            }
        });
        this.brands = result.length ? result : this.brandOptions
      }
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.w-fit-content
  width: fit-content
.filters-heading 
  &.h2
    margin-top: 0 !important
.filter-wrapper
  .header
    @include body-2-medium
    color: $color-black-1

  .main
    font-family: $font-family-sf-pro-display
    background-color: $color-white-5
    padding: 20px 18px 11px 40px

    .btn-apply::v-deep
      @include body-4-normal

    .btn-clear::v-deep
      @include body-4-normal
      text-decoration: underline

  .btn-close
    cursor: pointer

@media (max-width: 576px)
  .filter-wrapper
    .main
      .section-actions
        flex-direction: column
        align-items: center !important

        > button
          margin: 10px 0 !important
</style>
