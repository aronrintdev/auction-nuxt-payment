<template>
  <div>
    <div v-if="width<= 500">
      <dashboard-mobile></dashboard-mobile>
    </div>
    <div v-else>
      <dashboard-web></dashboard-web>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Create',
  data(){
    return {
      width:'',
    }
  },
  layout: 'Profile',
  components: {
    dashboardMobile:()=> import('./dashboardMobile'),
    dashboardWeb:()=>import('./dashboardWeb'),
  },
  mounted() {
    this.width = window.innerWidth
  },
}
</script>
