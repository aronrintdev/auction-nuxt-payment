<template>
  <b-container fluid class="container-profile-create-listing h-100 py-5">
    <div v-if="product">
      <DetailsListing
        v-model="form"
        :action="`edit`"
        :product="product"
        @editDraft="editDraft"
        @clearValue="clearValue"
      />
    </div>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import DetailsListing from '~/components/profile/create-listing/product/DetailsListing.vue'
export default {
  name: 'CreateListingEdit',

  components: {
    DetailsListing,
  },

  layout: 'Profile',

  data() {
    return {
      form: null,
    }
  },

  computed: {
    ...mapGetters({
      getDraftItem: 'listingItems/findDraftItem',
    }),

    // Get the details of item.
    draftDetail() {
      return this.getDraftItem(this.$route.params.id)
    },

    product() {
      return this.draftDetail?.product
    },
  },

  created() {
    // Set the item values
    const data = this.getDraftItem(this.$route.params.id)
    if (data) {
      this.form = {
        currentSize: data.sizeId,
        quantity: data.quantity,
        price: data.price / 100,
        boxCondition: data.packagingConditionId,
        minOfferAmount:
          this.$route.query.path === 'from-inventory'
            ? data.minOfferAmount
            : data.minOfferAmount / 100,
        color: data.color || null,
      }
      // If adding listing from inventory
      if (this.$route.query.path === 'from-inventory') {
        this.form.inventory_id = data.inventory_id
        this.form.stock = data.stock
      }
    }
  },

  methods: {
    ...mapActions({
      updateDraft: 'listingItems/updateDraftListing',
    }),

    /**
     * Update the listing item and move to confirm screen.
     */
    editDraft() {
      const item = {
        product: this.product,
        sizeId: Number(this.form.currentSize),
        quantity: Number(this.form.quantity),
        price: Number(this.form.price) * 100,
        packagingConditionId: Number(this.form.boxCondition),
        minOfferAmount:
          this.$route.query.path === 'from-inventory'
            ? Number(this.form.minOfferAmount)
            : Number(this.form.minOfferAmount) * 100,
        color: this.form.color,
      }
      if (this.form.inventory_id) {
        Object.assign(item, { inventory_id: this.form.inventory_id })
        Object.assign(item, { stock: this.form.stock })
      }
      this.updateDraft({
        index: this.$route.query?.id,
        data: item,
      })

      if (this.$route.query.path === 'from-inventory') {
        this.$router.push({
          path: '/profile/create-listing/selling/confirm',
          query: { path: 'from-inventory' },
        })
      } else {
        this.$router.push('/profile/create-listing/selling/confirm')
      }
    },

    // Reset the quantiy and minimum offer amount
    clearValue() {
      const { quantity, minOfferAmount } = this.draftDetail
      this.form.quantity = quantity
      this.form.minOfferAmount = minOfferAmount
    },
  },
}
</script>
