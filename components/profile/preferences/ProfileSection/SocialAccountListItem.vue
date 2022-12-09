<template>
  <b-col md="12" class="m-0 p-0">
    <div class="social-tabs ml-30 mb-46">
      <b-row class="mb-2 mt-2 ml-2">
        <!-- Image -->


        <b-col class="social-logo p-0 m-0 d-block d-flex" :class="{'col-md-2': !responsiveDesign}">
          <img :class="responsiveDesign && 'icon-image'" :src="require(`~/assets/img/icons/${img}`)" alt="logo" />

          <div v-if="responsiveDesign" class="text-bold social-media-label ml-2">
              <span class="responsive-social-name">{{ type }}</span>
            <div
            v-if="connectionStatus === 'connected'"
            class="text-success connected-text-responsive">
            {{ $t('preferences.profile.social_account_desc') }}
            </div>
          </div>
          <!-- for responsive design-->

        </b-col>
        <!-- ./Image -->
        <b-col v-if="!responsiveDesign" md="8" class="social-description social-accountname ml-26 col-md-8 p-0 mt-2">
          <!-- Account Type name -->
          <span class="text-bold account-type-name">{{ type }}</span>
          <!-- ./Account Type name -->
          <br />
          <!-- social account connected status -->
          <span
            v-if="connectionStatus === 'connected' && !responsiveDesign"
            class="connected-text"
            >{{ $t('preferences.profile.social_account_desc') }}</span
          >
          <!-- ./social account connected status -->
        </b-col>
        <b-col v-if="!responsiveDesign" md="2" class="text-center social-button">
          <!-- Remove Button -->
          <b-button
            v-if="connectionStatus === 'connected'"
            variant="outline-danger"
            class="profile-social-link-button float-right text-danger mt-2"
            @click="remove(val)"
            >{{ $t('preferences.profile.remove') }}</b-button
          >
          <!-- Remove Button -->

          <!-- Connect Button -->
          <b-button
            v-else
            variant="outline-primary"
            class="profile-social-link-button float-right mt-2"
            @click="connect(val)"
          >
            {{ $t('preferences.profile.connect') }}
          </b-button>
          <!-- ./Connect Button -->
        </b-col>

        <!-- Buttons for responsive design -->
        <b-col v-if="responsiveDesign" md="3" cols="4" class="text-center  social-button">

          <b-button
              v-if="connectionStatus === 'connected'"
              variant="social-media-connected"
              class="
              align-items-center
              text-align-center
              justify-content-between
              "
              @click="remove(val)"
          >
            <span class="btn-text-account-connected">{{ $t('preferences.profile.remove') }}</span>
          </b-button>
          <b-button
            v-else
            variant="social-media-connect"
            class="
            align-items-center
            text-align-center
            justify-content-center
            "
            @click="connect(val)"
            >
            <span class="btn-text">{{ $t('preferences.profile.connect') }}</span>
          </b-button>
        </b-col>
          <!-- Buttons for responsive design -->

      </b-row>
    </div>
  </b-col>
</template>

<script>
export default {
  name: 'SocialAccountListItem',

  props: {
    type: {
      type: String,
      required: true,
    },

    responsiveDesign:{
      type: Boolean,
      default: false
    },

    img: {
      type: String,
      required: true,
    },
    val: {
      type: String,
      required: true,
    },
    connectionStatus: {
      type: String,
      default: null,
    },
  },

  methods: {
    connect(type) {
      this.$emit('connectTo', type)
    },
    remove(type) {
      this.$emit('remove', type)
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.social-button
  .profile-social-link-button
    border-color: $color-blue-2
    color: $color-blue-2

.connected-text-responsive
  font-family: $font-montserrat
  font-style: normal
  width: 100%
  @include body-6-normal
  letter-spacing: -0.015em
  color: $color-green-4
.btn-social-media-connected
    right: 8px
    box-sizing: border-box
    border: 1px solid $color-red-3
    border-radius: 10px
.btn-text-account-connected
    font-family: $font-montserrat
    font-style: normal
    @include body-9-normal
    color: $color-red-3
.btn-social-media-connect
    right: 8px
    box-sizing: border-box
    border: 1px solid $color-blue-1
    border-radius: 10px
.btn-text
    font-family: $font-montserrat
    font-style: normal
    @include body-9-normal
    color: $color-blue-1
.icon-image
  width: 32px
  height: 32px

@media (max-width:430px )
  #social-media-list
    padding: 1rem  0 1rem 0
</style>
