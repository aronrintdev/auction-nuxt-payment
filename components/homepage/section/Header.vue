<template>
  <div class="section-header-wrapper">
    <HomeSectionTitle :title="title" :description="description" />
    <HomeSectionViewMoreButton :label="buttonLabel" :to="buttonTarget" />
  </div>
</template>
<script>
import HomeSectionTitle from '~/components/homepage/section/Title.vue'
import HomeSectionViewMoreButton from '~/components/homepage/section/ViewMoreButton.vue'

export default {
  name: 'HomeSectionHeader',

  components: { HomeSectionTitle, HomeSectionViewMoreButton },

  props: {
    buttonLabel: {
      type: String,
      required: true,
    },
    buttonTarget: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
}
</script>
<style lang="sass" scoped>
.section-header-wrapper
  display: flex
  justify-content: space-between
  flex-direction: row


</style>
