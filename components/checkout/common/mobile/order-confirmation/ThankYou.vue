<template>
  <b-row class="thank-you-wrapper">
    <b-col cols="12" sm="12">
      <!-- Thank you section -->
      <b-row>
        <b-col cols="12" sm="12" class="text-center">
          <b-img :src="require('~/assets/img/shopping-cart/order-confirmation/checkmark.svg')" width="32" height="32" />
          <div class="body-17-medium mt-2">{{ $t('shopping_cart.thank_you_message') }}</div>
          <div class="body-17-medium mt-2">
            <span class="body-21-normal">{{ $t('shopping_cart.order_number') }}&colon;</span>
            <span class="body-21-medium">{{ orderDetails.orderId }}</span>
          </div>
        </b-col>
      </b-row>
      <!-- End of Thank you section -->

      <!-- Order Details Button -->
      <b-row class="details-btn-wrapper">
        <b-col cols="12" sm="12" class="text-center">
          <b-button block variant="outline-dark" @click="$emit('view-order-details')">
            <b-row>
              <b-col cols="6" sm="6" class="text-left">
                <span>{{ $t('shopping_cart.order_details') }}</span>
              </b-col>
              <b-col cols="6" sm="6" class="text-right">
                <b-img :src="require('~/assets/img/icons/arrow-down-gray.svg')" />
              </b-col>
            </b-row>
          </b-button>
        </b-col>
      </b-row>
      <!-- End of Order Details Button -->

      <!-- Reward Cards -->
      <b-row class="cards-wrapper">
        <b-col cols="6" sm="6" class="card-wrapper">
          <b-row class="icon-wrapper">
            <b-col cols="12" sm="12" class="d-flex align-items-center justify-content-center">
              <b-img :src="require(`~/assets/img/shopping-cart/order-confirmation/rewards.svg`)" width="50" height="50" />
            </b-col>
          </b-row>
          <b-row class="text-wrapper">
            <b-col cols="12" sm="12">
              <div class="body-9-bold text-center">{{ $t('shopping_cart.congratulations') }}&excl;</div>
              <div class="body-9-bold text-center text-blue-20 text-uppercase mt-2">{{ rewardPoints }}&nbsp;{{ $t('shopping_cart.reward_pts') }}</div>
              <div class="body-6-normal text-center mt-2">{{ $t('shopping_cart.earned_for_todays_trade') }}</div>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="6" sm="6" class="card-wrapper ml-auto">
          <b-row class="icon-wrapper">
            <b-col cols="12" sm="12" class="d-flex align-items-center justify-content-center">
              <b-img :src="require(`~/assets/img/shopping-cart/order-confirmation/continue.svg`)" width="50" height="50" />
            </b-col>
          </b-row>
          <b-row class="text-wrapper">
            <b-col cols="12" sm="12">
              <div class="body-9-bold text-center">{{ $t('shopping_cart.missed_some_items') }}&quest;</div>
              <div class="body-9-normal text-center text-blue-20 mt-4" @click="$router.push('/shop')">{{ $t('shopping_cart.browse_more_trade') }}</div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <!-- End of Reward Cards -->

      <!-- Email Us Text -->
      <b-row class="email-us-wrapper">
        <b-col cols="12" sm="12" class="text-center">
          <i18n path="shopping_cart.contact_details" tag="div" class="body-1326-normal">
            <span class="body-1326-bold">{{ $t('shopping_cart.dead_stock_email') }}</span>
            <span class="body-1326-bold">{{ $t('shopping_cart.dead_stock_telephone_number') }}</span>
          </i18n>
        </b-col>
      </b-row>
      <!-- End of Email Us Text -->
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'ThankYou',
  props: {
    orderDetails: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      rewardPoints: 0,
    }
  },
  beforeMount() {
    this.getAwardedPoints()
  },
  methods: {
    getAwardedPoints() {
      this.$axios.get(`rewards-history/${this.orderDetails.orderId}/awarded-points`).then((response) => {
        this.rewardPoints = response.data.data.reduce((sum, item) => {
          return sum + item.points
        }, 0)
      }).catch((error) => {
        this.$toasted.error(error)
      })
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.thank-you-wrapper
  padding-top: 16px
  margin-left: 30px
  margin-right: 30px

/* Collapse buttons custom styles */
.details-btn-wrapper
  margin: 14px 0 0

  .col-sm-12
    padding: 0

  .btn
    &.btn-outline-dark
      min-height: 56px
      @include body-5-medium
      padding-left: 18px
      padding-right: 18px
      border: 1px solid $color-gray-94
      border-radius: 0.5rem

      &:focus, &:active, &:hover
        background: $color-gray-94
        border: 1px solid $color-gray-94

.cards-wrapper
  margin: 14px 0 0

  .col-sm-6
    padding: 0

  .card-wrapper
    height: 170px
    max-width: 143px
    border-radius: 0.25rem
    border: 1px solid $color-white-3

    .icon-wrapper
      height: 85px
      max-width: 143px
      margin-right: 0
      margin-left: 0
      border-top-left-radius: 0.25rem
      border-top-right-radius: 0.25rem
      background: $color-white-2

    .text-wrapper
      height: 85px
      max-width: 143px
      margin-right: 0
      margin-left: 0
      border-bottom-left-radius: 0.25rem
      border-bottom-right-radius: 0.25rem
      padding: 4px 4px 8px
      background: $color-white-3

      .col-sm-12
        padding: 0

      div
        font-family: Montserrat, serif

.email-us-wrapper
  margin: 24px 0 0
</style>
