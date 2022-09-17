<template>
  <div >
    <b-dropdown class="multi-button py-0 " variant="link" no-caret @show="open = true" @hidden="open = false">
      <template #button-content>
       <div class="button-text d-flex justify-content-between align-items-center ">
         <span class="mr-2">
          {{$t('bids.auto_bid_on_off')}}
        </span>
         <span>
          <ArrowDown class="button-icon close-icon" :class="open? 'open-icon': 'close-icon'"/>
        </span>
       </div>
      </template>
     <template #default>
       <div
         v-for="item in options"
         :key="`dropdown-item-${item.value}`"
         class="dropdown-menu-item px-2 py-1 d-flex align-items-center"
         :class="`${item.value === value && 'active'}`"
         role="button"
         @click="onSelect(item)"
       >
         <b-form-checkbox
           v-model="status"
           class="dropdown-menu-item-checkbox d-flex align-items-center "
         >
         </b-form-checkbox>
         <span>
           {{item.text}}
         </span>
       </div>
     </template>
    </b-dropdown>
  </div>
</template>

<script>
import ArrowDown from '~/assets/img/icons/arrow-down-black.svg?inline'
/**
 * Work In Progress, DO NOT USE IT!!
*/
export default {
  name: 'CustomMultiCheckboxDropdown',
  components: {ArrowDown},
  props:{
    options: {
      type: Array,
      required: true
    }
  },
  data(){
    return {
      open:false
    }
  },
  methods: {
    onButtonClick(){
      this.open = !this.open
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

:deep(.dropdown-menu-item:not(:last-child))
  border-bottom: 1px solid $color-gray-60

:deep(.dropdown-menu-item-checkbox)
  @include body-5
  font-weight: $regular
  color: $color-gray-5
  transform: scale(0.9)

:deep(.multi-button)
  ul.show
    width: 101%
    box-shadow: none
    border-top-left-radius: 0
    border-top-right-radius: 0
    left: -1px !important
    top: -4px !important
    padding-block: 4px

    hr
      margin-top: 0 !important
      margin-bottom: 0 !important

.multi-button
  &.dropdown-menu
    width: 100% !important

.close-icon
  transform: rotate(0)
  transition: 1s

.open-icon
  transition: 1s
  transform: rotate(180deg)

.button-text
  @include body-5
  font-weight: $regular
  color: $color-gray-5

.multi-button
  border-radius: 4px
  border: 1px solid $color-gray-60
  background-color: white

</style>
