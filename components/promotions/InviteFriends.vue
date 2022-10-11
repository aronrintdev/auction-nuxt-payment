<template>
  <div v-if="$auth.user && !isScreenXS"
       class="my-5 p-4 d-flex align-items-center justify-content-center flex-column invite-friends">
    <div class="body-7-bold">{{ $t('promotions.invite_friends_start') }}</div>
    <div class="heading-2-bold">{{ $t('promotions.everybody_gets_points') }}</div>
    <div class="description mt-1">{{ $t('promotions.invite_friends_description') }}</div>
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <b-form class="d-flex flex-column justify-content-center" @submit.stop.prevent="handleSubmit(sendEmail)">
        <ValidationProvider
            v-slot="context"
            :name="$t('rewards.email').toString()"
            :rules="{ required: true, email: true, min: 3, max: 128 }"
            class="d-flex flex-column mt-3 email-input"
        >
          <b-form-group>
            <b-form-input
                v-model="form.email"
                :placeholder="$t('promotions.email_placeholder')"
                :state="getValidationState(context)"
                type="email"
            ></b-form-input>
            <b-form-invalid-feedback>{{
                context.errors[0]
              }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>
        <Button
            :disabled="loading"
            class="px-5 send-btn"
            pill
            type="submit"
            variant="primary"
        >
          {{ $t('promotions.send_invite') }}
        </Button>
      </b-form>
    </ValidationObserver>

  </div>
</template>
<script>
import {mapActions} from 'vuex';
import {ValidationObserver, ValidationProvider} from 'vee-validate';
import Button from '~/components/common/Button'
import {BAD_REQUEST} from '~/static/constants';
import screenSize from '~/plugins/mixins/screenSize';

export default {
  name: 'PromotionsInviteFriends',
  components: {
    Button,
    ValidationObserver,
    ValidationProvider
  },
  mixins: [screenSize],
  data() {
    return {
      form: {
        email: null
      },
      loading: false
    }
  },
  methods: {
    ...mapActions({
      inviteFriend: 'promotions/inviteFriend'
    }),
    getValidationState({dirty, validated, valid = null}) {
      // Returns the contextual state (validation style) of the element being validated (false for invalid, true for valid, or null for no validation state)
      return dirty || validated ? valid : null
    },
    sendEmail() {
      this.loading = true;
      this.inviteFriend(this.form.email).then(() => {
        this.$toasted.success(this.$t('promotions.invitation_sent', {email: this.form.email}).toString())
        this.form.email = null
      }).catch(error => {
        if (error.response.status === BAD_REQUEST)
          this.$toasted.error(this.$t(error.response.data.message).toString())
      }).finally(() => {
        this.loading = false
      })
    }
  }
};
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
::v-deep.email-input
  input
    border: none
    background: $color-white-1
    border-radius: 4px
    font-size: 14px
    width: 270px
    padding: 0.8em 1em

    &.is-invalid
      border: 1px solid $color-red-1

    &.is-valid
      border: 1px solid $color-green-1

</style>
