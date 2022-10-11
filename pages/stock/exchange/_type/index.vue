<template>
  <div class="container-fluid promotions">
    <div class="row">
      <Banner></Banner>
      <div class="col-12 py-5 text-center">
        <NavGroup
            :data="categoryItems"
            :value="currentCategory"
            class="section-nav"
            nav-key="new_releases"
            @change="handleCategoryChange"
        />
      </div>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <TopProductsList  v-if="currentCategory === $t('deadstock_exchange.trending')" :loading="loading"></TopProductsList>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
import Banner from '~/components/Exchange/Banner'
import NavGroup from '~/components/common/NavGroup.vue'
import TopProductsList from '~/components/Exchange/TopProductsList'

export default {
  components: {
    Banner,
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
        {label: this.$t('deadstock_exchange.trending'), value: 'trending'},
        {label: this.$t('deadstock_exchange.biggest_gainers'), value: 'biggest_gainers'},
        {label: this.$t('deadstock_exchange.biggest_losers'), value: 'biggest_losers'},
      ],
      currentCategory: this.$route.params.type,
      loading: false
    }
  },
  methods: {
    ...mapActions({
      getStockExchange: 'stockExchange/getPromotions'
    }),
    handleCategoryChange(category) {
      if (this.currentCategory !== category) {
        this.currentCategory = category
        this.$router.push('/stock/exchange/'+ this.currentCategory)
      }
    },
    fetchStockExchange() {
      this.loading = true
      this.getStockExchange({
        type: this.currentCategory,
        status: 'active'
      }).catch(err => {
        this.$toasted.error(this.$t(err.response.data.message).toString())
      }).finally(() => {
        this.loading = false
      })
    }
  },
}
</script>
