<template>
  <div>
    <div class="d-flex justify-content-between align-items-center px-3 pb-4">
      <div class="title">{{ $t('wish_lists.create_new_list') }}</div>
      <div>
        <a role="button" @click="$emit('close')" class="btn-cancel">{{ $t('common.cancel') }}</a>
      </div>
    </div>
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <b-form @submit.stop.prevent="handleSubmit(createNewList)">
        <div class="checkbox-container px-3">
          <div class="checkbox-switch-wrapper">
            <CheckboxSwitch
              v-model="newListPrivacy"
              :label-on="$t('common.public')"
              :label-off="$t('common.private')"
            />
          </div>
        </div>
        <div class="mt-17px px-3">
          <ValidationProvider
            v-slot="validationContext"
            :name="$t('wish_lists.list_name')"
            :rules="{ required: true, min: 3, max: 255 }"
          >
            <b-form-group
              label-for="list-name"
              :label="$t('wish_lists.list_name')"
            >
              <b-input-group class="d-flex input-wrapper px-2 align-items-center mt-11px">
                <b-form-input
                  id="list-name"
                  v-model="newListName"
                  aria-describedby="input-live-help"
                  placeholder="Enter Text"
                  trim
                ></b-form-input>
                <b-input-group-append>
                  <clearIcon v-if="newListName.length" @click="newListName = ''"/>
                </b-input-group-append>
              </b-input-group>
              <b-form-invalid-feedback>{{
                  validationContext.errors[0]
                }}</b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
        </div>
        <div class="mt-2 px-3 text-center">
          <Button
            class="btnSave"
            ref="btnSave"
            type="submit"
            variant="dark-blue"
            pill
            :disabled="!newListName || loading"
          >
            {{ $t('wish_lists.create_list') }}
          </Button>
        </div>
      </b-form>
    </ValidationObserver>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Button from '~/components/common/Button.vue'
import CheckboxSwitch from '~/components/common/CheckboxSwitch'
import clearIcon from '~/assets/img/profile/notifications/clear.svg?inline';

export default {
  name: 'CreateWatchListMobile',
  components: {
    ValidationObserver, ValidationProvider, Button, CheckboxSwitch, clearIcon
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      newListName: '',
      newListPrivacy: false,
      loading: false,
      wishList: null,
    }
  },
  methods: {
    ...mapActions({
      createWishList: 'wish-list/createWishList',
      addProductsToWishList: 'wish-list/addProductsToWishList',
    }),
    // Create new wishlist
    async createNewList() {
      if (this.newListName) {
        this.loading = true
        const wishList = await this.createWishList({
          name: this.newListName,
          privacy: this.newListPrivacy ? 'public' : 'private',
        })
        this.createdWishlist = await this.addProductsToWishList({
          wishList,
          ids: [this.product.id],
        })

        this.$emit('wishlisted', { wishList, ids: [this.product.id] })

        this.loading = false
        this.$emit('created', wishList)
        this.$emit('close')
      }
      else if(this.createWishList === 0){
        this.$toasted.error(
          this.$t('wish_lists.invalid_data')
        )
      }
      else if(this.createWishList >= 255){
        this.$toasted.error(
          this.$t('wish_lists.invalid_data')
        )
      }
    },
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
::v-deep .checkbox-switch
  line-height: 32px
  span[role='button']
    font-family: $font-family-sf-pro-display
    @include body-5-bold
    margin-top: 7px
  .custom-switch
    height: 31px
    margin-right: 20px
    .custom-control-label::before
      background-color: rgba(120, 120, 128, 0)
      border: none
      height: 31px
      width: 51px
      box-shadow: none
      background-image: url('~/assets/img/profile/wishlist/toggle-bg.svg')
      background-repeat: no-repeat

    .custom-control-label::after
      background: $color-white
      border: 0.5px solid rgba(0, 0, 0, 0.04)
      box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.15), 0px 3px 1px rgba(0, 0, 0, 0.06)
      width: 27px
      height: 27px
      border-radius: 100%

    .custom-control-input:checked ~ .custom-control-label::after
      transform: translateX(1.27rem)

::v-deep.form-group
  label
    @include body-5-bold

.input-wrapper
  background-color: $color-white-5
  border-radius: 8px
  height: 38px
  input
    @include body-9-regular
    font-family: $font-family-sf-pro-display

.checkbox-container
  height: 54px
  display: flex
  align-items: center
  border-top: solid 1px #999
  border-bottom: solid 1px #999

.mt-17px
  margin-top: 17px

.mt-11px
  margin-top: 11px

.btnSave
  width: 216px
  margin-top: 35px
  margin-bottom: 20px

.title
  @include body-17-bold
  font-family: $font-family-sf-pro-display

.btn-cancel
  @include body-17-medium
  font-family: $font-family-sf-pro-display
  color: $color-blue-20
</style>
