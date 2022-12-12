<template>
  <div class="container-fluid promotions">
    <div class="row">
      <div v-if="isResponsive" class="col-12">
        <div class="col-md-12 col-sm-12">
          <StockExchangeMobileFilter @change="handleFilterChange"/>
        </div>
      </div>
      <ExchangeBanner :title="$t('deadstock_exchange.title')"></ExchangeBanner>
      <div class="col-12 py-5 text-center">
        <NavGroup
          :data="categoryItems"
          :value="currentCategory[0].value"
          class="section-nav"
          nav-key="new_releases"
          @change="handleCategoryChange"
        />
      </div>
      <div class="container container-auction-details">
        <div class="row">
          <div class="col-12 col-md-11 col-sm-11 mx-auto">
            <ProductList ref="productList"  :loading="loading" :title="currentCategory" ></ProductList>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ExchangeBanner from '~/components/Exchange/Banner'
import NavGroup from '~/components/common/NavGroup.vue'
import ProductList from '~/components/Exchange/ProductList'
import StockExchangeMobileFilter from '~/components/Exchange/MobileFilter'
import screenSize from '~/plugins/mixins/screenSize'
import { enquireScreenSizeHandler } from '~/utils/screenSizeHandler'

export default {
  components: {
    ExchangeBanner,
    NavGroup,
    ProductList,
    StockExchangeMobileFilter
  },
  mixins:[screenSize],
  layout: 'IndexLayout',
  data() {
    return {
      fetching: false,
      categoryItems: [
        {
          label: this.$t('deadstock_exchange.trendings'),
          value: 'trending',
        },
        {
          label: this.$t('deadstock_exchange.biggest_winners'),
          value: 'top-gainers',
        },
        {
          label: this.$t('deadstock_exchange.biggest_lossers'),
          value: 'top-losers',
        },
      ],
      currentCategory: [],
      loading: false,
      screenWidth: 0,
    }
  },
  computed: {
    isResponsive() {
      return this.isScreenXS || this.isScreenSM
    },
  },
  created(){
    this.currentCategory = this.categoryItems.filter(({ value }) => value === this.$route.params.type )
    // this.myEventHandler()
  },
  beforeMount() {
    enquireScreenSizeHandler((type) => {
      this.$store.commit('size/setScreenType', type)
    })
  },
  methods: {
    handleFilterChange() {
      this.$refs.productList.filterList()
    },
    handleCategoryChange(category) {
      if (this.currentCategory !== category) {
        this.currentCategory = this.categoryItems.filter(({ value }) => value === category )
        this.$router.push('/stock/exchange/'+category.replace(/\s/g, ''))
      }
    },
  },
}
</script>
