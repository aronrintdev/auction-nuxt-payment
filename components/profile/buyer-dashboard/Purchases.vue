<template>
  <div :class="{
    'mb-2': !isScreenXS
  }">
    <div class="row mt-2 mb-2 my-sm-3">
      <div class="col-6 col-md-3">
        <h1 :class="{
          'body-5-medium font-primary': isScreenXS
        }" class="font-secondary fs-24 fw-7 mb-0">
          {{ $t('buyer_dashboard.purchases.title') }}
        </h1>
      </div>
      <div class="d-none col-md-6 d-sm-flex justify-content-center">
        <NavGroup :value="activeNav" :data="menus" @change="navItem"/>
      </div>
      <div class="col-6 col-md-3 d-flex justify-content-end align-items-center">
        <nuxt-link
          to="/profile/purchases"
          class="font-secondary fs-16 fw-400 border-bottom border-primary mb-0 view-more-link"
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
                    {{
                      new Date(row.created_at).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    }}
                  </h4>
                </div>
                <div class="col-6 d-flex flex-column align-items-end">
                  <nuxt-link
                    :to="'/profile/purchases/summary/' + row.id"
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
                <div
                    :aria-label="$t('vendor_dashboard.status')"
                    :class="{
                'text-center ml-auto': !isScreenXS
              }"
                    class="d-flex align-items-center justify-content-center tdHeight "
                >
                  <h4 :class="styleFor(row.order_status) + ` ${mobileClass}` + `${isScreenXS? 'text-nowrap': ''}`"
                      class="text-capitalize status body-13-normal">
                    {{ row.order_status }}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row d-flex d-sm-none">
      <div v-for="row in purchases" :key="row.id" class="col-12 my-2">
        <div class="bg-white py-2 border br-10">
          <Carousel
              ref="sizeCarousel"
              :center="true"
              :dots="true"
              :loop="false"
              :margin="20"
              :mouse-drag="false"
              :nav="true"
              :nav-text="['', '']"
              :responsive="{
            0: { items: 1, nav: false, center: true },
          }"
              class="carousel slide-fade position-relative thumb-carousel"
          >
            <div
                v-for="(item, index) in row.items"
                :key="item.id"
                :data-position="index"
                :data-size="item.id"
            >
              <b-row v-if="item" class="px-2">
                <b-col cols="4">
                  <ProductThumb
                      :product="item.product"
                      :src="item.product.image"
                      class="image-thumb"
                      width="82"
                  />
                </b-col>
                <b-col class="item-desc d-flex flex-column justify-content-center" cols="8">
                  <h4 class="title-item body-5-medium text-nowrap text-truncate text-black">
                    {{ item.product.name }}
                  </h4>
                  <h4 class="body-6-normal text-nowrap mb-0 ">
                    {{ $t('common.sku') }}: {{ item.product.sku }}
                  </h4>
                  <h4 class="body-6-normal text-secondary mb-0">
                    {{ $t('vendor_dashboard.colorway') }}:{{
                      item.product.colorway
                    }}
                  </h4>
                  <h4 class="body-6-normal  text-secondary mb-0">
                    {{ $t('vendor_dashboard.box_condition') }}: {{ item.product.box_condition || '' }}
                  </h4>
                </b-col>
              </b-row>
            </div>
            </Carousel>

          <!-- TODO  -->
          <div class="order-info">
            <div class="d-flex info-row px-3 py-1 justify-content-between">
              <h6 class="mb-0 fs-12 fw-7 font-primary text-black">
                {{ $t('buyer_dashboard.purchases.order') }}:
              </h6>
              <h6
                  class="mb-0 fs-12 fw-5 font-primary text-primary w-fit-content border-bottom border-primary"
                  @click="$router.push('/profile/purchases/summary/' + row.order_id)"
              >
                #{{ row.order_id }}
              </h6>
            </div>
            <div class="d-flex info-row px-3 py-1 justify-content-between">
              <h6 class="mb-0 fs-12 fw-7 font-primary text-black">
                {{ $t('buyer_dashboard.purchases.ordred_on') }}:
              </h6>
              <h6
                class="mb-0 fs-12 fw-5 font-primary text-black w-fit-content text-secondary"
              >
                {{ new Date(row.created_at).toLocaleDateString() }}
              </h6>
            </div>
            <div class="d-flex info-row px-3 py-1 justify-content-between">
              <h6 class="mb-0 fs-12 fw-7 font-primary text-black">
                {{ $t('vendor_dashboard.status') }}:
              </h6>
              <h6
                  class="mb-0 fs-12 fw-5 font-primary text-warning w-fit-content text-capitalize"
              >
                {{ row.order_status }}
              </h6>
            </div>
            <div class="d-flex info-row px-3 py-1 justify-content-between">
              <h6 class="mb-0 fs-12 fw-7 font-primary text-black">
                {{ $t('vendor_dashboard.type') }}:
              </h6>
              <h6
                  class="mb-0 fs-12 fw-5 font-primary text-black w-fit-content text-secondary text-capitalize"
              >
                {{ row.type.label }}
              </h6>
            </div>

            <div class="d-flex info-row px-3 py-1 justify-content-between">
              <h6 class="mb-0 fs-12 fw-7 font-primary text-black">
                {{ $t('buyer_dashboard.purchases.quantity') }}:
              </h6>
              <h6
                class="mb-0 fs-12 fw-5 font-primary text-black w-fit-content text-secondary"
              >
                {{ row.quantity }}
              </h6>
            </div>
            <div class="d-flex info-row px-3 py-1 justify-content-between">
              <h6 class="mb-0 fs-12 fw-7 font-primary text-black">
                {{ $t('buyer_dashboard.purchases.order_total') }}:
              </h6>
              <h6
                class="mb-0 fs-12 fw-5 font-primary text-black w-fit-content text-secondary"
              >
                ${{ row.total | formatPrice }}
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
import screenSize from '~/plugins/mixins/screenSize';
export default {
  components: {ProductThumb, NavGroup},
  mixins: [screenSize],
  data() {
    return {
      purchases: [],
      activeNav: '',
      // Menus for tabs
      /** Todo need to make dynamic onces we have way of main categories in DB */
      menus: [
        {label: this.$t('vendor_dashboard.all'), value: ''},
        {label: this.$t('vendor_dashboard.footwear'), value: '1'},
        {label: this.$t('vendor_dashboard.apparel'), value: '2'},
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
        0: {items: 1, nav: false, center: true},
      }
    },
  },
  mounted() {
    this.getPurchases()
  },
  methods: {
    styleFor(statusLabel) {
      switch (statusLabel.toLowerCase()) {
        case 'arrived_at_deadstock':
          return 'arrived';
        case 'arrived_at_ds':
          return 'arrived';
        case 'delivered':
          return 'delivered';
        case 'completed':
          return 'arrived';
        case 'cancel':
          return 'cancel';
        case 'refunded':
          return 'cancel';
        case 'cancelled':
          return 'cancel';
        case 'shipped_to_deadstock':
          return 'shipped';
        case 'shipped_to_ds':
          return 'shipped';
        case 'awaiting_authentication':
          return 'awaiting-auth';
        case 'auth_completed':
          return 'auth-completed';
        case 'order_taken_over':
          return 'order-taken-over';
      }

      return 'awaiting'
    },
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
.awaiting
  color: $color-red-20

  &:not(.mobile)
    background: rgba($color-red-20, 0.08)

.status.cancel
  color: $color-red-3

  &:not(.mobile)
    background: rgba($color-red-3, 0.05)

.status.arrived
  color: $color-green-3

  &:not(.mobile)
    background: $color-green-20

.status.delivered
  color: $color-blue-17

  &:not(.mobile)
    background: rgba($color-blue-17, 0.05)

.status.shipped
  color: $color-blue-16

  &:not(.mobile)
    background: $dark-gray-5

.status.auth-completed
  color: $color-purple-7

  &:not(.mobile)
    background: $color-purple-8

.status.awaiting-auth
  &:not(.mobile)
    background: rgba($color-blue-17, 0.05)
  color: $color-blue-17

.status.order-taken-over
  &:not(.mobile)
    background: $dark-gray-7
  color: $color-gray-5

.status-badge-warning
  &.mobile
    background-color: transparent
    padding: 0

.title-item
  max-width: 200px

::v-deep.image-thumb
  img
    width: 82px
    object-fit: cover

.order-info
  .info-row:nth-child(even)
    background-color: $color-white-5

.col-thumb
  width: 100px

.thumb-carousel::v-deep
  .owl-dots
    height: 10px
    margin-top: 0
    margin-bottom: 22px

    .owl-dot
      margin-inline: 4px
      margin-block: 0

    .owl-dot.active span, .owl-theme .owl-dots .owl-dot:hover span
      background-color: $color-black-1

    button
      span
        margin: 0
        height: 4px
        width: 4px
        background-color: $color-gray-4

@media (max-width: 576px)
  .view-more-link
    font-size: 10px
    font-weight: $medium
  .heading
    font-size: 14px
    font-family: $font-family-base
    font-weight: $medium
</style>
