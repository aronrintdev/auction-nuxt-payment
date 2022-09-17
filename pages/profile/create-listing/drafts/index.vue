<template>
  <div class="vd-create-listing-section">
    <b-container fluid class="vendor-dashboard-body">
      <!-- Back to Listing -->
      <b-row class="back-to-search">
        <b-col md="12" cols="12">
          <span role="button" @click="backToCreateListing">
            <img
              :src="require('~/assets/img/icons/back.svg')"
              class="img-fluid"
            />
            {{ $t('createlisting.back_to_createlisting') }}
          </span>
        </b-col>
      </b-row>
      <!-- ./Back to Listing -->
      
      <!-- Listing Drafts heading -->
      <b-row class="mb-bb h-100">
        <b-col md="12" lg="12" class="vd-create-listing-css">
          <div class="purchase-heading">
            {{ $t('createlisting.listing_drafts') }}
          </div>
        </b-col>
      </b-row>
      <!-- ./ Listing Drafts heading -->
      <!-- Search Input -->
      <b-row class="search-row mt-md-4 mt-4">
        <b-col md="12" class="search-col">
          <div class="form browse-search rounded w-75">
            <div class="form-group selling-search-input">
              <img
                :src="require('~/assets/img/icons/search.svg')"
                alt="Search"
                class="icon-search"
              />
              <input
                id="selling-search-input"
                type="text"
                :placeholder="$t('createlisting.search_draft')"
                @input="searchDrafts"
              />
            </div>
          </div>
        </b-col>
      </b-row>
      <!-- ./Search Input -->

      <!-- Nav -->
      <b-row class="nav-group-row mt-md-4 mt-4 text-center">
        <b-col md="12">
          <NavGroup
            :data="categoryItems"
            :value="currentCategory"
            nav-key="auctions_ending_soon"
            class="section-nav"
            @change="handleCategoryChange"
          />
        </b-col>
      </b-row>
      <!-- ./Nav -->

      <!-- If category is selling -->
      <SellingDraft
        v-if="currentCategory === 'selling'"
        :searchResult="searchResult"
      />
      <!-- ./Selling -->
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { NavGroup } from '~/components/common'
import SellingDraft from '~/components/profile/create-listing/draft/selling'
export default {
  name: 'CreateListingDrafts',

  components: {
    NavGroup,
    SellingDraft,
  },

  layout: 'Profile',

  data() {
    return {
      searchValue: '',
      categoryItems: [
        { label: this.$t('home.selling'), value: 'selling' },
        { label: this.$t('navbar.auction'), value: 'auction' },
        { label: this.$t('navbar.trade'), value: 'trade' },
      ],
      currentCategory: 'selling',
      searchResult: [],
    }
  },

  computed: {
    ...mapGetters({
      draftListingItem: 'listingItems/listingSavedAsDraft',
    }),
  },

  mounted() {
    this.searchResult = this.draftListingItem
  },

  methods: {
    // Move to create listing page
    backToCreateListing() {
      this.$router.push({
        path: '/profile/create-listing',
      })
    },

    // On nav change
    handleCategoryChange(value) {
      this.currentCategory = value
    },

    // Filter the stored listings.
    searchDrafts(e) {
      const arr = []
      const result = this.draftListingItem
      // if not input, return the complete listings
      if (!e.target.value) {
        this.searchResult = result
      } else {
        // input to lowercase
        const searchValue = e.target.value.toLowerCase()
        // eslint-disable-next-line array-callback-return
        this.draftListingItem.map((i) => {
          // If matches
          if (
            (
              i.product.name.toLowerCase() ||
              i.product.brand.toLowerCase() ||
              i.product.sku.toLowerCase()
            ).includes(searchValue)
          ) {
            arr.push(i)
            this.searchResult = arr
          } else {
            this.searchResult = arr
          }
        })
      }
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.browse-search
  input
    background-color: $color-white-1
</style>