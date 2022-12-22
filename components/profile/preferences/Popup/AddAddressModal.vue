<template>
  <b-modal id="address-type-modal" hide-footer>
    <template #modal-title class="text-capitalize modal-title m-0">
      <span class="text-capitalize heading">
        {{
          $t('preferences.profile.address_modal_header', { type: addressType })
        }}
      </span>
    </template>
    <AddressForm :addressType="addressType" :countries="countries" @reload="reloadAddress" />
  </b-modal>
</template>

<script>
import AddressForm from './AddressForm.vue'
export default {
  name: 'AddAddressModal',

  components: {
    AddressForm,
  },

  props: {
    addressType: {
      type: String,
      default: '',
    },
    countries: {
      type: Array,
      default: () => {
        return []
      },
    },
  },

  methods: {
    reloadAddress() {
      this.$emit('reload')
    }
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.heading
  font-family: $font-montserrat-serif
  font-weight: $medium
  font-style: $normal
  font-size: 20px
</style>