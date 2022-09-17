<template>
  <div class="section-wrapper">
    <HomeSectionHeader
      :title="$t('home.from_our_socials')"
      :description="$t('home.from_our_socials_desc')"
      :button-label="$t('common.view_more')"
      :button-target="'#'"
      class="section-header"
    />
    <div class="section-videos">
      <b-row>
        <b-col lg="2" class="social-icons">
          <img :src="require('~/assets/img/icons/facebook.svg')" />
          <img :src="require('~/assets/img/icons/insta.svg')" />
          <img :src="require('~/assets/img/icons/tiktok.svg')" />
          <img :src="require('~/assets/img/icons/twitter.svg')" />
          <img :src="require('~/assets/img/icons/youtube.svg')" />
        </b-col>
        <b-col lg="10" class="player-container">
          <div class="purple-border"></div>
          <b-row class="player-row">
            <b-col lg="8" class="player-col">
              <div class="video-player">
                <ArtplayerComponent :option="options" :style="style" />
              </div>
            </b-col>
            <b-col lg="4" class="banner-col">
              <div class="img-wrapper">
                <b-img :src="require('~/assets/img/home/social2.png')" />
              </div>
              <div class="img-wrapper">
                <b-img :src="require('~/assets/img/home/social3.png')" />
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import ArtplayerComponent from 'artplayer-vue'
import HomeSectionHeader from '~/components/homepage/section/Header.vue'

export default {
  name: 'HomeFromOurSocials',

  components: { HomeSectionHeader, ArtplayerComponent },

  data() {
    return {
      options: {
        url: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
      },
      style: {
        height: '100%',
      },
    }
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.section-wrapper
  padding: 0
  margin-bottom: 225px

  .section-header
    margin-top: 70px

  .section-videos
    max-width: 1145px
    margin-left: auto
    margin-right: auto
    margin-top: 40px
    padding: 61px 43px
    background-color: $color-gray-29

    .social-icons
      display: flex
      flex-direction: column
      justify-content: space-evenly
      align-items: center
      flex-wrap: wrap

      @media (max-width: 992px)
        flex-direction: row
        margin-bottom: 30px

    .player-container
      position: relative
      padding: 14px 0 0 14px

      .purple-border
        position: absolute
        left: 0
        top: 0
        width: 133px
        height: 134px
        border-left: 16px solid $color-purple-1
        border-top: 16px solid $color-purple-1

        &::before
          content: " "

      .player-row
        margin: 0

        .player-col
          padding: 1px
          .video-player
            width: 100%
            height: 100%
            --plyr-color-main: #93a5fc

        .banner-col
          padding: 0 1px
          margin-top: 1px
          position: relative

          .img-wrapper
            width: 100%
            padding-top: 56.25%
            position: relative
            margin-bottom: 2px

            img
              position: absolute
              top: 0
              left: 0
              bottom: 0
              right: 0
              width: 100%
              height: 100%
</style>
