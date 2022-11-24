<template>
  <b-modal id="confirm-modal" body-class="p-0" hide-footer centered>
    <div class="modal-body py-4">
      <div class="vd-sell-are-you-sure-text text-center">
        {{
          actionType === 'edit'
            ? $t('preferences.profile.update_confirm_content')
            : $t('preferences.profile.delete_address_content')
        }}
      </div>
    </div>
    <div class="modal-footer text-center border-0 justify-content-center">
      <!-- Confirm Button -->
      <b-button
        variant="light"
        class="btn vd-sell-are-you-sure-delete-btn"
        pill
        @click="onClick(actionType === 'edit' ? 'confirm' : 'delete')"
      >
        <span>{{
          actionType === 'edit'
            ? $t('preferences.common.confirm')
            : $t('preferences.common.delete')
        }}</span>
      </b-button>
      <!-- Confirm Button -->
      <!-- Cancel Button -->
      <b-button
        variant="outline-light"
        class="btn vd-sell-are-you-sure-cancel-btn"
        pill
        @click="onClick('cancel')"
      >
        {{ $t('preferences.common.cancel') }}
      </b-button>
      <!-- ./Cancel Button -->
    </div>
  </b-modal>
</template>
<script>
export default {
  name: 'AddressConfirmModal',

  props: {
    actionType: {
      type: String,
      default: ''
    }
  },

  methods: {
    // On button click event
    onClick(type) {
      this.$bvModal.hide('confirm-modal')
      this.$emit('actionConfirmed', type)
      this.$router.reload('actionCanceled')
    }
  }
}
</script>
