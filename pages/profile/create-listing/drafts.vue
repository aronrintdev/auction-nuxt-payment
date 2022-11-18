<template>
  <div>
    <div v-if="isScreenXS">
      <draft-mobile></draft-mobile>
    </div>
    <div v-else>
      <draft-web></draft-web>
    </div>
    <Portal to="page-title"> Draft </Portal>
  </div>
</template>

<script>
import ScreenSize from '~/plugins/mixins/screenSize'

export default {
  name: 'Draft',
  components: {
    draftMobile: () => import('./draftsMobile'),
    draftWeb: () => import('./draftsWeb'),
  },
  mixins: [ScreenSize],
  layout: 'Profile', // Layout
}
</script>
