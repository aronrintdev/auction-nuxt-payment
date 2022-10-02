<template>
  <footer class="footer-wrapper">
    <div class="footer-links">
      <div>
        <NuxtLink to="authentication-process">{{
          $t('footer.authentication_process')
        }}</NuxtLink>
        <NuxtLink to="refund-and-returns">{{
          $t('footer.refund_and_returns')
        }}</NuxtLink>
        <NuxtLink to="shipping">{{ $t('footer.shipping') }}</NuxtLink>
        <NuxtLink to="selling-and-trading">{{
          $t('footer.selling_and_trading')
        }}</NuxtLink>
        <NuxtLink to="fee-policy">{{ $t('footer.fee_policy') }}</NuxtLink>
      </div>
      <div>
        <NuxtLink to="#">{{ $t('footer.contact_us') }}</NuxtLink>
        <NuxtLink to="#">{{ $t('footer.faq') }}</NuxtLink>
      </div>
      <div class="secondary-links">
        <NuxtLink to="private-policy">
          {{ $t('footer.private_policy') }}
        </NuxtLink>
        <NuxtLink to="terms-and-conditions">
          {{ $t('footer.terms_and_conditions') }}
        </NuxtLink>
      </div>
    </div>
    <div class="footer-social">
      <div class="social-icons">
        <div>
          <NuxtLink to="#">
            <img :src="require('~/assets/img/icons/facebook.svg')" alt="" />
          </NuxtLink>
          <NuxtLink to="#">
            <img :src="require('~/assets/img/icons/insta.svg')" alt="" />
          </NuxtLink>
          <NuxtLink to="#">
            <img :src="require('~/assets/img/icons/tiktok.svg')" alt="" />
          </NuxtLink>
          <NuxtLink to="#">
            <img :src="require('~/assets/img/icons/twitter.svg')" alt="" />
          </NuxtLink>
          <NuxtLink to="#">
            <img :src="require('~/assets/img/icons/youtube.svg')" alt="" />
          </NuxtLink>
        </div>
        <div>
          <NuxtLink to="#" class="icon-store">
            <img :src="require('~/assets/img/icons/app-store.png')" alt="" />
          </NuxtLink>
          <NuxtLink to="#" class="icon-store">
            <img :src="require('~/assets/img/icons/google-play.png')" alt="" />
          </NuxtLink>
        </div>
      </div>
      <div class="copy-right">
        DEAD$TOCK 2021. {{ $t('footer.all_rights_reserved') }}
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'Footer',
  methods: {
    // On language click, language is set, and the current route change to the selected language
    changeLang(lang) {
      this.$store.commit('SET_LANG', lang)
      this.$router.push({
        path: `${this.$router.currentRoute.path}?lang=${lang}`,
      })
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.footer-wrapper
  @include body-5-regular
  background: $color-black-1
  padding: 35px 72px 19px 72px
  position: relative
  display: flex
  align-items: flex-start
  justify-content: space-between

  .footer-links
    flex: 0 1 auto
    a
      border-right: solid 1px $color-white-1
      color: $color-white-1
      padding: 0 12px 0 12px
      word-break: break-word
      white-space: nowrap

      &:last-child
        border-right: solid 0 $color-white-1

      &:first-child
        padding: 0 12px 0 0

    >div
      margin-bottom: 16px

    .secondary-links a
      color: $color-gray-5

      &:not(:last-child)
        border-right: solid 1px $color-gray-5

  .footer-social
    flex: 1 0 auto

    .social-icons
      display: flex
      align-items: center
      justify-content: flex-end
      margin-bottom: 34px

      a
        font-size: 14px

        &:not(:last-child)
          margin-right: 20px

        img
          height: 20px

        &.icon-store
          margin-right: 0
          margin-left: 20px

          img
            height: 31px

        &:nth-child(5)
          border-right: solid 1px $white
          padding: 0 20px 0 0

    .copy-right
      color: $color-gray-5
      text-align: right
      margin-bottom: 16px

  @media (max-width:992px)
    flex-direction: column
    align-items: center

    .footer-links
      width: 100%
      text-align: center

    .footer-social
      .copy-right
        text-align: center

  @media (max-width:646px)
    .footer-links
      a
        width: 100%
        border: none
        display: block
        text-align: center
        margin: 7px 0

      .secondary-links a:not(:last-child)
        border: none

    .footer-social
      .social-icons
        flex-direction: column

        a:nth-child(5)
          border: none
          padding: 0

        >div
          display: flex
          justify-content: center

        >div:last-child
          margin-top: 20px

          a:first-child
            margin-left: 0

      .copy-right
        text-align: center
</style>
