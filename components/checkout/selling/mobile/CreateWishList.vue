<template>
  <b-row class="outer-wrapper">
    <b-col cols="12" sm="12">
      <!-- Top Title -->
      <b-row>
        <b-col cols="12" sm="12">
          <div class="body-32-bold">{{ $t('wish_lists.create_new_list') }}</div>
        </b-col>
      </b-row>
      <!-- End of Top Title -->

      <b-row class="form-wrapper">
        <b-col cols="12" sm="12">
          <div class="body-9-bold">{{ $t('wish_lists.list_name') }}</div>
          <b-form-input
            v-model="inputWishListName"
            :placeholder="$t('wish_lists.enter_name')"
          />
        </b-col>
      </b-row>

      <b-row class="wishlist-text-wrapper">
        <b-col cols="12" sm="12">
          <div class="body-9-normal">{{ $t('wish_lists.all_lists_are_private') }}&period;</div>
        </b-col>
      </b-row>

      <!-- Create List Button -->
      <b-row class="create-btn-wrapper">
        <b-col cols="12" sm="12" class="px-0">
          <Button
            :disabled="isButtonDisabled"
            class="body-4-medium"
            pill
            block
            variant="dark-blue"
            @click="handleCreateListButtonClick"
          >{{ $t('wish_lists.create_list') }}
          </Button>
        </b-col>
      </b-row>
      <!-- End of Create List Button -->
    </b-col>
  </b-row>
</template>

<script>
import { mapActions } from 'vuex'
import Button from '~/components/common/Button'

export default {
  name: 'CreateWishList',
  components: { Button },
  data() {
    return {
      inputWishListName: ''
    }
  },
  computed: {
    isButtonDisabled(vm) {
      return (! vm.inputWishListName)
    }
  },
  methods: {
    ...mapActions({
      createWishList: 'wish-list/createWishList'
    }),
    handleCreateListButtonClick() {
      if (! this.$auth.loggedIn) {
        return this.$router.push('/login')
      }

      this.createWishList({ name: this.inputWishListName, privacy: 'private' }).then((data) => {
        this.$toasted.success(this.$t('wish_lists.list_has_been_created', { list: data.name }).toString())
        this.$parent.$parent.close()
      })
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.outer-wrapper
  margin: 6px 21px 0

  div, input, button
    font-family: 'SF Pro Display', serif

  .form-wrapper
    margin-top: 13px

    input
      margin-top: 20px
      background: $color-white-5
      border-radius: 0.5rem

      &::placeholder, &:-ms-input-placeholder, &::-ms-input-placeholder
        @include body-9-regular
        color: $color-gray-5

  .wishlist-text-wrapper
    margin-top: 12px

  .create-btn-wrapper
    margin: 43px 0 32px

    button
      height: 40px

      &:disabled
        border: none
        background: $color-gray-1
        color: $color-gray-47
</style>
