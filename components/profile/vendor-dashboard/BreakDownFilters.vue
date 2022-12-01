<template>
  <div class="breakdown-filters">
    <MultiSelectDropdown
        v-model="selectedFilters.brands"
        collapseKey="brands"
        :title="$t('filter_sidebar.brands').toString()"
        :options="brandOptions"
        class="brands"
    >
      <template #firstRow>
        <div>
          <SearchInput
              :placeholder="
                $t('vendor_dashboard.breakdown.search_brand').toString()
              "
              class="search-filter"
              :debounce="1000"
              :input-height="'26px'"
              @search="filterBrands"
          />
        </div>
      </template>
    </MultiSelectDropdown>

  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import screenSize from '~/plugins/mixins/screenSize';
import MultiSelectDropdown from '~/components/common/MultiSelectDropdown';
import SearchInput from '~/components/common/SearchInput';

export default {
  name: 'BreakDownFilters',
  components: {SearchInput, MultiSelectDropdown},
  mixins: [screenSize],
  props: {
    currentTab: {
      type: String,
      required: true
    }
  },
  data() {
    return{
      brandSearch: null,
      selectedFilters: {
        brands: []
      }
    }
  },
  computed:{
    ...mapGetters(
        'browse', [ 'filters' ],
    ),
    brandOptions() {
      const res = this.filters?.brands?.map(({ name }) => {
        return { label: name, value: name }
      }).filter(item => this.brandSearch? item.label.toLowerCase().includes(this.brandSearch) : true)

      res.unshift(
          { label: this.$t('vendor_dashboard.breakdown.select_all'), value: 'all_selected' }
      )
      return res
    },
  },
  methods:{
    filterBrands(text){
      this.brandSearch = text
    }
  }
}
</script>

<style scoped lang="sass">
@import "~/assets/css/variables"
.breakdown-filters
  margin-top: 13px

  ::v-deep.search-filter
    margin-bottom: 14px
    .icon-search
      height: 13px
      width: 13px
      margin-left: 8px
      margin-right: 14px
    input.search-input
      @include body-5-normal
      font-family: $font-family-sf-pro-display
      border-radius: 0
      padding: 8px 8px 8px 25px

::v-deep.brands
  width: 330px
</style>
