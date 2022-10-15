<template>
  <div>
    <div class="main-image-section mx-auto">
      <div
        class="image-container d-flex justify-content-start align-items-start w-100 h-100"
      >
        <div class="ml-3 ml-sm-5 text-section">
          <p class="font-primary text-white fs-18 fw-6">
            Check out various ways of shopping today. We also offer robust
            payment options , such as
            <span class="text-decoration-underline">payment plans</span> and
            <span class="text-decoration-underline">crypto payments</span>.
          </p>
          <NuxtLink
            class="btn btn-outline-light rounded-0 text-decoration-none font-primary fs-20 fw-6 mt-1 mt-sm-4"
            to="/shop"
            >Shop Now</NuxtLink
          >
        </div>
      </div>
    </div>
    <div class="previous-and-next-links">
      <div class="d-flex align-items-center justify-content-between pt-4 pb-4">
        <NuxtLink :to="previousPageLink">
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
        <NuxtLink :to="nextPageLink">
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
    previousPage: {
      type: String,
      required: true,
    },
    previousPageLink: {
      type: String,
      required: true,
    },
    nextPage: {
      type: String,
      required: true,
    },
    nextPageLink: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.main-image-section
    width: 1209px
    height: 370px
    .image-container
        background-image: url('@/assets/img/features/browse-banner.png')
        background-repeat: no-repeat
        background-position: center
        background-size: cover
        .text-section
            width: 434px
            padding-top: 5rem
            p
                line-height: 184.4%
            a
                width: 194px
                height: 44px
.previous-and-next-links
    width: 1140px
    margin: 0 auto
    p.previous-link
        color: $color-gray-25
    p.next-link
        color: $color-gray-25
@media screen and (max-width: 1210px)
    .main-image-section
        width: 100%
    .previous-and-next-links
        width: 95%
@media screen and (max-width: 770px)
    .main-image-section
        height: 300px
        .image-container
            .text-section
                padding-top: 3rem
@media screen and (max-width: 426px)
    .main-image-section
        height: 208px
        .image-container
            background-image: url('@/assets/img/features/browse-banner-sm.png')
            .text-section
                width: 343px
                padding-top: 1rem
                p
                    font-size: 14px
                    font-weight: 700
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
