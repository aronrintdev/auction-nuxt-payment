<template>
  <div>
    <div v-if="isResponsive">
      <create-mobile></create-mobile>
    </div>
    <div v-else>
      <create-web></create-web>
    </div>
  </div>
</template>

<script>
import screenSize from '~/plugins/mixins/screenSize';

export default {
  name: 'Create',
  components: {
    createMobile:()=> import('./createMobile'),
    createWeb:()=>import('./createWeb'),
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
