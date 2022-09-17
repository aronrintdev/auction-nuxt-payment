<template>
  <div class="section-wrapper">
    <HomeSectionHeader
      :title="$t('home.browse_all_auctions')"
      :description="$t('home.browse_all_auctions_desc')"
      :button-label="$t('home.view_more_auctions')"
      :button-target="'/auction'"
      class="section-header"
    />
    <b-container fluid class="auction-live-wrapper">
      <b-row>
        <b-col lg="6" class="details">
          <div class="detail-wrapper">
            <div class="auction-name">Yeezy Boost 350 V2</div>
            <div class="time-remaining">
              <span>06</span> /{{ $tc('common.day', 6) }} <span>04</span> /{{
                $tc('common.hour', 4)
              }}
              <span>45</span> /{{ $tc('common.min', 45) }} <span>23</span> /{{
                $tc('common.sec', 23)
              }}
            </div>
            <div class="auction-price">$120.00</div>
            <div class="bids-count">14 {{ $tc('common.bid', 14) }}</div>
          </div>
        </b-col>
        <b-col lg="6" class="photo">
          <div class="photo-wrapper">
            <PhotoThumb
              src="https://api.deadstock.co/prod/api/sneakers/GY3438/image"
              :product="products[0]"
              overlay
            />
          </div>
          <div class="auction-color">
            <span>Sesame</span><span>{{ $tc('common.size', 1) }}:9</span>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <NavGroup
      :data="categoryItems"
      :value="currentCategory"
      nav-key="auctions_ending_soon"
      class="section-nav"
      @change="handleCategoryChange"
    />
    <AuctionCarousel :products="products" class="section-carousel" />
  </div>
</template>
<script>
import HomeSectionHeader from '~/components/homepage/section/Header.vue'
import NavGroup from '~/components/common/NavGroup.vue'
import AuctionCarousel from '~/components/Auctions/Carousel.vue'
import PhotoThumb from '~/components/product/Thumb.vue'

export default {
  name: 'HomeBrowseAllAuctions',

  components: { HomeSectionHeader, NavGroup, AuctionCarousel, PhotoThumb },

  data() {
    return {
      categoryItems: [
        { label: this.$tc('common.single_item', 2), value: 'single_items' },
        { label: this.$tc('common.collection', 2), value: 'collections' },
      ],
      currentCategory: 'single_items',
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

  .auction-live-wrapper
    margin-top: 40px
    max-width: 1145px
    background-color: $color-gray-1
    margin-left: auto

    .details
      .detail-wrapper
        display: flex
        flex-direction: column
        margin-left: auto
        padding: 0 40px
        width: fit-content

        .auction-price
          @include heading-4
          color: $color-orange-4
          font-weight: $medium
          margin-top: 22px

        .auction-name
          @include body-1-medium
          color: $color-black-1
          letter-spacing: 0.26rem
          margin-top: 75px
          font-weight: $medium

        .time-remaining
          @include body-5-regular
          color: $color-gray-31
          margin-top: 25px

          span
            font-size: 32px
            line-height: 39px

        .bids-count
          @include heading-2
          margin-top: 22px
          color: $color-gray-31
          font-weight: $regular
          margin-bottom: 30px

    .photo
      padding: 0 58px
      text-align: center

      .photo-wrapper
        width: 100%
        max-width: 434px
        height: auto
        max-height: 284px
        overflow: hidden
        display: flex
        align-items: center
        position: relative
        margin-left: auto
        margin-right: auto

      .auction-color
        @include body-3-regular
        color: $color-gray-31
        margin-bottom: 25px

        span
          padding: 0 32px
          line-height: 31px
          display: inline-block

          &:first-child
            border-right: 1px solid $color-black-1

  .section-nav
    margin-top: 37px
    text-align: center

  .section-carousel
    margin-top: 37px

@media (max-width: 992px)
  .section-wrapper .auction-live-wrapper
    .details
      .detail-wrapper
        margin-right: auto

@media (max-width: 576px)
  .section-wrapper .auction-live-wrapper
    .details
      .detail-wrapper
        padding: 0 20px
        margin-right: auto

    .photo
      padding: 0 20px
</style>
