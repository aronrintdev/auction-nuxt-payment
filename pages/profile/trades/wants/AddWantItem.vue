<template>
  <div>
    <edit-item 
      v-if="addItem" 
      :style="{
        background: '#FAFAFA'
      }"
      :product="addItem" 
      productFor="wantsList" 
      :itemId="addItem.id"
      :combinationId="combinationId"
    />
    <div v-else class="add-item-container">
      <div class="back-to-wants" role="button" @click="backWants">
        <b-icon icon="chevron-left" aria-hidden="true"></b-icon>
        {{$t('trades.wants_listing.back_to_want_list')}}
      </div>
      <div class="d-flex flex-column text-center text-sm-left flex-sm-row align-items-center pt-4">
        <div class="wants-heading">{{$t('trades.wants_listing.search_for_want')}}</div>
        <div class="wants-sub-heading pl-sm-4 pt-1">{{$t('trades.wants_listing.start_by_searching')}}</div>
      </div>
      <div class="col-sm-12 col-xl-8 py-4 px-0">
        <SearchInput
          :value="searchText"
          variant="primary"
          :placeholder="$t('create_listing.trade.offer_items.search_by')"
          :clearSearch="true"
          inputHeight="60px"
          :inputStyle="{ 
            borderColor: '#99999950', 
            paddingLeft: '74px',
            fontFamily: 'Montserrat', 
            color: '#000',
            fontWeight: 500,
            fontSize: '16px',
          }"
          :isOpen="searchedItems.length > 0"
          :onOpenStyle="{
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }"
          inputClass="search-mobile"
          iconStyle='position: relative; left: 12px;'
          bordered
          @change="onSearchInput"
        />
        <SearchedProductsBelowSearchTextBox 
          v-if="searchedItems.length > 0" 
          :productItems="searchedItems" 
          inputType="wantsList"
          :wrapperStyle="{ margin: 0 }"
          :itemStyle="{ padding: 0 }"
          :suggestNewStyle="{
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0
          }"
          @add_product_want_list="redirectToAddWant"
        />
        
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import debounce from 'lodash.debounce'
import SearchInput from '~/components/common/SearchInput'
import SearchedProductsBelowSearchTextBox from '~/components/product/SearchedProductsBelowSearchTextBox';
import EditItem from '~/pages/profile/trades/wants/EditItem';
import {
    TAKE_SEARCHED_PRODUCTS
  } from '~/static/constants/trades'

export default {
  name: 'AddWantItem',
  components: {
    SearchedProductsBelowSearchTextBox, 
    SearchInput,
    EditItem
  },
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
      addItem: null
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

    this.$root.$on('back_to_list', () => {
      this.addItem = null
    })

    const wrapper = document.querySelector('.main-wrapper')
    if (wrapper.querySelector('.add-item-container')) {
      wrapper.style.backgroundColor = '#f7f7f7'
    }
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
    redirectToAddWant(product) {
      this.addItem = {
        product,
        packaging_condition: {
          id: '',
          name: ''
        },
        packaging_condition_id: '',
        size: {
          id: ''
        },
        latestSales: null
      }
    },
    /**
     * This function is used to get product and show in
     * listing below input search field
     * @param term
     */
    onSearchInput: debounce(function (term) {
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
    }, 500)
  }


}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.add-item-container
  padding: 15px 12px 0 12px
  background: $color-white-1
  @media (min-width: 576px)
    background: $color-white-5
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

.search-item
  border: 0.5px solid $color-gray-89
  margin-top: 11px
  border-radius: 4px
  padding: 10px

.add-item-button
  @include body-9-medium
  background: $color-blue-20
  border-radius: 5px
  display: flex
  align-items: center
  justify-content: center
  font-family: $font-family-sf-pro-display
  color: $color-white-1
  height: 22px

.searched-product-name
  @include body-10-normal
  color: $color-black-15

.no-product
  @include body-6-normal
  font-style: italic
  color: $color-black-1
  letter-spacing: 1px

</style>
