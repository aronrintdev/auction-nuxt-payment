<template>
  <div class="create-listing-page">
    <div class="wrapper">
      <div class="content-wrapper">
        <section class="content p-4">
          <div class="container-fluid">
            <div class="d-flex align-items-center justify-content-between content-header">
              <div class="content-header-title">{{ $t('create_listing.auction.collection.title') }}</div>
              <div>
                <NuxtLink
                  to="/profile/create-listing"
                  class="btn btn-outline-dark px-5 back-btn"
                >
                  {{ $t('create_listing.auction.single.back_to_auctions') }}
                </NuxtLink>
              </div>
            </div>
            <div class="content-main">
              <!-- Steps -->
              <NewCollectionAuctionStepper :steps="steps" :initial-state="steps[0]"></NewCollectionAuctionStepper>
            </div>
          </div>
        </section> 
      </div>
      <aside class="control-sidebar control-sidebar-dark">
      </aside>
    </div>
    <Footer/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Footer from '~/components/Footer.vue';
import CategorySelector from '~/components/Auctions/CategorySelector.vue';
import NewCollectionAuctionStepper from '~/components/Auctions/NewCollectionAuctionStepper.vue';
import PhotosForAuction from '~/components/Auctions/PhotosForAuction';
import CollectionDetails from '~/components/Auctions/CollectionDetails.vue';
import EstimatedValue from '~/components/Auctions/EstimatedValue.vue';
import ShippingCost from '~/components/Auctions/ShippingCost.vue';
import ConfirmDetails from '~/components/Auctions/ConfirmDetails.vue';

export default {
  name: 'CreateSingleAuctionPage',
  components: {
    Footer,
    NewCollectionAuctionStepper,
  },
  layout: 'Default',
  middleware: 'auth',
  data() {
    return {
      steps: [
        {
          name: 'Category',
          icon: 'bx-category',
          visible: true,
          component: CategorySelector
        },
        {
          name: 'Photos',
          icon: 'bx-photo-camera',
          visible: true,
          component: PhotosForAuction
        },
        {
          name: 'Details',
          icon: 'bx-pencil',
          visible: true,
          component: CollectionDetails
        },
        {
          name: 'Estimated Value',
          icon: 'bx-money-withdraw',
          visible: true,
          component: EstimatedValue
        },
        {
          name: 'Shipping Cost',
          icon: 'bx-shipping-box',
          visible: true,
          component: ShippingCost
        },
        {
          name: 'Shipping Cost',
          icon: 'bx-shipping-box',
          visible: false,
          component: ConfirmDetails
        }
      ]
    };
  },
  computed: {
    ...mapGetters([
      'getLang'
    ])
  },
};
</script>