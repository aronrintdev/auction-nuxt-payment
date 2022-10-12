<template>
  <div class="promotions-category-page">
    <div class="d-flex promotions-category-page-title">

    </div>
    <div v-if="loading" class="d-flex align-items-center justify-content-center h-500">
      <Loader :loading="loading"></Loader>
    </div>
    <div v-if="!loading && !currentSweepStake" class="p-5" >
      <div class="row filter-row-top">
        <!-- Input search -->
        <div class="col search-input-col vtpc-search p-lg-3 pt-3">
          <div class="form trade-search">
            <div
              class="
                form-group
                selling-search-input
                border
                d-flex
                align-items-center
                m-0
              "
            >
              <img
                :src="require('~/assets/img/icons/search.svg')"
                class="icon-search"
                alt="Search"
              />
              <input
                id="search-result"
                v-model="searchValue"
                type="text"
                class="
                  form-control form-input
                  vd-purchases-browse-input
                  bg-white
                "
                :placeholder="$t('selling_page.filter_details_placeholder')"
                autocomplete="on"
                @input="searchPurchase"
              />
            </div>
          </div>
        </div>
        <!-- ./Input search -->

        <!-- Sort By -->
        <div class="col sortby-col p-lg-3 pt-3">
          <CustomSelect
            id="category-types"
            :default="categorySelected"
            :threelineIcon="false"
            :options="{
              default: $t('vendor_purchase.sort_by'),
              priceAsc: $t('placed_offers.sort_by.price_low_high'),
              priceDesc: $t('placed_offers.sort_by.price_high_low'),
              dateAsc: $t('placed_offers.sort_by.date_listed_new_old'),
              dateDesc: $t('placed_offers.sort_by.date_listed_old_new'),
            }"
            @input="handleSortByChange"
          />
        </div>
      </div>

      <div class="row filter-row-bottom">
        <!-- Filter By -->
        <div class="col filter-by-col">
          <CustomSelect
            :default="filterBy"
            :threelineIcon="false"
            :options="{
              default: $t('deadstock_exchange.filters.categories'),
              accepted: $t('placed_offers.filter_by.accepted'),
              rejeced: $t('placed_offers.filter_by.rejected'),
              pending: $t('placed_offers.filter_by.awaiting_approval'),
            }"
            :title="filterByTitle"
            @input="handleFilterByChange"
          />
        </div>
        <!-- ./Filter By -->
        <!-- Filter By -->
        <div class="col filter-by-col">
          <CustomSelect
            :default="filterBy"
            :threelineIcon="false"
            :options="{
              default: $t('deadstock_exchange.filters.size_types'),
              accepted: $t('placed_offers.filter_by.accepted'),
              rejeced: $t('placed_offers.filter_by.rejected'),
              pending: $t('placed_offers.filter_by.awaiting_approval'),
            }"
            :title="filterByTitle"
            @input="handleFilterByChange"
          />
        </div>
        <!-- ./Filter By -->
        <!-- Filter By -->
        <div class="col filter-by-col">
          <CustomSelect
            :default="filterBy"
            :threelineIcon="false"
            :options="{
              default: $t('deadstock_exchange.filters.price_range'),
              accepted: $t('placed_offers.filter_by.accepted'),
              rejeced: $t('placed_offers.filter_by.rejected'),
              pending: $t('placed_offers.filter_by.awaiting_approval'),
            }"
            :title="filterByTitle"
            @input="handleFilterByChange"
          />
        </div>
        <!-- ./Filter By -->
        <!-- Filter By -->
        <div class="col filter-by-col">
          <CustomSelect
            :default="filterBy"
            :threelineIcon="false"
            :options="{
              default: $t('deadstock_exchange.filters.brands'),
              accepted: $t('placed_offers.filter_by.accepted'),
              rejeced: $t('placed_offers.filter_by.rejected'),
              pending: $t('placed_offers.filter_by.awaiting_approval'),
            }"
            :title="filterByTitle"
            @input="handleFilterByChange"
          />
        </div>
        <!-- ./Filter By -->
        <!-- Filter By -->
        <div class="col filter-by-col">
          <CustomSelect
            :default="filterBy"
            :threelineIcon="false"
            :options="{
              default: $t('deadstock_exchange.filters.years'),
              accepted: $t('placed_offers.filter_by.accepted'),
              rejeced: $t('placed_offers.filter_by.rejected'),
              pending: $t('placed_offers.filter_by.awaiting_approval'),
            }"
            :title="filterByTitle"
            @input="handleFilterByChange"
          />
        </div>
        <!-- ./Filter By -->


      </div>
    </div>

  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import {Loader} from '~/components/common';
import CustomSelect from '~/components/common/CustomSelect.vue'


export default {
  name: 'TopProductsList',
  components: {
    Loader,
    CustomSelect
  },
  props: {
    loading: {
      type: Boolean,
      required: true
    }
  },
  data(){
    return {
      searchValue:'',
      categorySelected: '', // For Sort by filter
      filterBy: '',
      showSuccessMessage: null,
      searchFilters: {
        startDate: '',
        endDate: '',
        keyWord: '',
        sortBy: '',
        filterBy: '',
        perPage: 8,
        page: 1,
      },
    }
  },
  computed: {
    ...mapGetters({
      promotions: 'promotions/getPromotions',
    }),
    currentSweepStake() {
      return this.promotions.length ? this.promotions[0] : null
    },
    entries() {
      return this.currentSweepStake && this.$auth.user ? this.currentSweepStake.promotion_entries.filter(entry => entry.user_id === this.$auth.user.id).length : 0
    },
  },
  methods: {
    learnMore() {
      this.$router.push({
        path: `/promotions/${this.currentSweepStake.id}`
      })
    },
        // Search Data
        searchPurchase() {
      this.loadData()
    },
  }
};
</script>
