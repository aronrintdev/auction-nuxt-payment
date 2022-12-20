<template>
  <div class="d-flex align-items-center deadstock-radio">
    <label
      :for="`radio-${uniqueKey}-${val}`"
      class="font-secondary fw-5 fs-14 text-dark mb-0 d-flex align-items-center w-100 cursor-pointer"
      :class="{ radioButton: button, 'list-type': list }"
    >
      <input
        :id="`radio-${uniqueKey}-${val}`"
        v-model="model"
        type="radio"
        class="mr-2"
        :value="val"
        :checked="isChecked"
        :name="name"
        :style="`--accent-color: ${color}`"
        @change="handleInput"
      />
      <div
        class="radio-title w-100 text-capitalize"
        :class="{ checked: isChecked }"
      >
        <div class="size-block">
          {{ size }}
        </div>
        <template v-if="price">
          <div class="box-condition color-black-15">( {{ boxCondition }} )</div>
          <div class="size-price ml-auto">{{ price | toRoundedCurrency }}</div>
        </template>
        <template v-else>
          <div class="box-condition color-black-15">
            - {{ $t('createlisting.out_of_stock') }} -
          </div>
          <div
            class="size-price color-blue-2 ml-auto"
            @click="$emit('notify-me')"
          >
            {{ $t('products.notify_me') }}
          </div>
        </template>
      </div>
    </label>
  </div>
</template>
<script>
export default {
  name: 'Radio',
  model: {
    prop: 'modelValue',
    event: 'change',
  },
  props: {
    size: {
      type: [String, Number],
      default: null,
    },
    price: {
      type: [String, Number],
      default: null,
    },
    boxCondition: {
      type: String,
      default: null,
    },
    modelValue: {
      type: String,
      default: '',
    },
    value: {
      type: Array,
      default() {
        return []
      },
    },
    val: {
      type: [String, Number],
      default: undefined,
    },
    color: {
      type: String,
      default: '#000',
    },
    button: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Boolean,
      default: true,
    },
    name: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      uniqueKey: null,
    }
  },
  computed: {
    isChecked() {
      return this.modelValue === this.val
    },
  },
  mounted() {
    this.uniqueKey = Math.random().toString(36).substring(2)
  },
  methods: {
    handleInput(value) {
      this.$emit('change', value.target.value)
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.color-black-15
    color: $color-black-15
.color-blue-2
    color: $color-blue-2
input[type="radio"]
  width: 15px
  height: 15px
  accent-color: var(--accent-color)
.list-type
  .radio-title
    border: 0
    border-bottom: 1px solid $color-gray-62
    border-radius: 0
    color: $color-black-1
    padding: 10px 0
    font-size: 14px
    font-weight: 400
    display: flex
    &:active
      background-color: $color-gray-21
      color: $color-white-1
    .checkedIcon
      display: none
  input
    display: none
    &:checked~.radio-title
        background: $color-blue-20
        color: $color-white-1
        div
            color: $color-white-1
.size-block
    width: 110px
</style>
