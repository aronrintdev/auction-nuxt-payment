
<template>
    <svg
      width="40"
      height="40"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="0.75"
        y1="3.08594"
        x2="19.25"
        y2="3.08594"
        stroke-width="1.5"
        stroke-linecap="round"
        class="lineColor"
      />
      <line
        x1="0.75"
        y1="10.4141"
        x2="19.25"
        y2="10.4141"
        stroke-width="1.5"
        stroke-linecap="round"
        class="lineColor"
      />
      <line
        x1="0.75"
        y1="17.0859"
        x2="19.25"
        y2="17.0859"
        stroke-width="1.5"
        stroke-linecap="round"
        class="lineColor"
      />
      <circle cx="6" cy="3" r="3" class="circleColor" />
      <circle cx="14" cy="10" r="3" class="circleColor" />
      <circle cx="6" cy="17" r="3" class="circleColor" />
    </svg>
  </template>
  <script>
  export default {
    name: 'FilterIcon',
  }
  </script>
  <style lang="sass" scoped>
  @import '~/assets/css/_variables'
  .circleColor
    fill: $color-gray-47
  .lineColor
    stroke: $color-gray-47
  </style>