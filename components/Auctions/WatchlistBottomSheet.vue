<template>
  <div>
    <vue-bottom-sheet ref="watchlistsSheet" @closed="$emit('close')">
      <div class="d-flex flex-column h-100 filters-sheet">
        <div class="filters-sheet-title text-center">{{ $t('auctions.frontpage.watchlist') }}</div>
        <div class="flex-shrink-1 overflow-auto filters-sheet-content">
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
              <div class="overlay"></div>
            </div>
          </div>
          <div
            class="create-section d-flex align-items-center"
            @click="openNewWatchList"
          >
            <div class="image-section">
              <Icon src="plus_blue.svg" width="26" height="26" />
            </div>
            <div class="ml-2">{{ $t('wish_lists.create_list') }}</div>
          </div>
        </div>
      </div>
    </vue-bottom-sheet>

    <vue-bottom-sheet ref="createNewListSheet">
      <div class="d-flex flex-column h-100 filters-sheet">
        <div class="filters-sheet-title text-center">{{ $t('wish_lists.create_new_list') }}</div>
        <div class="flex-shrink-1 overflow-auto filters-sheet-content">
          <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
            <b-container fluid class="p-3">
              <b-form @submit.stop.prevent="handleSubmit(createNewList)">
                <b-row>
                  <b-col md="10" offset-md="1">
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
                <b-row>
                  <b-col md="10" offset-md="1">
                    <b-form-text id="input-live-help">
                      {{ $t('watchlists.create_list_helper') }}
                    </b-form-text>
                  </b-col>
                </b-row>
                <b-row class="mt-3">
                  <b-col md="10" offset-md="1">
                    <CheckboxSwitch
                      v-model="newListPrivacy"
                      :label-on="$t('common.public').toUpperCase()"
                      :label-off="$t('common.private').toUpperCase()"
                    />
                  </b-col>
                </b-row>
                <div class="mt-3 d-flex align-items-center">
                  <Button
                    ref="btnSave"
                    type="submit"
                    variant="primary"
                    pill
                    block
                    :disabled="!newListName || loading"
                  >
                    {{ $t('watchlists.create_list') }}
                  </Button>
                  <span class="mx-3">&nbsp;</span>
                  <Button
                    variant="outline-dark"
                    pill
                    block
                    @click.prevent="$refs.createNewListSheet.close()"
                  >
                    {{ $t('common.cancel') }}
                  </Button>
                </div>
              </b-form>
            </b-container>
          </ValidationObserver>
        </div>
      </div>
    </vue-bottom-sheet>

    <vue-bottom-sheet ref="listedCreatedSheet">
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
    async createNewList() {
      if (this.newListName) {
        this.loading = true
        const watchlist = await this.createWatchlist({
          name: this.newListName,
          type: this.getWatchlistsType,
          privacy: this.newListPrivacy ? 'public' : 'private',
        })
        this.loading = false
        this.$refs.createNewListSheet.close()
        this.handleWatchlistCreated(watchlist)
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
</style>
