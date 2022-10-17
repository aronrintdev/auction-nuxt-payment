<template>
  <div>
  <create-trade-search-item v-if="searchItem" :product="searchItem" productFor="wantsList" :combinationId="combinationId"/>
  <div v-else class="add-item-container">
    <div  class="back-to-wants" role="button" @click="backWants">
      <b-icon icon="chevron-left" aria-hidden="true"></b-icon>
      {{$t('trades.wants_listing.back_to_want_list')}}
    </div>
    <div class="d-flex align-items-center pt-4">
      <div class="wants-heading">{{$t('trades.wants_listing.search_for_want')}}</div>
      <div class="wants-sub-heading pl-4 pt-1">{{$t('trades.wants_listing.start_by_searching')}}</div>
    </div>
    <div class="col-md-8 col-sm-12 pt-4">
      <SearchInput
        :value="searchText"
        variant="primary"
        :placeholder="$t('create_listing.trade.offer_items.search_by')"
        :clearSearch="true"
        inputHeight="60px"
        bordered
        @change="onSearchInput"
      />
      <SearchedProductsBelowSearchTextBox v-if="searchedItems.length > 0" :productItems="searchedItems" inputType="wantsList" />
    </div>
  </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
import SearchInput from '~/components/common/SearchInput'
import SearchedProductsBelowSearchTextBox from '~/components/product/SearchedProductsBelowSearchTextBox';
import CreateTradeSearchItem from '~/pages/profile/create-listing/trades/CreateTradeSearchItem';
import {
    TAKE_SEARCHED_PRODUCTS
  } from '~/static/constants/trades'

export default {
  name: 'AddWantItem',
  components: {CreateTradeSearchItem, SearchedProductsBelowSearchTextBox, SearchInput},
  layout: 'Profile',
  props:{
    combinationId: {
      type: Number,
      default: () => null,
    },
  },
  data() {
    return {
      searchText: null,
      searchedItems: [],
      searchItem: null,
    }
  },
  mounted() {
    // emit listener use to add want item
    this.$root.$on('add_product_want_list', (val) => {
      this.searchItem = val
    })
    // emit listener use to take user back from search selection
    this.$root.$on('back_to_search_wants', () => {
      this.searchItem = null
      this.searchText = null
      this.searchedItems = []
    })
  },
  methods: {
    ...mapActions('trades', ['searchProductsList']),
    backWants() {
      this.searchedItems = []
      if(this.combinationId){
        this.$root.$emit('back_to_edit_combination')
      }
      else {
        this.$router.push('/profile/trades/wants')
      }
    },
    /**
     * This function is used to get product and show in
     * listing below input search field
     * @param term
     */
    onSearchInput(term) {
      this.searchText = term
      if (term) {
        this.searchProductsList({
          search: term.toLowerCase(),
          take: TAKE_SEARCHED_PRODUCTS
        })
          .then((response) => {
            this.searchedItems = response.data && response.data.results && response.data.results.data // items for search list
          })
          .catch((error) => {
            this.$toasted.error(this.$t(error.response.data.error))
            this.searchedItems = []
          })
      } else {
        this.searchText = null
        this.searchedItems = []
      }
    },
  }


}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.add-item-container
  padding: 25px

.back-to-wants
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-13-regular
  letter-spacing: 0.06em
  color: $color-black-1

.wants-heading
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include heading-1
  color: $color-black-1

.wants-sub-heading
  font-family: $font-family-montserrat
  font-style: normal
  @include body-4-normal
  color: $color-gray-5

</style>
