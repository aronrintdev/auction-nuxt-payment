<template>
  <div>
    <div :class="{
      'text-black font-primary body-5-regular': !isScreenXS,
      'mb-2': showFull,
      'mb-5': !showFull
    }" class="d-none d-md-block desc-text">
      <p v-if="showFull">
        <span v-html="full"></span>
        <span class="cursor-pointer link" @click="toggle">{{ $t('common.read_less') }}</span>
      </p>
      <p v-else>
        <span v-html="short"></span>
        <span class="cursor-pointer link" @click="toggle">{{ $t('common.read_more') }}</span>
      </p>
    </div>
    <p class="d-block d-md-none">
      <span v-html="short"></span>
      <span class="cursor-pointer link" @click="toggle">{{ $t('common.read_more') }}</span>
    </p>
    <div class="d-block d-md-none">
      <vue-bottom-sheet ref="readMore" max-height="70%" :is-full-screen="true">
        <div>
          <div class="p-4">
            <span v-html="$t('features.2fa_security.as_part_of_our_mission')"></span>
          </div>
          <div class="text-center">
            <span class="cursor-pointer go-back" @click="toggle">{{ $t('common.go_back') }}</span>
          </div>
        </div>
      </vue-bottom-sheet>
    </div>
  </div>
</template>

<script>
import screenSize from '~/plugins/mixins/screenSize';

export default {
  name: 'ReadMore',
  mixins: [screenSize],
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      short: '',
      full: '',
      showFull: false
    }
  },
  mounted() {
    this.divide()
  },
  methods: {
    divide() {
      this.full = this.content.toString()
      const firstBreakPosition = this.full.search('<br')
      this.short = this.full.substring(0, firstBreakPosition)
    },
    toggle() {
      this.showFull = !this.showFull
      if (this.showFull) {
        this.$refs.readMore.open()
      } else {
        this.$refs.readMore.close()
      }
    }
  }
}
</script>
<style scoped lang="sass">
@import '~/assets/css/_variables'

.link
  color: $color-blue-30

.go-back
  color: $color-blue-20
</style>
