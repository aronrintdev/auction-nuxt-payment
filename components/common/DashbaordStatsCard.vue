<template>
  <div class="bg-white br-10 px-4 py-3 shadow-sm mb-2 mb-md-0">
    <img :src="icon" aria-hidden="true" class="mb-3" />
    <h4 class="fw-5 fs-15 mb-0 text-secondary font-primary">{{ title }}</h4>
    <h3 class="fw-7 fs-24 mb-0 font-primary">{{ value }}</h3>
  </div>
</template>
<script>
export default {
  name: 'DashboardStatsCard',
  props: {
    icon: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    value: {
      type: String,
      default: null,
    },
  },
}
</script>
