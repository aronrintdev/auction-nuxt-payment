<template>
  <div class="empty-listing-wrapper mt-4">
    <p class="no-savd-listing-quote">
      {{ $t('createlisting.no_saved_listing') }}
      <nuxt-link
        to="/profile/create-listing/selling"
        class="text-decoration-underline"
        >{{ $t('home.create_listing') }}</nuxt-link
      >
    </p>
    <!-- Delete Success Modal -->
    <AlertModal
      id="delete-message-modal"
      :message="$t('createlisting.listing_deleted')"
      icon="trash"
      auto-hide
      @hidden="onAddedModalHidden"
    />
    <!-- ./Delete Success Modal -->
  </div>
</template>

<script>
import { AlertModal } from '~/components/modal'

export default {
  name: 'EmptyListing',

  components: {
    AlertModal,
  },

  mounted() {
    // On mount, show modal.
    this.$bvModal.show('delete-message-modal')
  },

  methods: {
    // Modal hide
    onAddedModalHidden() {
      this.$bvModal.hide('delete-message-modal')
    },
  },
}
</script>