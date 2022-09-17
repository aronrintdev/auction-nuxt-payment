<template>
  <b-col md="6" class="p-3">
    <div class="social-tabs">
      <b-row>
        <!-- Image -->
        <b-col md="1" class="social-logo">
          <img :src="require(`~/assets/img/icons/${img}`)" alt="logo" />
        </b-col>
        <!-- ./Image -->
        <b-col md="8" class="social-description social-accountname">
          <!-- Account Type name -->
          <span class="text-bold">{{ type }}</span>
          <!-- ./Account Type name -->
          <br />
          <!-- social account connected status -->
          <span
            v-if="connectionStatus === 'connected'"
            class="text-success text-bold connected-text"
            >{{ $t('preferences.profile.social_account_desc') }}</span
          >
          <!-- ./social account connected status -->
        </b-col>
        <b-col md="3" class="text-center social-button">
          <!-- Remove Button -->
          <b-button
            v-if="connectionStatus === 'connected'"
            variant="outline-danger"
            class="profile-social-link-button float-right text-danger"
            @click="remove(val)"
            >{{ $t('preferences.profile.remove') }}</b-button
          >
          <!-- ./Remove Button -->
          <!-- Connect Button -->
          <b-button
            v-else
            variant="outline-primary"
            class="profile-social-link-button float-right"
            @click="connect(val)"
          >
            {{ $t('preferences.profile.connect') }}
          </b-button>
          <!-- ./Connect Button -->
        </b-col>
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
</style>