<template>
  <div class="position-relative">
    <Header />
    <div class="height-wrapper container-fluid p-0">
      <Nuxt />
    </div>
    <ScrollToTop v-show="showScroll" />
    <BottomNavigation class="d-flex d-md-none mt-4" />
    <Footer class="d-none d-md-flex" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import ScrollToTop from '~/components/common/ScrollToTop.vue'
import { SCROLLY } from '~/static/constants'
import BottomNavigation from '~/components/homepage/BottomNavigation.vue'
export default {
  name: 'IndexLayout',
  components: { Header, Footer, ScrollToTop, BottomNavigation },
  data() {
    return {
      showScroll: false,
      scrollY: SCROLLY,
    }
  },
  async fetch() {
    await this.fetchWishLists()
  },
  fetchOnServer: false,
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    ...mapActions({
      fetchWishLists: 'wish-list/fetchWishLists',
    }),
    handleScroll() {
      // Your scroll handling here
      this.showScroll = window.scrollY > this.scrollY
    },
  },
}
</script>
<style lang="sass" scoped>
.height-wrapper
    @media (max-width: 576px)
      min-height: calc(100vh - 200px)
</style>
