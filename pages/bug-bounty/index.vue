<template>
    <div class="f-montserrat">
      <BountyBanner />
      <div class="main-section pt-5">
        <div class="trade-selections">
          <b-row>
            <b-col class="col-sm-8 offset-sm-2">
              <h3 class="d-inline-block text-left text-heading">{{$t('bounty.report_an_issue')}}</h3>
              <div class="detail-content">
                  <p class="mt-5">
                      {{ $t('bounty.detail_content_description1') }}
                  </p>
                  <p class="mt-4">
                      Aftert the completion of your form, our team will respond to you promptly. We thank you for helping our community and we may be rewarding effective reports with compensation. Reports are subject to the terms and conditions of our Program, set forth below, and with the Terms and Conditions available on our site.
                      {{ $t('bounty.detail_content_description2') }}
                  </p>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-sm-8 text-left offset-sm-2 mt-5">
              <h3 class="d-inline-block text-heading">{{$t('bounty.levels')}}</h3>
              <Cards class="mt-5" />
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-sm-7 offset-sm-2 mt-3">
              <h3 class="d-inline-block text-left text-heading">{{$t('bounty.report_bug')}}</h3>
              <ContactForm class="mt-5" @verify="handleVerify"/>
            </b-col>
            <b-col class="col-sm-8 offset-sm-2 mt-5">
              <div class="disclosure">
                <div class="sub-detail">
                  <h3 class="d-inline-block text-left text-heading mt-5">{{$t('bounty.disclosure.title')}}</h3>
                  <p class="mt-2 fw-5" v-html="$t('bounty.disclosure.description')"></p>
                  <h4>{{ $t('bounty.disclosure.eligibility') }}</h4>
                  <p class="fw-5">{{ $t('bounty.disclosure.eligibility_detail') }}</p>
                  <h4>{{ $t('bounty.disclosure.scope') }}</h4>
                  <ul class="list-unstyled fw-5">
                    <li>{{ $t('bounty.disclosure.backend') }}</li>
                    <li>{{ $t('bounty.disclosure.admin') }}</li>
                    <li>{{ $t('bounty.disclosure.frontend') }}</li>
                  </ul>
                </div>
              </div>
              <div class="notice sub-detail ">
                <h4>{{ $t('bounty.notice.title') }}</h4>
                <ul class="list-unstyled fw-5">
                  <li>{{ $t('bounty.notice.i') }}</li>
                  <li>{{ $t('bounty.notice.ii') }}</li>
                  <li>{{ $t('bounty.notice.iii') }}</li>
                  <li>{{ $t('bounty.notice.iv') }}</li>
                  <li>{{ $t('bounty.notice.v') }}</li>
                  <li>{{ $t('bounty.notice.vi') }}</li>
                  <p>{{ $t('bounty.notice.detail') }}</p>
                </ul>
                <h4>{{ $t('bounty.conclusion.title') }}</h4>
                <p class="fw-5" v-html="$t('bounty.conclusion.detail')"></p>
              </div>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
  </template>

  <script>
  import BountyBanner from '~/pages/bug-bounty/Banner'
  import ContactForm from '~/pages/bug-bounty/ContactForm'
  import Cards from '~/pages/bug-bounty/Cards'

  export default {
    name: 'BugBounty',
    components: {
      BountyBanner,
      ContactForm,
      Cards
    },
    layout: 'IndexLayout',
    data(){
      return {
        navTab: 'browse_trade'
      }
    },
    methods: {
      handleVerify(payload) {
        this.credentials = payload
      },
    }
  }
  </script>
  <style scoped lang="sass">
  @import '~/assets/css/_variables'
  @import '~/assets/css/_typography'

  .card
    width: 242px
    height: 242px

    background: #FFFFFF
    box-shadow: 10px 10px 50px rgba(183, 183, 183, 0.25)
    border-radius: 17px

  .text-heading
    color: $color-blue-20
    font-size: 30px
    font-weight: $medium
  .detail-content
    font-size: 18px
    font-weight: $normal
    height: 242px
    width: 904px
  .stages
    & ul
        & li
            font-weight: $bold
            font-size: 18px
            line-height: 22px
            color: $color-black-1
            padding-bottom: 81px
  .stages-icon
    & ul
        & li
            font-size: 30px
  .sub-detail
    font-size: 18px
    p ul
      font-weight: $normal
    h4
      font-weight: $medium
  .disclosure
    width: 904px
  .notice
    width: 1060px

  .main-section
    background: linear-gradient(269.74deg, $color-blue-th-14 -77.58%, $color-gray-th-45 118.1%)
  .f-montserrat
    font-family: $font-montserrat

  .active-nav
    font-size: 26px
    & h3
      color: $color-black-1
      border-bottom: 3px $color-black-1 solid

  .inactive-nav
    font-size: 26px
    h3
      color: $color-gray-4
      &:hover
        color: $color-black-1

  .pl-6
    padding-left: 6rem

  .pr-6
    padding-right: 6rem

  .page-title
    @include heading-5

  </style>
