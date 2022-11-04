<template>
  <div>
    <div v-if="width<= 500">
      <confirmation-mobile></confirmation-mobile>
    </div>
    <div v-else>
      <confirmation-web></confirmation-web>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Create',
  components: {
    confirmationMobile:()=> import('./confirmationMobile'),
    confirmationWeb:()=>import('./confirmationWeb'),
  },
  layout: 'Profile', // Layout
  middleware: 'auth',
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
