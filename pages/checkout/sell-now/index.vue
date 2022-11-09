<template>
  <b-row class="sell-now-row">
    <ItemList v-if="! isResponsive" />

    <sale-summary v-if="! isResponsive" class="px-4 py-5" />

    <ShoppingBag v-else />
  </b-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ItemList from '~/components/checkout/sell-now/ItemList.vue'
import SaleSummary from '~/components/checkout/sell-now/SaleSummary.vue'
import ShoppingBag from '~/components/checkout/sell-now/mobile/ShoppingBag'
import screenSize from '~/plugins/mixins/screenSize'
import { enquireScreenSizeHandler } from '~/utils/screenSizeHandler'

export default {
  name: 'SellNow',
  components: { ItemList, SaleSummary, ShoppingBag },
  mixins: [ screenSize ],
  layout: 'IndexLayout',
  computed: {
    ...mapGetters({
      sellItem: 'sell-now/getSellingItem',
      isVendor: 'auth/isVendor'
    }),
    isResponsive() {
      return this.isScreenXS || this.isScreenSM
    }
  },
  beforeMount() {
    this.$root.$emit('hide-header', { hideHeader: true })
    enquireScreenSizeHandler((type) => {
      this.$store.commit('size/setScreenType', type)
    })
  },
  created() {
    this.offerExist()
    this.getOrderSettings()
    this.addVendorPayoutMethod()
    // If the user is a vendor
    if (this.isVendor){
      this.getVendorCommission(this.$store.state.auth.user.vendor.id)
    }

    this.getGlobalCommission()
  },
  beforeDestroy() {
    this.$root.$emit('hide-header', { hideHeader: false })
  },
  methods: {
    ...mapActions({
      getVendorCommission: 'commission/getVendorCommission',
      getGlobalCommission: 'commission/getGlobalCommission',
      getOrderSettings: 'order-settings/getOrderSettings',
      addVendorPayoutMethod: 'auth/addVendorPayoutMethod',
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
