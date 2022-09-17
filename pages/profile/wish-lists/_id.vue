<template>
  <b-container fluid class="container-wishlists">
    <div class="d-flex justify-content-between header">
      <div class="title">
        <h2>{{ currentWishList && currentWishList.name }}</h2>
        <span>({{ totalCount }} items)</span>
      </div>
    </div>

    <div class="d-flex align-items-center">
      <div class="btn-categories flex-grow-1 text-center">
        <NavGroup
          v-model="category"
          nav-key="category"
          :data="CATEGORIES"
          @change="handleCategoryClick"
        />
      </div>
    </div>

    <div class="section-items p-3">
      <Loader v-if="loading" class="my-5" />

      <div v-else>
        <b-row v-if="listProducts.length > 0">
          <b-col
            v-for="product in listProducts"
            :key="`wish-list-item-${product.id}-${currentWishList.id}`"
            lg="3"
            md="4"
            sm="6"
            class="card-container"
          >
            <ProductCard :product="product" :show-actions="!isMyWishList" />
          </b-col>
        </b-row>
        <div v-else class="text-center">
          <div v-if="isMyWishList">
            <p class="mt-5">
              {{ $t('wish_lists.no_items_info') }}
            </p>
            <Button
              variant="primary"
              class="mt-4"
              pill
              @click="handleBrowseClick"
            >
              {{ $t('wish_lists.browse_items') }}
            </Button>
          </div>
          <div v-else>
            <p class="mt-5">
              {{ $t('wish_lists.no_items_info2') }}
            </p>
          </div>
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
  </b-container>
</template>
<script>
import { mapActions } from 'vuex'
import NavGroup from '~/components/common/NavGroup.vue'
import ProductCard from '~/components/product/Card.vue'
import Pagination from '~/components/common/Pagination'
import Button from '~/components/common/Button'
import Loader from '~/components/common/Loader.vue'

export default {
  name: 'WishListsId',

  components: {
    NavGroup,
    ProductCard,
    Pagination,
    Button,
    Loader,
  },

  layout: 'IndexLayout',

  data() {
    return {
      category: 'all',
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
      currentWishList: null,
      listProducts: [],
      currentPage: 1,
      perPage: 0,
      totalCount: 0,
      loading: false,
    }
  },

  async fetch() {
    this.loading = true
    if (this.$route.params?.id) {
      this.currentWishList = await this.findWishList({
        id: this.$route.params.id,
      })
    }
    if (this.currentWishList) {
      await this.getWishListItems()
    }
    this.loading = false
  },

  computed: {
    isMyWishList() {
      return this.$store.state?.auth?.user?.id === this.currentWishList.user_id
    },
  },

  methods: {
    ...mapActions({
      findWishList: 'wish-list/findWishList',
      fetchWishListItems: 'wish-list/fetchWishListItems',
    }),

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
  },
}
</script>
