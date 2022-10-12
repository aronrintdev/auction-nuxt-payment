<template>
  <div class="create-listing-page h-100">
    <div class="wrapper">
      <section class="content p-4">
        <div class="container-fluid">
          <div class="content-header">
            <div class="content-head m-auto">
              <!-- Heading -->
              <span class="content-header-title">
                {{ $t('create_listing.index.title') }}
              </span>
              <!-- ./Heading -->
              <!-- Drafts -->
              <span
                class="float-right text-bold text-decoration-underline"
                role="button"
                @click="showDraft"
                >{{ $t('common.drafts') }} &#040;{{
                  (draftListingItem.length + getTradeDraftCount) || 0
                }}&#041;
              </span>
              <!-- ./Drafts -->
            </div>
          </div>

          <div class="content-main">
            <div class="listing-types">
              <div class="row">
                <!-- Selling -->
                <div class="col-md-4 mt-4">
                  <div class="listing-type m-auto" @click="routeTo('selling')">
                    <div class="listing-type-title selling">
                      {{ $t('create_listing.index.selling') }}
                    </div>
                    <div class="listing-type-desc">
                      {{ $t('create_listing.index.selling_desc') }}
                    </div>
                    <div class="listing-type-icon">
                      <img
                        :src="require('~/assets/img/icons/selling-outline.png')"
                      />
                    </div>
                  </div>
                </div>
                <!-- ./Selling -->
                <!-- Auction -->
                <div class="col-md-4 mt-4">
                  <div class="listing-type m-auto" @click="routeTo('auction')">
                    <div class="listing-type-title auction">
                      {{ $t('create_listing.index.auction') }}
                    </div>
                    <div class="listing-type-desc">
                      {{ $t('create_listing.index.auction_desc') }}
                    </div>
                    <div class="listing-type-icon">
                      <img
                        :src="require('~/assets/img/icons/auction-outline.svg')"
                      />
                    </div>
                  </div>
                </div>
                <!-- ./Auction -->
                <!-- Trade -->
                <div class="col-md-4 mt-4">
                  <div class="listing-type m-auto" @click="routeTo('trade')">
                    <div class="listing-type-title trade">
                      {{ $t('create_listing.index.trade') }}
                    </div>
                    <div class="listing-type-desc">
                      {{ $t('create_listing.index.trade_desc') }}
                    </div>
                    <div class="listing-type-icon">
                      <img
                        :src="require('~/assets/img/icons/trade-outline.svg')"
                      />
                    </div>
                  </div>
                </div>
                <!-- ./Trade -->
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { LISTING_TYPES } from '~/static/constants/create-listing'

export default {
  name: 'CreateListingPage',

  layout: 'Profile',

  middleware: ['auth', 'vendor'],

  computed: {
    ...mapGetters({
      draftListingItem: 'listingItems/listingSavedAsDraft',
    }),
    ...mapGetters('trades',['getTradeDraftCount']),
  },

  methods: {
    // Show the drafts page
    showDraft() {
      this.$router.push({ path: '/profile/create-listing/drafts' })
    },

    routeTo(type) {
      // If not a vendor
      if (!this.$store.state.auth.user.roles_name.includes('Vendor')) {
        this.$toasted.error(this.$t('createlisting.user_not_valid'))
      } else if (type === LISTING_TYPES.SELLING) { // If the type is selling
          this.$router.push({
            path: '/profile/create-listing/selling',
          })
      } else if(type === LISTING_TYPES.TRADE) { // If the type is trade
          this.$store.commit('trades/removeAllWantItems')
          this.$store.commit('trades/clearTradeItems')
          this.$store.commit('trades/setTradeForEditing',null)
          if(window.innerWidth <= 500) {
            this.$router.push('/profile/create-listing/trades/create-mobile')
          }else {
            this.$router.push('/profile/create-listing/trades/create')
          }

      } else if (type === LISTING_TYPES.AUCTION) { // If the type is auction
          this.$router.push({
            path: '/create-listing/selectproducttype',
          })
      }
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.create-listing-page
  background: $color-white-4
  .listing-type
    border: 0.2px solid $color-gray-4
    height: 330px
    max-width: 460px
    .listing-type-icon
      width: 0
      img
        height: 110px
</style>
