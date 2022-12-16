<template>
  <div>
    <div v-if="isScreenXS">
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
}
</script>
