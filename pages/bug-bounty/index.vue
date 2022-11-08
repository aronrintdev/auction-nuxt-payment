<template>
    <div class="f-montserrat">
      <BountyBanner class="d-none d-sm-block" />
      <img class="d-block d-sm-none w-100" src="~/assets/img/bug-bounty/bugbountymobile1.png" alt="">
      <div class="pt-5 p-3 bg-white">
        <div class="trade-selections">
          <b-row>
            <b-col class="col-sm-8 col-md-8 offset-md-2">
              <h3 class="d-inline-block text-left text-heading">{{$t('bounty.report_an_issue')}}</h3>
              <div class="detail-content">
                  <p class="mt-5">
                      {{ $t('bounty.detail_content_description1') }}
                  </p>
                  <p class="mt-4">
                      {{ $t('bounty.detail_content_description2') }}
                  </p>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-sm-8 text-left offset-sm-2 mt-5 text-center">
              <h3 class="d-inline-block text-heading">{{$t('bounty.levels')}}</h3>
              <Cards class="mt-5" />
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12" md="7" offset-md="2" class="mt-3 mobile-form">
              <h3 class="d-inline-block text-left text-heading">{{$t('bounty.report_bug')}}</h3>
              <ContactForm class="mt-5" @verify="handleVerify"/>
            </b-col>
            <b-col sm="12" md="8" offset-md="2" class="mt-5">
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
  .text-heading
    color: $color-blue-20
    font-size: 30px
    font-weight: $medium
  .detail-content
    font-size: 18px
    font-weight: $normal
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

@media (min-width:575px)
  .disclosure
    width: 904px
  .notice
    width: 1060px
  .detail-content
    width: 904px
    
@media (max-width: 575px)
  .mobile-form
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25)
    border-radius: 24px
    padding: 15px
  
  </style>
