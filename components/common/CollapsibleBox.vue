<template>
  <div class="collapsible-box">
    <div class="d-flex cursor-pointer justify-content-between align-items-center py-1" @click="toggleCollapse">
      <div class="title text-bold mr-2">{{ title }}</div>
      <div class="d-flex justify-content-end align-items-center flex-nowrap">
        <div v-if="secondTitle" class="mr-1 overflow-hidden">{{secondTitle}}</div>
        <img :class="collapseStatus" :src="require('~/assets/img/icons/arrow-down-black.svg')"/>
      </div>
    </div>
    <div v-if="! collapsed">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CollapsibleBox',
  props: {
    title: {
      type: String,
      default: ''
    },
    secondTitle:{
      type: String,
      default: ''
    }
  },
  data() {
    return {
      collapsed: true
    }
  },
  computed: {
    collapseStatus() {
      return this.collapsed ? 'close' : 'open'
    }
  },
  methods:{
    toggleCollapse(){
      this.collapsed = !this.collapsed
      this.$emit('change', this.collapseStatus)
    }
  }
}
</script>

<style scoped lang="sass">
@import '/assets/css/variables'

.title
  color: $color-blue-20
  @include body-13

.collapsible-box img.close
  transform: rotate(0deg)

.collapsible-box img.open
  transform: rotate(180deg)
</style>
