<template>
  <div class="p-0 section-wrapper">
    <SectionHeader
      :title="$t('home_page.shop_by_brand')"
      :desc="$t('home_page.shop_by_brand_description')"
      :label="$t('home_page.view_more_brands')"
      marginLeft="59px"
      to="/shop"
    />
    <div class="brand-list-wrapper d-flex">
      <div class="d-none d-lg-flex border-right pr-4">
        <div class="overflow-hidden">
          <img
            width="756px"
            :src="require('~/assets/img/home/shopbybrand.svg')"
          />
        </div>
      </div>
      <div
        class="d-flex d-lg-none border-right image-wrapper justify-content-center"
      >
        <img
          width="188px"
          height="264px"
          :src="require('~/assets/img/home/shopbybrand-sm.png')"
        />
      </div>
      <div class="d-flex links-wrapper position-relative">
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
      brands: [],
    }
  },
  async fetch() {
    this.brands = await this.$axios
      .get('/brands', {
        handleError: false,
      })
      .then((res) => res.data || [])
      .catch((error) => {
        this.$toasted.error(error.message)
      })
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
@import '~/assets/css/_variables'
.brand-list-wrapper
  margin-top: 33px
  @media (min-width: 576px)
    margin-left: 146px
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
    background: $color-white-1
    background: linear-gradient(180deg, $color-white-18 0%, $color-white-1 100%)
  @media (max-width: 1020px)
    max-height: 260px
  .brand-link
    position: relative
    cursor: pointer
    padding: 0
    @media (max-width: 550px)
      font-size: 18px
    &::after
      content: ''
      position: absolute
      width: 0px
      height: 2px
      background: $color-black-1
      left: 0
      bottom: 5px
      transition: 0.2s all ease-in
    &:hover
      color:$color-black-1
      &::after
        width: 100%
@media (max-width: 550px)
  .image-wrapper
    padding-right: 12px
    padding-left: 16px
.links-wrapper
  padding-right: 12px
  padding-left: 12px
  @media (min-width: 576px)
    padding-left: 76px
</style>
