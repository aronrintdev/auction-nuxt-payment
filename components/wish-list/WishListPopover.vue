<template>
  <div>
    <b-popover :target="target" triggers="hover" placement="bottom" custom-class="wishlistPopover">
      <ul>
        <li v-for="list in wishLists"
            :key="`wish-list-${list.id}`">
          <a @click="handleWishListClick(list)">
            <div class="image-section"><ProductThumb :src="list.image" /></div>
            <span class="pl-2 text-truncate">{{ list.name }}</span>
          </a>
        </li>
      </ul>
      <div class="footer">
        <a @click="createWishList">
          <div class="image-section">
            <Icon src="plus_blue.svg" width="26" height="26" />
          </div>
          <span class="pl-2">{{ $t('wish_lists.create_list') }}</span>
        </a>
      </div>
    </b-popover>
    <CreateWishListModal
      :id="`create-list-modal-${product.id}`"
      @created="handleWishListCreated"
    />

    <NewWishListProductModal
      :id="`new-list-product-modal-${product.id}`"
      :product="product"
      :wish-list="createdWishlist"
      @hidden="$emit('wishlisted', createdWishlist)"
    />
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import CreateWishListModal from '~/components/modal/CreateWishList'
import NewWishListProductModal from '~/components/modal/NewWishListProduct'
import Icon from '~/components/common/Icon'
export default {
  name: 'WishListPopover',

  components: {
    CreateWishListModal,
    NewWishListProductModal,
    Icon
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

  data() {
    return {
      createdWishlist: null,
    }
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
      this.createdWishlist = await this.addProductsToWishList({
        wishList,
        ids: [this.product.id],
      })
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
.wishlistPopover::v-deep
  border-radius: 24px
  .popover-body
    padding: 0
    height: auto
    max-height: 250px
    overflow-y: scroll
    margin-bottom: 70px
    border-top-left-radius: 24px
    border-top-right-radius: 24px
    overflow-y: scroll

    &::-webkit-scrollbar
      width: 0px
    ul
      list-style: none
      padding: 0
      margin: 0
      li
        a
          display: flex
          width: 100%
          flex-grow: 1
          padding: 15px 20px 15px
          cursor: pointer
          align-items: center
          &:hover
            background-color: $color-white-5
          .image-section
            flex-shrink: 0
            width: 56px
            height: 37px
            display: flex
            align-items: center
            justify-content: center
            overflow: hidden
          span
            font-family: $font-montserrat
            @include body-3-medium

  .footer
    position: absolute
    bottom: 0
    width: 100%
    background-color: $color-white-5
    border-top: solid 1px $light-gray-3
    border-bottom-left-radius: 24px
    border-bottom-right-radius: 24px
    overflow: hidden
    a
      padding: 20px 10px
      display: flex
      justify-content: center
      cursor: pointer
      &:hover
        background-color: $color-white-13
      span
        font-family: $font-montserrat
        @include body-3-medium

</style>
