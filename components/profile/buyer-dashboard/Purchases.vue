<template>
  <div>
    <div class="row my-5">
      <div class="col-md-3">
        <h1 class="font-secondary fs-24 fw-7 mb-0">{{ $t('buyer_dashboard.purchases.title') }}</h1>
      </div>
      <div class="col-md-6 d-flex justify-content-center">
        <NavGroup :value="activeNav" :data="menus" @change="navItem" />
      </div>
      <div class="col-md-3 d-flex justify-content-end align-items-center">
        <nuxt-link
          to='/profile/purchases'
          class="font-secondary fs-16 fw-400 border-bottom border-primary mb-0"
          >{{ $t('vendor_dashboard.view_all') }}</nuxt-link>
      </div>
    </div>
    <div class="my-5">
      <div class="buyer-purchases">
        <div class="row">
          <div v-for='row in purchases' :key='row.id' class="col-md-6">
            <div class="bg-white p-5 border br-10">
              <!-- TODO dummy data  -->
              <div class="row">
                <div class="col-6">
                  <h2 class="fs-18 fw-7 font-secondary">
                    {{ $t('buyer_dashboard.purchases.order') }}#{{row.order_id}} ({{row.type.label}})
                  </h2>
                  <h4 class="fs-16 fw-6 font-secondary mb-0">
                    {{ $t('buyer_dashboard.purchases.ordred_on') }} {{ row.created_at | moment("MMMM D, YYYY") }}
                  </h4>
                </div>
                <div class="col-6 d-flex flex-column align-items-end">
                  <nuxt-link :to="'/orders/' + row.order_id+'-'+row.id"
                    class="font-secondary fs-16 fw-4 border-bottom border-primary mb-0"
                    >{{ $t('buyer_dashboard.purchases.view_order') }}
                  </nuxt-link>
                </div>
              </div>
              <div class="row">
                <div v-for='item in row.items' :key='item.id' class="col-md-4">
                  <ProductThumb
                    :src="item.product.image"
                    :product="item.product" />
                </div>
              </div>
              <div class="row align-items-center">
                <div class="col-md-8">
                  <h5 class="fs-14 fw-5 font-secondary mb-0">
                    {{ $t('buyer_dashboard.purchases.quantity') }}: {{row.quantity}}
                  </h5>
                  <h5 class="fs-14 fw-5 font-secondary mb-0">
                    {{ $t('buyer_dashboard.purchases.order_total') }}: ${{row.total | formatPrice}}
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
  </div>
</template>
<script>
import NavGroup from '~/components/common/NavGroup.vue'
import ProductThumb from '~/components/product/Thumb.vue'
export default {
  components: { ProductThumb, NavGroup },
  data(){
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
  mounted(){
    this.getPurchases()
  },
  methods:{
    // On Tab Change (All/ Footwear/ Apparel/ Accessories)
    navItem(val) {
      this.activeNav = val
      this.getPurchases()
    },
    getPurchases(){
      this.$axios
        .get('/dashboard/buyer/purchases?category_id='+this.activeNav)
        .then((res) => {
          this.purchases = res.data.data
        })
        .catch((err) => {
          this.logger.logToServer(err.response)
        })
    },
  }
}
</script>