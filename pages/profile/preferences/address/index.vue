<template>
  <div class="your-address-page">
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
      if(!this.isScreenSize){
        this.$router.push('/profile/preferences')
      }
    }
  },
}
</script>