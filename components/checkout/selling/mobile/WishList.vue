<template>
  <b-row class="outer-wrapper">
    <b-col cols="12" sm="12">
      <!-- Top Title -->
      <b-row>
        <b-col cols="12" sm="12">
          <div class="body-32-bold">{{ $t('shopping_cart.move_this_item_a_list') }}</div>
        </b-col>
      </b-row>
      <!-- End of Top Title -->

      <!-- Wish List Item -->
      <b-row class="wishlist-item-wrapper">
        <b-col cols="12" sm="12" class="d-flex align-items-center justify-content-center">
          <b-img :src="properties.image" height="47" />
          <span class="body-5-medium">{{ name }}</span>
        </b-col>
      </b-row>
      <!-- End of Wish List Item -->

      <!-- User's Wish Lists -->
      <b-row v-for="wishList in wishLists" :key="wishList.id" class="wishlist-wrapper" @click="handleAddToWishListClick(wishList)">
        <b-col cols="12" sm="12" class="d-flex align-items-center justify-content-center">
          <b-img :src="wishList.image" height="30" />
          <span class="body-5-regular">{{ wishList.name }}</span>
        </b-col>
      </b-row>
      <!-- End of User's Wish Lists -->

      <!-- Create Wish List Link Button -->
      <b-row class="wishlist-wrapper" @click="emitRenderComponentEvent($parent.$options.components.CreateWishList.name)">
        <b-col cols="12" sm="12" class="d-flex align-items-center justify-content-center">
          <AddCircleBlueSVG />
          <span class="body-5-regular">{{ $t('shopping_cart.create_new_list') }}</span>
        </b-col>
      </b-row>
      <!-- End of Create Wish List Link Button -->

      <!-- Cancel Link Button -->
      <b-row class="cancel-wrapper" @click="handleCancelButtonClick">
        <b-col cols="12" sm="12">
          <div class="body-17-medium text-blue-20 text-center">{{ $t('shopping_cart.cancel') }}</div>
        </b-col>
      </b-row>
      <!-- End of Cancel Link Button -->
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import emitEventMixin from '~/plugins/mixins/emit-event'
import AddCircleBlueSVG from '~/assets/img/plus-circle-blue.svg?inline'

export default {
  name: 'WishList',
  components: { AddCircleBlueSVG },
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
    name(vm) {
      return vm.properties.name.substr(0, 21)
    }
  },
  methods: {
    ...mapActions({
      addProductsToWishList: 'wish-list/addProductsToWishList',
      removeProduct: 'shopping-cart/removeProduct'
    }),
    handleAddToWishListClick(wishList) {
      if (! this.$auth.loggedIn) {
        return this.$router.push('/login')
      }

      this.addProductsToWishList({ wishList, ids: [this.properties.id] }).then(() => {
        this.removeProduct(this.properties)
        this.$toasted.success(this.$t('wish_lists.one_item_added', { list: wishList.name }).toString())
        this.$parent.$parent.close()
      })
    },
    handleCancelButtonClick() {
      this.emitRenderComponentEvent(this.$parent.$options.components.ListItemOptionsMenu.name, this.properties)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.outer-wrapper
  margin: 6px 21px 0

  .wishlist-item-wrapper
    margin-top: 12px
    height: 50px
    padding: 0 16px

    img
      position: absolute
      left: 0

  .wishlist-wrapper
    margin-top: 16px
    height: 50px
    padding: 0 16px
    border: 1px solid $color-white-12
    border-radius: 0.5rem

    &:focus, &:active, &:hover
      background: $color-white-12

    img, svg
      position: absolute
      left: 0

  .cancel-wrapper
    margin: 25px 0
</style>
