<template>
  <b-col cols="12">
    <!-- Parent Component for Preferences -->
    <b-row class="mt-md-4 mt-4">
      <profile-component v-if="activeNav === 'profile'" />
      <payment-component v-else />
    </b-row>
  </b-col>
</template>
<script>
import PaymentComponent from './PaymentComponent.vue'
import ProfileComponent from './ProfileComponent.vue'

export default {
  name: 'PreferenceComponent',

  components: {
    ProfileComponent,
    PaymentComponent,
  },

  props: {
    activeNav: {
      type: String,
      default: '',
    },
  },
}
</script>
