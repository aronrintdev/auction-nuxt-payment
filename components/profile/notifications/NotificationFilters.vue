<template>
  <div>
    <div class="my-4 d-flex searchbox">
      <div class="form-group rounded-search-input d-flex align-items-center ma-0 border-0">
        <img :src="searchIcon" alt="search" class="icon-search"/>
        <input id="product-search-input" v-model="filters.search" :placeholder="$t('notifications.search')" class="text-capitalize border-0 w-100"
               type="text" @input="emitFilter">
      </div>
    </div>
    <div class="my-4">
      <WhiteDropDown
          :id="'multiSelect'"
          :label="$t('notifications.type')"
          class="mr-4"
      >
        <div class="px-4">
          <div class="type-checkboxes">
            <b-form-checkbox
                :checked="isAllSelected"
                class="d-flex flex-column"
                @change="selectAllWhenOptions"
            >
              {{ $t('notifications.all') }}
            </b-form-checkbox>
          </div>
          <b-form-checkbox-group
              v-model="filters.types"
              :options="types"
              class="type-checkboxes d-flex flex-column"
              @change="typeChange"
          ></b-form-checkbox-group>
        </div>
      </WhiteDropDown>

      <WhiteDropDown
          :id="'dateRange'"
          :label="$t('notifications.date_range')"
          class="mr-4"
      >
        <div class="px-4 d-flex">
          <SliderInput
              v-model="filters.years"
              :fromLabel="$t('filter_sidebar.year_items.from')"
              :maxLabel="$t('filter_sidebar.year_items.end')"
              :maxValue="NOTIFICATION_MAX_YEAR"
              :minLabel="$t('filter_sidebar.year_items.start')"
              :minRange="NOTIFICATION_MIN_YEAR_RANGE_WINDOW"
              :minValue="NOTIFICATION_MIN_YEAR"
              :toLabel="$t('filter_sidebar.year_items.to')"
              @input="emitFilter"
          >
          </SliderInput>
        </div>
      </WhiteDropDown>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import WhiteDropDown from '~/components/profile/notifications/WhiteDropDown';
import searchIcon from '~/assets/img/icons/search.svg';
import SliderInput from '~/components/common/SliderInput';
import {
  NOTIFICATION_MAX_YEAR,
  NOTIFICATION_MIN_YEAR,
  NOTIFICATION_MIN_YEAR_RANGE_WINDOW
} from '~/static/constants/notifications';

export default {
  name: 'NotificationFilters',
  components: {SliderInput, WhiteDropDown},
  data() {
    return {
      isAllSelected: false,
      NOTIFICATION_MIN_YEAR_RANGE_WINDOW,
      NOTIFICATION_MIN_YEAR,
      NOTIFICATION_MAX_YEAR,
      filters: {
        types: [],
        years: null,
        search: null
      },
      searchIcon,
      types: Object.keys(this.$t('notifications.types')).map(key => {
        return {
          text: this.$t(`notifications.types.${key}`),
          value: key,
        }
      })
    }
  },
  methods: {
    selectAllWhenOptions(e) {
      this.filters.types = e ? this.types.map(a => a.value) : []
      this.emitFilter()
    },
    typeChange(e) {
      this.isAllSelected = this.filters.types.length === this.types.length
      this.emitFilter()
    },
    emitFilter: _.debounce(function () {
      this.$emit('filter', this.filters)
    }, 500)
  }
}
</script>

<style lang="sass" scoped>
@import "~/assets/css/variables"

.type-checkboxes::v-deep
  .custom-checkbox
    input[type="checkbox"]:checked + label::after
      background-color: $color-blue-2

    label
      @include body-13
      font-family: $font-family-sf-pro-display
      font-style: normal
      font-weight: $normal
      color: $color-gray-5
      white-space: nowrap
      padding-top: 2px

      &:before
        background-color: $color-white-5
        border: none
        box-shadow: none
        border-radius: 0

.searchbox::v-deep
  flex: 1

  .rounded-search-input
    width: 961px
    border-radius: 8px
    background: $color-white-1
    padding: 13px 21px


    .icon-search
      width: 18px
      height: 18px
      margin-right: 20px

    input
      @include body-13
      font-weight: $normal
      color: $color-black-1
      letter-spacing: 0.06em
      outline: none
</style>