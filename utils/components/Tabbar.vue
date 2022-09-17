<template>
  <ul class="formatted-ul tabbar">
    <template v-for="(item, idx) in data">
      <li :key="idx" class="formatted-li" :class="{ active: current == item.key }" @click="onTabClicked(item.key)">
        <a class="nav-link"><span>{{ item.label }}</span></a>
      </li>
    </template>
  </ul>
</template>

<script>
/* TabBar component */
export default {
  name: 'TabBar',
  props: {
    current: {
      type: String,
      default: '',
    },
    data: {
      type: Array,
      default: () => [],
    }
  },
  methods: {
    // Tab "Change" event listener
    onTabClicked(value) {
      this.$emit('tabChange', value);
    }
  }
};
</script>
