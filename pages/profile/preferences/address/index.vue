<template>
  <div class="your-address-page">
    <client-only>
      <Portal to="page-title"> {{ $t('navbar.profile') }}</Portal>
      <Portal to="back-icon-slot">
        <img
          :src="require('~/assets/img/icons/back.svg')"
          alt="back-arrow"
          class="float-left"
          @click="moveBack"
        />
      </Portal>
    </client-only>
    <AddressComponent />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import screenSize from '~/plugins/mixins/screenSize'
import AddressComponent from '~/components/profile/preferences/Address/AddressComponent.vue'

export default {
  name: 'Address',

  components: {
    AddressComponent
  },

  mixins: [screenSize],

  layout: 'Profile',

  middleware: 'auth',

  data() {
    return {
      shipping: false
    }
  },

  computed: {
    ...mapGetters({
      getShippingAddress: 'auth/getShippingAddress'
    }),
    shippingAddress: (vm) => {
      return vm.getShippingAddress
    }
  },

  mounted() {
    window.addEventListener('resize', this.onScreenChange);
  },

  methods: {
    shippingForm(){
      if(!this.getShippingAddress) {
        this.shipping = !this.shipping
      }
    },

    onScreenChange(){
      if(!this.isScreenXS){
        this.$router.push('/profile/preferences')
      }
    },
    moveBack()
    {
      this.$router.push('/profile/preferences')
    },
  },
}
</script>
<style lang="sass" scoped>
.your-address-page
  min-height: 37rem
</style>
