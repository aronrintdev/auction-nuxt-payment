<template>
  <div v-if="steps.length!==0" class="d-flex align-items-end  position-relative">
    <div class="line"></div>

    <div v-for="(item, index) in steps" :key="item.value" class="d-flex flex-column" :class="itemClass(index)">
      <span>{{ item.label }}</span>
      <div class="d-flex align-items-center ">
        <span class="wrapper d-flex align-items-center justify-content-around">
  	        <span :class="selectedIndex>=index? 'dot': ''"></span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormStepper',
  props: {
    steps: {
      type: Array,
      default: () => []
    },
    selected: {
      type: String,
      default: ''
    }
  },
  computed: {
    selectedIndex(){
      return this.steps.findIndex( a=> a.value === this.selected)
    }
  },
  methods: {
    itemClass(index){
      const end = this.steps.length -1
      let classes = ''
      if (index === 0)
        classes+=' align-items-start '
      if (index === end)
        classes += ' align-items-end '

      if (index<end)
        classes += ' mr-4 '
      if (index> 0 && index<end)
        classes += ' align-items-center '

      return classes
    },
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'
.line
  min-width: 30px
  height: 1px
  background-color: grey
  position: absolute
  top: 72%
  width: 98%

.dot
  height: 18px
  width: 18px
  background-color: $color-blue-2
  border-radius: 50%
  display: inline-block


.wrapper
  height: 24px
  width: 24px
  background-color: $color-white-5
  border-radius: 50%
  display: inline-block
  border: 2px solid grey

</style>
