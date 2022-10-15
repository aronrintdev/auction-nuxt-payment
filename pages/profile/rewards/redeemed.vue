<template>
  <div class="redeemed-page d-flex flex-column vh-100 position-relative">
    <div class="starts d-flex ">
      <star/>
      <star class="second-star" heigh="69px" width="57px"/>
    </div>
    <div class="trophy d-flex align-items-center justify-content-center">
      <trophy/>
    </div>
    <div v-if="selectedReward" class="body d-flex flex-column align-items-center text-center">
      <span class="congrat body-1-bold">{{ $t('rewards.redeemed_page.congratulations') }}</span>
      <span class="subtitle">{{
          $t('rewards.redeemed_page.subtitle', {
            points: selectedReward.redemption_points,
            reward: selectedReward.reward_type
          })
        }}</span>
      <LineBlue class="line-divider"/>
      <i18n class="desc text-center mb-22" path="rewards.redeemed_page.desc" tag="span">
        <template #reward>
          <span class="font-weight-bold">{{ selectedReward.reward_type }}</span>
        </template>
      </i18n>
      <Button
          class="browse redeem-button"
          pill
          variant="dark-blue"
          @click="$router.push('/shop')"
      >
        {{ $t('rewards.redeemed_page.browse') }}
      </Button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import star from '~/assets/img/rewards/start.svg?inline'
import trophy from '~/assets/img/rewards/trphy-gold.svg?inline'
import LineBlue from '~/assets/img/rewards/blue-line.svg?inline'
import Button from '~/components/common/Button';

export default {
  name: 'Redeemed',
  components: {Button, star, trophy, LineBlue},
  layout: 'Profile',
  computed: {
    ...mapGetters({
      selectedReward: 'rewards/getRedeemed',
    })
  },
  mounted() {
    if (!this.selectedReward) {
      this.$router.push('/profile/rewards')
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~/assets/css/variables"
.redeemed-page
  background-image: url("~/assets/img/rewards/wave.svg")
  background-repeat: no-repeat
  background-attachment: local
  background-size: 100%
  background-position: bottom
  background-color: $color-blue-20
  padding: 48px

  .second-star
    margin-left: 48px
    margin-top: 40px

  .trophy
    margin-top: 86px

  .congrat
    margin-top: 38px
    font-family: $font-montserrat
    font-style: normal
    color: $color-black-1

  .subtitle
    @include body-17
    font-weight: $bold
    margin-top: 19px
    font-family: $font-montserrat
    font-style: normal
    color: $color-blue-20f

  .desc
    margin-top: 33px
    font-family: $font-montserrat
    font-style: normal
    color: #626262

  .browse
    margin-top: 38px
    width: 216px

  .line-divider
    margin-top: 33px

.redeem-button
  width: 216px
</style>
