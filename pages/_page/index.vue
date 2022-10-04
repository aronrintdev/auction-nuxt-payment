<template>
  <div class="container page-container">
    <!-- Content Wrapper. Contains page content -->
    <b-row class="mt-5">
      <b-col md="12">
        <!-- TODO: To be filled once content is ready -->
        <div v-html="page_detail.content"></div>
      </b-col>
    </b-row>
  </div>
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
<style scoped lang="sass">
.page-container
  min-height: 500px
</style>