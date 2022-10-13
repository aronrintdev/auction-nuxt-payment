import {mapGetters} from 'vuex';
import { SCREEN_SIZE } from '~/utils/screenSizeHandler';

export default {
  computed: {
    ...mapGetters({
      screenSize: 'size/getWindowWidth',
      type: 'size/getScreenType'
    }),
    /*
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
    */
    isScreenXS() {
      return this.type === SCREEN_SIZE.XS
    },
    isScreenSM() {
      return this.type === SCREEN_SIZE.SM
    },
    isScreenMD() {
      return this.type === SCREEN_SIZE.MD
    },
    isScreenLG() {
      return this.type === SCREEN_SIZE.LG
    },
    isScreenXL() {
      return this.type === SCREEN_SIZE.XL
    },
    mobileClass() {
      return this.isScreenXS ? ' mobile ' : ''
    },
    screenIsSmallThanLG() {
      return this.isScreenXS || this.isScreenSM || this.isScreenMD
    }
  },
}
