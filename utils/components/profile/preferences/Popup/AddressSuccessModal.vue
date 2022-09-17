<template>
  <b-modal id="preference-success-modal" body-class="p-0" hide-footer centered>
    <div class="modal-body py-4">
      <div class="vd-sell-are-you-sure-text text-center">
        {{
          actionType === 'edit'
            ? $t('preferences.profile.update_success_content')
            : $t('preferences.profile.delete_success_content')
        }}
      </div>
      <div class="text-center mt-4">
        <button
          id="deleted-successfully"
          type="button"
          class="btn vd-sell-delete-successfully-btn d-inline-flex justify-content-center align-items-center"
          @click.stop="$bvModal.hide('preference-success-modal')"
        >
          <!-- Success Icons -->
          <img
            :src="require('~/assets/img/icons/ok-icon.png')"
            alt="Address Success"
          />
          <!-- ./Success Icons -->
        </button>
      </div>
    </div>
  </b-modal>
</template>
<script>
export default {
  name: 'AddressSuccessModal',

  props: {
    actionType: {
      type: String,
      default: ''
    }
  }
}
</script>
