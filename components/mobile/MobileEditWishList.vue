<template>
  <MobileBottomSheet
          :height="height"
          :open="open"
          :title="''"
          @closed="$emit('closed')"
          @opened="$emit('opened')"
      >
    <template #subtitle>
      <div class="d-flex justify-content-between w-100 px-3">
        <span>{{ $t('wish_lists.rename_list') }}</span>
        <a class="role">
          <span class="cancel-link" @click="hide">{{ $t('common.cancel') }}</span>
        </a>
      </div>
    </template>

    <template #default="{}">
      <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
        <div
              class="d-flex flex-column align-items-center justify-content-between h-88 w-100 filters"
          >
            <div class="d-flex flex-column w-100">
              <b-form @submit.stop.prevent="handleSubmit(handleEditWishList)">
                <b-row>
                  <b-col md="10" offset-md="1">
                    <CheckboxSwitch
                      v-model="newListPrivacy"
                      :label-on="$t('common.public').toUpperCase()"
                      :label-off="$t('common.private').toUpperCase()"
                    />
                  </b-col>
                  <ItemDivider/>
                </b-row>
                <b-row class="mt-2">
                  <b-col md="10" offset-md="1">
                    <ItemDivider/>
                    <ValidationProvider
                      v-slot="validationContext"
                      :name="$t('wish_lists.list_name')"
                      :rules="{ required: true, min: 3, max: 255 }"
                    >
                      <b-form-group
                        label-for="list-name"
                        :label="$t('wish_lists.list_name')"
                      >
                        <b-form-input
                          id="list-name"
                          v-model="newListName"
                          aria-describedby="input-live-help"
                          trim
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
                  <b-col md="5" offset-md="1" class="d-flex justify-content-center">
                    <Button
                      class="w-50"
                      ref="btnSave"
                      type="submit"
                      variant="dark-blue"
                      pill
                      block
                      :disabled="!newListName || loading"
                    >
                      {{ $t('wish_lists.rename_list') }}
                    </Button>
                  </b-col>
                  <div class="w-100 d-flex justify-content-between buttons">

                  </div>
                </b-row>
              </b-form>
            </div>
          </div>
      </ValidationObserver>
    </template>
  </MobileBottomSheet>
</template>
<script>
import { mapActions } from 'vuex'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Button from '~/components/common/Button.vue'
import CheckboxSwitch from '~/components/common/CheckboxSwitch'
import MobileBottomSheet from '~/components/mobile/MobileBottomSheet'
import ItemDivider from '~/components/profile/notifications/ItemDivider'

export default {
  name: 'MobileCreateWishListModal',

  components: { MobileBottomSheet, ValidationObserver, ValidationProvider, Button, CheckboxSwitch, ItemDivider },

  props: {
    wishListItem: {
      type: Object,
      required: true,
    },
    height: {
      type: String,
      default: '40%',
    },
  },

  data() {
    return {
      newListName: '',
      newListPrivacy: false,
      loading: false,
      wishList: null,
      open: false,
    }
  },
  mounted() {
    this.newListName = this.wishListItem?.name
  },
  methods: {
    ...mapActions({
      editWishList: 'wish-list/editWishList',
    }),

    // Edit selected wishlist
    async handleEditWishList() {
      if (this.newListName) {
        this.loading = true
        const updatedWishList = await this.editWishList({
          id: this.wishListItem.id,
          name: this.newListName,
        })
        this.loading = false
        this.$emit('created', updatedWishList)
        this.hide()
      }
    },
    getValidationState({ dirty, validated, valid = null }) {
      // Returns the contextual state (validation style) of the element being validated (false for invalid, true for valid, or null for no validation state)
      return dirty || validated ? valid : null
    },
    show() { this.open = true },
    hide() { this.open = false }
  },
}
</script>
<style lang="sass" scoped>
@import "~/assets/css/variables"
::v-deep.filters
  padding: 28px 21px
::v-deep.h-88
  height: 92%
::v-deep.buttons
  margin-top: 10px

.cancel-link
  @include body-17-medium
  color: $color-blue-20

::v-deep .checkbox-switch
  span[role='button']
    text-transform: lowercase
    &:first-letter
      text-transform: uppercase

::v-deep .form-group
  label
    @include body-5-bold
    padding-top: 5px
</style>
