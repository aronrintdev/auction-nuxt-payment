<template>
  <b-container fluid class="p-0">
    <Header class="d-none d-md-flex"/>
    <div class="wrapper">
      <Nuxt/>
    </div>
    <Footer class="d-none d-md-flex"/>
  </b-container>
</template>

<script>
import {enquireScreenSizeHandler} from '~/utils/screenSizeHandler'

export default {
  name: 'Auth',
  fetchOnServer: false,
  beforeMount() {
    enquireScreenSizeHandler((type) => {
      this.$store.commit('size/setScreenType', type)
    })
  }
}
</script>
