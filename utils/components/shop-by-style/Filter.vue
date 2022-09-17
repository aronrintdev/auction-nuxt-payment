<template>
  <div class="filter-wrapper d-flex align-items-center flex-column">
    <div class="header">{{ $tc('common.filter', 1) }}</div>

    <div class="main mt-2 w-100">
      <FormCheckboxGroup
        v-model="sizeTypeSelected"
        :options="sizeTypeOptions"
        :label="$tc('common.size_type', 1)"
        class="form-checkbox-group"
      />
      <b-row>
        <b-col sm="2">
          <b-form-datepicker
            size="sm"
            locale="en"
            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
            class="mr-2"
            :placeholder="$t('shop_by_style.filter.start_date')"
          ></b-form-datepicker>
        </b-col>
        <b-col sm="2">
          <b-form-datepicker
            size="sm"
            locale="en"
            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
            class="mr-2"
            :placeholder="$t('shop_by_style.filter.end_date')"
          ></b-form-datepicker>
        </b-col>
      </b-row>
      <div
        class="d-flex align-items-baseline justify-content-end section-actions"
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
import { Button, FormCheckboxGroup, Icon } from '~/components/common'

export default {
  name: 'ShopByStyleFilter',

  components: {
    Button,
    FormCheckboxGroup,
    Icon,
  },

  data() {
    return {
      sizeTypeSelected: [],
      filtersApplied: {
        sizeTypeSelected: [],
      },
    }
  },

  computed: {
    ...mapGetters('browse', ['filters']),
    sizeTypeOptions() {
      return this.filters?.size_types?.map((type) => {
        return { text: capitalizeFirstLetter(type), value: type }
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
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

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
