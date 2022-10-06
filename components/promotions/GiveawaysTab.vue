<template>
  <div class="promotions-category-page">
    <div v-if="!isScreenXS" class="d-flex promotions-category-page-title">
      <div class="mt-4 promotions-category-page-title-before"></div>
      <div class="text-uppercase text-center promotions-category-page-title-content px-5">{{
          $t('promotions.giveaways')
        }}
      </div>
      <div class="mt-4 promotions-category-page-title-after"></div>
    </div>
    <PromotionHeader
        v-if="isScreenXS && currentGiveaway"
        :deadline="currentGiveaway.end_at"
        :title="currentGiveaway.name"
        class="px-3"/>

    <div v-if="currentGiveaway && !loading">
      <div :class="{
              'my-5': !isScreenXS,
              'my-3 image-wrapper py-2 mx-3': isScreenXS
           }"
           class="text-center">
        <img :class="mobileClass" :src="currentGiveaway.promotion_image" class="main-image"/>
      </div>
      <div v-if="!isScreenXS" class="text-center heading-4-bold">{{ currentGiveaway.name }}</div>
      <div v-if="!isScreenXS" class="body-3-normal text-center w-75 m-auto py-2">{{ currentGiveaway.description }}</div>
      <div :class="{
        'flex-column-reverse': isScreenXS
      }" class="d-flex flex-column">
        <div :class="{
           'my-4': !isScreenXS,
           'my-3': isScreenXS
        }" class="text-center ">
          <Button
              :class="mobileClass"
              :pill="isScreenXS"
              :variant="isScreenXS? 'dark-blue' : 'dark'"
              class="px-5 learn-more-button"
              @click="learnMore"
          >
            {{ $t('promotions.learn_more') }}
          </Button>
        </div>
        <div class="d-flex flex-column ">
          <div v-if="isScreenXS" class="text-center text-remaining">{{ $t('promotions.time_remaining') }}</div>
          <CountDownTimer v-if="!isScreenXS" :endDate="currentGiveaway.end_at"></CountDownTimer>
          <MobileCountDown v-else :promotion="currentGiveaway" class="mx-auto"/>
        </div>
      </div>
    </div>
    <div v-if="loading" class="d-flex align-items-center justify-content-center h-500">
      <Loader :loading="loading"></Loader>
    </div>
    <div v-if="!loading && !currentGiveaway" class="d-flex align-items-center justify-content-center my-5">
      <h3>{{ $t('promotions.not_found') }} {{ $t('promotions.giveaways') }}</h3>
    </div>
    <div v-if="isScreenXS" :class="mobileClass" class="promo-type-header mt-2 mb-4">
      {{ $t('promotions.giveaway_prizes') }}
    </div>
    <div :class="{
      'flex-column-reverse mx-3 px-3 types-wrapper': isScreenXS
    }" class="d-flex flex-column ">
      <div class="text-center d-flex align-items-center my-4 terms-and-conditions">
        <div class="body-5-regular px-4">
          {{ $t('promotions.want_to_know_more') }}&nbsp;<nuxt-link to="/terms">
          <strong>{{ $t('promotions.terms_and_conditions') }}</strong></nuxt-link>
        </div>
      </div>
      <HowToEnter></HowToEnter>
      <div v-if="isScreenXS" class="divider my-3"/>

      <PromosTypes v-if="!isScreenXS"></PromosTypes>
      <MobilePromoTypes v-if="isScreenXS" :is-giveaway="true"/>
    </div>
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
import screenSize from '~/plugins/mixins/screenSize';
import PromotionHeader from '~/components/promotions/PromotionHeader';
import MobileCountDown from '~/components/promotions/MobileCountDown';
import MobilePromoTypes from '~/components/promotions/MobilePromoTypes';

export default {
  name: 'PromotionsGiveawaysTab',
  components: {
    MobilePromoTypes,
    MobileCountDown,
    PromotionHeader,
    Loader,
    Button,
    CountDownTimer,
    FAQ,
    VideoCarousel,
    PromosTypes,
    HowToEnter,
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
