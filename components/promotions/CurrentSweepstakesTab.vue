<template>
  <div class="promotions-category-page">
    <div v-if="!isScreenXS" class="d-flex promotions-category-page-title">
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
    <PromotionHeader
        v-if="isScreenXS && currentSweepStake"
        :deadline="currentSweepStake.end_at"
        :entries="entries"
        :title="currentSweepStake.name"
        class="px-3"/>
    <div v-if="currentSweepStake && !loading">
      <div :class="{
              'my-5': !isScreenXS,
              'my-3 image-wrapper py-2 mx-3': isScreenXS
           }"
           class="text-center">
        <img :class="mobileClass" :src="currentSweepStake.promotion_image" class="main-image"/>
      </div>
      <div v-if="!isScreenXS" class="text-center heading-4-bold">{{ currentSweepStake.name }}</div>
      <div v-if="!isScreenXS" class="body-3-normal text-center w-75 m-auto py-2">{{
          currentSweepStake.description
        }}
      </div>
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
          <CountDownTimer v-if="!isScreenXS" :endDate="currentSweepStake.end_at"></CountDownTimer>
          <MobileCountDown v-else :promotion="currentSweepStake" class="mx-auto"/>
        </div>
      </div>

    </div>
    <div v-if="loading" class="d-flex align-items-center justify-content-center h-500">
      <Loader :loading="loading"></Loader>
    </div>
    <div v-if="!loading && !currentSweepStake" class="d-flex align-items-center justify-content-center my-5">
      <h3>{{ $t('promotions.not_found') }} {{ $t('promotions.sweepstakes') }}</h3>
    </div>
    <div v-if="isScreenXS" :class="mobileClass" class="promo-type-header mt-2 mb-4">
      {{ $t('promotions.types_of_promotions') }}
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
      <MobilePromoTypes v-if="isScreenXS"/>
    </div>
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
import screenSize from '~/plugins/mixins/screenSize';
import PromotionHeader from '~/components/promotions/PromotionHeader';
import MobileCountDown from '~/components/promotions/MobileCountDown';
import MobilePromoTypes from '~/components/promotions/MobilePromoTypes';

export default {
  name: 'PromotionsCurrentSweepstakesTab',
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
    InviteFriends,
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
<style lang="sass" scoped>
@import "~/assets/css/variables"
.main-image
  &.mobile
    height: 150px

.image-wrapper
  background-color: $color-gray-1

.text-remaining
  font-family: $font-montserrat
  font-style: normal
  font-weight: $medium
  color: $color-black-1

.types-wrapper
  background: $color-white-1
  box-shadow: 0 1px 4px rgba($color-black-1, 0.25)
  border-radius: 8px

.promo-type-header
  &.mobile
    text-align: center
    @include body-17
    font-family: $font-montserrat
    font-style: normal
    font-weight: $medium
    color: $color-black-1

.divider
  border-top: 1px solid $color-gray-16f

</style>

