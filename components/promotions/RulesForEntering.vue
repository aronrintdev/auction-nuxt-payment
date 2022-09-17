<template>
  <div class="px-5 d-flex align-items-center justify-content-between rules-for-entering">
    <div>
      <div class="heading-4-bold mb-2">{{ $t('promotions.rules_for_entering') }}</div>
      <div class="body-3-regular content">{{ ruleText }}</div>
    </div>
    <Button
        class="px-5 mx-3"
        variant="dark"
        @click="handleClick"
    >
      {{ buttonText }}
    </Button>
  </div>
</template>
<script>
import Button from '~/components/common/Button'
import {PROMOTION_TYPE_GIVEAWAY, PROMOTION_TYPE_SWEEPSTAKES} from '~/static/constants';

export default {
  name: 'PromotionsRulesForEntering',
  components: {
    Button,
  },
  props: {
    promotion: {
      type: Object,
      required: true,
    }
  },
  computed: {
    isGiveaway() {
      return this.promotion.type === PROMOTION_TYPE_GIVEAWAY
    },
    isSweepStake() {
      return this.promotion.type === PROMOTION_TYPE_SWEEPSTAKES
    },
    ruleText() {
      return this.isGiveaway ? this.$t('promotions.rules_for_entering_giveaways') : this.$t('promotions.rules_for_entering_sweepstake', {product: this.promotion.reward_product_name})
    },
    buttonText() {
      return this.isGiveaway ? this.$t('promotions.view_instagram') : this.$t('promotions.show_now')
    }
  },
  methods: {
    handleClick() {
      if (this.isGiveaway) {
        window.open(process.env.INSTAGRAM_LINK, '_blank')
      } else {
        this.$router.push({
          path: '/shop'
        })
      }
    }
  }
};
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.rules-for-entering
  margin-top: 60px
  margin-bottom: 60px

  .content
    color: $color-ui-secondary
    max-width: 600px

  .btn.btn-dark
    background: $color-blue-20
    border-color: $color-blue-20
    font-weight: $normal
    font-size: 20px
    line-height: 23px
    height: 41px
</style>