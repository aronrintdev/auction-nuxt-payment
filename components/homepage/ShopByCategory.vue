<template>
  <div class="section-wrapper">
    <SectionHeader
      :title="$t('home_page.shop_by_category')"
      :desc="$t('home_page.shop_by_category_desc')"
      :label="$t('home_page.view_more_products')"
      to="#"
    />
    <div
      class="row products-category no-gutters overflow-hidden px-2 d-none d-md-flex"
    >
      <div
        v-for="(category, index) in categories"
        :key="index"
        :to="category.to"
        class="col-6 category col-lg-3 col p-0"
      >
      <nuxt-link
        :to="`/shop/${category.id}`"
      >
        <div class="overflow-wrapper">
          <div
            class="category-wrapper d-flex align-items-center justify-content-center cursor-pointer"
            :style="{ '--image': `url(${category.image})` }"
          >
            <h1 class="fs-24 fw-4 font-primary text-white text-uppercase">
              {{ category.title }}
            </h1>
          </div>
        </div>
        </nuxt-link>
      </div>
    </div>
    <div
      class="row products-category no-gutters overflow-hidden px-2 d-flex d-md-none"
    >
      <div
        v-for="(category, index) in categoriesSm"
        :key="index"
        class="col-6 category col-lg-3 col p-0"
      >
        <div class="overflow-wrapper">
          <div
            class="category-wrapper d-flex align-items-center justify-content-center cursor-pointer"
            :style="{ '--image': `url(${category.image})` }"
          >
            <h1 class="fs-24 fw-4 font-primary text-white text-uppercase">
              {{ category.title }}
            </h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ShopByCategory',
  data() {
    return {
      categories: [
        {
          title: this.$t('home_page.tops'),
          image: require('~/assets/img/home/categories/tops.png'),
          to: './shop',
        },
        {
          title: this.$t('home_page.t-shirts'),
          image: require('~/assets/img/home/categories/t-shirts.png'),
          to: './shop',
        },
        {
          title: this.$t('home_page.sweatshirts'),
          image: require('~/assets/img/home/categories/sweat-shirts.png'),
          to: './shop',
        },
        {
          title: this.$t('home_page.footwear'),
          image: require('~/assets/img/home/categories/footwear.png'),
          to: './shop',
        },
        {
          title: this.$t('home_page.bottoms'),
          image: require('~/assets/img/home/categories/bottoms.png'),
          to: './shop',
        },
        {
          title: this.$t('home_page.shirts'),
          image: require('~/assets/img/home/categories/shirts.png'),
          to: './shop',
        },
        {
          title: this.$t('home_page.jackets'),
          image: require('~/assets/img/home/categories/jackets.png'),
          to: './shop',
        },
        {
          title: this.$t('home_page.accessories'),
          image: require('~/assets/img/home/categories/accessories.png'),
          to: './shop',
        },
      ],
      categoriesSm: [
        {
          title: this.$t('home_page.tops'),
          image: require('~/assets/img/home/categories/tops.png'),
        },
        {
          title: this.$t('home_page.bottoms'),
          image: require('~/assets/img/home/categories/bottoms.png'),
        },
        {
          title: this.$t('home_page.sweatshirts'),
          image: require('~/assets/img/home/categories/sweat-shirts.png'),
        },
        {
          title: this.$t('home_page.jackets'),
          image: require('~/assets/img/home/categories/jackets.png'),
        },
        {
          title: this.$t('home_page.footwear'),
          image: require('~/assets/img/home/categories/footwear.png'),
        },

        {
          title: this.$t('home_page.accessories'),
          image: require('~/assets/img/home/categories/accessories.png'),
        },
      ],
    }
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.section-wrapper
  margin-bottom: 32px
.products-category
  margin-top: 33px
.category
  border-right: 1px solid $color-gray-18
  border-bottom: 1px solid $color-gray-18
  .overflow-wrapper
    margin: 0.5rem
    .category-wrapper
      background-image: var(--image)
      background-repeat: no-repeat
      background-position: center
      width: 100%
      aspect-ratio: 1 / 1
      @media (max-width: 500px)
        width: 162px
        background-size: contain
        h1
          font-size: 14px
  @media (min-width: 992px)
    &:nth-child(-n+4)
      .overflow-wrapper
        margin-top: 0
    &:nth-child(n+5)
      border-bottom: 0
      .overflow-wrapper
        margin-bottom: 0
    &:nth-child(4), &:nth-child(8)
        border-right: 0
  @media (max-width: 992px)
    &:nth-child(n+7), &:nth-last-child(1), &:nth-last-child(2)
      border-bottom: 0
      .overflow-wrapper
        margin-bottom: 0
    &:nth-child(-n+2)
      .overflow-wrapper
        margin-top: 0
    &:nth-child(odd)
      .overflow-wrapper
        margin-left: 0
    &:nth-child(even)
      border-right: 0
      .overflow-wrapper
        margin-right: 0
</style>
