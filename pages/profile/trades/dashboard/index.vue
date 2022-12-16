<template>
  <div>
    <div v-if="isScreenXS" class="pt-5 pb-5">
      <dashboard-mobile></dashboard-mobile>
    </div>
    <div v-else>
      <dashboard-web></dashboard-web>
    </div>
  </div>
</template>

<script>
import screenSize from '~/plugins/mixins/screenSize';

export default {
  name: 'Create',
  components: {
    dashboardMobile:()=> import('./dashboardMobile'),
    dashboardWeb:()=>import('./dashboardWeb'),
  },
  mixins: [screenSize],
  layout: 'Profile',
}
</script>
