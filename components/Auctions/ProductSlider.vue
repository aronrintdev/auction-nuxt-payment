<template>
  <section class="auctions-block" >
    <div class="row">
      <div v-if="showHeader" class="col-12 d-flex align-items-center justify-content-between auctions-block-header">
        <div class="px-0 px-md-4 new-releases-heading text-left">{{ title }}</div>
        <div v-if="isCarouselMode" class="px-2 px-md-4 view-more-products-text" @click="showAll">
          <span>{{ viewMoreBtnLabel ? viewMoreBtnLabel : $t('home.view_more_products') }}</span>
          <img src="~/assets/img/icons/arrow-right-in-circle.svg">
        </div>
        <div v-if="showAllText" class="view-all-products-text" @click="showAll">
          <span>{{ $t('home_page.view_all') }}</span>
        </div>
      </div>

      <div v-if="auctionList.length > 0" class="col-12 auctions-block-list">
        <div v-if="isCarouselMode" class="w-100 tab-align-center">
          <carousel
            :key="auctionList.length"
            ref="carousel"
            class="carousel auction-carousel slide-fade"
            :nav="false"
            :showArrows="showArrows"
            :loop="false"
            :center="true"
            :margin="30"
            :responsive="{
              0: { items: 2, nav: false, center: false, margin: 12 },
              600: { items: 2, nav: false, center: false, margin: 18 },
              1024: { items: 3, nav: false, center: false, margin: 24 },
              1200: { items: itemsCount, nav: false, showArrows: showArrows, center: false,  margin: margin },
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
                :small="smallSizeCard"
              ></AuctionCard>
            </template>
            <template #prev>
              <div class="owl-nav owl-prev">
                <img :src="require('~/assets/img/icons/arrow-left-black.svg')" />
              </div>
            </template>

            <template #next>
              <div class="owl-nav owl-next">
                <img :src="require('~/assets/img/icons/arrow-right-black.svg')" />
              </div>
            </template>
          </carousel>
        </div>
        <div v-else class="tab-align-center full-view">
          <div class="row">
            <AuctionCard
              v-for="auction in auctionList"
              :key="auction.id"
              :auction="auction"
              :type="type"
              class="col-6 col-md-4 col-lg-4 col-xl-3"
            ></AuctionCard>
          </div>
        </div>
      </div>
      <div v-else class="w-100 py-5 text-center">
        <div v-if="!isCarouselMode" class="d-inline-flex align-items-center no-items-found">
          <img src="~/assets/img/no-items-found.png" class="mr-3" />
          <div class="text-left">
            <div class="no-items-found-title">{{ $t('auctions.frontpage.no_results_found') }}</div>
            <div class="no-items-found-subtitle">{{ $t('auctions.frontpage.cant_find_anything') }}</div>
          </div>
        </div>
        <div v-else class="body-3-normal">{{ $t('common.no_items_found') }}</div>
      </div>
    </div>
  </section>
</template>
<script>
import AuctionCard from '~/components/Auctions/AuctionCard'

export default {
  components: {
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
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    showAllText: {
      type: Boolean,
      default: false,
    },
    viewMoreBtnLabel: {
      type: String,
      default: '',
    },
    itemsCount: {
      type: Number,
      default: 4,
    },
    showArrows: {
      type: Boolean,
      default: false,
    },
    margin: {
      type: Number,
      default: 24,
    },
    smallSizeCard: {
      type: Boolean,
      default: false,
    }
  },

  data() {
    return {
      auctionList: [],
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

<style lang="sass" scoped>
  @import '~/assets/css/_variables'

  .auctions-block
    margin-bottom: 70px
    &-list
      margin-top: 50px
  .no-items-found
    img
      width: 130px
    &-title
      @include heading-7
      color: $color-gray-5
      font-family: $font-sp-pro
    &-subtitle
      @include body-1-regular
      font-family: $font-sp-pro
      color: $black
  @media (max-width: 576px)
    .auctions-block
      margin-bottom: 11px
      &-list
        margin-top: 24px
      .full-view
        .item
          padding: 8px
      .view-more-products-text
        span
          display: none
        img
          width: 44px
      .new-releases-heading
        font-size: 22px
        line-height: 100%
      .owl-next,
      .owl-prev
        display: none
    .no-items-found
      img
        width: 60px
      &-title
        font-size: 16px
        line-height: 22px
      &-subtitle
        font-size: 14px
        line-height: 19px
    .view-all-products-text
      font-family: $font-montserrat
      font-weight: $normal
      @include body-5
      color: $color-gray-30
</style>
