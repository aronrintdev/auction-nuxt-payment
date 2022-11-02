<template>  
  <div class="d-none d-sm-block container">
    <article>
      <div class="row">
        <div
          v-for="(product, index) in products"
          :key="`product-carousel-${index}`"
          class="item col-3"
        >
          <ProductCard :product="product">
            <template #badge>
              <!-- TODO -->
              <Badge
                :title="$t('home_page.instant')"
                :icon="require('~/assets/img/home/instant.svg')"
                color="black"
                right
              />
            </template>
          </ProductCard>
        </div>
      </div>
      <div class="below">
        <div id="scroll-trigger" ref="infinitescrolltrigger"></div>
        <div v-if="showloader" class="circle-loader"></div>
      </div>
    </article>
  </div>
</template>
<script>
import Vue from 'vue';
import VueLoadmore from 'vuejs-loadmore';
Vue.use(VueLoadmore);
export default {
  name: 'LoadData',
  fetchOnServer: false,
  data() {
    return {
      currentPage: 1,
      maxPerPage: 2,
      totalResults: 100,
      showloader: true,
      products: [
        {
          id: 1,
          sku: 'CZ0328-400',
          brand: 'Nike',
          name: 'Nike LeBron 8 South Beach (2021)',
          colorway: 'Retro/Pink Flash-Filament Green-Black',
          gender: 'men',
          category_id: 1,
          release_year: '2021',
          release_date: '2021-07-21',
          retail_price: 20000,
          estimated_market_value: 252,
          story: '',
          ai: 0,
          enabled: 1,
          total_sales: '0',
          image: null,
          _id: '60556a245d104527f351af92',
          views: 0,
          searches: 0,
          rank: 0,
          created_at: '08/23/2022',
          updated_at: '08/23/2022',
          size_type: 'men',
          brand_id: 1,
          sale_price: 27004,
          previous_month_sale_percentage: 0,
          current_month_sale_percentage: 0,
          sales_percentage: 0,
          category: {
            id: 1,
            name: 'sneakers',
            _id: 'ueEbqPBxLbnTFLWwQdc4gv',
            created_at: '08/23/2022',
            updated_at: '08/23/2022',
          },
        },
        {
          id: 2,
          sku: 'DJ7998-100',
          brand: 'Nike',
          name: 'Nike Air Force 1 Low Hare Space Jam',
          colorway: 'White/Light Blue Fury-White',
          gender: 'men',
          category_id: 1,
          release_year: '2021',
          release_date: '2021-07-16',
          retail_price: 12000,
          estimated_market_value: 185,
          story: '',
          ai: 0,
          enabled: 1,
          total_sales: '0',
          image:
            '//images.deadstock.co/products/sneakers/DJ7998-100/800xAUTO/IMG01.jpg',
          _id: '60c9ea8eb842f35756e39442',
          views: 0,
          searches: 0,
          rank: 2,
          created_at: '08/23/2022',
          updated_at: '08/23/2022',
          size_type: 'men',
          brand_id: 1,
          sale_price: 23547,
          previous_month_sale_percentage: 0,
          current_month_sale_percentage: 0,
          sales_percentage: 0,
          category: {
            id: 1,
            name: 'sneakers',
            _id: 'ueEbqPBxLbnTFLWwQdc4gv',
            created_at: '08/23/2022',
            updated_at: '08/23/2022',
          },
        },
        {
          id: 3,
          sku: 'CV7562-401',
          brand: 'Nike',
          name: 'Nike Lebron 18 Low Wile E. vs Roadrunner Space Jam',
          colorway: 'Racer Blue/Baltic Blue-University Gold-White',
          gender: 'men',
          category_id: 1,
          release_year: '2021',
          release_date: '2021-07-16',
          retail_price: 16000,
          estimated_market_value: 223,
          story: '',
          ai: 0,
          enabled: 1,
          total_sales: '0',
          image:
            '//images.deadstock.co/products/sneakers/CV7562-401/800xAUTO/IMG01.jpg',
          _id: '60e59a7fea2d5e0f0a00c97a',
          views: 0,
          searches: 0,
          rank: 2,
          created_at: '08/23/2022',
          updated_at: '08/23/2022',
          size_type: 'men',
          brand_id: 1,
          sale_price: 26129,
          previous_month_sale_percentage: 0,
          current_month_sale_percentage: 0,
          sales_percentage: 0,
          category: {
            id: 1,
            name: 'sneakers',
            _id: 'ueEbqPBxLbnTFLWwQdc4gv',
            created_at: '08/23/2022',
            updated_at: '08/23/2022',
          },
        },
        {
          id: 4,
          sku: 'DH5354-001',
          brand: 'Nike',
          name: 'Nike Air Force 1 Low Computer Chip Space Jam',
          colorway: 'Black/Light Blue Fury-Black',
          gender: 'men',
          category_id: 1,
          release_year: '2021',
          release_date: '2021-07-16',
          retail_price: 12000,
          estimated_market_value: 185,
          story: '',
          ai: 0,
          enabled: 1,
          total_sales: '0',
          image: null,
          _id: '60df02f5ffd94d9799292f38',
          views: 0,
          searches: 0,
          rank: 0,
          created_at: '08/23/2022',
          updated_at: '08/23/2022',
          size_type: 'men',
          brand_id: 1,
          sale_price: 22199,
          previous_month_sale_percentage: 0,
          current_month_sale_percentage: 0,
          sales_percentage: 0,
          category: {
            id: 1,
            name: 'sneakers',
            _id: 'ueEbqPBxLbnTFLWwQdc4gv',
            created_at: '08/23/2022',
            updated_at: '08/23/2022',
          },
        },
        {
          id: 5,
          sku: 'DO7172-900',
          brand: 'Nike',
          name: "Xbox x Space Jam x LeBron 18 Low 'Wile E. x Roadrunner' Special Box",
          colorway: 'Racer Blue/Baltic Blue/University Gold/White',
          gender: 'men',
          category_id: 1,
          release_year: '2021',
          release_date: '2021-07-15',
          retail_price: 22000,
          estimated_market_value: 950,
          story: '',
          ai: 0,
          enabled: 1,
          total_sales: '0',
          image: null,
          _id: '60e83d7fbbdf6b4a4fd2097c',
          views: 0,
          searches: 0,
          rank: 0,
          created_at: '08/23/2022',
          updated_at: '08/23/2022',
          size_type: 'men',
          brand_id: 1,
          sale_price: 40373,
          previous_month_sale_percentage: 0,
          current_month_sale_percentage: 0,
          sales_percentage: 0,
          category: {
            id: 1,
            name: 'sneakers',
            _id: 'ueEbqPBxLbnTFLWwQdc4gv',
            created_at: '08/23/2022',
            updated_at: '08/23/2022',
          },
        },
        {
          id: 7,
          sku: 'DD1399-102',
          brand: 'Nike',
          name: 'Nike Dunk High Game Royal',
          colorway: 'White/Game Royal-Total Orange',
          gender: 'men',
          category_id: 1,
          release_year: '2021',
          release_date: '2021-06-29',
          retail_price: 11000,
          estimated_market_value: 139,
          story: '',
          ai: 0,
          enabled: 1,
          total_sales: '0',
          image:
            '//images.deadstock.co/products/sneakers/DD1399-102/800xAUTO/IMG01.jpg',
          _id: '60556a255d104527f3524e21',
          views: 0,
          searches: 0,
          rank: 2,
          created_at: '08/23/2022',
          updated_at: '08/23/2022',
          size_type: 'men',
          brand_id: 1,
          sale_price: 25505,
          previous_month_sale_percentage: 0,
          current_month_sale_percentage: 0,
          sales_percentage: 0,
          category: {
            id: 1,
            name: 'sneakers',
            _id: 'ueEbqPBxLbnTFLWwQdc4gv',
            created_at: '08/23/2022',
            updated_at: '08/23/2022',
          },
        },
        {
          id: 6,
          sku: 'DJ6395-100',
          brand: 'Nike',
          name: 'Nike Air Force 1 Low Acorn (2021)',
          colorway: 'Natural/Underbrush-Acorn',
          gender: 'men',
          category_id: 1,
          release_year: '2021',
          release_date: '2021-06-29',
          retail_price: 13000,
          estimated_market_value: 105,
          story: '',
          ai: 0,
          enabled: 1,
          total_sales: '2',
          image: null,
          _id: '60556a245d104527f352096c',
          views: 0,
          searches: 0,
          rank: 0,
          created_at: '08/23/2022',
          updated_at: '08/23/2022',
          size_type: 'men',
          brand_id: 1,
          sale_price: 29671,
          previous_month_sale_percentage: 0,
          current_month_sale_percentage: 0,
          sales_percentage: 0,
          category: {
            id: 1,
            name: 'sneakers',
            _id: 'ueEbqPBxLbnTFLWwQdc4gv',
            created_at: '08/23/2022',
            updated_at: '08/23/2022',
          },
        },
        {
          id: 8,
          sku: 'DH7683-100',
          brand: 'Nike',
          name: 'Nike Dunk SB High Pro Ishod Wair x Magnus Walker',
          colorway: 'Sail/University Blue-Red',
          gender: 'men',
          category_id: 1,
          release_year: '2021',
          release_date: '2021-06-25',
          retail_price: 12000,
          estimated_market_value: 369,
          story: '',
          ai: 0,
          enabled: 1,
          total_sales: '0',
          image:
            '//images.deadstock.co/products/sneakers/DH7683-100/800xAUTO/IMG01.jpg',
          _id: '60bf5e9a5719fe2a19be01ba',
          views: 0,
          searches: 0,
          rank: 2,
          created_at: '08/23/2022',
          updated_at: '08/23/2022',
          size_type: 'men',
          brand_id: 1,
          sale_price: 41814,
          previous_month_sale_percentage: 0,
          current_month_sale_percentage: 0,
          sales_percentage: 0,
          category: {
            id: 1,
            name: 'sneakers',
            _id: 'ueEbqPBxLbnTFLWwQdc4gv',
            created_at: '08/23/2022',
            updated_at: '08/23/2022',
          },
        },
        {
          id: 9,
          sku: 'DD1391-102',
          brand: 'Nike',
          name: 'Nike Dunk Low UNC (2021)',
          colorway: 'White/University Blue-White',
          gender: 'men',
          category_id: 1,
          release_year: '2021',
          release_date: '2021-06-24',
          retail_price: 10000,
          estimated_market_value: 250,
          story: '',
          ai: 0,
          enabled: 1,
          total_sales: '0',
          image:
            '//images.deadstock.co/products/sneakers/DD1391-102/800xAUTO/IMG01.jpg',
          _id: '60556a225d104527f350f1cf',
          views: 0,
          searches: 0,
          rank: 2,
          created_at: '08/23/2022',
          updated_at: '08/23/2022',
          size_type: 'men',
          brand_id: 1,
          sale_price: 23628,
          previous_month_sale_percentage: 0,
          current_month_sale_percentage: 0,
          sales_percentage: 0,
          category: {
            id: 1,
            name: 'sneakers',
            _id: 'ueEbqPBxLbnTFLWwQdc4gv',
            created_at: '08/23/2022',
            updated_at: '08/23/2022',
          },
        },
        {
          id: 10,
          sku: 'DH7913-001',
          brand: 'Nike',
          name: 'Nike Dunk Low Retro Animal Pack Zebra',
          colorway: 'Black/Pure Platinum-Canvas-Sail',
          gender: 'men',
          category_id: 1,
          release_year: '2021',
          release_date: '2021-06-22',
          retail_price: 11000,
          estimated_market_value: 158,
          story: '',
          ai: 0,
          enabled: 1,
          total_sales: '1',
          image:
            '//images.deadstock.co/products/sneakers/DH7913-001/800xAUTO/IMG01.jpg',
          _id: '60ae3ecf832eb91050f0d937',
          views: 0,
          searches: 0,
          rank: 2,
          created_at: '08/23/2022',
          updated_at: '08/23/2022',
          size_type: 'men',
          brand_id: 1,
          sale_price: 25207,
          previous_month_sale_percentage: 0,
          current_month_sale_percentage: 0,
          sales_percentage: 0,
          category: {
            id: 1,
            name: 'sneakers',
            _id: 'ueEbqPBxLbnTFLWwQdc4gv',
            created_at: '08/23/2022',
            updated_at: '08/23/2022',
          },
        },
      ],
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.totalResults / this.maxPerPage)
    },
    pageOffset() {
      return this.maxPerPage * this.currentPage
    },
  },
  mounted() {
    this.scrollTrigger();
  },
  methods: {
    scrollTrigger() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0 && this.currentPage < this.pageCount) {
            this.showloader = true;
            setTimeout(() => {
              console.log('==============here=================')
              this.currentPage += 1;
              this.showloader = false;
            }, 1000) // ajax call here;
          }
        });
      });
      observer.observe(this.$refs.infinitescrolltrigger);
    }
  },
  fetchProducts(){

  }
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.article
  margin: 0 auto
  width: 400px
  .section
    width: 400px
    margin-bottom: 20px
    border-radius: 10px
    background-color: #efefef
    color: #04525A
    overflow: hidden
    .p
      margin: 0
      padding: 10px 20px 
.below
  position: relative
  width: 400px
  height: 100px
  #scroll-trigger
    height: 50px
  .circle-loader
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    width: 50px
    height: 50px
    border-radius: 50%
    border: 5px solid rgba(255, 255, 255, .2)
    border-top: 5px solid #fff
    animation: animate 1.5s infinite linear
@keyframes animate
  0%
    transform: translate(-50%, -50%) rotate(0deg)
  100%
    transform: translate(-50%, -50%) rotate(360deg)
</style>
