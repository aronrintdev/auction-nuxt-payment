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
  data(){
    return {
      width:'',
    }
  },
  components: {
    confirmationMobile:()=> import('./confirmationMobile'),
    confirmationWeb:()=>import('./confirmationWeb'),
  },
  mounted() {
    this.width = window.innerWidth
  },
}
</script>
