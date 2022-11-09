<template>
  <div>
    <b-popover
      ref="wishListPopover"
      :target="target"
      triggers="focus"
      placement="bottom"
      container="body"
      custom-class="wishlist-popover"
      delay="100"
      @show="$emit('show')"
      @hidden="$emit('hidden')"
    >
      <div v-if="wishLists.length" class="list-section">
        <div
          v-for="list in wishLists"
          :key="`wish-list-${list.id}`"
          class="wishlist-item"
          @click="handleWishListClick(list)"
        >
          <div class="image-section">
            <ProductThumb :src="list.image" />
          </div>
          <div class="ml-2 text-truncate">{{ list.name }}</div>
          <div class="overlay"></div>
        </div>
      </div>
      <div
        class="create-section d-flex align-items-center"
        @click="createWishList"
      >
        <div class="image-section">
          <Icon src="plus_blue.svg" width="26" height="26" />
        </div>
        <div class="ml-2">{{ $t('wish_lists.create_list') }}</div>
      </div>
    </b-popover>

    <CreateWishListModal
      :id="`create-list-modal-${product.id}`"
      @created="handleWishListCreated"
    />

    <NewWishListProductModal
      :id="`new-list-product-modal-${product.id}`"
      :product="product"
      :wish-list="wishList"
    />
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import CreateWishListModal from '~/components/modal/CreateWishList'
import NewWishListProductModal from '~/components/modal/NewWishListProduct'
import Icon from '~/components/common/Icon'
import ProductThumb from '~/components/product/Thumb.vue'

export default {
  name: 'WishListPopover',

  components: {
    CreateWishListModal,
    NewWishListProductModal,
    Icon,
    ProductThumb,
  },

  props: {
    product: {
      type: Object,
      required: true,
    },
    wishList: {
      type: Object,
      default: null,
    },
    target: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapGetters({
      wishLists: 'wish-list/getWishLists',
    }),
  },

  methods: {
    ...mapActions({
      addProductsToWishList: 'wish-list/addProductsToWishList',
    }),

    createWishList() {
      if (!this.$auth.loggedIn) {
        return this.$router.push('/login')
      }
      this.$bvModal.show(`create-list-modal-${this.product.id}`)
    },

    async handleWishListClick(list) {
      if (!this.$auth.loggedIn) {
        return this.$router.push('/login')
      }
      const data = await this.addProductsToWishList({
        wishList: list,
        ids: [this.product.id],
      })
      this.$emit('wishlisted', data)
    },

    async handleWishListCreated(wishList) {
      const data = await this.addProductsToWishList({
        wishList,
        ids: [this.product.id],
      })
      this.$emit('wishlisted', data)
      this.$bvModal.hide(`create-list-modal-${this.product.id}`)
      this.$nextTick(() =>
        this.$bvModal.show(`new-list-product-modal-${this.product.id}`)
      )
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.wishlist-popover::v-deep
  width: 235px
  border-radius: 10px

  .popover-body
    padding: 0
    @include body-3-normal

    >div:first-child
      border-top-left-radius: 10px
      border-top-right-radius: 10px

    .wishlist-item
      color: $color-black-1
      padding: 10px 20px
      display: flex
      align-items: center
      cursor: pointer
      position: relative

      &:first-child
        border-top-left-radius: 10px
        border-top-right-radius: 10px

      &:hover
        .overlay
          background: rgb(153,153,153,0.1)

      .overlay
        position: absolute
        top: 0px
        left: 0px
        width: 100%
        height: 100%
        background: rgb(153,153,153,0)

    .create-section
      background-color: $color-white-5
      padding: 10px 20px
      border-bottom-left-radius: 10px
      border-bottom-right-radius: 10px
      cursor: pointer

      &:hover
        background-color: $color-gray-3

    .image-section
      flex-shrink: 0
      width: 56px
      height: 37px
      display: flex
      align-items: center
      justify-content: center
      overflow: hidden

    .list-section
      max-height: 230px
      overflow-y: auto
</style>
