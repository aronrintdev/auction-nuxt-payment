<template>
  <b-row>
    <b-col md="12">
      <b-row>
        <b-col md="12" class="border-bottom"></b-col>
      </b-row>

      <b-row class="mt-5 mb-3 px-3">
        <b-col md="2">
          <span class="body-4-bold">
            {{ $tc('rewards.points', 10) }}&nbsp;&lpar;&plus;&sol;&minus;&rpar;
          </span>
        </b-col>
        <b-col md="5">
          <span class="body-4-bold">
            {{ $t('rewards.description') }}
          </span>
        </b-col>
        <b-col md="2">
          <span class="body-4-bold">
            {{ $t('rewards.date') }}
          </span>
        </b-col>
        <b-col md="2">
          <span class="body-4-bold">
            {{ $t('rewards.expires_on') }}
          </span>
        </b-col>
        <b-col md="1">
          <span class="body-4-bold">
            {{ $t('rewards.balance') }}
          </span>
        </b-col>
      </b-row>

      <b-row v-for="rewardsHistoryItem in rewardsHistoryItems" :key="rewardsHistoryItem.id">
        <b-col md="12">
          <b-card class="shadow-none mb-2 py-3">
            <b-row>
              <b-col md="2">
                <CashSVG />
                <span v-if="rewardsHistoryItem.points > 0" class="body-4-bold ml-3">
                  &plus;{{ Math.abs(rewardsHistoryItem.points) }}
                </span>
                <span v-else class="body-4-bold ml-3">
                  &minus;{{ Math.abs(rewardsHistoryItem.points) }}
                </span>
              </b-col>
              <b-col md="5">
                {{ rewardsHistoryItem.description }}
              </b-col>
              <b-col md="2">
                {{ rewardsHistoryItem.created_at }}
              </b-col>
              <b-col md="2">
                {{ rewardsHistoryItem.expires_on }}
              </b-col>
              <b-col md="1">
                <TrophySVG />
                <span class="body-4-bold ml-1">
                  {{ rewardsHistoryItem.balance }}
                </span>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import CashSVG from '~/assets/img/rewards/cash_small.svg?inline'
import TrophySVG from '~/assets/img/rewards/trophy_small.svg?inline'

export default {
  name: 'RewardsHistory',
  components: { CashSVG, TrophySVG },
  data() {
    return {
      rewardsHistoryItems: []
    }
  },
  mounted() {
    this.getRewardsHistory()
  },
  methods: {
    getRewardsHistory() {
      this.$axios.get('rewards-history').then((response) => {
        this.rewardsHistoryItems = response.data.data
      }).catch((error) => {
        this.$toasted.error(error)
      })
    }
  }
}
</script>

