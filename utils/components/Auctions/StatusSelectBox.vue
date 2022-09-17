<template>
  <div class="status-select-box" tabindex="-1" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      <img :src="require('~/assets/img/icons/three-lines.svg')" class="icon-three-lines">
      <span>{{ selected.label }}</span>
      <img :src="require('~/assets/img/icons/grey-down-arrow.svg')" class="icon-down-arrow">
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="onSelect(option)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    value: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      selected: this.value
        ? this.value
        : this.options.length > 0
        ? this.options[0]
        : null,
      open: false,
    };
  },
  watch: {
    value(newV) {
      this.selected = newV;
      this.open = false;
    }
  },
  methods: {
    // Select a status
    onSelect(option) {
      this.selected = option;
      this.open = false;
      this.$emit('change', option);
    }
  }
};
</script>
