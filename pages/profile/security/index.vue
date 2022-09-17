<template>
  <b-col class="vendor-preferences-body">
    <div class="vd-preferences-slider">
      <h1 class="vd-preferences-slider-heading">
        {{ $t('profile_menu.security_settings') }}
      </h1>
    </div>
    <b-container fluid>
      <b-row class="component-row">
        <!-- Content -->
        <SecurityComponent/>
        <!-- ./Content -->
      </b-row>
    </b-container>
  </b-col>
</template>

<script>

import SecurityComponent from '~/components/profile/security/SecurityComponent';

export default {
  name: 'SecurityIndexPage',
  components: {
    SecurityComponent
  },
  layout: 'Profile',
  middleware: 'auth'
}
</script>
