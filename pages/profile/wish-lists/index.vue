<template>
  <b-container fluid class="container-wishlists">
    <div v-if="!currentWishList" class="section-no-list text-center py-5">
      <p class="mb-3">
        {{ $t('wish_lists.no_wish_lists') }}
      </p>

      <Button
        v-b-modal.create-list-modal
        variant="primary"
        class="mx-auto"
        pill
      >
        {{ $t('wish_lists.create_new_list') }}
      </Button>
    </div>

    <div v-else>
      <div class="d-flex justify-content-between header">
        <div v-if="!!currentWishList" class="title">
          <h2 class="text-truncate mw-800px">{{ currentWishList.name }}</h2>
          <span>({{ totalCount }} items)</span>
        </div>

        <CheckboxSwitch
          v-if="!!currentWishList"
          :value="currentWishList.privacy === 'public'"
          label-on="PUBLIC"
          label-off="PRIVATE"
          @change="togglePrivacy"
        />
      </div>

      <div
        v-if="!!currentWishList && action === 'none'"
        class="d-flex align-items-center"
      >
        <div class="btn-categories flex-grow-1 text-center">
          <NavGroup
            v-model="category"
            nav-key="category"
            :data="CATEGORIES"
            @change="handleCategoryClick"
          />
        </div>

        <div class="btn-edit">
          <b-dropdown
            variant="link"
            toggle-class="text-decoration-none"
            no-caret
            right
          >
            <template #button-content>
              {{ $t('wish_lists.edit_list') }}
            </template>
            <b-dropdown-item
              :disabled="
                listProducts.length === 0 || getMovableWishLists().length === 0
              "
              @click="setAction('move')"
            >
              {{ $t('wish_lists.move_items') }}
            </b-dropdown-item>
            <b-dropdown-item
              :disabled="listProducts.length === 0"
              @click="setAction('remove')"
            >
              {{ $t('wish_lists.remove_items') }}
            </b-dropdown-item>
            <b-dropdown-item v-b-modal.create-list-modal>
              <img src="~/assets/img/icons/plus_blue.svg" />
              {{ $t('wish_lists.create_list') }}
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>

      <div class="d-flex justify-content-between">
        <div class="d-flex flex-column flex-shrink-0">
          <section
            v-if="wishLists.length > 0"
            :class="`section-lists ${action !== 'none' ? 'mt' : ''}`"
          >
            <h5>{{ $t('wish_lists.buying_lists') }}</h5>

            <div v-for="list in wishLists" :key="list.id" class="px-2">
              <Button
                :pressed="list.id === currentWishList.id"
                variant="link"
                class="text-truncate mw-300px"
                @click="selectWishList(list)"
              >
                {{ list.name }}
              </Button>

              <div
                v-if="
                  list.id === currentWishList.id &&
                  currentWishList.privacy === 'public'
                "
                class="share-block"
              >
                <h6>{{ $t('common.share').toUpperCase() }}</h6>
                <ShareButton
                  :url="shareUrl + list.id"
                  :title="list.name"
                  :description="shareDescription"
                />
              </div>
            </div>
          </section>
        </div>

        <div v-if="!!currentWishList" class="section-items flex-grow-1">
          <div
            v-if="!!currentWishList && action !== 'none'"
            class="bulk-select-section"
          >
            <BulkSelectToolbar
              ref="bulkSelectToolbar"
              :active="action !== 'none'"
              :selected="selected"
              :unitLabel="$tc('common.product', selected.length)"
              :successLabel="$tc('wish_lists.products_removed_from_wishlist')"
              :total="listProducts.length"
              @close="cancelAction()"
              @selectAll="handleSelectAll()"
              @deselectAll="handleDeselectAll()"
              @undo="handleUndoBulkAction()"
            />
          </div>

          <Loader v-if="loading" class="my-5" />

          <div v-else>
            <b-row v-if="listProducts.length > 0">
              <b-col
                v-for="product in listProducts"
                :key="`wish-list-item-${product.id}-${currentWishList.id}`"
                class="card-container"
              >
                <ProductCard
                  :product="product"
                  :selectable="action === 'move' || action === 'remove'"
                  :selected="!!selected.find((id) => id == product.id)"
                  :show-actions="false"
                  @select="selectItem"
                />
              </b-col>
            </b-row>

            <div v-else class="text-center no-itmes">
              <p class="mt-5">
                {{ $t('wish_lists.no_items_info') }}
              </p>

              <Button
                variant="primary"
                class="mt-4 mx-auto"
                pill
                @click="handleBrowseClick"
              >
                {{ $t('wish_lists.browse_items') }}
              </Button>
            </div>

            <div class="mt-m1">
              <div
                v-if="action === 'remove' && listProducts.length > 0"
                class="action-container"
              >
                <Button
                  variant="primary"
                  :disabled="selected.length === 0"
                  @click="removeSelected"
                >
                  {{ $t('wish_lists.remove_selected') }}
                </Button>
              </div>

              <div
                v-if="action === 'move' && listProducts.length > 0"
                class="action-container"
              >
                <Button
                  v-for="(list, index) in getMovableWishLists()"
                  :key="`move-to-wishlist-${list.id}`"
                  :disabled="selected.length === 0"
                  :variant="BUTTON_VARIANTS[index % 4]"
                  @click="moveSelected(list)"
                >
                <div
                  class="text-truncate mw-300px"
                >
                  {{ $t('wish_lists.move_to_list', { list: list.name }) }}
                </div>
                </Button>
              </div>

              <Pagination
                v-if="listProducts.length > 0"
                v-model="currentPage"
                :total="totalCount"
                :per-page="perPage"
                :per-page-options="[5, 10, 15, 20, 25]"
                class="mt-2"
                @page-click="handlePageClick"
                @per-page-change="handlePerPageChange"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <CreateWishListModal @created="handleCreated" />
  </b-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import CheckboxSwitch from '~/components/common/CheckboxSwitch.vue'
import NavGroup from '~/components/common/NavGroup.vue'
import ShareButton from '~/components/common/ShareButton.vue'
import Button from '~/components/common/Button.vue'
import Loader from '~/components/common/Loader.vue'
import ProductCard from '~/components/product/Card.vue'
import CreateWishListModal from '~/components/modal/CreateWishList'
import BulkSelectToolbar from '~/components/common/BulkSelectToolbar'
import Pagination from '~/components/common/Pagination'

export default {
  name: 'WishLists',

  components: {
    CheckboxSwitch,
    NavGroup,
    ShareButton,
    Button,
    Loader,
    ProductCard,
    CreateWishListModal,
    BulkSelectToolbar,
    Pagination,
  },

  layout: 'Profile',

  middleware: 'auth',

  fetchOnServer: false,

  data() {
    return {
      category: 'all',
      action: 'none', // 'move' or 'remove'
      CATEGORIES: [
        {
          label: this.$t('wish_lists.categories.all'),
          value: 'all',
        },
        {
          label: this.$t('wish_lists.categories.footwear'),
          value: 'sneakers',
        },
        {
          label: this.$t('wish_lists.categories.apparel'),
          value: 'apparel',
        },
        {
          label: this.$t('wish_lists.categories.accessories'),
          value: 'accessories',
        },
      ],
      BUTTON_VARIANTS: ['primary', 'info', 'warning', 'dark'],
      currentWishList: null,
      listProducts: [],
      selected: [],
      removed: [],
      moved: [],
      movedWishList: null,
      currentPage: 1,
      totalCount: 0,
      perPage: 15,
      loading: false,
      shareDescription: this.$t('wish_lists.share_description'),
      shareUrl: process.env.APP_URL + '/profile/wish-lists/',
    }
  },

  async fetch() {
    await this.fetchWishLists()
    if (this.$route.query?.id) {
      const wishList = this.wishLists.find(
        (list) => list.id === parseInt(this.$route.query.id)
      )
      if (wishList) {
        await this.selectWishList(wishList)
        return
      }
    }
    await this.selectWishList(this.wishLists[0])
  },

  computed: {
    ...mapGetters({
      wishLists: 'wish-list/getWishLists',
    }),
  },

  methods: {
    ...mapActions({
      fetchWishLists: 'wish-list/fetchWishLists',
      updateWishListPrivacy: 'wish-list/updateWishListPrivacy',
      fetchWishListItems: 'wish-list/fetchWishListItems',
      removeProductsFromWishList: 'wish-list/removeProductsFromWishList',
      moveWishListItems: 'wish-list/moveWishListItems',
      addProductsToWishList: 'wish-list/addProductsToWishList',
    }),

    handleCreated(wishList) {
      this.selectWishList(wishList);
      this.$forceUpdate();
    },

    // Called when user select a wishlist in the lists
    // Fetch list products and pagination details for selected wishlist
    async selectWishList(wishList) {
      this.cancelAction()
      this.category = 'all'
      if (wishList) {
        this.currentWishList = wishList
        this.currentPage = 1
        await this.getWishListItems()
      } else {
        this.currentWishList = null
        this.listProducts = []
      }
    },

    // Called when user click move/delete item buttons
    setAction(mode) {
      if (this.listProducts.length > 0) {
        this.selected = []
        this.action = mode
      }
    },

    // Called when user select products to move/delete products from wishlist
    selectItem(id, checked) {
      if (checked) {
        this.selected.push(id)
      } else {
        this.selected.splice(this.selected.indexOf(id), 1)
      }
    },

    // Get target wishlists to move products from current wishlist
    getMovableWishLists() {
      return this.wishLists.filter(
        (list) => list.id !== this.currentWishList.id
      )
    },

    // Cancel moving/deleting products
    cancelAction() {
      this.action = 'none'
      this.selected = []
    },

    // Remove selected products from current wishlist
    async removeSelected() {
      if (this.selected.length > 0) {
        await this.removeProductsFromWishList({
          wishList: this.currentWishList,
          ids: this.selected,
        })
        this.removed = this.listProducts.filter((product) =>
          this.selected.includes(product.id)
        )
        this.listProducts = this.listProducts.filter(
          (product) => !this.selected.includes(product.id)
        )
        this.selected = []
        this.$refs.bulkSelectToolbar.showSuccess(
          this.$tc(
            'wish_lists.products_removed_from_wishlist',
            this.removed.length,
            {
              n: this.removed.length,
            }
          )
        )
      }
    },

    // Move selected products from current wishlist to another
    async moveSelected(wishList) {
      if (this.selected.length > 0) {
        await this.moveWishListItems({
          wishList: this.currentWishList,
          ids: this.selected,
          targetId: wishList.id,
        })
        this.movedWishList = wishList
        this.moved = this.listProducts.filter((product) =>
          this.selected.includes(product.id)
        )
        this.listProducts = this.listProducts.filter(
          (product) => !this.selected.includes(product.id)
        )
        this.selected = []
        this.$refs.bulkSelectToolbar.showSuccess(
          this.$tc('wish_lists.products_moved', this.moved.length, {
            n: this.moved.length,
            wishlist: wishList.name,
          })
        )
      }
    },

    // Update privacy of current wishlist
    togglePrivacy(privacy) {
      this.updateWishListPrivacy({
        wishList: this.currentWishList,
        privacy: privacy ? 'public' : 'private',
      })
    },

    // Fetch wishlist products and pagination information
    async getWishListItems() {
      this.loading = true
      const res = await this.fetchWishListItems({
        wishList: this.currentWishList,
        page: this.currentPage,
        perPage: this.perPage,
        category: this.category !== 'all' ? this.category : null,
      })
      this.perPage = parseInt(res.per_page)
      this.totalCount = res.total
      this.listProducts = res.data
      this.loading = false
    },

    // Called when user navigate from current page to another
    handlePageClick(bvEvent, page) {
      if (this.currentPage !== page) {
        this.currentPage = page
        this.getWishListItems()
      }
    },

    handlePerPageChange(value) {
      if (this.perPage !== value) {
        this.perPage = value
        this.currentPage = 1
        this.getWishListItems()
      }
    },

    // Called when user switch product category(all, footwear, apparel, accessories)
    handleCategoryClick(category) {
      if (category) {
        this.category = category
        this.currentPage = 1
        this.getWishListItems()
      }
    },

    handleBrowseClick() {
      this.$router.push({
        path: '/browse',
        query: { category: this.category },
      })
    },

    handleSelectAll() {
      this.selected = this.listProducts.map((p) => p.id)
    },

    handleDeselectAll() {
      this.selected = []
    },

    async handleUndoBulkAction() {
      if (this.action === 'remove') {
        await this.addProductsToWishList({
          wishList: this.currentWishList,
          ids: this.removed.map((p) => p.id),
        })
        this.listProducts.push(...this.removed)
        this.removed = []
      } else if (this.action === 'move') {
        await this.moveWishListItems({
          wishList: this.movedWishList,
          ids: this.moved.map((p) => p.id),
          targetId: this.currentWishList.id,
        })
        this.listProducts.push(...this.moved)
        this.moved = []
        this.movedWishList = null
      }
      this.$refs.bulkSelectToolbar.showSuccess(null)
    },
  },
}
</script>
<style scoped lang="sass">
.mw-300px
  max-width: 300px

.mw-800px
  max-width: 800px

.no-itmes
  padding-right: 300px
</style>
