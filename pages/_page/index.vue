<template>
  <b-row class="vh-100 mt-5">
    <b-col md="12" class="text-center">
      <!-- TODO: To be filled once content is ready -->
      <span>{{ page }}</span>
    </b-col>
  </b-row>
</template>
<script>
export default {
  name: 'page',
  layout: 'IndexLayout',
  data() {
    return {
      page: 'testing',
    }
  },
  mounted() {
    console.log(this.$route.params)
    this.page = this.$route.params.page

    this.getPageData(this.page)
  },
  methods: {
    getPageData(page) {
      this.page = page
    },
  },
}
</script>
