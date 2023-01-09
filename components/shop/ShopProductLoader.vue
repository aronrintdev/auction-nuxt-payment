<template>
  <div class="flex-column justify-content-center align-items-center">
    <img
    class="animation_shake"
      :src="require('~/assets/img/deadstockogo.png')"
      alt="AdminLTELogo"
      height="60"
      width="60"
    />
  </div>
</template>
<script>
export default {
  name: 'ShopProductLoader',
}
</script>
<style lang="scss" scoped>
.animation_shake {
  -webkit-animation: horizontal-shaking 0.5s;
  animation: horizontal-shaking 0.5s;

/* When the animation is finished, start again */
animation-iteration-count: infinite;
}
@keyframes horizontal-shaking {
 0% { transform: translateX(0) }
 25% { transform: translateX(5px) }
 50% { transform: translateX(-5px) }
 75% { transform: translateX(5px) }
 100% { transform: translateX(0) }
}
</style>
