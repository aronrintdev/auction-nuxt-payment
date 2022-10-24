<template>
  <div>
    <object 
      :is="single? 'b-form-radio-group': 'b-form-checkbox-group'"
      v-model="selected"
      :options="options"
      :button-variant="`d-custom d-flex justify-content-center align-items-center ml-2 mt-1 ${itemClass}`"
      buttons
      class="custom-button-multi w-100 row text-capitalize"
      :style="contentStyle"
      @change="emitChanges"
    >
      <template #first>
        <object
          :is="single? 'b-form-radio': 'b-form-checkbox'"
          v-if="all"
          v-model="selected"
          :value="'all'"
          :button-variant="`d-custom d-flex justify-content-center align-items-center ml-2 mt-1 ${itemClass}`"
          buttons
          @change="allChanged"
        >
          {{ $t('notifications.all') }}
        </object>
      </template>
    </object>
  </div>
</template>

<script>
export default {
  name: 'ButtonSelector',
  props: {
    values: {
      type: [Array, String, null],
      default: null
    },
    options: {
      type: Array,
      required: true
    },
    all: {
      type: Boolean,
      required: false
    },
    single: {
      type: Boolean,
      required: false
    },
    contentStyle: {
      type: Object,
      default: () => {}
    },
    itemClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      selected: [],
    }
  },
  watch: {
    values(val) {
      if (val !== this.selected)
        this.selected = val
    }
  },
  methods: {
    allChanged(all) {
      if (!this.single) {
        if (all.includes('all')) {
          this.selected.push(...this.options.map(a => a.value))
        } else {
          this.selected = []
        }
      }
    },
    emitChanges(e) {
      console.log('emitChanges', e)
      this.$emit('change', e)
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~/assets/css/variables"




::v-deep.custom-button-multi
  .active
    border: 1px solid $color-black-1 !important
    color: $color-black-1 !important
    background-color: $color-gray-21 !important

  .btn-d-custom
    @include body-5
    height: 45px !important
    width: 100px !important
    min-width: 100px !important
    max-width: 100px !important
    border: 1px solid $color-gray-4
    font-family: $font-family-sf-pro-display
    font-style: normal
    font-weight: $normal
    color: $color-gray-4
    border-radius: 3px !important

  .size-45
    min-width: 45px !important
    max-width: 45px !important
  .size-42
    min-width: 42px !important
    max-width: 42px !important

</style>
