<template>
  <span
    id="back-to-top"
    class="btn back-to-top position-fixed"
    role="button"
    @click="scrollToTop"
    >
    <img :src="require('~/assets/img/icons/back-to-top.svg')" alt="back-to-top" />  
  </span>
</template>

<script>
export default {
  name: 'ScrollToTop',

  methods: {
    // On scroll to top click
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 
  }
}
</script>

<style lang="sass" scoped>
.back-to-top
  bottom: 70px
  right: 16px
  @media (max-width: 576px) 
    bottom: 100px
  img
    width: 41px
    height: 41px
    left: 317px
    top: 1016px
</style>