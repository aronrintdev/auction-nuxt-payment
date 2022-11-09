<template>
  <div class="empty-wrapper">
    <b-row class="p-2 p-md-4">
      <b-col
        md="12"
        sm="12"
        class="vd-selling-Inventory d-flex justify-content-center"
      >
        <NavGroup
          v-if="userRole"
          :data="categoryItems"
          :value="currentCategory"
          nav-key="new_releases"
          class="section-nav"
          @change="handleCategoryChange"
        />
      </b-col>

      <b-col v-if="userRole" md="12" sm="12" class="vd-selling-Inventory head-col">
        <h5 class="text-bold text-capitalize listing-heading">
          {{ $t('selling_page.listings') }} &#40;{{ emptyListing }}&#41;
        </h5>
      </b-col>
    </b-row>
    <b-row v-if="!userRole" class="not-a-vendor">
      <b-col md="12" class="text-center">
        <div class="not-a-vendor p-5 text-center bg-white mt-3">
          <h6 class="text-bold">
            {{ $t('selling_page.user_not_vendor') }}
          </h6>
        </div>
      </b-col>
    </b-row>
    <b-row v-else class="vd-purchase-empty">
      <b-col md="12" class="text-center">
        <p class="vd-purchase-browse-now">
          {{ $t('selling_page.no_active_listing_found') }}
        </p>
        <p class="vd-purchase-browse-now">
          {{ $t('selling_page.list_a_product_today_on_ds') }}
        </p>
        <Button variant="apply-empty" pill @click="moveToCreateListing">
          {{ $t('home.create_listing') }}
        </Button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { NavGroup, Button } from '~/components/common'
export default {
  name: 'EmptyListing',

  components: {
    NavGroup,
    Button,
  },

  data() {
    return {
      emptyListing: 0,
      currentCategory: 'incoming_offers',
      categoryItems: [
        {
          label: this.$t('selling_page.incoming_offers'),
          value: 'incoming_offers',
        },
        {
          label: this.$t('selling_page.outgoing_offers'),
          value: 'outcoming_offers',
        },
      ],
      userRole: this.$auth.user.roles_name.includes('Vendor')
    }
  },

  methods: {
    // TODO : On nav change.
    handleCategoryChange(val) {
      this.currentCategory = val
    },

    // Move to create listing.
    moveToCreateListing() {
      this.$router.push('/profile/create-listing')
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

// Media query
@media (min-width: 576px)
  .section-nav
    display: block
  .vd-selling-Inventory
    .section-nav
      margin: 1rem 0
    .listing-heading
      font-family: $font-sp-pro
      font-style: normal
      @include body-1-bold
      display: flex
      align-items: center
      color: $color-black-1
  .vd-purchase-empty
    .btn-apply-empty
      height: 38px
      left: 770px
      top: 512.66px
      background: $color-blue-20
      border-radius: 21px
      color: $color-white-1
      
//On responsive screen media query
@media (max-width: 576px)
  .section-nav
    display: none
  .vd-selling-Inventory
    .listing-heading
      font-family: $font-montserrat
      font-style: normal
      @include body-4-medium
      color: $color-black-1
  .vd-purchase-empty
    .btn-apply
      width: 309px
      height: 40px
      left: calc(50% - 309px/2)
      bottom: 376px
      background: $color-blue-20
      border-radius: 21px
</style>