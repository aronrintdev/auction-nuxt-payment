<template>
  <b-col class="vendor-preferences-body">
    <div class="vd-preferences-slider">
      <h1 class="vd-preferences-slider-heading">
        {{ $t('2fa_faqs.page_title') }}
      </h1>
    </div>
    <b-container fluid>
      <b-row class="component-row">
        <!-- Content -->
        <SecurityFaqComponent/>
        <!-- ./Content -->
      </b-row>
    </b-container>
  </b-col>
</template>

<script>

import SecurityFaqComponent from '~/components/profile/security/SecurityFaqComponent';

export default {
  name: 'SecurityFaqPage',
  components: {
    SecurityFaqComponent
  },
  layout: 'Profile',
  middleware: 'auth'
}
</script>
