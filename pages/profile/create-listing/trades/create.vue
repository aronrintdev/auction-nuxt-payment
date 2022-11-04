<template>
  <div>
    <div v-if="width<= 500">
      <create-mobile></create-mobile>
    </div>
    <div v-else>
      <create-web></create-web>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Create',
  components: {
    createMobile:()=> import('./createMobile'),
    createWeb:()=>import('./createWeb'),
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
