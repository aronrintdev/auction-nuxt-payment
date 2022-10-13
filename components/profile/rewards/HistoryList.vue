<template>
  <div>
    <ItemDivider/>
    <div v-for="item in history" :key="item.id">
      <div class="history-item d-flex align-items-center">
        <div :class="!isGreater(item.points) && 'reedemed'"
             class="icon d-flex align-items-center justify-content-center">
          <TrophySVG height="40px" width="45px"/>
        </div>
        <div class="flex-grow-1 d-flex flex-column align-items-start">
          <div class="exp-date">
            Exp. {{ dateToLocal(item.expires_on) }}
          </div>
          <span class="item-desc ">
            <i18n path="rewards.reward_history_item_desc" tag="div">
              <template #rg>
               <span :class="isGreater(item.points)? 'gain' : 'redeem'"
                     class="font-weight-bold">{{ redeemedGainedText(item.points) }}</span>
              </template>
            </i18n> {{ item.order_id }}
          </span>
        </div>
        <div :class="isGreater(item.points)? 'gain' : 'redeem'"
             class="d-flex flex-column align-items-center item-points m-l-12">
          <span>{{ isGreater(item.points) ? '+' : '' }}{{ item.points }}</span>
          <span class="date">{{ dateToLocal(item.created_at) }}</span>
        </div>
      </div>
      <ItemDivider/>
    </div>
    <FaqReward class="m-t-30"/>
  </div>
</template>

<script>

import {mapGetters} from 'vuex';
import ItemDivider from '~/components/profile/notifications/ItemDivider';
import FaqReward from '~/components/profile/rewards/FaqReward';
import TrophySVG from '~/assets/img/rewards/trophy-black-borderless.svg?inline'

export default {
  name: 'HistoryList',
  components: {FaqReward, ItemDivider, TrophySVG},
  computed: {
    ...mapGetters({
      history: 'rewards/getRewardHistory',
    })
  },
  methods: {
    dateToLocal(date) {
      return new Date(date).toLocaleDateString()
    },
    isGreater(number) {
      return number > 0
    },
    redeemedGainedText(points) {
      return points > 0 ? this.$t('rewards.gained') : this.$t('rewards.redeemed')
    }
  }
}
</script>

<style lang="sass" scoped>

@import "~/assets/css/variables"
.m-t-30
  margin-top: 30px

.redeem
  color: $color-blue-20

.gain
  color: $color-orange-11

.item-desc
  @include body-9
  -webkit-line-clamp: 2
  font-family: $font-montserrat
  font-style: normal
  font-weight: $regular
  color: $color-black-1

.item-points
  @include body-13
  font-family: $font-sf-pro-text
  font-style: normal
  font-weight: $bold
  color: $color-blue-20

  .date
    @include body-18
    font-weight: $regular
    color: $color-black-15


.exp-date
  @include body-9
  -webkit-line-clamp: 2
  font-family: $font-montserrat
  font-style: normal
  font-weight: $medium
  color: $color-black-15


.m-l-12
  margin-left: 12px

.history-item
  padding: 15px 0

.icon
  margin-right: 10px
  height: 41px
  width: 41px
  padding: 3px
  border: 6.5px solid $color-blue-20
  border-radius: 50%

  &.reedemed
    border-color: $color-orange-11

.redeem
  color: $color-orange-11

.gain
  color: $color-blue-20
</style>
