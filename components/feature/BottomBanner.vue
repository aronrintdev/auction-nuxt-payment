<template>
  <div class="mb-2 mb-sm-5">
    <div
      v-if="
        $route.path != '/features/social-signin' &&
        $route.path != '/features/international-languages'
      "
      class="main-image-section mx-auto"
      :style="`--image: url(${bottomBannerImage}); --imageXS: url(${bottomBannerImageXS})`"
    >
      <div
        class="image-container d-flex justify-content-start align-items-end w-100 h-100"
      >
        <div v-if="!isScreenXS" class="ml-4 mb-4 p-4 text-section">
          <p
            class="font-primary text-white fs-18 fw-6 mb-0 mb-sm-2"
            v-html="$t(bottomBannerDescription)"
          ></p>
          <NuxtLink
            class="btn btn-outline-light rounded-0 text-decoration-none font-primary fs-20 fw-6 mt-2 mt-sm-4"
            :to="bottomBannerButtonLink"
            >{{ $t(bottomBannerButtonText) }}</NuxtLink
          >
        </div>
      </div>
    </div>
    <div
      v-if="
        $route.path != '/features/social-signin' &&
        $route.path != '/features/international-languages' &&
        isScreenXS
      "
      class="bottom-mobile-text-section mx-auto mt-1"
    >
      <p
        class="font-primary fs-12 fw-7 text-black"
        v-html="$t(bottomBannerDescriptionXS)"
      ></p>
      <div class="d-flex justify-content-end align-items-center">
        <NuxtLink
          class="d-flex align-items-center justify-content-center text-center text-decoration-none font-primary fs-14 fw-6"
          :to="bottomBannerButtonLink"
          >{{ $t(bottomBannerButtonText) }}</NuxtLink
        >
      </div>
    </div>
    <div class="previous-and-next-links mt-5 mb-4 mb-sm-0">
      <div class="d-flex align-items-center justify-content-between">
        <NuxtLink
          v-if="previousPage && previousPageLink"
          :to="previousPageLink"
          class="previous-text d-inline-flex justify-content-center align-items-center"
        >
          <div class="d-flex align-items-center">
            <img
              src="@/assets/img/features/previous-arrow.png"
              alt="Previous Arrow"
              width="32px"
              height="auto"
              class="d-none d-sm-block"
            />
            <img
              src="@/assets/img/features/previous-arrow-sm.png"
              alt="Previous Arrow"
              width="7.04px"
              height="12px"
              class="d-sm-none d-block mr-1"
            />
            <div class="d-block ml-2 ml-sm-3">
              <p
                class="previous-link mb-0 font-primary fs-18 fw-4 d-none d-sm-block"
              >
                {{ $t(previousPage) }}
              </p>
              <p
                class="previous-link mb-0 font-primary fs-12 fw-5 text-white d-block d-sm-none"
              >
                {{ $t(previousPageXS) }}
              </p>
            </div>
          </div>
        </NuxtLink>
        <NuxtLink
          v-if="nextPage && nextPageLink"
          :to="nextPageLink"
          class="next-text d-inline-flex justify-content-center align-items-center"
          :class="{
            'ml-auto':
              previousPage === null &&
              previousPageXS === null &&
              previousPageLink === null,
          }"
        >
          <div class="d-flex align-items-center">
            <div class="d-block mr-2 mr-sm-3">
              <p
                class="next-link mb-0 font-primary fs-18 fw-4 d-none d-sm-block"
              >
                {{ $t(nextPage) }}
              </p>
              <p
                class="next-link mb-0 font-primary fs-12 fw-5 text-white text-right d-block d-sm-none"
              >
                {{ $t(nextPageXS) }}
              </p>
            </div>
            <img
              src="@/assets/img/features/next-arrow.png"
              alt="Next Arrow"
              width="32px"
              height="auto"
              class="d-none d-sm-block"
            />
            <img
              src="@/assets/img/features/next-arrow-sm.png"
              alt="Next Arrow"
              width="7.04px"
              height="12px"
              class="d-sm-none d-block ml-1"
            />
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script>
import screenSize from '~/plugins/mixins/screenSize'
export default {
  mixins: [screenSize],
  props: {
    bottomBannerImage: {
      type: String,
      default: null,
    },
    bottomBannerImageXS: {
      type: String,
      default: null,
    },
    bottomBannerDescription: {
      type: String,
      default: null,
    },
    bottomBannerDescriptionXS: {
      type: String,
      default: null,
    },
    bottomBannerButtonLink: {
      type: String,
      default: null,
    },
    bottomBannerButtonText: {
      type: String,
      default: null,
    },
    previousPage: {
      type: String,
      default: null,
    },
    previousPageXS: {
      type: String,
      default: null,
    },
    previousPageLink: {
      type: String,
      default: null,
    },
    nextPage: {
      type: String,
      default: null,
    },
    nextPageXS: {
      type: String,
      default: null,
    },
    nextPageLink: {
      type: String,
      default: null,
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.main-image-section
  width: 1216px
  height: 372px
  .image-container
    background-repeat: no-repeat
    background-position: center
    background-size: cover
    background-image: var(--image)
    @media (max-width: 577px)
      background-image: var(--imageXS)
      width: 343px
      height: 190px
    .text-section
      width: 491px
      height: auto
      background-color: rgba(0, 0, 0, 0.35)
      p
        line-height: 184.4%
      a
        min-width: 194px
        max-width: 252px
        min-height: 44px
.previous-and-next-links
  width: 1200px
  margin: 0 auto
  p.previous-link
      color: $color-gray-25
  p.next-link
      color: $color-gray-25
@media screen and (max-width: 1280px)
  .main-image-section
    width: 1024px
  .previous-and-next-links
    width: 95%
@media screen and (max-width: 1210px)
  .main-image-section
    width: 100%
@media screen and (max-width: 770px)
  .main-image-section
    height: 300px
@media screen and (max-width: 577px)
  .main-image-section
    width: 343px
    height: 190px
    .image-container
      .text-section
        width: 343px
        padding-top: 1rem
        p
          font-size: 14px
          font-weight: 600
        a
          font-size: 16px
          min-width: 151px
  .bottom-mobile-text-section
    width: 343px
    p
      line-height: 174.4%
    a
      width: 151px
      height: 44px
      background-color: $color-black-1
      color: $color-white-1
      border-radius: 4px
  .previous-and-next-links
    width: 343px
    a.previous-text
      background-color: $color-blue-20
      min-width: 91px
      width: auto
      max-width: 181px
      height: 36px
      padding: 0px 7px
    a.next-text
      background-color: $color-black-1
      min-width: 91px
      width: auto
      max-width: 181px
      height: 36px
      padding: 0px 7px
</style>
