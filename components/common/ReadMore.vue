<template>
  <p>
    <template v-if="showFull">
      <span v-html="full"></span>
      <span class="cursor-pointer link" @click="toggle">{{ $t('common.read_less') }}</span>
    </template>
    <template v-else>
      <span v-html="short"></span>
      <span class="cursor-pointer link" @click="toggle">{{ $t('common.read_more') }}</span>
    </template>
  </p>
</template>

<script>
export default {
  name: 'ReadMore',
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
    }
  }
}
</script>
<style scoped lang="sass">
@import '~/assets/css/_variables'
.link
  color: $color-blue-30
</style>
