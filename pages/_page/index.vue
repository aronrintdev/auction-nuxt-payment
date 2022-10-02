<template>
  <b-row class="vh-100 mt-5">
    <b-col md="12" class="text-center">
      <!-- TODO: To be filled once content is ready -->
      <div>{{ page_detail.name }}</div>
      <div v-html="page_detail.content"></div>
    </b-col>
  </b-row>
</template>
<script>
export default {
  name: 'page',
  layout: 'IndexLayout',
  data() {
    return {
      page: '',
      page_detail: '',
    }
  },
  mounted() {
    this.page = this.$route.params.page

    this.getPageData()
  },
  methods: {
    getPageData() {
      this.$axios
        .get(`/page/${this.page}`)
        .then((res) => {
          this.page_detail = res.data.data
        })
        .catch((err) => {
          this.logger.logToServer(err.response)
        })
    },
  },
}
</script>
