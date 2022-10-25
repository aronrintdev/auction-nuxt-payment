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
                      Deadstock is committed to protecting our customers; therefore, we have formulated the “Bug Bounty” security program for users to report issues associated with our website. If you think you have found a vulnerability or issue with our site and would like to report a problem, please fill out the form below and be as thorough as possible.
                  </p>
                  <p class="mt-4">
                      Aftert the completion of your form, our team will respond to you promptly. We thank you for helping our community and we may be rewarding effective reports with compensation. Reports are subject to the terms and conditions of our Program, set forth below, and with the Terms and Conditions available on our site.  
                  </p>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-sm-8 text-left offset-sm-2 mt-5">
              <h3 class="d-inline-block text-heading">{{$t('bounty.levels')}}</h3>
              <Cards />
              <b-row>
                <b-col sm="3">
                    <div class="stages">
                        <ul class="list-unstyled pl-0">
                            <li>
                              {{ $t('bounty.stages.low') }}
                            </li>
                            <li>
                              {{ $t('bounty.stages.medium') }}
                            </li>
                            <li>
                              {{ $t('bounty.stages.high') }}
                            </li>
                            <li>
                              {{ $t('bounty.stages.critical') }}
                            </li>
                        </ul>
                    </div>
                </b-col>
                <b-col sm="3">
                    <div class="stages-icon">
                        <ul class="list-unstyled text-center pl-0">
                            <li>
                                <img src="~/assets/img/bug-bounty/log-icon.png" />
                            </li>
                            <li>
                                |
                            </li>
                            <li>
                                <img src="~/assets/img/bug-bounty/high.png" />
                            </li>
                            <li>
                                |
                            </li>
                            <li>
                                <img src="~/assets/img/bug-bounty/medium.png" />
                            </li>
                            <li>
                                |
                            </li>
                            <li>
                                <img src="~/assets/img/bug-bounty/critical.png" />
                            </li>
                        </ul>
                    </div>
                </b-col>
                <b-col sm="3">
                    <div class="stages-detail">
                        <ul class="list-unstyled text-left pl-0">
                            <li class="mb-4">
                                <p class="mb-0">Configuration issues and other vulnerabilities with limited impact</p>
                                <h6>$100-$300</h6>
                            </li>
                            <li class="mb-4">
                                <p class="mb-0">Limited access to other user’s private data</p>
                                <h6>$300-$800</h6>
                            </li>
                            <li class="mb-4">
                                <p class="mb-0">Full Access to other user’s private data</p>
                                <h6>$800-$1,000</h6>
                            </li>
                            <li class="mb-4">
                                <p class="mb-0 mt-5">Systemic Compromise</p>
                                <h6>$1,000-$10,000</h6>
                            </li>
                        </ul>
                    </div>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-sm-6 offset-sm-1">
              <h3 class="d-inline-block text-left text-heading">{{$t('bounty.contact_us')}}</h3>
              <ContactForm class="mt-5" @verify="handleVerify"/>
            </b-col>
            <b-col class="col-sm-8 offset-sm-1 mt-5">
              <div class="disclosure">
                <div class="sub-detail">
                  <h3 class="d-inline-block text-left text-heading">{{$t('bounty.disclosure.title')}}</h3>
                  <p v-html="$t('bounty.disclosure.description')"></p>
                  <h4>{{ $t('bounty.disclosure.eligibility') }}</h4>
                  <p>{{ $t('bounty.disclosure.eligibility_detail') }}</p>
                  <h4>{{ $t('bounty.disclosure.scope') }}</h4>
                  <ul class="list-unstyled">
                    <li>{{ $t('bounty.disclosure.backend') }}</li>
                    <li>{{ $t('bounty.disclosure.admin') }}</li>
                    <li>{{ $t('bounty.disclosure.frontend') }}</li>
                  </ul>
                </div>
              </div>
              <div class="notice sub-detail">
                <h4>Notice</h4>
                <ul class="list-unstyled">
                  <li>(i) Automated testing is prohibited</li>
                  <li>(ii) Deadstock is not obligated to respond to, nor reward every submission</li>
                  <li>(iii) Any requests for monetary or other compensation will be deemed in violation of this Disclosure</li>
                  <li>(iv) You must be the first to report the issue to us, if this issue has been reported before, you will not receive a reward</li>
                  <li>(v) Please do not publicly disclose any Screenshots nor Videos, inlucluding posting material on Youtube or Vimeo</li>
                  <li>(vi) Failure to respond within 7 days to inquiries seeking more information, may disqualify you from the program</li>
                  <p>Failure to comply with the foregoing rules above may disqualify you from this program.</p>
                </ul>
                <h4>Conclusion</h4>
                <p>We want to thank you for going out of your way to protect the identity of our customers. If you need any help or have any questions on submitting or this disclosure, please email help@deadstock.co.</p>
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
  .detail-content
    font-size: 18px
    font-weight: $normal
    height: 242px
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
  .stages-detail
    & ul
        & li
            font-size: 16px
            line-height: 121.4%
            width: 196px
            h6
            font-weight: $medium
            p
            font-weight: $regular
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
  