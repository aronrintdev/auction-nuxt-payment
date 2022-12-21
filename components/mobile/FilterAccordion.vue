<template>
  <div>
    <div
      class="d-flex align-items-center justify-content-between"
      :class="titleSectionClass"
      role="button"
      @click="shown = !shown"
    >
      <span class="title">
        {{ title }}
      </span>

      <div v-if="collapsable" class="col-5 px-0 d-flex justify-content-between align-items-center">
        <span class="value text-truncate">{{ data }}</span>
        <arrow-down-black :class="{'reverse': shown}" />
      </div>
    </div>
    <b-collapse v-model="shown" accordion="filter-accordion">
      <slot>

      </slot>
    </b-collapse>
  </div>
</template>

<script>
import arrowDownBlack from '~/assets/img/icons/arrow-down-black.svg?inline'
export default {
  name: 'FilterAccordion',
  components: {arrowDownBlack},
  props: {
    accordionGroup: {
      type: String,
      default: 'filter-accordion'  // this should be set if you want accordion like behaviour
    },
    title: {
      type: String,
      default: 'filter-accordion'  // this should be set if you want accordion like behaviour
    },
    open: {
      type: Boolean,
      default: false
    },
    data: {
      type: String,
      default: ''
    },
    collapsable: {
      type: Boolean,
      default: true
    },
    titleSectionClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      shown: false
    }
  },
  mounted() {
    this.shown = this.open
  }
}
</script>

<style lang="sass" scoped>
@import "~/assets/css/variables"

.value
  @include body-4
  color: $color-black-1
  font-family: $font-family-sf-pro-display
  font-weight: $normal
  margin-right: 14px

.title
  @include body-13
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $medium
  color: $color-blue-20
.reverse
  animation-duration: 0.5s
  transform: rotate(180deg)
</style>
