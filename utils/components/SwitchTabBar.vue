<template>
  <ul class="formatted_ul something switch-tab-bar">
    <li
      v-for="tab in tabs"
      :key="tab.id"
      class="formatted_li"
      :class="{ active: current == tab.id }"
      @click="onTabClicked(tab.id)"
    >
      <a class="nav-link"
        ><span>{{ tab.label }}</span></a
      >
    </li>
  </ul>
</template>

<script>
export default {
  name: 'SwitchTabBar',
  props: {
    current: {
      type: String,
      default: '',
    },
    tabs: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    // Emit Tab Change Event
    onTabClicked(value) {
      this.$emit('change', value)
    },
  },
}
</script>
