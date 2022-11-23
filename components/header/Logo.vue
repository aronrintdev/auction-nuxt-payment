<template>
  <b-img
    :src="require('~/assets/img/home/logo-mb.png')"
    :width="width"
    :height="height"
    alt="DEADSTOCK"
    class="logo-img ds-logo"
  />
</template>
<script>
export default {
  name: 'Logo',

  props: {
    width: {
      type: [Number, String],
      default: '100%',
    },
    height: {
      type: [Number, String],
      default: 'auto',
    },
  },
}
</script>
<style lang="sass">
.logo-img
  @media (max-width: 500px)
    height: 40px !important
    width: 133px !important
</style>
