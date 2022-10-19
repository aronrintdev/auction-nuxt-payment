<template>
  <b-col class="vendor-preferences-body">
    <div class="vd-preferences-slider d-none d-md-block">
      <h1 class="vd-preferences-slider-heading">
        {{ $t('manage_text_message.page_title') }}
      </h1>
    </div>
    <b-container fluid>
      <b-row class="component-row">
        <!-- Content -->
        <manage-text-message-component />
        <!-- ./Content -->
      </b-row>
    </b-container>
  </b-col>
</template>

<script>
import ManageTextMessageComponent from '~/components/profile/security/ManageTextMessageComponent';

export default {
  name: 'ManageTextMessage',
  components: {
    ManageTextMessageComponent
  },
  layout: 'Profile',
  middleware: 'auth'
}
</script>
