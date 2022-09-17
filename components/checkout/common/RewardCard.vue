<template>
  <b-row>
    <b-col md="12">
      <b-card class="custom-card border-green-15" no-body>
        <b-card-body class="py-2 pr-0">
          <b-row>
            <b-col md="12" class="d-flex align-items-center">
              <span>{{ redeemedRewardType }}</span>
              <b-button
                class="ml-auto pa-0"
                variant="img"
                @click="$emit('clear-reward')"
              >
                <b-img :src="require('~/assets/img/shopping-cart/x-close.svg')" />
              </b-button>
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'RewardCard',
  props: {
    redeemedRewardType: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

/* Overriding the '.custom-card' border styles */
.border-green-15
  border: 1px $color-green-15 solid !important
</style>
