<template>
  <div class="promotions-category-page">
    <div class="d-flex promotions-category-page-title">
      <div class="mt-4 promotions-category-page-title-before">
        <div class="pt-3 d-flex align-items-center">
          <img :src="require('~/assets/img/promotions/entries.svg')" alt="entries"/>
          <div class="ml-2 text-center">
            <div class="body-2-bold entries-label">{{ $t('promotions.your_entries') }}</div>
            <div v-if="currentSweepStake && !loading" class="body-1-bold entries-score">{{ entries }}</div>
          </div>
        </div>
      </div>
      <div class="text-uppercase text-center px-5 promotions-category-page-title-content">
        {{ $t('promotions.current_sweepstakes') }}
      </div>
      <div class="mt-4 promotions-category-page-title-after">
      </div>
    </div>
    <div v-if="currentSweepStake && !loading">
      <div class="text-center my-5">
        <img :src="currentSweepStake.promotion_image" class="main-image"/>
      </div>
      <div class="text-center heading-4-bold">{{ currentSweepStake.name }}</div>
      <div class="body-3-normal text-center w-75 m-auto py-2">{{ currentSweepStake.description }}</div>
      <div class="text-center my-4">
        <Button
            class="px-5"
            variant="dark"
            @click="learnMore"
        >
          {{ $t('promotions.learn_more') }}
        </Button>
      </div>
      <CountDownTimer :endDate="currentSweepStake.end_at"></CountDownTimer>
    </div>
    <div v-if="loading" class="d-flex align-items-center justify-content-center h-500">
      <Loader :loading="loading"></Loader>
    </div>
    <div v-if="!loading && !currentSweepStake" class="d-flex align-items-center justify-content-center my-5">
      <h3>{{ $t('promotions.not_found') }} {{ $t('promotions.sweepstakes') }}</h3>
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
    <InviteFriends></InviteFriends>
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
import InviteFriends from '~/components/promotions/InviteFriends'
import {Loader} from '~/components/common';

export default {
  name: 'PromotionsCurrentSweepstakesTab',
  components: {
    Loader,
    Button,
    CountDownTimer,
    FAQ,
    VideoCarousel,
    PromosTypes,
    HowToEnter,
    InviteFriends,
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
    currentSweepStake() {
      return this.promotions.length ? this.promotions[0] : null
    },
    entries() {
      return this.currentSweepStake && this.$auth.user ? this.currentSweepStake.promotion_entries.filter(entry => entry.user_id === this.$auth.user.id).length : 0
    },
  },
  methods: {
    learnMore() {
      this.$router.push({
        path: `/promotions/${this.currentSweepStake.id}`
      })
    }
  }
};
</script>
