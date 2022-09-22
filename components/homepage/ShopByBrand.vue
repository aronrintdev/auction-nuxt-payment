<template>
  <div class="p-0">
    <div class="row align-items-center mx-md-5">
      <div class="col-4 col-md-2 d-flex">
        <h1 class="heading-garamond">
          {{ $t('home_page.shop') }} <br />
          {{ $t('home_page.by_brand') }}
        </h1>
      </div>
      <div class="col-6 col-md-3">
        <h5 class="fw-4 fs-18 font-primary mb-0 text-gray-light garamond-desc">
          {{ $t('home_page.shop_by_brand_description') }}
        </h5>
      </div>
      <div class="col-2 col-md-7 d-flex justify-content-end">
        <ViewMoreBtn :label="$t('home_page.view_more_brands')" to="/shop" />
      </div>
    </div>
    <div class="row mt-5">
      <div
        class="col-lg-9 d-none d-lg-flex justify-content-end border-right pr-3"
      >
        <div class="overflow-hidden">
          <img
            width="756px"
            :src="require('~/assets/img/home/shopbybrand.png')"
          />
        </div>
      </div>
      <div
        class="col-6 d-flex d-lg-none border-right pr-3 justify-content-center"
      >
        <img :src="require('~/assets/img/home/shopbybrand-sm.png')" />
      </div>
      <div
        class="col-lg-3 col-6 pl-3 d-flex justify-content-center position-relative"
      >
        <div class="brands-list">
          <h2
            v-for="brand in brands"
            :key="brand.id"
            class="fs-24 fw-5 font-secondary text-black brand-link mb-0 w-fit-content"
            @click="handleBrandClick(brand)"
          >
            {{ brand.name }}
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HomeShopByBrand',
  data() {
    return {
      // Dummy Data
      brands: [
        [
          {
            id: 1,
            name: 'Nike',
            image: 'https://images.deadstock.co/brand_logo/circle/Nike@2x.png',
          },
          {
            id: 2,
            name: 'Jordan',
            image:
              'https://images.deadstock.co/brand_logo/circle/Jordan@2x.png',
          },
          {
            id: 3,
            name: 'Converse',
            image:
              'https://images.deadstock.co/brand_logo/circle/Converse@2x.png',
          },
          {
            id: 4,
            name: 'Adidas',
            image:
              'https://images.deadstock.co/brand_logo/circle/Adidas@2x.png',
          },
          {
            id: 5,
            name: 'Vans',
            image: 'https://images.deadstock.co/brand_logo/circle/Vans@2x.png',
          },
          {
            id: 6,
            name: 'Puma',
            image: 'https://images.deadstock.co/brand_logo/circle/Puma@2x.png',
          },
          {
            id: 7,
            name: 'New Balance',
            image:
              'https://images.deadstock.co/brand_logo/circle/New balance@2x.png',
          },
          {
            id: 8,
            name: 'Saucony',
            image:
              'https://images.deadstock.co/brand_logo/circle/Saucony@2x.png',
          },
          {
            id: 9,
            name: 'Asics',
            image: 'https://images.deadstock.co/brand_logo/circle/Asics@2x.png',
          },
          {
            id: 10,
            name: 'Under Armour',
            image:
              'https://images.deadstock.co/brand_logo/circle/Under armour@2x.png',
          },
        ],
      ],
    }
  },
  async fetch() {
    this.brands = await this.$axios
      .get('/brands', {
        params: {
          take: 10,
        },
        handleError: false,
      })
      .then((res) => res.data || [])
      .catch(() => [])
  },
  methods: {
    handleBrandClick(brand) {
      this.$store.commit('browse/setSelectedBrands', [brand.name])
      this.$router.push('/shop')
    },
  },
}
</script>
<style lang="sass" scoped>
.brands-list
  max-height: 575px
  overflow: auto
  -ms-overflow-style: none
  scrollbar-width: none
  &::-webkit-scrollbar
    display: none
  &:after
    content: ''
    position: absolute
    bottom: 0
    left: 0
    width: 100%
    height: 80px
    background: rgb(255,255,255)
    background: linear-gradient(180deg, rgb(255 255 255 / 7%) 0%, rgb(255 255 255) 100%)
  @media (max-width: 1020px)
    max-height: 260px
  .brand-link
    position: relative
    cursor: pointer
    padding: 0
    &::after
      content: ''
      position: absolute
      width: 0px
      height: 2px
      background: #000
      left: 0
      bottom: 5px
      transition: 0.2s all ease-in
    &:hover
      color: #000
      &::after
        width: 100%
</style>
