<template>
  <div class="show-addresses">
    <h3 class="show-title">{{$t('settings.addresses.my_addresses')}}</h3>
    <div class="addresses-table">
      <div v-for="address in addresses" :key="address.id" class="address-container">
        <div class="address-first-name">{{ address.first_name }} {{ address.last_name }}</div>
        <div>{{ address.address_line_1 }}</div>
        <div>{{ address.address_line_2 }}</div>
        <div>{{ address.city }}, {{ address.state }}, {{ address.zip }}</div>
        <div>{{ address.country }}</div>
        <div>{{ address.phone }}</div>

        <div class="buttons-style">
          <div class="button-edit" @click="editAddress(address)">{{ $t('settings.addresses.edit') }}</div>
          |
          <div class="button-delete" @click="deleteAddress(address.id)">{{ $t('settings.addresses.delete') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MyAddresses',
  data() {
    return {
      addresses: []
    }
  },

  mounted() {
    this.listAddresses();
  },

  methods: {
    deleteAddress(id) {
      if(confirm(self.$t('settings.addresses.delete_address'))) {
        this.$axios.delete('/addresses/' + id)
          .then(({data}) => {
            this.addresses = this.addresses.filter((address) => address.id !== id)
          })
      }
    },

    listAddresses() {
      this.$axios.get('/all-addresses/' + this.$store.state.auth.user.id)
        .then(({data}) => {
          this.addresses = data;
        })
    },

    editAddress(address) {
      this.$emit('editAddress', address)
    }
  }

}
</script>
