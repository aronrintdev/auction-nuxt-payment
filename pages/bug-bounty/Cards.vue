<template>
    <section class="navigation-links mb-5">
      <div class="custom-container p-0" :class="{ 'mx-auto': centered }">
        <div class="d-flex justify-content-center gap-3" style="flex-flow: wrap">
          
            <div
                class="border p-4 br-10 text-center navigation-card h-100 d-flex justify-content-center align-items-center flex-column"
            >
                <img
                    src="~/assets/img/bug-bounty/log-icon.png"
                    class="fs-50"
                />
                <h2 class="text-black fw-7 mt-3 fs-24 font-primary">
                    {{ $t('bounty.stages.low') }}
                </h2>
                <h6 class="text-dark mb-0 fw-6 fs-16 text-black font-primary">
                    $20 - 50
                </h6>
                <Button variant="link" underlined-text>{{
        $t('common.learn_more')
      }}</Button>
            </div>
            
            <div
              class="border p-4 br-10 text-center navigation-card h-100 d-flex justify-content-center align-items-center flex-column"
            >
              <img
                src="~/assets/img/bug-bounty/high.png"
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
            <div
              class="border p-4 br-10 text-center navigation-card h-100 d-flex justify-content-center align-items-center flex-column"
            >
              <img
                src="~/assets/img/bug-bounty/medium.png"
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
        </div>
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
      height: 242px !important
  .live-chat
    cursor: pointer
  </style>
  