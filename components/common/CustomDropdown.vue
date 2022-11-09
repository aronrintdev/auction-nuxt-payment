<template>
  <div
    class="custom-dropdown text-gray"
    :style="{
        'min-width': width,
        'height': dropDownHeight,
        'width': maxWidth,
        'border-radius': !isOpen ? borderRadius : borderRadiusClose,
      }"
    >
    <div
      class="label-wrapper"
      :style="inputStyleComputed"
      :class="`background-${variant} ${bordered && 'bordered'}`"
      @click="isOpen = !isOpen"
    >
      <label
        class="font-weight-light m-0 p-0"
        :style="labelStyle"
      >
        <img v-if="labelLeftImage !== null" :src="labelLeftImage" class="mr-2">
        {{label}}
      </label>
      <i
        class="pull-right mt-1 pr-1 fa fa-2x"
        :class="isOpen ? 'fa-angle-up' : 'fa-angle-down'"
        :style="arrowStyle"
      >
      </i>
    </div>
    <ul
      v-if="isOpen"
      class="custom-dropdown-options"
      :class="`${optionsWidth}-color ${bordered && 'bordered'}`"
      :style="{
        'min-width': width,
        'border-radius': isOpen ? borderRadiusOptions: '', 
        'borderBottomLeftRadius': '5px',
        'borderBottomRightRadius': '5px',
        ...dropdownStyle
      }"
    >
      <li
        v-for="(option, key) of options" :key="key"
        :class="`${optionsWidth}-color`"
        :style="optionStyle"
        @click="selectOption((option.value ? option.value : option))"
      >
        <input
          v-if="type.includes('multi')"
          class="mr-2"
          :checked="value && value.includes(option.size ? option.size : option)"
          type="checkbox"
        />
        <span>{{ (option.value) ? option.text : capitalizeFirstLetter(option) }}</span>
      </li>
      <li v-if="type.includes('multi') && showFilterBtn" class="fixed">
        <Button @click="filterResults">{{$t('common.drop_filter')}} ({{value && value.length}})</Button>
      </li>
    </ul>
  </div>
</template>

<script>
import Button from '~/components/common/Button.vue'
export default {
  name: 'CustomDropdown',
  components: {
    Button
  },
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
    labelStyle: {
      type: String,
      default: ''
    },
    paddingX: {
      type: String,
      default: ''
    },
    showFilterBtn: {
      type: Boolean,
      default: () => true
    },
    arrowStyle: {
      type: Object,
      default: () => {}
    },
    dropdownStyle: {
      type: Object,
      default: () => {}
    },
    inputStyle: {
      type: Object,
      default: () => {}
    },
    optionStyle: {
      type: Object,
      default: () => {}
    },
  },
  data() {
    return {
      isOpen: false
    };
  },
  mounted() {
    /**
     * close drop if clicked outside
     */
    window.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)){
        this.isOpen = false
      }
    })
  },
  computed: {
    inputStyleComputed() {
      let result = {
        'padding-left': this.paddingX,
        'padding-right': this.paddingX,
        'min-width': this.width,
        'height': this.dropDownHeight,
        'width': this.maxWidth,
        ...this.inputStyle
      }

      if (this.isOpen) {
        result = {
          ...result,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          borderBottomWidth: 0
        }
      }
      return result
    }
  },
  methods: {
    /***
     * This function is used to convert string first
     * letter to upper case it takes parameter string in which string
     * value is received
     * @param string
     * @returns {string}
     */
    capitalizeFirstLetter(string) {
      if(typeof string === 'string')
        return string[0].toUpperCase() + string.slice(1);
      else if(typeof string === 'object' && string.size && typeof string.size === 'string')
        return string.size[0].toUpperCase() + string.size.slice(1);
    },
    /**
     * get results on selection
     */
    filterResults() {
      this.$emit('getResults')
      this.isOpen = false
    },
    /**
     * on input change emit parent change function
     * @param selectedOption
     */
    selectOption(selectedOption) {
      this.isOpen = this.type.includes('multi')
      this.$emit('change', selectedOption)
    },
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

ul.custom-dropdown-options
  position: relative
  z-index: 100000
  padding: 0
  list-style: none
  background-color: $color-white-5
  min-width: 150px
  max-height: 160px
  overflow: auto

ul.custom-dropdown-options li
  padding: 5px 5px
  border-bottom: 1px solid $color-gray-17b
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

.label-wrapper
  display: flex
  justify-content: space-between
  align-items: center

div.label-wrapper label
  padding-left: 5px
  padding-right: 5px

.custom-color
  background: $color-white-1

.background-white
  background: $color-white-1

.bordered
  border: 1px solid $color-gray-17b

</style>
