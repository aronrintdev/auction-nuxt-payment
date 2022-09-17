<template>
  <div class="top-trades-wrapper">
    <HomeSectionHeader
      :title="$t('home.latest_price_trends')"
      :description="$t('home.latest_price_trends_desc')"
      :button-label="$t('home.view_deadstock_exchange')"
      :button-target="'#'"
      class="section-header"
    />
    <div class="section-filter">
      <h1>{{ $t('home.deadstock_exchange') }}</h1>
      <div class="text-desc">{{ $t('home.top_trades_desc') }}</div>
      <!-- <div class="row-filters">
        <b-dropdown text="Last 7 days" class="dropdown-filter">
          <b-dropdown-item>Last 7 days</b-dropdown-item>
          <b-dropdown-item>Last 30 days</b-dropdown-item>
          <b-dropdown-item>Last quarter</b-dropdown-item>
          <b-dropdown-item>Last year</b-dropdown-item>
        </b-dropdown>
        <b-dropdown text="All Categories" class="dropdown-filter">
          <b-dropdown-item>Sneakers</b-dropdown-item>
          <b-dropdown-item>Apparel</b-dropdown-item>
          <b-dropdown-item>Accessories</b-dropdown-item>
        </b-dropdown>
        <b-dropdown text="All Brands" class="dropdown-filter">
          <b-dropdown-item>Nike</b-dropdown-item>
          <b-dropdown-item>Adidas</b-dropdown-item>
          <b-dropdown-item>Jordan</b-dropdown-item>
        </b-dropdown>
      </div> -->
    </div>
    <b-row class="section-trend">
      <b-col lg="4">
        <ProductTrendListCard
          :title="$t('home.trending')"
          :icon="require('~/assets/img/home/trending.png')"
          class="trend-card"
        />
      </b-col>
      <b-col lg="4">
        <ProductTrendListCard
          :title="$t('home.biggest_gainers')"
          :icon="require('~/assets/img/home/biggest-gainers.png')"
          class="trend-card"
        />
      </b-col>
      <b-col lg="4">
        <ProductTrendListCard
          :title="$t('home.biggest_losers')"
          :icon="require('~/assets/img/home/biggest-losers.png')"
          class="trend-card"
        />
      </b-col>
    </b-row>
    <div class="section-top-products">
      <div class="title-top-products">{{ $t('home.top_products') }}</div>
      <div class="section-table table-responsive">
        <ProductTrendTable />
      </div>
    </div>
  </div>
</template>
<script>
import HomeSectionHeader from '~/components/homepage/section/Header.vue'
import ProductTrendListCard from '~/components/product/TrendListCard.vue'
import ProductTrendTable from '~/components/product/TrendTable.vue'

export default {
  name: 'HomeLatestPriceTrends',

  components: { HomeSectionHeader, ProductTrendListCard, ProductTrendTable },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.top-trades-wrapper
  padding: 0

  .section-header
    margin-top: 70px

  .section-filter
    margin-top: 40px
    text-align: center
    background-color: $color-gray-1
    padding: 71px 20px 129px 20px
    background: url('~/assets/img/home/deadstock-exchange-bg.png')
    background-position: center
    background-size: cover
    max-width: 1145px
    margin-left: auto
    margin-right: auto

    h1
      @include heading-5
      color: $color-black-1
      text-transform: uppercase
      margin: 0
      font-weight: $medium

    .text-desc
      @include body-4-medium
      font-family: SF Pro Display
      color: $color-orange-4
      margin-top: 30px

    .row-filters
      position: relative

      .dropdown-filter::v-deep
        margin: 30px 8px 0 8px
        width: 176px
        max-width: 100%

        button
          @include body-9-medium
          color: $color-black-1
          background: $color-white-1
          border: 1px solid $color-gray-32 !important
          border-radius: 5px
          height: 41px
          display: flex
          justify-content: space-between
          align-items: center
          padding: 0 15px

        .dropdown-menu
          background-color: $color-white-1

          .dropdown-item
            @include body-9-medium
            color: $color-black-1
            padding: 10px 15px

  .section-trend
    margin-top: -51px
    display: flex
    justify-content: center
    max-width: 1145px
    margin-left: auto
    margin-right: auto

    .trend-card
      width: 100%
      background-color: $color-white-1
      margin-bottom: 16px

  .section-top-products
    max-width: 1145px
    margin-left: auto
    margin-right: auto

    .title-top-products
      @include body-1-bold
      margin-top: 22px
      color: $color-black-1

    .section-table
      margin-top: 10px
      width: 100%
      max-width: 1145px
      margin-left: auto
      margin-right: auto
</style>
