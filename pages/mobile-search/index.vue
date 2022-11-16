<template>
  <div class="container-search pb-5">
    <section>
      <div class="container">
        <div class="d-flex align-items-center">
          <Searchbar :placeholder="$t('common.search')" class="flex-grow-1" />
          <a role="button">
            <img src="~/assets/img/icons/filter-icon.png" />
          </a>
        </div>
      </div>
    </section>
    <div v-if="!noSearchResult" class="container">
      <section class="mt-5">
        <SectionHeader class="px-2"
          :title="$t('common.sizetype')"
          full-width
        />
        <MobileSearchCarousel
          class="mt-4 mb-5"
          :items="sizeType"
        />
      </section>
      <section class="featured">
        <SectionHeader class="px-2"
          :title="$t('preferences.payments.featured')"
          full-width
        />
        <MobileSearchCarousel
          class="mt-4 mb-5"
          :items="featured"
          variant="photo"
          :item-settings="{
            0: { items: 2, nav: false, center: false },
          }"
                         loop />
      </section>
      <section class="shop_by_style">
        <SectionHeader class="px-2"
          :title="$t('shop_by_style.title')"
          :label="$t('banner.view_more_trending')"
          to="/shop-by-style"
          full-width
        />
        <div class="px-2 mt-4 mb-5">
          <a><img :src="require('~/assets/img/mobile-search/created_for_you.png')" class="w-100" /></a>
        </div>
      </section>
      <section class="shop_by_category">
        <SectionHeader class="px-2"
          :title="$t('mobile_search.shop_by_category')"
          full-width
          loop
          to="/url/here"
        />
        <MobileSearchCarousel
          class="mt-4 mb-5"
          :items="shopByCategory"
          variant="photo"
          :item-settings="{
            0: { items: 2, nav: false, center: true },
          }"
          loop />
      </section>
      <section class="shop_by_brand">
        <SectionHeader class="px-2"
          :title="$t('mobile_search.shop_by_brand')"
          to="/shop"
          full-width
        />
        <div class="px-2 mt-4 mb-5">
          <a><img :src="require('~/assets/img/mobile-search/shop_by_brand.png')" class="w-100" /></a>
        </div>
      </section>
      <section class="view_trades">
        <SectionHeader class="px-2"
          :title="$t('mobile_search.view_trades')"
          to="/trades"
          full-width
        />
        <MobileSearchCarousel
          class="mt-4 mb-5"
          :items="viewTrades"
          :variant="'trade'"
          :item-settings="{
            0: { items: 2, nav: false, center: false }
          }"
          loop />
      </section>
      <section class="view_auctions">
        <SectionHeader class="px-2"
          :title="$t('mobile_search.view_auctions')"
          to="/auction"
          full-width
        />
        <MobileSearchCarousel
          class="mt-4 mb-5"
          :items="auctions"
          :variant="'auctions'"
          :item-settings="{
            0: { items: 2, nav: false, center: false }
          }"
          loop />
      </section>
    </div>
    <div v-else>
      <div class="text-center no-items-found">
        <img src="~/assets/img/no-items-found.png" class="mr-3" />
        <div>
          <div class="no-items-found-title">
            {{ $t('auctions.frontpage.no_results_found') }}
          </div>
          <div class="no-items-found-subtitle">
            {{ $t('auctions.frontpage.cant_find_anything') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Searchbar from '~/components/mobile-search/Searchbar'
import MobileSearchCarousel from '~/components/MobileSearchCarousel'
export default {
  name: 'Index',
  components: {
    Searchbar, MobileSearchCarousel
  },
  data() {
    return {
      noSearchResult: false,
      sizeType: [
        { image: require('~/assets/img/mobile-search/img-1.png'), title: 'Men' },
        { image: require('~/assets/img/mobile-search/img-2.png'), title: 'Women' },
        { image: require('~/assets/img/mobile-search/img-3.png'), title: 'Kids' }
      ],
      featured: [
        { image: require('~/assets/img/mobile-search/featured_1.png'), title: 'New Releases', url: '/new-release' },
        { image: require('~/assets/img/mobile-search/featured_2.png'), title: 'Instant Shipping', url: '/shop/products?type=instant-shipping' },
        { image: require('~/assets/img/mobile-search/featured_3.png'), title: 'Best Selling', url: '/shop/products?type=instant-shipping' },
        { image: require('~/assets/img/mobile-search/featured_4.png'), title: 'Trending', url: 'shop/products?type=trending' },
        { image: require('~/assets/img/mobile-search/featured_5.png'), title: 'Gift Card', url: 'shop/products?types=gift-card' },
        { image: require('~/assets/img/mobile-search/featured_6.png'), title: '' }
      ],
      shopByStyle: [
        { image: require('~/assets/img/mobile-search/created_for_you.png'), title: '' },
      ],
      shopByCategory: [
        { image: require('~/assets/img/mobile-search/category_1.png'), title: '' },
        { image: require('~/assets/img/mobile-search/category_2.png'), title: '' },
        { image: require('~/assets/img/mobile-search/category_3.png'), title: '' },
        { image: require('~/assets/img/mobile-search/category_4.png'), title: '' },
        { image: require('~/assets/img/mobile-search/category_5.png'), title: '' },
        { image: require('~/assets/img/mobile-search/category_6.png'), title: '' },
        { image: require('~/assets/img/mobile-search/category_7.png'), title: '' },
        { image: require('~/assets/img/mobile-search/category_8.png'), title: '' },
      ],
      viewTrades: [
        {
          name: 'Nike Air Force',
          image: 'https://images.deadstock.co/products/sneakers/DJ7998-100/800xAUTO/IMG01.jpg',
          timer: '5d 18h',
          color: 'University Blue',
          size: 'Size 9',
          price: '345,00'
        },
        {
          name: 'Nike Air Force',
          image: 'https://images.deadstock.co/products/sneakers/DJ7998-100/800xAUTO/IMG01.jpg',
          timer: '5d 18h',
          color: 'University Blue',
          size: 'Size 9',
          price: '345,00'
        },
      ],
      auctions: [
        {
          name: 'Nike Air Force',
          image: 'https://images.deadstock.co/products/sneakers/DJ7998-100/800xAUTO/IMG01.jpg',
          timer: '5d 18h',
          color: 'University Blue',
          size: 'Size 9',
          price: '345,00'
        },
        {
          name: 'Nike Air Force',
          image: 'https://images.deadstock.co/products/sneakers/DJ7998-100/800xAUTO/IMG01.jpg',
          timer: '5d 18h',
          color: 'University Blue',
          size: 'Size 9',
          price: '345,00'
        },
      ]
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.container-search
  @media (min-width: 1024px)
    .scroll-to-top
      display: flex !important
      bottom: -100px
      right: 60px
      border: 2px solid $color-blue-20
      width: 40px
      aspect-ratio: 1
      z-index: 1020
      transition: 0.5s all ease-in-out
      &.scrolled
        bottom: 40px
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
::v-deep .section-header
  @media (max-width: 576px)
    margin: 30px 12.5px

