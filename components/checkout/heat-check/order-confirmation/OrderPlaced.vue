<template>
  <b-col md="7">
    <!-- Thank you message, Order Number, Contact Details, Reward Points Card & Continue Shopping Card -->
    <BaseTitle />

    <b-row>
      <b-col md="10" offset="1">
        <!-- Contact Details -->
        <b-row class="mt-4">
          <b-col md="8" offset="2" class="text-center body-5-normal">
            <i18n path="shopping_cart.contact_details" tag="div">
              <span class="body-5-bold">{{
                $t('shopping_cart.dead_stock_email')
              }}</span>
              <span class="body-5-bold">{{
                $t('shopping_cart.dead_stock_telephone_number')
              }}</span>
            </i18n>
          </b-col> </b-row
        ><!-- End of Contact Details -->

        <!-- Crypto Deposit Information -->
        <b-row v-if="cryptoDetails.address" class="mt-4">
          <b-col md="8" offset="2" class="text-center body-5-normal">
            <span>
              {{ $t('shopping_cart.crypto_deposit_information') }}
            </span>
          </b-col> </b-row
        ><!-- End of Crypto Deposit Information -->

        <!-- View Order Details Button -->
        <b-row class="mt-4">
          <b-col md="12" class="text-center">
            <b-button
              type="button"
              class="px-5"
              variant="confirm"
              @click="
                emitRenderComponentEvent(
                  $parent.$options.components.OrderDetails.name
                )
              "
              >{{ $t('shopping_cart.view_order_details') }}</b-button
            >
          </b-col> </b-row
        ><!-- End of View Order Details Button -->

        <hr class="mb-5 mt-5 w-75" />

        <b-row>
          <!-- Reward Points Card -->
          <b-col md="5" offset="1">
            <b-card tag="article" class="custom-card w-75 mr-2">
              <template #header>
                <b-row>
                  <b-col cols="12" class="text-center">
                    <b-img
                      :src="
                        require(`~/assets/img/shopping-cart/order-confirmation/rewards.svg`)
                      "
                    ></b-img>
                  </b-col>
                </b-row>
              </template>
              <b-card-body>
                <b-row class="pt-3">
                  <b-col md="12">
                    <div class="text-center body-5-bold">
                      {{ $t('shopping_cart.congratulations') }}&excl;
                    </div>
                  </b-col>
                </b-row>
                <b-row class="pt-4">
                  <b-col md="12">
                    <i18n
                      path="shopping_cart.you_have_earned_text"
                      tag="div"
                      class="text-center body-5-normal"
                    >
                      <span class="text-light-blue body-5-bold">
                        <br />{{ rewardPoints }}&nbsp;{{
                          $t('shopping_cart.reward_points')
                        }}<br />
                      </span>
                    </i18n>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card> </b-col
          ><!-- End of Reward Points Card -->

          <!-- Continue Shopping Card -->
          <b-col md="5">
            <b-card tag="article" class="custom-card ml-2 w-75">
              <template #header>
                <b-row>
                  <b-col cols="12" class="text-center">
                    <b-img
                      :src="
                        require(`~/assets/img/shopping-cart/order-confirmation/continue.svg`)
                      "
                    ></b-img>
                  </b-col>
                </b-row>
              </template>
              <b-card-body>
                <b-row class="pt-3">
                  <b-col md="12">
                    <div class="text-center body-5-bold">
                      {{ $t('shopping_cart.missed_some_items') }}&quest;
                    </div>
                  </b-col>
                </b-row>
                <b-row class="pt-4">
                  <b-col md="10" offset="1" class="text-center">
                    <NuxtLink id="continue-shopping-more" to="/">{{
                      $t('shopping_cart.continue_shopping_for_more')
                    }}</NuxtLink>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card> </b-col
          ><!-- End of Continue Shopping Card -->
        </b-row>
      </b-col> </b-row
    ><!-- End of Thank you message, Order Number, Contact Details, Reward Points Card & Continue Shopping Card -->
  </b-col>
</template>

<script>
import { mapGetters } from 'vuex'
import emitEvent from '~/plugins/mixins/emit-event'
import BaseTitle from '~/components/checkout/heat-check/order-confirmation/BaseTitle'
export default {
  name: 'OrderPlaced',
  components: { BaseTitle },
  mixins: [emitEvent],
  data() {
    return {
      rewardPoints: 80, // TODO: Temporary dummy data
    }
  },
  computed: {
    ...mapGetters({
      cryptoDetails: 'order-details/getCryptoDetails',
    }),
  },
}
</script>
