<template>
  <div>
    <div v-if="isResponsive">
      <wants-mobile></wants-mobile>
    </div>
    <div v-else>
      <wants-web></wants-web>
    </div>
  </div>
</template>

<script>
import screenSize from '~/plugins/mixins/screenSize';

export default {
  name: 'Wants',
  components: {
    wantsMobile:()=> import('./wantsMobile'),
    wantsWeb:()=>import('./wantsWeb'),
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
