<template>
  <div class="trade banner-section">
    <div class="position-relative h-100">
      <img :src="require('~/assets/img/mobileTrade.svg')" class="trade banner-image w-100" />
      <div class="banner-content position-absolute">
      <!-- Search Items Input -->
      <SearchInput :placeholder="$t('trades.index.browse.search_trades')" :value="searchedText" @input="setSearchedText" />
      <SearchedOfferItems :searchedOfferItems="searchedItems" />
      </div>
    </div>
  </div>
</template>

<script>
import SearchedOfferItems from '~/components/trade/SearchedOfferItems.vue'
import SearchInput from '~/components/common/SearchInput';
export default {
  name: 'TradeBanner',
  components: {
    SearchInput,
    SearchedOfferItems
  },
  data() {
    return {
      searchedText: '',
      searchedItems: []
    }
  },
  methods:{
    setSearchedText(searchedText){
      this.searchedText = searchedText
      this.$store.commit('trade/setSearchedText', searchedText)
      this.$emit('applyFilters')
    },
  }
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.banner-section img
  height: 85%

.banner-content
  bottom: 70%
  width: 70%
  left: 5%
  //height: 30%
  font-family: $font-montserrat
  background-color:  rgba(247, 247, 247, 0.5)
  font-size: 16px
  & h1
    @include heading-5
  & p
    font-weight: $regular
    width: 82%
  & button
    background-color: $color-blue-2
    color: $color-white-1
    font-weight: $medium
    border-radius: 45px
    line-height: 2.5
    width: 45%
    border: none
    position: absolute
    bottom: 18px


</style>
