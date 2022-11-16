<template>
  <div class="share-btn-group">
    <ShareNetwork
      v-for="network in networks"
      :key="network.network"
      :network="network.network"
      :url="url"
      :title="title"
      :description="description"
    >
      <img :src="network.icon" />
    </ShareNetwork>
    <!-- <img src="~/assets/img/icons/instagram.png" @click="shareInstagram" /> -->
    <img
      :title="message"
      class="link-share-btn"
      src="~/assets/img/icons/link.png"
      @click="shareLink"
      @mouseout="handleBlur"
    />
  </div>
</template>
<script>
import twitterIcon from '~/assets/img/icons/twitter2.svg'
import facebookIcon from '~/assets/img/icons/facebook3.png'

export default {
  name: 'ShareButton',

  props: {
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    quote: {
      type: String,
      default: '',
    },
    hashtags: {
      type: String,
      default: '',
    },
    twitterUser: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      message: this.$t('share.click_to_copy_link'),
      networks: [
        {
          network: 'twitter',
          icon: twitterIcon,
        },
        {
          network: 'facebook',
          icon: facebookIcon,
        },
      ],
    }
  },

  methods: {
    shareLink() {
      this.copyStringToClipboard(this.url)
      this.$toasted.success(this.$t('share.copied'))
    },

    copyStringToClipboard(str) {
      // Create new element
      const el = document.createElement('textarea')
      // Set value (string to be copied)
      el.value = str
      // Set non-editable to avoid focus and move outside of view
      el.setAttribute('readonly', '')
      el.style = { position: 'absolute', left: '-9999px' }
      document.body.appendChild(el)
      // Select text inside element
      el.select()
      // Copy text to clipboard
      document.execCommand('copy')
      // Remove temporary element
      document.body.removeChild(el)
    },

    handleBlur() {
      setTimeout(
        () => (this.message = this.$t('share.click_to_copy_link')),
        100
      )
    },
  },
}
</script>
<style lang="scss" scoped>
.share-btn-group {
  img {
    margin-right: 18px;
    cursor: pointer;
  }
}
</style>
