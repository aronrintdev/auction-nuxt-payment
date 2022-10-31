<template>
  <div>
    <div v-if="width<= 500">
      <draft-mobile></draft-mobile>
    </div>
    <div v-else>
      <draft-web></draft-web>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Draft',
  components: {
    draftMobile:()=> import('./draftsMobile'),
    draftWeb:()=>import('./draftsWeb'),
  },
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
