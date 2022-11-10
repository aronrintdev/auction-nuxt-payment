<template>
  <MobileBottomSheet
    :max-height="'80%'"
    :open="isOpen"
    :height="'80%'"
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
      </div>

      <div class="content">
        <div class="filters-wrapper">
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

          <FilterAccordion 
            :title="$t('trades.offer_type_label')" 
            :data="filters.offerType.text"
            titleSectionClass=""
          >
            <ButtonSelector 
              :options="offerTypes" 
              :single="true"
              itemClass="mt-3"
              :marginLeft="0"
              :contentStyle="{
                marginLeft: '0'
              }"
              @change="offerTypeChange"
            />
          </FilterAccordion>

          <div class="separator"></div>

          <FilterAccordion 
            :title="$t('trades.trade_condition')" 
            :data="tradeLabel"
          >
            <ButtonSelector 
              :options="tradeConditions"
              itemClass="mt-3"
              :marginLeft="0"
              :contentStyle="{
                marginLeft: '0'
              }"
              @change="tradeChange"
            />
          </FilterAccordion>

          <div class="separator"></div>

          <FilterAccordion 
            :title="$t('success.status')" 
            :data="statusLabel"
          >
            <ButtonSelector 
              :options="statusOptions"
              itemClass="mt-3"
              :marginLeft="0"
              :contentStyle="{
                marginLeft: '0'
              }"
              @change="statusChange"
            />
          </FilterAccordion>

          <div class="separator"></div>

          <FilterAccordion 
            :title="$t('offers_received.offer_date')" 
            :data="dateRangeLabel"
          >
            <div class="row justify-content-between">
              <div class="col-6">
                <input 
                  class="date-picker"
                  format="DD/MM/YYYY"
                  type="date" 
                  @change="changeStartDate"
                />
              </div>
              <div class="col-6">
                <input 
                  class="date-picker" 
                  :placeholder="$t('common.end_date')"
                  format="DD/MM/YYYY"
                  type="date" 
                  @change="changeEndDate"
                />
              </div>
            </div>
          </FilterAccordion>

          <div class="separator"></div>
        </div>

        <div class="d-flex justify-content-between pb-5">
          <Button
            class="filter-button"
            pill
            variant="outline-dark"
            @click="resetForm"
          >
            {{ $t('notifications.reset') }}
          </Button>

          <Button
            class="filter-button apply-filters"
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
import moment from 'moment'
import MobileBottomSheet from '~/components/mobile/MobileBottomSheet'
import {
  FILTER_RECENT_TO_OLDEST,
  FILTER_OLDEST_TO_RECENT,
  FILTER_CONDITION_POOR,
  FILTER_CONDITION_FAIR,
  FILTER_CONDITION_EXCELLENT,
  FILTER_OFFER_STATUS_OPEN,
  FILTER_OFFER_STATUS_DECLINED,
  FILTER_OFFER_STATUS_ACCEPTED,
  FILTER_OFFER_STATUS_DELETED,
} from '~/static/constants/trades';
import FilterAccordion from '~/components/mobile/FilterAccordion';
import ButtonSelector from '~/components/mobile/ButtonSelector';
import Button from '~/components/common/Button';

export default {
  name: 'FiltersModal',

  components: {
    MobileBottomSheet,
    FilterAccordion,
    ButtonSelector,
    Button
  },

  data() {
    return {
      sortOptions: [
        { text: this.$t('trades.offers_recent_to_oldest'), value: FILTER_RECENT_TO_OLDEST },
        { text: this.$t('trades.offers_oldest_to_recent'), value: FILTER_OLDEST_TO_RECENT },
      ],
      offerTypes: Object.keys(this.$t('trades.offer_type')).map(a => {
        return {
          text: this.$t('trades.offer_type.' + a),
          value: a
        }
      }),
      tradeConditions: [
        { text: this.$t('trades.poor'), value: FILTER_CONDITION_POOR },
        { text: this.$t('trades.fair'), value: FILTER_CONDITION_FAIR },
        { text: this.$t('trades.excellent'), value: FILTER_CONDITION_EXCELLENT },
      ],
      statusOptions: [
        { text: this.$t('trades.offer_status.open'), value: FILTER_OFFER_STATUS_OPEN },
        { text: this.$t('trades.offer_status.declined'), value: FILTER_OFFER_STATUS_DECLINED },
        { text: this.$t('trades.offer_status.accepted'), value: FILTER_OFFER_STATUS_ACCEPTED },
        { text: this.$t('trades.offer_status.deleted'), value: FILTER_OFFER_STATUS_DELETED },
      ],
      filters: {
        sortBy: FILTER_RECENT_TO_OLDEST,
        offerType: { text: '', value: '' },
        trade: [],
        status: [],
        start_date: '',
        end_date: ''
      },
    }
  },

  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
    
  methods: {
    resetForm() {
      this.filters = {
        sortBy: FILTER_RECENT_TO_OLDEST,
        offerType: { text: '', value: '' },
        trade: [],
        status: [],
        start_date: '',
        end_date: ''
      }
      this.$emit('filter', this.filters)
    },
    
    offerTypeChange(value) {
      this.filters.offerType = this.offerTypes.find(v => v.value === value);
    },

    tradeChange(value) {
      this.filters.trade = value;
    },

    statusChange(value) {
      this.filters.status = value;
    },

    changeStartDate(e) {
      this.filters.start_date = e.target.value
    },

    changeEndDate(e) {
      this.filters.end_date = e.target.value
    }
  },

  computed: {
    filterChangeCount() {
      let count = 0
      if (this.filters.sortBy !== FILTER_RECENT_TO_OLDEST) {
        count++
      }
      if (this.filters.offerType.value.length > 0) {
        count++
      }
      if (this.filters.trade.length > 0) {
        count++
      }
      if (this.filters.status.length > 0) {
        count++
      }
      if (this.filters.start_date.length > 0 || this.filters.end_date.length > 0) {
        count++
      }
      return count
    },

    applyLabel() {
      const count = this.filterChangeCount
      return this.$t('notifications.apply_filters') + (count > 0 ? ` (${count})` : '')
    },

    dateRangeLabel() {
      const start = this.filters.start_date
      const end = this.filters.end_date
      const format = 'MM/DD/YYYY'
      if (start && end) {
        return `${moment(start).format(format)} - ${moment(end).format(format)}`
      } else if (start) {
        return moment(start).format(format)
      } else if (end) {
        return moment(end).format(format)
      }

      return ''
    },

    tradeLabel() {
      const result = this.filters.trade.reduce((acc, item, index) => {
        const found = this.tradeConditions.find(v => v.value === item);
        if (index === 0) {
          return found.text
        } else {
          return `${acc}, ${found.text}`;
        }
      }, '')
      return result;
    },

    statusLabel() {
      const result = this.filters.status.reduce((acc, item, index) => {
        const found = this.statusOptions.find(v => v.value === item);
        if (index === 0) {
          return found.text
        } else {
          return `${acc}, ${found.text}`;
        }
      }, '')
      return result;
    },
  }

}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.date-picker
  @include body-9-medium
  color: $color-black-4
  margin-top: 20px
  border-radius: 10px
  height: 49px
  border-width: 1px

.filter-button
  @include body-4-medium
  width: 140px
  padding: 0

.apply-filters
  background-color: $color-blue-20 !important

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