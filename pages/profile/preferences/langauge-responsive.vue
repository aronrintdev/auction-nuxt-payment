<template>
  <div
    v-if="isScreenXS"
    class="profile-component-wrapper responsive-language-select"
  >
    <!-- heading -->
    <div class="border-bottom">
      <span class="mb-2" role="button" @click="moveBack()">
        <img
          :src="require('~/assets/img/icons/back.svg')"
          alt="back-arrow"
          class="float-left"
        />
      </span>

      <span
        class="
          d-flex
          text-align-center
          align-items-center
          justify-content-center
          mt-3
          responsive-heading
          text-capitalize
          mb-3
        "
      >
        {{ $t('preferences.profile.profile') }}

        <span class="mobile-filter position-absolute mb-3">
          <img
            class="mobile-filter position-absolute"
            :src="require('~/assets/img/icons/filter-icon.svg')"
            alt="filter-icon"
          />
        </span>
      </span>
    </div>
    <!-- heading -->

    <!-- card -->
    <b-card class="mt-3 responsive-card mb-200">
      <!-- language Card heading-->
      <div class="card-text border-underline">
        <span class="language-heading">
          <span class="d-flex">
            {{ $t('preferences.profile.language') }}
          </span>
        </span>
        <p class="language-sub-heading mt-2 d-flex">
          {{ $t('preferences.profile.language_description') }}
        </p>

        <div class="preferred mb-3">
          {{ $t('preferences.profile.preferred_language') }}
        </div>
      </div>
      <!-- language Card heading-->

      <!-- content -->

      <div class="card-text border-underline py-2">
        <span
          class="language-label mx-3"
          role="button"
          @click="changeLang('en')"
        >
          {{ $t('preferences.profile.language_english') }}
          <span v-if="selectedEnglish" class="selected-icon position-absolute">
            <img
              :src="require('~/assets/img/icons/product/confirm-tick.svg')"
              alt="icon"
              class="selected-language"
            />
          </span>
        </span>
      </div>
      <div class="card-text border-underline py-2">
        <span
          class="language-label mx-3"
          role="button"
          @click="changeLang('sp')"
        >
          {{ $t('preferences.profile.language_spanish') }}
          <span v-if="selectedSpanish" class="selected-icon position-absolute">
            <img
              :src="require('~/assets/img/icons/product/confirm-tick.svg')"
              alt="icon"
              class="selected-language"
            />
          </span>
        </span>
      </div>
      <div class="card-text">
        <span
          class="language-label mx-3 py-2"
          role="button"
          @click="changeLang('fr')"
        >
          {{ $t('preferences.profile.language_french') }}
          <span v-if="selectedFrench" class="selected-icon mt-2">
            <img
              :src="require('~/assets/img/icons/product/confirm-tick.svg')"
              alt="icon"
              class="selected-language"
            />
          </span>
        </span>
      </div>
      <!-- content -->
    </b-card>
    <!-- card -->
  </div>
</template>

<script>
import screenSize from '~/plugins/mixins/screenSize'

export default {
  name: 'LanguageResponsive',
  components: {},
  mixins: [screenSize],

  layout: 'Profile',

  middleware: 'auth',

  data() {
    return {
      selectedFrench: false,
      selectedSpanish: false,
      selectedEnglish: false,
    }
  },

  methods: {
    // On language click, language is set, and the current route change to the selected language
    changeLang(lang) {
      if (lang === 'en') {
        this.selectedEnglish = true
        this.selectedSpanish = false
        this.selectedFrench = false
      } else if (lang === 'sp') {
        this.selectedSpanish = true
        this.selectedEnglish = false
        this.selectedFrench = false
      } else {
        this.selectedFrench = true
        this.selectedEnglish = false
        this.selectedSpanish = false
      }

      this.$store.commit('SET_LANG', lang)
      this.$router.push({
        path: `${this.$router.currentRoute.path}?lang=${lang}`,
      })
    },

    moveBack() {
      this.$router.push('/profile/preferences')
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.profile-component-wrapper
  padding: 4%

.responsive-heading
  font-family: $font-montserrat
  font-style: normal
  @include body-3-medium
  letter-spacing: -0.02em
  color: $color-black-1
  background-color: $color-white-1

.language-heading
  font-family: $font-sp-pro
  font-style: normal
  @include body-4-medium
  color: $color-blue-20

.mobile-filter
  right: 10px

.language-sub-heading
  font-family: $font-sp-pro
  font-style: normal
  @include body-21-regular
  color: $color-black-17

.border-underline
  border-bottom: 2px solid $color-white-24

.preferred
  font-family: $font-montserrat
  font-style: normal
  @include body-6-medium
  color: $color-black-17

.language-label
  font-family: $font-montserrat
  font-style: normal
  @include body-9-normal
  color: $color-black-17

.selected-language
  height: 35px
  width: 35px

.selected-icon
  right: 40px

.responsive-language-select
  height: 700px
</style>
