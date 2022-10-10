<template>
  <div class="container-fluid promotions">
    <div class="row">
      <PromotionsBanner :title="$t('deadstock_exchange.title')"></PromotionsBanner>
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
            <TopProductsList v-if="currentCategory === 'sweepstakes'" :loading="loading"></TopProductsList>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions} from 'vuex';
import PromotionsBanner from '~/components/deadstock-exchange/Banner'
import NavGroup from '~/components/common/NavGroup.vue'
import TopProductsList from '~/components/deadstock-exchange/TopProductsList'

export default {
  components: {
    PromotionsBanner,
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
        {label: this.$t('promotions.sweepstakes'), value: 'sweepstakes'},
        {label: this.$t('promotions.giveaways'), value: 'giveaway'},
        {label: this.$t('promotions.promotions'), value: 'promotion'},
      ],
      currentCategory: 'sweepstakes',
      loading: false
    }
  },
  mounted() {
    this.fetchPromotion()
  },
  methods: {
    ...mapActions({
      getPromotions: 'promotions/getPromotions'
    }),
    handleCategoryChange(category) {
      if (this.currentCategory !== category) {
        this.currentCategory = category
        this.fetchPromotion()
      }
    },
    fetchPromotion() {
      this.loading = true
      this.getPromotions({
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
