<template>
  <div class="mobile-wishlist">
    <div class="title">{{ $t('wish_lists.add_to_wishlist') }}</div>
    <ul>
      <li v-for="list in wishLists"
          :key="`wish-list-${list.id}`">
        <a @click="handleWishListClick(list)">
          <div class="image-section"><ProductThumb :src="list.image" /></div>
          <div class="text-section text-truncate">{{ list.name }}</div>
        </a>
      </li>
    </ul>
    <div class="d-flex justify-content-end">
      <a role="button" class="create-new-list" @click="$emit('create')">
        <img :src="require('~/assets/img/shop/wishlist-mobile-add.svg')" />
        <span>{{ $t('wish_lists.create_new_list') }}</span>
      </a>
    </div>
    <div class="d-flex justify-content-center">
      <a role="button" class="cancel-btn" @click="$emit('cancel')">
        <span>{{ $t('common.cancel') }}</span>
      </a>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters({
      wishLists: 'wish-list/getWishLists',
    }),
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions({
      addProductsToWishList: 'wish-list/addProductsToWishList',
    }),
    async handleWishListClick(wishList) {
      this.createdWishlist = await this.addProductsToWishList({
        wishList,
        ids: [this.product.id],
      })
      this.$emit('close')
    }
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.mobile-wishlist
  padding: 0px 5px 0px 25px

  .title
    font-family: $font-family-sf-pro-display
    @include body-17-bold
    margin-bottom: 34px

  ul
    list-style: none
    padding: 0
    margin: 0
    max-height: 60vh
    overflow-y: scroll
    li
      margin-top: 17px
      a
        border: solid 1px $color-white-12
        border-radius: 8px
        height: 50px
        display: flex
        align-items: center
        padding-left: 16px
        padding-right: 16px
        cursor: pointer
        .image-section
          flex-shrink: 0
          width: 40px
          height: 28px
          display: flex
          align-items: center
          justify-content: center
          overflow: hidden
        .text-section
          font-family: $font-family-sf-pro-display
          @include body-5-regular
          padding-left: 45px

  .create-new-list
    display: flex
    align-items: center
    margin-top: 18px
    span
      font-family: $font-family-sf-pro-display
      @include body-5-regular
      margin-left: 5px
      color: $color-black-1

  .cancel-btn
    margin-top: 30px
    padding: 15px 45px
    span
      font-family: $font-family-sf-pro-display
      @include body-17-medium
      color: $color-blue-20
</style>
