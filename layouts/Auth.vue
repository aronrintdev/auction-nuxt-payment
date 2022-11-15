<template>
  <b-container fluid class="p-0">
    <Header v-if="!isHeaderHidden || !isResponsive" />
    <div class="wrapper">
      <Nuxt />
    </div>
    <BottomNavigation v-if="!isFooterHidden || !isResponsive" class="d-flex d-md-none" />
    <Footer class="d-none d-md-flex" />
  </b-container>
</template>

<script>
import BottomNavigation from '~/components/homepage/BottomNavigation.vue'
import screenSize from '~/plugins/mixins/screenSize'
import { enquireScreenSizeHandler } from '~/utils/screenSizeHandler'

export default {
  name: 'Auth',
  components: { BottomNavigation },
  mixins: [ screenSize ],
  data() {
    return {
      isHeaderHidden: false,
      isFooterHidden: false
    }
  },
  computed: {
    isResponsive(vm) {
      return vm.isScreenXS || vm.isScreenSM
    }
  },
  fetchOnServer: false,
  beforeMount() {
    enquireScreenSizeHandler((type) => {
      this.$store.commit('size/setScreenType', type)
    })
  },
  mounted() {
    this.$root.$on('hide-header', payload => {
      console.log(payload)
      this.isHeaderHidden = payload.hideHeader
      console.log(this.isHeaderHidden)
    })
    this.$root.$on('hide-footer', payload => {
      console.log(payload)
      this.isFooterHidden = payload.hideFooter
      console.log(this.isFooterHidden)
    })
  },
}
</script>
