<template>
  <b-row class="redeem-giftcard-row">
    <!-- Redeem block -->
    <ReedemCard />
    <!-- ./Redeem Block -->

    <!-- Helptext block -->
    <b-col class="help-text-col mt-5" cols md="12">
      <div class="help-text-one">
        {{ firstPoint }}&colon;&nbsp;{{ $t('redeem_giftcard.help_text_one') }}
      </div>
      <div class="help-text-two">
        {{ secondPoint }}&colon;&nbsp;{{ $t('redeem_giftcard.help_text_two') }}
      </div>
    </b-col>
    <!-- Helptext block ends here -->

    <!-- If you have issues block -->
    <b-col cols class="issue-col mt-5">
      <div class="issue-heading">
        {{ $t('redeem_giftcard.if_you_have_issues') }}&colon;
      </div>

      <div class="issue-text mt-3">
        {{ $t('redeem_giftcard.help_text') }} 
        <nuxt-link to="#" class="text-lowercase">{{ $t('footer.contact_us') }}</nuxt-link>
        {{ $t('redeem_giftcard.reach_at') }}
        <span class="text-bold">{{ phone }}</span>
        {{ $t('common.or') }}&nbsp;<span class="text-bold">{{ helpmail }}
        </span>
      </div>
    </b-col>
    <!-- ./If you have issues block -->
  </b-row>
</template>

<script>
import ReedemCard from './ReedemCard.vue'
import { CONTACTNUMBER, HELP_MAIL } from '~/static/constants'

export default {
    name: 'RedeemGiftCardComponent',

    components: {
      ReedemCard
    },

    data() {
      return {
        firstPoint: 1,// For numbered list
        secondPoint: 2,// For numbered list
        phone: CONTACTNUMBER,
        helpmail: HELP_MAIL
      }
    },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.redeem-giftcard-row
  padding: 3rem
.issue-col,
.issue-text
  @include body-5-normal
  font-style: normal
  color: $color-black-1
.issue-heading
  @include body-1-medium
  font-style: normal
  color: $color-black-1

.redeem-giftcard-row
  @media (max-width: 375px)
    padding: 2rem
  @media (min-width: 376px)
    padding: 3rem

.issue-col
  @media (min-width: 1024px)
    flex: 0 0 50%
    width: 50%
</style>