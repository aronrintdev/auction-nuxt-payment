<template>
  <MobileBottomSheet
      :open="open"
      :title="$t('notifications.filter_by')"
      @closed="$emit('closed')"
      @opened="$emit('opened')">
    <div class="filter-content py-2 px-4 d-flex flex-column justify-content-between">
      <div class="mt-2 flex-grow-1">
        <FilterAccordion :title="$t('notifications.type')">
          <div class="mt-2">
            <ButtonSelector :all="true" :options="types" :values="filters.types" @change="typeChange"/>
          </div>
        </FilterAccordion>
        <hr/>
        <FilterAccordion :title="$t('notifications.status')">
          <div class="mt-2">
            <ButtonSelector :all="true" :options="statuses" :single="true" :values="filters.status"
                            @change="statusChange"/>
          </div>
        </FilterAccordion>
        <hr/>
        <FilterAccordion :title="$t('notifications.date_range')">
          <div class="mt-2 d-flex align-items-center justify-content-between">
            <input
                v-model="filters[0]"
                :placeholder="$t('notifications.start_date')"
                class="date-input"
                onblur="(this.type='text')"
                onfocus="(this.type='date')"
                type="text"
            />
            <input
                v-model="filters[1]"
                :placeholder="$t('notifications.end_date')"
                class="date-input"
                onblur="(this.type='text')"
                onfocus="(this.type='date')"
                type="text"
            />
          </div>
        </FilterAccordion>
        <hr/>
      </div>
      <div class="d-flex align-items-center justify-content-between">
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
            @click="emitFilter"
        >
          {{ applyLabel }}
        </Button>
      </div>
    </div>
  </MobileBottomSheet>
</template>

<script>
import _ from 'lodash'
import MobileBottomSheet from '~/components/mobile/MobileBottomSheet';
import FilterAccordion from '~/components/mobile/FilterAccordion';
import Button from '~/components/common/Button';
import ButtonSelector from '~/components/mobile/ButtonSelector';

export default {
  name: 'NotificationMobileFilters',
  components: {ButtonSelector, Button, FilterAccordion, MobileBottomSheet},
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      filters: {
        types: [],
        years: null,
        search: null,
        status: ''
      },
      types: Object.keys(this.$t('notifications.types')).map(key => {
        return {
          text: this.$t(`notifications.types.${key}`),
          value: key,
        }
      }),
      statuses: Object.keys(this.$t('notifications.filters')).map(key => {
        return {
          text: this.$t(`notifications.filters.${key}`),
          value: key,
        }
      }).filter(item => item.value !== 'all')
    }
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
  methods: {
    typeChange(e) {
      this.filters.types = e
    },
    statusChange(e) {
      this.filters.status = e
    },
    resetForm() {
      this.filters = {
        types: [],
        years: null,
        search: null,
        status: ''
      }
      this.$emit('filter', this.filters)
    },
    emitFilter: _.debounce(function () {
      this.$emit('filter', this.filters)
    }, 500)
  }
}
</script>

<style lang="sass" scoped>
@import "~/assets/css/variables"
.filter-content
  height: 87%

input.date-input
  @include body-9
  height: 49px
  width: 154px
  border-radius: 10px
  border: 1px solid $color-black-1
  font-family: $font-montserrat
  font-style: normal
  font-weight: $medium
  color: $color-black-4
  padding: 15px 17px

::v-deep.filter-button
  height: 40px
  width: 135px

  &.apply-filters.btn
    background-color: $color-blue-20
    border: none
    white-space: nowrap
</style>