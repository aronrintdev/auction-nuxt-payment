<template>
  <div class="pagination-wrapper">
    <b-pagination
      :value="value"
      :total-rows="total"
      :per-page="perPage"
      :align="align"
      first-number
      last-number
      class="pagination-nav"
      @page-click="handlePageClick"
      @input="handleValueInput"
      @change="handlePageChange"
    >
      <template #prev-text
        ><Icon src="pagination-arrow-left.svg" alt-text="prev"
      /></template>
      <template #next-text
        ><Icon src="pagination-arrow-right.svg" alt-text="next"
      /></template>
    </b-pagination>

    <b-dropdown class="dropdown-per-page">
      <template #button-content>
        {{ `${perPage} / page` }}
        <img :src="require('~/assets/img/icons/carret.svg')" />
      </template>
      <b-dropdown-item
        v-for="(option, index) in perPageOptions"
        :key="`per-page-option-${index}`"
        @click="handlePerPageChange(option)"
      >
        {{ option }}
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>
<script>
import Icon from '~/components/common/Icon'

export default {
  name: 'Pagination',

  components: { Icon },

  props: {
    value: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      default: 0,
    },
    align: {
      type: String,
      default: 'center',
    },
    perPageOptions: {
      type: Array,
      default: () => [8, 12, 16, 20],
    },
  },

  methods: {
    handlePerPageChange(option) {
      this.$emit('per-page-change', option)
    },

    handlePageClick(bvEvent, page) {
      this.$emit('page-click', bvEvent, page)
    },

    handleValueInput(page) {
      this.$emit('input', page)
    },

    handlePageChange(page) {
      this.$emit('change', page)
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.pagination-wrapper
  display: flex
  align-items: center
  justify-content: center

  .pagination-nav::v-deep
    @include body-8-bold
    margin: 0 10px 0 0

    &.pagination
      li
        display: flex
        align-items: center

      li >span
        border: none

      li >button
        @include body-8-bold
        border: none

      li.page-item
        .page-link
          color: $color-gray-4
          background: none

          &:hover
            box-shadow: none
            color: $color-black-1

        &.active .page-link
          color: $color-black-1
          background: none

  .dropdown-per-page::v-deep
    button
      @include body-5-regular
      background-color: $color-white-1
      color: $color-black-1
      border: 1px solid $color-gray-23
      border-radius: 0px
      padding: 7px 10px
      display: flex
      align-items: center

      &:active, &:hover
        background-color: $color-gray-1
        color: $color-black-1
        border-color: $color-gray-23

      &::after
        content: none

      img
        margin-left: 10px
</style>
