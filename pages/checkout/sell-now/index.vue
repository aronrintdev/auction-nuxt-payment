<template>
  <b-row class="sell-now-row">
    <ItemList />

    <sale-summary class="px-4 py-5" />
  </b-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ItemList from '~/components/checkout/sell-now/ItemList.vue'
import SaleSummary from '~/components/checkout/sell-now/SaleSummary.vue'

export default {
  name: 'SellNow',
  components: { ItemList, SaleSummary },
  layout: 'IndexLayout',

  computed: {
    ...mapGetters({
      sellItem: 'sell-now/getSellingItem',
      isVendor: 'auth/isVendor'
    })
  },
  created() {
    this.offerExist()
    this.getOrderSettings()
    // If the user is a vendor
    if(this.isVendor){
      this.getVendorCommission(this.$store.state.auth.user.vendor.id)
    }
    
    this.getGlobalCommission()
  },
  methods: {
    ...mapActions({
      getVendorCommission: 'commission/getVendorCommission',
      getGlobalCommission: 'commission/getGlobalCommission',
      getOrderSettings: 'order-settings/getOrderSettings'
    }),
    offerExist(){
      this.$axios.get('/sell-now/check-offerexist', {params: {
        id: this.sellItem.id,
        size_id: this.sellItem.size_id,
        packaging_condition_id: this.sellItem.packaging_condition_id,
        highestOffer: this.sellItem.highestOffer,
      }})
      .then((res) => {
        this.$store.dispatch('sell-now/addItem', { ...this.sellItem, offer: res.data.data })
      })
      .catch((err) => {
        this.$logger.logToServer('Offer Doesnot Exist', err.response.data)
        this.$router.push(`/shop/${this.sellItem.sku}`)
      })
    }
    
  },
}
</script>