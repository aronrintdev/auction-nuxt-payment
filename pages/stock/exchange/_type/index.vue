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
            <TopProductsList  :loading="loading" :title="currentCategory"></TopProductsList>
            <ProductTrendListCard />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ExchangeBanner from '~/components/stockExchange/Banner'
import NavGroup from '~/components/common/NavGroup.vue'
import TopProductsList from '~/components/stockExchange/TopProductsList'

export default {
  components: {
    ExchangeBanner,
    NavGroup,
    TopProductsList,
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
