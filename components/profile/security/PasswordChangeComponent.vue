<template>
  <div class="password-component">
    <div id="password-component-title">{{ $t('change_password.password') }}</div>
    <div id="change-password-form-title" class="mb-4 mt-4 text-bold">{{ $t('change_password.change_password') }}</div>

    <b-form @submit.prevent="changePassword" @reset.prevent="resetForm">
      <b-form-group
        id="group-current-password"
        :label="$t('change_password.current_password').toString()"
        label-for="current-password"
      >
        <b-form-input
          id="current-password"
          v-model="form.current_password"
          type="password"
          :placeholder="$t('change_password.current_password').toString()"
          class="rounded-pill"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="group-new-password"
        :label="$t('change_password.new_password').toString()"
        label-for="new-password"
        :description="$t('change_password.password_policy').toString()"
      >
        <b-form-input
          id="new-password"
          v-model="form.password"
          type="password"
          :placeholder="$t('change_password.new_password').toString()"
          class="rounded-pill"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="group-confirm-password"
        :label="$t('change_password.confirm_password').toString()"
        label-for="confirm-password"
      >
        <b-form-input
          id="confirm-password"
          v-model="form.password_confirmation"
          type="password"
          :placeholder="$t('change_password.confirm_password').toString()"
          class="rounded-pill"
          required
        ></b-form-input>
      </b-form-group>

      <div class="text-right">
        <b-button type="submit" class="btn-update">{{ $t('common.update') }}</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'PasswordChangeComponent',
  data() {
    return {
      form: {
        current_password: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  methods: {
    resetForm() {
      this.form.current_password = '';
      this.form.password = '';
      this.form.password_confirmation = '';
    },
    changePassword() {
      const url = '/change-password';
      this.$axios.post(url, this.form)
        .then(resp => {
          if (resp.status === 200) {
            this.$toasted.success(this.$t('change_password.msg_password_change_success').toString()).toString();
            this.resetForm();
          }
        })
        .catch(err => {
          const errors = err.response.data.errors;

          errors.current_password.forEach(msg => {
            this.$toasted.error(msg).toString();
          });

          errors.password.forEach(msg => {
            this.$toasted.error(msg).toString();
          });
        });
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

#password-component-title
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $medium
  font-size: 30px
  line-height: 37px
  color: $color-blue-20

#change-password-form-title
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $normal
  font-size: 20px
  line-height: 24px

.btn-update
  background: $color-gray-47
  border-radius: 20px
  border-color: $color-gray-47
  padding: 5px 50px

  &:hover
    box-shadow: 0 0.15rem 0.25rem $color-black-rgb3

@media (max-width: 767px)
  .password-component
    font-family: $font-family-sf-pro-display
    padding: 20px
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25)
    border-radius: 10px
    @include body-10-medium

  #password-component-title
    font-family: $font-family-sf-pro-display
    @include body-13-medium

  #change-password-form-title
    font-family: $font-family-sf-pro-display
    @include body-10-medium

</style>
