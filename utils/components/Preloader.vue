<template>
  <transition name="fade">
    <div class="preloader flex-column justify-content-center align-items-center">
      <img
        class="animation__shake"
        :src="require('~/assets/img/deadstockogo.png')"
        alt="AdminLTELogo"
        height="60"
        width="60"
      />
    </div>
  </transition>
</template>
<script>
export default {
  name: 'Preloader',
};
</script>
