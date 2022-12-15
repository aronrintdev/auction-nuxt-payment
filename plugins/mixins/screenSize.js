import {mapGetters} from 'vuex';
import { SCREEN_SIZE } from '~/utils/screenSizeHandler';

export default {
  computed: {
    ...mapGetters({
      screenSize: 'size/getWindowWidth',
      screenSizeType: 'size/getScreenType'
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
      return this.screenSizeType === SCREEN_SIZE.XS
    },
    isScreenSM() {
      return this.screenSizeType === SCREEN_SIZE.SM
    },
    isScreenMD() {
      return this.screenSizeType === SCREEN_SIZE.MD
    },
    isScreenLG() {
      return this.screenSizeType === SCREEN_SIZE.LG
    },
    isScreenXL() {
      return this.screenSizeType === SCREEN_SIZE.XL
    },
    mobileClass() {
      return this.isScreenXS ? ' mobile ' : ''
    },
    screenIsSmallThanLG() {
      return this.isScreenXS || this.isScreenSM || this.isScreenMD
    }
  },
}
