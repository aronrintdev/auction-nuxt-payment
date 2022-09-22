<template>
  <div class="section-wrapper py-5">
    <div class="row align-items-center mx-md-5">
      <div class="col-4 col-md-3 d-flex">
        <h1 class="heading-garamond">
          {{ $t('home_page.shop') }}
          <br />
          {{ $t('home_page.by_category') }}
        </h1>
      </div>
      <div class="col-6 col-md-3">
        <h5 class="fw-4 fs-18 font-primary mb-0 text-gray-light garamond-desc">
          {{ $t('home_page.shop_by_category_desc') }}
        </h5>
      </div>
      <div class="col-2 col-md-6 d-flex justify-content-end">
        <ViewMoreBtn :label="$t('home_page.view_more_products')" to="#" />
      </div>
    </div>
    <div class="row products-category no-gutters mt-5">
      <div
        v-for="(category, index) in categories"
        :key="index"
        class="col-6 category col-lg-3 col p-0"
      >
        <div class="overflow-wrapper">
          <div
            class="category-wrapper d-flex align-items-center justify-content-center"
            :style="{ '--image': `url(${category.image})` }"
          >
            <h1 class="fs-24 fw-4 font-primary text-white">
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
          title: 'Tops',
          image: require('~/assets/img/home/categories/tops.png'),
        },
        {
          title: 'T-Shirts',
          image: require('~/assets/img/home/categories/t-shirts.png'),
        },
        {
          title: 'SWEATSHIRTS',
          image: require('~/assets/img/home/categories/sweat-shirts.png'),
        },
        {
          title: 'FOOTWEAR',
          image: require('~/assets/img/home/categories/footwear.png'),
        },
        {
          title: 'BOTTOMS',
          image: require('~/assets/img/home/categories/bottoms.png'),
        },
        {
          title: 'SHIRTS',
          image: require('~/assets/img/home/categories/shirts.png'),
        },
        {
          title: 'JACKETS',
          image: require('~/assets/img/home/categories/jackets.png'),
        },
        {
          title: 'ACCESSORIES',
          image: require('~/assets/img/home/categories/accessories.png'),
        },
      ],
    }
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
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
    &:nth-child(n+7)
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
