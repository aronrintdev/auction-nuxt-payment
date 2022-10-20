<template>
  <b-container fluid class="bg-white-4 h-100">
    <!-- Top Banner -->
    <b-row v-if="!isScreenXS">
      <b-col md="12" class="px-0">
        <b-img fluid-grow class="w-100" :src="require('~/assets/img/rewards/jumbotron.png')"></b-img>
      </b-col>
    </b-row><!-- End of Top Banner -->

    <MobileUserReward v-if="rewardPoints && isScreenXS"/>
    <UserRewards v-if="rewardPoints && !isScreenXS"/>
    <EarnPoints v-if="!rewardPoints"/>
  </b-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import EarnPoints from '~/components/profile/rewards/EarnPoints'
import UserRewards from '~/components/profile/rewards/UserRewards'
import screenSize from '~/plugins/mixins/screenSize';
import MobileUserReward from '~/components/profile/rewards/MobileUserReward';

export default {
  name: 'Index',
  components: {MobileUserReward, EarnPoints, UserRewards},
  mixins: [screenSize],
  layout: 'Profile',
  computed: {
    ...mapGetters({
      rewardPoints: 'auth/getRewardPoints'
    })
  },
  mounted() {
    this.getStages()
    this.getRewardHistory()
    this.getRewardThresholds()
    this.getUserRedeemedReward()
  },
  methods: {
    ...mapActions({
      getRewardThresholds: 'rewards/getRewardThresholds',
      getStages: 'rewards/getStages',
      getRewardHistory: 'rewards/fetchRewardHistory',
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
