<template>
  <div class="container-fluid promotions">
    <div class="row">
      <PromotionsBanner :banner-image="promotion? promotion.learn_more_page_banner : null"
                        :title="promotion? promotion.name : null"></PromotionsBanner>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <RulesForEntering v-if="promotion && !loading" :promotion="promotion"></RulesForEntering>
            <PromotionBodyWithTimer
                v-if="promotion && !loading"
                :promotion="promotion"
            ></PromotionBodyWithTimer>
            <div v-if="loading" class="d-flex align-items-center justify-content-center h-500">
              <Loader :loading="loading"></Loader>
            </div>
            <HowToEnterSingle :category="category"></HowToEnterSingle>
            <VideoCarouselWithText></VideoCarouselWithText>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions} from 'vuex';
import PromotionsBanner from '~/components/promotions/Banner'
import RulesForEntering from '~/components/promotions/RulesForEntering'
import HowToEnterSingle from '~/components/promotions/HowToEnterSingle'
import VideoCarouselWithText from '~/components/promotions/VideoCarouselWithText'
import PromotionBodyWithTimer from '~/components/promotions/PromotionBodyWithTimer'
import {Loader} from '~/components/common';
import {PROMOTION_TYPE_SWEEPSTAKES} from '~/static/constants';

export default {
  name: 'PromotionsSweepstakePage',
  components: {
    Loader,
    PromotionsBanner,
    RulesForEntering,
    HowToEnterSingle,
    VideoCarouselWithText,
    PromotionBodyWithTimer,
  },
  layout(context) {
    return context.$auth.user ? 'Profile' : 'IndexLayout'
  },
  data() {
    return {
      loading: false,
      promotion: null
    }
  },
  computed: {
    category() {
      return this.promotion ? this.promotion.type : PROMOTION_TYPE_SWEEPSTAKES
    },
  },
  mounted() {
    this.fetchPromotion()
  },
  methods: {
    ...mapActions({
      getSinglePromotion: 'promotions/getSinglePromotion'
    }),
    fetchPromotion() {
      this.loading = true
      this.getSinglePromotion(this.$route.params.id).then(res => {
        console.log(res);
        this.promotion = res.data.data
      }).catch(err => {
        this.$toasted.error(this.$t(err.response.data.message).toString())
        this.$router.push('/promotions')
      }).finally(() => {
        this.loading = false
      })
    }

  },
}
</script>
