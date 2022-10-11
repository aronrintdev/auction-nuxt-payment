<template>
  <div class="promotions-category-page">
    <div v-if="!isScreenXS" class="d-flex promotions-category-page-title">
      <div class="mt-4 promotions-category-page-title-before"></div>
      <div class="text-uppercase text-center promotions-category-page-title-content px-5">{{
          $t('promotions.promotions')
        }}
      </div>
      <div class="mt-4 promotions-category-page-title-after"></div>
    </div>
    <div v-if="!loading" :class="{'promotions-cards-wrapper': !!promotions.length}" class="overflow-auto mb-2">
      <div v-for="(promotion, index) in promotions" :key="promotion.id">
        <PromotionCard :data="promotion" :imageAlign="imageAlignment(index)"></PromotionCard>
      </div>
      <div v-if="promotions.length===0" class="d-flex align-items-center justify-content-center my-5">
        <h3>{{ $t('promotions.not_found') }} {{ $t('promotions.promotions') }}</h3>
      </div>
    </div>
    <div v-else class="d-flex align-items-center justify-content-center h-500">
      <Loader :loading="loading"></Loader>
    </div>
    <VideoCarousel v-if="!isScreenXS"></VideoCarousel>
    <FAQ></FAQ>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import FAQ from '~/components/promotions/FAQ'
import VideoCarousel from '~/components/promotions/VideoCarousel'
import PromotionCard from '~/components/promotions/PromotionCard'
import Loader from '~/components/common/Loader';
import screenSize from '~/plugins/mixins/screenSize';

export default {
  name: 'PromotionsTab',
  components: {
    Loader,
    VideoCarousel,
    FAQ,
    PromotionCard,
  },
  mixins: [screenSize],
  props: {
    loading: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      promotions: 'promotions/getPromotions',
    }),
    imageAlignment() {
      return index => (index + 1) % 2 === 0 && !this.isScreenXS ? 'right' : 'left'
    }
  }
};
</script>
<style lang="sass" scoped>
.promotions-cards-wrapper
  height: 750px
</style>
