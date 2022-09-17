<template>
  <b-container fluid class="bg-white-4 h-100">
    <!-- Top Banner -->
    <b-row>
      <b-col md="12" class="px-0">
        <b-img fluid-grow class="w-100" :src="require('~/assets/img/rewards/jumbotron.png')"></b-img>
      </b-col>
    </b-row><!-- End of Top Banner -->

    <UserRewards v-if="rewardPoints" />

    <EarnPoints v-else />
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import EarnPoints from '~/components/profile/rewards/EarnPoints'
import UserRewards from '~/components/profile/rewards/UserRewards'

export default {
  name: 'Index',
  components: { EarnPoints, UserRewards },
  layout: 'Profile',
  computed: {
    ...mapGetters({
      rewardPoints: 'auth/getRewardPoints'
    })
  },
  mounted() {
    this.getRewardThresholds()
    this.getUserRedeemedReward()
  },
  methods: {
    ...mapActions({
      getRewardThresholds: 'rewards/getRewardThresholds',
      getUserRedeemedReward: 'redeemed-reward/getUserRedeemedReward',
    }),
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.bg-white-4
  background: $color-white-4
</style>
