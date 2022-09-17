<template>
  <b-modal id="address-type-modal" hide-footer>
    <template #modal-title class="text-capitalize modal-title m-0">
      <span class="text-capitalize text-bold">
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