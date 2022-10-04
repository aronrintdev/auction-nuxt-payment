<template>
  <div class="filter-group">
    <div class="d-flex align-items-center justify-content-between filter-group-main" :class="{ 'collapsed': isCollapsed }" @click="toggleDetails" >
      <span class="filter-group-title">{{ title }}</span>
      <span class="flex-grow-1 text-right filter-group-values">{{ labelsOfSelected }}</span>
      <img src="~/assets/img/icons/arrow-down-black.svg" role="button"/>
    </div>
    <div v-if="!isCollapsed" class="d-flex filter-group-body">
      <div
        v-for="(option, index) in options"
        :key="`${name}-${index}`"
        class="btn"
        :class="{ 'active': selectedValues.includes(option.value) }"
        @click="toggleSelect(option.value)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script>
/*
 * Auction Mobile Filter Group
 */
export default {
  name: 'AuctionMobileFilterGroup',
  props: {
    options: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    selectedValues: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean, 
      default: false,
    }
  },
  data() {
    return {
      isCollapsed: true,
    }
  },
  computed: {
    labelsOfSelected() {
      const selected = this.options.filter(option => this.selectedValues.includes(option.value))
      return selected.map(item => item.label).join(', ')
    }
  },
  methods: {
    toggleDetails() {
      this.isCollapsed = !this.isCollapsed
    },
    toggleSelect(value) {
      const values = this.multiple ? [...this.selectedValues] : []
      const idx = values.findIndex(item => item === value)
      if (idx > -1) {
        values.splice(idx, 1)
      } else {
        values.push(value)
      }
      this.$emit('change', values)
    }
  }
}
</script>

<style lang="sass" scoped>
  @import '~/assets/css/_variables'

  .filter-group
    border-bottom: 1px solid $color-gray-62
    &-title
      font-weight: $medium
      font-size: 16px
      line-height: 19px
      color: $color-blue-20
      font-family: $font-sp-pro
    &-values
      margin-right: 20px
      text-transform: capitalize
      font-weight: $normal
      font-size: 16px
      line-height: 19px
      font-family: $font-sp-pro
      color: $black
    &-main
      padding: 20px 0
      img
        width: 16px
        transition: transform 0.3s ease
      &.collapsed
        img
          transform: rotate(180deg)
    &-body
      flex-wrap: wrap
      justify-content: flex-start
      margin: 0 -10px
      padding-bottom: 20px
      .btn
        font-family: $font-sp-pro
        font-weight: $normal
        font-size: 14px
        line-height: 17px
        color: $color-gray-4
        border: 1px solid $color-gray-4
        border-radius: 3px
        margin: 8px 10px
        width: calc(33.3% - 20px)
        text-transform: capitalize
        height: 45px
        display: flex
        align-items: center
        justify-content: center
        &.active
          background: $color-gray-21
          color: $black
          border-color: $black

</style>