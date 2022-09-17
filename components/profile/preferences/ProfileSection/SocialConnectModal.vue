<template>
  <b-modal id="social-modal" hide-footer centered>
    <template #modal-title class="text-capitalize p-5 text-left m-0">
      <span class="text-capitalize text-bold">
        {{ $t('preferences.profile.connection', { type: actionType === 'connect' ? 'Connect to' : 'Remove' }) }}
      </span>
    </template>
    <div class="d-block text-center py-3">
      <p v-if="actionType">{{ $t('preferences.profile.confirm_remove_content', { type: actionType === 'connect' ? 'connect to' : 'remove' , account: selectedAccount }) }}</p>
      <p v-if="connectionExist" class="text-bold">{{ $t('preferences.profile.remove_existing') }}</p>
    </div>
    <!-- Connect/ Remove - Cancel Button -->
    <b-button variant="social-cancel" class="rounded-pill" @click="$bvModal.hide('social-modal')"
      >{{ $t('common.cancel') }}</b-button
    >
    <b-button variant="social-action" class="rounded-pill" @click="confirmAction(actionType, selectedAccount)"
      >{{ $t(`preferences.profile.${actionType}`) }}</b-button
    >
    <!-- Connect/ Remove - Cancel Button -->
  </b-modal>
</template>

<script>
export default {
  name: 'SocialConnectModal',

  props: {
    actionType: {
      type: String,
      required: true,
    },

    selectedAccount: {
      type: String,
      required: true,
    },

    connectionExist: {
      type: Boolean,
      required: true
    }  
  },

  methods: {
    // On click event
    confirmAction(type, account){
      this.$emit('confirmation', { action: type, accountType: account })
      this.$bvModal.hide('social-modal')
    }
  },
}
</script>