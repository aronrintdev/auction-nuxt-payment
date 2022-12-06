<template>
  <b-container fluid class="container-wishlists">
    <div v-if="!currentWishList" class="section-no-list text-center py-5">
      <p class="mb-3">
        {{ $t('wish_lists.no_wish_lists') }}
      </p>

      <Button
        v-if="!isScreenXS"
        v-b-modal.create-list-modal
        variant="primary"
        class="mx-auto"
        pill
      >
        {{ $t('wish_lists.create_new_list') }}
      </Button>
      <Button
        v-if="isScreenXS"
        variant="primary"
        class="mx-auto"
        pill
        @click="mobileFiltersOpen = !mobileFiltersOpen"
      >
        {{ $t('wish_lists.create_new_list') }}
      </Button>
    </div>

    <div v-else>
      <div class="d-none d-sm-flex justify-content-between header">
        <div v-if="!!currentWishList" class="title">
          <h2 class="text-truncate mw-800px">{{ currentWishList.name }}</h2>
          <span>({{ totalCount }} items)</span>
        </div>

        <div
          class="navigation-tabs d-flex align-items-baseline justify-content-center"
        >
          <h3
            v-for="(tab, index) in tabs"
            :key="index"
            class="fs-20 fw-6 font-primary cursor-pointer mr-5 mb-0"
            :class="[activeTab === tab.value ? 'active' : '']"
            @click="handleTabs(tab.value)"
          >
            {{ tab.label }}
          </h3>
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
        class="d-none d-sm-flex align-items-center"
      >
        <div class="btn-categories flex-grow-1 text-center">
          <NavGroup
            v-model="category"
            nav-key="category"
            class="tablist"
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
            <b-dropdown-item v-b-modal.edit-list-modal
            >
              {{ $t('wish_lists.rename_list') }}
            </b-dropdown-item>
            <b-dropdown-item
              @click="handleDelete()"
            >
              {{ $t('wish_lists.delete_list') }}
            </b-dropdown-item>
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
      <NavGroup
        v-model="activeTab"
        nav-key="list-type"
        class="d-flex d-sm-none mb-4"
        :data="tabs"
        @change="handleTabs"
      />
      <div class="row wishlist-products-wrapper">
        <div class="d-flex flex-column flex-shrink-0 col-12 col-sm-3">
          <section
            v-if="wishLists.length > 0"
            :class="`section-lists ${action !== 'none' ? 'mt' : ''}`"
          >
            <h5 class="d-none d-sm-block px-2">
              {{ $t('wish_lists.buying_lists') }} <span v-b-modal.create-list-modal class="plus-sign">+</span>
            </h5>
            <div class="d-none d-sm-block wishlist-wrapper">
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
            </div>
            <div class="wishlist-mobile d-block d-sm-none">
              <div v-for="list in wishLists" :key="list.id" class="mb-4">
                <div class="d-flex">
                  <div class="thumb-wrapper">
                    <Thumb :src="list.image" />
                  </div>
                  <div
                    class="w-100 d-flex flex-column justify-content-between ml-3"
                  >
                    <div class="d-flex justify-content-between">
                      <div>
                        <h4 class="fs-14 fw-6 font-secondary mb-1">
                          {{ list.name }}
                        </h4>
                        <h6
                          class="fs-12 fw-5 text-gray-5 font-secondary text-capitalize"
                        >
                          {{ list.privacy }} List
                        </h6>
                      </div>
                      <div v-if="list.privacy === 'public'" :id="`popover-share-${list.id}`">
                        <img src="~/assets/img/icons/share.svg" alt="Share" width="19" height="19" class="d-block" />
                      </div>
                    </div>
                    <nuxt-link
                      class="btn btn-outline-dark w-100 rounded-pill fs-13 fw-6 font-primary mb-4 text-black"
                      :to="`/profile/wish-lists/${list.id}`"
                    >
                      View List
                    </nuxt-link>
                  </div>
                </div>
                <span
                  class="fs-14 fw-5 font-secondary text-gray-47 btn btn-link p-0 mt-3"
                  @click="handleMobileListEdit(list)"
                >
                  Edit
                </span>

                <b-popover
                  ref="sharePopover"
                  :target="`popover-share-${list.id}`"
                  triggers="click"
                  placement="bottom"
                  container="body"
                  custom-class="wishlist-popover"
                  delay="200"
                  @show="shareShow = true"
                  @hidden="shareShow = false"
                >
                  <ShareButton
                    :url="shareUrl + list.id"
                    :title="list.name"
                    :description="shareDescription"
                  />
                </b-popover>
              </div>


            </div>
          </section>
          <div class="d-flex justify-content-end align-self-end d-block d-sm-none">
            <span @click="mobileFiltersOpen = !mobileFiltersOpen"><img width="42" height="42" src="~/assets/img/icons/plus-icon-bg.svg" /></span>
          </div>
        </div>

        <div
          v-if="!!currentWishList"
          class="section-items d-none d-sm-block col-9"
        >
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
          <div class="infinite-wrapper mb-5">

            <b-row>
              <b-col
                v-for="(product, index) in listProducts"
                :key="`wish-list-item-${product.id}-${currentWishList.id}-${index}`"
                class="card-container"
              >
                <ProductCard
                  :product="product"
                  :selectable="action === 'move' || action === 'remove'"
                  :selected="!!selected.find((id) => id == product.id)"
                  :show-actions="false"
                  card-height="240px"
                  @select="selectItem"
                />
              </b-col>
            </b-row>
            <infinite-loading :identifier="infiniteId" @infinite="handleLoading" >
              <div slot="no-more"></div>
            </infinite-loading>

            <div v-if="listProducts.length === 0" class="text-center no-itmes">
            <p class="mt-5">
              {{ $t('wish_lists.no_items_info') }}
            </p>

            <Button
              variant="primary"
              class="mt-4 mx-auto browse-button"
              pill
              @click="handleBrowseClick"
            >
              {{ $t('wish_lists.browse_items') }}
            </Button>
          </div>
          </div>
          <div v-if="listProducts.length > 0" class="mt-m1">
            <div
              v-if="action === 'remove'"
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
              v-if="action === 'move'"
              class="action-container"
            >
              <Button
                v-for="(list, index) in getMovableWishLists()"
                :key="`move-to-wishlist-${list.id}`"
                :disabled="selected.length === 0"
                :variant="BUTTON_VARIANTS[index % 4]"
                @click="moveSelected(list)"
              >
                <div class="text-truncate mw-300px">
                  {{ $t('wish_lists.move_to_list', { list: list.name }) }}
                </div>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
    <Portal to="page-title"> Wishlist </Portal>
    <CreateWishListModal @created="handleCreated" />
    <EditWishListModal
      v-if="currentWishList"
      :key="currentWishListUpdate"
      :current-name="currentWishList && currentWishList.name"
      :list-id="currentWishList && currentWishList.id"
      @created="handleCreated"
      />
    <MobileCreateWishListModal
          :height="'40%'"
          :open="mobileFiltersOpen"
          :title="$t('wish_lists.create_new_list').toString()"
      >
    </MobileCreateWishListModal>
    <MobileEditWishListModal
          :key="currentWishList"
          :height="'40%'"
          :open="mobileEditList"
          :current-name="currentWishList && currentWishList.name"
          :list-id="currentWishList && currentWishList.id"
          :title="$t('wish_lists.rename_list').toString()"
      >
    </MobileEditWishListModal>
    <!-- On delete list -->
    <ConfirmModal
      id="confirm-wishlist-delete"
      :confirmLabel="$t('wish_lists.confirm_delete')"
      :message="$t('wish_lists.confirm_delete_message', { list: currentWishList && currentWishList.name })"
      @cancel="onCancel"
      @confirm="onConfirm"
    />
    <!-- End of  On delete list -->
  </b-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import CheckboxSwitch from '~/components/common/CheckboxSwitch.vue'
import NavGroup from '~/components/common/NavGroup.vue'
import ShareButton from '~/components/common/ShareButton.vue'
import Button from '~/components/common/Button.vue'
import ProductCard from '~/components/product/Card.vue'
import CreateWishListModal from '~/components/modal/CreateWishList'
import EditWishListModal from '~/components/modal/EditWishList'
import BulkSelectToolbar from '~/components/common/BulkSelectToolbar'
import Thumb from '~/components/product/Thumb'
import screenSize from '~/plugins/mixins/screenSize'
import MobileCreateWishListModal from '~/components/mobile/MobileCreateWishList'
import MobileEditWishListModal from '~/components/mobile/MobileEditWishList'
import { ConfirmModal } from '~/components/modal'

export default {
  name: 'WishLists',
  components: {
    CheckboxSwitch,
    NavGroup,
    ShareButton,
    Button,
    ProductCard,
    CreateWishListModal,
    EditWishListModal,
    BulkSelectToolbar,
    Thumb,
    MobileCreateWishListModal,
    ConfirmModal,
    MobileEditWishListModal,
  },
  mixins: [screenSize],
  layout: 'Profile',

  middleware: 'auth',

  fetchOnServer: false,

  data() {
    return {
      category: 'all',
      activeTab: 'single-item',
      tabs: [
        { label: 'Single Items', value: 'single-item' },
        { label: 'Shop by Style', value: 'shop-by-style' },
      ],
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
      currentWishListUpdate: 1,
      currentWishListMobileUpdate: 1,
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
      infiniteId: +new Date(),
      state: '',
      url: '',
      mobileFiltersOpen: false,
      mobileEditList: false,
    }
  },

  computed: {
    ...mapGetters({
      wishLists: 'wish-list/getWishLists',
    }),
  },
  async mounted (){
    const mobile = document.querySelector('.mobile-p-b')
    if (mobile) {
      mobile.classList.add('mobile-p-b-1')
    }
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
    this.url = `wish-lists/${this.currentWishList?.id}/items?page=1&per_page=${this.perPage}`
  },

  methods: {
    ...mapActions({
      fetchWishLists: 'wish-list/fetchWishLists',
      editWishList: 'wish-list/editWishList',
      deleteWishList: 'wish-list/deleteWishList',
      updateWishListPrivacy: 'wish-list/updateWishListPrivacy',
      fetchWishListItems: 'wish-list/fetchWishListItems',
      removeProductsFromWishList: 'wish-list/removeProductsFromWishList',
      moveWishListItems: 'wish-list/moveWishListItems',
      addProductsToWishList: 'wish-list/addProductsToWishList',
    }),

    handleLoading($state) {
      this.state = $state
      this.getWishListItems($state);
    },
    handleTabs(tab) {
      this.activeTab = tab
    },

    handleCreated(wishList) {
      this.selectWishList(wishList)
      this.infiniteId += 1
      this.$forceUpdate()
    },

    // Called when user select a wishlist in the lists
    // Fetch list products and pagination details for selected wishlist
    selectWishList(wishList) {
      this.cancelAction()
      this.category = 'all'
      if (wishList) {
        this.currentWishList = wishList
        this.currentPage = 1
        this.infiniteId += 1
        this.currentWishListUpdate += 1
      } else {
        this.currentWishList = null
        this.listProducts = []
        this.currentWishListUpdate += 1
      }
    },

    viewList(wishList) {
      this.selectWishList(wishList)
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
    getWishListItems($state) {
      this.loading = true
      this.fetchWishListItems({
        wishList: this.currentWishList,
        page: this.currentPage,
        perPage: this.perPage,
        category: this.category !== 'all' ? this.category : null,
      })
      .then((res) => {
        const that = this
        if (res.current_page === 1) {
          this.listProducts = [...res.data]
        } else {
          this.listProducts = [...that.listProducts, ...res.data]
        }
        $state.loaded()
        if (!res.next_page_url) {
          $state.complete()
        }else{
          this.currentPage += 1
          this.url = res.next_page_url
        }
      })
      .finally(() => {
        this.loading = false
      })
    },

    // Called when user navigate from current page to another
    handlePageClick(bvEvent, page) {
      if (this.currentPage !== page) {
        this.currentPage = page
        this.infiniteId += 1
      }
    },

    handlePerPageChange(value) {
      if (this.perPage !== value) {
        this.perPage = value
        this.currentPage = 1
      }
    },

    // Called when user switch product category(all, footwear, apparel, accessories)
    handleCategoryClick(category) {
      if (category) {
        this.category = category
        this.currentPage = 1
        this.infiniteId += 1
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

    // Remove selected products from current wishlist
    async removeWishlist() {
      await this.deleteWishList({
        id: this.currentWishList.id
      })
      this.$toasted.success(this.$tc('wish_lists.delete_success'))
      await this.fetchWishLists()
      await this.selectWishList(this.wishLists[0])
      this.infiniteId += 1
    },

    // Remove selected products from current wishlist
    async renameSelected() {
      if (this.selected.length > 0) {
        await this.editWishList({
          wishList: this.currentWishList,
          ids: this.selected,
        })
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

    handleDelete() {
      this.$bvModal.show('confirm-wishlist-delete')
    },

    // On confirm remove
    onConfirm() {
      this.removeWishlist()
    },
    // On cancel click, clear the value
    onCancel() {
      this.$emit('clearValue')
    },
    handleMobileListEdit(wishlist) {
      this.selectWishList(wishlist)
      this.mobileEditList = !this.mobileEditList
      this.currentWishListMobileUpdate += 1
    }
  },
}
</script>
<style scoped lang="sass">
@import '~/assets/css/_variables'
.text-gray-5
  color: $color-gray-5
.btn-primary, .browse-button
  background: $color-blue-10

.mw-300px
  max-width: 300px

.mw-800px
  max-width: 800px

.navigation-tabs
  h3
    color: $color-gray-47
    &:hover
      border-bottom: 1px solid $color-gray-47
    &.active
      border-bottom: 1px solid $color-black-1
      color: $color-black-1
      &:hover
        border-bottom: 1px solid $color-black-1
.tablist
::v-deep .btn-group
    width: 460px
    height: 32px
::v-deep .nav-group
  margin: 0
.wishlist-mobile
  .thumb-wrapper
    width: 164px
.no-itmes
  padding-right: 300px
.wishlist-products-wrapper
  margin-top: 20px
.infinite-wrapper
  overflow-y: auto
  overflow-x: hidden
  min-height: 500px
.wishlist-wrapper
  margin-left: -10px
::v-deep .checkbox-switch
  line-height: 32px
  .custom-switch
    height: 31px
    margin-right: 20px
    .custom-control-label::before
      background: rgba(120, 120, 128, 0.16)
      border: none
      height: 31px
      width: 51px
      border-radius: 40%
    .custom-control-label::after
      background: #FFFFFF
      border: 0.5px solid rgba(0, 0, 0, 0.04)
      box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.15), 0px 3px 1px rgba(0, 0, 0, 0.06)
      width: 27px
      height: 27px
      border-radius: 100%
.plus-sign
  @include body-4-normal
@media (max-width: 576px)
::v-deep .nav-group .btn-group
  height: 35px
</style>
<style lang="sass">
.mobile-p-b
  padding-bottom: 14px
.mobile-p-b-1
  padding-bottom: 14px !important
</style>
