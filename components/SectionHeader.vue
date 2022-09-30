<template>
  <div class="d-flex align-items-center mx-md-5 section-header">
    <div class="d-flex mr-0 mr-sm-3">
      <h1 class="heading-garamond pre-line">
        <span>{{ title }}</span>
      </h1>
    </div>
    <div class="mx-4 mx-md-0">
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
  },
}
</script>
<style lang="sass" scoped>
@media (max-width: 500px)
  .section-header
    margin-left: calc(20px - 7.5px)
    margin-right: calc(20px - 7.5px)
</style>
