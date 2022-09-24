<template>
  <div class="d-flex align-items-center mx-md-5">
    <div class="d-flex mr-0 mr-sm-3">
      <h1 class="heading-garamond" v-html="getHeading"></h1>
    </div>
    <div class="mx-3 mx-md-0 text-center text-md-left">
      <h5 class="fw-4 fs-18 font-primary mb-0 text-gray-light garamond-desc">
        {{ desc }}
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
  computed: {
    getHeading() {
      const str =
        this.title.split(' ')[0] +
        '<br />' +
        this.title.substr(this.title.indexOf(' ') + 1)
      return str
    },
  },
}
</script>
