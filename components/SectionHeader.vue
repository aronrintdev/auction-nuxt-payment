<template>
  <div
    class="d-flex align-items-center section-header"
    :class="{ 'full-width': fullWidth }"
    :style="`--margin-left: ${marginLeft}`"
  >
    <div class="d-flex title-wrapper">
      <h1 class="heading-garamond pre-line">
        <span>{{ title }}</span>
      </h1>
    </div>
    <div>
      <h5
        class="fw-4 fs-18 font-primary mb-0 text-gray-light garamond-desc pre-line"
      >
        <span>{{ desc }}</span>
      </h5>
    </div>
    <div class="ml-auto">
      <ViewMoreBtn :label="label" :to="to" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    desc: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    to: {
      type: String,
      default: '',
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    marginLeft: {
      type: String,
      default: '75px',
    },
  },
}
</script>
<style lang="sass" scoped>
.section-header:not(.full-width)
  margin: 40px 0 0 0
  @media (min-width: 576px)
    margin: 70px 88px 50px 75px
    margin-left: var(--margin-left)
.title-wrapper
  margin-right: 30px
  @media (min-width: 576px)
    margin-right: 89px
</style>
