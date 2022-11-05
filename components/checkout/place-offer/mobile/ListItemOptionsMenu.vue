<template>
  <b-row>
    <b-col cols="12" sm="12">
      <!-- Top Title -->
      <ShoppingBagTitle
        :title="$t('shopping_cart.options')"
        text-center
        class="mt-0"
      />
      <!-- End of Top Title -->

      <b-row class="options-wrapper">
        <b-col cols="12" sm="12">
          <b-list-group>
            <b-list-group-item @click="removeItem">
              <b-row>
                <b-col cols="8" sm="8">
                  <span class="text-black body-17-normal">{{ $t('shopping_cart.remove_from_bag') }}</span>
                </b-col>
                <b-col cols="4" sm="4" class="text-right">
                  <ArrowRightBlackSVG />
                </b-col>
              </b-row>
            </b-list-group-item>
            <b-list-group-item @click="$parent.$parent.close()">
              <b-row>
                <b-col cols="12" sm="12">
                  <span class="text-black body-17-normal">{{ $t('shopping_cart.cancel') }}</span>
                </b-col>
              </b-row>
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import { mapActions } from 'vuex'
import ShoppingBagTitle from '~/components/checkout/selling/mobile/ShoppingBagTitle'
import ArrowRightBlackSVG from '~/assets/img/shopping-cart/arrow-right-black.svg?inline'

export default {
  name: 'ListItemOptionsMenu',
  components: { ShoppingBagTitle, ArrowRightBlackSVG },
  methods: {
    ...mapActions({
      storeOfferDetails: 'offer/storeOfferDetails'
    }),
    // Remove Item and redirect back
    removeItem(){
      this.storeOfferDetails({})
      this.$parent.$parent.close()
      this.$router.push(this.$nuxt.context.from)
    },
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.options-wrapper
  margin-top: 20px

  .list-group-item
    padding: 17px 20px
    border-color: $color-gray-23b

    &:last-child
      border-bottom: none

    &:hover, &:active, &:focus
      background: $color-gray-23b
</style>
