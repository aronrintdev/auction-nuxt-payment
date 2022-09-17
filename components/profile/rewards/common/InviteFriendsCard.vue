<template>
  <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <b-form class="custom-form mt-5" @submit.stop.prevent="handleSubmit(onSubmit)">
      <b-row>
        <b-col md="12" class="text-center">
          <b-card class="bg-gray-3 shadow-none">
            <b-row>
              <b-col md="12">
                <span class="body-7-bold d-block">{{ $t('rewards.invite_your_friends') }}</span>
                <span class="body-1-bold text-color-blue-2 mt-1 d-block">{{ $t('rewards.everybody_gets_points') }}</span>
                <span class="body-6-normal mt-2 d-block">{{ $t('rewards.you_will_receive_points', { points: points}) }}</span>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col md="12" class="d-flex align-items-center justify-content-center">
                <ValidationProvider
                  v-slot="validationContext"
                  :name="$t('rewards.email').toString()"
                  :rules="{ required: true, email: true, min: 3, max: 128 }"
                >
                  <b-form-group
                    label-cols="3"
                  >
                    <template #label>
                      <span class="body-5-normal">{{ $t('rewards.email') }}</span>
                    </template>
                    <b-form-input
                      id="email"
                      v-model="email"
                      size="sm"
                      :placeholder="$t('rewards.enter_your_friend_email')"
                      :state="getValidationState(validationContext)"
                    ></b-form-input>
                    <b-form-invalid-feedback>{{
                        validationContext.errors[0]
                      }}</b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col md="12" class="text-center">
                <Button type="submit" pill variant="confirm" class="px-5">{{ $t('rewards.send_invite') }}</Button>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Button from '~/components/common/Button'
import { BAD_REQUEST } from '~/static/constants'

export default {
  name: 'InviteFriendsCard',
  components: { ValidationObserver, ValidationProvider, Button },
  data() {
    return {
      email: '',
      // TODO: Temporary dummy data
      points: 50,
    }
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      // Returns the contextual state (validation style) of the element being validated (false for invalid, true for valid, or null for no validation state)
      return dirty || validated ? valid : null
    },
    onSubmit() {
      this.$axios.post('users/invite', {
        email: this.email
      },{ handleError: false })
        .then(() => {
        this.$toasted.success(this.$t('rewards.an_invitation_has_been_sent', { email: this.email }).toString())
      }).catch(error => {
        if (error.response.status === BAD_REQUEST)
          this.$toasted.error(this.$t(error.response.data.message).toString())
      })
    },
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.bg-gray-3
  background: $color-gray-3
</style>
