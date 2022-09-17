<template>
  <svg
    class="svg-inline--fa fa-circle fa-w-16"
    aria-hidden="true"
    data-prefix="fas"
    data-icon="circle"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    data-fa-i2svg
  >
    <path
      :fill="resultValue === orderStatus ? '#295ff6' : '#295ff380'"
      d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"
    />
  </svg>
</template>

<script>
export default {
  name: 'TimelineIcon',

  props: {
    orderStatus: {
      type: String,
      required: true,
    },

    resultValue: {
      type: String,
      required: true,
    },
  },
}
</script>