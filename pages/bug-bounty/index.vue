<template>
    <div class="f-montserrat">
      <BountyBanner />
      <div class="main-section pt-5">
        <div class="trade-selections">
          <b-row>
            <b-col class="col-sm-4 offset-sm-2">
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
            <b-col class="col-sm-4 text-left ">
              <h3 class="d-inline-block text-heading">{{$t('bounty.levels')}}</h3>
              <b-row  class="mt-5">
                <b-col sm="3">
                    <div class="stages">
                        <ul class="list-unstyled pl-0">
                            <li>
                                Low
                            </li>
                            <li>
                                Medium
                            </li>
                            <li>
                                High
                            </li>
                            <li>
                                Critical
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
                        <ul class="list-unstyled text-center pl-0">
                            <li>
                                <p>Configuration issues and other vulnerabilities with limited impact</p>
                                <h6>$100-$300</h6>
                            </li>
                            <li>
                                <p>Limited access to other user’s private data</p>
                                <h6>$300-$800</h6>
                            </li>
                            <li>
                                <p>Full Access to other user’s private data</p>
                                <h6>$800-$1,000</h6>
                            </li>
                            <li>
                                <p>Systemic Compromise</p>
                                <h6>$1,000-$10,000</h6>
                            </li>
                        </ul>
                    </div>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </div>
        <TradeHub v-if="navTab === 'trade_hub'"/>
        <BrowseTrade v-if="navTab === 'browse_trade'" />
      </div>
    </div>
  </template>
  
  <script>
  import BountyBanner from '~/pages/bug-bounty/Banner'
  import BrowseTrade from '~/pages/trades/BrowseTrade'
  import TradeHub from '~/pages/trades/TradeHub'
  
  export default {
    name: 'BugBounty',
    components: {
      BountyBanner,
      BrowseTrade,
      TradeHub
    },
    layout: 'IndexLayout',
    data(){
      return {
        navTab: 'browse_trade'
      }
    },
    methods: {
    }
  }
  </script>
  <style scoped lang="sass">
  @import '~/assets/css/_variables'
  @import '~/assets/css/_typography'

  .text-heading
    color: $color-blue-20
    font-size: 30px
  .detail-content
    font-size: 18px
    font-weight: $normal
    width: 477px
    height: 425px
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
            & p
            font-weight: $regular
            & h6
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
  
  </style>
  