<template>
  <b-row>
    <b-col md="10" offset-md="1">
      <b-row>
        <b-col md="12" class="text-center mt-5">
          <NavGroup
            :data="pages"
            :value="currentPage"
            class="section-nav"
            @change="handlePageChange"
          ></NavGroup>
        </b-col>
      </b-row>

      <RewardsBalance v-if="currentPage === $options.components.RewardsBalance.name" class="mt-5" />

      <RewardsHistory v-else class="mt-5" />
    </b-col>
  </b-row>
</template>

<script>
import NavGroup from '~/components/common/NavGroup.vue'
import RewardsBalance from '~/components/profile/rewards/RewardsBalance'
import RewardsHistory from '~/components/profile/rewards/RewardsHistory'

export default {
  name: 'UserRewards',
  components: { NavGroup, RewardsBalance, RewardsHistory },
  layout: 'Profile',
  data() {
    return {
      currentPage: 'RewardsBalance',
      pages: [
        {
          label: this.$t('rewards.rewards_balance'),
          value: 'RewardsBalance'
        },
        {
          label: this.$t('rewards.rewards_history'),
          value: 'RewardsHistory'
        },
      ]
    }
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page
    }
  }
}
</script>
