<template>
  <div v-if="user.vendor_status" class="vendor-page h-100 d-flex flex-column">
    <div :class="mobileClass ? 'p-3' : 'title-area'">
      <span class="title" :class="mobileClass ? 'body-13-medium' : 'heading-4-bold'">
        {{ $t('vendor_hub.vendor_hub') }}
      </span>
    </div>

    <div class="flex-grow-1 bg-white d-flex flex-column">
      <div class="d-flex justify-content-center mt-3 mt-md-0 mb-3 mb-md-0">
        <NavGroup
            :data="NAV_ITEMS"
            :value="currentTab"
            @change="handleCategoryChange"
        />
      </div>

      <div class="h-100 mx-3" :class="{'my-3' : currentTab !== 'commission'}">
        <VendorPaymentMethod v-if="currentTab === 'payout_method'"/>
        <Documents v-if="currentTab === 'documents'"/>
        <StoreDetails v-if="currentTab === 'store_details'"/>
        <Commissions v-if="currentTab === 'commission'"/>
      </div>
    </div>
    <client-only v-if="mobileClass">
      <Portal to="page-title">{{ $t('vendor_hub.vendor_hub') }}</Portal>
    </client-only>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import NavGroup from '~/components/common/NavGroup';
import VendorPaymentMethod from '~/components/profile/vendor-hub/VendorPaymentMethod';
import Documents from '~/components/profile/vendor-hub/Documents';
import StoreDetails from '~/components/profile/vendor-hub/StoreDetails';
import Commissions from '~/components/profile/vendor-hub/Commissions';
import {USER_STATUS_PENDING, USER_STATUS_REJECTED} from '~/static/constants';
import screenSize from '~/plugins/mixins/screenSize';

export default {
  name: 'VendorHub',
  components: {Commissions, StoreDetails, Documents, VendorPaymentMethod, NavGroup},
  mixins: [screenSize],
  layout: 'Profile',
  data() {
    return {
      modalActionLoading: false,
      currentTab: 'store_details',
      NAV_ITEMS: Object.keys(this.$t('vendor_hub.tabs')).map((key) => {
        return {
          label: this.$t('vendor_hub.tabs.' + key),
          value: key
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  mounted() {
    this.getVendorDocRequirements()
    this.routeUser()
  },
  methods: {
    ...mapActions({
      getVendorDocRequirements: 'vendor-hub/getVendorDocRequirements',
    }),
    handleCategoryChange(value) {
      this.currentTab = value
    },
    /**
     * Checking the user's vendor status and routing them to the appropriate page.
     */
    routeUser() {
      switch (this.user.vendor_status) {
        case USER_STATUS_PENDING:
          this.$router.push({
            path: '/profile/vendor-hub/application-received'
          })
          break;
        case USER_STATUS_REJECTED:
          this.$router.push({
            path: '/profile/vendor-hub/apply'
          })
          break;
        case null:
          this.$router.push({
            path: '/profile/vendor-hub/apply'
          })
          break;
        default:
          break;
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.bg-blue-2.btn
  background: $color-blue-2
  border: 1px solid $color-blue-2

.title-area
  padding: 80px 120px

.title
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $bold

.vendor-page
  background-color: $color-white-4
</style>
