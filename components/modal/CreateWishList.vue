<template>
  <Modal
    :id="id"
    modal-class="create-list-modal"
    hide-footer
    :rounded="true"
    @hidden="newListName = ''"
    no-header-border
    header-class="py-0"
    bodyClass="pt-3"
  >
    <template #header>
      <h5 class="header px-5">{{ $t('wish_lists.create_new_list') }}</h5>
    </template>

    <template #default="{}">
      <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
        <b-form @submit.stop.prevent="handleSubmit(createNewList)" class="px-5">
          <div>
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
          </div>
          <div class="switch-wrapper">
            <CheckboxSwitch
              v-model="newListPrivacy"
              :label-on="$t('common.public').toUpperCase()"
              :label-off="$t('common.private').toUpperCase()"
            />
          </div>
          <div>
            <div id="input-live-help">
              <span class="input-live-help">{{ $t('wish_lists.create_list_helper_public') }}</span>
            </div>
          </div>
          <div class="d-flex justify-content-between buttons-wrapper">
            <Button
              ref="btnSave"
              type="submit"
              variant="dark-blue p-0"
              pill
              :disabled="!newListName || loading"
            >
              {{ $t('wish_lists.create_list') }}
            </Button>
            <Button
              variant="outline-dark"
              pill
              block
              @click.prevent="$bvModal.hide(id)"
            >
              {{ $t('common.cancel') }}
            </Button>
          </div>
        </b-form>
      </ValidationObserver>
    </template>
  </Modal>
</template>
<script>
import { mapActions } from 'vuex'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Modal from '~/components/common/Modal.vue'
import Button from '~/components/common/Button.vue'
import CheckboxSwitch from '~/components/common/CheckboxSwitch'

export default {
  name: 'CreateWishListModal',

  components: { Modal, ValidationObserver, ValidationProvider, Button, CheckboxSwitch },

  props: {
    id: {
      type: String,
      default: 'create-list-modal',
    },
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
    }),

    // Create new wishlist
    async createNewList() {
      if (this.newListName) {
        this.loading = true
        const wishList = await this.createWishList({
          name: this.newListName,
          privacy: this.newListPrivacy ? 'public' : 'private',
        })
        this.loading = false
        this.$emit('created', wishList)
        this.$bvModal.hide(this.id)
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
    getValidationState({ dirty, validated, valid = null }) {
      // Returns the contextual state (validation style) of the element being validated (false for invalid, true for valid, or null for no validation state)
      return dirty || validated ? valid : null
    },
  },
}
</script>
<style scoped lang="sass">
@import '~/assets/css/_variables'
.header
  padding-top: 27px

.switch-wrapper
  padding-top: 4px
  padding-bottom: 4px

.buttons-wrapper
  margin-top: 20px
  margin-bottom: 10px
  ::v-deep.btn
    width: 160px

.input-live-help
  font-family: $font-sf-pro-text
  @include body-13-normal
  color: $color-gray-5

::v-deep .checkbox-switch
  line-height: 32px
  margin-top: -4px
  span[role='button']
    font-family: $font-montserrat
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
</style>
