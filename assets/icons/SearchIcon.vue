<template>
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.22225 13.4445C10.6587 13.4445 13.4445 10.6587 13.4445 7.22225C13.4445 3.78579 10.6587 1 7.22225 1C3.78579 1 1 3.78579 1 7.22225C1 10.6587 3.78579 13.4445 7.22225 13.4445Z"
        class="strokeColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.0005 15.0005L11.6172 11.6172"
        class="strokeColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </template>
  <script>
  export default {
    name: 'SearchIcon',
  }
  </script>
  <style lang="sass" scoped>
  @import '~/assets/css/_variables'
  .strokeColor
      stroke: $color-white-1
  </style>