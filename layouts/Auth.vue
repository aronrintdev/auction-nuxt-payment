<template>
  <b-container fluid class="p-0">
    <Header />
    <div class="wrapper">
      <Nuxt />
    </div>
    <BottomNavigation class="d-flex d-md-none" />
    <Footer class="d-none d-md-flex" />
  </b-container>
</template>

<script>
import BottomNavigation from '~/components/homepage/BottomNavigation.vue'
export default {
  name: 'Auth',
  components: { BottomNavigation },
}
</script>
