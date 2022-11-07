<template>
  <div>
    <div v-if="width<= 500">
      <wants-mobile></wants-mobile>
    </div>
    <div v-else>
      <wants-web></wants-web>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Wants',
  components: {
    wantsMobile:()=> import('./wantsMobile'),
    wantsWeb:()=>import('./wantsWeb'),
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
