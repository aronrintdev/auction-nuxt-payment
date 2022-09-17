<template>
  <div class="promotions-category-page">
    <div class="d-flex promotions-category-page-title">
      <div class="mt-4 promotions-category-page-title-before"></div>
      <div class="text-uppercase text-center promotions-category-page-title-content px-5">{{
          $t('promotions.giveaways')
        }}
      </div>
      <div class="mt-4 promotions-category-page-title-after"></div>
    </div>
    <div v-if="currentGiveaway && !loading">
      <div class="text-center my-5">
        <img :src="currentGiveaway.promotion_image" class="main-image"/>
      </div>
      <div class="text-center heading-4-bold">{{ currentGiveaway.name }}</div>
      <div class="body-3-normal text-center w-75 m-auto py-2">{{ currentGiveaway.description }}</div>
      <div class="text-center my-4">
        <Button
            class="px-5"
            variant="dark"
            @click="learnMore"
        >
          {{ $t('promotions.learn_more') }}
        </Button>
      </div>
      <CountDownTimer :endDate="currentGiveaway.end_at"></CountDownTimer>
    </div>
    <div v-if="loading" class="d-flex align-items-center justify-content-center h-500">
      <Loader :loading="loading"></Loader>
    </div>
    <div v-if="!loading && !currentGiveaway" class="d-flex align-items-center justify-content-center my-5">
      <h3>{{ $t('promotions.not_found') }} {{ $t('promotions.giveaways') }}</h3>
    </div>
    <div class="text-center d-flex align-items-center my-4 terms-and-conditions">
      <div class="body-5-regular px-4">
        {{ $t('promotions.want_to_know_more') }}&nbsp;<nuxt-link to="/terms">
        <strong>{{ $t('promotions.terms_and_conditions') }}</strong></nuxt-link>
      </div>
    </div>
    <HowToEnter></HowToEnter>
    <PromosTypes></PromosTypes>
    <VideoCarousel></VideoCarousel>
    <FAQ></FAQ>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import Button from '~/components/common/Button'
import CountDownTimer from '~/components/promotions/CountDownTimer'
import FAQ from '~/components/promotions/FAQ'
import VideoCarousel from '~/components/promotions/VideoCarousel'
import PromosTypes from '~/components/promotions/PromosTypes'
import HowToEnter from '~/components/promotions/HowToEnter'
import {Loader} from '~/components/common';

export default {
  name: 'PromotionsGiveawaysTab',
  components: {
    Loader,
    Button,
    CountDownTimer,
    FAQ,
    VideoCarousel,
    PromosTypes,
    HowToEnter,
  },
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
    currentGiveaway() {
      return this.promotions.length ? this.promotions[0] : null
    },
  },
  methods: {
    learnMore() {
      this.$router.push({
        path: `/promotions/${this.currentGiveaway.id}`
      })
    }
  }
};
</script>
