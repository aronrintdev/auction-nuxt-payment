<template>
  <div>
    <div v-if="width<= 500">
      <index-mobile></index-mobile>
    </div>
    <div v-else>
      <index-web></index-web>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data(){
    return {
      width:'',
    }
  },
  components: {
    indexMobile:()=> import('./indexMobile'),
    indexWeb:()=>import('./indexWeb'),
  },
  mounted() {
    this.width = window.innerWidth
  },
}
</script>
