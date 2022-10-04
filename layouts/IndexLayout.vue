<template>
  <div class="position-relative">
    <Header />
    <div class="container-fluid p-0">
      <Nuxt />
    </div>
    <BottomNavigation class="d-flex d-md-none" />
    <Footer class="d-none d-md-flex" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import BottomNavigation from '~/components/homepage/BottomNavigation.vue'
export default {
  name: 'IndexLayout',
  components: { Header, Footer, BottomNavigation },
  async fetch() {
    await this.fetchWishLists()
  },
  fetchOnServer: false,
  methods: {
    ...mapActions({
      fetchWishLists: 'wish-list/fetchWishLists',
    }),
  },
}
</script>
