<template>
  <div>
    <Portal to="notification-icon-slot">
      <div @click="openShareLinks($event)">
        <ShareGrayIcon class="share-icon" />
      </div>
    </Portal>
    <vue-bottom-sheet ref="shareLinksSheet">
      <div class="d-flex flex-column h-100 filters-sheet">
        <div class="filters-sheet-title text-center">{{ $t('common.share') }}</div>
        <div class="flex-shrink-1 overflow-auto filters-sheet-content share-links-sheet">
          <div class="d-flex align-items-center justify-content-center">
            <div class="d-flex flex-column align-items-center share-link" @click="shareClick('twitter')">
              <img :src="require('/assets/img/icons/share/twitter-icon.svg')"/>
              <div class="share-link-label">{{ $t('promotions.socials.twitter') }}</div>
            </div>
            <div class="d-flex flex-column align-items-center share-link" @click="shareClick('instagram')">
              <img :src="require('/assets/img/icons/share/instagram-icon.svg')" />
              <div class="share-link-label">{{ $t('promotions.socials.instagram') }}</div>
            </div>
            <div class="d-flex flex-column align-items-center share-link" @click="shareClick('facebook')">
              <img :src="require('/assets/img/icons/share/fb-icon.svg')" />
              <div class="share-link-label">{{ $t('promotions.socials.facebook') }}</div>
            </div>
            <div class="d-flex flex-column align-items-center position-relative share-link" @click="shareClick('copy_link')">
              <img :src="require('/assets/img/icons/share/share-link.svg')" />
              <div class="share-link-label">{{ $t('promotions.socials.copy_link') }}</div>
              <div v-if="isCopyLinkClicked" class="position-absolute d-flex align-items-center copied-text">
                <span>{{ $t('promotions.copied') }}</span>
                <img :src="require('/assets/img/icons/green-checkmark.svg')" />
              </div>
            </div>
          </div>
          <div class="text-center cancel-btn" @click="$refs.shareLinksSheet.close()">{{ $t('common.cancel') }}</div>
        </div>
      </div>
    </vue-bottom-sheet>
  </div>
</template>

<script>
import clipboardMixin from '~/plugins/mixins/clipboard'
import ShareGrayIcon from '~/assets/img/icons/share-gray.svg?inline'

export default {
  name: 'ShareLinkSheet',
  components: {ShareGrayIcon},
  mixins: [clipboardMixin],
  data() {
    return {
      isCopyLinkClicked: false,
    }
  },
  methods: {
    shareClick(key) {
      switch (key) {
        case 'facebook':
          window.open(`https://facebook.com/sharer.php?u=${window.location.href}`, '_blank').focus();
          break
        case 'twitter':
          window.open(`https://twitter.com/intent/tweet?url=${window.location.href}`, '_blank').focus();
          break
        case 'instagram':
          // todo
          break
        default :
          this.shared = key
          this.copyToClipboard(window.location.href)
          this.isCopyLinkClicked = true
          break
      }
    },
    openShareLinks(event) {
      event.preventDefault()
      this.isCopyLinkClicked = false
      this.$refs.shareLinksSheet.open()
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.share-links-sheet
  .share-link
    margin: 15px 18px
    img 
      width: 44px
      height: 44px
    &-label
      font-family: $font-sp-pro
      font-weight: $medium
      @include body-1224
      color: $color-gray-5
      white-space: nowrap
  .cancel-btn
    font-family: $font-sp-pro
    font-weight: $medium
    @include body-5
    color: $color-blue-2
    margin-bottom: 16px
  .copied-text
    font-family: $font-sp-pro
    font-weight: $bold
    @include body-18
    letter-spacing: 0.005em
    color: $color-green-33
    top: 80%
    img
      margin-left: 5px
      width: 8px
</style>
