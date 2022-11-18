<template>
  <div>
    <Header/>
    <b-container fluid>
      <div
        class="main-image-section d-flex align-items-md-center align-items-top justify-content-center w-100"
      >
        <div class="w-100 d-block d-md-none p-3">
          <div class="d-flex justify-content-between align-items-baseline">
            <div>
              <h1
                v-if="error.statusCode === 404"
                class="font-primary fw-7 text-base-blue error-code"
              >
                404
              </h1>
              <!--  -->
              <h1
                v-else-if="error.statusCode === 500"
                class="font-primary fw-7 text-base-blue error-code"
              >
                500
              </h1>
            </div>
            <div>
              <NuxtLink
                :to="loggedIn === true ? '/' : '/login'"
                class="error-link nuxt-link-active font-primary fs-16 fw-5 text-decoration-underline text-gray-simple"
              >
                {{ $t('error_layout.go_back') }}
              </NuxtLink>
            </div>
          </div>
          <div>
            <h1 v-if="error.statusCode !== 404 && error.statusCode !== 500" class="font-primary fw-7 text-base-blue error-code">
              {{ $t('error_layout.oops_something_went_wrong') }}
            </h1>
            <h3 class="font-primary fs-24 fw-6 text-gray-47">
              {{ $t('error_layout.something_missing') }}
            </h3>
            <p class="font-primary fs-16 fw-5 text-gray-47 pre-line">
              <span>{{ $t('error_layout.the_page_is_missing') }}</span>
            </p>
          </div>
          <div class="d-flex justify-content-around">
            <div class="mt-sm-4 mb-sm-3">
              <b-button
                pill
                variant="outline-dark"
                class="home-button font-primary fs-16 fw-7 text-gray-simple px-5"
                @click="goToLink('/')"
              >{{ $t('error_layout.home') }}
              </b-button
              >
            </div>
            <div>
              <b-button
                class="shop-button font-primary fs-16 fw-7 text-gray-simple px-5"
                pill
                variant="outline-dark"
                @click="goToLink('/shop')"
              >{{ $t('error_layout.shop') }}
              </b-button
              >
            </div>
          </div>
          <div class="product-image text-center p-2 mt-4">
            <img
              src="@/assets/img/errors/jordan1chicago85-1.png"
              alt="Jordan 1 Chicago 85"
              width="80%"
              height="auto"
            />
          </div>
        </div>
        <div class="br-20 shadow product-error-box d-none d-md-block">
          <div
            class="d-flex justify-content-end align-items-center w-100 pt-0 pr-0 pt-sm-4 pr-sm-5"
          >

          </div>
          <div
            class="d-flex align-items-center justify-content-around flex-column flex-sm-row"
          >
            <div class="pl-0 pl-sm-3 error-code-section">
              <h1
                v-if="error.statusCode === 404"
                class="font-primary fw-7 text-base-blue error-code"
              >
                404
              </h1>
              <!--  -->
              <h1
                v-else-if="error.statusCode === 500"
                class="font-primary fw-7 text-base-blue error-code"
              >
                500
              </h1>
              <h1 v-else class="font-primary fw-7 text-base-blue error-code">
                {{ $t('error_layout.oops_something_went_wrong') }}
              </h1>
              <h3 class="font-primary fs-24 fw-6 text-gray-47">
                {{ $t('error_layout.something_missing') }}
              </h3>
              <p class="font-primary fs-16 fw-5 text-gray-47 pre-line">
                <span>{{ $t('error_layout.the_page_is_missing') }}</span>
              </p>
              <div
                class="d-flex justify-content-between justify-content-sm-center align-items-center flex-row mb-5 flex-sm-column mb-sm-0"
              >
                <div class="mt-sm-4 mb-sm-3">
                  <b-button
                    pill
                    variant="outline-dark"
                    class="home-button font-primary fs-16 fw-7 text-gray-simple"
                    @click="goToLink('/')"
                  >{{ $t('error_layout.home') }}
                  </b-button
                  >
                </div>
                <div>
                  <b-button
                    class="shop-button font-primary fs-16 fw-7 text-gray-simple"
                    pill
                    variant="outline-dark"
                    @click="goToLink('/shop')"
                  >{{ $t('error_layout.shop') }}
                  </b-button
                  >
                </div>
              </div>
            </div>

            <div class="product-image">
              <img
                src="@/assets/img/errors/jordan1chicago85-1.png"
                alt="Jordan 1 Chicago 85"
                width="100%"
                height="auto"
              />
            </div>
          </div>
        </div>
      </div>
    </b-container>
    <BottomNavigation class="d-flex d-md-none"/>
    <Footer class="d-none d-md-flex"/>
  </div>
</template>
<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import BottomNavigation from '~/components/homepage/BottomNavigation.vue'

export default {
  components: {
    Header,
    Footer,
    BottomNavigation,
  },
  props: {
    error: {
      type: [Object, Error],
      default: () => {
      },
    },
  },
  data() {
    return {
      loggedIn: this.$auth.loggedIn,
    }
  },
  methods: {
    goToLink(link) {
      this.$router.push({path: link})
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.main-image-section
  background-image: url('@/assets/img/errors/jordan.png')
  height: calc(100vh - 69px)
  background-position: right center
  background-size: contain
  background-repeat: no-repeat

  .product-error-box
    width: 810px
    height: 490px
    background: radial-gradient(30.26% 63.14% at 68.94% 65.92%, rgba(207, 207, 207, 0.65) 0%, rgba(255, 255, 255, 0.65) 68.98%)

    .error-code-section
      h1.error-code
        font-size: 128px
        line-height: 156px

      button
        width: 150px
        height: 40px
        border: 1px solid $color-black-1
        border-radius: 28px

        &:hover
          color: $color-white-1
          background-color: $color-black-1

    .product-image
      width: 470px
      height: 100%
      background-image: none

@media (max-width: 992px)
  h1.font-primary
    font-size: 64px
    line-height: 78px

@media screen and (max-width: 376px)
  .main-image-section
    background-position: center center

    .product-error-box
      border-radius: 0 !important
      box-shadow: none !important
      position: relative

      a
        position: absolute
        top: 35px
        right: 25px

      .error-code-section
        width: 315px

        h1.error-code
          font-size: 64px
          line-height: 78px

      .product-image
        width: 100%
        background-image: url('@/assets/img/errors/jordan.png')
        background-position: center
        background-size: 650px
        background-repeat: no-repeat

        img
          width: 265px
          margin: 0 35px
</style>
