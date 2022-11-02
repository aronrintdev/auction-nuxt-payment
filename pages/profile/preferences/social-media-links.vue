<template>
  <div
    v-if="isScreenXS"
    class="profile-component-wrapper responsive-social-connect"
  >
    <!-- heading -->
    <div class="border-bottom">
      <span class="mb-2" role="button" @click="moveBack()">
        <img
          :src="require('~/assets/img/icons/back.svg')"
          alt="back-arrow"
          class="float-left"
        />
      </span>

      <span
        class="
          d-flex
          text-align-center
          align-items-center
          justify-content-center
          mt-3
          responsive-heading
          text-capitalize
          mb-3
        "
      >
        {{ $t('preferences.profile.profile') }}

        <span class="mobile-filter position-absolute mb-3">
          <img
            class="mobile-filter position-absolute"
            :src="require('~/assets/img/icons/filter-icon.svg')"
            alt="filter-icon"
          />
        </span>
      </span>
    </div>
    <!-- heading -->

    <!-- card -->
    <b-card class="mt-3 responsive-card">
      <!-- Social media links Card heading-->
      <div class="card-text border-underline">
        <span class="social-media-heading">
          <span class="d-flex">
            {{ $t('preferences.profile.social_media_links') }}
          </span>
        </span>
        <p class="social-media-sub-heading mt-2 d-flex">
          {{ $t('preferences.profile.social_links_description') }}
        </p>
      </div>
      <!-- Social media links Card heading-->

      <!-- content -->

      <div class="border-underline">
        <span class="social-media-connect">
          <SocialAccountListItem
            id="social-media-list"
            class="mb-2"
            responsiveDesign
            :type="$t('preferences.profile.google')"
            :img="`google-icon.svg`"
            :val="`google`"
            :connectionStatus="socialConnectionStatus.google"
            @connectTo="connectTo"
            @remove="remove"
          />
        </span>
      </div>

      <div class="border-underline">
        <span class="social-media-connect">
          <SocialAccountListItem
            id="social-media-list"
            class="mb-2"
            responsiveDesign
            :type="$t('preferences.profile.apple')"
            :img="`apple-logo.svg`"
            :val="`apple`"
            :connectionStatus="socialConnectionStatus.apple"
            @connectTo="connectTo"
            @remove="remove"
          />
        </span>
      </div>

      <div class="card-text border-underline">
        <span class="social-media-connect">
          <SocialAccountListItem
            id="social-media-list"
            class="mb-2"
            responsiveDesign
            :type="$t('preferences.profile.twitter')"
            :img="`twiiter_icon.svg`"
            :val="`twitter`"
            :connectionStatus="socialConnectionStatus.twitter"
            @connectTo="connectTo"
            @remove="remove"
          />
        </span>
      </div>

      <div class="card-text border-underline">
        <span class="social-media-connect">
          <SocialAccountListItem
            id="social-media-list"
            class="mb-2"
            responsiveDesign
            :type="$t('preferences.profile.facebook')"
            :img="`facebook-icon.svg`"
            :val="`facebook`"
            :connectionStatus="socialConnectionStatus.facebook"
            @connectTo="connectTo"
            @remove="remove"
          />
        </span>
      </div>

      <div class="card-text border-underline">
        <span class="social-media-connect">
          <SocialAccountListItem
            id="social-media-list"
            class="mb-2"
            responsiveDesign
            :type="$t('preferences.profile.instagram')"
            :img="`instagram_icon.svg`"
            :val="`instagram`"
            :connectionStatus="socialConnectionStatus.instagram"
            @connectTo="connectTo"
            @remove="remove"
          />
        </span>
      </div>

      <div class="card-text">
        <span class="social-media-connect">
          <SocialAccountListItem
            id="social-media-list"
            class="mb-2"
            responsiveDesign
            :type="$t('preferences.profile.tiktok')"
            :img="`tiktok_icon.svg`"
            :val="`tiktok`"
            :connectionStatus="socialConnectionStatus.tiktok"
            @connectTo="connectTo"
            @remove="remove"
          />
        </span>
      </div>

      <!-- content -->
    </b-card>
    <!-- card -->
    <!-- Connect Modal -->
    <SocialModal
      :actionType="actionType"
      :selectedAccount="selectedAccount"
      :connectionExist="connectionExist"
      @confirmation="confirmation"
    />
    <!-- Connect Modal -->
  </div>
</template>

<script>
import SocialAccountListItem from '~/components/profile/preferences/ProfileSection/SocialAccountListItem.vue'
import SocialModal from '~/components/profile/preferences/ProfileSection/SocialConnectModal.vue'
import screenSize from '~/plugins/mixins/screenSize'

export default {
  name: 'SocialMediaLinks',
  components: {
    SocialModal,
    SocialAccountListItem,
  },
  mixins: [screenSize],

  layout: 'Profile',

  middleware: 'auth',

  data() {
    return {
      socialConnectionStatus: [],
      connectionExist: false,
      connectedAccount: '',
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
    // to previous page
    moveBack() {
      this.$router.push('/profile/preferences')
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.profile-component-wrapper
  padding: 4%

.responsive-heading
  font-family: $font-montserrat
  font-style: normal
  @include body-3-medium
  letter-spacing: -0.02em
  color: $color-black-1
  background-color: $color-white-1

.social-media-heading
  font-family: $font-sp-pro
  font-style: normal
  @include body-4-medium
  color: $color-blue-20

.mobile-filter
  right: 10px

.social-media-sub-heading
  font-family: $font-sp-pro
  font-style: normal
  @include body-21-regular
  color: $color-black-17

.border-underline
  border-bottom: 2px solid $color-white-25

.responsive-social-connect
  height: 900px

#social-media-list::v-deep
  .social-media-label
    font-family: $font-montserrat
    font-style: normal
    @include body-9-medium
    color: $color-black-1

    .social-button
      position: absolute !important
      right: 10px !important
      box-sizing: border-box !important
      border-radius: 10px !important

@media (max-width:410px )
  .card-body
    padding: 1rem 10px 1rem 10px !important
</style>
