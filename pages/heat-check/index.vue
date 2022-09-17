<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12 p-0">
        <div class="section-heat-bg">
          <div class="banner-img-heatcheck px-0">
            <div class="row justify-content-center align-items-center">
              <div class="col-md-6 banner-section">
                <h2>
                  {{ $t('heatcheck.index.heat_check') }}
                  <img
                    src="~/assets/img/icons/profile/heat-img.png"
                    class="ml-4"
                    alt=""
                  />
                </h2>
                <p>{{ $t('heatcheck.index.sub_title') }}</p>
              </div>
            </div>
          </div>
          <div class="row auth-trust">
            <div class="col-md-8 mx-auto text-center">
              <h2 class="my-5">
                {{ $t('heatcheck.index.authentication') }}
                <span class="orange-text"
                  >{{ $t('heatcheck.index.trust') }}.</span
                >
              </h2>
              <div>
                <button
                  class="start-heat-check-btn mb-5 pl-3"
                  @click="newHeatCheck()"
                >
                  {{ $t('heatcheck.index.start_Heat_Check') }}
                  <img
                    src="~/assets/img/icons/profile/fair.png"
                    class="mx-3 fair-icon"
                    alt=""
                  />
                </button>
              </div>
              <div v-if="$auth.loggedIn === true">
                <button
                  class="heat-check-profile-btn mb-5 pl-3"
                  @click="listingPage()"
                >
                  {{ $t('heatcheck.index.heat_check_profile') }}
                  <img
                    src="~/assets/img/icons/profile/user-profile-icon.png"
                    class="mx-3 pb-1"
                    alt=""
                  />
                </button>
              </div>
              <div v-else>
                <button
                  class="heat-check-profile-btn mb-5"
                  @click="loginPage()"
                >
                  {{ $t('heatcheck.index.sign_up') }}
                  <img
                    src="~/assets/img/icons/profile/user-profile-icon.png"
                    class="mx-3 pb-1"
                    alt=""
                  />
                </button>
              </div>
            </div>
          </div>
          <div class="row video-section">
            <div class="col-md-8 mx-auto text-center">
              <h2 class="mb-5">
                {{ $t('heatcheck.index.how') }}
                <span class="orange-text">{{
                  $t('heatcheck.index.heatcheck')
                }}</span>
                {{ $t('heatcheck.index.works') }}
              </h2>
              <div class="video-wrapper">
                <div class="video-player">
                  <ArtplayerComponent :option="options" :style="style" />
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-5 be-auth text-center">
            <div class="col-md-12">
              <h2 class="mt-5">
                {{ $t('heatcheck.index.be') }}
                <span class="orange-text">{{
                  $t('heatcheck.index.authentic')
                }}</span>
              </h2>
              <p class="heat-chck-desc mx-auto mt-2">
                {{ $t('heatcheck.index.statistics') }} -
                {{ $t('heatcheck.index.view_more') }}
              </p>
            </div>
            <div class="col-md-12">
              <div class="chart-img-div mx-auto text-center mt-5 mb-4">
                <img src="~/assets/img/icons/profile/chart.png" alt="" />
              </div>
            </div>
          </div>
          <div class="container">
            <div class="row mt-5 mb-5 why-heatcheck">
              <div class="col-md-12 text-center">
                <h2 class="mt-5">
                  {{ $t('heatcheck.index.why') }}
                  <br />
                  <span class="orange-text">
                    {{ $t('heatcheck.index.heatcheck') }}?
                  </span>
                </h2>
                <p>{{ $t('heatcheck.index.efficent') }}</p>
              </div>
              <div class="col-md-4 mt-5">
                <div class="card card-borderless">
                  <div
                    class="d-flex justify-conent-center align-items-center mt-2"
                  >
                    <h3 class="w-65 certifcate-athencity-heading">
                      {{ $t('heatcheck.index.certificate') }}
                    </h3>
                    <div class="w-35">
                      <img
                        src="~/assets/img/icons/profile/star-correct.png"
                        class="card-img-top stat-icon"
                        alt="..."
                      />
                    </div>
                  </div>
                  <div class="c-body">
                    <p class="card-text certificate-desc">
                      {{ $t('heatcheck.index.our_team') }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-4 mt-5">
                <div class="card card-borderless">
                  <div
                    class="d-flex justify-conent-center align-items-center mt-2"
                  >
                    <h3 class="w-65 world-class-authicator">
                      {{ $t('heatcheck.index.world_class') }}
                    </h3>
                    <div class="w-35">
                      <img
                        src="~/assets/img/icons/profile/magnifier.png"
                        class="card-img-top stat-icon"
                        alt="..."
                      />
                    </div>
                  </div>
                  <div class="c-body">
                    <p class="card-text stress-free-desc">
                      {{ $t('heatcheck.index.in_house') }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-4 mt-5">
                <div class="card card-borderless">
                  <div
                    class="d-flex justify-conent-center align-items-center mt-2"
                  >
                    <h3 class="w-65 stress-free-heading">
                      {{ $t('heatcheck.index.stress_free') }}
                    </h3>
                    <div class="w-35">
                      <img
                        src="~/assets/img/icons/profile/stress-free.png"
                        class="card-img-top stat-icon"
                        alt="..."
                      />
                    </div>
                  </div>
                  <div class="c-body">
                    <p class="card-text world-class-desc">
                      {{ $t('heatcheck.index.receive_peace') }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-12 text-center mt-4">
                <div>
                  <button
                    class="start-heat-check-btn mt-5 mb-4"
                    @click="newHeatCheck()"
                  >
                    {{ $t('heatcheck.index.start_Heat_Check')
                    }}<img
                      src="~/assets/img/icons/profile/fair.png"
                      class="mx-3 fair-icon"
                      alt=""
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ArtplayerComponent from 'artplayer-vue'

export default {
  name: 'HeatCheck',
  components: {
    ArtplayerComponent,
  },
  layout: 'Profile',
  data() {
    return {
      options: {
        url: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
      },
      style: {
        margin: '28%',
      },
    }
  },
  methods: {
    listingPage() {
      this.$router.push({ path: '/heat-check/listing' })
    },
    loginPage() {
      this.$router.push({ path: '/login' })
    },
    newHeatCheck() {
      this.$router.push({ path: '/heat-check/new' })
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.w-65
  width: 65%
.w-35
  width: 35%
.banner-img-heatcheck
  background-image: url(~/assets/img/icons/profile/banner-heat-check.svg)
  background-repeat: no-repeat
  background-size: cover
  width: 100%
  height: 348px
  box-shadow: 19px 0px 43px -7px $color-gray-41
  position: relative

.stat-icon
  width: 79px
  height: 77px

.star-inner-icon
  width: 30px
  height: 30px
  position: relative
  top: -53px
  margin: auto

.stress-users
  width: 151px
  height: 99px
  margin-top: 20px


.certifcate-athencity-heading,
.stress-free-heading,
.world-class-authicator
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: bold
  font-size: 17px
  line-height: 24px
  color: $color-black-1

.certificate-desc,
.world-class-desc,
.stress-free-desc
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $normal
  font-size: 14px
  line-height: 17px
  display: flex
  align-items: center
  color: $color-gray-55
  padding-right: 8px

.card.card-borderless
  border: none
  width: 325px
  margin: 0px auto
  background: $white
  box-shadow: 0px 1px 4px $color-black-rgb1
  border-radius: 8px
  min-height: 188px
  padding: 14px 8px 14px 14px


.c-body
  padding: 17px 0px 0

.start-heat-check-btn
  width: 266px
  height: 42px
  background: linear-gradient(180deg, $color-red-14 0%, $color-orange-15 100%)
  border-radius: 45px
  font-family:$font-family-sf-pro-display
  font-style: normal
  font-weight: $medium
  font-size: 20px
  line-height: 24px
  align-items: center
  color: $white
  border: none

.fair-icon
  margin-top: -7px

.chart-img-div img
  width: 957.72px
  height: 545.31px
  margin: auto

.heat-chck-desc
  width: 608px
  height: 23px
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: normal
  font-size: 15px
  line-height: 145.84%
  text-align: center
  color: $color-black-1

.heat-check-profile-btn
  width: 266px
  height: 42px
  background: linear-gradient(90deg, $color-blue-1 0%, $color-blue-5 100%)
  border-radius: 45px
  font-family:$font-family-sf-pro-display
  font-style: normal
  font-weight: $medium
  font-size: 20px
  line-height: 24px
  align-items: center
  color: $white
  border: none
.heatcheck-result-heading
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $medium
  font-size: 20px
  line-height: 24px
  color: $color-black-1
  margin-top: -50px
  margin-left: 56px

.heat-items:focus
  border-color: none
  outline: 0
  box-shadow: none

.drop-status-filter-heat
  margin-top: -54px
  margin-right: 40px

.item-div-heat
  width: 100%
  height: 116px
  background: $white
  border-top: 1rem $color-white-4 solid

.no-submission-yet
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $regular
  font-size: 16px
  line-height: 116px
  color: $color-black-1
  padding-left: 46px
  border: none

.heatchck-prodct-tble-heading
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $bold
  font-size: 16px
  line-height: 20px
  text-align: center
  align-items: center
  color: $color-black-1

.heatchck-prodct-id-heading
  text-align: center

.heatchck-prodct-heading
  text-align: left
  padding-left: 15px

.heatcheck-date-prodct
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $normal
  font-size: 16px
  line-height: 19px
  color: $color-black-1
  text-align: center

.heatchck-prodct-staatus
  font-family: $font-family-futura
  font-style: normal
  font-weight: $bold
  font-size: 32px
  line-height: 48px
  align-items: center
  color: $color-organge-rgb-1
  text-align: center

.complete-heat-check-text a
  font-family: $font-family-sf-pro-text
  font-style: normal
  font-weight: $normal
  font-size: 16px
  line-height: 19px
  text-decoration-line: underline
  color: $color-gray-6
  margin-left: -10px

.complete-heat-check-text a:hover
  color: $color-gray-6

.complete-heat-check-text img
  margin-left: 7px

.heatchck-not-verify-staatus
  font-family: $font-family-futura
  font-style: normal
  font-weight: $bold
  font-size: 32px
  line-height: 39px
  align-items: center
  color: $color-organge-rgb-1
  text-align: center
  width: 174px



/*************upload modal btn***********/

.banner-section
  background: $color-white-rgb1
  backdrop-filter: blur(24px)
  width: 415px
  height: 184px
  padding: 30px 22px
  position: absolute
  left: 50px
  top: 28%


.banner-section h2
  font-style: normal
  font-weight: $bold
  font-size: 32px
  line-height: 43px
  display: flex
  align-items: center
  color: $color-red-3



.banner-section p
  font-style: normal
  font-weight: $medium
  font-size: 22px
  line-height: 30px
  color: $color-black-1


.auth-trust h2, .video-section h2, .be-auth h2, .why-heatcheck h2
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $bold
  font-size: 35px
  line-height: 43px
  color: $color-black-1


.video-wrapper
    display: table
    width: auto
    position: relative
    background-image: url(~/assets/img/icons/profile/video-bg.jpg)
    width: 550px
    background-repeat: no-repeat
    background-size: contain
    background-position: center
    margin: 0 auto

.video-wrapper .playpause
    background-image: url(~/assets/img/icons/profile/play.png)
    background-repeat: no-repeat
    width:30%
    height:30%
    left:0%
    right:0%
    top:0%
    bottom:0%
    background-position: center
    cursor: pointer


.video-wrapper .video
    width: 100%


.row.be-auth
  margin-left: 0
  margin-right: 0
  background-color: $color-gray-29


.content-wrapper
  padding: 104px 0px

/**********upload modal btn*************/

@media screen and (min-device-width: 360px) and (max-device-width: 640px)
  .banner-img-heatcheck
    background-image: url(~/assets/img/icons/profile/bannerheatcheck.png)
    background-repeat: no-repeat
    background-size: cover
    width: 100%
    height: 472.8px
    box-shadow: 4px 30px 31px $color-gray-41

  .checkbanne-img
    width: 100%
    height: 184px
    margin-top: 289px

  .checkbanne-img img
    width: 100%



  .chart-img-div img
    width: 100%
    height: 545.31px
    margin: auto


  .heat-chck-desc
    width: 100%
    height: 23px
    font-family: $font-family-montserrat
    font-style: normal
    font-weight: normal
    font-size: 15px
    line-height: 145.84%
    text-align: center
    color: $color-black-1

  .card-borderless
    border: none
    width: 100%
    height: 100%


  .drop-status-heat
    margin-top: -47px
    margin-left: 35px

  .no-submission-yet
    font-family: $font-family-sf-pro-display
    font-style: normal
    font-weight: $regular
    font-size: 12px
    line-height: 116px
    color: $color-black-1
    padding-left: 46px

  .heatchck-prodct-id-heading
    font-family: $font-family-montserrat
    font-style: normal
    font-weight: $bold
    font-size: 12px
    line-height: 20px
    text-align: center
    align-items: center
    color: $color-black-1

  .heatchck-prodct-heading
    font-family: $font-family-montserrat
    font-style: normal
    font-weight: $bold
    font-size: 12px
    line-height: 20px
    text-align: center
    align-items: center
    color: $color-black-1

  .heatchck-prodct-tble-heading
    font-family: $font-family-montserrat
    font-style: normal
    font-weight: $bold
    font-size: 12px
    line-height: 20px
    text-align: center
    align-items: center
    color: $color-black-1

  .table-heatcheck-items
    overflow: scroll

  .heatchck-prodct-staatus
    font-family: $font-family-futura
    font-style: normal
    font-weight: $bold
    font-size: 20px
    line-height: 48px
    align-items: center
    color: $color-organge-rgb-1
    text-align: center

  .heatchck-not-verify-staatus
    font-family: $font-family-futura
    font-style: normal
    font-weight: $bold
    font-size: 20px
    line-height: 83px
    align-items: center
    color: $color-organge-rgb-1
    text-align: center
    width: 174px

  .name-of-prdct
    font-family: $font-family-sf-pro-display
    font-style: normal
    font-weight: $bold
    font-size: 18px
    line-height: 43px
    align-items: center
    color: $color-black-1
    margin-top: 29px
    margin-bottom: -10px

  .main-img-prodct
    width: 200px
    height: 120px

  .prdct-show-orignl-name
    font-family: $font-family-futura
    font-style: normal
    font-weight: $normal
    font-size: 34px
    line-height: 90px
    align-items: center
    letter-spacing: 0.22em
    color: $color-gray-5

  .certificate-authentic-heading
    font-family: $font-family-montserrat
    font-style: normal
    font-weight: $medium
    font-size: 28px
    line-height: 59px
    align-items: center
    text-transform: uppercase
    color: $color-green-3
    margin-bottom: 0px

  .order-pass-prodct-img
    width: 250px
    height: 150px
    position: absolute
    right: 58px

  .order-pass-prdct-heatchec
    width: 120px
    height: 120px
    margin-left: 134px
    margin-top: -50px

  .front-col-auth
    margin-left: 0px

  .authen-thumb-img
    width: 164px
    height: 164px
    margin: auto
    margin-top: 37px

  .carousel,
  .carousel-inner,
  .carousel-item
    height: auto




@media screen and (min-device-width: 820px) and (max-device-width: 1180px)
  .banner-img-heatcheck
    background-image: url(~/assets/img/icons/profile/bannerheatcheck.png)
    background-repeat: no-repeat
    background-size: cover
    width: 98%
    height: 472.8px
    box-shadow: 4px 30px 31px $color-gray-46


  .chart-img-div img
    width: 100%
    height: 545.31px
    margin: auto

  .card-borderless
    border: none
    width: 100%
    height: 100%

  .drop-status-heat
    margin-top: -49px

  .name-of-prdct
    font-family: $font-family-sf-pro-display
    font-style: normal
    font-weight: $bold
    font-size: 24px
    line-height: 36px
    align-items: center
    color: $color-black-1
    margin-top: 29px
    margin-bottom: -10px

  .authen-thumb-img img
    width: 100px
    height: 100px
    margin-left: 33px
    margin-top: 27px

  .order-pass-prdct-heatchec
    width: 150px
    height: 150px
    margin-left: 10px
    margin-top: -54px
.orange-text
  color: $color-orange-4
</style>
