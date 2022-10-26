<template>
  <div class="custom-dropdown text-gray" :style="{'min-width': width, 'height': dropDownHeight, 'width': maxWidth,'border-radius': !isOpen ? borderRadius : borderRadiusClose}">
    <div class="label-wrapper" :style="{'min-width': width, 'height': dropDownHeight, 'width': maxWidth, 'border-radius': !isOpen ? borderRadius : borderRadiusClose}" :class="`background-${variant} ${bordered && 'bordered'}`" @click="isOpen = !isOpen">
      <label class="font-weight-light">
        <img v-if="labelLeftImage !== null" :src="labelLeftImage" class="mr-2">
        {{label}}
      </label>
      <i class="pull-right  pr-1 fa fa-2x" :class="isOpen ? 'fa-angle-up' : 'fa-angle-down'"></i>
    </div>
    <ul v-if="isOpen"  class="custom-dropdown-options position-absolute pa-0 overflow-auto" :class="`${optionsWidth}-color ${bordered && 'bordered'}`" :style="{'min-width': width,'border-radius': isOpen ? borderRadiusOptions: ''}"
    >
      <li
        v-for="(option, key) of listOptions" :key="key"
        :class="`${optionsWidth}-color ${combinationId && 'pointer-event-none'}`"
        class="d-flex justify-content-between"
        @click="selectOption((option.value ? option.value : option))"
      >
        <span>{{ (option.value) ? option.text : option }}</span>
        <input class="mr-2" :checked="value.includes(option.value)" type="checkbox"  />
      </li>
      <li
        v-if="type.includes('multi')"
        class="fixed"
        :class="`${combinationId && 'pointer-event-none'}`"
      >
        <span @click="addCombination()">{{$t('trades.wants_listing.create_combination', {count: ''})}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'SelectListDropDown',
  props: {
    value: {
      type: [String, Array],
      required: false,
      default: null,
    },
    label: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    labelLeftImage: {
      type: String,
      required: false,
      default: null
    },
    optionsWidth: {
      type: String,
      default: 'default',
    },
    width: {
      default: 'unset', // can be any value for min-width css style property
      type: String,
    },
    dropDownHeight: {
      default: 'unset', // can be any value for height css style property
      type: String,
    },
    variant: {
      default: null, // can be any value for background color
      type: String,
    },
    maxWidth: {
      default: 'unset', // can be any value for background color
      type: String,
    },
    borderRadius: {
      default: 'unset', // can be any value or border-radius
      type: String,
    },
    borderRadiusClose: {
      default: 'unset', // can be any value or border-radius
      type: String,
    },
    borderRadiusOptions: {
      default: 'unset', // can be any value or border-radius
      type: String,
    },
    bordered: {
      type: Boolean,
      default: true,
    },
    itemId: {
      type: Number,
      default: () => null,
    },
    combinationId: {
      type: Number,
      default: () => null,
    },
  },
  data() {
    return {
      isOpen: false,
      listOptions: [
        { text: this.$t('trades.wants_listing.general_wants'), value: 'general_wants' }
      ],
      lastCombinationId: 0,
    };
  },
  computed:{
    ...mapGetters({
      getCombinationsId: 'trade/getCombinationsId'
    })
  },
  mounted(){
    window.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)){
        this.isOpen = false
      }
    })
    this.combinationOptions();
    this.setOptions()
  },
  methods: {
    setOptions(){
      if(this.itemId && !this.combinationId){
        // eslint-disable-next-line vue/no-mutating-props
        this.value.push('general_wants')
      }
      else if(this.combinationId){
        // eslint-disable-next-line vue/no-mutating-props
        this.value.push(`combination_item ${this.combinationId}`)
      }
    },
    combinationOptions(){
      this.getCombinationsId.forEach((item)=>{
        this.listOptions.push({
          text: this.$t('trades.wants_listing.create_combination', {count: item}),
          value: item
        })
        this.lastCombinationId = item
      })
    },
    filterResults() {
      this.$emit('getResults')
      this.isOpen = false
    },
    selectOption(selectedOption) {
      this.isOpen = this.type.includes('multi')
      this.$emit('change', selectedOption)
    },
    addCombination() {
      this.lastCombinationId += 1
      this.listOptions.push({
        text: this.$t('trades.wants_listing.create_combination', {count: this.lastCombinationId}),
        value: 'new'
      })
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

ul.custom-dropdown-options
  position: absolute
  z-index: 100000
  padding: 0
  list-style: none
  background-color: $color-white-5
  min-width: 150px
  max-height: 160px
  overflow: auto

ul.custom-dropdown-options li
  padding: 5px 5px
  border-top: 1px solid $color-gray-17b
  cursor: pointer

ul.custom-dropdown-options li:last-of-type
  border-bottom: none

ul.custom-dropdown-options li.fixed
  position: -webkit-sticky
  position: sticky
  bottom: 0
  background-color: $color-white-5
  width: 100%
  z-index: 100000

ul.custom-dropdown-options li.fixed button
  text-align: center
  width: 100%
  background-color: $color-blue-2


div.label-wrapper label
  padding: 5px 5px 0 5px

.custom-color
  background: $color-white-1

.background-white
  background: $color-white-1

.bordered
  border: 1px solid $color-gray-17b

.pointer-event-none
  pointer-events: none
</style>
