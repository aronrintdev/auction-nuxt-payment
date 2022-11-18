<template>
  <div>
    <div v-if="isResponsive">
      <confirmation-mobile></confirmation-mobile>
    </div>
    <div v-else>
      <confirmation-web></confirmation-web>
    </div>
  </div>
</template>

<script>
import screenSize from '~/plugins/mixins/screenSize';

export default {
  name: 'Create',
  components: {
    confirmationMobile:()=> import('./confirmationMobile'),
    confirmationWeb:()=>import('./confirmationWeb'),
  },
  mixins: [ screenSize ],
  layout: 'Profile', // Layout
  middleware: 'auth',
  computed:{
    isResponsive() {
      return this.isScreenXS || this.isScreenSM
    },
  }
}
</script>
