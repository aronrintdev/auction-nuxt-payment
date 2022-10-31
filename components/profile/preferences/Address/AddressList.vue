<template>
  <div class="list">
    <List
      :type="selectedAddressType"
      :data="address"
      :defaultAddress="defaultAddress"
      @moveBack="moveBack"
      @edit="editAddress"
    />
    <span class="add-more-img mr-4 mb-4 float-right" @click="addForm">
      <img
        :src="require('~/assets/img/icons/plus-bg-dark-blue.svg')"
        alt="add-more-icon"
      />
    </span>
    <AlertModal
      id="add-address-success"
      :message="$t('preferences.profile.address_added')"
      icon="success-tick"
      auto-hide
      @hidden="onSuccessModalHide"
    />
    <AlertModal
      id="default-success"
      :message="$t('preferences.profile.default_address_changed')"
      icon="success-tick"
      auto-hide
      @hidden="onDefaultModalHide"
    />
    <AlertModal
      id="edit-address-success"
      :message="$t('preferences.profile.changes_saved')"
      icon="success-tick"
      auto-hide
      @hidden="onEditModalHide"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import List from './Item.vue'
import { AlertModal } from '~/components/modal'

import emitEvent from '~/plugins/mixins/emit-event'
export default {
  name: 'AddressList',

  components: {
    List,
    AlertModal,
  },

  mixins: [emitEvent],

  data() {
    return {
      address: [],
      defaultAddress: {},
    }
  },
  computed: {
    ...mapGetters({
      selectedAddressType: 'preferences/getSelectedAddressType',
      shippingAddresses: 'auth/getShippingAddresses',
      billingAddresses: 'auth/getBillingAddresses',

      defaultShipping: 'auth/getShippingAddress',
      defaultBilling: 'auth/getBillingAddress',
    }),
  },

  created() {
    this.userDetails()
    this.$auth.fetchUser().then(() => {
      this.loadAddress()
    })
  },

  mounted() {
    if (this.$auth.$storage.getState('showEditModal')) {
      this.$bvModal.show('edit-address-success')
    }

    if (this.$auth.$storage.getState('showSuccessModal')) {
      this.$bvModal.show('add-address-success')
    }

    if (this.$auth.$storage.getState('showDefault')) {
      this.$bvModal.show('default-success')
    }
  },

  methods: {
    ...mapActions({
      userDetails: 'auth/getUserDetails',
      getBillingAddress: 'auth/billingAddresses',
      getShippingAddress: 'auth/shippingAddresses',
      actionType: 'preferences/actionType',
      editAddress: 'preferences/editAddressID',
    }),
    // on move back click
    moveBack() {
      this.emitRenderComponentEvent(
        this.$parent.$options.components.YourAddress.name
      )
    },

    // on load address
    loadAddress() {
      this.getShippingAddress()
      this.getBillingAddress()

      if (this.selectedAddressType === 'shipping') {
        this.address = this.shippingAddresses || []
        this.defaultAddress = this.defaultShipping || {}
      }

      if (this.selectedAddressType === 'billing') {
        this.address = this.billingAddresses || []
        this.defaultAddress = this.defaultBilling || {}
      }
    },
    // on show success modal
    onSuccessModalShow() {
      this.$bvModal.show('add-address-success')
    },
    // on hide modal
    onSuccessModalHide() {
      this.$auth.$storage.removeState('showSuccessModal')
      this.$bvModal.hide('add-address-success')
    },

    // on show edit modal
    onEditModalShow() {
      this.$bvModal.show('edit-address-success')
    },

    // on hide modal
    onDefaultModalHide() {
      this.$auth.$storage.removeState('showDefault')
      this.$bvModal.hide('default-success')
    },
    // on show modal
    onDefaultModalShow() {
      this.$bvModal.show('default-success')
    },
    // on hide modal
    onEditModalHide() {
      this.$auth.$storage.removeState('showEditModal')
      this.$bvModal.hide('edit-address-success')
    },

    // show add form
    addForm() {
      this.$store.dispatch('preferences/actionType', 'add')
      this.emitRenderComponentEvent(
        this.$parent.$options.components.AddressForm.name
      )
    },

    // on edit address
    editAddress(val) {
      this.$store.dispatch('preferences/actionType', 'edit')
      this.$store.dispatch('preferences/editAddressID', val)

      this.emitRenderComponentEvent(
        this.$parent.$options.components.AddressForm.name
      )
    },
  },
}
</script>