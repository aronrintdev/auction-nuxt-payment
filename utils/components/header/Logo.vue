<template>
  <b-img
    :src="require('~/assets/img/home/logo-mb.png')"
    :width="width"
    :height="height"
    alt="DEADSTOCK"
    class="logo-img"
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
      default: '100%',
    },
  },
}
</script>
