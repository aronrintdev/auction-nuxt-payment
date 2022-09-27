<template>
  <b-row class="vh-100 mt-5">
    <b-col md="12" class="text-center">
      <!-- TODO: To be filled once content is ready -->
      <span>{{ link }}</span>
    </b-col>
  </b-row>
</template>
<script>
export default {
  name: 'TermsAndConditions',
  layout: 'IndexLayout',
  data() {
    return {
      link: '',
    }
  },
  mounted() {
    this.link = this.$route.params.link
    this.getPageData(this.link)
  },
  methods: {
    getPageData(link) {
      /** Todo need to call api to get page data from database */
      console.log(link.replace('-', '_'))
    },
  },
}
</script>
