<template>
  <div class="section-wrapper">
    <HomeSectionHeader
      :title="$t('home.browse_all_trades')"
      :description="$t('home.browse_all_trades_desc')"
      :button-label="$t('home.view_more_trades')"
      :button-target="'/trades'"
      class="section-header"
    />
    <b-container fluid class="section-workflow">
      <b-row>
        <b-col xl="7" class="img-wrapper">
          <b-img :src="require('~/assets/img/home/trade-workflow.svg')" />
        </b-col>
        <b-col xl="5" class="text-wrapper">
          <h3>{{ $t('home.time_to_trade') }}</h3>
          <div class="text-desc">
            {{ $t('home.trade_desc') }}
          </div>
          <div class="link-group">
            <b-link href="#">ONE ITEM</b-link>
            <b-link href="#">TWO ITEMS</b-link>
            <b-link href="#">THREE ITEMS</b-link>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <TradeCarousel :products="products" class="section-carousel" />
  </div>
</template>
<script>
import HomeSectionHeader from '~/components/homepage/section/Header.vue'

export default {
  name: 'HomeBrowseAllTrades',

  components: { HomeSectionHeader },

  data() {
    return {
      products: [
        {
          id: 8,
          sku: 'DC6515-100',
          name: 'Velit libero voluptas minima.',
          colorway: 'MistyRose',
          brand: 'Lockman, Lehner and Kling',
          category: 'sneakers',
          release_year: 2003,
          created_at: '2022-03-04T04:05:29.000000Z',
          updated_at: '2022-03-04T04:05:29.000000Z',
          vendor_id: 8,
          size_category_id: 5,
        },
      ],
    }
  },

  methods: {
    handleCategoryChange(category) {
      this.currentCategory = category
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.section-wrapper
  padding: 0

  .section-header
    margin-top: 70px

  .section-workflow
    margin-top: 40px
    max-width: 1145px
    margin-left: auto
    margin-right: auto

    @media (max-width: 576px)
      >.row
        padding: 20px 20px 200px 20px

        .img-wrapper
          padding: 0

        .text-wrapper
          padding: 0

    >div
      background-color: $color-gray-1
      padding: 37px 37px 200px 37px

      .img-wrapper
        padding: 0 41px
        margin-bottom: 30px

        img
          width: 100%

      .text-wrapper
        padding: 0 30px

        h3
          @include body-1-bold
          color: $color-orange-4
          text-transform: uppercase
          margin-top: 19px
          letter-spacing: 0.26rem

        .text-desc
          @include body-8-normal
          color: $color-black-1
          margin-top: 59px

        .link-group
          margin-top: 43px

          a
            @include body-3-bold
            display: block
            color: $color-gray-5
            text-transform: uppercase
            text-decoration: underline
            letter-spacing: 0.26rem
            margin-bottom: 26px

  .section-carousel
    margin-top: -156px
</style>
