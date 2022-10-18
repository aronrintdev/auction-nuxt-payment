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
  data(){
    return {
      width:'',
    }
  },
  components: {
    createMobile:()=> import('./createMobile'),
    createWeb:()=>import('./createWeb'),
  },
  mounted() {
    this.width = window.innerWidth
  },
}
</script>
