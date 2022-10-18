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
  name: 'wants',
  data(){
    return {
      width:'',
    }
  },
  components: {
    wantsMobile:()=> import('./wantsMobile'),
    wantsWeb:()=>import('./wantsWeb'),
  },
  mounted() {
    this.width = window.innerWidth
  },
}
</script>
