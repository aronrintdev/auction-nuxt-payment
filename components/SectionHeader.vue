<template>
  <div
    class="d-flex align-items-center section-header"
    :class="{ 'mx-md-5': !fullWidth }"
  >
    <div class="d-flex title-wrapper">
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
    fullWidth: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
<style lang="sass" scoped>
.section-header
  margin: 40px 0 0 32px
  @media (min-width: 576px)
    margin: 70px 74px 50px 74px
.title-wrapper
  margin-right: 0
  @media (min-width: 576px)
    margin-right: 89px
@media (max-width: 500px)
  .section-header
    margin-left: calc(20px - 7.5px)
    margin-right: calc(20px - 7.5px)
</style>
