<template>
  <section class="navigation-links mb-5">
    <div class="custom-container p-0" :class="{ 'mx-auto': centered }">
      <div class="d-flex justify-content-center gap-3" style="flex-flow: wrap">
        <nuxt-link
          v-if="$route.name !== 'profile-support-about-us'"
          to="/profile/support/about-us"
          class="navigation-link"
        >
          <div
            class="border p-4 br-10 text-center navigation-card h-100 d-flex justify-content-center align-items-center flex-column"
          >
            <img
              :src="require('~/assets/img/icons/about-us.svg')"
              class="fs-50"
            />
            <h2 class="text-base-blue fw-6 mt-3 fs-24 font-primary">
              {{ $t('preferences.profile.support.about_us.title') }}
            </h2>
            <h6 class="text-dark mb-0 fw-5 fs-14 text-black font-primary">
              {{
                $t('preferences.profile.support.navigation_links.about_us_desc')
              }}
            </h6>
          </div>
        </nuxt-link>
        <div
          v-if="$route.name !== 'profile-support-live-chat'"
          class="navigation-link live-chat"
          @click="openChat"
        >
          <div
            class="border p-4 br-10 text-center navigation-card h-100 d-flex justify-content-center align-items-center flex-column"
          >
            <img
              :src="require('~/assets/img/icons/live-chat.svg')"
              class="fs-50"
            />
            <h2 class="text-base-blue fw-6 mt-3 fs-24 font-primary">
              {{ $t('preferences.profile.support.live_chat.title') }}
            </h2>
            <h6 class="text-dark mb-0 fw-5 fs-14 text-black font-primary">
              {{
                $t(
                  'preferences.profile.support.navigation_links.live_chat_desc'
                )
              }}
            </h6>
          </div>
        </div>

        <nuxt-link
          v-if="$route.name !== 'profile-support-contact-us'"
          to="/profile/support/contact-us"
          class="navigation-link"
        >
          <div
            class="border p-4 br-10 text-center navigation-card h-100 d-flex justify-content-center align-items-center flex-column"
          >
            <img
              :src="require('~/assets/img/icons/feather-mail.svg')"
              class="fs-50"
            />
            <h2 class="text-base-blue fw-6 mt-3 fs-24 font-primary">
              {{ $t('preferences.profile.support.contact_us.title') }}
            </h2>
            <h6 class="text-dark mb-0 fw-5 fs-14 text-black font-primary">
              {{
                $t('preferences.profile.support.navigation_links.contact_desc')
              }}
            </h6>
          </div>
        </nuxt-link>

        <nuxt-link
          v-if="
            $route.name !== 'profile-support' &&
            $route.name !== 'profile-support-faqs'
          "
          to="/profile/support/faqs"
          class="navigation-link"
        >
          <div
            class="border p-4 br-10 text-center navigation-card h-100 d-flex justify-content-center align-items-center flex-column"
          >
            <img :src="require('~/assets/img/icons/faq.svg')" class="fs-50" />
            <h2 class="text-base-blue fw-6 mt-3 fs-24 font-primary">
              {{ $t('preferences.profile.support.faq.title_short') }}
            </h2>
            <h6 class="text-dark mb-0 fw-5 fs-14 text-black font-primary">
              {{ $t('preferences.profile.support.navigation_links.faq_desc') }}
            </h6>
          </div>
        </nuxt-link>
      </div>
      <nuxt-link
        v-if="$route.name === 'profile-support'"
        to="/faqs/support"
      >
        <div
          class="d-flex justify-content-between p-5 border br-10 align-items-center mt-5"
        >
          <h2 class="fs-26 fw-6 text-base-blue mb-0 font-primary">
            {{ $t('preferences.profile.support.faq.title') }}
          </h2>
          <img :src="require('assets/img/home/view-more.png')" />
        </div>
      </nuxt-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'NavigationsLinks',
  props: {
    centered: Boolean,
  },
  methods: {
    openChat() {
      this.$tawkMessenger.toggle()
    },
  },
}
</script>

<style lang="sass">
.navigation-links
  .custom-container
    width: 840px
  .navigation-card
    width: 260px
.live-chat
  cursor: pointer
</style>
