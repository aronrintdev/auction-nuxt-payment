<template>
  <div>
    <div v-if="width<= 500" class="pt-5 pb-5">
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
  components: {
    dashboardMobile:()=> import('./dashboardMobile'),
    dashboardWeb:()=>import('./dashboardWeb'),
  },
  layout: 'Profile',
  data(){
    return {
      width:'',
    }
  },
  mounted() {
    this.width = window.innerWidth
  },
}
</script>
