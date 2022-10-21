<template>
  <div>
    <div class="row mt-2 mb-2 my-sm-5">
      <div class="col-6 col-md-3">
        <h1 class="font-secondary fs-24 fw-7 mb-0 purchases">
          {{ $t('buyer_dashboard.purchases.title') }}
        </h1>
      </div>
      <div class="d-none col-md-6 d-sm-flex justify-content-center">
        <NavGroup :value="activeNav" :data="menus" @change="navItem" />
      </div>
      <div class="col-6 col-md-3 d-flex justify-content-end align-items-center">
        <nuxt-link
          to="/profile/purchases"
          class="font-secondary fs-16 fw-400 border-bottom border-primary mb-0"
          >{{ $t('vendor_dashboard.view_all') }}</nuxt-link
        >
      </div>
    </div>
    <div>
      <div class="buyer-purchases">
        <div class="row d-none d-sm-flex">
          <div v-for="row in purchases" :key="row.id" class="col-md-6">
            <div class="bg-white p-5 border br-10">
              <!-- TODO dummy data  -->
              <div class="row">
                <div class="col-6">
                  <h2 class="fs-18 fw-7 font-secondary">
                    {{ $t('buyer_dashboard.purchases.order') }}#{{
                      row.order_id
                    }}
                    ({{ row.type.label }})
                  </h2>
                  <h4 class="fs-16 fw-6 font-secondary mb-0">
                    {{ $t('buyer_dashboard.purchases.ordred_on') }}
                    {{ row.created_at | moment('MMMM D, YYYY') }}
                  </h4>
                </div>
                <div class="col-6 d-flex flex-column align-items-end">
                  <nuxt-link
                    :to="'/orders/' + row.order_id + '-' + row.id"
                    class="font-secondary fs-16 fw-4 border-bottom border-primary mb-0"
                    >{{ $t('buyer_dashboard.purchases.view_order') }}
                  </nuxt-link>
                </div>
              </div>
              <div class="row my-sm-3">
                <div v-for="item in row.items" :key="item.id" class="col-md-4">
                  <ProductThumb
                    :src="item.product.image"
                    :product="item.product"
                  />
                </div>
              </div>
              <div class="row align-items-center">
                <div class="col-md-8">
                  <h5 class="fs-14 fw-5 font-secondary mb-0">
                    {{ $t('buyer_dashboard.purchases.quantity') }}:
                    {{ row.quantity }}
                  </h5>
                  <h5 class="fs-14 fw-5 font-secondary mb-0">
                    {{ $t('buyer_dashboard.purchases.order_total') }}: ${{
                      row.total | formatPrice
                    }}
                  </h5>
                </div>
                <div class="col-md-4 status-badge-warning">
                  {{ row.order_status }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row d-flex d-sm-none">
      <div v-for="x in 4" :key="x" class="col-12 my-2">
        <div class="bg-white py-2 border shadow-sm br-10">
          <div
            class="px-2 product-info d-flex align-items-center align-items-sm-baseline flex-sm-column gap-2 mb-2 mb-sm-0 position-relative"
          >
            <Carousel
              ref="carousel"
              :loop="false"
              :nav="false"
              :center="true"
              :margin="0"
              :responsive="responsiveAttr"
              :mouse-drag="true"
              :dots="true"
              class="thumb-carousel"
              autoWidth
            >
              <div
                v-for="y in 4"
                :key="y"
                class="col-thumb d-flex justify-content-center"
              >
                <ProductThumb />
              </div>
            </Carousel>
            <div>
              <h4 class="font-primary fw-6 fs-14 text-black mb-2">
                <!-- TODO  -->
                Jordan 4 Retro (2021)
              </h4>
              <h4 class="font-primary fs-11 fw-5 mb-0 text-secondary">
                {{ $t('vendor_dashboard.colorway') }}: University Blue
              </h4>
              <h4 class="font-primary fs-11 fw-5 mb-0 text-secondary">
                {{ $t('vendor_dashboard.box_condition') }}: Opened with No Tag
              </h4>
            </div>
          </div>

          <!-- TODO  -->
          <div class="order-info">
            <div class="d-flex info-row px-3 py-1 justify-content-between">
              <h6 class="mb-0 fs-12 fw-7 font-primary text-black">
                {{ $t('buyer_dashboard.purchases.order') }}:
              </h6>
              <h6
                class="mb-0 fs-12 fw-5 font-primary text-primary w-fit-content border-bottom border-primary"
              >
                2125845121
              </h6>
            </div>
            <div class="d-flex info-row px-3 py-1 justify-content-between">
              <h6 class="mb-0 fs-12 fw-7 font-primary text-black">
                {{ $t('buyer_dashboard.purchases.ordred_on') }}:
              </h6>
              <h6
                class="mb-0 fs-12 fw-5 font-primary text-black w-fit-content text-secondary"
              >
                12/12/2020
              </h6>
            </div>
            <div class="d-flex info-row px-3 py-1 justify-content-between">
              <h6 class="mb-0 fs-12 fw-7 font-primary text-black">Status:</h6>
              <h6
                class="mb-0 fs-12 fw-5 font-primary text-warning w-fit-content"
              >
                Pending
              </h6>
            </div>
            <div class="d-flex info-row px-3 py-1 justify-content-between">
              <h6 class="mb-0 fs-12 fw-7 font-primary text-black">Type:</h6>
              <h6
                class="mb-0 fs-12 fw-5 font-primary text-black w-fit-content text-secondary"
              >
                Trade
              </h6>
            </div>
            <div class="d-flex info-row px-3 py-1 justify-content-between">
              <h6 class="mb-0 fs-12 fw-7 font-primary text-black">
                {{ $t('buyer_dashboard.purchases.quantity') }}:
              </h6>
              <h6
                class="mb-0 fs-12 fw-5 font-primary text-black w-fit-content text-secondary"
              >
                3
              </h6>
            </div>
            <div class="d-flex info-row px-3 py-1 justify-content-between">
              <h6 class="mb-0 fs-12 fw-7 font-primary text-black">
                {{ $t('buyer_dashboard.purchases.order_total') }}:
              </h6>
              <h6
                class="mb-0 fs-12 fw-5 font-primary text-black w-fit-content text-secondary"
              >
                $4.99
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavGroup from '~/components/common/NavGroup.vue'
import ProductThumb from '~/components/product/Thumb.vue'
export default {
  components: { ProductThumb, NavGroup },
  data() {
    return {
      purchases: [],
      activeNav: '',
      // Menus for tabs
      /** Todo need to make dynamic onces we have way of main categories in DB */
      menus: [
        { label: this.$t('vendor_dashboard.all'), value: '' },
        { label: this.$t('vendor_dashboard.footwear'), value: '1' },
        { label: this.$t('vendor_dashboard.apparel'), value: '2' },
        {
          label: this.$t('vendor_dashboard.accessories'),
          value: '3',
        },
      ],
    }
  },
  computed: {
    responsiveAttr() {
      return {
        0: { items: 1, nav: false, center: false },
      }
    },
  },
  mounted() {
    this.getPurchases()
  },
  methods: {
    // On Tab Change (All/ Footwear/ Apparel/ Accessories)
    navItem(val) {
      this.activeNav = val
      this.getPurchases()
    },
    getPurchases() {
      this.$axios
        .get('/dashboard/buyer/purchases?category_id=' + this.activeNav)
        .then((res) => {
          this.purchases = res.data.data
        })
        .catch((err) => {
          this.logger.logToServer(err.response)
        })
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.order-info
  .info-row:nth-child(even)
    background-color:  $color-white-5
.col-thumb
  width: 100px
.thumb-carousel::v-deep
  width: 100px
  .owl-dots
    position: absolute
    top: 74px
    right: -100px
    button.owl-dot
      span
        width: 4px
        height: 4px
        margin: 5px 2px
      &.active
        span
          background: $color-black-1
</style>
