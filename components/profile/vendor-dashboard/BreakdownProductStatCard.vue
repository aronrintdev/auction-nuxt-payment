<template>
  <div class="stat-card d-flex align-items-center justify-content-between">
    <div class="body-4-medium font-primary text-black">
      <div>
        {{label}}
      </div>
      <div class="text-gray-simple">
        {{subLabel}}
      </div>
    </div>

    <div class="body-4-medium font-primary" :style="{
      'color': valueColor
    }">
      {{value}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'BreakdownProductStatCard',
  props: {
    value: {
      type: [Number, String],
      required: true
    },
    label: {
      type: String,
      required: true
    },
    subLabel: {
      type: String,
      default: ''
    },
    valueColor: {
      type: String,
      default: '#4B942D'
    }
  }
}
</script>

<style scoped lang="sass">
@import "~/assets/css/variables"
.stat-card
  background-color: $color-white-1
  border-radius: 10px
  padding: 24px 26px

</style>
