<template>
  <div class="sneaker-reward-page vh-100">
    <div class="d-flex align-items-center ">
      <MobileSearchInput @input="searchChanged"/>

    </div>
  </div>
</template>

<script>
import MobileSearchInput from '~/components/mobile/MobileSearchInput';

export default {
  name: 'SneakerReward',
  components: {MobileSearchInput},
  layout: 'Profile',
  data() {
    return {
      search: ''
    }
  },
  methods: {
    searchChanged(s) {
      this.search = s
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~/assets/css/variables"
.sneaker-reward-page
  background-color: $color-white-1
</style>
