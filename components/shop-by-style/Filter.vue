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
            class="mt-4"
          />
        </div>
        <div class="offset-sm-1 col-sm-2 mb-4">
          <FilterCollapsible
            v-model="brandsSelected"
            collapseKey="brands"
            :title="$t('filter_sidebar.brands')"
            :options="brandOptions"
            class="mt-4"
          />
        </div>
        <div class="col-sm-7">
          <div class="col-sm-1 w-fit-content">
            <div
              v-for="(option, index) in sizeTypeSelected"
              :key="index"
              class="mx-1 p-1 br-5 d-flex align-items-center bg-white"
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

export default {
  name: 'ShopByStyleFilter',

  components: {
    Button,
    Icon,
    FilterCollapsible
  },

  data() {
    return {
      sizeTypeSelected: [],
      filtersApplied: {
        sizeTypeSelected: [],
      },
      brandsSelected: []
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
      return this.sizeTypeSelected.length
    },

    filtersUpdated() {
      return (
        _.xor(this.sizeTypeSelected, this.filtersApplied.sizeTypeSelected)
          .length > 0
      )
    },
  },

  methods: {
    resetFilter() {
      this.sizeTypeSelected.splice(0, this.sizeTypeSelected.length)
      this.handleApply()
    },

    handleApply() {
      const filters = {}
      if (this.sizeTypeSelected && this.sizeTypeSelected.length > 0) {
        filters.sizeTypes = this.sizeTypeSelected
      }
      this.$emit('apply', filters)
      this.filtersApplied = _.cloneDeep({
        sizeTypeSelected: this.sizeTypeSelected,
      })
    },

    removeOption(index) {
      this.sizeTypeSelected.splice(index, 1)
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.w-fit-content
  width: fit-content
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
