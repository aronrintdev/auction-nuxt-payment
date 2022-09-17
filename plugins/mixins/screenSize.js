import {mapGetters} from 'vuex';

export default {
  computed: {
    ...mapGetters({
      screenSize: 'size/getWindowWidth'
    }),
    isScreenXS() {
      return this.screenSize < 576
    },
    isScreenSM() {
      return this.screenSize >= 576 && this.screenSize < 768
    },
    isScreenMD() {
      return this.screenSize >= 768 && this.screenSize < 992
    },
    isScreenLG() {
      return this.screenSize >= 992 && this.screenSize < 1200
    },
    isScreenXL() {
      return this.screenSize >= 1200
    },
    mobileClass() {
      return this.isScreenXS ? ' mobile ' : ''
    }
  },
}
