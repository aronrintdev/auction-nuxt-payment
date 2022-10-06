<template>
  <div class="container-fluid promotions-category-page">
    <div class="row">
      <PromotionsBanner
          :banner-image="promotion? promotion.learn_more_page_banner : null"
          :single-banner="true"
          :title="promotion? promotion.name : null"></PromotionsBanner>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <PromotionHeader
                v-if="isScreenXS && promotion"
                :deadline="promotion.end_at"
                :entries="entries"
                :is-single="true"
                :title="promotion.name"
                class="px-3 mb-2"/>

            <div v-if="isScreenXS && promotion && !loading" class="d-flex flex-column align-items-center">
              <div class="text-center text-remaining single">{{ $t('promotions.time_remaining') }}</div>
              <MobileCountDown :promotion="promotion" class="mx-auto"/>
            </div>
            <div v-if="isScreenXS && isGiveaway" class="mx-3">
              <b-row class="">
                <b-col v-for="prize in prizes" :key="prize.label" class="" col>
                  <div class="howto-card p-2 mt-4 text-center ">
                    <img :alt="prize.label" :src="prize.image" class="mb-2"
                         height="45" width="45">
                    <div class="type-title mb-3">{{ prize.label }}</div>
                  </div>
                </b-col>
              </b-row>
            </div>
            <RulesForEntering v-if="promotion && !loading && !isScreenXS" :promotion="promotion"></RulesForEntering>
            <PromotionBodyWithTimer
                v-if="promotion && !loading && !isScreenXS"
                :promotion="promotion"
            ></PromotionBodyWithTimer>
            <div v-if="loading" class="d-flex align-items-center justify-content-center h-500">
              <Loader :loading="loading"></Loader>
            </div>
            <HowToEnterSingle v-if="!isScreenXS" :category="category"></HowToEnterSingle>
            <div v-else class="howto-card px-2 py-1 mt-4 mx-3">
              <HowToEnter>
                <template #description>
                  <div v-if="isGiveaway" class="mt-3 ml-4">
                    <b-row class="list mb-3">
                      <b-col class="col-1">
                        <span class="index d-flex align-items-center justify-content-center">1</span>
                      </b-col>
                      <b-col class="col-11">
                        <div class="ml-2 mt-1">
                          {{ $t('promotions.visit_social') }}
                        </div>
                      </b-col>
                    </b-row>
                    <b-row class="list">
                      <b-col class="col-1">
                        <span class="index d-flex align-items-center justify-content-center">2</span>
                      </b-col>
                      <b-col class="col-11">
                        <div class="ml-2 mt-1">
                          {{ $t('promotions.share_hashtag') }}
                        </div>
                      </b-col>
                    </b-row>
                  </div>
                </template>
                <template #body>
                  <Button
                      v-if="$auth.user && !isGiveaway"
                      class="px-5 mx-3 mt-4"
                      pill
                      to="/shop"
                      variant="dark-blue"
                  >
                    {{ $t('promotions.shop_to_enter') }}
                  </Button>
                  <Button
                      v-if="!$auth.user"
                      class="px-5 mx-3 mt-4"
                      pill
                      to="/login"
                      variant="dark-blue"
                  >
                    {{ $t('promotions.sign_up') }}
                  </Button>
                </template>
              </HowToEnter>
              <div v-if="isScreenXS" class="text-center d-flex align-items-center my-4 terms-and-conditions">
                <div class="body-5-regular px-4">
                  {{ $t('promotions.want_to_know_more') }}&nbsp;<nuxt-link to="/terms">
                  <strong>{{ $t('promotions.terms_and_conditions') }}</strong></nuxt-link>
                </div>
              </div>
            </div>
            <div v-if="isScreenXS && promotion" class="howto-card p-2 mt-4 mx-3 text-center">
              <div class="title">
                {{ promotion.name }}
              </div>
              <div class="desc my-2">
                {{ promotion.description }}
              </div>
            </div>
            <div v-if="isScreenXS && isGiveaway && $auth.user" class="howto-card p-2 mt-4 mx-3 text-center">
              <div class="title dark-blue">
                {{ $t('promotions.participate') }}
              </div>
              <Button
                  class="px-5 mx-3 mt-4"
                  pill
                  to="/login"
                  variant="dark-blue"
              >
                {{ $t('promotions.sign_up') }}
              </Button>
            </div>
            <VideoCarouselWithText v-if="!isScreenXS"></VideoCarouselWithText>
            <VideoCarousel v-else></VideoCarousel>
            <FAQ></FAQ>
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
import screenSize from '~/plugins/mixins/screenSize';
import MobileCountDown from '~/components/promotions/MobileCountDown';
import PromotionHeader from '~/components/promotions/PromotionHeader';
import HowToEnter from '~/components/promotions/HowToEnter'
import Button from '~/components/common/Button';
import VideoCarousel from '~/components/promotions/VideoCarousel'
import FAQ from '~/components/promotions/FAQ'

export default {
  name: 'PromotionsSweepstakePage',
  components: {
    FAQ,
    VideoCarousel,
    Button,
    HowToEnter,
    PromotionHeader,
    MobileCountDown,
    Loader,
    PromotionsBanner,
    RulesForEntering,
    HowToEnterSingle,
    VideoCarouselWithText,
    PromotionBodyWithTimer,
  },
  mixins: [screenSize],
  layout(context) {
    return context.$auth.user ? 'Profile' : 'IndexLayout'
  },
  data() {
    return {
      loading: false,
      promotion: null,
      prizes: [
        {
          image: require('~/assets/img/promotions/shirt.svg'),
          label: this.$t('promotions.apparel')
        },
        {
          image: require('~/assets/img/promotions/cash-circle.svg'),
          label: this.$t('promotions.cash')
        },
        {
          image: require('~/assets/img/promotions/sneaker.svg'),
          label: this.$t('promotions.sneakers')
        }
      ]
    }
  },
  computed: {
    category() {
      return this.promotion ? this.promotion.type : PROMOTION_TYPE_SWEEPSTAKES
    },
    isGiveaway() {
      return this.promotion && this.promotion.type !== PROMOTION_TYPE_SWEEPSTAKES
    },
    entries() {
      return this.promotion && this.$auth.user ? (!this.isGiveaway ? this.promotion.promotion_entries.filter(entry => entry.user_id === this.$auth.user.id).length : 0) : 0
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
