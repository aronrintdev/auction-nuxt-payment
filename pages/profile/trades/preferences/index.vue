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
  name: 'Create',
  components: {
    indexMobile:()=> import('./indexMobile'),
    indexWeb:()=>import('./indexWeb'),
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
