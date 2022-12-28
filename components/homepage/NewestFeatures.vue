<template>
  <div class="section-wrapper">
    <SectionHeader
      :title="$t('home_page.newest_features')"
      :desc="$t('home_page.newestfeatures_description')"
      :label="$t('home_page.view_more_features')"
      to="/features"
    />

    <div class="newest-features-grid position-relative row no-gutters">
      <div class="col-12 col-sm-6 row no-gutters border-right features-sm">
        <div class="col-7 col-sm-12 border-bottom">
          <NuxtLink to="./features/shareable-wishlists-and-watchlists">
            <div class="overflow-wrapper position-relative">
              <img
                width="100%"
                class="d-none d-sm-block"
                :src="require('~/assets/img/home/features/features1.svg')"
              />
              <img
                width="100%"
                height="93px"
                class="d-block d-sm-none"
                :src="require('~/assets/img/home/features/features1-sm.png')"
              />
              <h1
                class="feature-title position-absolute text-center fs-24 fw-4 font-primary text-white mb-0 d-none d-sm-block"
              >
                {{ $t('home_page.shareable_wishlist') }}
              </h1>
              <h1
                class="feature-title position-absolute text-center fs-24 fw-4 font-primary text-white mb-0 d-block d-sm-none"
              >
                {{ $t('home_page.shareable_wishlist_sm') }}
              </h1>
            </div>
          </NuxtLink>
        </div>
        <div class="col-5 col-sm-6 border-right">
          <NuxtLink to="./features/trading">
            <div class="overflow-wrapper">
              <img
                width="100%"
                height="441px"
                class="d-none d-sm-block"
                :src="require('~/assets/img/home/features/features3.svg')"
              />
              <img
                width="100%"
                height="93px"
                class="d-block d-sm-none"
                :src="require('~/assets/img/home/features/features3-sm.png')"
              />
              <h1
                class="feature-title position-absolute text-center fs-24 fw-4 font-primary text-white mb-0"
              >
                {{ $t('home_page.trade') }}
              </h1>
            </div>
          </NuxtLink>
        </div>
        <div class="col-5 col-sm-6">
          <NuxtLink to="./features/crypto-payments">
            <div class="overflow-wrapper">
              <img
                width="100%"
                height="441px"
                class="d-none d-sm-block"
                :src="require('~/assets/img/home/features/features4.svg')"
              />
              <img
                width="100%"
                height="auto"
                class="d-block d-sm-none"
                :src="require('~/assets/img/home/features/features4-sm.png')"
              />
              <h1
                class="feature-title position-absolute text-center fs-24 fw-4 font-primary text-white mb-0"
              >
                {{ $t('home_page.crypto') }} <br />
                <span class="d-none d-md-inline-block">
                  {{ $t('home_page.payments') }}
                </span>
              </h1>
            </div>
          </NuxtLink>
        </div>
        <div class="col-7 d-flex d-sm-none border-bottom">
          <NuxtLink to="./features/streetwear">
            <div class="overflow-wrapper">
              <img
                width="100%"
                height="100%"
                :src="require('~/assets/img/home/features/features2-sm.png')"
              />
              <h1
                class="feature-title position-absolute text-center fs-24 fw-4 font-primary text-white mb-0"
              >
                {{ $t('home_page.clothing') }}
              </h1>
            </div>
          </NuxtLink>
        </div>
      </div>
      <div class="col-6 row no-gutters d-none d-sm-flex">
        <NuxtLink to="./features/streetwear">
          <div class="col-12 border-bottom">
            <div class="overflow-wrapper">
              <img
                width="100%"
                :src="require('~/assets/img/home/features/features2.svg')"
              />
              <h1
                class="feature-title position-absolute text-center fs-24 fw-4 font-primary text-white mb-0"
              >
                {{ $t('home_page.clothing') }}
              </h1>
            </div>
          </div>
        </NuxtLink>
        <div class="col-6 border-right">
          <NuxtLink to="./features/instant-shipping">
            <div class="overflow-wrapper">
              <img
                width="100%"
                height="327px"
                :src="require('~/assets/img/home/features/features5.svg')"
              />
              <h1
                class="feature-title position-absolute text-center fs-24 fw-4 font-primary text-white mb-0"
              >
                {{ $t('home_page.instant_shipping') }}
              </h1>
            </div>
          </NuxtLink>
        </div>
        <div class="col-6">
          <NuxtLink to="./features/auctions">
            <div class="overflow-wrapper">
              <img
                width="100%"
                height="auto"
                :src="require('~/assets/img/home/features/features6.svg')"
              />
              <h1
                class="feature-title position-absolute text-center fs-24 fw-4 font-primary text-white mb-0"
              >
                {{ $t('home_page.auctions') }}
              </h1>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NewestFeatures',
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.newest-features-grid
  margin-top: 33px
  &:after
    border: 8px solid $color-white-1
    width: 100%
    height: 100%
    position: absolute
    top: 0
.overflow-wrapper
  margin: 0.5rem
  .feature-title
    top: 50%
    left: 50%
    width: 90%
    translate: -50% -50%
    background: $color-black-rgb3
    padding: 10px
    @media (max-width: 550px)
      font-size: 16px
      background: none
.features-sm
  @media (max-width: 550px)
    &.border-right
      border-right: 0 !important
    div:nth-child(1), div:nth-child(3)
      border-right: 1px solid $white-2
    div:nth-child(2)
      border-bottom: 1px solid $white-2
      border-right: 0 !important
    div.border-bottom:nth-child(4)
      border-bottom: 0 !important
</style>
