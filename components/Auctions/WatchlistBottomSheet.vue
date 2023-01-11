<template>
  <div>
    <vue-bottom-sheet ref="watchlistsSheet" @closed="$emit('close')">
      <div class="watchlist-title">{{ $t('auctions.frontpage.add_to_watchlist') }}</div>
      <div class="watchlist-content">
        <div v-if="watchlists.length" class="list-section">
          <div
            v-for="list in watchlists"
            :key="`watchlist-${list.id}`"
            class="d-flex align-items-center watchlist-item"
            @click="handleWatchlistClick(list)"
          >
            <div class="image-section">
              <ProductThumb :src="list.image" />
            </div>
            <div class="ml-2 text-truncate">{{ list.name }}</div>
          </div>
        </div>
        <div
          class="watchlist-btn d-flex align-items-center justify-content-end"
          @click="openNewWatchList"
        >
          <div class="image-section">
            <Icon src="plus_circle_fill.svg" width="18" height="18" />
          </div>
          <div class="ml-1">{{ $t('shopping_cart.create_new_list') }}</div>
        </div>
        <div class="text-center">
          <div class="watchlist-cancel-btn" role="button" @click="$refs.createNewListSheet.close()">{{ $t('common.cancel') }}</div>
        </div>
      </div>
    </vue-bottom-sheet>

    <vue-bottom-sheet ref="createNewListSheet">
      <div class="filters-sheet-title create-list-title d-flex align-items-center justify-content-between">
        <div>{{ $t('wish_lists.create_new_list') }}</div>
        <div class="create-list-cancel-btn" role="button" @click="$refs.createNewListSheet.close()">{{ $t('common.cancel') }}</div>
      </div>
      <div class="flex-shrink-1 overflow-auto filters-sheet-content">
        <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
          <b-container fluid>
            <b-form @submit.stop.prevent="handleSubmit(createNewList)">
              <b-row class="privacy-row">
                <b-col class="px-0">
                  <CheckboxSwitch
                    v-model="newListPrivacy"
                    :label-on="$t('common.public').toUpperCase()"
                    :label-off="$t('common.private').toUpperCase()"
                  />
                </b-col>
              </b-row>
              <b-row class="name-row">
                <b-col class="px-0">
                  <ValidationProvider
                    v-slot="validationContext"
                    :name="$t('watchlists.list_name')"
                    :rules="{ required: true, min: 3, max: 255 }"
                  >
                    <b-form-group
                      label-for="list-name"
                      :label="$t('watchlists.list_name')"
                    >
                      <b-form-input
                        id="list-name"
                        v-model="newListName"
                        aria-describedby="input-live-help"
                        trim
                        :state="getValidationState(validationContext)"
                      ></b-form-input>
                      <b-form-invalid-feedback>{{
                          validationContext.errors[0]
                        }}</b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>
                </b-col>
              </b-row>
              <div class="d-flex align-items-center">
                <Button
                  ref="btnSave"
                  type="submit"
                  variant="dark-blue"
                  class="create-list-btn"
                  pill
                  block
                  :disabled="!newListName || loading"
                >
                  {{ $t('watchlists.create_list') }}
                </Button>
              </div>
            </b-form>
          </b-container>
        </ValidationObserver>
      </div>
    </vue-bottom-sheet>

    <vue-bottom-sheet ref="listedCreatedSheet" max-height="90%">
      <div class="d-flex flex-column h-100 filters-sheet">
        <div class="filters-sheet-title text-center">
          {{ $t('wish_lists.create_new_list') }}
        </div>
        <div v-if="currentProduct" class="flex-shrink-1 overflow-auto filters-sheet-content p-3 listed-created">
          <div class="body-text">
            {{ $t('wish_lists.one_item_added', { list: newWatchlist.name }) }}
          </div>
          <div class="d-flex align-items-center justify-content-center mt-2">
            <div class="img-product">
              <ProductThumb :product="currentProduct" />
            </div>
            <div class="d-flex flex-column ml-3">
              <div class="product-title">{{ currentProduct.name }}</div>
              <div class="product-color">{{ currentProduct.colorway }}</div>
            </div>
          </div>
          <div class="mt-3 d-flex align-items-center justify-content-between">
            <Button
              variant="outline-dark"
              pill
              @click="$router.push(`/profile/watchlist?id=${newWatchlist.id}`)"
            >
              {{ $t('wish_lists.view_list') }}
            </Button>
            <Button variant="primary" pill @click="$refs.listedCreatedSheet.close()">
              {{ $t('wish_lists.continue_shopping') }}
            </Button>
          </div>
        </div>
      </div>
    </vue-bottom-sheet>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Icon from '~/components/common/Icon'
import ProductThumb from '~/components/product/Thumb.vue'
import { WATCHLIST_TYPE_AUCTION } from '~/static/constants'
import Button from '~/components/common/Button.vue'
import CheckboxSwitch from '~/components/common/CheckboxSwitch'

export default {
  name: 'WatchlistSheet',

  components: {
    Icon,
    ProductThumb,
    Button,
    ValidationObserver,
    ValidationProvider,
    CheckboxSwitch,
  },

  props: {
    auction: {
      type: Object,
      required: true,
    },
    open: {
      type: Boolean,
      default: false,
    }
  },

  data: () => {
    return {
      watchlist: {},
      newListName: '',
      newListPrivacy: false,
      loading: false,
      newWatchlist: {},
    }
  },

  computed: {
    ...mapGetters({
      watchlists: 'watchlist/getWatchlists',
      getWatchlistsType: 'watchlist/getWatchlistsType',
    }),
    currentProduct() {
      return this.auction && this.auction.auction_items && this.auction.auction_items[0] && this.auction.auction_items[0].inventory.product
    }
  },

  watch: {
    open(newV) {
      if (newV) {
        this.$refs.watchlistsSheet.open()
      }
    }
  },

  methods: {
    ...mapActions({
      addItemsToWatchlist: 'watchlist/addItemsToWatchlist',
      createWatchlist: 'watchlist/createWatchlist',
    }),

    // Create new wishlist
    createNewList() {
      if (this.newListName) {
        this.loading = true
        this.createWatchlist({
          name: this.newListName,
          type: this.getWatchlistsType,
          privacy: this.newListPrivacy ? 'public' : 'private',
        })
        .then((watchlist) => {
          this.loading = false
          this.$refs.createNewListSheet.close()
          this.handleWatchlistCreated(watchlist)
        })
        .catch(error => {
          this.loading = false
          this.$toasted.error(this.$t(error.response.data.error))
        })
      }
    },
    getValidationState({ dirty, validated, valid = null }) {
      // Returns the contextual state (validation style) of the element being validated (false for invalid, true for valid, or null for no validation state)
      return dirty || validated ? valid : null
    },

    openNewWatchList() {
      this.$refs.watchlistsSheet.close()
      this.$refs.createNewListSheet.open()
    },

    async handleWatchlistClick(list) {
      const data = await this.addItemsToWatchlist({
        watchlist: list,
        ids: [this.auction.id],
        type: WATCHLIST_TYPE_AUCTION,
      })
      this.$emit('watchlisted', data)
      this.$refs.watchlistsSheet.close()
    },

    async handleWatchlistCreated(watchlist) {
      const data = await this.addItemsToWatchlist({
        watchlist,
        ids: [this.auction.id],
        type: WATCHLIST_TYPE_AUCTION,
      })
      this.$emit('watchlisted', data)
      this.newWatchlist = watchlist
      this.$nextTick(() =>
        this.$refs.listedCreatedSheet.open()
      )
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'


.bottom-sheet::v-deep
  .bottom-sheet__content
    overflow: hidden
.filters-sheet-content
  padding: 0
  .watchlist-item
    color: $color-black-1
    padding: 10px 20px
    cursor: pointer
    position: relative
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
  &.listed-created
    .btn
      @include body-10
    .body-text
      @include body-5
      font-weight: $normal
    .img-product
      width: 100px
    .product-title
      @include body-5
      font-weight: $medium
      color: $black
    .product-color
      @include body-5
      font-weight: $regular
      color: $color-gray-5

.create-list
  &-title
    padding-left: 20px
    padding-right: 18px
  &-cancel-btn
    font-family: $font-sp-pro
    font-weight: $medium
    @include body-34
    color: $color-blue-20
  &-btn.btn.btn-dark-blue
    font-family: $font-sp-pro
    font-weight: $medium
    @include body-4b
    color: $white
    width: 216px
    height: 40px
    margin: 50px auto 20px
    border: none
    &:disabled
      color: $color-gray-47
      background-color: $color-gray-1
.watchlist
  &-title 
    padding: 0 29px 17px
    font-family: $font-sp-pro
    font-weight: $bold
    @include body-32
    color: $black
  &-item
    margin: 17px 16px 21px
    height: 50px
    border: 1px solid $color-white-12
    font-family: $font-sp-pro
    font-weight: $regular
    @include body-5
    color: $black
    border-radius: 8px
    padding: 5px 17px
    .image-section
      margin-right: 36px
      .thumb-wrapper::v-deep
        width: 40px
        height: 40px
      
  &-btn
    font-family: $font-sp-pro
    font-weight: $regular
    @include body-1424
    color: $black
    padding: 1px 21px
  &-cancel-btn 
    font-family: $font-sp-pro
    font-weight: $medium
    @include body-34
    color: $color-blue-20
    margin: 23px auto 7px
.privacy-row
  padding: 12px 20px 15px
  border-bottom: 0.5px solid $color-gray-47
.name-row
  padding: 14px 24px 0 20px
  .form-group::v-deep
    label
      font-family: $font-sp-pro
      font-weight: $bold
      @include body-5
      letter-spacing: -0.02em
      color: $black
      margin-bottom: 11px
    .invalid-feedback
      position: absolute
      top: 78%

::v-deep .checkbox-switch
  line-height: 32px
  span[role='button']
    font-family: $font-montserrat
    @include body-5
    margin-top: 7px
    font-weight: $bold
    letter-spacing: -0.02em

  .custom-switch
    height: 31px
    margin-right: 20px
    .custom-control-label::before
      background-color: rgba(120, 120, 128, 0)
      border: none
      height: 31px
      width: 51px
      box-shadow: none
      background-image: url('~/assets/img/profile/wishlist/toggle-bg.svg')
      background-repeat: no-repeat

    .custom-control-label::after
      background: $color-white
      border: 0.5px solid rgba(0, 0, 0, 0.04)
      box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.15), 0px 3px 1px rgba(0, 0, 0, 0.06)
      width: 27px
      height: 27px
      border-radius: 100%

    .custom-control-input:checked ~ .custom-control-label::after
      transform: translateX(1.27rem)
</style>
