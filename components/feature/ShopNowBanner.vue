<template>
  <div class="mb-2 mb-sm-5">
    <div class="main-image-section mx-auto">
      <div
        class="image-container d-flex justify-content-start align-items-start align-items-sm-center w-100 h-100"
      >
        <div class="ml-3 ml-sm-5 text-section">
          <p class="font-primary text-white fs-18 fw-6 mb-0 mb-sm-2">
            {{ $t(shopNowDescription) }}
          </p>
          <NuxtLink
            class="btn btn-outline-light rounded-0 text-decoration-none font-primary fs-20 fw-6 mt-2 mt-sm-4"
            to="/shop"
            >{{ $t(shopNowButtonText) }}</NuxtLink
          >
        </div>
      </div>
    </div>
    <div class="previous-and-next-links">
      <div class="d-flex align-items-center justify-content-between pt-4 pb-4">
        <NuxtLink
          v-if="previousPage && previousPageLink"
          :to="previousPageLink"
        >
          <div class="d-flex align-items-center">
            <img
              src="@/assets/img/features/previous-arrow.png"
              alt="Previous Arrow"
              width="18px"
              height="auto"
              class="d-none d-sm-block"
            />
            <img
              src="@/assets/img/features/previous-arrow-sm.png"
              alt="Previous Arrow"
              width="34px"
              height="auto"
              class="d-sm-none d-block"
            />
            <div class="d-block ml-2 ml-sm-4">
              <p
                class="previous mb-0 font-primary fs-18 fw-6 text-black d-none d-sm-block"
              >
                {{ $t('newest_features.previous') }}
              </p>
              <p class="previous-link mb-0 font-primary fs-18 fw-4">
                {{ $t(previousPage) }}
              </p>
            </div>
          </div>
        </NuxtLink>
        <NuxtLink v-if="nextPage && nextPageLink" :to="nextPageLink">
          <div class="d-flex align-items-center">
            <div class="d-block mr-2 mr-sm-4">
              <p
                class="next mb-0 font-primary fs-18 fw-6 text-black text-right d-none d-sm-block"
              >
                {{ $t('newest_features.next') }}
              </p>
              <p class="next-link mb-0 font-primary fs-18 fw-4">
                {{ $t(nextPage) }}
              </p>
            </div>
            <img
              src="@/assets/img/features/next-arrow.png"
              alt="Next Arrow"
              width="18px"
              height="auto"
              class="d-none d-sm-block"
            />
            <img
              src="@/assets/img/features/next-arrow-sm.png"
              alt="Next Arrow"
              width="34px"
              height="auto"
              class="d-sm-none d-block"
            />
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    shopNowDescription: {
      type: String,
      required: true,
    },
    shopNowButtonText: {
      type: String,
      required: true,
    },
    previousPage: {
      type: String,
      default: '',
    },
    previousPageLink: {
      type: String,
      default: '',
    },
    nextPage: {
      type: String,
      default: '',
    },
    nextPageLink: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.main-image-section
    width: 1196px
    height: 366px
    .image-container
        background-image: url('@/assets/img/features/browse-banner.png')
        background-repeat: no-repeat
        background-position: center
        background-size: cover
        .text-section
            width: 476px
            // padding-top: 2.75rem
            p
                line-height: 184.4%
            a
                width: 194px
                height: 44px
.previous-and-next-links
    width: 1029px
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
    // .previous-and-next-links
    //     width: 95%
@media screen and (max-width: 770px)
    .main-image-section
        height: 300px
@media screen and (max-width: 577px)
    .main-image-section
        height: 208px
        .image-container
            background-image: url('@/assets/img/features/browse-banner-sm.png')
            .text-section
                width: 343px
                padding-top: 1rem
                p
                    font-size: 14px
                    font-weight: 600
                a
                    font-size: 16px
                    width: 151px
    .previous-and-next-links
        p.previous-link
            font-size: 12px
            font-weight: 500
            color: $color-gray-5
        p.next-link
            font-size: 12px
            font-weight: 500
            color: $color-gray-5
</style>
