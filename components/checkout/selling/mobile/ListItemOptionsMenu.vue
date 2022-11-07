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

      <!-- Options Menu -->
      <b-row class="options-wrapper">
        <b-col cols="12" sm="12">
          <b-list-group>
            <!-- TODO: NP - Will activate once implemented -->
<!--            <b-list-group-item>-->
<!--              <b-row class="d-flex">-->
<!--                <b-col cols="6" sm="6">-->
<!--                  <span class="text-black body-17-normal">{{ $t('shopping_cart.change_size') }}</span>-->
<!--                </b-col>-->
<!--                <b-col cols="6" sm="6" class="text-right">-->
<!--                  <ArrowRightBlackSVG />-->
<!--                </b-col>-->
<!--              </b-row>-->
<!--            </b-list-group-item>-->
            <b-list-group-item v-if="wishlist" @click="handleRemoveFromWishListClick">
              <b-row>
                <b-col cols="8" sm="8">
                  <span class="text-black body-17-normal">{{ $t('shopping_cart.remove_from_wishilist') }}</span>
                </b-col>
                <b-col cols="4" sm="4" class="text-right">
                  <ArrowRightBlackSVG />
                </b-col>
              </b-row>
            </b-list-group-item>
            <b-list-group-item v-else @click="emitRenderComponentEvent($parent.$options.components.WishList.name, properties)">
              <b-row>
                <b-col cols="8" sm="8">
                  <span class="text-black body-17-normal">{{ $t('shopping_cart.move_to_wishilist') }}</span>
                </b-col>
                <b-col cols="4" sm="4" class="text-right">
                  <ArrowRightBlackSVG />
                </b-col>
              </b-row>
            </b-list-group-item>
            <b-list-group-item @click="handleRemoveFromBagClick">
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
          <!-- End of Options Menu -->
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import emitEventMixin from '~/plugins/mixins/emit-event'
import ShoppingBagTitle from '~/components/checkout/common/mobile/ShoppingBagTitle'
import ArrowRightBlackSVG from '~/assets/img/shopping-cart/arrow-right-black.svg?inline'

export default {
  name: 'ListItemOptionsMenu',
  components: { ShoppingBagTitle, ArrowRightBlackSVG },
  mixins: [ emitEventMixin ],
  props: {
    properties: {
      type: Object,
      required: true,
    }
  },
  computed: {
    ...mapGetters({
      wishLists: 'wish-list/getWishLists',
    }),
    wishlist(vm) {
      return vm.properties.wishLists.length ? vm.properties.wishLists[0] : false
    }
  },
  methods: {
    ...mapActions({
      removeProduct: 'shopping-cart/removeProduct',
      removeProductsFromWishList: 'wish-list/removeProductsFromWishList',
      removeProductFromWishList: 'shopping-cart/removeProductFromWishList',
    }),
    handleRemoveFromWishListClick() {
      if (this.wishlist) {
        this.removeProductsFromWishList({ wishList: this.wishlist, ids: [this.properties.id] }).then(() => {
          this.removeProductFromWishList(this.properties).then(() => {
            this.$toasted.success(this.$tc('wish_lists.products_removed_from_wishlist', 1).toString())
            this.$parent.$parent.close()
          })
        })
      }
    },
    handleRemoveFromBagClick() {
      this.removeProduct(this.properties)
      this.$parent.$parent.close()
    }
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
