<template>
  <section class="auctions-block" >
    <div class="row my-5">
      <div class="col-7 new-releases-heading text-left">{{ title }}</div>
      <div v-if="isCarouselMode" class="col-5 px-5 text-right mt-2">
        <span class="view-more-products-text" @click="showAll">
          {{ $t('home_page.view_more') }}
          <RightArrow />
        </span>
      </div>

      <div v-if="auctionList.length > 0" class="col-12">
        <div v-if="isCarouselMode" class="w-100 mt-5 tab-align-center">
          <carousel
            :key="auctionList.length"
            ref="carousel"
            class="carousel auction-carousel slide-fade"
            :nav="false"
            :loop="false"
            :center="true"
            :margin="30"
            :responsive="{
              0: { items: 1, nav: false, center: true },
              700: { items: 2, nav: false, center: false },
              1024: { items: 3, nav: false, center: true },
              1200: { items: 4, nav: false, center: false },
            }"
            :mouse-drag="false"
            :dots="false"
          >
            <template #default>
              <AuctionCard
                v-for="auction in auctionList"
                :key="auction.id"
                :auction="auction"
                :type="type"
              ></AuctionCard>
            </template>
            <template #prev>
              <div class="owl-nav owl-prev">
                <img :src="require('~/assets/img/icons/carousel-arrow-left.svg')" />
              </div>
            </template>

            <template #next>
              <div class="owl-nav owl-next">
                <img :src="require('~/assets/img/icons/carousel-arrow-right.svg')" />
              </div>
            </template>
          </carousel>
        </div>
        <div v-else class="mt-5 tab-align-center full-view">
          <div class="row">
            <AuctionCard
              v-for="auction in auctionList"
              :key="auction.id"
              :auction="auction"
              :type="type"
              class="col-12 col-md-4 col-lg-4 col-xl-3"
            ></AuctionCard>
          </div>
        </div>
      </div>
      <div v-else class="w-100 py-5 body-3-normal text-center">{{ $t('common.no_items_found') }}</div>
    </div>
  </section>
</template>
<script>
import RightArrow from '~/assets/img/icons/right-arrow.svg?inline'

import {AUCTION_TYPE_COLLECTION, AUCTION_TYPE_SINGLE} from '~/static/constants';
import AuctionCard from '~/components/Auctions/AuctionCard'

export default {
  components: {
    RightArrow,
    AuctionCard,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    auctions: {
      type: Array,
      default: () => [],
    },
    isCarouselMode: {
      type: Boolean,
      default: true,
    }
  },

  data() {
    return {
      auctionList: [],
      AUCTION_TYPE_COLLECTION,
      AUCTION_TYPE_SINGLE,
    }
  },

  watch: {
    auctions(newV) {
      this.$refs.carousel?.destroy()
      this.$nextTick(() => this.$refs.carousel?.create())
      this.auctionList = newV
    }
  },

  mounted() {
    this.auctionList = this.auctions
  },
  
  methods: {
    // Show all auctions
    showAll() {
      this.$emit('showAll')
    },
  }
}
</script>
