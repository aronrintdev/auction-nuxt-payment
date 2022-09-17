<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="10">
          <SettingsMenu />
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="3"></b-col>
        <b-col cols="9">
          <MyAddresses ref="myAddress" @editAddress="editAddress" />
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="3"></b-col>
        <b-col cols="9">
          <AddAddress ref="addAddress" @newAddress="newAddress" />
        </b-col>
      </b-row>
    </b-container>

    <div class="settings-addresses-main container-fluid"></div>
  </div>
</template>

<script>
import MyAddresses from '~/components/profile/settings/addresses/MyAddresses'
import AddAddress from '~/components/profile/settings/addresses/AddAddress'
import SettingsMenu from '~/components/profile/settings/SettingsMenu'

export default {
  name: 'Addresses',
  components: {
    AddAddress,
    MyAddresses,
    SettingsMenu,
  },
  layout: 'Profile',
  methods: {
    newAddress(address) {
      this.$refs.myAddress.addresses.push(address)
    },

    editAddress(address) {
      this.$refs.addAddress.newAddress = address
      this.$refs.addAddress.editID = address.id
      this.$refs.addAddress.addOrEditHeader = 'Edit Address'
    },
  },
}
</script>
