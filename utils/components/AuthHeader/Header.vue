<template>
  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <NuxtLink class="navbar-brand h-logo loginlogo mx-auto" to="/">
      <img :src="require('~/assets/img/Deadstock_Black_2.png')" alt="Deadstock_Black" />
    </NuxtLink>
  </nav>
  <!-- ./Navbar -->
</template>
<script>
export default {
  name: 'Header',
};
</script>