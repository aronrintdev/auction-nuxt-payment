<template>
  <div class="position-relative">
    <Header v-if="! isHeaderHidden || ! isResponsive" ref="header"/>
    <div class="height-wrapper container-fluid p-0 overflow-hidden" :style="bodyMinHeight">
      <Nuxt/>
    </div>
    <ScrollToTop v-show="showScroll"/>
    <BottomNavigation class="d-flex d-md-none mt-4"/>
    <Footer ref="footer" class="d-none d-md-flex"/>

  </div>
</template>

<script>
import {mapActions} from 'vuex'
import screenSize from '~/plugins/mixins/screenSize'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import ScrollToTop from '~/components/common/ScrollToTop.vue'
import {SCROLLY} from '~/static/constants'
import BottomNavigation from '~/components/homepage/BottomNavigation.vue'
import {enquireScreenSizeHandler} from '~/utils/screenSizeHandler'

export default {
  name: 'IndexLayout',
  components: {Header, Footer, ScrollToTop, BottomNavigation},
  mixins: [screenSize],
  data() {
    return {
      showScroll: false,
      scrollY: SCROLLY,
      isHeaderHidden: false,
      bodyMinHeight: ''
    }
  },
  async fetch() {
    await this.fetchWishLists()
  },
  computed: {
    isResponsive(vm) {
      return vm.isScreenXS || vm.isScreenSM
    }
  },
  fetchOnServer: false,
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)

    enquireScreenSizeHandler((type) => {
      this.$store.commit('size/setScreenType', type)
    })
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  mounted() {
    this.$root.$on('hide-header', payload => {
      this.isHeaderHidden = payload.hideHeader
    })

    this.calculateMinHeight()

    window.addEventListener('resize', () => this.calculateMinHeight());
  },
  unmounted() {
    window.removeEventListener('resize', ()=>{});
  },
  methods: {
    ...mapActions({
      fetchWishLists: 'wish-list/fetchWishLists',
    }),
    handleScroll() {
      // Your scroll handling here
      this.showScroll = window.scrollY > this.scrollY
    },
    calculateMinHeight() {
      if (!this.isScreenXS) {
        const doc = document.body.getBoundingClientRect()
        const header = this.$refs.header.$el.getBoundingClientRect()
        const footer = this.$refs.footer.$el.getBoundingClientRect()
        const minHeight = doc.height - (header.height + footer.height)
        this.bodyMinHeight = `min-height: ${minHeight}px`
      } else {
        this.bodyMinHeight = ''
      }
    }
  },
}
</script>

<style lang="sass" scoped>
.height-wrapper
  @media (max-width: 576px)
    min-height: calc(100vh - 200px)
</style>
