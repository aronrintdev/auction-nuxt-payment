<template>
  <div :class="mobileClass" class="container-fluid promotions">
    <div class="row">
      <PromotionsBanner :title="$t('promotions.promotions')"></PromotionsBanner>
      <div class="col-12 py-4 text-center">
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
            <CurrentSweepstakesTab v-if="currentCategory === 'sweepstakes'" :loading="loading"></CurrentSweepstakesTab>
            <GiveawaysTab v-if="currentCategory === 'giveaway'" :loading="loading"></GiveawaysTab>
            <PromotionsTab v-if="currentCategory === 'promotion'" :loading="loading"></PromotionsTab>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions} from 'vuex';
import PromotionsBanner from '~/components/promotions/Banner'
import NavGroup from '~/components/common/NavGroup.vue'
import CurrentSweepstakesTab from '~/components/promotions/CurrentSweepstakesTab'
import GiveawaysTab from '~/components/promotions/GiveawaysTab'
import PromotionsTab from '~/components/promotions/PromotionsTab'
import screenSize from '~/plugins/mixins/screenSize';

export default {
  components: {
    PromotionsBanner,
    NavGroup,
    CurrentSweepstakesTab,
    GiveawaysTab,
    PromotionsTab,
  },
  mixins: [screenSize],
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
<style lang="sass" scoped>
@import "~/assets/css/variables"
.promotions
  &.mobile
    background-color: $color-white-1
</style>
