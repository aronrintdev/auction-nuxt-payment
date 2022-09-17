<template>
  <div>
    <SettingsMenu />
  </div>
</template>
<script>
import SettingsMenu from '~/components/profile/settings/SettingsMenu'

export default {
  name: 'Settings',
  components: {
    SettingsMenu,
  },
  layout: 'Profile',
}
</script>

<style scoped></style>
