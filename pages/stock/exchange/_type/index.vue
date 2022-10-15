<template>
  <div class="container-fluid promotions">
    <div class="row">
      <ExchangeBanner :title="$t('deadstock_exchange.title')"></ExchangeBanner>
      <div class="col-12 py-5 text-center">
        <NavGroup
            :data="categoryItems"
            :value="currentCategory"
            class="section-nav"
            nav-key="new_releases"
            @change="handleCategoryChange"
        />
      </div>
      <div class="container container-auction-details">
        <div class="row ">
          <div class="col-12 col-md-11 col-sm-11 mx-auto">
            <ProductList  :loading="loading" :title="currentCategory"></ProductList>
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

export default {
  components: {
    ExchangeBanner,
    NavGroup,
    ProductList,
  },
  layout(context) {
    return context.$auth.user ? 'Profile' : 'IndexLayout'
  },
  data() {
    return {
      fetching: false,
      categoryItems: [
        {label: this.$t('deadstock_exchange.trendings'), value: 'Top Products'},
        {label: this.$t('deadstock_exchange.biggest_winners'), value: 'Biggest Winners'},
        {label: this.$t('deadstock_exchange.biggest_lossers'), value: 'Biggest Lossers'},
      ],
      currentCategory: 'Top Products',
      loading: false
    }
  },
  methods: {
    handleCategoryChange(category) {
      if (this.currentCategory !== category) {
        this.currentCategory = category

      }
    }
  },
}
</script>
