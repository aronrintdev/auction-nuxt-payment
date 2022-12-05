<template>
  <b-col cols="12" class="social-links mt-5">
    <b-card :title="$t('preferences.profile.social_media_links')">
      <!-- Social Links Description -->
      <div class="card-text">
        {{ $t('preferences.profile.social_links_description') }}
      </div>
      <!-- ./Social Links Description -->
      <!-- Content -->
      <div class="card-text">
        <b-row class="profile-social-accounts-row mt-45">
          <b-col md="5" class="p-0 m-0">
            <!-- Google -->
            <SocialAccountListItem
              :type="$t('preferences.profile.google')"
              :img="`google-icon.png`"
              :val="`google`"
              :connectionStatus="socialConnectionStatus.google"
              @connectTo="connectTo"
              @remove="remove"
            />
            <!-- ./Google -->
            <!-- ./Facebook -->
            <!-- TODO: Apple -->
            <SocialAccountListItem
              :type="$t('preferences.profile.apple')"
              :img="`apple-icon.png`"
              :val="`apple`"
              :connectionStatus="socialConnectionStatus.apple"
              @connectTo="connectTo"
              @remove="remove"
            />
            <!-- ./Apple -->
            <!-- Twitter -->
            <SocialAccountListItem
              :type="$t('preferences.profile.twitter')"
              :img="`twitter-icon.png`"
              :val="`twitter`"
              :connectionStatus="socialConnectionStatus.twitter"
              @connectTo="connectTo"
              @remove="remove"
            />
            <!-- ./Twitter -->
          </b-col>
          <b-col md="5" class="p-0 ml-61">
            <!-- Facebook -->
            <SocialAccountListItem
              :type="$t('preferences.profile.facebook')"
              :img="`facebook-icon.png`"
              :val="`facebook`"
              :connectionStatus="socialConnectionStatus.facebook"
              @connectTo="connectTo"
              @remove="remove"
            />
            <!-- TODO: Instagram -->
            <SocialAccountListItem
              :type="$t('preferences.profile.instagram')"
              :img="`instagram-icon.png`"
              :val="`instagram`"
              :connectionStatus="socialConnectionStatus.instagram"
              @connectTo="connectTo"
              @remove="remove"
            />
            <!-- ./Instagram -->
            <!-- TODO: Tiktok -->
            <SocialAccountListItem
              :type="$t('preferences.profile.tiktok')"
              :img="`tiktok-icon.png`"
              :val="`tiktok`"
              :connectionStatus="socialConnectionStatus.tiktok"
              @connectTo="connectTo"
              @remove="remove"
            />
            <!-- ./Tiktok -->
          </b-col>
        </b-row>
      </div>
      <!-- Connect Modal -->
      <SocialModal
        :actionType="actionType"
        :selectedAccount="selectedAccount"
        :connectionExist="connectionExist"
        @confirmation="confirmation"
      />
      <!-- Connect Modal -->
      <!-- ./Content -->
    </b-card>
  </b-col>
</template>
<script>
import SocialAccountListItem from './SocialAccountListItem.vue'
import SocialModal from './SocialConnectModal.vue'
export default {
  name: 'SocialAccount',

  components: {
    SocialModal,
    SocialAccountListItem,
  },

  data() {
    return {
      connectionExist: false,
      connectedAccount: '',
      socialConnectionStatus: [],
      selectedAccount: '',
      actionType: '',
    }
  },

  async fetch() {
    // Get the social Account connection status
    this.socialConnectionStatus = await this.$axios
      .get('/preferences/profile/connected-social-media')
      .then((res) => res.data.data || [])
      .catch((err) => {
        this.$toasted.error(err.response.data)
      })
  },

  methods: {
    /**
     * Remove or connect to accounts
     * @param action : values can be connect or remove
     * @param accountType : any of the service - google, twitter, facebook
     */
    confirmation({ action, accountType }) {
      // If the action is to remove,
      if (action === 'remove') {
        this.$axios
          .put('/preferences/socialaccount/remove', {
            type: accountType,
          })
          .then((res) => {
            this.$toasted.success(this.$t(res.data.message))
            this.$nuxt.refresh()
          })
          .catch((err) => {
            this.$toasted.error(this.$t(err.response.data.message))
          })
      } else {
        // If connection exist
        if (this.connectionExist) {
          // remove the connection
          this.confirmation({
            action: 'remove',
            accountType: this.connectedAccount,
          })
        }
        // connect to service.
        this.$axios
          .get('/preferences/socialaccount/update', {
            params: { action, accountType },
          })
          .then((res) => {
            if (res.data.redirectUrl) {
              window.location.href = res.data.redirectUrl
            }
          })
          .catch((err) => {
            this.$toasted.error(this.$t(err.response.data.message))
          })
      }
    },
    // Remove social account
    remove(val) {
      this.actionType = 'remove' // Update the actiontype to remove
      this.selectedAccount = val // Selected account
      this.$bvModal.show('social-modal') // Show the modal
    },

    // Connect social account
    connectTo(val) {
      // If the selected service is any of one.
      // TODO: Will update if other social services are implemented.
      if (['google', 'twitter', 'facebook'].includes(val)) {
        // The connection status of users social media.
        const obj = this.socialConnectionStatus
        // If the socialConnectionStatus object has a connected value.
        const exist = Object.values(obj).includes('connected')
        // If already connected
        if (exist) {
          // Get the key having connected value
          // eslint-disable-next-line array-callback-return
          Object.keys(obj).find((key) => {
            if (obj[key] === 'connected') {
              this.connectedAccount = key // Already connected account
            }
          })
          this.connectionExist = true // If already a social connect exist.
        }
        this.selectedAccount = val // Selected account
        this.actionType = 'connect' // Update the actionType to connect
        this.$bvModal.show('social-modal') // Show the modal
      }
    },
  },
}
</script>
